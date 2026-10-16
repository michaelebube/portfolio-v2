<script setup lang="ts">
import { contact, socials } from '~/data/portfolio'

/**
 * Contact-first closing section. Profile links are supplied by the site owner
 * and remain separate from the page's primary contact action.
 */
const year = new Date().getFullYear()
</script>

<template>
  <footer id="contact" class="border-t border-line" aria-labelledby="contact-heading">
    <div class="container-page py-[clamp(4.5rem,9vw,7rem)]">
      <div class="flex flex-wrap items-center justify-between gap-4 border-b border-line pb-6">
        <h2 id="contact-heading" class="text-[clamp(2rem,5vw,3rem)]">Get in touch</h2>
        <p class="label-mono inline-flex items-center gap-2">
          <span class="availability-dot" aria-hidden="true" />
          Available for work
        </p>
      </div>

      <p class="mt-10 max-w-[32ch] text-[clamp(1.5rem,3vw,2.25rem)] leading-tight text-ink-muted" data-reveal>
        Let's build something meaningful
      </p>

      <div class="mt-12 flex flex-wrap items-end justify-between gap-8" data-reveal :style="{ '--reveal-step': 1 }">
        <div>
          <div class="flex flex-wrap items-center gap-3">
            <a
              class="btn btn-primary"
              :href="`https://mail.google.com/mail/?view=cm&fs=1&to=${contact.email}`"
              target="_blank"
              rel="noopener noreferrer"
            >
              Email me
            </a>
            <a class="btn btn-secondary" :href="contact.resume.href" type="application/pdf">
              {{ contact.resume.label }}
            </a>
          </div>
        </div>

        <ul class="flex flex-wrap items-center gap-x-7 gap-y-3">
          <li v-for="social in socials" :key="social.id">
            <a target="_blank" rel="noopener noreferrer" :href="social.href" class="label-mono nav-link inline-flex items-center gap-2">
              <GitHubMark v-if="social.id === 'github'" />
              {{ social.id === 'github' ? 'Code' : social.label }}
              <span aria-hidden="true">↗</span>
            </a>
          </li>
        </ul>
      </div>

      <div class="mt-16 flex flex-wrap items-baseline justify-between gap-x-8 gap-y-3 border-t border-line pt-6">
        <p class="label-mono">MIKO · {{ year }}</p>
        <a href="#" class="label-mono nav-link">Back to top ↑</a>
      </div>
    </div>
  </footer>
</template>
