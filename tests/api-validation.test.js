import test from "node:test";
import assert from "node:assert/strict";
import {
  validateCommunityPayload,
  validatePartnerPayload,
  validateResultEmailPayload,
} from "../functions/api/tandem/_shared.js";

const validCommunityPayload = {
  first_name: "Kelly",
  email: "KELLY@example.com",
  age_range: "25-27",
  location_area: "nyc",
  neighborhood: "Lower Manhattan",
  gender_identity: "woman",
  gender_self_description: "",
  interested_in: ["men"],
  relationship_intention: "intentional-open",
  event_interest: "yes-invite",
  availability: ["weekday-evenings", "saturday"],
  interest_reason: "The concept feels thoughtful.",
  acquisition_source: "friend",
  referral_source: "founding-nyc",
  social_link: "@example",
  primary_archetype: "Builder",
  secondary_archetype: "Operator",
  source: "archetype_quiz",
  marketing_consent: true,
  company: "",
};

const validPartnerPayload = {
  name: "Kelly",
  email: "kelly@example.com",
  organization: "Example Community",
  website_or_social: "https://example.com",
  organization_type: "community",
  audience_size: "500",
  collaboration_interest: "A small curated NYC edition.",
  notes: "Open to a pilot.",
  company: "",
};

const validResultEmailPayload = {
  first_name: "Kelly",
  email: "KELLY@example.com",
  primary_archetype: "Builder",
  secondary_archetype: "Operator",
  marketing_consent: true,
  company: "",
};

test("valid community payload is normalized without exposing private values in URLs", () => {
  const result = validateCommunityPayload(validCommunityPayload);

  assert.equal(result.valid, true);
  assert.equal(result.data.email, "kelly@example.com");
  assert.deepEqual(result.data.interested_in, ["men"]);
  assert.deepEqual(result.data.availability, ["weekday-evenings", "saturday"]);
  assert.equal(result.data.primary_archetype, "Builder");
  assert.equal(result.data.secondary_archetype, "Operator");
});

test("community validation rejects missing required cohort fields", () => {
  const result = validateCommunityPayload({
    ...validCommunityPayload,
    email: "not-an-email",
    interested_in: [],
  });

  assert.equal(result.valid, false);
  assert.ok(result.errors.includes("email"));
  assert.ok(result.errors.includes("interested_in"));
});

test("community honeypot submissions are suppressed gracefully", () => {
  const result = validateCommunityPayload({
    ...validCommunityPayload,
    company: "Filled by a bot",
  });

  assert.equal(result.valid, true);
  assert.equal(result.suppressed, true);
});

test("valid partner payload is normalized", () => {
  const result = validatePartnerPayload(validPartnerPayload);

  assert.equal(result.valid, true);
  assert.equal(result.data.email, "kelly@example.com");
  assert.equal(result.data.organization_type, "community");
});

test("partner validation rejects malformed essentials", () => {
  const result = validatePartnerPayload({
    ...validPartnerPayload,
    email: "bad",
    organization_type: "sponsor",
    collaboration_interest: "",
  });

  assert.equal(result.valid, false);
  assert.ok(result.errors.includes("email"));
  assert.ok(result.errors.includes("organization_type"));
  assert.ok(result.errors.includes("collaboration_interest"));
});

test("valid result email payload is normalized", () => {
  const result = validateResultEmailPayload(validResultEmailPayload);

  assert.equal(result.valid, true);
  assert.equal(result.data.email, "kelly@example.com");
  assert.equal(result.data.first_name, "Kelly");
  assert.equal(result.data.primary_archetype, "Builder");
  assert.equal(result.data.secondary_archetype, "Operator");
  assert.equal(result.data.marketing_consent, true);
});

test("result email validation rejects bad email or archetype", () => {
  const result = validateResultEmailPayload({
    ...validResultEmailPayload,
    email: "not-an-email",
    primary_archetype: "Magician",
  });

  assert.equal(result.valid, false);
  assert.ok(result.errors.includes("email"));
  assert.ok(result.errors.includes("primary_archetype"));
});

test("result email honeypot submissions are suppressed gracefully", () => {
  const result = validateResultEmailPayload({
    ...validResultEmailPayload,
    company: "Filled by a bot",
  });

  assert.equal(result.valid, true);
  assert.equal(result.suppressed, true);
});
