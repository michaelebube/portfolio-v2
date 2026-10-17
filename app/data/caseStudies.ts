/**
 * Case-study content. One entry per featured project.
 *
 * Every statement here traces to inspected source in the sibling repository
 * named in `source` — not to the résumé, not to AGENT.md, and not to memory.
 * Where the three disagree, the code wins and the disagreement is recorded in
 * the entry itself rather than smoothed over.
 *
 * The `evidence` rows are the page's signature device (PRODUCT.md §Positioning):
 * each claim carries the state it actually has. A reader who checks the source
 * should find every row holds.
 */

/** How much weight a claim can carry, in descending order of proof. */
export type ClaimState =
  /** Read directly from working code, config or rules. */
  | 'verified'
  /** Code exists but a piece is missing, stubbed, or not wired in. */
  | 'partial'
  /** Asserted by the résumé or AGENT.md; not found in the source. */
  | 'reported'
  /** No evidence of any kind exists on disk. */
  | 'absent'

export interface EvidenceRow {
  term: string
  detail: string
  state: ClaimState
}

/**
 * How each state presents itself. The word carries the meaning; the mark's
 * shape only makes the word scannable, so a reader who cannot separate the
 * greys still gets the state in full.
 */
export const CLAIM_PRESENTATION: Record<
  ClaimState,
  { label: string; mark: 'solid' | 'hollow' }
> = {
  verified: { label: 'Verified', mark: 'solid' },
  partial: { label: 'Partial', mark: 'hollow' },
  reported: { label: 'Reported', mark: 'hollow' },
  absent: { label: 'No evidence', mark: 'hollow' },
}

export interface CaseSection {
  id: string
  heading: string
  /** Allows project-specific material to remain available without rendering it. */
  visible?: boolean
  paragraphs?: string[]
  bullets?: string[]
  /** Labelled rows, rendered as a definition list on a solid surface. */
  rows?: EvidenceRow[]
  /** A quoted fragment from the real source, with its path. */
  code?: { path: string; body: string; caption: string }
}

/**
 * A real capture of a build, with the caption that keeps it honest.
 *
 * Every image on a case study comes through here, and the caption is not
 * optional: a screenshot with no statement of what it does and does not show is
 * the exact thing this portfolio exists not to do. Dimensions are carried so
 * the browser reserves the right box before the file arrives, and `phone` marks
 * a capture taken at phone width, which is shown at its own scale rather than
 * stretched across a desktop column.
 */
export interface CaseFigure {
  /** Public path, relative to the site root. Checked to exist on disk. */
  src: string
  /** What the image shows, for a reader who cannot see it. */
  alt: string
  /** What this capture is evidence of — and what it is not. */
  caption: string
  width: number
  height: number
  /** Taken at phone width, so it is presented at phone scale. */
  phone?: boolean
}

export interface CaseStudy {
  slug: string
  name: string
  /**
   * Which band of the homepage this belongs to. Case studies are one template;
   * the band only decides where the reader arrived from.
   */
  tier: 'featured' | 'other'
  /** One line, for the index and the page's first screen. */
  tagline: string
  /** Project status as it should appear publicly. */
  status: string
  /** What the project set out to be, in one sentence. */
  summary: string
  role: string
  period: string
  /** The repository this entry was verified against, by relative path. */
  source: string
  stack: string[]
  /** Optional controls for case studies that should omit evidence/link copy. */
  showLinks?: boolean
  showEvidenceLead?: boolean
  /** The glass evidence panel at the top of the page. */
  sections: CaseSection[]
  /**
   * Only ever a destination that has been checked to exist. `kind` decides how
   * it presents: a repository is source to read, a deployment is something to
   * open. Both were confirmed before being listed here.
   */
  links: { label: string; href: string; note: string; kind: 'repo' | 'live' }[]
  /** Screenshots that still need to be captured, stated on the page. */
  captures?: string[]
  /** Real captures of a build, rendered above the list of what is missing. */
  figures?: CaseFigure[]
  /**
   * Set where a project has a diagram instead of a screenshot. The component
   * that draws it is picked in the page, not here — there is one diagram on the
   * site, and a map of one entry would be indirection for its own sake.
   */
  diagram?: { caption?: string }
}

export const caseStudies: CaseStudy[] = [
  {
    slug: 'mindwell-ai',
    name: 'MindWell AI',
    tier: 'featured',
    tagline: 'A wellbeing companion for Nigerian university students',
    status: 'Final-year project',
    summary:
      'A conversational support app that classifies what a student is asking through Dialogflow CX, composes the reply with Gemini, and escalates to crisis resources when the message calls for it.',
    role: 'Fullstack and AI Engineer',
    period: 'Final-year project, 2026',
    source: 'mindwell/',
    stack: [
      'Nuxt 4',
      'Vue 3',
      'TypeScript',
      'Firebase Auth, Firestore, Cloud Functions',
      'App Check (reCAPTCHA v3)',
      'Dialogflow CX',
      'Gemini via the Google GenAI SDK',
      'Tailwind CSS',
      'Chart.js',
    ],
    sections: [
      {
        id: 'problem',
        heading: 'Problem and intended users',
        paragraphs: [
          'Students at Nigerian universities face academic pressure, financial strain and long stretches away from family support, and the counselling available on campus is limited relative to the number who need it. A general-purpose chatbot answers the wrong question: it has no idea whether a message is ordinary exam stress or something that needs a person, now.',
          'MindWell AI is built for that distinction. It is aimed at students who would talk to something before they would walk into an office — and its most important feature is not the conversation but the boundary where the conversation stops and a helpline starts.',
        ],
      },
      {
        id: 'architecture',
        heading: 'Architecture and data flow',
        paragraphs: [
          'A message leaves the client and lands in a single callable Cloud Function. Everything decision-shaped happens there, which keeps the crisis logic out of reach of the browser and lets Firestore rules stay narrow.',
        ],
        bullets: [
          'The client writes the message, and reads the thread back through a Firestore snapshot listener so a reply appears without a refresh.',
          'A local crisis keyword layer runs first. A high-confidence match short-circuits: the crisis reply is returned immediately and the event is logged. Nothing else is consulted.',
          'Otherwise the function asks Dialogflow CX to classify the message, with sentiment analysis enabled.',
          'If Dialogflow throws, the turn continues rather than failing — Gemini is called with a default intent, and the response records `dialogflow_fallback_llm` so the path taken is visible in the data.',
          'For a non-crisis intent, Gemini composes the reply from the system prompt plus the last six messages of the thread, which the backend re-reads from Firestore for conversational memory.',
          'The model’s own output is screened for crisis keywords before it is returned. A hit replaces the reply with a safe response.',
        ],
      },
      {
        id: 'decisions',
        heading: 'Key implementation decisions',
        rows: [
          {
            term: 'Route intent and wording to different systems',
            detail:
              'Asking one model to both understand the message and write the reply made the understanding unauditable. Splitting them means the intent is a labelled, inspectable value, and the prose is a separate concern.',
            state: 'verified',
          },
          {
            term: 'Put the crisis path in front of the model',
            detail:
              'A keyword layer runs before anything generative and can end the turn on its own. A model that is unavailable, slow or wrong still cannot swallow a crisis message.',
            state: 'verified',
          },
          {
            term: 'Screen the model’s output, not just its input',
            detail:
              'The same keyword layer runs over the generated reply. A model that produces something unsafe is replaced rather than shown.',
            state: 'verified',
          },
          {
            term: 'Keep crisis logs out of client reach',
            detail:
              '`firestore.rules` denies client read and write on `crisis_logs` outright; only the Admin SDK writes there. The people whose messages may be logged cannot read the log.',
            state: 'verified',
          },
          {
            term: 'Carry conversation memory server-side',
            detail:
              'The function re-reads the last six messages for each turn rather than trusting a transcript sent by the client, so a tampered client cannot rewrite the model’s context.',
            state: 'verified',
          },
        ],
      },
      {
        id: 'tradeoffs',
        heading: 'Engineering trade-offs',
        rows: [
          {
            term: 'Two intent systems, one fallback',
            detail:
              'Dialogflow gives inspectable intents; Gemini gives better language. Running both means two failure modes and a downgrade path between them. The cost is a more complex turn, paid for in exchange for an intent that can be read and tested.',
            state: 'verified',
          },
          {
            term: 'Keyword matching is blunt',
            detail:
              'It is fast, offline, and auditable, and it will match a message that mentions self-harm in a lecture note about it. Chosen because the false-positive cost — an unnecessary helpline — is far below the false-negative one.',
            state: 'verified',
          },
          {
            term: 'No localisation layer',
            detail:
              'Pidgin lives in keyword lists and prompt instructions rather than in an i18n system. That was cheap and works for the crisis path, but the interface itself is English-only, and adding a second language to the UI would mean building the layer that was skipped.',
            state: 'verified',
          },
          {
            term: 'Settings tuned for latency',
            detail:
              'Replies are generated with thinking disabled and a bounded output length, so a student waiting on a reply gets one quickly. The trade is depth on questions that might have benefited from more reasoning.',
            state: 'verified',
          },
        ],
      },
      // {
      //   id: 'outcomes',
      //   heading: 'Verified outcomes',
      //   paragraphs: [
      //     'What follows is what the source shows, and nothing beyond it. The application is not a diagnostic or treatment system, and nothing here should be read as a clinical claim.',
      //   ],
      //   rows: [
      //     {
      //       term: 'Working, end to end in code',
      //       detail:
      //         'Email and password authentication with a route guard, persistent chat threads, mood logging with a Chart.js view, the Dialogflow classification path, the Gemini reply path, the fallback between them, and crisis detection with an SOS screen.',
      //       state: 'verified',
      //     },
      //     {
      //       term: 'The reported evaluation',
      //       detail:
      //         'The résumé reports a BUS-11 usability evaluation, 21 participants, an overall mean of 4.50 / 5. The instrument, the responses, the recruitment and the analysis are not in the repository, so the figure is published here as the résumé’s claim and explicitly not as a validated or third-party finding. Nothing on this page rests on it.',
      //       state: 'reported',
      //     },
      //   ],
      // },
    ],
    links: [
      {
        label: 'github.com/michaelebube/MindWell',
        href: 'https://github.com/michaelebube/MindWell',
        note: 'The public repository containing the MindWell application source.',
        kind: 'repo',
      },
      {
        label: 'mindwell-v1.vercel.app',
        href: 'https://mindwell-v1.vercel.app',
        note: 'The live deployment of the MindWell application.',
        kind: 'live',
      },
    ],
    figures: [
      {
        src: '/work/mindwell-ai/Screenshot%202026-10-16%20170716.png',
        alt: 'The MindWell landing page: a crisis-line banner above the navigation, the headline “A safe space for your mind on campus”, and Get Started and Sign in buttons.',
        caption:
          'The public landing page, with the crisis-line banner above the navigation and the chat launcher at the foot. Describes what the app is for; makes no outcome claim.',
        width: 1902,
        height: 867,
      },
      {
        src: '/work/mindwell-ai/Screenshot%202026-10-16%20170323.png',
        alt: 'The signed-in MindWell home screen: a greeting, a red SOS button in the top corner, and a green message field reading “What’s bothering you?”',
        caption:
          'The home screen after sign-in — greeting, SOS button, message field. The field is empty, so this is the way into a conversation rather than a conversation.',
        width: 1917,
        height: 867,
      },
      {
        src: '/work/mindwell-ai/Screenshot%202026-10-16%20170514.png',
        alt: 'The MindWell sidebar open over the home screen, listing search, a New chat action, seven conversation titles, and links to the account and mood meter.',
        caption:
          'The sidebar, and the only capture here that shows stored data: real conversation titles, each with its own rename and delete controls, plus the account and mood-meter links. It evidences that conversations are kept and listed per user; it does not show one being answered.',
        width: 1917,
        height: 867,
      },
      {
        src: '/work/mindwell-ai/Screenshot%202026-10-17%20154304.png',
        alt: 'The MindWell mood dashboard: today’s mood is Sad, with a populated 180-day mood chart and mood insight panel.',
        caption:
          'The previous empty mood dashboard has been replaced with the populated view, showing a selected mood, a chart with recorded entries and a generated insight.',
        width: 1895,
        height: 862,
      },
      {
        src: '/work/mindwell-ai/Screenshot%202026-10-16%20170526.png',
        alt: 'The MindWell SOS support screen: a panel reading “You’re Not Alone Right Now”, and a second panel giving the emergency number 112.',
        caption:
          'The SOS screen reached from the home button, showing the escalation copy and the emergency number. It is a crisis route, not a clinical one, and nothing on this page shows it being evaluated — the helpline list underneath is cut off by the capture.',
        width: 1902,
        height: 868,
      },
      {
        src: '/work/mindwell-ai/Screenshot%202026-10-17%20153413.png',
        alt: 'The MindWell login screen with email and password fields and a Log in button.',
        caption:
          'The login screen, showing the email-and-password entry point before a student reaches the protected application.',
        width: 958,
        height: 575,
      },
      {
        src: '/work/mindwell-ai/Screenshot%202026-10-17%20154202.png',
        alt: 'The MindWell mood log asking how the user feels, with Happy, Sad and Not sure choices.',
        caption:
          'The mood-log screen, where a student records a simple current feeling before it appears in the dashboard.',
        width: 961,
        height: 575,
      },
    ],
  },
  {
    slug: 'xvault',
    name: 'XVault',
    tier: 'featured',
    tagline: 'A personal archive for the posts you saved and never read again',
    status: 'Completed',
    summary:
      'A private archive of X bookmarks: a browser session reads the saved timeline on a schedule, the posts land in MongoDB, and every image, video poster and avatar is copied into Cloudflare R2 so the archive outlives the post.',
    role: 'Fullstack Engineer',
    period: '2026',
    source: 'Twitter BookMark Organizer/XShare/',
    stack: [
      'Express 5',
      'TypeScript',
      'MongoDB',
      'Mongoose',
      'BullMQ',
      'Redis',
      'Playwright',
      'Nuxt 4',
      'Vue 3',
      'Cloudflare R2',
    ],
    sections: [
      {
        id: 'problem',
        heading: 'Problem and intended users',
        paragraphs: [
          'Saving a post on X is a promise to come back to it, and almost nobody does. The bookmarks timeline is a flat reverse-chronological list with no search worth using, no folders, and no way to see it again if the account that posted it disappears. A bookmark is also not a copy: it is a pointer, and the thing it points at can be deleted or the account locked at any time.',
          'XVault is for the person who treats bookmarks as a reading list rather than a reflex — who wants to search their own saves full-text, file them, and still have the image when the original is gone. Built as a personal archive, it is not a social product and has no sharing or public-facing features.',
        ],
      },
      {
        id: 'architecture',
        heading: 'Architecture and data flow',
        paragraphs: [
          'Two processes share one codebase: an API that serves the client and a worker that does everything slow. The split is what keeps a scrape that takes minutes from occupying a request.',
        ],
        bullets: [
          'The client runs as a single-page app and talks to the API with a short-lived access token, refreshed silently and queued so concurrent 401s produce one refresh rather than several.',
          'A schedule per user enqueues a scrape job. A deterministic job id plus a running flag on the sync state means one user cannot have two scrapes in flight.',
          'The worker starts Chromium, restores the stored session, walks the bookmarks timeline and stops on either of two signals — a known topmost post, or a run of posts already archived.',
          'New posts are written with an insert-only bulk write, so a scrape can add but never overwrite a category or a note a person set by hand.',
          'Media for each post is queued separately. The worker fetches the source bytes and uploads them to R2, isolating a failure per item so one dead URL does not fail the post.',
          'The client reads everything back through the API; media is rendered from presigned URLs minted per response.',
        ],
      },
      {
        id: 'decisions',
        heading: 'Key implementation decisions',
        rows: [
          {
            term: 'Let the database enforce identity, not the scraper',
            detail:
              'The scraper is allowed to be wrong about what it has seen. A unique index on user and post id means a duplicate is rejected by MongoDB rather than by the crawl logic, so correctness does not depend on the fragile part.',
            state: 'verified',
          },
          {
            term: 'Store keys, mint URLs',
            detail:
              'Persisting a URL would mean persisting one that expires, or making the bucket public. Storing only the object key keeps the bucket private and puts URL lifetime in one place — at serialisation time, where it can be changed without a migration.',
            state: 'verified',
          },
          {
            term: 'One place where a user is applied',
            detail:
              'Filter construction is centralised so `userId` is added in exactly one function. Multi-user isolation is then a single thing to read and audit rather than a condition repeated across query sites, where one omission is invisible.',
            state: 'verified',
          },
          {
            term: 'Encrypt the session, and keep the password out',
            detail:
              'The X session is the most dangerous object the system holds. It is captured once by a local process, encrypted at rest and excluded from queries by default, so a routine read of the user document cannot leak it.',
            state: 'verified',
          },
          {
            term: 'Separate the worker from the API',
            detail:
              'A scrape is minutes of browser work; a request is not. Running them in different processes means a slow scrape cannot hold a connection pool, and the worker can be scaled or stopped without touching the API.',
            state: 'verified',
          },
        ],
      },
      {
        id: 'tradeoffs',
        heading: 'Engineering trade-offs',
        rows: [
          {
            term: 'Browser scraping instead of the API',
            detail:
              'The official API does not expose the bookmarks timeline, so the choice was a browser session or nothing. The cost is a system that breaks whenever X changes its markup, and no handling of rate limiting beyond human-like pacing and generous backoff.',
            state: 'verified',
          },
          {
            term: 'Three queues, two workers',
            detail:
              'Splitting scrape, media and categorisation was right — they have different concurrency and failure profiles. Declaring the third and never registering its worker is not; the producer and the consumer disagree, and a job that is enqueued forever looks like a backlog rather than a bug.',
            state: 'partial',
          },
          {
            term: 'Offset pagination',
            detail:
              'The list is paged by offset, which is simple and adequate at current size and degrades as an archive grows. A cursor is the eventual answer, and the source says so rather than pretending the current shape is final.',
            state: 'verified',
          },
          {
            term: 'Text search instead of embeddings',
            detail:
              'A weighted text index is cheap, predictable and explainable. Semantic categorisation was designed and configured but not written, so the archive today is searchable, not clever. That is the honest description of it.',
            state: 'partial',
          },
          {
            term: 'One Chromium at a time',
            detail:
              'Scrape concurrency is one. Media runs four. The asymmetry is deliberate: the browser is the expensive, detectable part, and serialising it is cheaper than being throttled.',
            state: 'verified',
          },
        ],
      },
    ],
    links: [
      {
        label: 'github.com/michaelebube/XVault',
        href: 'https://github.com/michaelebube/XVault',
        note: 'The public repository for this personal archive tool. No live deployment is listed because the project is not published as a public application.',
        kind: 'repo',
      },
    ],
    captures: [
      'A sync actually in progress, rather than what a finished one leaves behind. The captures show the result of a run and never the run.',
      'Evidence that an archived image came from storage rather than from the original URL — the saved copy and the hotlinked one are indistinguishable on screen, which is why the media claim rests on the source and not on these pictures.',
      'Automatic categorisation doing something. The categories in the captures were applied by hand, and the queue it would use still has no worker.',
      'Deletion detection, which the case study records as a badge with no writer and which therefore cannot be photographed at all.',
    ],
    figures: [
      {
        src: '/work/xvault/Screenshot%202026-10-16%20182957.png',
        alt: 'The XVault client in dark theme at desktop width: a sidebar counting Library 18 and Uncategorized 8 with Football, Humor and Relatable categories beneath it, a filter bar, and archived posts from the Relatable category each carrying its own archived timestamp.',
        caption:
          'The archive with records in it, and the first capture in this case study that shows a sync having run: the sidebar totals are non-zero, the categories carry counts, every post has its own archived timestamp, and the status line reads “Synced 2 minutes ago”. Two qualifications. The posts are unedited X content quoted as they were saved, so one of them is profane. And the categories were applied by hand through the review interface — the automatic pass described above still has no worker, so nothing here shows it running.',
        width: 1916,
        height: 872,
      },
      {
        src: '/work/xvault/Screenshot%202026-10-16%20183431.png',
        alt: 'The Football category in the compact layout, listing five bookmarks, the second of which is a post whose photograph has been saved and renders beneath its text.',
        caption:
          'The Football category, where one post’s photograph has been archived alongside its text. The case study claims the media bytes are copied rather than hotlinked, and an image rendering on the card is consistent with that without demonstrating it — the copy and the original look the same on screen. Each post carries an archived timestamp a few minutes old.',
        width: 1917,
        height: 870,
      },
      {
        src: '/work/xvault/Screenshot%202026-10-17%20161443.png',
        alt: 'The XVault Settings screen in light theme showing a healthy sync, the last successful sync, archived bookmark count and connected X account.',
        caption:
          'The Settings screen in light theme, showing sync health, archive totals, scheduling information and the connected X account.',
        width: 1917,
        height: 867,
      },
      {
        src: '/work/xvault/Screenshot%202026-10-17%20161556.png',
        alt: 'The XVault Settings screen in dark theme showing a healthy sync, the last successful sync, archived bookmark count and connected X account.',
        caption:
          'The same Settings screen in dark theme, included to show the application’s alternate visual treatment without implying anything about the sync implementation.',
        width: 1917,
        height: 853,
      },
    ],
  },
  {
    slug: 'ghostpay',
    name: 'GhostPay',
    tier: 'featured',
    tagline: 'Payment collection from a spoken sentence',
    status: 'In development',
    summary:
      'A voice-first payment request flow for merchants: a spoken sentence is transcribed and parsed into a payment request, a checkout link is created and sent to the customer over WhatsApp, and the merchant is intended to receive a spoken confirmation in Nigerian Pidgin.',
    role: 'Frontend Engineer and Android contributor',
    period: '2026',
    source:
      'GhostPay_BackendClient-main/ and GhostPay_Android_Nuxt/ (two repositories, inspected separately)',
    showLinks: false,
    showEvidenceLead: false,
    stack: [
      'TypeScript',
      'Nuxt 4',
      'Vue 3',
      'Capacitor 8',
      'Kotlin',
      'Firebase',
      'Google Gemini',
      'Korapay',
      'WhatsApp Cloud API',
    ],
    sections: [
      {
        id: 'problem',
        heading: 'Problem and intended users',
        paragraphs: [
          'For a market trader or small storefront, requesting a transfer can mean stopping a conversation to open an app, enter an amount, find the customer, send a request, and wait for confirmation. Each step introduces friction, and entering the wrong amount or contacting the wrong person can turn a routine transaction into a costly mistake.',
          'GhostPay explores a simpler interaction: the merchant speaks a sentence and the system handles the steps that follow. The experience is designed around merchants whose hands are occupied and whose attention is on the customer rather than the phone.',
          'The idea is not simply to add voice input to a payment form. It is to make voice the primary entry point, with a persistent Android notification and Quick Settings tile intended to make the flow accessible without navigating through the application.',
        ],
      },
      {
        id: 'contribution',
        heading: 'My contribution',
        paragraphs: [
          'I worked on the Nuxt 4 and Vue client, the Capacitor-powered Android application, and the native components that support its intended voice-first experience. My work covered the frontend pages and composables, audio-capture integration, merchant authentication state, and the Android shell implemented in Kotlin.',
          'I also helped shape the product concept and the intended interaction between the client and backend. The backend functions, Firestore data model, and payment-provider integrations were developed separately as part of the collaborative project. This case study describes the wider system to explain the engineering context, while distinguishing my implementation from components whose authorship is not established.',
        ],
        bullets: [
          'Nuxt + Vue: five pages covering the main entry point, login, onboarding, transaction history, and overlay experience.',
          'Client-side logic: composables for audio capture, authentication state, and communication with the backend.',
          'Capacitor integration: the bridge between the web application and native Android functionality.',
          'Native Android components: five Kotlin classes covering the activity, foreground service, Quick Settings tile, messaging service, and transparent overlay activity.',
          'The client repository contains twelve commits attributed to me. The separate backend copy has no Git history available, so its individual authorship cannot be established from the source examined for this case study.',
        ],
      },
      {
        id: 'architecture',
        heading: 'Architecture and data flow',
        paragraphs: [
          'GhostPay separates the mobile client from the backend. The client captures input, manages the merchant-facing experience, and communicates with backend endpoints. The backend is responsible for transaction processing, provider integrations, and the intended confirmation workflow.',
          'The diagram describes the architecture represented in the source code. It is not evidence that the complete system has been deployed or verified end to end.',
        ],
        bullets: [
          'Merchant authentication sends a phone number and receives a token.',
          'Account verification requests resolution of the merchant’s payout account.',
          'Merchant onboarding submits onboarding information.',
          'Voice ingestion uploads a recorded audio command as multipart data.',
          'The backend transcribes the audio, extracts the amount, description and customer phone number, validates the number, records a pending transaction, and requests a charge from the provider.',
          'The checkout link is sent to the customer through a WhatsApp template message.',
          'A signature-verified webhook and a scheduled poll are intended to resolve payment status.',
          'After confirmation, a Pidgin audio response is generated and intended for delivery through Firebase Cloud Messaging to the merchant’s device.',
        ],
      },
      {
        id: 'decisions',
        heading: 'Key implementation decisions',
        rows: [
          {
            term: 'Make voice the entry point',
            detail:
              'The interaction starts with a spoken payment command rather than a conventional payment form. The Android notification and Quick Settings tile are intended to reduce the steps required to initiate a request while serving a customer.',
            state: 'verified',
          },
          {
            term: 'Adapt transcription to the local context',
            detail:
              'The transcription request includes guidance for Nigerian English and local ways of expressing amounts, including shorthand such as `k` and references to naira. An incorrectly transcribed amount can change the meaning of a payment request.',
            state: 'verified',
          },
          {
            term: 'Validate extracted details before use',
            detail:
              'The language model extracts structured data, but its output is not treated as authoritative. The backend validates the customer phone number against a Nigerian E.164 pattern before using it in a transaction.',
            state: 'verified',
          },
          {
            term: 'Make repeated captures safe',
            detail:
              'The backend computes an idempotency key from transaction details and a short time window rather than relying exclusively on a client-generated key. This is intended to prevent duplicate charges when a merchant repeats an action because the first request appears slow.',
            state: 'verified',
          },
          {
            term: 'Confirm payments through the provider',
            detail:
              'The intended confirmation flow uses a signature-verified webhook, with a scheduled poll to recover unresolved charges. This separates payment confirmation from the initial charge request and makes the design more tolerant of missed callbacks.',
            state: 'verified',
          },
          {
            term: 'Speak the confirmation',
            detail:
              'A spoken confirmation in Nigerian Pidgin is intended to let the merchant receive feedback without needing to look at the screen. The choice follows the same principle as voice input: reduce the need to interact with the phone during a transaction.',
            state: 'verified',
          },
        ],
      },
      {
        id: 'tradeoffs',
        heading: 'Engineering trade-offs',
        rows: [
          {
            term: 'External models versus hosting our own',
            detail:
              'Transcription and intent extraction rely on external services. This reduces the need to train or host models, but introduces external dependencies, credentials, latency, and service availability into a flow that is intended to feel immediate.',
            state: 'verified',
          },
          {
            term: 'Native-first interaction versus portability',
            detail:
              'The persistent notification, Quick Settings tile, overlay, and push-triggered audio make Android central to the intended experience. The trade-off is that the full interaction cannot be assumed to work in a browser. The source also contains a recording-format mismatch that needs to be resolved before browser-based recording can be relied upon.',
            state: 'verified',
          },
          {
            term: 'Asynchronous notification delivery',
            detail:
              'The WhatsApp notification is handled outside the main request path so that a slow message send does not hold the initial response open. However, the response currently cannot reliably report the message-send result, and the relevant field is hardcoded to `false`.',
            state: 'verified',
          },
          {
            term: 'Separate client and backend repositories',
            detail:
              'Keeping the client and backend separate establishes a clear ownership and implementation boundary. It also means that shared types cannot automatically catch contract mismatches between the two repositories. Differences in response fields and data access have contributed to integration problems.',
            state: 'verified',
          },
          {
            term: 'Production-oriented payment configuration',
            detail:
              'The provider’s production host is the only host visible in the source examined. Whether the application uses test or live credentials depends on deployment configuration, which makes the distinction difficult to establish from the repository alone.',
            state: 'partial',
          },
        ],
      },
      {
        id: 'outcomes',
        visible: false,
        heading: 'Verified outcomes',
        paragraphs: [
          'The project has a substantial implementation across the client and backend source, but the complete payment journey has not been verified.',
        ],
        rows: [
          {
            term: 'Implemented in source',
            detail:
              'The client contains the Nuxt pages, composables, Capacitor integration, and native Kotlin components described above. The backend source contains the transaction-processing handlers and integrations with the transcription, language-model, payment, messaging, and speech services.',
            state: 'verified',
          },
          {
            term: 'Tested',
            detail:
              'Unit tests exist for intent parsing and the fallback poller. These tests run without live credentials and use mocked providers. The ingest handler, webhook, authentication, and onboarding do not have corresponding tests in the source examined.',
            state: 'partial',
          },
          {
            term: 'Built for a device',
            detail:
              'A debug Android package was produced, and the native components are present in the project. However, there is no recorded device or emulator run establishing that the notification, overlay, microphone, push, and audio-playback paths work together.',
            state: 'partial',
          },
          {
            term: 'Not verified end to end',
            detail:
              'There is no evidence that a merchant can complete a payment through the full intended journey, receive a working WhatsApp message, or hear a confirmation on a physical device. The client/backend integration and required deployment configuration remain unresolved.',
            state: 'absent',
          },
        ],
      },
      {
        id: 'limits',
        visible: false,
        heading: 'Limitations and next steps',
        bullets: [
          'The client expects a non-empty audio-feedback URL, while the backend currently returns an empty value. This prevents the intended successful-response path from completing and is a priority integration fix.',
          'The history screen has mismatched field names between the repositories, no established Firebase session for its data access, and a compound query that requires an index. These issues need to be addressed together before the screen can be considered functional.',
          'The backend collects and resolves merchant payout details, but the current charge flow does not use them to route funds to the merchant. There is no subaccount or transfer call in the source examined. Consequently, the project does not yet establish a complete merchant-payout flow.',
          'The Google Services configuration file is absent. In a fresh build, Firebase cannot initialise as required for the intended push-confirmation path. Configuration and device testing are prerequisites to verifying that experience.',
          'The notification, overlay, microphone, push, and audio-playback paths need to be exercised on physical hardware. These capabilities should remain described as implemented in source but unverified at runtime until a device run establishes their behaviour.',
          'The distinction between test and live payment processing needs to be visible in the deployment configuration and verified before any real transactions are attempted.',
        ],
      },
    ],
    links: [],
    diagram: {
    },
  },
  {
    slug: 'kene-portfolio',
    name: "Kene's Portfolio",
    tier: 'other',
    tagline: 'A portfolio for a data analyst, built to someone else’s brief',
    status: 'Client work · deployment unverified',
    summary:
      'An independent portfolio site for another developer, opening on a typed introduction that hands off to the site proper, and carrying a written bio, a skills breakdown with certificate links, six analysis project cards and a conversational contact form.',
    role: 'Design and build — front end, motion and the contact form integration',
    period: '2025',
    source: 'Kene Portfolio/folio/',
    stack: ['Nuxt 3', 'Vue 3', 'Tailwind CSS', 'GSAP', 'EmailJS'],
    sections: [
      {
        id: 'problem',
        heading: 'Problem and intended users',
        paragraphs: [
          'A data analyst looking for work has evidence that does not fit a template: notebooks, dashboards, certificates, and a set of analytical projects that are mostly links to somewhere else. The audience is a hiring manager giving the page a minute, so the page has to establish the discipline quickly and then get out of the way to the real artefacts.',
          'This was a build for someone else, which changed the work more than the technology did. The content is theirs, the emphasis is theirs, and the design decisions were made against a brief rather than against my own preferences.',
        ],
      },
      {
        id: 'architecture',
        heading: 'Architecture and data flow',
        paragraphs: [
          'A Nuxt application with file-based routing and no server layer of its own. Content is written into the pages rather than fetched, and the only outbound call is the contact form.',
        ],
        bullets: [
          'A shared layout holds the sidebar navigation and the page transition; each page supplies its own content.',
          'The introductory route is a full-screen typed sequence that navigates to the about page on a timer.',
          'Project cards are a single component rendered over a list, each card linking to an external report or notebook.',
          'The contact form validates in the browser, then submits through the email service’s client SDK with keys from environment configuration.',
          'An entrance animation is applied through GSAP on mount, scoped per page.',
        ],
      },
      {
        id: 'decisions',
        heading: 'Key implementation decisions',
        rows: [
          {
            term: 'Types the introduction, then leaves',
            detail:
              'The splash screen states who the site is for before the site itself loads. It is a deliberate cost — one extra screen between a visitor and the content — accepted because the first second is where the page decides whether it is read as a designer’s site or an analyst’s.',
            state: 'verified',
          },
          {
            term: 'Links out rather than reproduces',
            detail:
              'The analysis projects are notebooks and dashboards that live on other platforms. The site links to them behind short cards instead of re-hosting screenshots, so the evidence stays where it is maintained and the page stays fast.',
            state: 'verified',
          },
          {
            term: 'A contact form, not a mailto link',
            detail:
              'The form is conversational — name, then what the work is, then an address — which asks one question at a time and is less intimidating than a blank message box. It submits through a client SDK so no server is needed for a static deployment.',
            state: 'verified',
          },
          {
            term: 'Motion on entrance only',
            detail:
              'The animation layer announces a page and then stops. No scroll-linked effects, no parallax: the visitor is here to read a bio and follow links, and motion that continues competes with that.',
            state: 'verified',
          },
        ],
      },
      {
        id: 'tradeoffs',
        heading: 'Engineering trade-offs',
        rows: [
          {
            term: 'Five routes for one short site',
            detail:
              'Separating skills, projects and contact into their own routes gives each its own weight and a shareable address. A single long page would have been less code and less navigation, and it would have flattened four different kinds of content into one scroll.',
            state: 'verified',
          },
          {
            term: 'Keys in the browser',
            detail:
              'A client-side email integration means the public key ships with the page. That is the intended model for this service — the key is public by design — but it also means the form is only as protected as the service’s own abuse controls.',
            state: 'verified',
          },
          {
            term: 'No deployment configuration in the repository',
            detail:
              'Analytics packages that only function on one host are present, but nothing declares that host. The build is therefore portable and unverifiable at the same time: it can go anywhere, and no address can be stated as fact.',
            state: 'partial',
          },
        ],
      },
      {
        id: 'outcomes',
        heading: 'Verified outcomes',
        rows: [
          {
            term: 'Delivered',
            detail:
              'A complete four-page site plus an introduction, with worked content, a functioning contact path and a motion layer that runs on entrance. The content, the certificate links and the project links are the client’s own.',
            state: 'verified',
          },
          {
            term: 'Not verified',
            detail:
              'Whether the contact form has ever delivered a message from a deployed environment, and whether the site is live anywhere. Both depend on configuration that is not in the repository.',
            state: 'absent',
          },
        ],
      },
      {
        id: 'limits',
        heading: 'Limitations and next steps',
        bullets: [
          'The deployment address is unknown, so this page offers no link. Confirming the host and the domain would let the work be visited rather than described.',
          'The unused second headshot and the swapped icon filenames should be cleaned up the next time the repository is opened.',
          'The introduction’s timer is a fixed delay rather than tied to the typed sequence finishing, which will drift if the sentence is ever changed.',
          'There are no tests and no CI, which is proportionate for a static site of this size but means every change is verified by looking at it.',
        ],
      },
    ],
    links: [
       {
        label: 'data-with-donald.vercel.app',
        href: 'https://data-with-donald.vercel.app',
        note: 'The live deployment of the data-with-donald project.',
        kind: 'live',
      },
    ],
    captures: [
      'The introduction screen mid-type, desktop and mobile',
      'The about page and its bio layout',
      'The projects page with its six cards',
      'The contact form, filled and in its validated state',
    ],
  },
  {
    slug: 'investment-fund-demo',
    name: 'Investment Fund Demo',
    tier: 'other',
    tagline: 'A fund explorer built against a live investment API',
    status: 'Independent demonstration',
    summary:
      'A small Vue application that reads a fund catalogue from a live investment API and lets a visitor filter by risk, page through the results and open a detail view for a single fund.',
    role: 'Sole engineer — integration, state and interface',
    period: '2025',
    source: 'InvestmentFunds-main/',
    stack: ['Vue 3', 'Vite', 'Vuex 4', 'Axios', 'Tailwind CSS'],
    sections: [
      {
        id: 'problem',
        heading: 'Problem and intended users',
        paragraphs: [
          'Fund catalogues are dense: dozens of products, each with a risk band, a return figure, a composition and a manager. The job of a list like this is to let someone narrow to the two or three funds that match what they can tolerate, and the job of the detail view is to give them the numbers without sending them back to the list.',
          'This is a demonstration of that shape built against a real endpoint, and it is presented as nothing more than that. It is not an official product of the provider whose data it reads, it has no users, and it has not been evaluated by anyone.',
        ],
      },
      {
        id: 'architecture',
        heading: 'Architecture and data flow',
        paragraphs: [
          'A single store holds the catalogue and the current filter; the views read from it. There is one network call in the whole application.',
        ],
        bullets: [
          'On entering the list, the store performs the one request and assigns the returned list to state.',
          'A getter derives the visible funds from the catalogue and the selected risk level.',
          'The list view renders those funds and slices them by a client-side count for the load-more control.',
          'Navigating to a detail route looks the fund up in the already-loaded list by identifier.',
          'If the store is empty when a detail route is opened directly, the list is fetched as a fallback and the lookup is retried.',
        ],
      },
      {
        id: 'decisions',
        heading: 'Key implementation decisions',
        rows: [
          {
            term: 'Derive the filtered list rather than store it',
            detail:
              'Filtering is a getter over the catalogue and the selected band, not a second array kept in sync. Changing the filter cannot leave a stale list behind, because there is only one list.',
            state: 'verified',
          },
          {
            term: 'Load more instead of page numbers',
            detail:
              'Twenty funds at a time behind a single control, which suits a catalogue whose length the visitor does not know and does not want to reason about.',
            state: 'verified',
          },
          {
            term: 'One request, two views',
            detail:
              'Fetching once and deriving both the list and the detail keeps the interface fast and the API load minimal. The cost is the dependency the fallback exists to paper over.',
            state: 'verified',
          },
        ],
      },
      {
        id: 'tradeoffs',
        heading: 'Engineering trade-offs',
        rows: [
          {
            term: 'A detail view that depends on the list',
            detail:
              'Opening a fund pulls from memory rather than the network, so the second view costs nothing. It also means the route is not self-sufficient, and a shared or refreshed link depends on a fallback path that fetches everything to display one record.',
            state: 'verified',
          },
          {
            term: 'A demo with no fixture data',
            detail:
              'Pointing at the live endpoint keeps the demonstration honest — the numbers are real. It also makes the project unviewable without credentials and unreproducible for anyone reading the source.',
            state: 'partial',
          },
          {
            term: 'Client-side paging and filtering',
            detail:
              'Both are correct at this size and both move the whole catalogue to the client. Against a catalogue in the thousands, both would need to become query parameters.',
            state: 'verified',
          },
        ],
      },
      {
        id: 'outcomes',
        heading: 'Verified outcomes',
        rows: [
          {
            term: 'Implemented',
            detail:
              'A real integration against a configured endpoint, working risk filtering driven by store state, working client-side pagination with reset-on-filter, and a list-to-detail flow over a single fetched catalogue.',
            state: 'verified',
          },
          {
            term: 'Not verified',
            detail:
              'That the endpoint resolves, what the API returns, and whether the demo renders today. A deployment published from the repository was reachable when checked, but reachability is not the same as a working catalogue, and nothing here was exercised against the live API.',
            state: 'absent',
          },
        ],
      },
      {
        id: 'limits',
        heading: 'Limitations and next steps',
        bullets: [
          'The endpoint should be documented with an example file at minimum, so the project can be understood and run by someone who is not its author.',
          'The risk band is labelled two different ways in two places and should use one vocabulary.',
          'The selected-fund action is written and dispatched but never read by the detail view, which derives the fund a second way. One of the two should go.',
          'The minimum investment figure is hardcoded and would be wrong for any fund whose real minimum differs. It should either come from the record or be labelled as an example.',
          'The bundled provider logo and the one loaded from the provider’s own storage should be reconciled, and the page should state far more prominently that this is an independent demonstration.',
        ],
      },
    ],
    links: [
      {
        label: 'github.com/michaelebube/InvestmentFunds',
        href: 'https://github.com/michaelebube/InvestmentFunds',
        note: 'The public repository. Its package.json is named `cowrywiseinvestment` and pins vue ^3.5.13 with vuex, axios and Vite, matching what the claims above were checked against.',
        kind: 'repo',
      },
      {
        label: 'investment-funds-cw.vercel.app',
        href: 'https://investment-funds-cw.vercel.app',
        note: 'The deployment the repository links, which served the title “Cowrywise Investment Funds” when checked. Whether the API call behind it succeeds was not verified, and this is not an official Cowrywise product.',
        kind: 'live',
      },
    ],
    captures: [
      'The fund list with results loaded, showing cards and the load-more control',
      'The risk filter in use, before and after',
      'A fund detail page with its returns, composition and performance table',
    ],
  },
]

export function findCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((entry) => entry.slug === slug)
}

/** Prerender targets for `nuxt.config.ts`, so the routes are static. */
export const caseStudyRoutes = caseStudies.map((entry) => `/work/${entry.slug}`)
