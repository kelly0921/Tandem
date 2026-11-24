import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { spawnSync } from "node:child_process";

const EXPORTS = {
  community: {
    filename: "tandem-community-applications",
    query: `SELECT
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
    FROM tandem_community_applications
    ORDER BY created_at DESC`,
  },
  partners: {
    filename: "tandem-partner-inquiries",
    query: `SELECT
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
    FROM tandem_partner_inquiries
    ORDER BY created_at DESC`,
  },
  results: {
    filename: "tandem-result-emails",
    query: `SELECT
      created_at,
      updated_at,
      first_name,
      email,
      primary_archetype,
      secondary_archetype,
      marketing_consent,
      delivery_status,
      delivery_error
    FROM tandem_result_emails
    ORDER BY created_at DESC`,
  },
};

const exportName = process.argv[2];
const exportConfig = EXPORTS[exportName];

if (!exportConfig) {
  console.error("Usage: node scripts/export-d1.mjs <community|partners|results>");
  process.exit(1);
}

const databaseName = process.env.TANDEM_D1_DATABASE || "tandem";
const npxCommand = process.platform === "win32" ? "npx.cmd" : "npx";
const args = ["wrangler", "d1", "execute", databaseName, "--remote", "--command", exportConfig.query, "--json"];
const result = spawnSync(npxCommand, args, { encoding: "utf8" });

if (result.error) {
  console.error(result.error.message);
  process.exit(1);
}

if (result.status !== 0) {
  console.error(result.stderr || result.stdout);
  process.exit(result.status || 1);
}

const rows = parseWranglerJson(result.stdout);
const csv = rowsToCsv(rows);
mkdirSync("exports", { recursive: true });

const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
const outputPath = join("exports", `${exportConfig.filename}-${timestamp}.csv`);
writeFileSync(outputPath, csv);
console.log(`Exported ${rows.length} row${rows.length === 1 ? "" : "s"} to ${outputPath}`);

function parseWranglerJson(stdout) {
  const payload = JSON.parse(stdout);
  const resultSets = Array.isArray(payload) ? payload : [payload];
  const rows = [];

  resultSets.forEach((entry) => {
    if (Array.isArray(entry?.results)) {
      rows.push(...entry.results);
    } else if (Array.isArray(entry?.result?.[0]?.results)) {
      rows.push(...entry.result[0].results);
    }
  });

  return rows;
}

function rowsToCsv(rows) {
  if (rows.length === 0) return "";
  const headers = Object.keys(rows[0]);
  const lines = rows.map((row) => headers.map((header) => csvEscape(row[header])).join(","));
  return [headers.join(","), ...lines].join("\n");
}

function csvEscape(value) {
  const text = String(value ?? "");
  return `"${text.replaceAll('"', '""')}"`;
}
