import tailwindcss from '@tailwindcss/vite'
import { caseStudyRoutes } from './app/data/caseStudies'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',

  // Case-study routes are prerendered from the same list the pages are built
  // from, so a project cannot be added to the data and forgotten here. The
  // homepage is prerendered implicitly.
  nitro: {
    prerender: {
      routes: ['/', ...caseStudyRoutes],
    },
  },

  // DevTools is a local aid. It was rendering its floating badge in the built
  // preview under `enabled: true` and under a NODE_ENV gate, so it is now
  // opt-in: run `NUXT_DEVTOOLS=1 npm run dev` to get it.
  devtools: { enabled: process.env.NUXT_DEVTOOLS === '1' },

  css: ['~/assets/css/main.css'],

  // TailwindCSS is the primary styling approach (AGENT.md §12).
  vite: {
    plugins: [tailwindcss()],
  },

  app: {
    head: {
      htmlAttrs: { lang: 'en' },
      // Title and description approved by the Phase 1 review, 2026-10-16. They
      // live here as the site default so a page only overrides what it changes.
      // No canonical and no `og:url`: the production domain is unknown and must
      // not be guessed (AGENT.md §13). Open Graph carries the same two strings,
      // which invent nothing.
      title: 'Ebube Michael | Software Engineer',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'color-scheme', content: 'dark' },
        {
          name: 'description',
          content:
            'Software engineer. I build thoughtful software products, from user-facing experiences to the systems behind them.',
        },
        { property: 'og:type', content: 'website' },
        { property: 'og:title', content: 'Ebube Michael | Software Engineer' },
        {
          property: 'og:description',
          content:
            'Software engineer. I build thoughtful software products, from user-facing experiences to the systems behind them.',
        },
      ],
      link: [
        // Geist Regular (body) — used above the fold by the hero paragraph, so it
        // preloads. 45 KB, the only body weight shipped.
        {
          rel: 'preload',
          as: 'font',
          type: 'font/woff2',
          href: '/fonts/geist/geist-regular.woff2',
          crossorigin: 'anonymous',
        },
        // Disket Mono (display). Self-hosted .woff2 generated from the licensed source .ttf.
        // Only weight 700 is preloaded: it is the sole display weight any rule uses in
        // phase 1 (headings and the wordmark). Weight 400 stays declared in @font-face
        // and is fetched on demand if a later phase sets display text at 400 — preloading
        // it now would download 18.5 KB on every page load for nothing.
        {
          rel: 'preload',
          as: 'font',
          type: 'font/woff2',
          href: '/fonts/disket-mono/disket-mono-bold.woff2',
          crossorigin: 'anonymous',
        },
        {
          rel: 'icon',
          type: 'image/svg+xml',
          href: '/favicon.svg?v=3',
        },
        {
          rel: 'shortcut icon',
          type: 'image/svg+xml',
          href: '/favicon.svg?v=3',
        },
      ],
      script: [
        // The landing cover, decided before the first paint. On the homepage,
        // when this browser has not entered within the last seven days, the page shell is
        // hidden until `app.vue` mounts the cover. The 2.5 s timer is the same
        // failsafe as the reveal script below: if the app never mounts, the
        // page is revealed rather than left invisible behind a cover that never
        // arrives. `localStorage` is read inside the try because private
        // contexts can deny it.
        {
          tagPosition: 'head',
          innerHTML:
            "(function(){try{if(location.pathname!=='/')return;var s=localStorage.getItem('miko-splash-seen'),v=s&&JSON.parse(s),i=7*24*60*60*1000;if(v&&typeof v.seenAt==='number'&&isFinite(v.seenAt)&&Date.now()-v.seenAt<i)return;var d=document.documentElement;d.classList.add('splash-pending');setTimeout(function(){if(d.dataset.splashBound!=='1')d.classList.remove('splash-pending')},2500)}catch(e){}})();",
        },
        // Sets the reveal layer's hidden state before the first paint, so no
        // element is ever painted at full opacity and then snapped to zero.
        //
        // It refuses to run when motion is unwelcome or IntersectionObserver is
        // missing, which leaves the page fully visible and static — the same
        // state a visitor with scripting off gets, since the class is then never
        // added at all. The timer is the last guard: if the app never mounts, no
        // one adds `is-revealed` to anything, so after 2.5 s it reveals the lot
        // rather than leaving a blank page behind a JavaScript error.
        {
          tagPosition: 'head',
          innerHTML:
            "(function(){try{var d=document.documentElement;if(!('IntersectionObserver' in window))return;if(window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;d.classList.add('js-reveal');setTimeout(function(){if(d.dataset.revealBound!=='1')d.classList.add('reveal-all')},2500)}catch(e){}})();",
        },
      ],
    },
  },

  typescript: {
    strict: true,
    typeCheck: false, // run explicitly via `npm run typecheck`
  },
})
