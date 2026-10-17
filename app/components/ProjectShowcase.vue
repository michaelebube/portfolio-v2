<script setup lang="ts">
import type { FeaturedProject } from '~/data/portfolio'

/**
 * One featured project, in the alternating editorial layout required by
 * AGENT.md §8: media on one side, text on the other, the side swapping per
 * entry so the eye zig-zags down the page.
 *
 * Each entry states its status, its stack, and what has not been verified.
 * Detailed project reasoning belongs on the linked case-study page.
 */
const props = defineProps<{
  project: FeaturedProject
  /** Reverse the row. Set on the second entry and every second one after it. */
  flip?: boolean
}>()

const projectId = computed(() => `project-${props.project.id}-heading`)
const stackSummary = computed(() => props.project.stack.join(' · '))
</script>

<template>
  <!-- Text leads the DOM, so a phone reads the project name and its status
       before the placeholder frame. On a wide screen both columns carry an
       explicit column start, so the visual side is decided by the grid rather
       than by document order — which is what makes the rows alternate. -->
  <article class="grid gap-10 lg:grid-cols-12 lg:items-start lg:gap-16">
    <div class="lg:col-span-5 lg:row-start-1" :class="flip ? 'lg:col-start-1' : 'lg:col-start-8'">
      <div class="flex flex-wrap items-center justify-between gap-x-6 gap-y-3" data-reveal>
        <h3 :id="projectId" class="text-[clamp(1.375rem,2.6vw,1.875rem)]">{{ project.name }}</h3>
        <!-- Status as a glass chip: the project's state is the page's signature
             fact, so it gets the one surface on this row that is not a solid. -->
        <GlassChip :label="project.status" />
      </div>

      <p
        class="mt-5 text-[1.125rem] leading-[1.6] text-ink"
        data-reveal
        :style="{ '--reveal-step': 1 }"
      >
        {{ project.purpose }}
      </p>

      <dl class="mt-8 border-t border-line">
        <div class="border-b border-line py-4">
          <dt class="label-mono">Stack</dt>
          <dd class="mt-2 leading-[1.7] text-ink-muted">{{ stackSummary }}</dd>
        </div>

        <!-- Real destinations, or none. The case-study route is derived from the
             same slug the case-study data is keyed by, so this cannot ship
             pointing at a page that does not exist; the repository link is
             present only where a public repo was checked. -->
        <div class="py-4">
          <dt class="label-mono">Case study</dt>
          <dd class="mt-3 flex flex-wrap items-center gap-x-7 gap-y-3">
            <NuxtLink
              :to="`/work/${project.slug}`"
              class="btn btn-secondary"
              :aria-label="`Read the ${project.name} case study`"
            >
              Read the case study
            </NuxtLink>

            <a
              v-if="project.repo"
              :href="project.repo"
              target="_blank"
              rel="noopener noreferrer"
              class="label-mono nav-link inline-flex items-center gap-2"
              :aria-label="`${project.name} source on GitHub`"
            >
              <GitHubMark />
              GitHub
            </a>
          </dd>
        </div>
      </dl>
    </div>

    <div
      class="lg:col-span-7 lg:row-start-1"
      :class="flip ? 'lg:col-start-6' : 'lg:col-start-1'"
      data-reveal
      :style="{ '--reveal-step': 2 }"
    >
      <MediaPlaceholder
        :image="project.media.image"
        :title="project.name"
        :stack-summary="stackSummary"
        :pending="project.media.pending"
      />
    </div>
  </article>
</template>
