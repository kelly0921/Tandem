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

## Current landing page structure

The homepage should make the concept understandable within the first screen:

- Hero: `Dating for complementary ambition.` with the supporting line `Meet someone building in your direction.`
- Audience qualifier: for intentional singles in or near NYC, in their 20s, dating intentionally, and building or choosing a next direction.
- Concept explanation: Tandem is dating, not networking. It helps people understand ambition type, lifestyle rhythm, risk tolerance, and future direction before trying to build a relationship.
- Complementary ambition section: `Different strengths, same direction.` using the core formula `Upside + Stability`.
- Combo examples: concrete pairings that make the concept feel relatable, not abstract.
- Archetypes: six ambition types with paired character illustrations.
- How it works: take the quiz, get an archetype, join the early list.
- Early validation: honest signal that the product is still being tested.

## MVP scope

Included:

- Public landing page
- Clear quiz CTA
- Ambition Archetype quiz / waitlist form
- Tally-ready quiz and result flow
- Success state after signup
- Local CSV and JSON export fallback
- External form embed/link placeholder
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

## Complementary ambition framework

Core concept:

Upside + Stability

One person may bring risk, momentum, experiments, and big swings. The other may bring rhythm, structure, predictability, and follow-through. The point is not that every couple needs opposite careers. The point is that compatible ambition often means different strengths supporting the same direction.

Current combo examples:

- Startup energy + steady rhythm: one swings for equity, one protects the runway.
- Audience builder + follow-through: one creates momentum, one keeps life operating.
- Entrepreneurial eye + capital strategy: one spots opportunities, one knows where to place the bet.
- Real estate hours + high-income W2: one unlocks the vehicle, one strengthens the base.
- High-commission sales + salaried stability: one takes the variable bet, one grounds the plan.

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

Tally is the best fit for the validation stage because unlimited responses matter more than polished form-native animation. The quiz should still feel like a branded personality test, so the website should carry the visual design while Tally handles collection, branching, scoring, and response storage.

Current implementation:

- `TALLY_FORM_URL` is configured in `tandem/script.js`.
- Current Tally form: `https://tally.so/r/0QyVD6`.
- The site embeds the form with a transparent background so it can sit inside the Tandem-styled quiz section.
- If the Tally URL is removed, the local fallback form stores submissions in the visitor browser and allows CSV/JSON export.

## Final quiz structure

The quiz should feel insightful, specific, and personality-test-like. It should not sound like a generic survey, and response wording should avoid obvious archetype keywords.

Recommended flow:

1. Eligibility screen: confirm single status, NYC or near-NYC location, age range, and intentional dating interest.
2. Archetype quiz: use situational questions that reveal how someone handles ambition, risk, structure, change, support, and direction.
3. Scoring: equal-weight scoring by default, with each answer adding one point to one archetype. Do not show labels to the user.
4. Randomization: randomize response order whenever the form tool allows it so the pattern is not obvious.
5. Tie handling: include a tiebreaker question that appears only when needed, or use a deterministic tiebreaker rule in the scoring setup. Avoid final ties.
6. Dating reality check: ask what kind of ambition mismatch would frustrate them, what the next few years feel like, and what they wish a partner understood.
7. Concept validation: ask which combo feels relatable, whether they would join the waitlist, and whether they would consider a curated NYC mixer.
8. Result: show the archetype first, then collect name, email, optional social link, and optional feedback.

Result pages:

- Builder
- Stabilizer
- Accelerator
- Creator
- Operator
- Explorer

## Visual QA screenshots

Captured from the local site at `http://127.0.0.1:4173/tandem/` on July 10, 2026:

- `docs/tandem-home-full.png`
- `docs/tandem-home-hero.png`
- `docs/tandem-concept-section.png`
- `docs/tandem-archetypes-section.png`
- `docs/tandem-how-it-works-section.png`
- `docs/tandem-waitlist-section.png`
- `docs/tandem-mobile-home.png`

## Portfolio positioning

Suggested portfolio title:

Tandem - Dating for Complementary Ambition

Suggested portfolio summary:

Designed and built a lightweight validation MVP for Tandem, a NYC dating concept exploring whether ambition type, lifestyle rhythm, risk tolerance, and future direction can become meaningful dating signals for ambitious singles in their 20s.

Suggested portfolio bullets:

- Built a public landing page, quiz flow, and waitlist system for early product validation.
- Developed the Ambition Archetype framework to test compatibility around career mode, risk, lifestyle, and partner energy.
- Created a warm premium brand direction and Connected Intent logo system.
- Added form integration scaffolding and lightweight analytics hooks for measuring validation demand.
- Kept the MVP intentionally scoped to landing page, quiz, and waitlist only, avoiding premature app features.

## Current next steps

- Finish designing the Tally quiz with section breaks, result reveal pages, and archetype scoring.
- Test the embedded Tally form on desktop and mobile.
- Add a real analytics provider such as Plausible, GA, or GTM.
- Deploy with Cloudflare Pages.
- Add Open Graph social preview metadata.
- Do one final mobile polish pass before sharing publicly.
