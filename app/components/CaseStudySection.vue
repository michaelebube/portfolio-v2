<script setup lang="ts">
import type { CaseSection } from '~/data/caseStudies'

/**
 * One section of a case study: a heading rail on the left, the material on the
 * right, so the reader can find their place by scanning the rail alone.
 *
 * Everything here is a solid surface. This is the long-form reading part of the
 * page — dense, technical, sometimes a list of twelve things — and glass under
 * running text trades legibility for an effect the reader did not ask for. The
 * glass in a case study is spent on the metadata strip and the claim chips,
 * where the surface is a label rather than a page of prose.
 */
defineProps<{
  section: CaseSection
}>()
</script>

<template>
  <section :id="section.id" class="border-t border-line pt-10">
    <div class="grid gap-6 lg:grid-cols-12 lg:gap-16">
      <!-- Four columns rather than three: the headings here are two-word-plus
           phrases ("Problem and intended users"), and at three columns the rail
           is narrow enough to wrap them to three lines at 1440px. -->
      <h2
        class="text-[clamp(1.375rem,2.4vw,1.75rem)] lg:col-span-4 lg:row-start-1"
        data-reveal
      >
        {{ section.heading }}
      </h2>

      <div class="lg:col-span-8 lg:col-start-5 lg:row-start-1">
        <div v-if="section.paragraphs" class="space-y-5">
          <p
            v-for="(paragraph, index) in section.paragraphs"
            :key="index"
            class="measure leading-[1.7] text-ink-muted"
            data-reveal
            :style="{ '--reveal-step': index + 1 }"
          >
            {{ paragraph }}
          </p>
        </div>

        <ul
          v-if="section.bullets"
          class="measure list-disc space-y-3 pl-5 leading-[1.7] text-ink-muted"
          data-reveal
        >
          <li v-for="bullet in section.bullets" :key="bullet">{{ bullet }}</li>
        </ul>

        <!-- Labelled rows, one per claim. Solid surface with hairline rules:
             this is the densest content on the page. -->
        <dl v-if="section.rows" class="mt-1 border-t border-line">
          <div
            v-for="(row, index) in section.rows"
            :key="row.term"
            class="grid gap-2 border-b border-line py-4 sm:grid-cols-12 sm:gap-6"
            data-reveal
            :style="{ '--reveal-step': index + 1 }"
          >
            <dt class="text-ink sm:col-span-4">{{ row.term }}</dt>
            <dd class="leading-[1.7] text-ink-muted sm:col-span-8">{{ row.detail }}</dd>
          </div>
        </dl>
      </div>
    </div>
  </section>
</template>
