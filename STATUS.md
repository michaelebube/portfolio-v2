# Status — Phase 1 review outcome, Phase 2 delivery, Phase 3 case studies, Phase 4 evidence, Phase 5A screenshots, open items

Working record for this repository. Not a shareable report.

Phase 1 (Foundation) was reviewed and **approved on 2026-10-16**, with conditions. This file
records the conditions, the corrections made in response, and the items left open. `AGENT.md`
remains the authoritative engineering guide; `PRODUCT.md` remains the product record.

## Corrections applied after the review

| # | Review decision | Change made |
|---|---|---|
| 1 | Geist for body text; Disket for display; system monospace for technical metadata | Geist Regular (400) added self-hosted; `--font-body` now leads with `Geist`; Disket Mono and the system mono stack unchanged |
| 2 | Exact hero copy | Hero paragraph gained its missing full stop; heading, labels and both CTAs already matched verbatim |
| 3 | Title and description from the approved wording | `nuxt.config.ts` `app.head` now sets title `Ebube Michael \| Software Engineer` plus a description resting on the hero sentence — no domain, no social links |
| 4 | Navigation anchors may stay unresolved until Phase 2 | No anchor removed; `AGENT.md` §6 and §14 now require Phase 2 to create sections with the matching ids |
| 5 | Node.js before production-readiness work | Recorded below as a blocker. No runtime or dependency version was changed |
| 6 | Nine high `npm audit` findings recorded, not force-fixed | Recorded below. `npm audit fix` was not run, in any form |
| 7 | Visual verification method recorded | Recorded below |

No Phase 1 work was restarted and the foundation was not redesigned. Nothing was published.

## Typography

- **Body:** Geist, family name `Geist` (Vercel, in collaboration with basement.studio), SIL Open Font
  License 1.1. Served from `public/fonts/geist/geist-regular.woff2` — 45,244 B, `usWeightClass` 400,
  975 glyphs, unitsPerEm 1000, not fixed-pitch (read from the font tables, 2026-10-16).
- **Acquisition:** unmodified copy from the `geist` npm package v1.7.2
  (`dist/fonts/geist-sans/Geist-Regular.woff2`). The package is an acquisition source, **not a
  dependency** — no font package was added to `package.json`, and `package-lock.json` is unchanged.
  No suitable local Geist file existed in this workspace, which is why the file was sourced externally.
- **Weights configured:** 400 only, because 400 is the only body weight any rule sets. The package also
  supplies static 100, 200, 300, 500, 600, 800, 900, 950 and a variable `wght` 100–900 face — add a file
  *and* its `@font-face` together, only when a rule uses that weight.
- **Display:** Disket Mono 400/700 unchanged (the supplied weights; there are no others).
- **Technical metadata:** system monospace stack (`--font-mono`), deliberately not a downloaded face.
- **Licence:** `licenses/geist-ofl-1.1.txt`. OFL 1.1 permits self-hosting with the licence included;
  Geist reserves no font name.
- **Preload:** Geist 400 and Disket Mono 700, both used above the fold. Verified loading in the
  preview build at both viewports.

## Open item — runtime (blocker before production-readiness work)

- Installed Node.js is **v22.14.0** (npm 10.9.2). Nuxt 4.6.1 declares
  `engines.node: "^22.22.3 || ^24.15.0 || >=26.0.0"`, and `nuxt typecheck` warns:
  `Current version of Node.js (22.14.0) is unsupported and might cause issues. Please upgrade to a
  compatible version ^22.21.0 || ^24.11.0 || >=26.0.0.`
- Consequences seen so far: the warning only — `typecheck` and `build` both completed. The risk is
  latent, not demonstrated.
- `.npmrc` carries `legacy-peer-deps=true` as a documented workaround for npm 10.9.2 crashing in
  arborist peer resolution (`TypeError: Cannot read properties of null (reading 'edgesOut')`).
- **Planned action, not yet taken:** install a supported Node release, then re-run a clean
  `npm install` to confirm the lockfile still resolves, then remove the `.npmrc` flag. No dependency
  version changes are bundled with that upgrade.

## Open item — security: nine high `npm audit` findings

`npm audit` (2026-10-16) reports 0 critical, 9 high, 0 moderate, 0 low. **No remediation applied.**

| Package | Severity | Direct? | Reached via | Advisory / note |
|---|---|---|---|---|
| `nuxt` | high | **yes** | `@nuxt/nitro-server` | range `3.20.0 – 3.21.11 \|\| >=4.2.0` |
| `@nuxt/nitro-server` | high | no | `nitropack` | range `>=3.20.0` |
| `nitropack` | high | no | `listhen` | range `>=0.5.4` |
| `listhen` | high | no | `node-forge` | range `>=0.3.0` |
| `node-forge` | high | no | — | GHSA-86w9-cpqp-85rv: RSA PKCS#1 v1.5 signature verification accepts extra nested `DigestAlgorithm` elements |
| `micromatch` | high | no | `braces` | range `>=0.2.0` |
| `braces` | high | no | — | GHSA-vfj7-8cjw-p6xm: stack-exhaustion DoS through deeply nested patterns |
| `fast-glob` | high | no | `micromatch` | range `*` |
| `globby` | high | no | `fast-glob`, `micromatch` | range `>=8.0.0` |

- The chain has two roots: a build/runtime tooling path through `nuxt → @nuxt/nitro-server →
  nitropack → listhen → node-forge`, and a globbing path through `globby → fast-glob → micromatch →
  braces`.
- npm's suggested fix for the nuxt chain resolves to **nuxt 4.1.3 — a downgrade**, and no fixed
  version exists inside the flagged range. Rejected; not applied.
- `npm audit fix --force` was not run and must not be run.
- **Remediation plan, pending advisory inspection and approval:** (a) take an upstream Nuxt patch that
  moves `@nuxt/nitro-server` past the affected range once one is published; (b) assess whether a
  scoped npm `overrides` entry for `braces`/`micromatch` is safe for the globbing path, which appears
  to be build/dev-time only; (c) determine actual reachability from the shipped application before
  claiming any finding is unexploitable. **Reachability is not yet analysed — these are recorded, not
  dismissed.**

## Phase 2 conditions

- Create the sections the primary navigation targets: `#about`, `#work`, `#experience`, `#toolkit`,
  `#contact`, plus the two hero CTAs (`#work`, `#contact`). No anchor may ship pointing at nothing.
- Use the approved hero copy verbatim:
  - Heading: `Ebube Michael`
  - Description: `I build thoughtful software products, from user-facing experiences to the systems behind them.`
  - Labels: `Software · Systems · Applied AI`
  - Primary CTA: `Explore my work` · Secondary CTA: `Get in touch`
- Keep title and description as approved; add no production domain, canonical URL, sitemap host or
  social link until a real destination is supplied and verified to respond.

## Verification log

- **Method used for Phase 1 visual verification: Chrome headless with device emulation.** Cross-browser
  testing, physical devices, Lighthouse and automated accessibility tooling were **not** used, and no
  check is claimed that was not run.
- **Deferred to the QA phase (Phase 4):** cross-browser rendering, physical-device testing, Lighthouse
  scoring, automated accessibility auditing.
- **Checks run in this pass (2026-10-16):** `npm run typecheck` (clean, Node warning only);
  `npm run build` (complete, 2.12 MB server output); preview server plus Chrome headless at 1440×900
  and 390×844 against the built output, confirming: title, description and `og:*` tags as approved;
  `lang="en"`; both font preloads; Geist 400 and Disket Mono 700 reported `loaded` by `document.fonts`
  with no fallback in use; hero heading, paragraph, labels and CTAs matching the approved copy; no
  horizontal overflow at either viewport; no console errors and no failed requests.
- **Not verified in this pass:** the five navigation anchors still resolve to nothing, because their
  sections arrive in Phase 2. This is expected, not a regression. **Resolved in Phase 2** — see below.

---

# Phase 2 — visual direction and homepage

Delivered 2026-10-16. Homepage only; project case-study pages were explicitly out of scope and were not
written. Nothing published, no domain, canonical URL, `og:url`, sitemap host or social link added.

## Files created

| File | What it holds |
|---|---|
| `app/data/portfolio.ts` | Every string on the page. Each value traces to `AGENT.md` or the résumé read 2026-10-16; nothing is invented. Exports `featuredProjects`, `otherProjects`, `roles`, `credentials`, `toolkit`, `aboutFacts`, `contact` and their types |
| `app/composables/useRevealOnScroll.ts` | IntersectionObserver entrance layer; marks `documentElement.dataset.revealBound` so the head-script failsafe stands down |
| `app/components/SectionShell.vue` | The one section frame: `id` for the anchor, heading, mono meta rail, optional lead, slot |
| `app/components/ProjectShowcase.vue` | One featured project as an alternating media/text row. Text leads the DOM; explicit `lg:col-start`/`lg:row-start` decide the desktop side, so rows alternate while a phone reads name-before-frame |
| `app/components/MediaPlaceholder.vue` | The labelled frame standing in for a screenshot that does not exist |
| `app/components/SiteFooter.vue` | `#contact` — heading, email and résumé actions, section nav, colophon |

## Files changed

| File | Change |
|---|---|
| `app/pages/index.vue` | Rewritten as the Phase 2 homepage in the approved §7 order: hero, About, Selected Work, Other Projects, Experience, Toolkit, contact + footer |
| `app/components/SiteNav.vue` | Header made sticky with a scroll-spy that sets `aria-current="true"` and `.nav-link.is-active` on the current section; mobile panel retained |
| `app/assets/css/main.css` | `.frame*` placeholder rules, `.nav-link.is-active`, the `js-reveal` entrance layer; wordmark and nav-link sizes stepped up (0.9375→1rem, 0.8125→0.875rem) |
| `nuxt.config.ts` | One inline head script that adds `html.js-reveal` pre-paint when motion is welcome and `IntersectionObserver` exists, with a 2.5 s failsafe that reveals everything if the app never binds |

Title, description and `og:*` were left exactly as approved. No favicon, canonical or `og:url` was added.

## Section order as shipped

Navigation (`#about`, `#work`, `#experience`, `#toolkit`, `#contact`) · hero · About · Selected Work ·
Other Projects · Experience (roles then Education) · Toolkit · Contact and footer. Every anchor resolves;

Phase 1's open item is closed.

## Hero alignment — a conflict, resolved in `AGENT.md`'s favour

The Phase 2 brief said **centred** hero. `AGENT.md` §6 and the pinned direction contract in
`.impeccable/surfaces/app-pages-index-vue.md` both specify **left-aligned**, revised 2026-10-16 on the
user's own instruction. The left-aligned version was built. This is a deliberate, reversible choice, not
an oversight — say the word and it flips.

## Honesty decisions

- **No project imagery exists.** MindWell AI, GhostPay and the investment-fund demo have no screenshot;
  the XVault captures are login and empty-library states only. Rather than borrow or fabricate, each
  featured project carries a `MediaPlaceholder`: a 16:10 frame stating what it *will* hold and that the
  capture has not happened. It contains no fake window chrome, no grey bars and no invented data, and
  every word in it is true text, so it needs no alt text.
- **No case-study links.** The routes ship in Phase 3, so the affordance is a `<dl>` row reading
  "In preparation — written in Phase 3." rather than a dead href.
- **No social links, no live deployment links.** No verified GitHub or LinkedIn URL exists, and the
  Kene's Portfolio and investment-fund deployment addresses are unverified, so the page says the link is
  withheld rather than offering one.
- **MindWell AI's evaluation is labelled as what it is** — self-reported, methodology not independently
  verified, not a third-party finding — in the same block that carries it.
- **Résumé-only skills are marked as such.** Toolkit groups carry a line naming where each was actually
  used, so a résumé entry is never presented as production experience.
- **The mobile number in the résumé PDF is never rendered as site text.**

## Checks actually run

- `npm run typecheck` — **clean**; the only output is the Node 22.14.0 unsupported warning recorded below.
- `npm run build` — **complete**, 2.17 MB server output (552 kB gzip), 42.2 s.
- `tasteskill inspect.mjs` against the preview build at 1440 / 768 / 390:
  **0 FAIL, 0 WARN under an allow-list of the declared brand deviations** (see below). Measurements:
  hero `Ebube Michael` renders on 1 line at all three widths (88 / 69.1 / 42 px); 16 headings, longest
  2 lines, median 2 words; 3 typefaces; 10 sizes; no horizontal overflow.
- **Screenshots read at all three widths** (`.taste-skill/inspect/`), not just measured — desktop fold
  and pages 01–03, tablet fold, mobile fold and pages 01–02. Three fix rounds were driven by what the
  screenshots showed (see below).
- **Not run, and not claimed:** cross-browser rendering, physical-device testing, Lighthouse,
  automated accessibility auditing, screen-reader testing. These remain deferred to the QA phase.

## Declared deviations from the taste-skill house style

The skill bans monospace type, hairlines, tiny tracked uppercase labels, outlined boxes and (in
practice) a page with no photographs. The binding brief pins all of those. The deviations were declared
and allow-listed individually rather than ignored wholesale, and composition, scale, imagery discipline
and motion were taken from the skill:

`--allow mono,micro-label,hairline,outlined-box,few-pictures,small-text,empty-screens,font-count,size-count,no-footage`

- **mono / micro-label / small-text** — Disket Mono is the approved display voice; the 11 px tracked
  system-mono label is the technical-metadata voice `AGENT.md` §5 asks for.
- **hairline / outlined-box** — 1 px `--color-line` rules and the outlined secondary button are the
  pinned direction contract.
- **few-pictures / no-footage** — no honest image exists to place. Not traded away: the subsection above
  records what replaces it.
- **empty-screens** (2 of 10) — one is the hero, the page's single deliberate rest; the other is the
  trailing footer screen.
- **font-count / size-count** — three voices and ten sizes are the approved type system, held deliberately
  small. The size list was cut from 15 to 10 during this phase.

## Problems found by looking, and fixed

- **Mobile read a label before its heading** across three sections. Fixed by putting content first in the
  DOM and placing the meta rail with explicit `lg:` column starts — Selected Work, Experience and the
  media frame's trailing "Media · not yet captured" label, which was merged into the frame's own
  statement and deleted.
- **The placeholder frame was too tall** (4:3 at column width read as an empty panel). Changed to 16:10.
- **The sticky nav smudged** where backdrop-blur crossed the background grid. `bg-canvas/80
  backdrop-blur-md` → `bg-canvas/90 backdrop-blur-sm`.
- **Toolkit items ran together** on one line when set as a wrapped flex row. Reverted to one item per line.
- **Reveal animation could strand content** if the script ran but the app did not. Three independent
  guards now exist: the head script's own conditions, its 2.5 s failsafe, and the fact that with
  scripting off the `js-reveal` class is never added at all.
- **A numbered section index was added and then removed** — see the reference-site section above. The
  inspector was right and the addition was ornamental.

## Reference-site inspection

The brief asked for the four reference sites in `AGENT.md` §4 to be inspected if browser access were
available. Mike Wilcock, Nahiyan Khan and Samuel Rizzon were read directly. **Tobstar initially returned
only its `<title>`** through the ordinary fetch path — it is a client-rendered page — and it was
recorded as unread at that point. It was later read successfully by dumping the DOM with headless
Chrome, so all four references were inspected and no observation in the direction rests on a site that
could not be read.

Two devices were carried across from the study and are visible in the shipped page:

- **A metadata rail per section** (Mike Wilcock's parenthetical labels; Tobstar's `01 / Selected work`
  headers) — here it states the section's evidence basis rather than a bare index.
- **Stating what a section is *not*** (Tobstar's "Listed as study, not as experience" and "Listed as
  targets I'm currently studying toward, not as credentials held") — the same principle as this page's
  "Not yet verified" rows and the Toolkit's résumé-only note.

**One device was tried and reverted.** The numbered section index (`01 / About`, `02 / Selected Work`)
was added from the references, and the inspector failed it as a decorative index number — it is not a
real sequence, and the scroll-spy in the navigation already reports position. It was removed rather
than allow-listed, and the reasoning is left in a comment in `SectionShell.vue`.

**One device is deferred to Phase 3.** Tobstar answers "project with no screenshot" by drawing the
request path as a labelled flow (Client → Edge → Application → State → Storage). That is a better frame
than prose, but drawing a flow means asserting what connects to what, and this page's evidence supports
a stack list, not a verified architecture. Worth building once the user confirms each project's shape.

## Open items carried forward

1. **Project captures.** MindWell AI (chat and mood screens), GhostPay (client screens plus an
   architecture diagram), the investment-fund detail view, a Kene's Portfolio project page, and a
   populated XVault library — the last requiring a safe environment and no production data without
   explicit authorization. Until they exist, the placeholder frames stay.
2. **Case-study routes.** The four `dl` rows reading "In preparation — written in Phase 3." become links
   in Phase 3.
3. **Node 22.14.0** — unchanged, still the recorded blocker before production-readiness work.
4. **Nine high `npm audit` findings** — unchanged, still recorded and unremediated. `npm audit fix
   --force` was not run and still must not be.
5. **The mobile navigation pattern** is a simple disclosure panel, not a focus-trapped dialog. It is
   keyboard-reachable and Escape closes it, but focus is not trapped and does not restore to the toggle.
   Recording it as a known limitation rather than claiming an accessibility level that was not tested.
6. **The Toolkit grid leaves one empty third-column cell** on its second row at ≥1024 px (five groups in
   three columns). Left as is — it reads as the grid it is, and padding the list to six would mean
   inventing a group.

## Verification log — Phase 2

- **Method:** `nuxt typecheck` and `nuxt build`, plus the taste-skill inspector driving headless Chrome
  at 1440×900, 768×1024 and 390×844 against the built output served from `node .output/server/index.mjs`.
  Screenshots were read, not merely captured.
- **Deferred to the QA phase (Phase 4), unchanged:** cross-browser rendering, physical-device testing,
  Lighthouse scoring, automated accessibility auditing.
- **Not verified in this pass:** anything requiring a deployed domain, and every claim the page itself
  marks as unverified — those markings are the honest state, not gaps to close here.

---

# Phase 3 — case studies

Scope was the phase brief's §1–§7: evolve the visual identity away from the Tobstar reference without
losing the approved dark monochrome foundation, add glass where it earns its cost, verify every
featured-project claim against source, and build one reusable case-study template. Sibling repositories
were read read-only and nothing outside this project was modified.

## §1 Visual direction — what was kept, what changed

Stated before coding, and now borne out by the build:

- **Kept:** near-black `#090909` canvas, one-tone-up `#141414` surface, `#292929` hairline, `#F5F5F5`
  ink; Disket Mono caps display face with the optical corrections already pinned; the 12-column
  editorial grid; the 64 px technical grid field; square corners; no accent colour.
- **Changed to distinguish from the reference:** glass replaced the reference's flat bordered cards as
  the *only* alternative surface, and it is spent in exactly three places (below). The claim ledger —
  a per-claim proof state — is the page's signature device and has no counterpart in Tobstar's flow
  diagram. Section headings moved from three columns to four so two-word headings hold one line.
- **Where glass earns its cost:** a compact surface carrying a *label* over the ambient field — the
  metadata strip, status chips, the sticky nav (Phase 2, menu tier).
- **Where solid wins:** everything read at length. The ledger, the six prose sections and the closing
  blocks are solid with hairlines, because transparency under running text is a legibility tax the
  reader did not ask to pay.
- **Reused:** `GlassChip` (Phase 2 chip tier), the `.liquid-glass` panel tier and the `v-liquid-glass`
  directive, `SectionShell`'s heading-rail rhythm (carried into `CaseStudySection`), `useRevealOnScroll`
  and the `data-reveal`/`--reveal-step` convention, the `measure` and `label-mono` utilities.

## §2 Glass treatment as shipped

| Surface | Tier | Where |
| --- | --- | --- |
| Sticky navigation | `liquid-glass-menu` (22 px blur + 62 % surface wash) | site-wide, from Phase 2 |
| Case-study metadata strip | `liquid-glass` + `v-liquid-glass` | one per case-study page |
| Status / claim-state / stack marks | `liquid-glass-chip` (CSS only, 6 px blur) | homepage and case studies |
| Mobile nav disclosure panel | child of the glass header — paints no surface (rule 3) | site-wide |

Nothing nests a glass surface inside another. No gradient blobs, neon, or animated glass. The panel's
refraction is Chromium-only and gated on engine, not `@supports`; elsewhere the stylesheet's plain
`blur(3px) saturate(125%)` stands and the panel is still a decent frosted surface.

**The brief's fifth glass case — "image-adjacent overlays where a real image provides background
detail" — has no instance, because no genuine image exists to overlay (see §5).** Recorded rather than
filled with a fabricated interface.

## Files created

| File | What it is |
| --- | --- |
| `app/data/caseStudies.ts` | The single content module: five entries, the `ClaimState` type, `CLAIM_PRESENTATION`, `findCaseStudy()` and `caseStudyRoutes` |
| `app/pages/work/[slug].vue` | The one case-study template; all five routes render through it |
| `app/components/CaseStudySection.vue` | Heading rail + prose/bullets/labelled rows. Solid surface throughout |

## Files changed

| File | Change |
| --- | --- |
| `app/plugins/liquid-glass.ts` | **Renamed** from `liquid-glass.client.ts` — see "Problems found" |
| `app/assets/css/liquid-glass.css` | Panel drop shadow removed; stale `.client.ts` pointer fixed; departures renumbered |
| `app/data/portfolio.ts` | `slug` added to both project types; `discussion` and `CASE_STUDY_PENDING` removed; every project's claims re-checked against source |
| `app/components/ProjectShowcase.vue` | "In preparation" row replaced by a real "Read the case study" link; status label is now a `GlassChip`; row alignment `items-baseline` → `items-center` |
| `app/pages/index.vue` | Other Projects rows gained a case-study link; Toolkit closing note and about copy corrected against source |
| `app/components/SiteNav.vue` | Section hashes resolve to `/#…` off the homepage, so nav items are not dead links on `/work/*` |
| `app/composables/useRevealOnScroll.ts` | Docblock corrected — it claimed a `<noscript>` rule that does not exist |
| `nuxt.config.ts` | `nitro.prerender.routes` fed from `caseStudyRoutes`, so a project cannot be added to the data and forgotten here |

The homepage was not rewritten. Every change to it is the minimum needed to link to the case studies
and to keep its project claims true.

## §3 Evidence — what was verified, and against what

All five entries were written by reading the sibling repositories read-only: source, config, Firebase
rules, package manifests and route definitions. The résumé and `AGENT.md` were treated as claims to
check, not as evidence.

| Project | Verified | Partial | Reported | No evidence | Links |
| --- | --- | --- | --- | --- | --- |
| MindWell AI (featured) | 6 | 2 | 1 | 2 | 0 |
| XVault (featured) | 6 | 3 | 1 | 2 | 0 |
| GhostPay (featured) | 9 | 4 | 0 | 2 | 0 |
| Kene's Portfolio (other) | 5 | 0 | 0 | 1 | 0 |
| Investment-fund demo (other) | 5 | 2 | 0 | 1 | 0 |

**Every entry ships `links: []`,** because no public deployment, repository or live demo was verified
for any of them. Each page says so in words rather than showing a link that resolves to nothing.

### Where the source contradicted the résumé or `AGENT.md`

Published as `reported`, with the conflict stated on the page:

- **MindWell AI — Gemini on Vertex AI.** `AGENT.md` and the résumé both say Vertex AI. The code does
  not: `functions/` initialises the GenAI SDK from an API key (`@google/genai`, `gemini-3-flash-preview`).
  The page says what the code does and flags the disagreement.
- **MindWell AI — BUS-11 4.50 / 5 across 21 participants.** No questionnaire, response data, methodology
  note or report exists on disk; `mindwell/docs/` is empty. Published as **No evidence**, with the
  context that it is a self-reported résumé figure and nothing more. The application is nowhere
  described as a clinically validated diagnostic or treatment system.
- **XVault — deployment.** Config and compiled output exist; nothing shows it was ever deployed.
- **GhostPay — the happy path and merchant settlement.** The two repositories were inspected
  separately. Contract defects were found (below) and no merchant settlement flow exists, so the page
  does not imply a complete end-to-end payment flow works.
- **Investment-fund demo — this is an independent integration demonstration, not an official Cowrywise
  product, and is not affiliated with or endorsed by Cowrywise.** Its API endpoint is configured by an
  environment variable that is not present in the repository.

### Findings that must be reported but were not acted on

Sibling repositories were read-only and are untouched. These need the owner's decision:

1. **`mindwell/functions/.env` is committed and tracked in git history** with a live-looking
   `GEMINI_API_KEY=AIzaSy…`, despite `.gitignore` excluding `.env` and `.env.*`. The key needs rotating
   and the value removing from history. **The value was never printed and is not recorded here.**
2. **XVault `pages/settings.vue:172,193,229`** build `/auth/…` paths where every other call site in the
   codebase uses `/api/…`.
3. **XVault's `xvault-ai` queue has no consumer** — jobs are enqueued and nothing processes them.
4. The Vertex AI discrepancy and the missing BUS-11 evidence, both above.

## §4 Case-study structure

One template, one data structure. Each entry carries the eight parts the brief asks for — overview and
status (header + metadata strip), problem and intended users, architecture and data flow, key
implementation decisions, engineering trade-offs, verified outcomes and evaluation, limitations and
next steps, and source links when verified. The last is rendered from data, so a link can only appear
once it has been checked to resolve.

No invented metrics, no unsupported claims, no technology lists standing in for explanation. The
"Built with" block exists but sits *after* the sections that say what each item was used for.

## §5 Assets — inventory and what is still missing

**The repository contains no images at all.** `public/` holds the résumé PDF and fonts; there is no
`<img>` anywhere in `app/`. This was confirmed before deciding what to display, not after.

So: no screenshots, no recordings, no diagrams, nothing fabricated to stand in for them. Every case
study carries a **"Not yet captured"** section listing exactly what would need photographing from a
running build — 4 items for each featured project, 4 for Kene's Portfolio, 3 for the investment demo.
No architecture is drawn, because drawing one means asserting what connects to what, and the evidence
supports a stack list, not a verified topology.

## §6 Checks actually run

- `npm run typecheck` — clean.
- `npm run build` — succeeds; `/` and all five `/work/*` routes prerender.
- Route status against the built output: `/`, all five case studies → **200**; `/work/nope` → **404**.
- **taste-skill inspector**, headless Chrome at 1440×900, 768×1024 and 390×844, all six routes:
  **0 FAIL, 0 WARN** under the declared allow-list.
- Screenshots read at desktop and mobile for every route; glass readability and text contrast checked
  by eye against the busiest part of the ambient field.

The Phase 2 allow-list is unchanged and still the declared one:

`--allow mono,micro-label,hairline,outlined-box,few-pictures,small-text,empty-screens,font-count,size-count,no-footage`

## Problems found by looking, and fixed

1. **Every `/work/*` route failed to prerender and `npm run build` aborted** — `Cannot read properties
   of undefined (reading 'getSSRProps')`. Vue's server renderer resolves every directive it meets and an
   unresolved one is a hard failure, not a warning; `v-liquid-glass` lived in a `.client.ts` plugin, so
   the server could not see it. Fixed by making the plugin universal, after confirming it touches no DOM
   at module scope. Reasoning is in the file's docblock.
2. **`[headline-lines]` FAIL** — "Problem and intended users", "Key implementation decisions" and
   "Limitations and next steps" each wrapped to three lines at 1440 px in a three-column rail. Widened
   to four columns; re-measured clean.
3. **`[eyebrow]` FAIL** — the "All work" back link above the project name. It is a navigation control,
   not a decorative kicker, and the rule's own implementation already exempts labels inside a `nav`.
   Marking it up as `<nav aria-label="Breadcrumb">` is both more truthful and what clears the rule —
   fixed rather than allow-listed, and it now gives screen-reader users a landmark.
4. **`[shadow]` FAIL** — the glass panel's `0 18px 40px rgba(0,0,0,0.4)`. The rule exempts things that
   really float and this panel sits in the document flow. On a near-black page it was also close to
   invisible, so removing it cost nothing visually: the panel still separates by fill, 1 px border and
   inset rim, all of which stay. Declared as a fourth documented departure from the skill's CSS, in
   `liquid-glass.css`. The menu tier keeps its shadow, because the sticky bar genuinely floats.
5. **Stale pointer** in `liquid-glass.css` still naming the pre-rename `.client.ts`. Fixed.

**One apparent defect that was not real.** A raw Chrome headless capture at `--window-size=390`
looked like horizontal overflow. It is not: Windows clamps the headless window to a minimum width, so
the page laid out wider than the frame and the capture cropped it. The inspector, which emulates the
viewport properly, measures `horizontalOverflow=0` with no culprits at all three widths. No change made.

## Open items carried forward

1. **Project captures.** Still none, now with a per-project checklist on each case-study page.
2. **No verified links for any project.** Each page states this in words. Add `links` entries to
   `caseStudies.ts` once addresses are confirmed and checked to resolve.
3. **The four security and correctness findings in §3** — the committed API key first.
4. **Node 22.14.0** — unchanged, still the recorded blocker before production-readiness work.
5. **Nine high `npm audit` findings** — unchanged. `npm audit fix --force` was not run and still must not be.
6. **The mobile navigation pattern** is a disclosure panel, not a focus-trapped dialog — unchanged from
   Phase 2.
7. **Deferred to a QA phase:** cross-browser rendering, physical-device testing, Lighthouse scoring and
   automated accessibility auditing. The refraction path in particular has only been exercised in
   Chromium; non-Chromium browsers get the plain frosted fallback by design, but that has not been
   eyeballed on a real Safari or Firefox.

## Verification log — Phase 3

- **Method:** `nuxt typecheck` and `nuxt build`, then the taste-skill inspector driving headless Chrome
  at 1440×900, 768×1024 and 390×844 against the built output served from `node .output/server/index.mjs`
  on port 3100. Reports and screenshots under `.taste-skill/phase3/<route>/`. Screenshots were read.
- **Not verified in this pass:** anything requiring a deployed domain, anything inside the sibling
  repositories beyond reading them, and every claim the pages themselves mark as partial, reported or
  unevidenced — those markings are the honest state, not gaps to close here.

---

## Phase 4 — Project evidence, case-study accuracy and visual assets (2026-10-16)

Objective was truthful representation: real screenshots where they exist, honest gaps where they do
not, and an accurate architecture diagram for GhostPay that does not claim the whole system. No
redesign. `taste-skill`, the inspector and the linter were **not** run this phase — the brief forbade
invoking them — so nothing here rests on a rendered visual check.

### §1 Evidence inventory, established before any edit

Read from the sibling repositories and from the filesystem. No asset was searched for indefinitely.

| Project | Genuine captures on disk | What they actually show | Verdict |
|---|---|---|---|
| MindWell AI | 1 | The conversation list at phone width, 212×466. Eleven rows, all titled “New chat”, each with a delete control. `bgImage.png` is an app background, not interface evidence. `mindwell/docs/` is empty. | Used, with the limit stated in its caption |
| XVault | 7 unique (2 are byte-duplicates) | Library-empty, category-created, uncategorized, settings and sign-in-mobile. **Every count in every one is zero**, and the account is a test account named “UI Smoke”. | 5 used; the duplication and the empty-state problem are both stated |
| GhostPay | 0 | No application capture exists anywhere in either repository — only Android build resources (`splash.png`, `ic_launcher*.png`). | Diagram only; no screenshot claimed |
| Kene's Portfolio | 0 | — | Untouched |
| Investment-fund demo | 0 | — | Untouched |

Two categories the brief asked to separate, with nothing in either:

- **Capturable from a working application:** nothing. No project here has a build that can be run and
  photographed in this environment, and no browser or screenshot automation was launched.
- **Unavailable and left as a labelled placeholder:** everything listed under “Still to capture” on
  the three case studies, unchanged in kind from Phase 3.

### §2 Assets added

Copied from the sibling repositories into `public/work/<slug>/`. Source path recorded per file; the
portfolio's existing flat asset convention under `public/` was kept.

| Destination | Source | Size |
|---|---|---|
| `work/mindwell-ai/chat-list.png` | `mindwell/app/assets/images/Screenshot 2025-12-25 163415.png` | 24 KB, 212×466 |
| `work/xvault/library-empty.png` | `Twitter BookMark Organizer/XShare/screenshots/02-library-empty.png` | 40 KB, 1280×900 |
| `work/xvault/category-created.png` | `…/03-category-created.png` | 37 KB, 1280×900 |
| `work/xvault/uncategorized.png` | `…/04-uncategorized.png` | 34 KB, 1280×900 |
| `work/xvault/settings.png` | `…/05-settings.png` | 89 KB, 1280×1125 |
| `work/xvault/login-mobile.png` | `…/06-login-mobile.png` | 23 KB, 390×844 |

Not copied, and why: `01-login`, `05-login-dark`, `06-login-dark` and `07-login-mobile` are
duplicates or near-duplicates of captures already taken; three sign-in screens would add nothing the
one mobile sign-in does not. `bgImage.png` is not interface evidence.

### §3 The GhostPay diagram

`app/components/GhostPayArchitecture.vue` — markup and CSS, not an image and not an SVG. No
diagramming package was installed. It is markup because it has to be readable at 390px and because
its labels must be real text: forty lines of prose behind an `alt` attribute is not the same
information.

The diagram's purpose is the authorship line, so that is what it encodes. Every node carries a border
style **and a word** — the mark makes the division scannable, the word carries it, matching how every
other claim on the site presents itself.

| Mark | Assertion |
|---|---|
| Solid | This author's work. The client repository is twelve commits and all twelve are Michael Ebube's. |
| Dashed | Present in the source and read for this page; authorship not established by anything on disk. |
| Dotted | Third-party service called over the network — nobody on the project wrote any of it. |

Nodes, in flow order: **Android client** (solid) → **the boundary: four outbound calls** (solid) →
**Firebase Cloud Functions v2** (dashed) → **external services** (dotted), then a closing block,
*In the source as missing, or impossible to check*, which is drawn connected to nothing because as
written it is not connected.

A note on where the boundaries were drawn. The brief said to mark backend components as “implemented
by other contributors, **where verified**”. Backend authorship is **not** verifiable from what is on
disk: `GhostPay_BackendClient-main/` has no `.git` at all, so there is no commit, author or date to
read. The node therefore says *Authorship not evidenced* rather than attributing the backend to the
other contributors, which would have been a guess in the opposite direction. `GhostPay_Android_Nuxt/`
does have git: 12 commits, one author, last dated 2026-06-07.

### §4 Case-study claims corrected

| Where | Was | Now |
|---|---|---|
| GhostPay `role` | “Sole engineer — Cloud Functions backend and the Nuxt client with its Android shell” | “Client work — the Nuxt + Capacitor application and its Android shell, in a collaborative build” |
| GhostPay evidence | no authorship row | New “Who wrote what” row (`partial`) stating the twelve-commit client history and the backend's absent history |
| GhostPay architecture | one paragraph, no division of work | Second paragraph naming the client as this author's contribution and the rest as other contributors' |
| GhostPay decisions | rows read as one person's decisions | New leading row, “Whose decisions these are” (`reported`), placed before the list |
| GhostPay captures | asked for a diagram “once the flow itself is verified” | Diagram delivered now, as a source-derived drawing with its own caption saying so |
| MindWell evidence | “not that the application runs, which no capture here shows” | Names the deployment/capture gap precisely: the capture was not taken from that deployment |
| MindWell limits | “no screenshot of it exists on this page” | Corrected — a capture now exists, and it is not from the deployment |
| MindWell deployment link note | “no capture of it is shown above” | “no capture on this page was taken from it” |
| XVault homepage `reported` | “The captures on hand record login, empty-library and settings states only” | Five captures described, with the zero-count problem stated as the reason none proves ingestion |
| Homepage media frames (×3) | “Not yet captured.” | Each frame now states what exists, what does not, and where the captures are shown |

Nothing was added to a project that had no evidence. No claim was upgraded: the MindWell screenshot
did not move any evidence row, and the XVault captures explicitly did not either.

### §5 Files created and changed

**Created:** `app/components/GhostPayArchitecture.vue`, plus six images under `public/work/`.

**Changed:**
`app/data/caseStudies.ts` (new `CaseFigure` type, `figures`/`diagram` fields, six figures, one
diagram, GhostPay role + two new evidence rows + architecture paragraph, MindWell and XVault claim
corrections) · `app/pages/work/[slug].vue` (new “From the running build” section, `figuresLead`
computed, conditional heading/lead on the missing-captures section) · `app/data/portfolio.ts` (three
media-frame strings, XVault `reported`) · `app/components/MediaPlaceholder.vue` (docblock only) ·
`STATUS.md`.

No file was restructured and no unrelated project was touched. `git status` was read before any edit;
it stood at the same six modified files and one untracked component carried over from the links work.

### §6 Checks run

- **`npm run typecheck`** — clean, no errors. (The Node 22.14 version warning is pre-existing.)
- **`npm run build`** — green, 42.3s, 2.34 MB total. No prerender warnings.
- **Asset paths, by filesystem check:** all six `src` values resolve under `public/`, and no orphan
  file sits unused under `public/work/`.
- **Declared dimensions, by PNG header:** all six `width`/`height` pairs match their files exactly,
  so nothing is stretched and no layout shift is reserved wrongly.
- **Built HTML, read from `.output/public/`:** MindWell carries 1 `<img>` and 1 `<figcaption>`; XVault
  carries 5 and 5; GhostPay carries 0 images and 1 caption. `figuresLead` renders; “Still to capture”
  appears where captures exist and “Not yet captured” where they do not. The diagram's markup, header
  and legend appear on `/work/ghostpay` and on no other route. The corrected role is present and the
  old sole-engineer string is gone. The homepage has no `<img>` and no stale “Not yet captured.”

**Not verified this phase, and not claimed:** anything rendered. No browser was launched, no
screenshot was taken, and no visual check was performed — the brief forbade it. The above are code
and filesystem checks. Whether the figure grid reads well at each breakpoint is a judgement no check
here makes.

### §7 Known limitations carried forward

- **The MindWell capture is weak evidence and the caption says so.** A conversation list with eleven
  rows named “New chat” proves a screen renders. It is published because it is genuine, not because
  it is persuasive.
- **The XVault captures all show an empty archive.** The category-created capture is the strongest of
  the five, and what it shows is that a person can file things. Ingestion remains unproven.
- **GhostPay still has no screenshot of anything.** The diagram is a drawing of the source, and its
  caption says that in the first clause.
- **The diagram's scoped CSS ships in the shared `_slug_` chunk**, so roughly a kilobyte of
  `.arch__*` rules is inlined into every case-study page although only GhostPay uses them. Normal for
  a shared route chunk; noted because it is measurable.
- **`figures` and `diagram` are optional**, so a future case study can omit both and the section does
  not render — the page degrades to exactly its Phase 3 shape.
- The stale-diagnostic pattern recurred: the TS plugin reported `figuresLead` as non-existent in the
  template while `nuxt typecheck` passed clean. The typecheck is authoritative.

### Verification log — Phase 4

- **Method:** `npm run typecheck` and `npm run build` once each, then Node scripts reading the source
  data, the PNG headers and the built HTML under `.output/`. No browser, no screenshot, no automation.
- **Not verified in this pass:** rendering at any viewport; contrast of the diagram's border styles on
  the near-black canvas; whether the six captures read clearly at the sizes the grid gives them.

---

## Phase 5A — Integrate existing project screenshots (2026-10-16)

Both `public/work/` directories were **replaced by the site owner** between Phase 4 and this phase.
The Phase 4 copies of five XVault captures are gone; eleven new captures appeared — six for MindWell
and five for XVault. The new set is materially better on both projects, and one XVault capture shows a
**populated** archive, which invalidates several statements Phase 4 wrote about empty states.

### What the new captures actually show

Read one at a time before any caption was written. Anything not visible in an image is not claimed.

| File | Dimensions | What is in it |
|---|---|---|
| mindwell `…170302` | 1917×871 | Splash screen: logo on faint medical line-art |
| mindwell `…170323` | 1917×867 | Signed-in home: greeting, SOS button, empty message field |
| mindwell `…170514` | 1917×867 | Sidebar with **seven real conversation titles**, each with rename/delete, plus account and mood-meter links |
| mindwell `…170526` | 1902×868 | SOS screen: escalation copy, emergency number 112; helpline list cut off below |
| mindwell `…170601` | 1895×862 | Mood meter — **empty state**: “Not logged yet”, “No mood data for this period” |
| mindwell `…170716` | 1902×867 | Landing page with crisis-line banner |
| xvault `…182957` | 1916×872 | Dark desktop, **populated**: Library 18, Uncategorized 8, Football 5, Humor 1, Relatable 4, “Synced 2 minutes ago” |
| xvault `…183016` | 480×637 | Same Relatable records in the compact layout |
| xvault `…183055` | 352×752 | Sign-in, dark, narrow, with the invite-code line |
| xvault `…183119` | 1911×863 | Football category, with the account menu open — **contains a personal email address** |
| xvault `…183431` | 1917×870 | Football category, compact; one post's **photograph archived** alongside its text |

### Integrated

Nine figures referenced, ten in the data — six on `/work/mindwell-ai`, four on `/work/xvault`.

Left unreferenced, deliberately, and both files still sit in `public/`:

- `mindwell-ai/chat-list.png` — the Phase 4 capture. Superseded by `…170514`, which shows the same
  screen with real conversation titles instead of eleven rows named “New chat”. Kept on disk because
  the brief forbids deleting screenshots; not referenced because two views of one list is padding.
- `xvault/Screenshot 2026-10-16 183119.png` — **unreferenced for privacy, not for quality.** The
  account menu is open in it and shows an email address. The path is not printed here.

### Layout change, and why it was needed

The figures were a two-column grid in Phase 4. That was written for 1280-pixel captures; the new set
is mostly ~1900 pixels wide, and a two-column grid renders those at roughly a quarter scale — a
legible shape and useless as the evidence the caption beside it describes. The list is now one figure
per row at the full width of the column. `figure.phone` still caps a genuinely narrow capture rather
than stretching it. This is the only structural change; no section moved.

### Copy corrected, because the captures contradicted it

| Where | Was | Now |
|---|---|---|
| XVault `reported` (homepage) | “every count in all five is zero … no populated-library capture exists” | Four captures, populated archive, with the three things they still do not show |
| XVault `media.pending` | frame stands for a populated library | frame stands for a sync caught in the act and proof of media served from storage |
| XVault `captures` | asked for a populated library | asks for the run itself, storage proof, automatic categorisation, deletion detection |
| MindWell `media.pending` | “three screens that have never been photographed” | names the six that exist and the two gaps they leave |
| MindWell `captures` | SOS screen listed as unphotographed | narrowed to the helpline list the capture cuts off |

### Limitations preserved, and the one that got weaker

Every XVault caption keeps a qualification, because a screenshot with records in it is exactly the
kind of evidence that gets over-read. The four now say, between them: the posts are unedited X
content quoted as saved, so one is profane; the categories were applied by hand because the automatic
pass still has no worker; an archived image rendering does not show the bytes came from storage
rather than from the original URL; and nothing here shows a run rather than its result. MindWell adds
that the mood meter is empty, no capture shows a conversation being answered, the SOS screen is a
crisis route and not a clinical one, and no capture supports the self-reported evaluation — which
stays `reported` with `docs/` still empty.

The earlier claim that “an empty state is not evidence that ingestion works” was true for Phase 4 and
is no longer the relevant caveat. It has been replaced rather than deleted, and the replacement says
what the captures still fail to prove instead of being quietly dropped.

### Checks

- **`npm run typecheck`** — clean.
- **`npm run build`** — green, 44.0s, 2.35 MB.
- **References:** all ten resolve after percent-decoding; zero duplicate references; all ten declared
  width/height pairs match the PNG headers.
- **Built HTML:** `/work/mindwell-ai` carries 6 images and 6 captions, `/work/xvault` 4 and 4,
  `/work/ghostpay` 0 and 1. Heading reads “Still to capture” on the two with captures and “Not yet
  captured” on GhostPay. Every encoded path resolves against the built files.
- **Not done, per the brief:** no browser, no rendering, no visual check, no image was copied, moved,
  renamed, resized, cropped, recompressed or deleted.

### Open, and needing a decision from the owner

1. **`public/` is published whether or not a page links it.** `…183119`, with the email address, was
   copied into `.output/public/work/xvault/` by the build. A deploy would serve it at its path even
   though no page references it. Moving it out of `public/` is a move, which this brief forbids, so it
   is reported instead. Recommended before any deploy.
2. **One XVault capture quotes a profane post.** It is genuine archived content and its caption says
   so. Swapping the Relatable captures for the Football ones only would remove it, at the cost of the
   sidebar counts and the sync status, which are the strongest evidence on the page.
3. **The three unreferenced/referenced files total ~2.4 MB across the two pages.** The brief forbids
   recompressing, so the weight stands. Every image is lazy-loaded and every one carries its
   dimensions, so nothing shifts on load.
