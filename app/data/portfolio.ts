/**
 * Homepage content, typed and centrally defined (AGENT.md §12).
 *
 * Every string here traces to a verified source: `AGENT.md` §5/§8/§11, the
 * résumé read 2026-10-16 (`public/Resume-Michael_Ebube.pdf`), and — since Phase
 * 3 — the project repositories themselves, inspected read-only. Where a claim is
 * reported by the résumé but not found in the source, it is carried in a
 * `reported` field and rendered as reported, never as demonstrated.
 *
 * Nothing here may be invented to fill a layout: no metrics, testimonials,
 * deployment URLs, repository links or screenshots. `slug` is the case-study
 * route, and a slug here must resolve in `~/data/caseStudies.ts` — a link that
 * resolves to nothing is not permitted (AGENT.md §6).
 */

export type PublicationState = 'pending'

export interface MediaSlot {
  /**
   * The frame's whole statement: that the capture does not exist yet, and what
   * it will hold. Status and description are one line rather than a tiny label
   * above a heading, which is what a phone reads first.
   */
  pending: string
}

export interface FeaturedProject {
  id: string
  /** Case-study route: `/work/<slug>`, resolved from `caseStudies.ts`. */
  slug: string
  name: string
  /** Short purpose, one sentence. */
  purpose: string
  /** Status as it should be read by a visitor. */
  status: string
  /** Technologies actually used, from the verified stack lists. */
  stack: string[]
  /** The engineering challenge or the decision worth stating. */
  detail: string
  /** Evidence that exists but is reported rather than demonstrated. */
  reported?: string
  /** Publishable evidence, with its instrument and its limitation. */
  evaluation?: string
  media: MediaSlot
}

export const featuredProjects: FeaturedProject[] = [
  {
    id: 'mindwell',
    slug: 'mindwell-ai',
    name: 'MindWell AI',
    purpose: 'A wellbeing companion for Nigerian university students, built as a final-year project.',
    status: 'Final-year project',
    stack: [
      'Nuxt 4',
      'TypeScript',
      'Firebase Auth',
      'Firestore',
      'Cloud Functions',
      'Dialogflow CX',
      'Gemini',
    ],
    detail:
      'The conversational layer is routed through Dialogflow CX with Gemini behind it, so a matched intent is answered deterministically and anything unmatched still gets a response. Firebase carries authentication and the serverless backend. Verified against the source in Phase 3: one callable Cloud Function, two keyword layers around the model, and conversation memory re-read server-side.',
    reported:
      'AGENT.md and the résumé both place Gemini on Vertex AI. The code initialises the GenAI SDK from an API key instead, so the case study describes it as the code has it.',
    evaluation:
      'Self-reported design evaluation. A BUS-11 usability evaluation with 21 participants returned an overall mean of 4.50 / 5. The instrument, the responses and the analysis are not in the repository — `docs/` is empty — so this is published as the résumé’s claim and not as a validated or third-party finding.',
    media: {
      pending:
        'Not yet captured. Chat and mood screens, desktop and mobile, taken from the running application.',
    },
  },
  {
    id: 'xvault',
    slug: 'xvault',
    name: 'XVault',
    purpose: 'An X bookmark archiving application that ingests, categorises and stores saved posts.',
    status: 'In development',
    stack: [
      'Express 5',
      'TypeScript',
      'MongoDB',
      'Mongoose',
      'BullMQ',
      'Redis',
      'Playwright',
      'Nuxt 4',
      'Cloudflare R2',
    ],
    detail:
      'Synchronisation runs as background jobs: BullMQ queues on Redis drive Playwright sessions that read the bookmarks timeline through a stored, encrypted browser session, and media bytes are copied to Cloudflare R2 under object keys that are presigned per response. Verified against the source in Phase 3: three queues are declared and two have workers, so categorisation is enqueued and never processed.',
    reported:
      'The captures on hand record login, empty-library and settings states only. No populated-library capture exists, and an empty state is not evidence that ingestion works. Nothing on disk shows the stack was ever deployed.',
    media: {
      pending:
        'Not yet captured. A genuinely populated library, taken after the ingestion flow is verified in a safe environment.',
    },
  },
  {
    id: 'ghostpay',
    slug: 'ghostpay',
    name: 'GhostPay',
    purpose: 'Payment collection from a spoken sentence.',
    status: 'In development — integration not verified',
    stack: [
      'Firebase Cloud Functions',
      'Firestore',
      'Nuxt 4',
      'Capacitor',
      'Kotlin',
      'Whisper',
      'Gemini',
      'Korapay',
    ],
    detail:
      'A Cloud Functions backend transcribes a merchant’s sentence, extracts the amount and the customer’s number, opens a charge with the payment provider and notifies the customer — while a Nuxt client inside a Capacitor shell receives a spoken confirmation through a native Android service. Verified against both repositories in Phase 3: the provider calls are real, and two contract defects between client and backend currently stop the flow completing.',
    reported:
      'No payment dashboard and no live payment processing are claimed. Money has no route to the merchant’s verified payout account, the Android build has no Google Services configuration, and no device run is evidenced anywhere. Nothing here is presented as a working end-to-end payment.',
    media: {
      pending:
        'Not yet captured. Client screens plus an architecture diagram, drawn only from the verified call graph and only once the flow itself is verified on a device.',
    },
  },
]

export interface OtherProject {
  id: string
  /** Case-study route: `/work/<slug>`, resolved from `caseStudies.ts`. */
  slug: string
  name: string
  kind: string
  description: string
  stack: string[]
  limitation: string
}

export const otherProjects: OtherProject[] = [
  {
    id: 'kene-portfolio',
    slug: 'kene-portfolio',
    name: "Kene's Portfolio",
    kind: 'Client work · Nuxt 3',
    description:
      'A separate portfolio built for another developer, opening on a typed introduction and carrying a bio, a skills breakdown with certificate links, six analysis project cards and a contact form.',
    stack: ['Nuxt 3', 'Vue 3', 'GSAP', 'EmailJS'],
    limitation:
      'The deployment address has not been verified — the repository contains no host configuration of any kind — so no live link is offered.',
  },
  {
    id: 'investment-funds',
    slug: 'investment-fund-demo',
    name: 'Investment Fund Demo',
    kind: 'Independent project · Vue 3',
    description:
      'An investment-fund API integration demo with risk filtering, client-side pagination and a list-to-detail flow over a single fetched catalogue.',
    stack: ['Vue 3', 'Vite', 'Vuex', 'Axios'],
    limitation:
      'An independent integration demo, not an official Cowrywise product, and not affiliated with or endorsed by Cowrywise. The API endpoint is configured by an environment variable that is not present in the repository, so availability is unknown and there is no public demo link.',
  },
]

export interface Role {
  id: string
  role: string
  organisation: string
  location: string
  period: string
  summary: string
  points: string[]
}

export const roles: Role[] = [
  {
    id: 'cowrywise',
    role: 'Engineering Intern, Frontend Team',
    organisation: 'Cowrywise (YC S18)',
    location: 'Lagos State, Nigeria',
    period: 'March 2025 — September 2025',
    summary:
      'Frontend work on a live financial platform, from a framework migration to a real-time multiplayer game.',
    points: [
      'Migrated the primary web platform from Nuxt 2 to Nuxt 3, refactoring legacy components into a modular architecture for SSR reliability and maintainability.',
      'Structured asynchronous data fetching and dynamic metadata handling, improving rendering stability and SEO on high-traffic marketing pages.',
      'Built responsive interfaces for Cowrywise Kids, an interactive financial literacy platform, with an emphasis on accessibility and performance.',
      'Built a real-time multiplayer financial card game with Socket.io, synchronising state across concurrent users through events.',
      'Integrated GSAP animation with performance-conscious rendering, holding strong Lighthouse scores.',
      'Worked in an agile flow: Git, feature branches, pull requests, code review, CI, and shipping to live users.',
    ],
  },
]

export interface Credential {
  id: string
  institution: string
  qualification: string
  location: string
  period: string
}

export const credentials: Credential[] = [
  {
    id: 'covenant',
    institution: 'Covenant University',
    qualification: 'BSc Computer Science',
    location: 'Ogun State, Nigeria',
    period: '2022 — 2026',
  },
  {
    id: 'christ-college',
    institution: 'Christ College Lagos',
    qualification: 'Senior Secondary School Certificate (Science)',
    location: 'Lagos, Nigeria',
    period: '2019 — 2022',
  },
]

/** About rail. Cumulative GPA appears here and nowhere else (AGENT.md §11). */
export const aboutFacts: { term: string; detail: string }[] = [
  { term: 'Education', detail: 'Covenant University — BSc Computer Science, 2022–2026' },
  { term: 'Cumulative GPA', detail: '4.97 / 5.0' },
  { term: 'Experience', detail: 'Cowrywise (YC S18) — Engineering Intern, Frontend, 2025' },
  { term: 'Working across', detail: 'Frontend engineering, backend systems, applied AI' },
  { term: 'Source', detail: 'Résumé, read 2026-10-16' },
]

export interface ToolkitGroup {
  id: string
  title: string
  items: string[]
  /**
   * Where the group was actually used. This is the honesty clause of the section:
   * it is what separates "used in a shipped project" from "appears on the résumé",
   * so every line names a project or says plainly that there is none.
   */
  context: string
}

export const toolkit: ToolkitGroup[] = [
  {
    id: 'frontend',
    title: 'Frontend engineering',
    items: [
      'TypeScript',
      'JavaScript (ES6+)',
      'Vue',
      'Nuxt (Composition API)',
      'React',
      'Tailwind CSS',
      'SCSS',
      'Vite',
      'Capacitor',
    ],
    context:
      'Nuxt 4 and TypeScript carry MindWell AI and XVault, and Capacitor wraps the GhostPay client. Vue and Nuxt 2 → 3 shipped at Cowrywise. React and SCSS come from the résumé and two React certificates rather than a project on this page.',
  },
  {
    id: 'backend',
    title: 'Backend and APIs',
    items: ['Node.js', 'Express', 'Firebase Cloud Functions', 'Socket.io', 'Python'],
    context:
      "Express 5 and Node run XVault's API; Firebase Cloud Functions sit behind MindWell AI and GhostPay. Socket.io shipped in Cowrywise's multiplayer card game. Python is from the résumé's skills list.",
  },
  {
    id: 'data',
    title: 'Databases and infrastructure',
    items: ['Firestore', 'MongoDB', 'Redis', 'Cloudflare R2', 'Firebase', 'Render', 'Vercel'],
    context:
      "MongoDB holds XVault's data, Redis backs its job queue and Cloudflare R2 stores its media. Firebase serves MindWell AI. Render and Vercel are deployment targets from the résumé's skills list.",
  },
  {
    id: 'ai',
    title: 'Applied AI',
    items: ['Dialogflow CX', 'Gemini', 'Applied ML pipelines', 'CNN models'],
    context:
      'Dialogflow CX and Gemini are both wired into MindWell AI, including its fallback path, and Gemini also parses payment intent in GhostPay. The ML pipelines and CNN models are coursework-level work from the résumé, with no project on this page behind them yet.',
  },
  {
    id: 'tools',
    title: 'Tools and workflow',
    items: ['Git', 'GitHub', 'CI', 'Playwright', 'npm', 'yarn'],
    context:
      "Git, branches, pull requests and CI are how the Cowrywise work shipped. Playwright drives XVault's ingestion, and the package managers come from everyday project work.",
  },
]

export const contact = {
  email: 'michaelebube18@gmail.com',
  resume: { href: '/Resume-Michael_Ebube.pdf', label: 'Download résumé', meta: 'PDF · 644 KB' },
} as const
