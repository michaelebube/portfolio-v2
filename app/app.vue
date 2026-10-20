<script setup lang="ts">
/**
 * The landing cover is a persistent arrival, not a route: it sits over the
 * homepage once every three days per browser. The storage check happens here
 * rather than in the cover component because the page shell — which must be
 * hidden and `inert` while the cover is open — is this component's child, and
 * the cover is its sibling.
 *
 * The pre-paint script in `nuxt.config.ts` adds `html.splash-pending` before
 * the first paint when this browser has not seen the cover, so the hidden page
 * never flashes behind it. This component stands that class down after mount in
 * every case, which is also what lets the 2.5 s failsafe work: if the app never
 * mounts, the class times out and the page becomes visible on its own.
 */
const SPLASH_KEY = "miko-splash-seen";
const SPLASH_INTERVAL_MS = 3 * 24 * 60 * 60 * 1000;

const route = useRoute();

const splashOpen = ref(false);
const splashLeaving = ref(false);

let leaveTimer: ReturnType<typeof setTimeout> | undefined;

function hasSeenSplash() {
  try {
    const stored = localStorage.getItem(SPLASH_KEY);
    if (!stored) return false;

    const { seenAt } = JSON.parse(stored) as { seenAt?: unknown };
    return (
      typeof seenAt === "number" &&
      Number.isFinite(seenAt) &&
      Date.now() - seenAt < SPLASH_INTERVAL_MS
    );
  } catch {
    // Storage can be denied in private contexts. Showing the cover again is a
    // smaller cost than failing to render the page.
    return false;
  }
}

function markSplashSeen() {
  try {
    localStorage.setItem(SPLASH_KEY, JSON.stringify({ seenAt: Date.now() }));
  } catch {
    // Same as above: the visit still works, it just may show the cover again.
  }
}

/**
 * Take the page out of its pre-paint hidden state. `splashBound` tells the head
 * script's failsafe timer that the app did mount, so it must not reveal the page
 * on its own while the cover is up.
 */
function revealPage() {
  const root = document.documentElement;
  root.classList.remove("splash-pending");
  root.dataset.splashBound = "1";
}

function enterSite() {
  if (splashLeaving.value) return;

  markSplashSeen();
  revealPage();
  splashLeaving.value = true;

  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;
  leaveTimer = setTimeout(
    () => (splashOpen.value = false),
    reducedMotion ? 0 : 320,
  );
}

onMounted(() => {
  document.documentElement.dataset.splashBound = "1";

  // Only the homepage is a landing. A reader arriving on a case study directly
  // has already made a choice; a cover would be an interruption.
  if (route.path === "/" && !hasSeenSplash()) {
    splashOpen.value = true;
    return;
  }

  revealPage();
});

onBeforeUnmount(() => {
  if (leaveTimer) clearTimeout(leaveTimer);
});
</script>

<template>
  <div data-app-shell :inert="splashOpen">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>

  <PortfolioSplash
    v-if="splashOpen"
    :leaving="splashLeaving"
    @enter="enterSite"
  />
</template>
