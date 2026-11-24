# Tandem curated dating community

Tandem is a lightweight landing page, anonymous archetype quiz, and founding-list flow for a curated NYC dating community built around complementary ambition.

Tandem is not positioned as a full dating app. The current concept is IRL-first: small curated experiences, thoughtfully assembled groups, real conversations, and optional archetype-based reflection.

The quiz behaves like a lightweight personality test: no signup, name, email, gender, location, or dating preferences are required to get a result. After the result reveal, visitors can optionally enter an email to save/send their result. The founding-list form is separate and private, not anonymous, because Tandem needs contact information to review fit and send curated invitations.

## Current native flows

- Homepage: concise story, concept, archetype preview, quiz-first how-it-works flow, and three clear next-step cards.
- Ambition Archetype Quiz: `tandem/quiz.html`, anonymous, self-oriented, one question at a time, with primary and secondary archetype results plus optional result email capture after the reveal.
- Founding NYC Community form: `tandem/join.html`, four short native screens that submit to a Cloudflare Pages Function and persist to D1.
- Partner inquiry form: `tandem/partners.html`, native partner collaboration form with a separate D1 table.
- Privacy note: `tandem/privacy.html`.

The site no longer depends on Tally, Typeform, Fillout, Paperform, public CSV/JSON download buttons, or browser-local applicant persistence.

## Scoring history

The earlier scoring implementation is preserved in git history. The previous version scored fields such as career mode, risk tolerance, lifestyle rhythm, and desired partner energy. The native quiz now lives in `tandem/archetype-engine.js`, uses only self-oriented questions, and has tests to ensure partner preference fields do not affect a participant's archetype.

## Test locally

For a static visual preview only:

```powershell
python -m http.server 4173 -b 127.0.0.1
```

Then open:

```text
http://127.0.0.1:4173/tandem/
```

For full local form testing with Pages Functions and D1, use Wrangler after creating a D1 database:

```powershell
npx wrangler pages dev . --d1 TANDEM_DB=<DATABASE_ID>
```

## Cloudflare D1 setup

Binding name:

```text
TANDEM_DB
```

Create the database:

```powershell
npx wrangler d1 create tandem
```

Apply the migration locally:

```powershell
npx wrangler d1 migrations apply tandem --local
```

Apply the migration remotely:

```powershell
npx wrangler d1 migrations apply tandem --remote
```

Bind the database to the Cloudflare Pages project:

1. Open Cloudflare dashboard.
2. Go to Workers & Pages.
3. Select the Tandem Pages project.
4. Open Settings -> Bindings.
5. Add a D1 database binding.
6. Set the variable name to `TANDEM_DB`.
7. Select the `tandem` D1 database.
8. Redeploy the Pages project after saving the binding.

Do not commit production database IDs or secrets into source code.

## API routes

- `POST /api/tandem/community`
- `POST /api/tandem/result`
- `POST /api/tandem/partners`

There is no public route for viewing submissions.

## Export submissions

Exports are developer-only and write CSV files into `exports/`, which is gitignored.

```powershell
npm run tandem:export-community
npm run tandem:export-results
npm run tandem:export-partners
```

By default the scripts use the D1 database name `tandem`. To export from a differently named database:

```powershell
$env:TANDEM_D1_DATABASE="your-database-name"
npm run tandem:export-community
```

## Tests

```powershell
npm test
```

Current tests cover:

- eight self-oriented archetype questions
- representative primary-result paths for all six archetypes
- deterministic tie handling
- partner-preference fields not affecting archetype score
- community form validation and honeypot suppression
- result email validation and honeypot suppression
- partner inquiry validation

## Analytics hooks

The page records lightweight validation events to `window.dataLayer`. Add Google Tag Manager, GA, Plausible, or another provider later and map these event names:

- `tandem_home_view`
- `tandem_quiz_view`
- `tandem_join_view`
- `tandem_partners_view`
- `tandem_privacy_view`
- `archetype_quiz_started`
- `archetype_quiz_completed`
- `archetype_result_builder`
- `archetype_result_stabilizer`
- `archetype_result_accelerator`
- `archetype_result_creator`
- `archetype_result_operator`
- `archetype_result_explorer`
- `result_email_started`
- `result_email_requested`
- `result_email_sent`
- `founding_form_started`
- `founding_form_completed`
- `partner_inquiry_started`
- `partner_inquiry_completed`
- `referral_share_clicked`

Do not send emails, gender, dating preferences, social links, relationship intention, or free-text responses into analytics.

## Optional result email setup

The result-email endpoint stores requests in D1 even before email delivery is enabled. To send result emails automatically, configure Cloudflare Email Sending with a Pages/Workers email binding named `EMAIL` and add these runtime variables:

```text
TANDEM_RESULT_FROM_EMAIL=hello@tandem-dating.com
TANDEM_RESULT_FROM_NAME=Tandem
TANDEM_REPLY_TO_EMAIL=hello@tandem-dating.com
```

The result email is transactional. Future Tandem updates still require the separate optional consent checkbox.

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
- Archetype quiz starts and completions
- Result-to-founding-list clicks
- Founding-list starts and completions
- Qualified NYC singles
- Curated experience interest
- Availability patterns
- Referral shares
- Partner/community inquiries
- Qualitative feedback
