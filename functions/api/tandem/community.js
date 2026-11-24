import {
  handleFormError,
  handleOptions,
  jsonResponse,
  makeReferralCode,
  readJsonRequest,
  validateCommunityPayload,
} from "./_shared.js";

export function onRequestOptions() {
  return handleOptions();
}

export function onRequestGet() {
  return jsonResponse({ ok: false, message: "Not found." }, 404);
}

export async function onRequestPost({ request, env }) {
  try {
    const raw = await readJsonRequest(request);
    const result = validateCommunityPayload(raw);

    if (result.suppressed) {
      return jsonResponse({ ok: true, referralCode: "founding" });
    }

    if (!result.valid) {
      return jsonResponse({ ok: false, message: "Please review the required fields.", fields: result.errors }, 400);
    }

    if (!env.TANDEM_DB) {
      return jsonResponse({ ok: false, message: "Tandem database is not configured yet." }, 503);
    }

    const data = result.data;
    const now = new Date().toISOString();
    const existing = await env.TANDEM_DB.prepare(
      "SELECT id, referral_code FROM tandem_community_applications WHERE email = ? LIMIT 1"
    )
      .bind(data.email)
      .first();

    const id = existing?.id || crypto.randomUUID();
    const referralCode = existing?.referral_code || makeReferralCode(data.first_name);

    await env.TANDEM_DB.prepare(
      `INSERT INTO tandem_community_applications (
        id,
        created_at,
        updated_at,
        first_name,
        email,
        age_range,
        location_area,
        neighborhood,
        gender_identity,
        gender_self_description,
        interested_in,
        relationship_intention,
        event_interest,
        availability,
        interest_reason,
        acquisition_source,
        referral_source,
        referral_code,
        social_link,
        primary_archetype,
        secondary_archetype,
        source,
        marketing_consent,
        application_status
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      ON CONFLICT(email) DO UPDATE SET
        updated_at = excluded.updated_at,
        first_name = excluded.first_name,
        age_range = excluded.age_range,
        location_area = excluded.location_area,
        neighborhood = excluded.neighborhood,
        gender_identity = excluded.gender_identity,
        gender_self_description = excluded.gender_self_description,
        interested_in = excluded.interested_in,
        relationship_intention = excluded.relationship_intention,
        event_interest = excluded.event_interest,
        availability = excluded.availability,
        interest_reason = excluded.interest_reason,
        acquisition_source = excluded.acquisition_source,
        referral_source = excluded.referral_source,
        social_link = excluded.social_link,
        primary_archetype = excluded.primary_archetype,
        secondary_archetype = excluded.secondary_archetype,
        source = excluded.source,
        marketing_consent = excluded.marketing_consent`
    )
      .bind(
        id,
        now,
        now,
        data.first_name,
        data.email,
        data.age_range,
        data.location_area,
        data.neighborhood,
        data.gender_identity,
        data.gender_self_description,
        JSON.stringify(data.interested_in),
        data.relationship_intention,
        data.event_interest,
        JSON.stringify(data.availability),
        data.interest_reason,
        data.acquisition_source,
        data.referral_source,
        referralCode,
        data.social_link,
        data.primary_archetype || "",
        data.secondary_archetype || "",
        data.source,
        data.marketing_consent ? 1 : 0,
        "new"
      )
      .run();

    return jsonResponse({ ok: true, referralCode });
  } catch (error) {
    return handleFormError(error);
  }
}
