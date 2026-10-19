<script setup lang="ts">
/**
 * Landing cover. A full-viewport title plate shown once per browser session
 * before the homepage, dismissed by the reader rather than by a timer — nothing
 * is forced to autoplay and nothing is loaded behind it that the reader did not
 * ask for.
 *
 * The component owns only its own presentation and keyboard behaviour. Whether
 * it appears at all, the session flag that stops it returning, and the `inert`
 * state of the page beneath are decided in `app.vue`, because the page shell is
 * a sibling of this overlay, not a descendant.
 *
 * Accessibility notes:
 * - It is a modal dialog with one control. Tab is held on that control for the
 *   short life of the cover, so focus cannot wander into the hidden page.
 * - Escape enters the site, the same as the button.
 * - The background page is genuinely `inert` (set by `app.vue`), not merely
 *   covered, so it is unreachable by pointer, keyboard and assistive technology.
 * - All copy is the approved hero wording. No new claims are introduced.
 */
const props = defineProps<{
  /** Set while the cover fades out; the parent unmounts it afterwards. */
  leaving?: boolean;
}>();

const emit = defineEmits<{ enter: [] }>();

const enterButton = ref<HTMLButtonElement | null>(null);

const disciplines = ["Software", "Systems", "Applied AI"];
const year = new Date().getFullYear();

function requestEntry() {
  if (props.leaving) return;
  emit("enter");
}

/**
 * One control means a tab cycle of length one. Holding Tab here is kinder than
 * letting focus fall to the browser chrome while the page is still inert.
 */
function onKeydown(event: KeyboardEvent) {
  if (event.key === "Escape") {
    event.preventDefault();
    requestEntry();
    return;
  }

  if (event.key === "Tab") {
    event.preventDefault();
    enterButton.value?.focus();
  }
}

onMounted(() => {
  document.documentElement.classList.add("splash-open");
  document.addEventListener("keydown", onKeydown);
  nextTick(() => enterButton.value?.focus({ preventScroll: true }));
});

onBeforeUnmount(() => {
  document.documentElement.classList.remove("splash-open");
  document.removeEventListener("keydown", onKeydown);
});
</script>

<template>
  <Teleport to="body">
    <div
      class="splash"
      :class="{ 'splash--leaving': leaving }"
      role="dialog"
      aria-modal="true"
      aria-labelledby="splash-title"
      aria-describedby="splash-description"
    >
      <div class="splash__field" aria-hidden="true" />

      <div class="container-page splash__inner">
        <header class="splash__bar">
          <span class="wordmark">MIKO</span>
          <p class="label-mono">Software Engineer</p>
        </header>

        <div class="splash__body">
          <p class="label-mono splash__eyebrow">
            <span class="splash__rule" aria-hidden="true" />
            Portfolio
          </p>

          <h1 id="splash-title" class="splash__title">Ebube Michael</h1>

          <p id="splash-description" class="splash__sentence">
            I build thoughtful software products, from user-facing experiences
            to the systems behind them.
          </p>

          <ul class="disciplines label-mono splash__disciplines">
            <li v-for="discipline in disciplines" :key="discipline">
              {{ discipline }}
            </li>
          </ul>

          <div class="splash__actions">
            <button
              ref="enterButton"
              type="button"
              class="btn btn-primary splash__enter"
              @click="requestEntry"
            >
              <span>Enter portfolio</span>
              <span class="splash__arrow" aria-hidden="true">→</span>
            </button>
          </div>
        </div>

        <footer class="splash__foot">
          <p class="label-mono splash__availability">
            <span class="availability-dot" aria-hidden="true" />
            Available for work
          </p>
          <p class="label-mono">MIKO · {{ year }}</p>
        </footer>
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
.splash {
  position: fixed;
  inset: 0;
  z-index: 90;
  display: flex;
  overflow: hidden;
  background-color: var(--color-canvas);
  color: var(--color-ink);
  opacity: 1;
  transition:
    opacity 320ms cubic-bezier(0.22, 0.61, 0.36, 1),
    transform 320ms cubic-bezier(0.22, 0.61, 0.36, 1);
}

.splash--leaving {
  opacity: 0;
  transform: translateY(-8px);
  pointer-events: none;
}

/* A quiet ambient field gives the plate depth without repeating the site's
  technical grid behind the opening state. */
.splash__field {
  position: absolute;
  inset: 0;
  pointer-events: none;
  background-image:
    radial-gradient(
      58rem 40rem at 20% 8%,
      var(--glass-mesh-a),
      transparent 62%
    ),
    radial-gradient(
      46rem 34rem at 88% 22%,
      var(--glass-mesh-b),
      transparent 64%
    );
  background-size: auto, auto;
  background-position:
    0 0,
    100% 0;
  -webkit-mask-image: radial-gradient(
    130% 90% at 46% 22%,
    #000 22%,
    transparent 82%
  );
  mask-image: radial-gradient(130% 90% at 46% 22%, #000 22%, transparent 82%);
}

.splash__inner {
  position: relative;
  display: flex;
  flex-direction: column;
  min-height: 100svh;
}

.splash__bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding-block: 1rem;
  border-bottom: 1px solid var(--color-line);
}

.splash__body {
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  padding-block: clamp(3rem, 9vh, 7rem);
}

.splash__eyebrow {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.splash__rule {
  position: relative;
  overflow: hidden;
  display: block;
  width: 2rem;
  height: 1px;
  background-color: var(--color-line);
}

.splash__rule::after {
  position: absolute;
  inset: 0 auto 0 -100%;
  width: 70%;
  content: "";
  background-color: var(--color-ink);
  animation: splash-rule-flow 1.8s linear infinite;
}

.splash__title {
  margin-top: 1.25rem;
  font-size: clamp(2.625rem, 9vw, 7rem);
}

.splash__sentence {
  max-width: 46ch;
  margin-top: 1.75rem;
  font-size: clamp(1.0625rem, 1.4vw, 1.25rem);
  line-height: 1.6;
  color: var(--color-ink-muted);
}

.splash__disciplines {
  margin-top: 2rem;
}

.splash__actions {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.75rem;
  margin-top: 2.75rem;
}

.splash__enter {
  gap: 0.625rem;
  height: 3rem;
  padding-inline: 1.5rem;
}

.splash__arrow {
  display: inline-block;
  transition: transform 150ms ease-out;
}

.splash__enter:hover .splash__arrow {
  transform: translateX(0.2em);
}

.splash__foot {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem 1.5rem;
  padding-block: 1rem;
  border-top: 1px solid var(--color-line);
}

.splash__availability {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}

/* One restrained entrance, stepped down the plate. The final state is also the
   resting state, so removing the animation leaves every line fully visible. */
.splash__bar,
.splash__eyebrow,
.splash__title,
.splash__sentence,
.splash__disciplines,
.splash__actions,
.splash__foot {
  animation: splash-rise 460ms cubic-bezier(0.22, 0.61, 0.36, 1) both;
}

.splash__bar {
  animation-delay: 20ms;
}

.splash__eyebrow {
  animation-delay: 70ms;
}

.splash__title {
  animation-delay: 120ms;
}

.splash__sentence {
  animation-delay: 170ms;
}

.splash__disciplines {
  animation-delay: 220ms;
}

.splash__actions {
  animation-delay: 280ms;
}

.splash__foot {
  animation-delay: 340ms;
}

@keyframes splash-rise {
  from {
    opacity: 0;
    transform: translateY(14px);
  }

  to {
    opacity: 1;
    transform: none;
  }
}

@keyframes splash-rule-flow {
  to {
    transform: translateX(285%);
  }
}

@media (prefers-reduced-motion: reduce) {
  .splash,
  .splash__arrow {
    transition: none;
  }

  .splash__bar,
  .splash__eyebrow,
  .splash__title,
  .splash__sentence,
  .splash__disciplines,
  .splash__actions,
  .splash__foot {
    animation: none;
  }

  .splash__rule::after {
    animation: none;
    transform: translateX(0);
  }
}
</style>
