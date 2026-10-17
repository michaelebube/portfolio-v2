<script setup lang="ts">
/**
 * GhostPay's homepage thumbnail: the idea of the product as one short script.
 *
 * A merchant says a sentence. The system takes the amount and the person out of
 * it, opens a payment request, sends the link to the customer on WhatsApp, and
 * speaks the result back. That is the whole proposition, and it is what the
 * case study calls "payment collection from a spoken sentence".
 *
 * Four steps, one ledger. Every step shares the same left rail and the same
 * label/content rhythm, and a hairline separates them the way the site's other
 * data rows are separated. There are no connector lines or architecture boxes:
 * the sentence shows what is extracted, the bubble shows what is delivered, and
 * the speaker shows what is heard. Steps 02 and 04 are rendered as their
 * outputs — the two fields, and the sentence the merchant hears — not as
 * captions about them.
 *
 * It renders inside `.frame` — the same class the other project cards use — so
 * height, radius, border, field and shadow are inherited, and the artwork sits
 * on the same 0.5rem inset the other projects' captures get.
 *
 * The wording is illustrative, not a capture. The caption says so, and nothing
 * here claims the flow completes end to end.
 */

/** Bar heights for the voice waveform, relative units. */
const waveform = [
  0.42, 0.7, 1, 0.58, 0.86, 0.36, 0.74, 0.96, 0.5, 0.82, 0.62, 0.34,
];
</script>

<template>
  <figure class="frame ghostpay-visual">
    <figcaption class="sr-only">
      GhostPay’s designed flow, shown as one sentence becoming one message: a
      merchant speaks a request such as “Generate and send ₦5,000 payment link
      for ‘goods’ to Tunde”, the system transcribes it and extracts the amount,
      description and recipient, a payment link reaches the customer over
      WhatsApp, and the merchant hears a spoken reply. The wording is
      illustrative and the diagram does not claim a verified end-to-end run.
    </figcaption>

    <div class="ghostpay-visual__glow" aria-hidden="true" />

    <div class="ghostpay-visual__stage" aria-hidden="true">
      <div class="ghostpay-visual__step">
        <span class="ghostpay-visual__rail">
          <span class="ghostpay-visual__num">01</span>
          <span class="ghostpay-visual__arrow" />
        </span>
        <div class="ghostpay-visual__body">
          <p class="ghostpay-visual__label">Spoken request</p>

          <div class="ghostpay-visual__request">
            <p class="ghostpay-visual__sentence">
              <span class="ghostpay-visual__quote">“</span>Generate
              <span class="ghostpay-visual__token">₦5,000</span> payment link
              for <span class="ghostpay-visual__token">Clothes</span> to
              <span class="ghostpay-visual__token">Tunde</span>.<span
                class="ghostpay-visual__quote"
                >”</span
              >
            </p>

            <div class="ghostpay-visual__wave-row">
              <svg
                class="ghostpay-visual__mic"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.4"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <rect x="9.25" y="3.25" width="5.5" height="10.5" rx="2.75" />
                <path d="M6.25 11a5.75 5.75 0 0 0 11.5 0" />
                <path d="M12 16.75V20" />
                <path d="M9.5 20h5" />
              </svg>

              <span class="ghostpay-visual__wave">
                <span
                  v-for="(height, i) in waveform"
                  :key="i"
                  :style="{ '--h': height, '--i': i }"
                />
              </span>
            </div>
          </div>
        </div>
      </div>

      <div class="ghostpay-visual__step">
        <span class="ghostpay-visual__rail">
          <span class="ghostpay-visual__num">02</span>
          <span class="ghostpay-visual__arrow" />
        </span>
        <div class="ghostpay-visual__body">
          <p class="ghostpay-visual__label">Extracted</p>
          <p class="ghostpay-visual__fields">
            <span>₦5,000</span>
            <span>Clothes</span>
            <span>Tunde</span>
          </p>
        </div>
      </div>

      <div class="ghostpay-visual__step">
        <span class="ghostpay-visual__rail">
          <span class="ghostpay-visual__num">03</span>
          <span class="ghostpay-visual__arrow" />
        </span>
        <div class="ghostpay-visual__body">
          <p class="ghostpay-visual__label">WhatsApp link</p>

          <div class="ghostpay-visual__bubble">
            <span class="ghostpay-visual__from">GhostPay</span>
            <span class="ghostpay-visual__amount">₦5,000</span>
            <span class="ghostpay-visual__link">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.6"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path
                  d="M10.5 13.5a4 4 0 0 0 5.7 0l2.3-2.3a4 4 0 0 0-5.7-5.7l-1.3 1.3"
                />
                <path
                  d="M13.5 10.5a4 4 0 0 0-5.7 0l-2.3 2.3a4 4 0 0 0 5.7 5.7l1.3-1.3"
                />
              </svg>
              Pay link
            </span>
          </div>
        </div>
      </div>

      <div class="ghostpay-visual__step">
        <span class="ghostpay-visual__rail">
          <span class="ghostpay-visual__num">04</span>
        </span>
        <div class="ghostpay-visual__body">
          <p class="ghostpay-visual__label">Spoken reply</p>
          <p class="ghostpay-visual__reply-line">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.4"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M4.25 9.25h3.5L12 5.75v12.5L7.75 14.75h-3.5z" />
              <path d="M15 9.25a4.25 4.25 0 0 1 0 5.5" />
              <path d="M17.5 6.75a8 8 0 0 1 0 10.5" />
            </svg>
            <span
              ><span class="ghostpay-visual__quote">“</span>Payment request
              sent.<span class="ghostpay-visual__quote">”</span></span
            >
          </p>
        </div>
      </div>
    </div>
  </figure>
</template>

<style scoped>
/* This card opts out of the framed placeholder's grid field: plain canvas
   behind the ledger, nothing drawn on it. The case-study diagram is unchanged. */
.ghostpay-visual {
  background-color: var(--color-canvas);
}

/* One light source behind the ledger, ink only. */
.ghostpay-visual__glow {
  position: absolute;
  inset: 0;
  pointer-events: none;
  background:
    radial-gradient(
      56% 68% at 40% 40%,
      rgb(245 245 245 / 0.055),
      transparent 72%
    ),
    radial-gradient(
      28% 38% at 74% 64%,
      rgb(245 245 245 / 0.03),
      transparent 76%
    );
}

/* The stage fills the frame and centres the four rows as one block. */
.ghostpay-visual__stage {
  position: relative;
  align-self: stretch;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  padding: clamp(0.8rem, 3.5vw, 2rem);
}

/* Every row shares the rail and the label/content rhythm. Spacing lives inside
   the body, not on the row, so the rail keeps its full height and the dotted
   arrow can run from one number to the next. */
.ghostpay-visual__step {
  display: grid;
  grid-template-columns: 2rem minmax(0, 1fr);
  column-gap: 0.8rem;
  min-width: 0;
}

.ghostpay-visual__step + .ghostpay-visual__step .ghostpay-visual__body,
.ghostpay-visual__step + .ghostpay-visual__step .ghostpay-visual__rail {
  padding-top: clamp(0.5rem, 2vw, 1rem);
}

.ghostpay-visual__rail {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.3rem;
}

/* The one connector left: a dotted hairline in the number column, arrowed down
   into the next step. It stretches to whatever height the row has. */
.ghostpay-visual__arrow {
  position: relative;
  flex: 1 1 auto;
  width: 0;
  min-height: 0.7rem;
  border-left: 1px dotted var(--color-ink-faint);
}

.ghostpay-visual__arrow::after {
  position: absolute;
  bottom: 1px;
  left: 0;
  width: 0.28rem;
  height: 0.28rem;
  border-right: 1px solid var(--color-ink-faint);
  border-bottom: 1px solid var(--color-ink-faint);
  content: "";
  transform: translateX(-50%) rotate(45deg);
}

.ghostpay-visual__num {
  font-family: var(--font-mono);
  font-size: 0.625rem;
  line-height: 1.3;
  letter-spacing: var(--tracking-label);
  color: var(--color-ink-faint);
}

.ghostpay-visual__body {
  min-width: 0;
}

.ghostpay-visual__label {
  font-family: var(--font-mono);
  font-size: 0.625rem;
  line-height: 1.3;
  letter-spacing: var(--tracking-label);
  text-transform: uppercase;
  color: var(--color-ink-muted);
}

/* Sentence and waveform share one line: the voice is one object, and on the
   narrowest card the pair still fits without a second row. */
.ghostpay-visual__request {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.35rem 0.9rem;
  margin-top: 0.35rem;
}

.ghostpay-visual__sentence {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: clamp(0.9375rem, 3.6vw, 1.625rem);
  line-height: 1.2;
  letter-spacing: var(--tracking-display);
  word-spacing: var(--word-spacing-display);
  color: var(--color-ink);
}

.ghostpay-visual__quote {
  color: var(--color-ink-faint);
}

/* The extracted fields inside the sentence. A dashed rule, not a box: the
   sentence stays a sentence. */
.ghostpay-visual__token {
  padding-bottom: 0.1em;
  border-bottom: 1px dashed var(--color-ink-faint);
}

.ghostpay-visual__wave-row {
  display: flex;
  align-items: center;
  gap: 0.6rem;
}

.ghostpay-visual__mic {
  width: 0.9rem;
  height: 0.9rem;
  flex: none;
  color: var(--color-ink-faint);
}

.ghostpay-visual__wave {
  display: flex;
  align-items: center;
  gap: 2px;
  height: 1.25rem;
}

.ghostpay-visual__wave > span {
  width: 2px;
  height: calc(var(--h) * 1.25rem);
  border-radius: 1px;
  background: var(--color-ink-faint);
  transform-origin: center;
  animation: ghostpay-voice 1.9s ease-in-out infinite;
  animation-delay: calc(var(--i) * -0.13s);
}

/* Step 02 as its output: the two values, not a caption about them. */
.ghostpay-visual__fields {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  margin-top: 0.4rem;
}

.ghostpay-visual__fields > span {
  padding: 0.22rem 0.55rem;
  border: 1px solid var(--color-line);
  border-radius: 999px;
  font-family: var(--font-mono);
  font-size: 0.625rem;
  line-height: 1.2;
  letter-spacing: 0.02em;
  color: var(--color-ink-muted);
}

/* The delivered message. Canvas rather than surface, so the bubble reads as
   an object in front of the card instead of a second card. */
.ghostpay-visual__bubble {
  position: relative;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.3rem 0.7rem;
  width: fit-content;
  max-width: 100%;
  margin-top: 0.45rem;
  padding: 0.5rem 0.8rem 0.55rem;
  border: 1px solid var(--color-line);
  border-radius: 0.75rem;
  background: var(--color-canvas);
}

.ghostpay-visual__bubble::after {
  position: absolute;
  bottom: -0.3rem;
  left: 0.9rem;
  width: 0.55rem;
  height: 0.55rem;
  border-right: 1px solid var(--color-line);
  border-bottom: 1px solid var(--color-line);
  background: var(--color-canvas);
  content: "";
  transform: rotate(45deg);
}

.ghostpay-visual__from {
  font-family: var(--font-mono);
  font-size: 0.625rem;
  letter-spacing: var(--tracking-label);
  text-transform: uppercase;
  color: var(--color-ink-faint);
}

.ghostpay-visual__amount {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: clamp(0.9375rem, 2.6vw, 1.25rem);
  line-height: 1.2;
  letter-spacing: var(--tracking-display);
}

.ghostpay-visual__link {
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  padding: 0.22rem 0.55rem 0.22rem 0.45rem;
  border: 1px solid var(--color-line);
  border-radius: 999px;
  font-family: var(--font-mono);
  font-size: 0.625rem;
  line-height: 1;
  letter-spacing: var(--tracking-label);
  text-transform: uppercase;
  color: var(--color-ink-muted);
}

.ghostpay-visual__link svg {
  width: 0.7rem;
  height: 0.7rem;
}

/* Step 04 as its output too: the sentence the merchant hears. */
.ghostpay-visual__reply-line {
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
  margin-top: 0.35rem;
  font-size: 0.75rem;
  line-height: 1.5;
  color: var(--color-ink-muted);
}

.ghostpay-visual__reply-line svg {
  width: 0.9rem;
  height: 0.9rem;
  flex: none;
  margin-top: 0.1rem;
  color: var(--color-ink-faint);
}

.ghostpay-visual__reply-line svg > *:nth-child(n + 2) {
  animation: ghostpay-sound 2.4s ease-in-out infinite;
}

@keyframes ghostpay-voice {
  0%,
  100% {
    transform: scaleY(0.35);
  }
  50% {
    transform: scaleY(1);
  }
}

@keyframes ghostpay-sound {
  0%,
  100% {
    opacity: 0.45;
  }
  50% {
    opacity: 1;
  }
}

/* Narrowest cards are about 200px tall: tighten the ledger's rhythm so the
   four rows fit without clipping. */
@media (max-width: 480px) {
  .ghostpay-visual__stage {
    padding: 0.6rem;
  }

  .ghostpay-visual__step {
    grid-template-columns: 1.5rem minmax(0, 1fr);
    column-gap: 0.55rem;
  }

  .ghostpay-visual__step + .ghostpay-visual__step .ghostpay-visual__body,
  .ghostpay-visual__step + .ghostpay-visual__step .ghostpay-visual__rail {
    padding-top: 0.3rem;
  }

  .ghostpay-visual__label {
    line-height: 1.2;
  }

  .ghostpay-visual__request {
    margin-top: 0.2rem;
    gap: 0.25rem 0.6rem;
  }

  .ghostpay-visual__sentence {
    font-size: 0.75rem;
    line-height: 1.25;
  }

  .ghostpay-visual__wave {
    height: 1rem;
  }

  .ghostpay-visual__wave > span {
    height: calc(var(--h) * 1rem);
  }

  .ghostpay-visual__fields {
    margin-top: 0.3rem;
  }

  .ghostpay-visual__fields > span {
    padding: 0.16rem 0.45rem;
  }

  .ghostpay-visual__bubble {
    margin-top: 0.3rem;
    padding: 0.35rem 0.6rem 0.4rem;
  }

  .ghostpay-visual__reply-line {
    margin-top: 0.25rem;
    font-size: 0.6875rem;
  }
}

@media (max-width: 380px) {
  .ghostpay-visual__stage {
    padding: 0.5rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  .ghostpay-visual__wave > span,
  .ghostpay-visual__reply-line svg > *:nth-child(n + 2) {
    animation: none;
  }
}
</style>
