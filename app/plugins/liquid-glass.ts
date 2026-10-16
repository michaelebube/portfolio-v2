/*!
 * Liquid Glass — refraction, as a Vue directive.
 *
 * The refraction field is a port of the fragment shader in liquid-glass-js
 * (https://github.com/dashersw/liquid-glass-js) — Copyright (c) 2025 Armagan
 * Amcalar, MIT. Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation files (the
 * "Software"), to deal in the Software without restriction, including without
 * limitation the rights to use, copy, modify, merge, publish, distribute,
 * sublicense, and/or sell copies of the Software, and to permit persons to whom
 * the Software is furnished to do so, subject to the following conditions: the
 * above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software. THE SOFTWARE IS PROVIDED "AS
 * IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED.
 *
 * Keep this header on any copy or port.
 *
 * This is a transcription of the `liquid-glass` skill's Angular directive into
 * a Vue directive. The mechanism is unchanged: bake the shader's edge/rim
 * refraction field into a canvas displacement map per element size, consume it
 * as `backdrop-filter: url(#filter)` via feImage → feDisplacementMap →
 * feGaussianBlur. Beyond the framework lifecycle the only adaptation is that
 * the Angular `NgZone.runOutsideAngular` wrapper (which exists to keep the
 * observers out of Angular's change detection) has no Vue equivalent and is
 * dropped — Vue's observers are plain DOM callbacks and touch no reactive
 * state here.
 *
 * Usage: `v-liquid-glass` on an element carrying `.liquid-glass`.
 *
 * SVG-referenced backdrop filters render in Chromium only. Safari parses the
 * declaration and paints nothing, so `@supports` reports success while the
 * panel goes blank. This therefore gates on engine, not on a feature query, and
 * does nothing at all where it is unsupported — the stylesheet's plain
 * `backdrop-filter: blur(3px) saturate(125%)` stays in effect and the panel is
 * still a decent frosted surface.
 */

interface LiquidGlassConfig {
  edgeIntensity: number
  rimIntensity: number
  baseIntensity: number
  edgeDistance: number
  rimDistance: number
  baseDistance: number
  cornerBoost: number
  rippleEffect: number
  blurRadius: number
  /** Center distortion ("Enable Center Warp"). Off keeps the middle legible. */
  warp: boolean
}

/** Hand-tuned upstream; the tint lives in `liquid-glass.css`. */
const GLASS_PRESET: LiquidGlassConfig = {
  edgeIntensity: 0.015,
  rimIntensity: 0.028,
  baseIntensity: 0.05,
  edgeDistance: 0.5,
  rimDistance: 1.7,
  baseDistance: 0.2,
  cornerBoost: 0.06,
  rippleEffect: 0.26,
  blurRadius: 2,
  warp: false,
}

/**
 * Render the displacement map at 2x the element's CSS size. The rim refraction
 * lives in a 1–2px band; a 1x map lets the browser resample it into a wide
 * smear.
 */
const SUPERSAMPLE = 2

/**
 * Cap the baked map's longest (supersampled) edge, so a large panel does not
 * pay for a full 2x map through its neutral middle. The factor falls below 1
 * for big surfaces (floor 0.25) to bound the bake and the data-URL size.
 */
const MAX_MAP_EDGE = 1400

/**
 * feGaussianBlur stdDeviation per unit of `blurRadius`; fit so `blurRadius: 2`
 * matches the upstream frosting.
 */
const BLUR_STD_PER_RADIUS = 0.35

interface FilterEntry {
  id: string
  node: SVGFilterElement
  refs: number
}

interface GlassInstance {
  currentKey: string | null
  observer: ResizeObserver | null
  frame: number
  debounce: ReturnType<typeof setTimeout> | undefined
  onWindowResize: () => void
}

const filters = new Map<string, FilterEntry>()
let defs: SVGSVGElement | null = null
let nextId = 0
const instances = new WeakMap<HTMLElement, GlassInstance>()

/**
 * Backdrop filters referencing an SVG filter are Chromium-only. Feature queries
 * cannot tell — Safari parses the declaration and paints nothing — so gate on
 * engine.
 */
function isSupported(): boolean {
  const brands = (navigator as Navigator & { userAgentData?: { brands?: { brand: string }[] } })
    .userAgentData?.brands
  if (brands?.length) {
    return brands.some((brand) => /Chromium|Google Chrome|Microsoft Edge/i.test(brand.brand))
  }
  return /Chrome\//.test(navigator.userAgent)
}

/** Coalesce resize bursts into one rebuild per frame. */
function scheduleRebuild(host: HTMLElement, instance: GlassInstance): void {
  cancelAnimationFrame(instance.frame)
  instance.frame = requestAnimationFrame(() => rebuild(host, instance))
}

function rebuild(host: HTMLElement, instance: GlassInstance): void {
  const w = Math.round(host.offsetWidth)
  const h = Math.round(host.offsetHeight)
  if (w < 2 || h < 2) return

  const computedRadius = getComputedStyle(host).borderTopLeftRadius
  const radius = Math.min(resolveRadius(computedRadius, w, h), Math.min(w, h) / 2)
  // The shader displaces in fractions of the page snapshot; the live equivalent
  // of that snapshot is the viewport.
  const pageW = window.innerWidth
  const pageH = window.innerHeight

  const key = [w, h, radius, pageW, pageH, JSON.stringify(GLASS_PRESET)].join('|')
  if (key === instance.currentKey) return

  releaseCurrentFilter(instance)
  const entry = acquireFilter(key, w, h, radius, pageW, pageH)
  instance.currentKey = key
  host.style.backdropFilter = `url(#${entry.id})`
}

function releaseCurrentFilter(instance: GlassInstance): void {
  if (!instance.currentKey) return
  const key = instance.currentKey
  instance.currentKey = null
  const entry = filters.get(key)
  if (entry && --entry.refs <= 0) {
    filters.delete(key)
    entry.node.remove()
  }
}

/** Same-size panels (the common case) share one filter. */
function acquireFilter(
  key: string,
  w: number,
  h: number,
  radius: number,
  pageW: number,
  pageH: number,
): FilterEntry {
  let entry = filters.get(key)
  // Reuse only if the cached node is still in the live document: if the shared
  // defs <svg> was ever detached, its `url(#id)` silently resolves to nothing.
  if (entry?.node.isConnected) {
    entry.refs++
    return entry
  }
  if (entry) filters.delete(key)

  const { mapUrl, scale } = buildDisplacementMap(w, h, radius, pageW, pageH)
  const id = `liquid-glass-${nextId++}`

  const svgNs = 'http://www.w3.org/2000/svg'
  const filter = document.createElementNS(svgNs, 'filter')
  filter.setAttribute('id', id)
  // Edge pixels sample the backdrop up to `scale/2` away plus the blur spread;
  // the region must extend past the box by at least that or the refraction
  // clips to transparent at the corners. Displacement is viewport-proportional,
  // so on a small element this margin can exceed the box — size it from the
  // field, never as a fixed 30%.
  const marginPx = scale / 2 + 3 * GLASS_PRESET.blurRadius * BLUR_STD_PER_RADIUS
  const mx = (marginPx / w) * 100
  const my = (marginPx / h) * 100
  filter.setAttribute('x', `${-mx}%`)
  filter.setAttribute('y', `${-my}%`)
  filter.setAttribute('width', `${100 + 2 * mx}%`)
  filter.setAttribute('height', `${100 + 2 * my}%`)
  filter.setAttribute('color-interpolation-filters', 'sRGB')

  const feImage = document.createElementNS(svgNs, 'feImage')
  feImage.setAttribute('href', mapUrl)
  feImage.setAttribute('x', '0')
  feImage.setAttribute('y', '0')
  feImage.setAttribute('width', String(w))
  feImage.setAttribute('height', String(h))
  feImage.setAttribute('preserveAspectRatio', 'none')
  feImage.setAttribute('result', 'map')

  const feDisplacement = document.createElementNS(svgNs, 'feDisplacementMap')
  feDisplacement.setAttribute('in', 'SourceGraphic')
  feDisplacement.setAttribute('in2', 'map')
  feDisplacement.setAttribute('scale', String(scale))
  feDisplacement.setAttribute('xChannelSelector', 'R')
  feDisplacement.setAttribute('yChannelSelector', 'G')
  feDisplacement.setAttribute('result', 'displaced')

  const feBlur = document.createElementNS(svgNs, 'feGaussianBlur')
  feBlur.setAttribute('in', 'displaced')
  feBlur.setAttribute('stdDeviation', String(GLASS_PRESET.blurRadius * BLUR_STD_PER_RADIUS))

  filter.append(feImage, feDisplacement, feBlur)
  ensureDefs().querySelector('defs')!.appendChild(filter)

  entry = { id, node: filter, refs: 1 }
  filters.set(key, entry)
  return entry
}

function ensureDefs(): SVGSVGElement {
  if (!defs || !defs.isConnected) {
    const svgNs = 'http://www.w3.org/2000/svg'
    const svg = document.createElementNS(svgNs, 'svg')
    svg.setAttribute('width', '0')
    svg.setAttribute('height', '0')
    svg.setAttribute('aria-hidden', 'true')
    svg.style.position = 'fixed'
    svg.appendChild(document.createElementNS(svgNs, 'defs'))
    document.body.appendChild(svg)
    defs = svg
  }
  return defs
}

/**
 * Bake the refraction field into a displacement map: R/G encode the x/y sample
 * offset around neutral, scaled so the extremes span the filter's `scale`.
 * Formulas transcribed 1:1 from the upstream container.js.
 */
function buildDisplacementMap(
  w: number,
  h: number,
  radius: number,
  pageW: number,
  pageH: number,
): { mapUrl: string; scale: number } {
  const ss = Math.max(0.25, Math.min(SUPERSAMPLE, MAX_MAP_EDGE / Math.max(w, h)))
  const bw = Math.max(1, Math.round(w * ss))
  const bh = Math.max(1, Math.round(h * ss))
  const r = radius * ss
  const minDim = Math.min(w, h)
  const dx = new Float32Array(bw * bh)
  const dy = new Float32Array(bw * bh)
  let maxAbs = 0

  for (let py = 0; py < bh; py++) {
    for (let px = 0; px < bw; px++) {
      const cx = (px + 0.5) / bw
      const cy = (py + 0.5) / bh

      // Signed distance to the rounded-rect edge (supersampled px → CSS px).
      const tx = Math.abs(px + 0.5 - bw / 2) - (bw / 2 - r)
      const ty = Math.abs(py + 0.5 - bh / 2) - (bh / 2 - r)
      const outside = Math.hypot(Math.max(tx, 0), Math.max(ty, 0))
      const inside = Math.min(Math.max(tx, ty), 0)
      const distPx = Math.max(-(outside + inside - r), 0) / ss

      const edgeFall = Math.exp(-distPx * GLASS_PRESET.edgeDistance)
      const rimFall = Math.exp(-distPx * GLASS_PRESET.rimDistance)
      const baseFall = 1 - Math.exp(-distPx * GLASS_PRESET.baseDistance)
      const baseComponent = GLASS_PRESET.warp ? baseFall * GLASS_PRESET.baseIntensity : 0
      const total =
        baseComponent + edgeFall * GLASS_PRESET.edgeIntensity + rimFall * GLASS_PRESET.rimIntensity

      // The shader's rounded-rect normal is taken in texcoord space.
      let nx = cx - 0.5
      let ny = cy - 0.5
      const len = Math.hypot(nx, ny)
      if (len > 0) {
        nx /= len
        ny /= len
      }

      const cornerNorm = Math.max(Math.min(cx, 1 - cx), Math.min(cy, 1 - cy)) * minDim
      const corner = Math.exp(-cornerNorm * 0.3) * GLASS_PRESET.cornerBoost

      const ripple =
        Math.sin((distPx / minDim) * 25) * GLASS_PRESET.rippleEffect * rimFall

      // normal * (refraction + corner boost) + perpendicular * ripple,
      // converted from page-texture fractions to pixels.
      const fx = (nx * (total + corner) - ny * ripple) * pageW
      const fy = (ny * (total + corner) + nx * ripple) * pageH

      const i = py * bw + px
      dx[i] = fx
      dy[i] = fy
      maxAbs = Math.max(maxAbs, Math.abs(fx), Math.abs(fy))
    }
  }

  const scale = Math.max(maxAbs * 2, 1e-4)
  // feDisplacementMap decodes byte b as scale*(b/255 - 0.5); since 128/255 ≠ 0.5,
  // a naive neutral (128) would shift the whole interior by scale/510 px.
  // Pre-subtract that decode bias so zero displacement stays put (warp off ⇒
  // the middle must read undistorted).
  const bias = scale * (128 / 255 - 0.5)
  const canvas = document.createElement('canvas')
  canvas.width = bw
  canvas.height = bh
  const ctx = canvas.getContext('2d')!
  const image = ctx.createImageData(bw, bh)
  const data = image.data
  for (let i = 0; i < bw * bh; i++) {
    data[i * 4] = clampByte(255 * (0.5 + (dx[i]! - bias) / scale))
    data[i * 4 + 1] = clampByte(255 * (0.5 + (dy[i]! - bias) / scale))
    data[i * 4 + 2] = 128
    data[i * 4 + 3] = 255
  }
  ctx.putImageData(image, 0, 0)
  return { mapUrl: canvas.toDataURL('image/png'), scale }
}

/** Resolve a computed border-radius (px or %) to CSS pixels. */
function resolveRadius(computed: string, w: number, h: number): number {
  const value = Number.parseFloat(computed) || 0
  return computed.trim().endsWith('%') ? (value / 100) * Math.min(w, h) : value
}

function clampByte(value: number): number {
  return Math.max(0, Math.min(255, Math.round(value)))
}

/**
 * Registers `v-liquid-glass`. Nothing happens on an engine that cannot paint
 * SVG-referenced backdrop filters.
 *
 * The plugin is universal rather than client-only on purpose. Vue's server
 * renderer resolves every directive it meets while rendering, and an
 * unresolved one is a hard 500 (`Cannot read properties of undefined (reading
 * 'getSSRProps')`) — not a warning. Registering the same directive on both
 * sides keeps a prerendered case-study page renderable; the hook bodies are
 * client-only in effect because `mounted` and `unmounted` never run on the
 * server, and every DOM reference in this module sits inside a function body
 * rather than at module scope.
 */
export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive('liquid-glass', {
    mounted(host: HTMLElement) {
      if (!isSupported()) return

      const instance: GlassInstance = {
        currentKey: null,
        observer: null,
        frame: 0,
        debounce: undefined,
        onWindowResize: () => {
          // A viewport resize changes pageW/pageH for every instance at once;
          // settle before rebaking or a drag-resize rebakes every map per frame.
          clearTimeout(instance.debounce)
          instance.debounce = setTimeout(() => scheduleRebuild(host, instance), 180)
        },
      }

      instances.set(host, instance)
      instance.observer = new ResizeObserver(() => scheduleRebuild(host, instance))
      instance.observer.observe(host)
      window.addEventListener('resize', instance.onWindowResize, { passive: true })
      scheduleRebuild(host, instance)
    },

    unmounted(host: HTMLElement) {
      const instance = instances.get(host)
      if (!instance) return
      instance.observer?.disconnect()
      window.removeEventListener('resize', instance.onWindowResize)
      clearTimeout(instance.debounce)
      cancelAnimationFrame(instance.frame)
      releaseCurrentFilter(instance)
      instances.delete(host)
    },
  })
})
