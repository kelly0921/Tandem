import {
  handleFormError,
  handleOptions,
  jsonResponse,
  readJsonRequest,
  validateResultEmailPayload,
} from "./_shared.js";
import { getArchetype } from "../../../tandem/archetype-engine.js";

export function onRequestOptions() {
  return handleOptions();
}

export function onRequestGet() {
  return jsonResponse({ ok: false, message: "Not found." }, 404);
}

export async function onRequestPost({ request, env }) {
  try {
    const raw = await readJsonRequest(request, 6000);
    const result = validateResultEmailPayload(raw);

    if (result.suppressed) {
      return jsonResponse({ ok: true, emailSent: false });
    }

    if (!result.valid) {
      return jsonResponse({ ok: false, message: "Please enter a valid email for your result.", fields: result.errors }, 400);
    }

    if (!env.TANDEM_DB) {
      return jsonResponse({ ok: false, message: "Tandem database is not configured yet." }, 503);
    }

    const data = result.data;
    const now = new Date().toISOString();
    const existing = await env.TANDEM_DB.prepare("SELECT id FROM tandem_result_emails WHERE email = ? LIMIT 1")
      .bind(data.email)
      .first();
    const id = existing?.id || crypto.randomUUID();

    await env.TANDEM_DB.prepare(
      `INSERT INTO tandem_result_emails (
        id,
        created_at,
        updated_at,
        first_name,
        email,
        primary_archetype,
        secondary_archetype,
        marketing_consent,
        delivery_status,
        delivery_error
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      ON CONFLICT(email) DO UPDATE SET
        updated_at = excluded.updated_at,
        first_name = excluded.first_name,
        primary_archetype = excluded.primary_archetype,
        secondary_archetype = excluded.secondary_archetype,
        marketing_consent = excluded.marketing_consent,
        delivery_status = excluded.delivery_status,
        delivery_error = excluded.delivery_error`
    )
      .bind(
        id,
        now,
        now,
        data.first_name,
        data.email,
        data.primary_archetype,
        data.secondary_archetype,
        data.marketing_consent ? 1 : 0,
        "stored",
        ""
      )
      .run();

    const emailResult = await maybeSendResultEmail({ data, env, request });

    await env.TANDEM_DB.prepare(
      "UPDATE tandem_result_emails SET updated_at = ?, delivery_status = ?, delivery_error = ? WHERE email = ?"
    )
      .bind(now, emailResult.status, emailResult.error, data.email)
      .run();

    return jsonResponse({ ok: true, emailSent: emailResult.sent });
  } catch (error) {
    return handleFormError(error);
  }
}

async function maybeSendResultEmail({ data, env, request }) {
  const fromEmail = String(env.TANDEM_RESULT_FROM_EMAIL || "").trim();

  if (!env.EMAIL || !fromEmail) {
    return { sent: false, status: "stored", error: "" };
  }

  const primary = getArchetype(data.primary_archetype);
  const secondary = getArchetype(data.secondary_archetype);
  const joinUrl = new URL("/tandem/join.html", request.url).toString();
  const quizUrl = new URL("/tandem/quiz.html", request.url).toString();
  const greeting = data.first_name ? `Hi ${data.first_name},` : "Hi,";
  const subject = `Your Tandem result: ${primary.name}`;
  const text = `${greeting}

Your Tandem Ambition Archetype is ${primary.name}.

${primary.headline}

${primary.description}

Secondary energy: ${secondary.name}. You also lean toward ${secondary.secondaryLabel}.

This is not a diagnosis or compatibility score. It is a shorthand for how you tend to approach ambition and building a life.

Join the founding NYC list: ${joinUrl}
Retake the quiz: ${quizUrl}

Tandem
Dating for complementary ambition.`;

  const html = `<!doctype html>
<html>
  <body style="margin:0;background:#fffaf6;color:#251b18;font-family:Inter,Arial,sans-serif;">
    <div style="max-width:640px;margin:0 auto;padding:32px 22px;">
      <p style="margin:0 0 18px;color:#6f312c;font-weight:800;letter-spacing:.08em;text-transform:uppercase;">Tandem Ambition Archetype</p>
      <h1 style="margin:0;color:#251b18;font-family:Georgia,serif;font-size:36px;line-height:1.05;">Your result: ${escapeHtml(primary.name)}</h1>
      <p style="font-size:18px;line-height:1.55;color:#6d625d;">${escapeHtml(greeting)}</p>
      <p style="font-size:19px;line-height:1.5;"><strong>${escapeHtml(primary.headline)}</strong></p>
      <p style="font-size:16px;line-height:1.65;color:#6d625d;">${escapeHtml(primary.description)}</p>
      <div style="margin:22px 0;padding:18px;border:1px solid #e1d8d1;border-radius:8px;background:#ffffff;">
        <p style="margin:0;color:#6f312c;font-size:13px;font-weight:800;letter-spacing:.08em;text-transform:uppercase;">Secondary energy</p>
        <p style="margin:8px 0 0;font-size:16px;line-height:1.5;">${escapeHtml(secondary.name)}: you also lean toward ${escapeHtml(secondary.secondaryLabel)}.</p>
      </div>
      <p style="font-size:14px;line-height:1.6;color:#6d625d;">This is not a diagnosis or compatibility score. It is a shorthand for how you tend to approach ambition and building a life.</p>
      <p style="margin:24px 0 0;">
        <a href="${escapeHtml(joinUrl)}" style="display:inline-block;border-radius:999px;background:#6f312c;color:#fffaf6;padding:13px 18px;text-decoration:none;font-weight:800;">Join the founding NYC list</a>
      </p>
      <p style="margin:18px 0 0;color:#6d625d;font-size:14px;">Want to retake it? <a href="${escapeHtml(quizUrl)}" style="color:#6f312c;font-weight:800;">Open the quiz</a>.</p>
    </div>
  </body>
</html>`;

  try {
    await env.EMAIL.send({
      to: data.email,
      from: { email: fromEmail, name: env.TANDEM_RESULT_FROM_NAME || "Tandem" },
      replyTo: env.TANDEM_REPLY_TO_EMAIL || fromEmail,
      subject,
      html,
      text,
    });
    return { sent: true, status: "sent", error: "" };
  } catch (error) {
    return { sent: false, status: "send_failed", error: String(error?.message || error).slice(0, 500) };
  }
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}
