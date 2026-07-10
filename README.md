# Tandem validation MVP

Tandem is a lightweight public landing page, Ambition Archetype quiz, and waitlist flow for early NYC validation.

## Update the Tally form link

Open `tandem/script.js` and replace the empty `TALLY_FORM_URL` value:

```js
const TALLY_FORM_URL = "https://tally.so/embed/your-form-id";
```

When a Tally URL is present, the page shows the embedded Tally form and hides the temporary local form.

## Test locally

Open `tandem/index.html` in a browser, or run a static server from this folder if you prefer a local URL.

## Temporary form notes

The fallback form stores submissions in the visitor's browser using `localStorage` and exposes CSV/JSON downloads after signup. This is useful for local validation testing, but should be replaced with Tally before public traffic if live response collection is needed.

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

- `assets/tandem-connected-intent-logo.png`
- `assets/tandem-connected-intent-mark.png`
- `assets/references/option-3-connected-intent-logo-with-tagline.png`
- `assets/references/option-3-connected-intent-tile.png`
- `assets/references/option-3-connected-intent-mark-reference.png`
- `assets/references/option-3-connected-intent-mark-transparent.png`
- `assets/tandem-connected-intent-logo.svg`
- `assets/tandem-connected-intent-mark.svg`

Use option 3 from the first logo proposal as the reference direction. The PNG reference crops are the visual source of truth for the intended mark: an elegant ampersand-like connection, with a dark loop and a muted rose stroke. The `logo-with-tagline` PNG is the current brand lockup reference with the selected tagline pairing, and the transparent mark PNG should be used when placing the mark on matching backgrounds. The SVG files are working drafts and should be refined against the PNG reference before final brand use.

## Validation metrics to watch

- Landing page visits
- CTA clicks
- Quiz completion rate
- Waitlist signups
- Qualified NYC signups
- Mixer interest
- Referral interest
- Qualitative feedback
