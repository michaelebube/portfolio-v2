<script setup lang="ts">
import {  findCaseStudy } from '~/data/caseStudies'

/**
 * The one case-study template. Every project route renders through this file;
 * the content lives in `~/data/caseStudies.ts`.
 *
 * Reading order is the eight parts the phase brief asks for: the opening states
 * what the project is and what it was built with, the claim ledger states how
 * far each of those statements is actually proven, the sections carry problem,
 * architecture, decisions, trade-offs, outcomes and limits, and the closing two
 * blocks say what evidence is still missing and where the source is.
 *
 * Glass on this page: exactly one panel, the metadata strip at the top, plus the
 * chip tier on the claim marks. Everything below it is a solid surface. That is
 * deliberate — the strip is a label over the ambient field, which is what glass
 * is for, while the ledger and the prose are the densest reading on the site and
 * transparency under running text is a legibility tax the reader did not ask to
 * pay. Nothing here nests a glass surface inside another one.
 */

const route = useRoute()
const slug = computed(() => String(route.params.slug))
const study = computed(() => findCaseStudy(slug.value))

// A route is only prerendered if it is in `caseStudyRoutes`, so reaching this
// without a match means a hand-typed address. That is a 404, not a blank page.
if (!findCaseStudy(String(route.params.slug))) {
  throw createError({ statusCode: 404, statusMessage: 'No case study at this address', fatal: true })
}

useRevealOnScroll()

useSeoMeta({
  title: () => (study.value ? `${study.value.name} — Case study` : 'Case study'),
  description: () => study.value?.tagline ?? '',
  ogTitle: () => (study.value ? `${study.value.name} — Case study` : 'Case study'),
  ogDescription: () => study.value?.tagline ?? '',
})

/** The three facts worth having before the prose starts. */
const meta = computed(() => {
  const entry = study.value
  if (!entry) return []
  return [
    { term: 'Status', detail: entry.status },
    { term: 'Role', detail: entry.role },
    { term: 'Period', detail: entry.period },
  ]
})

/**
 * What the captures section says about itself.
 *
 * GhostPay has no screenshots — none exist that would be honest to show — so
 * its lead has to explain why a diagram is standing where a picture would be.
 * A project with captures gets the opposite warning instead: what a screenshot
 * is actually worth, which is less than it looks.
 */
const figuresLead = computed(() => {
  const entry = study.value
  if (!entry) return ''
  if (entry.figures?.length) {
    return 'Real captures of a build of this project, shown at the size they were taken. Every caption says what its image shows and what it does not — an empty state proves that a screen renders, and nothing beyond it.'
  }
  return 'No screenshot of this project is shown, because none exists that would be honest to show. The diagram below is drawn from the inspected source: it says how the parts connect and whose work each one is, not that the system runs.'
})
</script>

<template>
  <article v-if="study" class="pb-24 md:pb-32">
    <!-- =====================================================================
         Opening. Back link, name, status, one line of what it is.
         ===================================================================== -->
    <header class="container-page pt-10 md:pt-14">
      <!-- Marked as a landmark rather than left as a bare link: it is the
           reader's way back into the index, and a navigation landmark is what
           lets a screen reader jump straight to it. -->
      <nav aria-label="Breadcrumb">
        <NuxtLink to="/#work" class="label-mono nav-link inline-flex items-center gap-2">
          <span aria-hidden="true">←</span> All work
        </NuxtLink>
      </nav>

      <div class="mt-10 flex flex-wrap items-center justify-between gap-x-8 gap-y-4">
        <h1 class="text-[clamp(2.25rem,7vw,4.5rem)]">{{ study.name }}</h1>
        <GlassChip :label="study.status" />
      </div>

      <p class="measure mt-6 text-[1.125rem] leading-[1.6] text-ink md:text-[1.25rem]">
        {{ study.tagline }}
      </p>
    </header>

    <!-- =====================================================================
         The page's single glass panel: three facts about the project, floating
         over the ambient field. No internal rules — a child of a glass surface
         paints no surface of its own, so the columns are separated by space and
         the label/small-caps step rather than by hairlines.
         ===================================================================== -->
    <div class="container-page mt-12 md:mt-16">
      <div
        v-liquid-glass
        class="liquid-glass"
        data-reveal
      >
        <dl class="grid w-full gap-x-10 gap-y-6 p-6 sm:grid-cols-2 md:p-8 lg:grid-cols-3">
          <div v-for="fact in meta" :key="fact.term" class="w-full min-w-0">
            <dt class="label-mono">{{ fact.term }}</dt>
            <dd class="mt-2.5 leading-[1.6] text-ink">{{ fact.detail }}</dd>
          </div>
        </dl>
      </div>
    </div>

    <!-- Summary — the longest single statement, on a solid surface under the
         panel rather than inside it. -->
    <div class="container-page mt-12 md:mt-16">
      <p class="measure text-[1.0625rem] leading-[1.75] text-ink-muted" data-reveal>
        {{ study.summary }}
      </p>
    </div>


    <!-- =====================================================================
         The eight parts, six of them here. Solid, editorial, heading rail.
         ===================================================================== -->
    <div class="container-page mt-16 space-y-14 md:mt-24 md:space-y-20">
      <CaseStudySection
        v-for="section in study.sections"
        :key="section.id"
        :section="section"
      />
    </div>

    <!-- =====================================================================
         Stack. A flat list, deliberately not a technology wall: the reader has
         just finished the sections that say what each of these was used for.
         ===================================================================== -->
    <section class="container-page mt-16 md:mt-24" aria-labelledby="stack-heading">
      <div class="grid gap-6 border-t border-line pt-10 lg:grid-cols-12 lg:gap-16">
        <h2 id="stack-heading" class="text-[clamp(1.375rem,2.4vw,1.75rem)] lg:col-span-3" data-reveal>
          Built with
        </h2>
        <ul class="flex flex-wrap gap-x-3 gap-y-3 lg:col-span-8 lg:col-start-5" data-reveal>
          <li v-for="item in study.stack" :key="item">
            <GlassChip :label="item" />
          </li>
        </ul>
      </div>
    </section>

    <!-- =====================================================================
         From the running build. The evidence that exists, placed before the
         list of what does not, because a reader who has just been told what is
         unproven is owed the sight of what is proven.

         Every caption states what its image does and does not show. That is not
         a stylistic tic: a screenshot is the most persuasive and least examined
         kind of evidence on a page like this, and several of the captures below
         are empty states that prove a screen renders and nothing else.
         ===================================================================== -->
    <section
      v-if="study.figures?.length || study.diagram"
      class="container-page mt-16 md:mt-24"
      aria-labelledby="build-heading"
    >
      <div class="grid gap-6 border-t border-line pt-10 lg:grid-cols-12 lg:gap-16">
        <div class="lg:col-span-3">
          <h2 id="build-heading" class="text-[clamp(1.375rem,2.4vw,1.75rem)]" data-reveal>
            From the running build
          </h2>
          <p class="mt-4 text-[0.9375rem] leading-[1.6] text-ink-muted" data-reveal>
            {{ figuresLead }}
          </p>
        </div>

        <div class="lg:col-span-8 lg:col-start-5" data-reveal>
          <!-- The only diagram on the site. If a second project needs one, the
               component name belongs in the data at that point; a map of one
               entry here would be indirection without a second caller. -->
          <figure v-if="study.diagram">
            <GhostPayArchitecture />
            <figcaption class="mt-7 border-t border-line pt-5 leading-[1.7] text-ink-muted">
              {{ study.diagram.caption }}
            </figcaption>
          </figure>

          <!-- One figure per row. The captures are application screenshots
               between 350 and 1917 pixels wide, and a two-column grid puts the
               wide ones at a quarter scale — legible as a shape and useless as
               the evidence the caption beside it is describing. They stack
               instead, at the full width of this column; a capture taken at
               phone width caps itself rather than stretching, which is what
               `figure.phone` is for. -->
          <ul
            v-if="study.figures?.length"
            class="space-y-12"
            :class="study.diagram ? 'mt-12' : ''"
          >
            <li
              v-for="figure in study.figures"
              :key="figure.src"
              :class="figure.phone ? 'max-w-[16rem]' : ''"
            >
              <figure>
                <!-- Width and height are carried so the browser reserves the
                     right box before the file lands, and the image is never
                     stretched past the size it was taken at. -->
                <img
                  :src="figure.src"
                  :alt="figure.alt"
                  :width="figure.width"
                  :height="figure.height"
                  loading="lazy"
                  decoding="async"
                  class="h-auto w-full border border-line"
                >
                <figcaption class="mt-4 leading-[1.7] text-ink-muted">
                  {{ figure.caption }}
                </figcaption>
              </figure>
            </li>
          </ul>
        </div>
      </div>
    </section>

    <!-- =====================================================================
         Links. Rendered from data, so a link only ever appears here once it has
         been checked to resolve. With none verified, that is what it says.
         ===================================================================== -->
    <section class="container-page mt-16 md:mt-24" aria-labelledby="links-heading">
      <div class="grid gap-6 border-t border-line pt-10 lg:grid-cols-12 lg:gap-16">
        <h2 id="links-heading" class="text-[clamp(1.375rem,2.4vw,1.75rem)] lg:col-span-3" data-reveal>
          Source and links
        </h2>

        <div class="lg:col-span-8 lg:col-start-5" data-reveal>
          <ul v-if="study.links.length" class="space-y-4">
            <li v-for="link in study.links" :key="link.href" class="border-b border-line pb-4">
              <a
                :href="link.href"
                target="_blank"
                class="inline-flex items-center gap-2 text-ink underline underline-offset-4"
                rel="noopener noreferrer"
              >
                <GitHubMark v-if="link.kind === 'repo'" />
                {{ link.label }}
              </a>
              <p class="mt-2 leading-[1.7] text-ink-muted">{{ link.note }}</p>
            </li>
          </ul>

          <template v-else>
            <p class="measure leading-[1.7] text-ink-muted">
              There is no address to send you to. This project has no verified public deployment, no
              public repository and no live demo, so instead of a link that resolves to nothing the
              page says so. The evidence above was read from the source directly, offline.
            </p>
            <p class="measure mt-4 leading-[1.7] text-ink-muted">
              The code lives in a private working repository and is not published. If you would like
              to see it, ask.
            </p>
          </template>
        </div>
      </div>
    </section>

    <!-- Closing action, back to the index. -->
    <div class="container-page mt-16 md:mt-24">
      <div class="flex flex-wrap items-center gap-3 border-t border-line pt-10">
        <NuxtLink to="/#work" class="btn btn-secondary">All work</NuxtLink>
        <NuxtLink to="/#contact" class="btn btn-primary">Get in touch</NuxtLink>
      </div>
    </div>
  </article>
</template>
