<script setup lang="ts">
/**
 * GhostPay's architecture, drawn as markup rather than as an exported image.
 *
 * Two reasons it is not an SVG or a PNG. It has to be readable at 390px, and a
 * picture of a diagram is either unreadably small there or horizontally
 * scrolled; and its labels have to be real text, so that the names of the
 * functions and the services are selectable, searchable and available to a
 * screen reader without an alt attribute standing in for forty lines of prose.
 *
 * The thing this diagram exists to do is draw the authorship line. GhostPay is
 * a collaborative build and the case study is written by one of its
 * contributors, so a diagram that showed the whole system as one undivided box
 * would be the single most misleading thing on the page. Every node carries
 * both a border style and a word saying who it belongs to — the mark makes the
 * division scannable, the word carries it, which is how every other claim on
 * this site presents itself.
 *
 * The three marks, and what each one actually asserts:
 *
 *   solid   — written by this portfolio's author. Verified: the client
 *             repository's twelve commits are all his.
 *   dashed  — present in the source and read to write this page. Who wrote it
 *             is not established by anything on disk, and the diagram says so
 *             rather than guessing in either direction.
 *   dotted  — a third-party service reached over the network. Nobody on this
 *             project wrote any part of it.
 *
 * Everything named below was read from the two repositories. Nothing is placed
 * here because it would be expected of a system like this.
 */

/** The client. The one node attributable to a person, and it is this one. */
const clientLayers = [
  {
    term: 'Nuxt 4 + Vue 3 application',
    detail:
      'Five pages — index, login, onboarding, history, overlay — with two components, three composables and an auth route middleware.',
  },
  {
    term: 'Capacitor 8 bridge',
    detail:
      'Android, browser, clipboard, preferences and a voice-recorder plugin, which is what makes audio capture native rather than browser-based.',
  },
  {
    term: 'Kotlin, five classes',
    detail:
      'A foreground service with a persistent notification, a Quick Settings tile, a messaging service that plays the confirmation audio, a transparent overlay activity, and the bridge activity.',
  },
]

/** The boundary between the two halves: every call the client makes out. */
const endpoints = [
  { key: 'voiceIngestUrl', target: 'voiceIngest', detail: 'the recorded audio, as multipart' },
  { key: 'merchantAuthUrl', target: 'merchantAuth', detail: 'a phone number, returning a token' },
  { key: 'verifyAccountUrl', target: 'verifyAccount', detail: 'payout account resolution' },
  { key: 'createMerchantUrl', target: 'createMerchant', detail: 'onboarding' },
]

/** The backend. Functions, then the data they write. */
const backendFunctions = [
  { name: 'voiceIngest', kind: 'HTTP · min instance 1' },
  { name: 'merchantAuth', kind: 'HTTP' },
  { name: 'verifyAccount', kind: 'HTTP' },
  { name: 'createMerchant', kind: 'HTTP' },
  { name: 'merchantFcm', kind: 'HTTP' },
  { name: 'koraWebhook', kind: 'HTTP · signature-verified' },
  { name: 'queryCharge', kind: 'schedule · every 2 minutes' },
]

const collections = [
  'transactions, keyed by the payment reference',
  'merchants, keyed by the normalised phone number',
  'an idempotency cache, written from the function bodies',
]

/** Everything the code reaches for over the network. None of it is this project's. */
const services = [
  {
    name: 'OpenAI',
    role: 'Transcription',
    detail: 'whisper-1, with a prompt naming Nigerian English and the local mobile prefixes.',
  },
  {
    name: 'Google Gemini',
    role: 'Intent extraction',
    detail: 'gemini-2.0-flash returns the amount, description and phone number as JSON.',
  },
  {
    name: 'Korapay',
    role: 'Payments',
    detail: 'Charge initialisation, charge status and bank-account resolution.',
  },
  {
    name: 'WhatsApp Cloud API',
    role: 'Customer notification',
    detail: 'A template message carrying the description and the checkout link.',
  },
  {
    name: 'YarnGPT',
    role: 'Speech',
    detail: 'Text-to-speech in Pidgin, for the confirmation the merchant hears.',
  },
  {
    name: 'Firebase Cloud Messaging',
    role: 'Push delivery',
    detail: 'A data payload that the native service plays on receipt.',
  },
]

/**
 * The last block, and the reason the diagram is not a boast: what the source
 * says is missing or could not be checked. These are not drawn as connected to
 * anything, because as written they are not.
 */
const unverified = [
  {
    term: 'No Google Services configuration',
    detail:
      'The file is absent from the repository, so the build applies the plugin conditionally and Firebase never initialises. In a clean build the whole confirmation path is dead.',
  },
  {
    term: 'No route for the money',
    detail:
      'Payout details are collected, resolved and stored, then read nowhere: the charge body carries no subaccount and no transfer call exists. Funds would land in the platform account.',
  },
  {
    term: 'No deployment',
    detail:
      'No compiled output in the backend copy and placeholder endpoints in its README. A local emulator was used during development; nothing shows the functions were ever deployed.',
  },
  {
    term: 'No visible live-or-test switch',
    detail:
      'The payment provider’s production host is the only one in the code. Whether a charge moves real money depends on an environment variable that is in neither repository.',
  },
  {
    term: 'No run on a device',
    detail:
      'No emulator or hardware run is evidenced anywhere, and the repository’s own instructions defer microphone, overlay and push testing to physical hardware.',
  },
]

const legend = [
  {
    mark: 'own',
    label: 'This author’s work',
    detail:
      'The client repository is twelve commits and all twelve are Michael Ebube’s, so the client is attributable to him.',
  },
  {
    mark: 'shared',
    label: 'Authorship not established',
    detail:
      'Present in the source and read for this page. The backend copy carries no git history at all, so nothing on disk says who wrote it.',
  },
  {
    mark: 'external',
    label: 'Third party',
    detail:
      'Called over the network. Whether each account exists or is configured is not visible from either repository.',
  },
]
</script>

<template>
  <div class="arch">
    <!-- Ownership legend. Read before the diagram, because it is what the
         diagram is for. -->
    <ul class="arch__legend">
      <li v-for="item in legend" :key="item.mark" class="arch__legend-item">
        <span class="arch__swatch" :class="`arch__swatch--${item.mark}`" aria-hidden="true" />
        <span class="arch__legend-body">
          <span class="block text-ink">{{ item.label }}</span>
          <span class="mt-1 block text-[0.9375rem] leading-[1.6] text-ink-muted">{{ item.detail }}</span>
        </span>
      </li>
    </ul>

    <ol class="arch__flow">
      <!-- ================================================================
           The client. Solid border, and the only node that names a person.
           ================================================================ -->
      <li class="arch__node arch__node--own">
        <div class="arch__head">
          <h3 class="arch__title">Android client</h3>
          <span class="arch__owner">Michael Ebube · verified in git</span>
        </div>

        <dl class="arch__rows">
          <div v-for="layer in clientLayers" :key="layer.term">
            <dt class="arch__term">{{ layer.term }}</dt>
            <dd class="arch__detail">{{ layer.detail }}</dd>
          </div>
        </dl>
      </li>

      <li class="arch__connector" aria-hidden="true">↓</li>

      <!-- ================================================================
           The boundary. Everything that crosses between the two halves is
           these four calls — which is also the honest measure of how much of
           the system the client owns.
           ================================================================ -->
      <li class="arch__node arch__node--own">
        <div class="arch__head">
          <h3 class="arch__title">The boundary — four outbound calls</h3>
          <span class="arch__owner">Michael Ebube</span>
        </div>

        <p class="arch__lede">
          This is the whole of the client’s contact with the backend, read from the three call
          sites and the one shared helper. Each address arrives as an environment variable with an
          empty default, so a fresh clone has none and the client throws a named error instead of
          sending anything.
        </p>

        <ul class="arch__edges">
          <li v-for="edge in endpoints" :key="edge.key" class="arch__edge">
            <code class="arch__code">{{ edge.key }}</code>
            <span class="arch__arrow" aria-hidden="true">→</span>
            <span class="text-ink">{{ edge.target }}</span>
            <span class="arch__edge-note">{{ edge.detail }}</span>
          </li>
        </ul>
      </li>

      <li class="arch__connector" aria-hidden="true">↓</li>

      <!-- ================================================================
           The backend. Dashed, with the reason stated on the node itself.
           ================================================================ -->
      <li class="arch__node arch__node--shared">
        <div class="arch__head">
          <h3 class="arch__title">Firebase Cloud Functions v2 · Node 20</h3>
          <span class="arch__owner">Authorship not evidenced</span>
        </div>

        <ul class="arch__functions">
          <li v-for="fn in backendFunctions" :key="fn.name" class="arch__function">
            <span class="text-ink">{{ fn.name }}</span>
            <span class="arch__kind">{{ fn.kind }}</span>
          </li>
        </ul>

        <p class="arch__term arch__term--spaced">Firestore</p>
        <ul class="arch__bullets">
          <li v-for="collection in collections" :key="collection">{{ collection }}</li>
        </ul>
      </li>

      <li class="arch__connector" aria-hidden="true">↓</li>

      <!-- ================================================================
           Everything the backend calls out to. Dotted, because none of it is
           anyone's work on this project.
           ================================================================ -->
      <li class="arch__node arch__node--external">
        <div class="arch__head">
          <h3 class="arch__title">External services</h3>
          <span class="arch__owner">Third party</span>
        </div>

        <ul class="arch__services">
          <li v-for="service in services" :key="service.name" class="arch__service">
            <span class="block text-ink">{{ service.name }}</span>
            <span class="arch__kind">{{ service.role }}</span>
            <span class="arch__detail">{{ service.detail }}</span>
          </li>
        </ul>
      </li>
    </ol>

    <!-- ==================================================================
         Not connected to anything, because as written it is not connected.
         ================================================================== -->
    <div class="arch__absent">
      <h3 class="arch__title">In the source as missing, or impossible to check</h3>
      <p class="arch__lede">
        These are not nodes on the diagram above, because nothing in either repository joins them
        up. Each one is a place where the flow described in this case study stops.
      </p>

      <dl class="arch__rows arch__rows--spaced">
        <div v-for="item in unverified" :key="item.term">
          <dt class="arch__term">{{ item.term }}</dt>
          <dd class="arch__detail">{{ item.detail }}</dd>
        </div>
      </dl>
    </div>
  </div>
</template>

<style scoped>
/* Border style is the whole encoding, so it is set once here and never
   overridden by a utility class further down the tree. */
.arch {
  --arch-own: var(--color-ink-faint);
  --arch-shared: var(--color-line);
}

.arch__legend {
  display: grid;
  gap: 1rem;
  border-bottom: 1px solid var(--color-line);
  padding-bottom: 1.5rem;
}

@media (min-width: 640px) {
  .arch__legend {
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 1.5rem;
  }
}

.arch__legend-item {
  display: flex;
  gap: 0.75rem;
}

.arch__swatch {
  margin-top: 0.4rem;
  height: 0.75rem;
  width: 0.75rem;
  flex-shrink: 0;
}

.arch__swatch--own {
  border: 2px solid var(--arch-own);
}

.arch__swatch--shared {
  border: 2px dashed var(--arch-shared);
}

.arch__swatch--external {
  border: 2px dotted var(--arch-shared);
}

.arch__flow {
  margin-top: 2rem;
}

.arch__node {
  border: 1px solid var(--color-line);
  padding: 1.25rem;
}

@media (min-width: 768px) {
  .arch__node {
    padding: 1.5rem;
  }
}

.arch__node--own {
  border: 2px solid var(--arch-own);
}

.arch__node--shared {
  border: 1px dashed var(--arch-shared);
}

.arch__node--external {
  border: 1px dotted var(--arch-shared);
}

.arch__head {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  justify-content: space-between;
  gap: 0.5rem 1rem;
}

.arch__title {
  font-size: 1rem;
  line-height: 1.4;
  color: var(--color-ink);
}

.arch__owner,
.arch__kind {
  font-family: var(--font-mono);
  font-size: 0.6875rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--color-ink-faint);
}

.arch__lede {
  margin-top: 0.75rem;
  font-size: 0.9375rem;
  line-height: 1.6;
  color: var(--color-ink-muted);
}

.arch__rows {
  margin-top: 1rem;
}

.arch__rows--spaced {
  margin-top: 1.25rem;
}

.arch__rows > div + div {
  margin-top: 1rem;
}

.arch__term {
  font-family: var(--font-mono);
  font-size: 0.75rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--color-ink-faint);
}

.arch__term--spaced {
  margin-top: 1.5rem;
}

.arch__detail {
  margin-top: 0.375rem;
  font-size: 0.9375rem;
  line-height: 1.7;
  color: var(--color-ink-muted);
}

.arch__edges,
.arch__bullets,
.arch__functions,
.arch__services {
  margin-top: 1rem;
}

.arch__edge {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 0.25rem 0.6rem;
  padding: 0.5rem 0;
  border-top: 1px solid var(--color-line);
  font-size: 0.9375rem;
}

.arch__code {
  font-family: var(--font-mono);
  font-size: 0.8125rem;
  color: var(--color-ink-muted);
}

.arch__arrow {
  color: var(--color-ink-faint);
}

.arch__edge-note {
  color: var(--color-ink-muted);
}

.arch__function {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  justify-content: space-between;
  gap: 0.25rem 1rem;
  padding: 0.5rem 0;
  border-top: 1px solid var(--color-line);
}

.arch__bullets > li {
  position: relative;
  padding-left: 1rem;
  font-size: 0.9375rem;
  line-height: 1.7;
  color: var(--color-ink-muted);
}

.arch__bullets > li::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0.75em;
  height: 1px;
  width: 0.5rem;
  background: var(--color-ink-faint);
}

.arch__services {
  display: grid;
  gap: 1rem;
}

@media (min-width: 640px) {
  .arch__services {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 1.25rem 1.5rem;
  }
}

.arch__service .arch__detail {
  margin-top: 0.25rem;
}

.arch__connector {
  padding: 0.5rem 0;
  text-align: center;
  color: var(--color-ink-faint);
}

.arch__absent {
  margin-top: 2rem;
  border-top: 1px solid var(--color-line);
  padding-top: 1.5rem;
}
</style>
