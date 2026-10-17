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
 * deployment URLs, repository links or screenshots. A `repo` or a `links` entry
 * is a destination the user supplied and that was then checked to exist — the
 * Phase 3 rule is that a link is evidence, not decoration. Featured projects
 * have case-study routes; smaller projects link directly to their verified
 * applications and repositories.
 */

export type PublicationState = 'pending'

export interface MediaSlot {
  image?: {
    src: string
    alt: string
  }
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
  /**
   * Public repository, where one exists and has been checked. Absent means no
   * link ships — several of these projects are private, and a guessed URL would
   * be a fabricated destination.
   */
  repo?: string
  media: MediaSlot
}

export const featuredProjects: FeaturedProject[] = [
  {
    id: 'mindwell',
    slug: 'mindwell-ai',
    name: 'MindWell AI',
    purpose: 'A wellbeing companion tailored to Nigerian university students, combining conversational AI, English and Nigerian Pidgin support, and accessible mental health resources designed around their everyday experiences.',
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
    repo: 'https://github.com/michaelebube/MindWell',
    media: {
      image: {
        src: '/work/mindwell-ai/Screenshot%202026-10-16%20170302.png',
        alt: 'MindWell AI splash screen with the MindWell logo',
      },
      pending:
        'Six captures of this project are in the case study rather than here: the landing page, the home screen, the conversation list, the mood meter, the SOS screen and the splash. The frame stands for what none of the six shows — a conversation being answered, and the mood meter with anything in it.',
    },
  },
  {
    id: 'xvault',
    slug: 'xvault',
    name: 'XVault',
    purpose: 'An X bookmark archiving application that collects and stores saved posts, with tools to organise bookmarks into custom categories for easier browsing and retrieval. Designed to preserve bookmarked content and media, even when the original posts become unavailable.',
    status: 'Personal Tool',
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
      'Four captures are shown in the case study, and they now show a populated archive — non-zero counts, per-post archive timestamps and a sync status — so ingestion has evidently run at some point against an account. That is a real change from the earlier empty-state captures, and it does not settle everything: the captures still do not show the run itself, or media being served from storage rather than from the original post. The categories in them were applied by hand, because the automatic pass has no worker. Nothing on disk shows the stack was ever deployed.',
    repo: 'https://github.com/michaelebube/XVault',
    media: {
      image: {
        src: '/work/xvault/Screenshot%202026-10-16%20183431.png',
        alt: 'XVault bookmark archive filtered to the Relatable category',
      },
      pending:
        'Four real captures are in the case study, including a populated archive. The frame stands for the gap they leave: a sync caught in the act, and any evidence that an archived image is served from storage rather than from the post it came from.',
    },
  },
  {
    id: 'ghostpay',
    slug: 'ghostpay',
    name: 'GhostPay',
    purpose:
      'Payment collection from a spoken sentence, turning a merchant’s voice into a payment request without a traditional checkout flow.',
    status: 'In development',
    stack: [
      'Nuxt 4',
      'Vue 3',
      'TypeScript',
      'Capacitor',
      'Kotlin',
    ],
    detail:
      'A Cloud Functions backend transcribes a merchant’s sentence, extracts the amount and the customer’s number, opens a charge with the payment provider and notifies the customer, all without the need for a user to interact with a web interface. While a Nuxt client inside a Capacitor shell receives a spoken confirmation through a native Android service. Verified against both repositories in Phase 3: the provider calls are real, and two contract defects between client and backend currently stop the flow completing.',
    media: {
      pending:
        'The frame stands for the whole application: no capture of GhostPay exists, and the screens that matter most — the capture overlay and the confirmation notification — should not be photographed until a run on real hardware is recorded. The case study carries the architecture diagram instead, drawn from the source and marked with whose work each part is.',
    },
  },
]

export interface OtherProject {
  id: string
  name: string
  kind: string
  description: string
  stack: string[]
  /** Verified deployed application. */
  liveSite: string
  /** Verified public repository. */
  repo: string
}

export const otherProjects: OtherProject[] = [
  {
    id: 'kene-portfolio',
    name: "KED's Portfolio",
    kind: 'Client work · Nuxt 3',
    description:
      'A polished portfolio for a data analyst, designed to turn a broad range of skills, certifications and analytical work into a clear story for prospective employers.',
    stack: ['Nuxt 3', 'Vue 3', 'GSAP', 'EmailJS'],
    liveSite: 'https://data-with-donald.vercel.app',
    repo: 'https://github.com/michaelebube/Portfolio-Donald',
  },
  {
    id: 'investment-funds',
    name: 'Investment Fund Demo',
    kind: 'Independent project · Vue 3',
    description:
      'An investment-fund API integration demo with risk filtering, client-side pagination and a list-to-detail flow over a single fetched catalogue.',
    stack: ['Vue 3', 'Vite', 'Vuex', 'Axios'],
    liveSite: 'https://investment-funds-cw.vercel.app/',
    repo: 'https://github.com/michaelebube/InvestmentFunds',
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
    institution: 'Christ College',
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
]

export interface ToolkitGroup {
  id: string
  title: string
  items: string[]
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
      'GSAP',
      'Vite',
      'Capacitor',
    ],
  },
  {
    id: 'backend',
    title: 'Backend and APIs',
    items: ['Node.js', 'Express', 'Firebase Cloud Functions', 'Socket.io', 'Python'],
  },
  {
    id: 'data',
    title: 'Databases and infrastructure',
    items: ['Firestore', 'MongoDB', 'Redis', 'Cloudflare R2', 'Firebase', 'Render', 'Railway', 'Vercel'],
  },
  {
    id: 'ai',
    title: 'Applied AI',
    items: ['Dialogflow CX', 'Gemini', 'Applied ML pipelines', 'CNN models'],
  },
  {
    id: 'tools',
    title: 'Tools and workflow',
    items: ['Git', 'GitHub', 'CI', 'Playwright', 'npm', 'yarn'],
  },
]

export const contact = {
  email: 'michaelebube18@gmail.com',
  resume: { href: '/Resume-Michael_Ebube.pdf', label: 'Download résumé', meta: 'PDF · 644 KB' },
} as const

/**
 * Where else the work lives. Both addresses were supplied by the site owner
 * rather than inferred from the résumé, which names the two platforms but
 * carries no URLs — a guessed handle would be a fabricated link.
 *
 * `verified` records what could actually be checked. GitHub was fetched and
 * resolves to a real profile. LinkedIn answers automated requests with HTTP 999,
 * so nothing but a browser can confirm it: the entry ships on the owner's word
 * and says so here rather than implying a check that did not happen.
 */
export const socials: { id: string; label: string; href: string; verified: boolean }[] = [
  {
    id: 'github',
    label: 'GitHub',
    href: 'https://github.com/michaelebube',
    verified: true,
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/michael-ebube-113ab82a7/',
    verified: false,
  },
]
