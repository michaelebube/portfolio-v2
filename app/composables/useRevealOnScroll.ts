/**
 * Restrained entrance motion (AGENT.md §6: 350–500 ms for larger reveals).
 *
 * The hidden state is applied by CSS only under `html.js-reveal`, and that class
 * is set by a blocking inline script in `nuxt.config.ts` before the first paint.
 * Three guards keep content visible if anything goes wrong:
 *
 *  1. the inline script refuses to set the class when `prefers-reduced-motion`
 *     is on or `IntersectionObserver` is missing — and with scripting off
 *     entirely the class is never added, so no element is ever hidden;
 *  2. that inline script also arms a failsafe timer which reveals everything if
 *     the app never signals readiness, so a hydration failure cannot leave the
 *     page blank.
 */
export function useRevealOnScroll() {
  onMounted(() => {
    const targets = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'))
    if (!targets.length) return

    // Tell the failsafe timer in `nuxt.config.ts` that the app is in control.
    document.documentElement.dataset.revealBound = '1'

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          entry.target.classList.add('is-revealed')
          observer.unobserve(entry.target)
        }
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.08 },
    )

    for (const target of targets) observer.observe(target)
    onBeforeUnmount(() => observer.disconnect())
  })
}
