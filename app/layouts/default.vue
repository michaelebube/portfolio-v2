<template>
  <div class="relative flex min-h-svh flex-col">
    <SiteGrid />

    <a class="skip-link" href="#main">Skip to content</a>

    <SiteNav />

    <main id="main" class="flex-1">
      <slot />
    </main>
  </div>
</template>
