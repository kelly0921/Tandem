# Tandem Project Brief

## One-line summary

Tandem is an early-stage NYC dating experiment for ambitious singles in their 20s who care about lifestyle, ambition, and future direction, not just photos and job titles.

## Product name

Tandem

## Tagline

Dating for complementary ambition.

## Supporting line

Meet someone building in your direction.

## Current stage

Early validation MVP.

This is a landing page, Ambition Archetype quiz, and waitlist flow only. It is not a live dating app yet.

## Target audience

Ambitious NYC singles ages 21-30, especially students, new grads, interns, early-career professionals, startup employees, creators, side-project builders, and young professionals who are dating intentionally.

This audience is still forming career identities, which makes ambition type and lifestyle compatibility especially interesting. Tandem focuses on direction: what someone is building, how they think about risk, what kind of lifestyle they want, and what partner energy complements them.

## Product thesis

Most dating apps ask what someone does. Tandem asks what era of life they are in.

For ambitious people in NYC, compatibility is not only about photos, prompts, location, or job title. It also depends on career mode, lifestyle rhythm, risk tolerance, emotional maturity, relationship intention, and future direction.

Tandem tests whether ambition and life-direction compatibility can become a meaningful dating signal.

## MVP scope

Included:

- Public landing page
- Clear quiz CTA
- Ambition Archetype quiz / waitlist form
- Success state after signup
- Local CSV and JSON export fallback
- Tally embed placeholder
- Lightweight analytics hooks
- Transparent early-validation status

Not included:

- Login
- User accounts
- Swiping
- Matching
- Chat
- Mobile app
- Backend database
- Payment or subscription flows

## Brand direction

Tone:

- Warm
- Premium
- Intentional
- Dating-first
- Honest
- NYC-coded without cliche
- Ambitious without sounding corporate

Avoid:

- LinkedIn dating
- Finance app language
- Power-couple language
- Fake launched-startup claims
- Swiping/matching claims before the product exists

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

## Archetypes

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

## Validation goal

Initial validation target:

100 qualified NYC singles ages 21-30 completing the quiz and joining the waitlist.

A qualified signup means:

- In or near NYC
- Single
- In the intended age range
- Understands the concept
- Open to being contacted for feedback, events, or early matching

## Metrics to track

- Landing page visits
- CTA clicks
- Quiz starts
- Quiz completions
- Waitlist signups
- Qualified NYC signups
- Mixer interest
- Feedback interview interest
- Qualitative comments

Current analytics hooks:

- `landing_view`
- `cta_header_quiz`
- `cta_hero_quiz`
- `cta_hero_how_it_works`
- `cta_footer_quiz`
- `waitlist_started`
- `mixer_interest_selected`
- `waitlist_completed`
- `submissions_exported`

## Form strategy

Preferred public launch form:

Tally.

Reason:

Tally is flexible, lightweight, easy to update, and appropriate for a fast validation MVP. It should replace the local fallback form before public traffic.

Current implementation:

- `TALLY_FORM_URL` is configured in `tandem/script.js`.
- If a Tally URL is provided, the Tally embed appears and the fallback form hides.
- If no URL is provided, the local form stores submissions in the visitor browser and allows CSV/JSON export.

## Portfolio positioning

Suggested portfolio title:

Tandem - Dating for Complementary Ambition

Suggested portfolio summary:

Designed and built a lightweight validation MVP for Tandem, a NYC dating concept exploring whether ambition type, lifestyle rhythm, risk tolerance, and future direction can become meaningful dating signals for ambitious singles in their 20s.

Suggested portfolio bullets:

- Built a public landing page, quiz flow, and waitlist system for early product validation.
- Developed the Ambition Archetype framework to test compatibility around career mode, risk, lifestyle, and partner energy.
- Created a warm premium brand direction and Connected Intent logo system.
- Added Tally-ready form integration and lightweight analytics hooks for measuring validation demand.
- Kept the MVP intentionally scoped to landing page, quiz, and waitlist only, avoiding premature app features.

## Current next steps

- Connect the real Tally form URL.
- Add a real analytics provider such as Plausible, GA, or GTM.
- Commit and push latest changes.
- Deploy with Cloudflare Pages.
- Add Open Graph social preview metadata.
- Do one final mobile polish pass before sharing publicly.
