const ARCHETYPES = new Set(["Builder", "Stabilizer", "Accelerator", "Creator", "Operator", "Explorer"]);

const AGE_RANGES = new Set(["21-24", "25-27", "28-30", "31-34", "35-plus"]);
const LOCATION_AREAS = new Set(["nyc", "nyc-metro", "other"]);
const GENDER_IDENTITIES = new Set(["woman", "man", "nonbinary", "self-describe", "prefer-not"]);
const INTERESTED_IN = new Set(["women", "men", "nonbinary", "open-across-genders"]);
const RELATIONSHIP_INTENTIONS = new Set(["serious", "intentional-open", "right-person", "figuring-out"]);
const EVENT_INTERESTS = new Set(["yes-invite", "probably", "maybe-later", "archetype-community"]);
const AVAILABILITY = new Set(["weekday-evenings", "friday-evenings", "saturday", "sunday", "flexible"]);
const ACQUISITION_SOURCES = new Set(["friend", "community", "instagram", "linkedin", "event", "search", "other"]);
const ORGANIZATION_TYPES = new Set(["community", "membership-organization", "venue", "event-partner", "other"]);

const DEFAULT_HEADERS = {
  "Content-Type": "application/json; charset=utf-8",
  "Cache-Control": "no-store",
};

class PublicFormError extends Error {
  constructor(status, message, fields = []) {
    super(message);
    this.name = "PublicFormError";
    this.status = status;
    this.fields = fields;
  }
}

function jsonResponse(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: DEFAULT_HEADERS,
  });
}

function handleOptions() {
  return new Response(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Cache-Control": "no-store",
    },
  });
}

async function readJsonRequest(request, maxBytes = 12000) {
  const declaredLength = Number(request.headers.get("content-length") || 0);
  if (declaredLength > maxBytes) {
    throw new PublicFormError(413, "Submission is too large.");
  }

  const text = await request.text();
  if (text.length > maxBytes) {
    throw new PublicFormError(413, "Submission is too large.");
  }

  try {
    return JSON.parse(text || "{}");
  } catch {
    throw new PublicFormError(400, "Submission must be valid JSON.");
  }
}

function cleanText(value, maxLength, required = false) {
  const text = String(value || "").trim().replace(/\s+/g, " ").slice(0, maxLength);
  if (required && !text) return null;
  return text;
}

function cleanEmail(value) {
  const email = cleanText(value, 160, true);
  if (!email) return null;
  const normalized = email.toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(normalized)) return null;
  return normalized;
}

function cleanPublicCode(value) {
  return String(value || "")
    .trim()
    .replace(/[^a-zA-Z0-9_-]/g, "")
    .slice(0, 80);
}

function oneOf(value, allowedValues, required = false) {
  const text = cleanText(value, 120, required);
  if (!text) return required ? null : "";
  return allowedValues.has(text) ? text : null;
}

function manyOf(value, allowedValues, required = false) {
  const values = Array.isArray(value) ? value : [];
  const normalized = [...new Set(values.map((item) => cleanText(item, 120)).filter(Boolean))].filter((item) =>
    allowedValues.has(item)
  );
  if (required && normalized.length === 0) return null;
  return normalized;
}

function looksLikeHoneypot(raw) {
  return cleanText(raw?.company, 120) !== "";
}

function validateCommunityPayload(raw) {
  if (!raw || typeof raw !== "object") {
    return { valid: false, errors: ["payload"] };
  }

  if (looksLikeHoneypot(raw)) {
    return { valid: true, suppressed: true, data: null, errors: [] };
  }

  const data = {
    first_name: cleanText(raw.first_name, 80, true),
    email: cleanEmail(raw.email),
    age_range: oneOf(raw.age_range, AGE_RANGES, true),
    location_area: oneOf(raw.location_area, LOCATION_AREAS, true),
    neighborhood: cleanText(raw.neighborhood, 120),
    gender_identity: oneOf(raw.gender_identity, GENDER_IDENTITIES, true),
    gender_self_description: cleanText(raw.gender_self_description, 120),
    interested_in: manyOf(raw.interested_in, INTERESTED_IN, true),
    relationship_intention: oneOf(raw.relationship_intention, RELATIONSHIP_INTENTIONS, true),
    event_interest: oneOf(raw.event_interest, EVENT_INTERESTS, true),
    availability: manyOf(raw.availability, AVAILABILITY),
    interest_reason: cleanText(raw.interest_reason, 700),
    acquisition_source: oneOf(raw.acquisition_source, ACQUISITION_SOURCES, true),
    referral_source: cleanPublicCode(raw.referral_source),
    social_link: cleanText(raw.social_link, 240),
    primary_archetype: oneOf(raw.primary_archetype, ARCHETYPES),
    secondary_archetype: oneOf(raw.secondary_archetype, ARCHETYPES),
    source: cleanText(raw.source, 80) || "direct",
    marketing_consent: raw.marketing_consent === true,
  };

  const errors = Object.entries(data)
    .filter(([key, value]) => {
      if (["neighborhood", "gender_self_description", "availability", "interest_reason", "referral_source", "social_link", "primary_archetype", "secondary_archetype", "source"].includes(key)) {
        return false;
      }
      return value === null || value === "" || (Array.isArray(value) && value.length === 0);
    })
    .map(([key]) => key);

  if (data.gender_identity !== "self-describe") {
    data.gender_self_description = "";
  }

  if (data.primary_archetype && data.primary_archetype === data.secondary_archetype) {
    data.secondary_archetype = "";
  }

  return { valid: errors.length === 0, errors, data };
}

function validatePartnerPayload(raw) {
  if (!raw || typeof raw !== "object") {
    return { valid: false, errors: ["payload"] };
  }

  if (looksLikeHoneypot(raw)) {
    return { valid: true, suppressed: true, data: null, errors: [] };
  }

  const data = {
    name: cleanText(raw.name, 120, true),
    email: cleanEmail(raw.email),
    organization: cleanText(raw.organization, 180, true),
    website_or_social: cleanText(raw.website_or_social, 240),
    organization_type: oneOf(raw.organization_type, ORGANIZATION_TYPES, true),
    audience_size: cleanText(raw.audience_size, 80),
    collaboration_interest: cleanText(raw.collaboration_interest, 900, true),
    notes: cleanText(raw.notes, 900),
  };

  const errors = Object.entries(data)
    .filter(([key, value]) => {
      if (["website_or_social", "audience_size", "notes"].includes(key)) return false;
      return value === null || value === "";
    })
    .map(([key]) => key);

  return { valid: errors.length === 0, errors, data };
}

function validateResultEmailPayload(raw) {
  if (!raw || typeof raw !== "object") {
    return { valid: false, errors: ["payload"] };
  }

  if (looksLikeHoneypot(raw)) {
    return { valid: true, suppressed: true, data: null, errors: [] };
  }

  const data = {
    first_name: cleanText(raw.first_name, 80),
    email: cleanEmail(raw.email),
    primary_archetype: oneOf(raw.primary_archetype, ARCHETYPES, true),
    secondary_archetype: oneOf(raw.secondary_archetype, ARCHETYPES, true),
    marketing_consent: raw.marketing_consent === true,
  };

  if (data.primary_archetype && data.primary_archetype === data.secondary_archetype) {
    data.secondary_archetype = "";
  }

  const errors = Object.entries(data)
    .filter(([key, value]) => {
      if (["first_name", "marketing_consent"].includes(key)) return false;
      return value === null || value === "";
    })
    .map(([key]) => key);

  return { valid: errors.length === 0, errors, data };
}

function makeReferralCode(firstName = "tandem") {
  const prefix = cleanPublicCode(firstName.toLowerCase()).slice(0, 12) || "tandem";
  const suffix = crypto.randomUUID().replace(/-/g, "").slice(0, 8);
  return `${prefix}-${suffix}`;
}

function handleFormError(error) {
  if (error instanceof PublicFormError) {
    return jsonResponse({ ok: false, message: error.message, fields: error.fields }, error.status);
  }

  return jsonResponse({ ok: false, message: "Something went wrong. Please try again." }, 500);
}

export {
  handleFormError,
  handleOptions,
  jsonResponse,
  makeReferralCode,
  readJsonRequest,
  validateCommunityPayload,
  validatePartnerPayload,
  validateResultEmailPayload,
};
