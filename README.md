# Tandem curated dating community

Tandem is a lightweight landing page and founding-list flow for a curated NYC dating community built around complementary ambition.

Tandem is not positioned as a full dating app. The current concept is IRL-first: small curated experiences, thoughtfully assembled groups, real conversations, and optional archetype-based reflection.

## Current form

The public founding-list form is powered by Tally:

```js
const TALLY_FORM_ID = "0QyVD6";
```

Public link:

```text
https://tally.so/r/0QyVD6
```

Embedded link:

```text
https://tally.so/embed/0QyVD6?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1
```

The site no longer exposes browser-local submissions, CSV downloads, or JSON downloads to public visitors.

## Test locally

Open `tandem/index.html` in a browser, or run a static server from this folder:

```powershell
python -m http.server 4173 -b 127.0.0.1
```

Then open:

```text
http://127.0.0.1:4173/tandem/
```

## Analytics hooks

The page records lightweight validation events to `window.dataLayer`. Add Google Tag Manager, GA, Plausible, or another provider later and map these event names:

- `landing_view`
- `founding_form_loaded`
- `cta_header_join`
- `cta_hero_join`
- `cta_hero_archetype`
- `cta_form_open`
- `cta_form_archetypes`
- `cta_footer_join`
- `cta_partner`

## Brand direction

Primary tagline:

```text
Tandem
Dating for complementary ambition.
```

Supporting idea:

```text
Who you build with changes what you can build.
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
- Founding-list form opens
- Founding-list completions inside Tally
- Qualified NYC singles
- Curated experience interest
- Availability patterns
- Referral interest
- Partner/community inquiries
- Qualitative feedback
