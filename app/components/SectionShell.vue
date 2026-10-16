<script setup lang="ts">
/**
 * One section shell for the whole homepage: the page's verification apparatus,
 * stated the same way everywhere.
 *
 * The heading sits on the container's left edge in Disket Mono; the metadata
 * rail sits on the right, set in the system monospace voice, so every section
 * declares what it is and where its content comes from before the reader gets
 * to the body. It is a rail, not an eyebrow: it never sits above the heading.
 */
const props = defineProps<{
  /** Anchor target. Must match a link in `SiteNav.vue`. */
  id: string
  /** Display heading. Source case is irrelevant — Disket Mono is caps-only. */
  heading: string
  /** Mono rail on the right. Keep it under ~48 characters. */
  meta: string
  /** Optional one-sentence lead under the heading. */
  lead?: string
}>()

const headingId = computed(() => `${props.id}-heading`)
</script>

<template>
  <section
    :id="id"
    class="container-page py-[clamp(4rem,7vw,6.5rem)]"
    :aria-labelledby="headingId"
  >
    <div
      class="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-3 border-b border-line pb-5"
      data-reveal
    >
      <h2 :id="headingId" class="text-[clamp(2rem,5vw,3rem)]">{{ heading }}</h2>
      <!-- A section number was tried here and removed: the numbering was
           ornamental rather than a real sequence, and the scroll-spy in the
           navigation already tells the reader where they are. -->
      <p class="label-mono">{{ meta }}</p>
    </div>

    <p
      v-if="lead"
      class="measure mt-7 text-[1.125rem] leading-[1.6] text-ink-muted"
      data-reveal
      :style="{ '--reveal-step': 1 }"
    >
      {{ lead }}
    </p>

    <div class="mt-10 md:mt-14">
      <slot />
    </div>
  </section>
</template>
