# Portfolio Engineering Guide

## 1. Mission

Build a distinctive, polished engineering portfolio for **Ebube Michael**, using Nuxt 4, Vue 3 and TypeScript.

The portfolio should communicate software engineering ability, thoughtful product development, systems thinking and applied AI experience. It should feel designed and intentional rather than like a generic developer template.

The visual direction is dark, minimal, editorial and technical, with restrained motion and carefully presented project evidence.

The portfolio must accurately distinguish implemented, tested, deployed, planned and unverified functionality. Visual polish must never come at the expense of technical honesty.

## 2. Workspace and Boundaries

Workspace root:

`C:\Users\Michael Ebube\Documents\Coding\Updated-Portfolio`

The workspace contains separate project directories. It is not a monorepo and has no root `package.json`.

Create or maintain the portfolio application in:

`Updated-Portfolio/portfolio/`

Existing projects must remain in their current locations. Do not move, rename, reinitialize, or modify sibling project repositories without explicit authorization.

Before making changes:
- Inspect the target directory and current Git status.
- Identify the existing framework, package manager, dependencies and scripts.
- Inspect relevant files before editing them.
- Preserve useful existing configuration.

## 3. Operating Rules and Token Efficiency

- Work on the current phase only.
- Read this file and inspect relevant project context at the start of each session.
- Avoid generated directories, unrelated repositories and unnecessary large file dumps.
- Reuse existing dependencies and conventions when practical.
- Do not add a dependency unless its benefit justifies the cost.
- Prefer focused edits over replacing entire files.
- Do not repeat failed commands without a new diagnosis.
- Run targeted checks and summarize their results.
- Never print secrets, API keys, authentication tokens or `.env` values.
- Never fabricate screenshots, deployment URLs, test results, features, metrics or user outcomes.
- Do not connect to production services, modify production data or run destructive operations without authorization.
- Do not automatically continue to the next implementation phase.
- At each phase boundary, summarize changed files, checks performed, results and blockers, then stop for review.

Use concise updates and avoid repeatedly restating this guide.

## 4. Design References

Use these four websites as design references. Inspect the actual websites before making significant design decisions when browsing is available.

### Reference 1: Mike Wilcock

URL: https://mikewilcockdesign.com/

Study:
- Editorial presentation of selected work.
- Large typography and clear visual hierarchy.
- Motion used to enhance rather than distract from content.
- Project imagery and detailed project previews.
- Compact navigation and a considered contact section.

Adapt the clarity and project presentation to a software engineering portfolio. Do not reproduce design-agency content or imitate every animation.

### Reference 2: Tobstar Portfolio

URL: https://tobstarportfolio.netlify.app/

Inspect the actual site and identify its strongest visual and interaction patterns. Pay attention to:
- Overall composition and page structure.
- Typography and spacing.
- How the developer introduces themselves.
- How projects and technical skills are presented.
- Responsive behaviour and navigation.

Do not assume its design characteristics before inspecting it. If it cannot be accessed, report that limitation rather than inventing observations.

### Reference 3: Nahiyan Khan

URL: https://nahiyan.codes/

Study:
- Concise, technically grounded personal introduction.
- Clear communication of engineering interests and working approach.
- Minimal presentation without sacrificing substance.
- Separation of background, capabilities and contact.
- Interactions that add useful functionality.

Adapt its clarity and engineering-focused narrative. Do not copy its text, personal details or distinctive components wholesale.

### Reference 4: Samuel Rizzon

URL: https://www.samuelrizzon.dev/

Study:
- Distinctive personal branding and memorable presentation.
- Interactive elements that reflect the developer's personality.
- Project-focused storytelling and supporting details.
- Creative ways to present technical activity and experience.
- The balance between novelty and usability.

Borrow the principle of making the portfolio memorable. Select only interactions that fit this portfolio's restrained monochrome direction and remain accessible.

### Rules for Using References

- Extract design principles, not copied implementations.
- Do not copy source code, branding, text, images or proprietary assets.
- Do not force all four references into one design.
- Choose the most compatible ideas and explain major design decisions briefly.
- Preserve a coherent visual system and a recognisable identity of its own.
- Prefer purposeful originality over adding effects merely because a reference has them.

## 5. Branding and Visual Identity

### Brand

- **Navigation wordmark:** `MIKO`
- **Hero heading:** `Ebube Michael`
- **Full name:** `Ebube Michael`

Confirmed 2026-10-16: `Ifeanyichukwu` is dropped everywhere and must not be reintroduced. Use `Ebube Michael` consistently in About content, résumé link text, structured metadata and professional documents. The hero heading is exactly `Ebube Michael` — never expanded with additional names, middle names or honorifics.

**Contact details** (verified from the résumé, 2026-10-16): email `michaelebube18@gmail.com`. The résumé's mobile number stays inside the downloadable PDF — never render it as text on the site, where it would be harvested.

Keep `MIKO` compact, understated and legible. It should function as the portfolio's personal mark and link back to the homepage.

### Colour palette

| Token | Value |
|---|---|
| Background | `#090909` |
| Surface | `#141414` |
| Border | `#292929` |
| Primary text | `#F5F5F5` |
| Secondary text | `#A3A3A3` |
| Muted text | `#737373` |

Create semantic CSS variables for backgrounds, surfaces, borders, text, interactive states and focus indicators.

No permanent accent colour is required. Use contrast, typography, layout, subtle borders and imagery to create hierarchy.

Avoid excessive gradients, glowing borders, decorative clutter and low-contrast text.

### Typography

Verified by inspecting the actual font tables in `public/fonts/` — **Disket Mono** (foundry: Rostype). Record only these facts:

| Weight | `usWeightClass` | File |
|---|---|---|
| Regular | 400 | `Disket-Mono-Regular.ttf` |
| Bold | 700 | `Disket-Mono-Bold.ttf` |

- **Those are the only two weights.** There is no light, medium, semibold, black or italic. Never reference a weight, style or variable axis that is not on disk.
- Disket Mono is a fixed-pitch display face (`isFixedPitch` true, 307 glyphs, unitsPerEm 1000). Use it for display typography, the `MIKO` wordmark and major headings. Small tracked labels ("technical metadata") are set in the system monospace stack instead — see the Geist bullet below; do not move them into Disket Mono without approval, since caps-only display faces make label tracking hard to read at 11 px.
- **Its lowercase glyphs are drawn as capitals.** Measured in-browser 2026-10-16 by rendering single characters at weight 700 and comparing ink bounds: `b`, `e`, `m` and `x` each render at the same height and width as `B`, `E`, `M` and `X` (69 × 56 px ink at 100 px). The font is caps-only in effect, so `text-transform: uppercase` on display elements is a no-op and source case is invisible — sentence case is fine to author, but do not rely on case to carry meaning in display copy (an acronym, or a code sample that must stay lowercase).
- **Never set body copy in Disket Mono.** All running text uses the separate readable body font. This separation is what keeps the page readable; the display face carries identity only.
- **Body face: Geist — decided by the Phase 1 review, 2026-10-16, and shipped.** Family `Geist` (Vercel, in collaboration with basement.studio), SIL Open Font License 1.1. Served self-hosted as `public/fonts/geist/geist-regular.woff2` — 45,244 B, `usWeightClass` 400, 975 glyphs, unitsPerEm 1000, `isFixedPitch` false, read from the font tables 2026-10-16. Acquired **unmodified** from the `geist` npm package v1.7.2 (`dist/fonts/geist-sans/Geist-Regular.woff2`); the package is the acquisition source, **not a dependency** — nothing imports it at runtime and no font package appears in `package.json`. Only weight 400 ships, because 400 is the only body weight any rule sets. The package also supplies static 100, 200, 300, 500, 600, 800, 900 and 950, plus a variable `wght` 100–900 face; add a file **and** its `@font-face` only when a rule actually uses that weight — never declare a weight that is not on disk.
- **Two optical corrections the display face needs, both measured from the font tables (2026-10-16) and both tokens in `app/assets/css/main.css`.** Disket Mono is fixed-pitch and its caps carry large side bearings, so set naively as a heading it reads both loosely spaced and slightly indented:
  - `--word-spacing-display` (currently `-0.33em`): the space glyph advances `0.696em`, exactly like a letter, so a two-word heading opens a ~0.83em word gap. The correction is a dial, tuned by eye: at `-0.33em` the gap is ~0.50em advance (~0.44em ink to ink); `-0.20em` reads looser, `-0.40em` tighter.
  - `--bearing-display` (currently `-0.084em`): `E` inks at `xMin 0.084em` (`B`/`M` at `0.074em`), so an uncorrected heading's ink sits that far right of its own box — visible as a heading that looks indented against a paragraph, a label row or a button border sharing the container edge. Applied as `margin-inline-start` on `h1, h2, h3` only; it is optical, never structural spacing.
  - Both are corrections to *this* face. If the display face ever changes, re-measure rather than carrying the values over.
- **Technical metadata voice: the system monospace stack**, not a webfont (`--font-mono` in `app/assets/css/main.css`). The Phase 1 review chose a restrained system stack deliberately: labels are small and tracked, so a downloaded mono face would add weight without carrying identity.
- Licence text for Geist lives at `licenses/geist-ofl-1.1.txt` (OFL 1.1 permits self-hosting and redistribution with the licence; Geist reserves no font name, so no renaming constraint applies). Body font choice is recorded here and in `PRODUCT.md`; no `DESIGN.md` exists yet, and it is written only at the finish step of a reviewed surface.
- Serve `.woff2` where a converter is available and `.ttf` otherwise; do not commit both formats of the same weight unless the fallback is actually needed.
- **Licence: confirmed compatible** — `Mariano Diez Free Font EULA`, version 2019-09-30, foundry rostype.com, read 2026-10-16. Clause (c) expressly permits generating web font formats from the font and using them on websites; use is granted for personal and commercial purposes. Clause (e) forbids modification and derivative works — so **convert to `.woff2`, but never subset, rename internally, or otherwise alter the glyph set**. Clause (d) forbids redistributing the font software — so the original `.ttf` files are never served; ship only the generated `.woff2`. No attribution is required; a credit to Rostype in a colophon is optional and welcome.
- Generated and in place 2026-10-16: `public/fonts/disket-mono/disket-mono-regular.woff2` and `disket-mono-bold.woff2` — 18.5 KB and 18.3 KB, down from 84 KB and 91 KB, with the 307-glyph set verified unchanged. `@font-face` declares `font-family: "Disket Mono"` at weights 400 and 700 and nothing else.
- Use appropriate `font-display` behaviour and avoid unnecessary layout shifts. Preload only faces a rule actually uses: at Phase 1 weight 400 is declared but unused (headings and the wordmark are all 700), so only the bold `.woff2` is preloaded. Extend the preload list when a rule starts using 400. Two faces are preloaded as of 2026-10-16: Disket Mono 700 (display, above the fold) and Geist 400 (the hero paragraph's body text, above the fold).
- Source `.ttf` files live in `assets/fonts/disket-mono/` and are deliberately **not** served. The generated `.woff2` files live in `public/fonts/disket-mono/`. Keep archive artifacts (`__MACOSX/`, `.DS_Store`) and licence documents out of `public/` — everything there is served publicly. The licence record belongs in a repo-root `licenses/` directory.

### Background and surfaces

Use a fine, restrained technical grid or similarly subtle texture where it improves composition.

The background should remain quiet. Project screenshots and content must have greater visual importance than decorative effects.

## 6. Layout, Navigation and Motion

### Navigation

Use a compact navigation bar containing:

`MIKO` · About · Selected Work · Experience · Toolkit · Contact

Requirements:
- `MIKO` links to the homepage.
- Use a sticky navigation bar with subtle translucency and a restrained border when appropriate.
- Keep navigation compact and readable on small screens.
- Provide a clear mobile navigation pattern.
- Ensure keyboard accessibility, visible focus states and suitable anchor offsets.
- Do not introduce unnecessary navigation items.
- **Every navigation link must eventually resolve to a real `id` on the homepage.** The five anchors (`#about`, `#work`, `#experience`, `#toolkit`, `#contact`) are unresolved by design after Phase 1; Phase 2 must add sections carrying those exact ids, and no anchor may ship pointing at nothing (Phase 1 review condition, 2026-10-16). Adding an anchor without its section is not permitted.

### Hero

The hero should feature:

**Ebube Michael**

Supporting introduction:

“I build thoughtful software products, from user-facing experiences to the systems behind them.”

Discipline labels:

`Software · Systems · Applied AI`

Include clear calls to action such as:
- Explore my work
- Get in touch

Use a **left-aligned** composition, revised on the user's instruction 2026-10-16: heading, description, discipline labels and both CTAs share the page container's left edge with every later section. Keep the block vertically centred in the first viewport, with deliberate spacing and the right side left empty — no decorative filler added to balance it. Confident typography, generous spacing, subtle technical background. The heading needs its optical bearing correction, or it reads indented against the copy below it (see the typography section above).

Keep the hero concise. Avoid an oversized biography, exaggerated claims and decorative content that delays access to the work.

### Motion

Use moderate, purposeful motion:
- Subtle staggered entrance animations.
- Restrained project image reveals.
- Small hover and focus transitions.
- Smooth but unobtrusive navigation interactions.

Use approximately 150–200 ms for micro-interactions and 350–500 ms for larger reveals when appropriate.

Respect `prefers-reduced-motion`.

Avoid:
- Cursor followers.
- Scroll-jacking.
- Excessive parallax.
- Particle-heavy backgrounds.
- Text-scrambling effects.
- Long forced introductions.
- Animations that interfere with reading, navigation or mobile performance.

All interactive controls must remain usable without animation.

## 7. Homepage Structure

Build the homepage in this order:

1. **Navigation:** MIKO and section links.
2. **Hero:** Ebube Michael, short introduction, discipline labels and calls to action.
3. **About:** a concise introduction to the engineering background, interests and working approach.
4. **Selected Work:** MindWell AI, XVault and GhostPay.
5. **Other Projects:** Kene's portfolio and the Cowrywise investment demo.
6. **Experience:** Cowrywise frontend engineering internship.
7. **Toolkit:** grouped technologies and skills, reflecting actual experience.
8. **Contact and footer:** contact invitation, verified social links, résumé and navigation.

Keep the homepage descriptions concise. Each featured project should link to a dedicated case study.

Do not create unsupported achievements or quantitative impact claims to fill space.

## 8. Project Presentation and Status

The three main showcases should use alternating editorial image-and-text layouts, with consistent spacing and hierarchy.

MindWell AI should receive the strongest visual emphasis. XVault and GhostPay should receive presentation appropriate to their verified implementation and available evidence.

Each project entry should communicate:
- Name and short purpose.
- Status where relevant.
- Technologies that were actually used.
- The engineering challenge or important decision.
- A link to its case study.
- A repository or live demo link only when the destination is verified and appropriate to share.

### MindWell AI

A final-year project: a wellbeing companion for Nigerian university students.

Verified technology stack:
- Nuxt 4 and TypeScript.
- Firebase Authentication, Firestore and Cloud Functions.
- Dialogflow CX.
- Gemini through Vertex AI.
- English and Nigerian Pidgin support.

A BUS-11 usability evaluation with 21 participants returned an overall mean of 4.50/5. Publish it **labelled as a self-reported design evaluation** — name the instrument (BUS-11), give the participant count (21), and state plainly that the methodology has not been independently verified. Never present it as a validated, benchmarked or third-party finding.

The résumé also reports implemented features that are not yet re-verified against source: Firebase authentication, persistent chat history, mood logging, crisis detection, and serverless backend functions. Treat these as **reported**, and verify against the application before presenting any of them as demonstrated behaviour.

Case study priorities:
- Product context and intended users.
- Chat and mood-related functionality that can be demonstrated.
- Actual application and backend architecture.
- Integration with Dialogflow CX and the LLM fallback.
- Evaluation methodology, limitations and future work.

Do not claim that the application diagnoses, treats or replaces professional mental healthcare.

Capture real screenshots from the running application when configuration permits.

### XVault

XVault is an in-development X bookmark archiving application in:

`Twitter BookMark Organizer/XShare/`

Verified technology includes:
- Express 5 and TypeScript.
- MongoDB and Mongoose.
- BullMQ and Redis.
- Playwright-based browser automation.
- A Nuxt 4 frontend.
- Cloudflare R2 for media storage.
- Authentication, bookmark, category, synchronization and background-job modules.

The presence of these modules does not by itself prove that every feature works end to end.

Requirements:
- Label the project **In development**.
- Distinguish verified functionality from incomplete or planned functionality.
- Use Cloudflare R2 in technical descriptions; do not claim Cloudinary integration.
- Do not describe an empty-state screenshot as evidence of a populated bookmark library.
- Explain the ingestion and background-job architecture only to the extent verified.
- Mention meaningful engineering decisions and current limitations.
- Do not connect to production services or write production data without authorization.

The existing screenshots are predominantly empty or unauthenticated states. Capture a genuine populated-library view only after the relevant workflow has been safely verified.

### GhostPay

GhostPay is a voice-driven payment collection project with:
- A Firebase Cloud Functions backend.
- A Nuxt 4 and Capacitor client.
- Native Android components for notifications, overlays, voice capture and related interactions.

The backend and client exist in separate directories and have different integration requirements. Verify the actual contracts and connections before describing the system as fully integrated.

Case study priorities:
- Explain the product flow.
- Show a grounded architecture diagram.
- Separate backend functionality from web and Android behaviour.
- Explain voice ingestion and relevant payment-related integrations.
- Identify implementation boundaries, configuration requirements and limitations.

Do not invent a payment dashboard or claim successful live payment processing without evidence. Native device interactions should be demonstrated only when genuinely verified.

### Other Project: Kene's Portfolio

The project is in:

`Kene Portfolio/folio/`

It is a separate Nuxt 3 portfolio containing About, Skills, Projects and Contact pages.

Use it as a smaller project entry. Verify the live URL before adding a live-demo link. Do not invent a deployment address.

### Other Project: Cowrywise Investment Demo

The project is in:

`InvestmentFunds-main/`

It is a Vue 3 and Vite application using Vuex and Axios, with a Cowrywise API integration point, risk filtering and client-side pagination.

The API endpoint and current API availability remain unverified. The detail route currently depends on the list data having been loaded first.

Do not promise a working live demo until the API configuration, list and detail flows have been verified.

Describe this as an independent investment-fund API integration demo, not an official Cowrywise product.

## 9. Case Study Architecture

Create a reusable case-study template, with project-specific content and layouts where appropriate.

Recommended sections:

1. **Overview:** purpose, intended users, role, context and current status.
2. **Problem and constraints:** what the project set out to solve.
3. **Architecture:** components, data flow and integration boundaries.
4. **Implementation:** features and systems that are actually built.
5. **Engineering decisions:** trade-offs, alternatives and reasoning.
6. **Evidence and outcomes:** verified behaviour, evaluation and results.
7. **Limitations and next steps:** what remains incomplete or could improve.

Do not force every project to use every section. Omit unsupported material rather than inventing it.

Use clear diagrams when they genuinely help explain a system. Architecture diagrams must be based on inspected source code and verified integration contracts.

## 10. Project Visual Assets

No verified screenshot set currently exists for MindWell AI, GhostPay or the Cowrywise demo. The existing XVault screenshots show mostly empty or unauthenticated states. Kene's portfolio has local assets that can support its presentation.

Create a genuine evidence set as each project is validated.

### MindWell AI
- Capture actual chat and mood-related screens.
- Capture desktop and mobile layouts where possible.
- Create an architecture diagram from verified code.

### XVault
- Inspect the existing screenshots and remove redundant imagery only with approval.
- Establish a safe working environment before attempting a populated-library capture.
- Capture genuine UI states after the relevant flows work.
- Do not use production data without explicit authorization.

### GhostPay
- Create an architecture diagram grounded in the backend and client code.
- Capture actual client screens.
- Capture notification and overlay behaviour only on a suitable device or emulator when verified.
- Clearly label any conceptual illustration.

### Kene's Portfolio
- Run the actual local application and capture representative desktop and mobile views.
- Use the project's real assets.
- Verify the deployed URL before presenting the project as live.

### Cowrywise Demo
- Verify the endpoint and actual application behaviour before capture.
- Capture list and detail views only when those routes genuinely work.
- Disclose unresolved integration limitations.

Never fabricate screenshots, use unrelated product imagery as evidence or imply that a mockup is a working implementation.

Optimize all images and provide appropriate alternative text.

## 11. Toolkit and Experience

Group technologies into meaningful categories, for example:
- Frontend engineering.
- Backend and APIs.
- Databases and infrastructure.
- Applied AI integrations.
- Tools and workflow.

Include technologies only where the user has sufficient practical experience to discuss them honestly.

Do not represent exposure to a tool as production expertise. Distinguish technologies used in real projects from those currently being learned.

Present the Cowrywise internship accurately. Verified from the résumé (read 2026-10-16) — these facts are publishable as-is:

- **Cowrywise (YC S18)**, Lagos State, Nigeria — **Engineering Intern, Frontend Team**, **March 2025 – September 2025**.
- Nuxt 2 → Nuxt 3 migration of the primary web platform; legacy components refactored into a modular architecture for SSR reliability and maintainability.
- Structured asynchronous data fetching and dynamic metadata handling, improving rendering stability and SEO on high-traffic marketing pages.
- Responsive interfaces for Cowrywise Kids, an interactive financial literacy platform, with emphasis on accessibility and performance.
- Real-time multiplayer financial card game built jointly with Socket.io; event-driven state synchronisation across concurrent users.
- GSAP animation integration with performance-conscious rendering, holding strong Lighthouse scores.
- Agile workflow: Git, feature branches, pull requests, code reviews, CI, shipping to live users.

**Education** (same source): Covenant University, Ogun State — BSc Computer Science, 2022–2026, cumulative GPA 4.97/5.0. Christ College Lagos — Senior Secondary School Certificate (Science), 2019–2022.

**GPA scope (decided 2026-10-16):** the cumulative GPA appears in the **About section only**. Keep it out of the hero, the Toolkit and the footer — it is supporting evidence for the engineering claim, not a headline. Secondary schooling is optional detail; include it in About if it earns its space, never in the homepage introduction.

Do not add responsibilities, metrics or technologies beyond this list. If a claim cannot be traced to the résumé or to inspected source, it does not ship.

## 12. Nuxt Architecture and Implementation

- Use Nuxt 4 conventions and TypeScript.
- Inspect the existing configuration before initializing or changing the project.
- Use reusable components and shared layouts.
- Maintain typed, centrally defined project metadata.
- Use file-based routes for project case studies.
- Establish semantic CSS variables for the design system.
- Use **TailwindCSS** as the primary styling approach. Configure the palette, typography and spacing from Section 5 as tokens in the Tailwind theme, backed by the semantic CSS variables, rather than scattering raw hex values or arbitrary one-off values through class names.
- Do not introduce a separate SCSS architecture alongside Tailwind. Component-scoped CSS is acceptable only where Tailwind utilities are genuinely the wrong tool.
- Prefer static generation or prerendering for content pages where compatible.
- Avoid unnecessary client-side JavaScript and dependencies.
- Keep project content and presentation separate where practical.
- Use responsive image sizing and lazy loading for below-the-fold content.

## 13. Accessibility, SEO and Performance

### Accessibility
- Use semantic HTML and a logical heading hierarchy.
- Ensure keyboard accessibility and visible focus states.
- Provide descriptive link text and meaningful image alt text.
- Respect reduced-motion preferences.
- Ensure readable text contrast.
- Keep mobile navigation and interactive elements usable on touchscreens.

### SEO
- Add appropriate page titles and descriptions. In place since 2026-10-16: title `Ebube Michael | Software Engineer` and a description resting on the approved hero sentence, both set as the site default in `nuxt.config.ts` (`app.head`) so a page overrides only what it changes. Both were approved by the Phase 1 review; do not reword them without approval.
- Configure canonical URLs when the production domain is known. It is **not** known: ship no canonical, no `og:url`, no sitemap host and no social links until a real destination is supplied and checked to respond.
- Include suitable Open Graph metadata — deferred with the canonical for the same reason. `og:title` and `og:description` exist without a URL, since neither invents a domain.
- Configure a favicon and sitemap.
- Use structured metadata only when accurate and relevant.
- Do not invent a production domain.

### Performance
- Optimize local and project imagery.
- Lazy-load appropriate images.
- Avoid unnecessary dependencies and animation libraries.
- Prevent font-related layout shifts where practical.
- Verify that the build and important routes work.

## 14. Implementation Phases

Open conditions from a review — runtime, security advisories, deferred checks — are tracked in
`STATUS.md` at the project root, alongside the corrections each review produced.

### Phase 1: Foundation

Inspect the application directory and local font assets.

Initialize the Nuxt 4 application only if needed. Establish:
- Design tokens and base styles.
- Disket Rostype integration based on actual files.
- Responsive layout.
- Navigation using the `MIKO` wordmark.
- The basic hero with the heading `Ebube Michael`.
- A restrained grid or background treatment.

Review the four design references and determine which patterns are appropriate before finalizing the composition.

Do not build all project pages or generate placeholder screenshots during this phase.

Stop and request review.

### Phase 2: Homepage

Implement the full homepage structure, including About, Selected Work, Other Projects, Experience, Toolkit and contact footer.

Create the sections that the five navigation anchors target — `about`, `work`, `experience`, `toolkit`, `contact` — so that every primary navigation link resolves once the sections exist. Verify each anchor actually scrolls to its section and lands clear of the sticky header.

Use the approved hero copy verbatim (Phase 1 review, 2026-10-16):

- Heading: `Ebube Michael`
- Description: `I build thoughtful software products, from user-facing experiences to the systems behind them.`
- Discipline labels: `Software · Systems · Applied AI`
- Primary CTA: `Explore my work`
- Secondary CTA: `Get in touch`

Use verified content and clearly identified asset placeholders only where necessary.

Stop and request review.

### Phase 3: Evidence and Case Studies

Validate project behaviour and capture genuine screenshots. Create grounded architecture diagrams. Implement the shared case-study template and project routes.

Do not imply that a project is fully operational if only part of it has been verified.

Stop and request review.

### Phase 4: Refinement and QA

Review desktop and mobile layouts, navigation, accessibility, motion, typography, metadata, image performance, internal links, type checking and the production build.

Resolve in-scope issues and disclose remaining blockers.

Stop and report completion.

## 15. Definition of Done

A phase is complete when:
- The in-scope work is implemented.
- Relevant checks have actually been run.
- Visual and functional behaviour has been reviewed to the extent available.
- No unsupported claims have been introduced.
- Known limitations and blockers are documented.
- The changes are summarized concisely.

Do not proceed to the next phase automatically. Wait for explicit approval.


## 16. Design Skills and Quality Workflow

### Available design capabilities

Use installed skills deliberately. Before invoking a skill, verify that it is installed and available in the current Claude Code session.

**Impeccable: primary design refinement and quality assurance**
- Use `/impeccable init` during initial design setup if available.
- Use its design-shaping and critique workflow before major UI implementation.
- Use `/impeccable audit` and `/impeccable polish` where supported by the installed version.
- Use it to identify generic design patterns, inconsistent spacing, weak hierarchy, poor interaction states and visual inconsistencies.
- Review every suggested change against the established portfolio design system.

**Taste Skill: alternative design direction**
- Use `design-taste-frontend` when developing or reconsidering a visual direction.
- Set the design parameters explicitly rather than accepting defaults that conflict with this project.
- Starting direction: design variance 7/10, motion intensity 3/10, visual density 4/10.
- Prioritize asymmetrical editorial composition, distinctive typography and deliberate negative space over excessive animation or decorative elements.
- Preserve Nuxt 4, Vue 3 and TypeScript. Do not migrate to React, Next.js or another stack because a skill recommends it.

**Accessibility review**
- If an accessibility skill is installed, use it to audit semantic HTML, keyboard navigation, focus states, contrast, reduced motion, form controls and ARIA usage.
- Fix issues without compromising the design or introducing unnecessary dependencies.
- Verify automated findings manually where necessary.

**Browser and visual verification**
- Use available browser automation or Playwright tooling to inspect actual rendered pages at desktop and mobile viewports.
- Check layout, overflow, navigation, interactions, image loading and browser-console errors.
- Capture genuine screenshots for visual comparison.
- Never claim that a visual or accessibility check passed unless it was actually performed.

### Avoid conflicting design instructions

- Do not blindly combine multiple design skills on the same task.
- Use Taste for initial direction or a deliberate redesign; use Impeccable for structured refinement and auditing.
- Treat this file's explicit branding, palette, typography, motion and stack constraints as authoritative.
- If a skill recommends a different framework, accent colour, typography system or animation style, adapt or reject that recommendation.
- Do not invoke every available skill on every task. Choose the smallest set that materially improves the result.

### Required design iteration

For each major visual milestone:

1. Establish the intended design and layout before coding.
2. Implement the smallest coherent section.
3. Run the application and inspect the actual result when possible.
4. Use a design critique or audit to identify the highest-impact weaknesses.
5. Fix the most important issues and inspect the result again.
6. Report verified improvements, remaining issues and any checks that could not be performed.

Prioritize meaningful improvements over endless polishing. Stop when the design is coherent, distinctive, accessible, responsive and consistent with the brief.
