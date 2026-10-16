<script setup lang="ts">
/**
 * A labelled frame standing in for the screenshots that do not exist.
 *
 * No project has a set of captures complete enough to fill this slot, and the
 * frame states its own status instead: what has been captured, what has not,
 * and where a reader can see it. Real captures live in the case studies, which
 * is where they can carry the caption explaining what each one does and does
 * not evidence — a screenshot in a homepage slot has no room for that, and an
 * unexplained screenshot is the thing this site exists not to do. There is no
 * fake chrome, no grey bars and no invented data (AGENT.md §10).
 *
 * The title leads, so a phone reads a named thing with a note under it rather
 * than a tiny label above a heading. Everything inside is real text, so nothing
 * here needs alt text — a screen reader reads exactly what a sighted visitor
 * sees.
 */
defineProps<{
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
    <div class="frame__field" aria-hidden="true" />

    <div class="frame__body">
      <p class="frame__title">{{ title }}</p>

      <div class="mt-auto pt-8">
        <p class="frame__stack">{{ stackSummary }}</p>
        <p class="frame__pending">{{ pending }}</p>
      </div>
    </div>
  </figure>
</template>
