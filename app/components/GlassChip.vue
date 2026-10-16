<script setup lang="ts">
/**
 * The small glass label — a project's status, or the state of a single claim.
 *
 * Chip tier of the glass recipe: CSS only, no refraction. A canvas bake is
 * priced per surface, so it is the wrong tool for a label that appears by the
 * dozen and is far too small to read a distortion on anyway.
 *
 * The state never rides on the mark alone. The word says it; the mark is a
 * filled or hollow square that makes the word scannable down a column. That
 * keeps the device legible in monochrome, under forced-colours, and for a
 * reader who cannot separate two greys.
 */
withDefaults(
  defineProps<{
    label: string
    /** `solid` marks a claim the source supports; `hollow` one it does not. */
    mark?: 'solid' | 'hollow'
  }>(),
  { mark: 'solid' },
)
</script>

<template>
  <span class="liquid-glass-chip label-mono whitespace-nowrap">
    <span aria-hidden="true" class="chip-mark" :data-mark="mark" />
    {{ label }}
  </span>
</template>

<style scoped>
.chip-mark {
  width: 5px;
  height: 5px;
  margin-right: 0.4rem;
  background-color: currentColor;
  opacity: 0.85;
}

.chip-mark[data-mark='hollow'] {
  background-color: transparent;
  box-shadow: inset 0 0 0 1px currentColor;
}
</style>
