# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Greenfield at `portfolio/`. Scaffold complete as of Phase 1 (Foundation), approved 2026-10-16; homepage sections land in Phase 2. Nuxt 4 conventions, Vue 3, TypeScript.

**Styling: TailwindCSS**, confirmed by the user on 2026-10-15. Tailwind is the primary styling approach; the `AGENT.md` §5 palette, typography and spacing become theme tokens backed by semantic CSS variables rather than raw hex values spread through class names. No separate SCSS architecture alongside it — component-scoped CSS only where utilities are genuinely the wrong tool. Nuxt 4 integration method and Tailwind version are an implementation choice made at scaffold time.

Static generation/prerendering preferred for content pages.

## Users

Three confirmed audiences, in this order of emphasis:

1. **Recruiters and hiring managers** evaluating Ebube Michael for internship → graduate/junior software engineering roles. They arrive from a CV or application, skim, and look for evidence they can trust.
2. **Freelance and contract clients** deciding whether to commission a build. They care about shipped outcomes, range, and how to start a conversation.
3. **Peers and the developer community** judging craft and systems thinking. They read architecture detail and notice dishonest claims immediately.

All three are served by the same posture: the page must be scannable by a non-technical recruiter and credible to a senior engineer who reads the case studies.

## Product Purpose

A personal engineering portfolio that communicates software engineering ability, thoughtful product development, systems thinking, and applied AI experience. It exists to convert interest into an interview, a commission, or a professional contact.

Success means a reader can tell — without asking — what was built, what was actually verified, what is in progress, and what the engineer's reasoning was.

## Positioning

**Presentation-limited truth: the portfolio's status labels are its signature.** Every project statement is tagged as implemented, tested, deployed, planned, or unverified, and the page visibly separates verified functionality from incomplete work. Neighbouring portfolios of comparable skill compete on visual trend; this one competes on being the rare developer site whose claims survive scrutiny from a senior engineer reading the source. The distinction between *exposure to a tool* and *production expertise* is made explicit rather than blurred.

## Operating Context

- Workspace root `C:\Users\Michael Ebube\Documents\Coding\Updated-Portfolio` holds sibling project directories. Not a monorepo, no root `package.json`.
- The portfolio app lives at `Updated-Portfolio/portfolio/`. Sibling repositories stay in place — never moved, renamed, reinitialized, or modified without explicit authorization.
- Sibling projects are both the portfolio's subject matter and its evidence source: `mindwell/`, `GhostPay_BackendClient-main/`, `GhostPay_Android_Nuxt/`, `Twitter BookMark Organizer/XShare/` (+ `XShare-legacy/`), `Kene Portfolio/folio/`, `InvestmentFunds-main/`.
- Build proceeds in gated phases (Foundation → Homepage → Evidence and Case Studies → Refinement and QA). At each phase boundary: summarize changed files, checks actually run, results, blockers — then stop for review. Never auto-continue.
- `AGENT.md` at the project root is the authoritative engineering guide and is read at the start of each session.

## Capabilities and Constraints

**The site must ship:** a homepage (nav, hero, About, Selected Work, Other Projects, Experience, Toolkit, contact footer); a reusable case-study template with file-based routes per project; responsive image sizing and lazy loading for below-the-fold media.

**Homepage copy budget:** concise per project; each featured project links to its dedicated case study. No unsupported achievements or quantitative impact claims used as filler.

**Content source of truth for projects** (`AGENT.md` §8–§10, treated as verified stack lists, not feature proof):

- *MindWell AI* — final-year project; a wellbeing companion for Nigerian university students. Nuxt 4 + TypeScript; Firebase Auth, Firestore, Cloud Functions; Dialogflow CX; Gemini via Vertex AI; English and Nigerian Pidgin. **Hard constraint:** never claim the app diagnoses, treats, or replaces professional mental healthcare. **BUS-11: publishable, labelled self-reported** — a usability evaluation with 21 participants returned a mean of 4.50/5. Ship it naming the instrument and the sample size, and stating that the methodology has not been independently verified. Never framed as validated, benchmarked, or third-party. The résumé additionally reports Firebase auth, persistent chat history, mood logging, crisis detection, and serverless backend functions — these are **reported**, not demonstrated, until re-verified against the application.
- *XVault* — `Twitter BookMark Organizer/XShare/`. **Label "In development."** Express 5 + TypeScript, MongoDB/Mongoose, BullMQ + Redis, Playwright automation, Nuxt 4 frontend, Cloudflare R2 media storage. Module existence does not prove end-to-end function. Describe storage as Cloudflare R2 — **never** Cloudinary. Never present an empty-state screenshot as a populated library.
- *GhostPay* — voice-driven payment collection. Firebase Cloud Functions backend (`GhostPay_BackendClient-main/`); Nuxt 4 + Capacitor client (`GhostPay_Android_Nuxt/ghost-pay-client/`) with native Android components. Backend and client are separate directories with different integration requirements — verify actual contracts before calling the system fully integrated. No invented payment dashboard; no claim of successful live payment processing.
- *Kene's Portfolio* — `Kene Portfolio/folio/`, separate Nuxt 3 portfolio. Smaller entry. Live URL must be verified before any demo link.
- *Cowrywise Investment Demo* — `InvestmentFunds-main/`, Vue 3 + Vite + Vuex + Axios. API endpoint and availability unverified; detail route currently depends on list data loading first. Describe as **an independent investment-fund API integration demo, not an official Cowrywise product.** No working-live-demo promise until config and both flows are verified.

**Toolkit constraint:** technologies appear only where there is genuine practical experience; real-project technologies are distinguished from ones currently being learned.

**Safety constraints:** no connecting to production services, no modifying production data, no destructive operations without authorization. No printing secrets, API keys, tokens, or `.env` values. Screenshots are captured only from safely validated flows; XVault populated-library capture requires a safe environment first and no production data without explicit authorization.

**Open decisions (undecided on purpose — do not invent):**

- GitHub and LinkedIn destinations: the résumé names both but carries **no link annotations** (its PDF metadata shows it was produced by "Microsoft: Print To PDF"), so neither URL has been verified. Supply the handles; each is checked to respond before it ships.
- Body typeface: **decided 2026-10-16 by the Phase 1 review — Geist** (Vercel × basement.studio, SIL OFL 1.1), self-hosted at `public/fonts/geist/geist-regular.woff2`, weight 400, with the system sans stack as fallback. Disket Mono stays display-only and cannot carry running text; technical metadata uses the system monospace stack. The file was taken unmodified from the `geist` npm package (v1.7.2) as an acquisition source — no font package is a dependency at runtime.

## Brand Commitments

Binding, per `AGENT.md` §5:

- **Navigation wordmark:** `MIKO` — compact, understated, legible; functions as the personal mark and links home.
- **Hero heading:** `Ebube Michael` — exact, never expanded with additional names, middle names, or honorifics.
- **Full name:** `Ebube Michael` — confirmed 2026-10-16; `Ifeanyichukwu` is dropped everywhere and not to be reintroduced. Used in About content, résumé link text, structured metadata, and professional documents. Hero heading is exactly `Ebube Michael`. Public contact is `michaelebube18@gmail.com`; the résumé's mobile number ships only inside the PDF and is never rendered as site text.
- No permanent accent colour is required — hierarchy comes from contrast, typography, layout, subtle borders, and imagery.

`AGENT.md` §4–§6 is the authoritative and binding brief for the visual direction (dark, minimal, editorial, technical; Disket Mono for display; restrained motion; four named reference sites). It is a constraint the user volunteered, recorded here without expansion. **It is not to be replaced or redirected toward a different visual world.** Visual-world and surface decisions are made in new-work against that brief, not in this file.

## Evidence on Hand

Real assets on disk, with paths:

| Asset | Path | State |
|---|---|---|
| XVault screenshots (10) | `Twitter BookMark Organizer/XShare/screenshots/` | Real captures, but predominantly **login, empty-library, settings, and unauthenticated** states. Not evidence of a populated bookmark library. |
| Kene's Portfolio images | `Kene Portfolio/folio/assets/img/` (`Profile-Pic.png`, `Profile-Pic-1.jpg`, `bg-img.jpg`) | Local assets usable for that project's presentation. Note: these are another person's profile images. |
| MindWell background | `mindwell/app/assets/images/bgImage.png` | Plus an untitled `Screenshot 2025-12-25 163415.png`. No verified chat or mood-screen capture. |
| Cowrywise demo logo | `InvestmentFunds-main/src/assets/logo.png` | `public/` needs inspection before any asset claim. |
| GhostPay imagery | `GhostPay_Android_Nuxt/.../mipmap-*`, `drawable-*` | Launcher icons and splash screens only — **no UI evidence**. |
| Disket Mono webfont | served: `public/fonts/disket-mono/disket-mono-{regular,bold}.woff2` · source archive: `assets/fonts/disket-mono/*.ttf` (never served) · licence: `licenses/diket-mono-eula.pdf` | Family `Disket Mono`, **only two weights** — Regular (400) and Bold (700); 307 glyphs; `isFixedPitch` true, so display-only. No italic, no variable axis. Converted to `.woff2` 2026-10-16: 176 KB → 37 KB, glyph set verified unchanged, no subsetting. **Licence verified** (`Mariano Diez Free Font EULA`, rostype.com): web font generation and website use permitted, personal and commercial; modification, subsetting, renaming and redistribution forbidden. No attribution required. |
| Résumé | `public/Resume-Michael_Ebube.pdf` | Real PDF, 644 KB, **read 2026-10-16**. Author `Michael Ebube`; produced by "Microsoft: Print To PDF". Source of the verified background table below. Contains the mobile number — kept inside the PDF, never rendered as page text. |
| Geist webfont | served: `public/fonts/geist/geist-regular.woff2` · licence: `licenses/geist-ofl-1.1.txt` | Family `Geist`, weight 400, 975 glyphs, `isFixedPitch` false — the **body** face, added 2026-10-16 by Phase 1 review decision. Taken unmodified from the `geist` npm package v1.7.2; the package is an acquisition source, not a runtime dependency. OFL 1.1, no reserved font name. |

**Verified background — sole source `public/Resume-Michael_Ebube.pdf`, read 2026-10-16:**

| Fact | Value |
|---|---|
| Education | Covenant University, Ogun State, Nigeria — BSc Computer Science, 2022–2026; cumulative GPA 4.97/5.0 |
| Secondary | Christ College Lagos — Senior Secondary School Certificate (Science), 2019–2022; Best WAEC Result 2022, highest JAMB score in year, Senior Prefect |
| Experience | Cowrywise (YC S18), Lagos State — Engineering Intern, Frontend Team, **March 2025 – September 2025** |
| Internship work | Nuxt 2 → Nuxt 3 platform migration, legacy components refactored into modular architecture for SSR reliability; structured async data fetching + dynamic metadata improving rendering stability and SEO on high-traffic marketing pages; responsive Cowrywise Kids interfaces (accessibility, performance); real-time multiplayer financial card game via Socket.io with event-driven state sync; GSAP animation integration holding strong Lighthouse scores; agile delivery with Git, feature branches, PRs, code review, CI |
| Reported skills | TypeScript, JavaScript (ES6+), Python · Node.js, Express, Firebase Cloud Functions, Socket.io · Vue, Nuxt (Composition API), React, **Tailwind CSS**, SCSS · applied ML pipelines, CNN models · Git, GitHub, CI, Vite, npm, yarn, Firebase, Render, Vercel |
| Certificates | Codecademy Learn Advanced React (2025), Learn React Router v6 (2025); freeCodeCamp JavaScript Algorithms and Data Structures (2024); Prompt Engineering — OBTranslate (2024) |
| Other | Pre-professional football, Barca Academy Lagos (U-15); interests: football, history, financial literacy, student leadership, AI-powered products |

**Publication decisions (confirmed 2026-10-16):** cumulative GPA 4.97/5.0 appears in the **About section only** — not in the hero, Toolkit or footer. The résumé's mobile number stays inside the downloadable PDF and is never rendered as page text; email is the public contact route.

Two naming conflicts to resolve in the site's favour of `AGENT.md`: the résumé calls MindWell *"Mental Health AI Chatbot"* and cites "Gemini API" where `AGENT.md` §8 says *MindWell AI* and *Gemini through Vertex AI*. The résumé does **not** mention XVault, GhostPay, Kene's Portfolio, or the Cowrywise investment demo — those four have no résumé-level evidence.

**Absences future work must not fabricate:** no live or deployed URLs anywhere in any repository; no GitHub or LinkedIn URLs; no canonical production domain; no sitemap host; no testimonials, customers, metrics, or press; no architecture diagrams; `mindwell/docs/` is **empty**; no evaluation report, methodology document, or raw data behind the BUS-11 4.50/5 figure — only the résumé's one-line summary. Where evidence is missing, the page states the absence or omits the claim — never fills the gap. (Body typeface and the homepage title/description were resolved on 2026-10-16 and are no longer absences.)

## Product Principles

1. **Technical honesty outranks polish.** Every claim is labelled implemented, tested, deployed, planned, or unverified. Visual finish must never be purchased with a claim that would not survive source inspection.
2. **Evidence is captured, not illustrated.** Screenshots come from running applications; diagrams come from inspected source and verified integration contracts. A mockup is never presented as a working implementation.
3. **Show the reasoning, not just the artifact.** Case studies carry the engineering challenge, the trade-off, and the alternative that was rejected — that reasoning is the product being sold.
4. **Range with candour.** Frontend, backend, systems, and applied AI are all in scope, and each is presented at its true depth; exposure to a tool is never dressed as production expertise.
5. **Restraint serves transfer.** Navigation, motion, and decoration stay subordinate to the work. Nothing on the page delays a reader's access to the projects.

## Accessibility & Inclusion

Per `AGENT.md` §13, treated as required:

- Semantic HTML with a logical heading hierarchy; descriptive link text; meaningful image alt text.
- Full keyboard accessibility with visible focus states and correct anchor offsets under a sticky nav.
- `prefers-reduced-motion` respected; all interactive controls remain usable with animation disabled.
- Readable text contrast; mobile navigation and interactive elements usable on
 touchscreens.
- English-language content; written to be readable by non-native speakers in the hiring audience.
