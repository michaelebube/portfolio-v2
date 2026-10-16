<script setup lang="ts">
/**
 * A labelled frame standing in for a screenshot that does not exist yet.
 *
 * No project screenshot has been captured for MindWell AI, GhostPay or the
 * investment-fund demo, and the XVault captures are login and empty-library
 * states only. Rather than imply evidence, the frame states its own status:
 * what it will hold, and that the capture has not happened. There is no fake
 * chrome, no grey bars and no invented data (AGENT.md §10).
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
  /** The frame's statement: not captured yet, and what it will hold. */
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
