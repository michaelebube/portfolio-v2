<script setup lang="ts">
import {
  aboutFacts,
  credentials,
  featuredProjects,
  otherProjects,
  roles,
  toolkit,
} from "~/data/portfolio";

/**
 * Phase 2 homepage. Section order is fixed by AGENT.md §7, and every section
 * carries the id its navigation anchor targets, so no link ships pointing at
 * nothing (Phase 1 review condition, 2026-10-16).
 *
 * Hero copy is the approved Phase 1 wording — do not reword it.
 * Title and description live in `nuxt.config.ts` as the site default. No
 * canonical URL, no `og:url`, no social links: the production domain is unknown
 * and must not be guessed (AGENT.md §13).
 *
 * Type sizes come from one small scale — 11 / 12 / 14 / 16 / 18, then the three
 * display steps — so the page reads as a system rather than a pile of choices.
 */
const disciplines = ["Software", "Systems", "Applied AI"];

useRevealOnScroll();

const aboutIntro = [
  "I am in my final year of Computer Science at Covenant University, and I spent six months on the frontend team at Cowrywise (YC S18), migrating the main web platform from Nuxt 2 to Nuxt 3, refactoring legacy components into a modular architecture, and building responsive interfaces for Cowrywise Kids.",
  "Most of my work sits between the interface and the systems behind it: Nuxt and Vue at the front, Node, Express and Firebase underneath, applied AI through Dialogflow CX and Gemini. My final-year project, MindWell AI, puts those pieces together for Nigerian university students.",
  "I care about the reasoning as much as the result — what was tried, what was rejected, and what still does not work. Every project below is labelled with what has actually been verified, because a portfolio that survives inspection is more useful than one that only reads well.",
];
</script>

<template>
  <div>
    <!-- =====================================================================
         2 · Hero
         Left-aligned: heading, copy, labels and both actions share the page
         container's left edge with every later section. The right half stays
         empty on purpose — nothing decorative is added to balance it. This is
         the page's one deliberate rest.
         ===================================================================== -->
    <section class="container-page" aria-label="Introduction">
      <div
        class="flex min-h-[calc(100svh-3.5rem)] flex-col justify-center py-20 md:min-h-[calc(100svh-4rem)]"
      >
        <h1 class="text-[clamp(2.625rem,9vw,5.5rem)]">Ebube Michael</h1>

        <p class="measure mt-7 text-[1.125rem] leading-[1.6] text-ink-muted">
          I build thoughtful software products, from user-facing experiences to
          the systems behind them.
        </p>

        <ul class="disciplines label-mono mt-8">
          <li v-for="discipline in disciplines" :key="discipline">
            {{ discipline }}
          </li>
        </ul>

        <div class="mt-12 flex flex-wrap items-center gap-3">
          <a href="#work" class="btn btn-primary">Explore my work</a>
          <a href="#contact" class="btn btn-secondary">Get in touch</a>
        </div>

        <p class="mt-16 flex items-center gap-4">
          <span class="hidden h-px w-16 bg-line sm:block" aria-hidden="true" />
          <!-- Keeps the nav-link padding: the hit area, not rhythm. -->
          <a href="#about" class="label-mono nav-link">Next · About</a>
        </p>
      </div>
    </section>

    <!-- =====================================================================
         3 · About — prose left, verified facts right.
         The cumulative GPA lives here and nowhere else (AGENT.md §11).
         ===================================================================== -->
    <SectionShell id="about" heading="About">
      <div class="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div class="space-y-5 lg:col-span-7">
          <p
            v-for="(paragraph, index) in aboutIntro"
            :key="index"
            class="max-w-[68ch] leading-[1.7] text-ink-muted"
            data-reveal
            :style="{ '--reveal-step': index + 1 }"
          >
            {{ paragraph }}
          </p>
        </div>

        <dl
          class="lg:col-span-4 lg:col-start-9"
          data-reveal
          :style="{ '--reveal-step': 2 }"
        >
          <div
            v-for="fact in aboutFacts"
            :key="fact.term"
            class="border-b border-line py-4 first:border-t first:pt-4"
          >
            <dt class="label-mono">{{ fact.term }}</dt>
            <dd class="mt-2 leading-[1.6] text-ink">{{ fact.detail }}</dd>
          </div>
        </dl>
      </div>
    </SectionShell>

    <!-- =====================================================================
         4 · Selected Work — alternating editorial media-and-text rows.
         MindWell AI leads because it carries the most verified material.
         ===================================================================== -->
    <SectionShell id="work" heading="Selected Work">
      <div class="space-y-22 lg:space-y-32">
        <ProjectShowcase
          v-for="(project, index) in featuredProjects"
          :key="project.id"
          :project="project"
          :flip="index % 2 === 1"
        />
      </div>
    </SectionShell>

    <!-- =====================================================================
         5 · Other Projects — stacked rows, a different shape from Selected Work
         on purpose, and presented at the depth their evidence supports.
         ===================================================================== -->
    <SectionShell id="other" heading="Other Projects">
      <div>
        <article
          v-for="(project, index) in otherProjects"
          :key="project.id"
          class="grid gap-5 border-t border-line py-9 lg:grid-cols-12 lg:gap-16"
          data-reveal
          :style="{ '--reveal-step': index + 1 }"
        >
          <div class="lg:col-span-4">
            <h3 class="text-[clamp(1.375rem,2.6vw,1.875rem)]">
              {{ project.name }}
            </h3>
            <p class="label-mono mt-3">{{ project.kind }}</p>
          </div>

          <div class="lg:col-span-7 lg:col-start-6">
            <p class="text-[1.125rem] leading-[1.6] text-ink">
              {{ project.description }}
            </p>
            <p class="mt-4 leading-[1.7] text-ink-muted">
              {{ project.stack.join(" · ") }}
            </p>
            <div class="mt-5 flex flex-wrap items-center gap-3">
              <a
                :href="project.liveSite"
                target="_blank"
                rel="noopener noreferrer"
                class="btn btn-secondary"
                :aria-label="`Visit the ${project.name} live site`"
              >
                Live Application
              </a>

              <a
                :href="project.repo"
                target="_blank"
                rel="noopener noreferrer"
                class="btn btn-secondary"
                :aria-label="`${project.name} source repository`"
              >
                Repository
              </a>
            </div>
          </div>
        </article>
      </div>
    </SectionShell>

    <!-- =====================================================================
         6 · Experience — a date rail beside the work. The rail is second in the
         DOM and first on a wide screen, so a phone reads the role before its
         dates rather than a label before a heading.
         ===================================================================== -->
    <SectionShell id="experience" heading="Experience">
      <div class="space-y-14">
        <article
          v-for="role in roles"
          :key="role.id"
          class="grid gap-5 border-t border-line pt-9 lg:grid-cols-12 lg:gap-16"
          data-reveal
        >
          <div class="lg:col-span-8 lg:col-start-5 lg:row-start-1">
            <h3 class="text-[clamp(1.375rem,2.6vw,1.875rem)]">
              {{ role.role }}
            </h3>
            <p class="mt-3 text-[1.125rem] leading-[1.6] text-ink">
              {{ role.organisation }}
            </p>
            <p class="measure mt-4 leading-[1.7] text-ink-muted">
              {{ role.summary }}
            </p>

            <ul
              class="mt-6 max-w-[64ch] list-disc space-y-3 pl-5 leading-[1.7] text-ink-muted"
            >
              <li v-for="point in role.points" :key="point">
                {{ point }}
              </li>
            </ul>
          </div>

          <div class="lg:col-span-3 lg:col-start-1 lg:row-start-1">
            <p class="label-mono">{{ role.period }}</p>
            <p class="label-mono mt-2">{{ role.location }}</p>
          </div>
        </article>

        <div class="border-t border-line pt-9" data-reveal>
          <div class="grid gap-5 lg:grid-cols-12 lg:gap-16">
            <div class="lg:col-span-8 lg:col-start-5 lg:row-start-1">
              <dl>
                <div
                  v-for="credential in credentials"
                  :key="credential.id"
                  class="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2 border-b border-line py-5"
                >
                  <dt>
                    <span class="block text-[1.125rem] leading-[1.6] text-ink">
                      {{ credential.institution }}
                    </span>
                    <span class="mt-1 block leading-[1.6] text-ink-muted">
                      {{ credential.qualification }}
                    </span>
                  </dt>
                  <dd class="label-mono">
                    {{ credential.period }} · {{ credential.location }}
                  </dd>
                </div>
              </dl>
            </div>

            <div class="lg:col-span-3 lg:col-start-1 lg:row-start-1">
              <h3 class="label-mono">Education</h3>
            </div>
          </div>
        </div>
      </div>
    </SectionShell>

    <!-- =====================================================================
         7 · Toolkit — five plain lists, no cards. Each group carries the line
         that says where it was actually used, so the section distinguishes a
         shipped project from a résumé entry instead of flattening the two.
         ===================================================================== -->
    <SectionShell
      id="toolkit"
      heading="Toolkit"
      meta="Technologies used in real projects"
    >
      <div class="grid gap-x-12 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
        <div
          v-for="(group, index) in toolkit"
          :key="group.id"
          class="pt-1"
          data-reveal
          :style="{ '--reveal-step': index + 1 }"
        >
          <h3 class="text-[1.125rem] leading-[1.4]">{{ group.title }}</h3>

          <ul class="mt-4 space-y-1.5">
            <li
              v-for="item in group.items"
              :key="item"
              class="leading-[1.6] text-ink"
            >
              {{ item }}
            </li>
          </ul>
        </div>
      </div>
    </SectionShell>

    <!-- 8 · Contact and footer -->
    <SiteFooter />
  </div>
</template>
