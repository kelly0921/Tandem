import { handleFormError, handleOptions, jsonResponse, readJsonRequest, validatePartnerPayload } from "./_shared.js";

export function onRequestOptions() {
  return handleOptions();
}

export function onRequestGet() {
  return jsonResponse({ ok: false, message: "Not found." }, 404);
}

export async function onRequestPost({ request, env }) {
  try {
    const raw = await readJsonRequest(request, 10000);
    const result = validatePartnerPayload(raw);

    if (result.suppressed) {
      return jsonResponse({ ok: true });
    }

    if (!result.valid) {
      return jsonResponse({ ok: false, message: "Please review the required fields.", fields: result.errors }, 400);
    }

    if (!env.TANDEM_DB) {
      return jsonResponse({ ok: false, message: "Tandem database is not configured yet." }, 503);
    }

    const data = result.data;
    const now = new Date().toISOString();

    await env.TANDEM_DB.prepare(
      `INSERT INTO tandem_partner_inquiries (
        id,
        created_at,
        name,
        email,
        organization,
        website_or_social,
        organization_type,
        audience_size,
        collaboration_interest,
        notes,
        inquiry_status
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
    )
      .bind(
        crypto.randomUUID(),
        now,
        data.name,
        data.email,
        data.organization,
        data.website_or_social,
        data.organization_type,
        data.audience_size,
        data.collaboration_interest,
        data.notes,
        "new"
      )
      .run();

    return jsonResponse({ ok: true });
  } catch (error) {
    return handleFormError(error);
  }
}
