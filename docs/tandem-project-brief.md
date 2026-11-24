# Tandem Project Brief

## One-line summary

Tandem is a curated NYC dating community for intentional singles who care about lifestyle, ambition, rhythm, and the kind of life they want to build with someone.

## Product name

Tandem

## Tagline

Dating for complementary ambition.

## Supporting idea

Who you build with changes what you can build.

## Current direction

Tandem is an IRL-first dating community, not a full dating app. The current business model is intentionally lightweight: curated NYC dating experiences, selectively assembled groups, partner/community co-hosts, and occasional invitations rather than an always-on platform.

Tandem owns the concept, curation, participant experience, community layer, and native data collection experience.

The archetype quiz should feel like a lightweight personality test: no signup, name, email, gender, location, dating preferences, or social profiles are required to get a result. After the result reveal, visitors can optionally enter an email to save/send the result. The founding-list form is separate and private, not anonymous, because Tandem needs contact information and basic dating context to review fit and send invitations.

## Target audience

Intentional NYC singles in their 20s and early 30s who are actively building a life they care about. This includes early-career professionals, founders, creatives, operators, students, new grads, people seeking stability, people changing direction, and people who care about family, craft, lifestyle, or meaningful work.

Ambition should not be framed only as prestige, income, startup status, or career maximization. For Tandem, ambition means the way someone wants to build a life.

## Product thesis

Most dating profiles show what someone does. They rarely show whether two lives can actually move together.

Compatibility for intentional NYC singles depends on attraction and values, but also on lifestyle rhythm, risk tolerance, independence, emotional steadiness, ambition style, and future direction.

Tandem tests whether these hidden compatibility signals can create better real-world dating experiences.

## Current site structure

- Hero: positions Tandem as `A curated NYC dating community` and keeps `Dating for complementary ambition.`
- Dating signal: preserves `Dating, not networking.` and clarifies that Tandem is not professional networking.
- Premise: preserves the idea that job titles do not tell you if two lives fit.
- Complementary ambition: keeps `Different strengths, same direction.` and `Who you build with changes what you can build.`
- Archetypes: keeps the six illustrated archetypes, reframed as reflective language rather than a proven algorithm.
- How it works: take the quiz, get an archetype, join the list, and get considered for curated IRL editions.
- Homepage next-step cards: direct users to the archetype quiz first, with direct founding-list and partner paths still available.
- `tandem/quiz.html`: native archetype quiz, anonymous, one-question-at-a-time, self-oriented, built for brand discovery, with optional result email capture after the reveal.
- `tandem/join.html`: four-step native Tandem application/interest flow.
- `tandem/partners.html`: native inquiry form for NYC communities, membership organizations, venues, and event partners.
- `tandem/privacy.html`: explains quiz/device storage, D1-backed form submissions, private dating context, and deletion requests.

## Included scope

- Public landing page
- Curated community positioning
- Founding NYC list CTA
- Anonymous Ambition Archetype Quiz
- Primary and secondary archetype result state
- Result-to-community signup handoff
- Native founding-list form
- Optional result-email capture and transactional email endpoint
- Cloudflare Pages Function endpoints
- Cloudflare D1 schema for participant applications and partner inquiries
- Developer-only CSV export scripts
- Partner collaboration form
- Basic privacy note
- Lightweight analytics hooks
- Responsive layout and animation layer

## Not included

- Swipe interface
- Messaging
- Browsable profiles
- Participant accounts
- Full matching backend
- Admin dashboard
- Event ticketing
- Subscriptions
- Member dashboard
- Community forum
- Custom CMS
- Third-party form builders

## Brand direction

Tone:

- Warm
- Premium
- Intentional
- Dating-first
- Discreet
- NYC-coded without cliche
- Ambitious without sounding corporate
- Community-first without sounding like an events agency

Avoid:

- LinkedIn dating
- Founder networking
- Recruiting
- Finance app language
- Power-couple language
- Fake scarcity
- Claims that archetypes predict relationship success

Logo direction:

- Connected Intent, based on option 3 from the first logo exploration.
- The mark is an ampersand-like connection: a dark loop and muted rose stroke.
- It represents two distinct life paths meeting through intentional alignment.

Active logo assets:

- `assets/brand/tandem-logo-option3.png`
- `assets/brand/tandem-mark-option3.png`
- `assets/brand/tandem-favicon-option3.png`

Reference asset:

- `assets/references/option-3-connected-intent-tile.png`

Active visual assets:

- `assets/illustrations/tandem-hero-asian-illustrated-couple.png`
- `assets/illustrations/tandem-complementary-ambition-couple.png`
- `assets/archetypes/tandem-archetype-builder-v2.png`
- `assets/archetypes/tandem-archetype-stabilizer-v2.png`
- `assets/archetypes/tandem-archetype-accelerator-v2.png`
- `assets/archetypes/tandem-archetype-creator-v2.png`
- `assets/archetypes/tandem-archetype-operator-v2.png`
- `assets/archetypes/tandem-archetype-explorer-v2.png`

## Archetypes

The archetypes are a brand and conversation system. They are not a scientific compatibility algorithm and should not be presented as a soulmate score.

The quiz now measures how a participant approaches ambition and building a life, not qualities they want in a romantic partner. Partner preferences are collected only in the community form for cohort viability.

Builder:
Starts projects, companies, communities, side hustles, or ideas.

Stabilizer:
Creates consistency, emotional steadiness, financial rhythm, and grounded support.

Accelerator:
Climbs or scales inside a clear path, optimizing for growth, speed, and momentum.

Creator:
Builds audience, taste, community, media, content, or creative leverage.

Operator:
Turns ambition into systems, plans, follow-through, and everyday execution.

Explorer:
Actively learns, tests paths, and expands while still choosing a direction.

## Quiz strategy

The archetype quiz is a low-friction brand experience. It can help people understand Tandem and make them curious about the community, but it is not an application.

Quiz principles:

- anonymous
- no name or email
- no gender or dating preferences
- no location or social profiles
- self-oriented questions only
- randomized answer display order
- primary and secondary archetype result
- deterministic tie-breaking for reproducible results
- no scientific precision claims
- optional post-result email capture without gating the reveal

Users can:

- take the archetype quiz and then join the list
- join the founding list without taking the quiz first
- email themselves the quiz result without joining the founding list

## Complementary ambition framework

Core concept:

Upside + Stability

One person may bring risk, momentum, experiments, and big swings. The other may bring rhythm, structure, predictability, and follow-through. The point is not that every couple needs opposite careers. The point is that compatible ambition often means different strengths supporting the same direction.

Current combo examples:

- Startup energy + steady rhythm: one swings for equity, one keeps the plan steady.
- Audience builder + follow-through: one creates momentum, one keeps life operating.
- Opportunity finder + investing brain: one spots openings, one knows where upside belongs.
- Real estate operator + high-income W2: one builds assets, one brings predictable income.
- High-commission sales + salaried stability: one takes the variable bet, one grounds the plan.

## Founding list strategy

The founding list is the main conversion path.

Purpose:

- Validate demand from intentional NYC singles
- Understand potential founding cohorts
- Invite people to small curated NYC editions
- Learn what kinds of groups feel balanced and compelling

Native founding form screens:

1. You: first name, email, age range, location, optional neighborhood.
2. Who you are hoping to meet: gender identity, interested in meeting, relationship intention.
3. Tandem: event interest, availability, what made Tandem interesting, acquisition source.
4. Optional context: optional social link, carried archetype result if available, future invitations consent.

The community form submits to:

```text
POST /api/tandem/community
```

The D1 table is:

```text
tandem_community_applications
```

## Result email strategy

Do not gate quiz results behind an email address. Show the result first, then offer a small optional save/send module.

Result email purpose:

- Let people keep their archetype result
- Capture lightweight quiz-to-contact intent without forcing application
- Keep marketing consent separate from the transactional result email

The result email form submits to:

```text
POST /api/tandem/result
```

The D1 table is:

```text
tandem_result_emails
```

Email delivery uses a Cloudflare Email Sending binding named `EMAIL` when configured. If email delivery is not configured, the request is stored with `delivery_status = stored`.

## Partner strategy

Tandem can be shared with NYC community organizers, membership organizations, venue collaborators, and event partners.

Partner positioning:

- Founding collaboration
- Co-host a founding edition
- Tandem handles concept, curation, and participant experience
- Partners help bring together people from their communities

The partner inquiry form submits to:

```text
POST /api/tandem/partners
```

The D1 table is:

```text
tandem_partner_inquiries
```

Do not publish pricing or imply mature institutional partnerships before they exist.

## Architecture

Current lightweight architecture:

```text
Native Tandem frontend -> Cloudflare Pages Function -> Cloudflare D1
```

Binding:

```text
TANDEM_DB
```

Important constraints:

- D1 is never exposed directly to browser clients.
- There is no public GET route for submissions.
- Applicant data is not stored in browser local storage.
- Browser storage is used only for anonymous quiz progress/result handoff.
- Export scripts are developer-only and write to gitignored `exports/`.

## Privacy and discretion

Privacy language should be concise, warm, and clear.

Communicate that:

- The quiz is anonymous.
- Founding form responses are used for Tandem community curation and future invitations.
- Private dating and preference data is not publicly displayed.
- Partner communities do not receive participant-level form answers without consent.
- Aggregated or anonymized patterns may be used to improve the concept.
- People can request deletion by emailing hello@tandem-dating.com.

The current site includes a working privacy note at `tandem/privacy.html`. This should become a fuller policy before broader public launch.

## Metrics to track

- Landing page visits
- Archetype quiz starts
- Archetype quiz completions
- Archetype result distribution
- Result email starts and requests
- Founding-list starts
- Founding-list completions
- Qualified NYC singles
- Curated experience interest
- Availability patterns
- Referral shares
- Partner/community inquiries
- Qualitative comments

Current analytics hooks:

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

Do not send emails, gender, dating preferences, relationship intention, social links, or free-text responses into analytics.

## Visual QA screenshots

Previously captured from the local site at `http://127.0.0.1:4173/tandem/` on July 10, 2026:

- `docs/tandem-home-full.png`
- `docs/tandem-home-hero.png`
- `docs/tandem-concept-section.png`
- `docs/tandem-archetypes-section.png`
- `docs/tandem-how-it-works-section.png`
- `docs/tandem-waitlist-section.png`
- `docs/tandem-mobile-home.png`

New screenshots should be captured after the native form implementation is visually approved.

## Portfolio positioning

Suggested portfolio title:

Tandem - Dating for Complementary Ambition

Suggested portfolio summary:

Repositioned Tandem from a future dating-app MVP into an IRL-first curated dating community for intentional NYC singles, using archetypes, complementary ambition, native form flows, and lightweight Cloudflare/D1 infrastructure to test demand for small curated dating experiences.

Suggested portfolio bullets:

- Built and evolved a polished landing page for a curated NYC dating community.
- Developed the Ambition Archetype framework as a playful compatibility vocabulary, not a deterministic matching algorithm.
- Designed a native anonymous quiz that returns primary and secondary ambition archetypes.
- Designed the founding-list journey around real-world gatherings, thoughtful curation, and community-first validation.
- Added a lightweight Cloudflare Pages Functions and D1 submission layer without building unnecessary app infrastructure.
- Added partner collaboration positioning for communities, membership organizations, venues, and event partners.
- Removed third-party form builder dependency and browser-only applicant persistence.

## Current next steps

- Create the production Cloudflare D1 database.
- Apply `migrations/0001_tandem_native_forms.sql`.
- Bind the Pages project to D1 as `TANDEM_DB`.
- Run the site with Wrangler and test all native form journeys.
- Add a real analytics provider such as Plausible, GA, or GTM.
- Refresh screenshots after final visual approval.
- Deploy with Cloudflare Pages.
- Add Open Graph social preview metadata.
