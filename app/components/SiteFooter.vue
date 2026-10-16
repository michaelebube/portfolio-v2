<script setup lang="ts">
import { contact } from '~/data/portfolio'

/**
 * The footer is a designed close, not a sitemap (AGENT.md §7 puts the contact
 * invitation here, with the résumé and navigation).
 *
 * No social links ship: the résumé names GitHub and LinkedIn but carries no URLs,
 * so neither destination has been verified, and a guessed handle would be a
 * fabricated link (PRODUCT.md, "Open decisions"). Email and the résumé PDF are
 * the two verified routes, and both are real files or real addresses.
 *
 * The colophon credits the two typefaces because Disket Mono's licence welcomes
 * it and the body face is OFL — and because type provenance is the kind of
 * technical metadata this page trades in.
 */
const year = new Date().getFullYear()

const footerLinks = [
  { label: 'About', href: '#about' },
  { label: 'Selected Work', href: '#work' },
  { label: 'Other Projects', href: '#other' },
  { label: 'Experience', href: '#experience' },
  { label: 'Toolkit', href: '#toolkit' },
]
</script>

<template>
  <footer id="contact" class="border-t border-line" aria-labelledby="contact-heading">
    <div class="container-page py-[clamp(4.5rem,9vw,7rem)]">
      <!-- The hero's secondary action is "Get in touch"; its destination is titled
           the same way, so the promise made above the fold is closed by name. -->
      <h2 id="contact-heading" class="text-[clamp(2rem,6vw,4rem)]" data-reveal>Get in touch</h2>

      <div class="mt-8 grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div class="lg:col-span-7">
          <p class="measure text-[1.125rem] leading-[1.6] text-ink-muted" data-reveal :style="{ '--reveal-step': 1 }">
            Email is the fastest way to reach me — a role, a freelance build, or a question about
            anything on this page. The résumé below is the same document the claims here were
            checked against.
          </p>

          <div class="mt-8 flex flex-wrap items-center gap-3" data-reveal :style="{ '--reveal-step': 2 }">
            <a class="btn btn-primary" :href="`mailto:${contact.email}`">Email me</a>
            <a class="btn btn-secondary" :href="contact.resume.href" type="application/pdf">
              {{ contact.resume.label }}
            </a>
          </div>

          <p class="label-mono mt-5">{{ contact.email }} · {{ contact.resume.meta }}</p>
        </div>

        <nav class="lg:col-span-5 lg:col-start-9" aria-label="Footer">
          <p class="label-mono">Sections</p>
          <ul class="mt-4">
            <li v-for="link in footerLinks" :key="link.href" class="border-b border-line last:border-b-0">
              <a
                :href="link.href"
                class="block py-3 text-ink-muted no-underline transition-colors duration-150 ease-out hover:text-ink focus-visible:text-ink"
              >
                {{ link.label }}
              </a>
            </li>
          </ul>
        </nav>
      </div>

      <div
        class="mt-16 flex flex-wrap items-baseline justify-between gap-x-8 gap-y-3 border-t border-line pt-6"
      >
        <p class="label-mono">MIKO · Ebube Michael · {{ year }}</p>
        <p class="label-mono">Disket Mono by Rostype · Geist by Vercel × basement.studio</p>
      </div>
    </div>
  </footer>
</template>
