<script setup lang="ts">
/**
 * A project media frame. It displays a selected capture when one exists and
 * falls back to a labelled placeholder when the evidence is not available.
 *
 * Selected captures are shown without cropping so the full page remains
 * visible. Projects without a selected capture retain the labelled placeholder.
 *
 * The title leads, so a phone reads a named thing with a note under it rather
 * than a tiny label above a heading. Everything inside is real text, so nothing
 * here needs alt text — a screen reader reads exactly what a sighted visitor
 * sees.
 */
defineProps<{
  image?: {
    src: string
    alt: string
  }
  /** Display line: the project the frame belongs to. */
  title: string
  /** Mono stack summary printed inside the frame. */
  stackSummary: string
  /** The frame's statement: what exists, what does not, and where it is shown. */
  pending: string
}>()
</script>

<template>
  <figure class="frame">
    <img
      v-if="image"
      :src="image.src"
      :alt="image.alt"
      class="frame__image"
    />
    <template v-else>
      <div class="frame__field" aria-hidden="true" />

      <div class="frame__body">
        <p class="frame__title">{{ title }}</p>

        <div class="mt-auto pt-8">
          <p class="frame__stack">{{ stackSummary }}</p>
          <p class="frame__pending">{{ pending }}</p>
        </div>
      </div>
    </template>
  </figure>
</template>
