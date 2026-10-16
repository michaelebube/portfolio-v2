<script setup lang="ts">
import { contact } from '~/data/portfolio'

interface NavLink {
  label: string
  href: string
}

const links: NavLink[] = [
  { label: 'About', href: '#about' },
  { label: 'Selected Work', href: '#work' },
  { label: 'Experience', href: '#experience' },
  { label: 'Toolkit', href: '#toolkit' },
  { label: 'Contact', href: '#contact' },
]

const isOpen = ref(false)

const route = useRoute()

/**
 * The section links are hashes on the homepage. On a case-study route those
 * sections do not exist, so the same link has to carry the reader home first —
 * otherwise every navigation item on `/work/*` points at nothing. Both forms
 * are real anchors, so they work without scripting either way.
 */
function sectionHref(href: string) {
  return route.path === '/' ? href : `/${href}`
}

/**
 * Scroll-spy: this is the page's one live behaviour.
 *
 * It reports where the reader is by marking the current section with
 * `aria-current="true"` and a persistent underline, so the navigation states
 * something true rather than just sitting there. Everything it does is additive:
 * the links are plain anchors that work on their own if scripting is off or the
 * observer is unavailable, and the underline is never the only cue — the colour
 * step carries it too.
 */
const activeId = ref('')

onMounted(() => {
  const sections = links
    .map((link) => document.querySelector<HTMLElement>(link.href))
    .filter((section): section is HTMLElement => section !== null)

  if (!sections.length || !('IntersectionObserver' in window)) return

  const inBand = new Set<string>()

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) inBand.add(entry.target.id)
        else inBand.delete(entry.target.id)
      }
      // The band is narrow, so more than one section rarely qualifies. When it
      // does, document order decides, which keeps the indicator from jumping
      // backwards as a long section leaves the band.
      activeId.value = links.map((link) => link.href.slice(1)).find((id) => inBand.has(id)) ?? ''
    },
    { rootMargin: '-45% 0px -50% 0px' },
  )

  for (const section of sections) observer.observe(section)
  onBeforeUnmount(() => observer.disconnect())
})

function closeMenu() {
  isOpen.value = false
}

function onKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape' && isOpen.value) closeMenu()
}

onMounted(() => window.addEventListener('keydown', onKeydown))
onBeforeUnmount(() => window.removeEventListener('keydown', onKeydown))
</script>

<template>
  <!-- Menu tier of the glass recipe, not the panel tier: this bar floats over
       arbitrary scrolling content, so its labels cannot depend on what happens
       to be underneath it. Heavy blur plus a wash of the surface token keeps
       them readable whatever passes below, and the inset highlight along the
       top edge is the same rim the panels carry. -->
  <header class="liquid-glass-menu sticky top-0 z-50">
    <!-- One navigation landmark for both the desktop row and the mobile panel. -->
    <nav aria-label="Primary">
      <div class="container-page">
        <div class="flex h-14 items-center justify-between gap-6 md:h-16">
          <NuxtLink to="/" class="wordmark" aria-label="MIKO — home">MIKO</NuxtLink>

          <div class="ml-auto flex items-center gap-3">
            <ul class="hidden items-center gap-7 md:flex">
              <li v-for="link in links" :key="link.href">
                <a
                  :href="sectionHref(link.href)"
                  class="nav-link"
                  :class="{ 'is-active': activeId === link.href.slice(1) }"
                  :aria-current="activeId === link.href.slice(1) ? 'true' : undefined"
                  >{{ link.label }}</a
                >
              </li>
            </ul>

            <a
              class="btn btn-secondary hidden md:inline-flex"
              :href="contact.resume.href"
              type="application/pdf"
            >
              {{ contact.resume.label }}
            </a>

            <button
              type="button"
              class="label-mono -mr-1 inline-flex min-h-11 items-center px-2 text-ink md:hidden"
              :aria-expanded="isOpen"
              aria-controls="primary-nav-mobile"
              @click="isOpen = !isOpen"
            >
              {{ isOpen ? 'Close' : 'Menu' }}
            </button>
          </div>
        </div>
      </div>

      <!-- A child of a glass surface paints no surface of its own (SKILL.md
           rule 3): the header already supplies the wash, rim and border, and a
           second translucent fill inside it would read darker than its parent. -->
      <div v-if="isOpen" id="primary-nav-mobile" class="glass-panel-child border-t border-line md:hidden">
        <ul class="container-page py-1">
          <li v-for="link in links" :key="link.href" class="border-b border-line last:border-b-0">
            <a
              :href="sectionHref(link.href)"
              class="block py-3.5 no-underline transition-colors duration-150 ease-out"
              :class="activeId === link.href.slice(1) ? 'text-ink' : 'text-ink-muted hover:text-ink'"
              :aria-current="activeId === link.href.slice(1) ? 'true' : undefined"
              @click="closeMenu"
            >
              {{ link.label }}
            </a>
          </li>
          <li class="py-3">
            <a
              :href="contact.resume.href"
              class="btn btn-secondary w-full"
              type="application/pdf"
              @click="closeMenu"
            >
              {{ contact.resume.label }}
            </a>
          </li>
        </ul>
      </div>
    </nav>
  </header>
</template>
