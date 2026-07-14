# Tandem validation MVP

Tandem is a lightweight public landing page, Ambition Archetype quiz, and waitlist flow for early NYC validation with ambitious singles ages 21-30.

## Update the Tally form link

Open `tandem/script.js` and replace the empty `TALLY_FORM_URL` value:

```js
const TALLY_FORM_URL = "https://tally.so/embed/0QyVD6?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1";
```

When a Tally URL is present, the page shows the embedded Tally form and hides the temporary local form. The current public form is `https://tally.so/r/0QyVD6`.

Keep the Tally link connected before sending public traffic. The built-in form is only a local validation fallback.

## Test locally

Open `tandem/index.html` in a browser, or run a static server from this folder if you prefer a local URL.

## Temporary form notes

The fallback form stores submissions in the visitor's browser using `localStorage` and exposes CSV/JSON downloads after signup. This is useful for local validation testing, but should be replaced with Tally before public traffic if live response collection is needed.

## Analytics hooks

The page records lightweight validation events to `window.dataLayer` and mirrors the last 100 events in `localStorage` under `tandem_validation_events`. Add Google Tag Manager, GA, Plausible, or another provider later and map these event names:

- `landing_view`
- `cta_header_quiz`
- `cta_hero_quiz`
- `cta_hero_how_it_works`
- `cta_footer_quiz`
- `waitlist_started`
- `mixer_interest_selected`
- `waitlist_completed`
- `submissions_exported`

## Brand direction

Primary tagline:

```text
Tandem
Dating for complementary ambition.
```

Supporting line:

```text
Meet someone building in your direction.
```

## Logo assets

The Connected Intent logo direction is saved for future reference:

- `assets/brand/tandem-logo-option3.png`
- `assets/brand/tandem-mark-option3.png`
- `assets/brand/tandem-favicon-option3.png`
- `assets/references/option-3-connected-intent-tile.png`

Use option 3 from the first logo proposal as the reference direction. The files in `assets/brand/` are the active site assets, all derived from the correct Connected Intent proposal. The remaining reference tile is kept only as the original visual source.

## Validation metrics to watch

- Landing page visits
- CTA clicks
- Quiz completion rate
- Waitlist signups
- Qualified NYC signups
- Mixer interest
- Referral interest
- Qualitative feedback
