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
  paragraphs?: string[]
  bullets?: string[]
  /** Labelled rows, rendered as a definition list on a solid surface. */
  rows?: EvidenceRow[]
  /** A quoted fragment from the real source, with its path. */
  code?: { path: string; body: string; caption: string }
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
  /** The glass evidence panel at the top of the page. */
  evidence: EvidenceRow[]
  sections: CaseSection[]
  /** Only ever a destination that has been checked to exist. */
  links: { label: string; href: string; note: string }[]
  /** Screenshots that still need to be captured, stated on the page. */
  captures: string[]
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
    role: 'Sole engineer — frontend, Cloud Functions backend, Dialogflow agent and integration',
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
    evidence: [
      {
        term: 'Frontend',
        detail:
          'Nuxt 4.2.2, Vue 3.5.25 and TypeScript, in the Nuxt 4 `app/` layout. Twenty of twenty-one components use `<script setup lang="ts">`.',
        state: 'verified',
      },
      {
        term: 'Data layer',
        detail:
          'Firestore holds `chats` with a `messages` subcollection, plus `moodLogs` and `users`. Rules scope each collection to its owner and write-lock `crisis_logs` to the Admin SDK.',
        state: 'verified',
      },
      {
        term: 'Backend',
        detail:
          'One callable Cloud Function is exported and compiled: `chatWithDialogflow`. A fuller Dialogflow fulfilment webhook exists in the repository but only as an unwired `.txt` backup that nothing imports.',
        state: 'partial',
      },
      {
        term: 'Intent classification',
        detail:
          'Dialogflow CX through `@google-cloud/dialogflow-cx`, calling `detectIntent` with sentiment analysis on. A `NO_MATCH` match type or an intent named for fallback routes the turn onward.',
        state: 'verified',
      },
      {
        term: 'Reply generation',
        detail:
          'Gemini through the Google GenAI SDK (`@google/genai`), model `gemini-3-flash-preview`, wrapped in a retry with exponential backoff and jitter.',
        state: 'verified',
      },
      {
        term: 'Vertex AI',
        detail:
          'AGENT.md and the résumé both place Gemini on Vertex AI. The code does not: it initialises the GenAI SDK from an API key. Described here as the code has it.',
        state: 'reported',
      },
      {
        term: 'Nigerian Pidgin',
        detail:
          'Handled in two places — Pidgin entries in the crisis keyword lists, including a dedicated Pidgin crisis reply, and a code-switching rule in the model system prompt. There is no locale layer: the Dialogflow agent runs `en`, and no UI copy is in Pidgin.',
        state: 'partial',
      },
      {
        term: 'Crisis escalation',
        detail:
          'Two keyword layers (one on the incoming message, one screening the model’s own output), the Dialogflow crisis intent, a write to `crisis_logs`, and an SOS screen carrying Nigerian helplines as `tel:` links.',
        state: 'verified',
      },
      {
        term: 'Mood logging',
        detail:
          'Writes to `moodLogs` from an onboarding screen, then charts the distribution over 7, 30, 90, 180 and 360 days with Chart.js.',
        state: 'verified',
      },
      {
        term: 'BUS-11 evaluation',
        detail:
          'The résumé reports a mean of 4.50 / 5 across 21 participants. No questionnaire, response data, methodology note or report exists in the repository — `docs/` is empty and nothing was ever committed. Recorded as the résumé’s claim, not as a finding.',
        state: 'absent',
      },
      {
        term: 'Deployment',
        detail:
          'Firebase project config and compiled function output are present, but nothing on disk shows either was deployed. No live URL is claimed.',
        state: 'absent',
      },
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
      {
        id: 'outcomes',
        heading: 'Verified outcomes',
        paragraphs: [
          'What follows is what the source shows, and nothing beyond it. The application is not a diagnostic or treatment system, and nothing here should be read as a clinical claim.',
        ],
        rows: [
          {
            term: 'Working, end to end in code',
            detail:
              'Email and password authentication with a route guard, persistent chat threads, mood logging with a Chart.js view, the Dialogflow classification path, the Gemini reply path, the fallback between them, and crisis detection with an SOS screen.',
            state: 'verified',
          },
          {
            term: 'The reported evaluation',
            detail:
              'The résumé reports a BUS-11 usability evaluation, 21 participants, an overall mean of 4.50 / 5. The instrument, the responses, the recruitment and the analysis are not in the repository, so the figure is published here as the résumé’s claim and explicitly not as a validated or third-party finding. Nothing on this page rests on it.',
            state: 'reported',
          },
        ],
      },
      {
        id: 'limits',
        heading: 'Limitations and next steps',
        bullets: [
          'The reported evaluation cannot be substantiated from what exists on disk. The next step is to locate or reconstruct the study, and publish the instrument and summary data alongside this page if it can be found.',
          'A crisis-analysis prompt is written and exported in the crisis utilities but never called. Either it should be wired into the escalation path or deleted; today it describes a layer that does not run.',
          'Pidgin support is real on the crisis path and absent from the interface. A student reading the app in Pidgin still meets an English UI.',
          'Nothing on disk demonstrates the function was ever deployed. Deployment should be evidenced or the claim left off — this page leaves it off.',
          'The repository contains a committed environment file holding a live-looking API credential. That file needs rotating and removing from history before any of this is published or shared; it is called out here rather than fixed, because the repository is outside this project.',
        ],
      },
    ],
    links: [],
    captures: [
      'The chat interface mid-conversation, desktop and mobile — no verified capture exists',
      'The mood-log screen and the mood meter chart with real entries',
      'The SOS screen with the helpline links',
      'The onboarding flow, which is currently unphotographed',
    ],
  },
  {
    slug: 'xvault',
    name: 'XVault',
    tier: 'featured',
    tagline: 'An archive for the posts you saved and never read again',
    status: 'In development',
    summary:
      'A private archive of X bookmarks: a browser session reads the saved timeline on a schedule, the posts land in MongoDB, and every image, video poster and avatar is copied into Cloudflare R2 so the archive outlives the post.',
    role: 'Sole engineer — API, worker process, scraper, data layer and Nuxt client',
    period: '2026 — in development',
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
    evidence: [
      {
        term: 'API',
        detail:
          'Express 5.1 with TypeScript 5.7, one router per module mounted in `app.ts` — auth, categories, bookmarks, sync, x-account — with zod validation, Helmet, and separate rate limiters for credential and general traffic.',
        state: 'verified',
      },
      {
        term: 'Data model',
        detail:
          'Mongoose 8.9 over seven models. A unique compound index on `(userId, tweetId)` is the real identity guarantee, and a named text index `tweet_search` weights body text at 10 against author name and handle at 4.',
        state: 'verified',
      },
      {
        term: 'Client',
        detail:
          'Nuxt 4 with Vue 3.5 and Tailwind v4, running as a client-rendered SPA (`ssr: false`) against the API.',
        state: 'verified',
      },
      {
        term: 'Background work',
        detail:
          'BullMQ 5.34 on Redis with three queues declared — scrape, media, ai — exponential backoff, a per-user repeatable schedule and reconcile-on-boot. Two workers are constructed. Nothing consumes the third queue.',
        state: 'partial',
      },
      {
        term: 'Automatic categorisation',
        detail:
          'The queue, its job payload, the `aiSuggestion` schema and the full review UI exist, and sync enqueues to it — but no worker is registered for it, so a job is written and never read. The similarity and model passes it assumes have no implementation in the repository.',
        state: 'partial',
      },
      {
        term: 'Media archive',
        detail:
          'Cloudflare R2 through the S3 client, and the bytes are genuinely fetched and uploaded — media, video poster frames and author avatars. Only the object key is persisted; every URL is presigned at response time with a six-hour lifetime, because the bucket is private.',
        state: 'verified',
      },
      {
        term: 'Ingestion',
        detail:
          'Playwright drives Chromium against the bookmarks timeline using a stored browser session — not the official API and not a manual export. Selectors are X’s own `data-testid` attributes, with randomised scroll timing and a stop signal after a run of already-archived posts.',
        state: 'verified',
      },
      {
        term: 'Session storage',
        detail:
          'The X session is captured once through a local command-line login, then held AES-256-GCM encrypted in a field excluded from queries by default. The account password never passes through the application.',
        state: 'verified',
      },
      {
        term: 'Playwright as a test runner',
        detail:
          'It is not one here. Playwright is a runtime dependency used for scraping; the test package is not installed, there is no runner config and no spec file. The claim is accurate only as a scraping library.',
        state: 'partial',
      },
      {
        term: 'Tests and CI',
        detail:
          'Vitest is installed and `npm test` runs it against an empty suite. Two throwaway smoke scripts exist for the API and the UI, but both are gitignored and neither is wired to anything automatic. There is no CI configuration in the repository.',
        state: 'absent',
      },
      {
        term: 'Storage provider',
        detail:
          'The project’s own documentation mandates Cloudinary and warns against replacing it. The code was migrated to R2 in a later commit and Cloudinary appears in no dependency. The code is the current state; the document is stale.',
        state: 'reported',
      },
      {
        term: 'Deployment',
        detail:
          'A host rewrite and an API base URL exist as configuration only. Nothing on disk shows the stack was ever deployed, and no live address is claimed here.',
        state: 'absent',
      },
    ],
    sections: [
      {
        id: 'problem',
        heading: 'Problem and intended users',
        paragraphs: [
          'Saving a post on X is a promise to come back to it, and almost nobody does. The bookmarks timeline is a flat reverse-chronological list with no search worth using, no folders, and no way to see it again if the account that posted it disappears. A bookmark is also not a copy: it is a pointer, and the thing it points at can be deleted or the account locked at any time.',
          'XVault is for the person who treats bookmarks as a reading list rather than a reflex — who wants to search their own saves full-text, file them, and still have the image when the original is gone. Access is invite-gated, and every query is scoped to one user, because an archive of what someone chose to save is not a public dataset.',
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
      {
        id: 'outcomes',
        heading: 'Verified outcomes',
        paragraphs: [
          'These are the paths that are present and wired in source. Nothing here has been run end to end against a live X account or a deployed environment, so each row is a statement about the code, not about a working system.',
        ],
        rows: [
          {
            term: 'Wired end to end',
            detail:
              'Invite-gated registration and login, refresh-token rotation with reuse detection and family revocation, category CRUD that reassigns rather than deletes, bookmark listing with filter, text search and an author facet, per-user scheduled scraping, and media archival with per-item failure isolation.',
            state: 'verified',
          },
          {
            term: 'Written but never invoked',
            detail:
              'Automatic categorisation, deletion detection and orphan-object cleanup. In each case the schema, the serialiser or the helper exists and the call site does not. They are listed here as gaps rather than as features.',
            state: 'partial',
          },
          {
            term: 'Screenshots',
            detail:
              'Eight unique captures exist, all produced by an automated smoke run: login in light, dark and mobile, an empty library, a created category, an uncategorized view and settings. There is no capture of a populated library, and an empty state is not evidence that ingestion works.',
            state: 'partial',
          },
        ],
      },
      {
        id: 'limits',
        heading: 'Limitations and next steps',
        bullets: [
          'The categorisation worker is the first thing to finish. Today the system asks for work it has no one to do, which is worse than not asking.',
          'Three settings actions in the client build their paths without the `/api` prefix the rest of the client uses. From source they resolve to the wrong route; they need to be corrected and then exercised against a running API.',
          'Deletion detection is a field, a serialiser and a badge with no writer. Either the check is implemented or the badge is removed — as it stands the interface can promise something it can never show.',
          'There is no test suite. Two smoke scripts cover a real amount of ground, but they are untracked and manual, which means the next person to change the scraper has nothing to run.',
          'Abandoned objects in R2 are never deleted. The helper exists and is never called; until it is, the bucket grows with every re-archive.',
          'The ingestion path has never been run against a live account with a real archive, so selector durability and rate-limit behaviour are unmeasured. Verification needs an account that is safe to use, and no other person’s data.',
        ],
      },
    ],
    links: [],
    captures: [
      'A genuinely populated library, with real posts, taken after ingestion is verified in a safe environment',
      'A category view holding archived posts, and the filmstrip of uncategorised ones',
      'The media lightbox over an archived image',
      'A sync run in progress and its resulting status panel',
    ],
  },
  {
    slug: 'ghostpay',
    name: 'GhostPay',
    tier: 'featured',
    tagline: 'Payment collection from a spoken sentence',
    status: 'In development — integration not verified on a device',
    summary:
      'A merchant says what they were paid and who paid it. The audio is transcribed, the amount and phone number are extracted, a checkout link is created with the payment provider and sent to the customer over WhatsApp — while the merchant gets a spoken confirmation in Nigerian Pidgin.',
    role: 'Sole engineer — Cloud Functions backend and the Nuxt client with its Android shell',
    period: '2026 — in development',
    source:
      'GhostPay_BackendClient-main/ and GhostPay_Android_Nuxt/ (two repositories, inspected separately)',
    stack: [
      'Firebase Cloud Functions v2',
      'TypeScript',
      'Firestore',
      'Nuxt 4',
      'Vue 3',
      'Capacitor 8',
      'Kotlin',
      'OpenAI Whisper',
      'Gemini',
      'Korapay',
      'WhatsApp Cloud API',
      'YarnGPT',
    ],
    evidence: [
      {
        term: 'Backend',
        detail:
          'Firebase Cloud Functions v2 on Node 20. Seven functions are exported: six HTTP handlers and one schedule that runs every two minutes as a payment-status fallback.',
        state: 'verified',
      },
      {
        term: 'Data model',
        detail:
          'Three Firestore collections, written from the function bodies rather than declared in a schema: `transactions` keyed by the payment reference, `merchants` keyed by the normalised phone number, and an idempotency cache.',
        state: 'verified',
      },
      {
        term: 'Transcription',
        detail:
          'OpenAI `whisper-1` over `multipart/form-data`, with a prompt that names the register — Nigerian English, `k` meaning thousand, naira as the currency, and Nigerian mobile prefixes — and container extensions normalised before the upload.',
        state: 'verified',
      },
      {
        term: 'Intent extraction',
        detail:
          'Gemini `gemini-2.0-flash` returns JSON for amount, description and phone number, and the phone number is then checked against a Nigerian E.164 pattern rather than trusted.',
        state: 'verified',
      },
      {
        term: 'Payments',
        detail:
          'Korapay: charge initialisation, charge status and bank-account resolution, all against the live host with no sandbox branch in the code. Whether a charge moves real money is decided entirely by which key the environment supplies, and no key, example file or runtime config exists in the repository.',
        state: 'partial',
      },
      {
        term: 'Settlement to the merchant',
        detail:
          'Onboarding verifies a payout account and stores its number, bank code and resolved name. Those three fields are never read again: the charge body carries no subaccount, and no transfer or subaccount call exists anywhere. Funds would land in the platform account, not the merchant’s.',
        state: 'partial',
      },
      {
        term: 'Webhook verification',
        detail:
          'HMAC-SHA256 over the raw request body compared with a timing-safe equality check, refusing with an error when the secret is unset. This is properly done rather than stubbed.',
        state: 'verified',
      },
      {
        term: 'Customer notification',
        detail:
          'A WhatsApp Cloud API template message carrying the description and the checkout link, sent after the charge is created. It requires an approved template of that exact name on the business account, which nothing in either repository creates or evidences.',
        state: 'partial',
      },
      {
        term: 'Spoken confirmation',
        detail:
          'A text-to-speech call in Pidgin, uploaded to storage, and pushed to the device as a data payload that a native service plays on receipt.',
        state: 'verified',
      },
      {
        term: 'Android shell',
        detail:
          'Five Kotlin files: a foreground service with a persistent notification, a Quick Settings tile, a messaging service that plays the audio, a transparent overlay activity hosting the capture screen, and the Capacitor bridge activity.',
        state: 'verified',
      },
      {
        term: 'Push delivery',
        detail:
          'The Google Services configuration file is absent, so the build applies the plugin conditionally and Firebase never initialises. The whole confirmation path is dead in a clean build until that file is added.',
        state: 'absent',
      },
      {
        term: 'Client and backend agreement',
        detail:
          'The client treats an empty audio-feedback URL as a failed request; the function returns that field empty unconditionally, on a successful response too. A correct backend reply therefore throws in the client and the success state is unreachable.',
        state: 'verified',
      },
      {
        term: 'Transaction history',
        detail:
          'The client queries Firestore directly for `merchant_id` and `created_at`; the backend writes `merchantId` and `createdAt`. The client also never establishes a Firebase session, so the security rules would deny the read, and the compound query has no index configured. The history screen cannot return data as written.',
        state: 'verified',
      },
      {
        term: 'Tests',
        detail:
          'Two unit tests run without credentials — intent parsing and the fallback poller — both against mocks. Three further scripts are skipped without API keys, and one of those calls the provider directly rather than the deployed function. Nothing covers the ingest handler, the webhook, authentication or onboarding.',
        state: 'partial',
      },
      {
        term: 'Deployment',
        detail:
          'No compiled output, no installed dependencies, and the endpoints in the README are placeholders. A local Firestore emulator was run during development; nothing shows the functions were ever deployed.',
        state: 'absent',
      },
    ],
    sections: [
      {
        id: 'problem',
        heading: 'Problem and intended users',
        paragraphs: [
          'For a market trader or a small storefront, taking a transfer means interrupting what they are doing: unlock the phone, open the banking app, type an amount, find the customer, send a request, wait, then confirm out loud. Every step is a place to make a mistake, and the mistake that matters is asking the wrong person for the wrong amount.',
          'GhostPay is built for the moment after the money is agreed and before it arrives. The merchant speaks a sentence, and the machine handles the rest. The design constraint is that the merchant’s hands are busy and their attention is on a customer, so the interface has to be a notification they press and a sentence they say.',
          'The whole flow is native to Android, not the web: the entry point is a persistent notification and a Quick Settings tile, and the confirmation is a push that plays audio.',
        ],
      },
      {
        id: 'architecture',
        heading: 'Architecture and data flow',
        paragraphs: [
          'The backend and the client are separate repositories with separate lifetimes. Everything decision-shaped happens in the functions; the client captures audio, holds a token and displays state.',
        ],
        bullets: [
          'The merchant authenticates with a phone number and receives a signed token that the client stores and sends on each request.',
          'Onboarding verifies a payout account through the provider’s resolution endpoint and records it against the merchant.',
          'A capture is uploaded as multipart audio. The function hashes merchant, amount, phone and a thirty-second window into an idempotency key and returns the cached response if that key was seen recently, so a double press cannot create two charges.',
          'The audio is transcribed, and the transcript is parsed into a structured intent, with the phone number validated before use.',
          'The intent is written to Firestore as a pending transaction keyed by its reference, then a charge is created with the provider.',
          'The checkout link is sent to the customer as a WhatsApp template message, in a background continuation so the response is not held open.',
          'The webhook resolves the charge on the provider’s callback, verified by signature; a scheduled poll every two minutes catches the ones the callback misses.',
          'On confirmation, a Pidgin audio message is generated, stored, and pushed to the merchant’s device, where a native service plays it.',
        ],
      },
      {
        id: 'decisions',
        heading: 'Key implementation decisions',
        rows: [
          {
            term: 'Bias the transcription toward the register',
            detail:
              'Whisper is given a prompt naming Nigerian English and the abbreviations that carry the amount — `k` for thousand, `naira` as the currency, the real mobile prefixes. Transcription quality is a function of what the model expects to hear, and the expensive part of a voice payment is getting the number wrong.',
            state: 'verified',
          },
          {
            term: 'Validate the model, do not trust it',
            detail:
              'The phone number from the language model is checked against a Nigerian E.164 pattern before it is written to a transaction. A language model is a parser here, not an authority, and a mis-parsed number sends a payment link to a stranger.',
            state: 'verified',
          },
          {
            term: 'Make a repeated capture harmless',
            detail:
              'Idempotency is computed from the content of the command and a short time window rather than from a client-supplied key. The failure this prevents is a merchant pressing the button twice because the first press felt slow.',
            state: 'verified',
          },
          {
            term: 'Verify the webhook properly',
            detail:
              'The signature is checked against the raw body with a timing-safe comparison, and an unconfigured secret is a refusal rather than a bypass. This is the one path where being generous would mean accepting forged payment confirmations.',
            state: 'verified',
          },
          {
            term: 'Answer the merchant in their own voice',
            detail:
              'The confirmation is spoken rather than displayed, because a merchant mid-transaction is not looking at a screen. The Pidgin phrasing and a named voice were chosen for the same reason the transcription prompt was.',
            state: 'verified',
          },
          {
            term: 'Cover the callback with a poll',
            detail:
              'A webhook is a promise the network may not keep. A scheduled sweep re-queries unresolved charges and completes them, which makes the confirmation path tolerant of a dropped callback.',
            state: 'verified',
          },
        ],
      },
      {
        id: 'tradeoffs',
        heading: 'Engineering trade-offs',
        rows: [
          {
            term: 'Buying the two hard models',
            detail:
              'Transcription and intent extraction are both external calls, which adds two vendors, two keys and two latencies to a flow that has to feel immediate. The alternative was training or hosting both, and nothing about this project justified that.',
            state: 'verified',
          },
          {
            term: 'A live payment host with no sandbox switch',
            detail:
              'The provider’s production host is the only one in the code, and test versus live is decided by whichever key is deployed. That keeps one path rather than two, at the cost of a system where the difference between a rehearsal and taking real money is an environment variable nobody can see from the repository.',
            state: 'partial',
          },
          {
            term: 'Native-only entry point',
            detail:
              'Building the flow around a foreground service and a Quick Settings tile makes it genuinely fast to invoke and genuinely unavailable anywhere else. Voice capture has a browser fallback in its plugin, but the client labels every upload as MP4 regardless of platform, so a browser recording would be mislabelled to the transcriber.',
            state: 'partial',
          },
          {
            term: 'Confirming from the callback rather than the response',
            detail:
              'The WhatsApp send was moved off the request path so the merchant is not waiting on Meta. The cost is that the response can no longer report whether the message was sent, and the field that would carry it is a hardcoded false.',
            state: 'verified',
          },
          {
            term: 'Two repositories',
            detail:
              'Splitting backend from client gave the two halves clean boundaries. It also removed the compile-time check that would have caught the field-name and empty-string mismatches, which are exactly the class of error a shared type would have prevented.',
            state: 'verified',
          },
        ],
      },
      {
        id: 'outcomes',
        heading: 'Verified outcomes',
        paragraphs: [
          'The backend pipeline is written end to end and its pieces are individually real calls to real services. The integration between the client and the backend is not verified, and two defects in the source currently prevent the stated flow from completing. Nothing below should be read as a working end-to-end payment.',
        ],
        rows: [
          {
            term: 'Real integrations, not stubs',
            detail:
              'Transcription, intent extraction, charge creation, account resolution, the WhatsApp template message and the speech synthesis are all live HTTP calls to real providers. There is no mock branch, no fake response and no placeholder on the payment path.',
            state: 'verified',
          },
          {
            term: 'Tested',
            detail:
              'Intent parsing and the fallback poller have unit tests that run without credentials, against mocked providers. The ingest handler, webhook, authentication and onboarding have no test.',
            state: 'partial',
          },
          {
            term: 'Built for a device',
            detail:
              'A debug Android package was produced, and the native shell — foreground service, tile, overlay, messaging service — is real Kotlin wired through the manifest. No run on a device or emulator is evidenced anywhere, and the instructions in the repository explicitly defer micro­phone, overlay and push testing to physical hardware.',
            state: 'partial',
          },
          {
            term: 'Not verified',
            detail:
              'That a payment completes, that the message is delivered, that the push arrives, that the audio plays, and that any of it survives contact with a real merchant. These require credentials, an approved message template and a device, none of which are in evidence.',
            state: 'absent',
          },
        ],
      },
      {
        id: 'limits',
        heading: 'Limitations and next steps',
        bullets: [
          'The client cannot succeed on a successful response. It requires a non-empty audio-feedback URL and the backend always returns one empty. This is the first fix: it is a one-line contract mismatch that makes the happy path unreachable.',
          'The history screen cannot read its own data. Field names disagree between the two repositories, no Firebase session is established, and the compound query has no index. All three need correcting together before the screen can be judged.',
          'Money has no route to the merchant. Payout details are collected, verified and stored, then never used: there is no subaccount and no transfer. Until that exists the system demonstrates a checkout link, not a payment to a merchant.',
          'The Google Services configuration file is missing, so push cannot initialise in a fresh build and the confirmation path cannot be exercised. This is a prerequisite, not a nice-to-have.',
          'Whether a charge is live or test is invisible from the source and depends entirely on a deployed environment variable. That should be explicit in the deployment configuration rather than inferred from a key, and the distinction should be stated wherever this project is described.',
          'The device-dependent claims — overlay, tile, push, audio playback — should stay unshown until a run on real hardware is recorded. An emulator screenshot would not prove the audio path, and the repository’s own instructions say so.',
        ],
      },
    ],
    links: [],
    captures: [
      'The capture overlay on a physical device, mid-recording — no capture exists',
      'The confirmation notification and its audio path, shown only once a device run is recorded',
      'The history screen, which currently cannot return data',
      'An architecture diagram drawn only from the verified function call graph, once the flow itself is verified',
    ],
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
    evidence: [
      {
        term: 'Stack',
        detail:
          'Nuxt 3.17 with Vue 3.5 and Tailwind v4, with GSAP for the entrance animation and the browser-side EmailJS client for the contact form.',
        state: 'verified',
      },
      {
        term: 'Routes',
        detail:
          'Five file-based routes: a splash introduction, then about, skills, projects and contact. The introduction types a sentence and redirects to the about page after roughly six seconds.',
        state: 'verified',
      },
      {
        term: 'Content',
        detail:
          'Written for Donald Ebube, a data analyst: a prose bio, a tools list covering BigQuery, Looker Studio, Power BI and spreadsheets, four domains of expertise, three certificates linked to their real public pages, and six analysis projects whose cards link out to GitHub wikis and notebooks.',
        state: 'verified',
      },
      {
        term: 'Contact form',
        detail:
          'Client-side validation and a real EmailJS submission, with the service, template and public key read from environment configuration.',
        state: 'verified',
      },
      {
        term: 'Deployment',
        detail:
          'No host configuration of any kind exists in the repository — no platform config file, no custom domain, no CI workflow. Analytics and speed-insight packages in the layout imply a host, but an implication is not an address, so no live link is offered.',
        state: 'absent',
      },
      {
        term: 'Repository hygiene',
        detail:
          'A second headshot sits in the assets folder referenced by nothing in the code, and the skills and projects sidebar icons are named for each other’s routes. Cosmetic, but it is the kind of thing that makes the next edit slower.',
        state: 'verified',
      },
    ],
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
    links: [],
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
    evidence: [
      {
        term: 'Stack',
        detail:
          'Vue 3.5 on Vite 6, Vuex 4 for state and Axios for transport, styled with Tailwind v4.',
        state: 'verified',
      },
      {
        term: 'API integration',
        detail:
          'One unmocked request to an endpoint read from an environment variable, expecting a wrapped list of funds. There is no interceptor, no mock adapter and no bundled fixture data, so the application has nothing to show without a reachable endpoint.',
        state: 'verified',
      },
      {
        term: 'Endpoint',
        detail:
          'The variable is not set anywhere in the repository — there is no environment file, not even an example — so the address the demo talks to cannot be stated. Availability is therefore unknown and no public link is offered.',
        state: 'absent',
      },
      {
        term: 'Risk filtering',
        detail:
          'A real Vuex getter filters the catalogue on a selected risk level, with a mutation and an action feeding it. Three options are exposed.',
        state: 'verified',
      },
      {
        term: 'Risk labels',
        detail:
          'The dropdown offers Low, Medium and High while the card formatter renders the same three values as Conservative, Moderate and Aggressive. Both are real; they disagree.',
        state: 'partial',
      },
      {
        term: 'Pagination',
        detail:
          'Client-side only. Twenty funds are shown at a time behind a load-more control, with a second control to collapse back, and the count resets when the filter changes.',
        state: 'verified',
      },
      {
        term: 'Detail view',
        detail:
          'A routed detail page that re-derives its fund from the already-loaded store rather than fetching by identifier, so it depends on the list having been visited first. Minimum investment is a fixed figure written into the template rather than read from the record.',
        state: 'partial',
      },
      {
        term: 'Attribution',
        detail:
          'This is an independent demonstration against a public API, not official functionality. It carries the provider’s identity in several places — the package name, the page title, a page heading, a bundled logo and a default manager string — and one decorative logo is loaded directly from the provider’s own storage bucket rather than from the repository.',
        state: 'verified',
      },
    ],
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
              'That the endpoint resolves, what the API returns, whether the demo renders at all today, and whether any of it was ever deployed. No environment configuration and no host configuration exist in the repository.',
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
    links: [],
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
