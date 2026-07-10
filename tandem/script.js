// Replace this with a real Tally URL when the external quiz is ready.
// Example: const TALLY_FORM_URL = "https://tally.so/embed/your-form-id";
const TALLY_FORM_URL = "";

const form = document.querySelector("#waitlistForm");
const successState = document.querySelector("#successState");
const formError = document.querySelector("#formError");
const archetypeResult = document.querySelector("#archetypeResult");
const tallyEmbed = document.querySelector("#tallyEmbed");
const tallyFrame = document.querySelector("#tallyFrame");
const downloadCsvButton = document.querySelector("#downloadCsv");
const downloadJsonButton = document.querySelector("#downloadJson");

const STORAGE_KEY = "tandem_waitlist_submissions";
const ANALYTICS_STORAGE_KEY = "tandem_validation_events";

const archetypeScores = {
  Builder: 0,
  Stabilizer: 0,
  Accelerator: 0,
  Creator: 0,
  Operator: 0,
  Explorer: 0,
};

const scoringRules = {
  careerMode: {
    "Stable and growing": ["Stabilizer", "Operator"],
    "Building something": ["Builder"],
    "Scaling fast": ["Accelerator", "Builder"],
    "Exploring / transitioning": ["Explorer", "Creator"],
    "Creator / portfolio career": ["Creator"],
    "Early-career growth track": ["Accelerator", "Operator"],
    Other: ["Explorer"],
  },
  riskTolerance: {
    "Low risk / stability first": ["Stabilizer"],
    "Moderate risk": ["Operator", "Stabilizer"],
    "High risk / high upside": ["Builder", "Accelerator"],
    "Currently taking a big career risk": ["Builder"],
    "Prefer a partner who balances my risk level": ["Stabilizer", "Operator"],
  },
  lifestyleRhythm: {
    "Predictable weekdays": ["Stabilizer", "Operator"],
    "Startup chaos": ["Builder"],
    "Travel-heavy": ["Accelerator", "Creator"],
    "Social NYC schedule": ["Creator", "Accelerator"],
    "Quiet and focused": ["Operator", "Stabilizer"],
    "Flexible / varies by season": ["Explorer", "Creator"],
  },
  partnerEnergy: {
    Ambitious: ["Accelerator"],
    "Emotionally grounded": ["Stabilizer"],
    Stable: ["Stabilizer"],
    Creative: ["Creator"],
    Strategic: ["Operator"],
    Adventurous: ["Builder"],
    Curious: ["Explorer"],
    Independent: ["Operator"],
    Supportive: ["Stabilizer", "Operator"],
    "Builder mindset": ["Builder"],
  },
};

function setupTallyEmbed() {
  if (!TALLY_FORM_URL) return;

  tallyFrame.src = TALLY_FORM_URL;
  tallyEmbed.hidden = false;
  form.hidden = true;
  trackEvent("tally_embed_loaded", { urlConfigured: true });
}

function trackEvent(name, metadata = {}) {
  const event = {
    name,
    metadata,
    path: window.location.pathname,
    timestamp: new Date().toISOString(),
  };

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event: name, ...metadata });

  try {
    const events = JSON.parse(localStorage.getItem(ANALYTICS_STORAGE_KEY) || "[]");
    events.push(event);
    localStorage.setItem(ANALYTICS_STORAGE_KEY, JSON.stringify(events.slice(-100)));
  } catch {
    // Analytics should never block the validation flow.
  }
}

function getStoredSubmissions() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  } catch {
    return [];
  }
}

function saveSubmission(submission) {
  const submissions = getStoredSubmissions();
  submissions.push(submission);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(submissions));
}

function addScores(scores, values) {
  values.forEach((value) => {
    scores[value] += 1;
  });
}

function calculateArchetype(data) {
  const scores = { ...archetypeScores };
  const fields = ["careerMode", "riskTolerance", "lifestyleRhythm"];

  fields.forEach((field) => {
    const values = scoringRules[field][data[field]];
    if (values) addScores(scores, values);
  });

  data.partnerEnergy.forEach((energy) => {
    const values = scoringRules.partnerEnergy[energy];
    if (values) addScores(scores, values);
  });

  return Object.entries(scores).sort((a, b) => b[1] - a[1])[0][0];
}

function getFormData() {
  const formData = new FormData(form);
  return {
    submittedAt: new Date().toISOString(),
    name: formData.get("name").trim(),
    email: formData.get("email").trim(),
    age: formData.get("age"),
    location: formData.get("location").trim(),
    gender: formData.get("gender").trim(),
    datingPreference: formData.get("datingPreference").trim(),
    social: formData.get("social").trim(),
    relationshipIntent: formData.get("relationshipIntent"),
    careerMode: formData.get("careerMode"),
    riskTolerance: formData.get("riskTolerance"),
    lifestyleRhythm: formData.get("lifestyleRhythm"),
    mixerInterest: formData.get("mixerInterest"),
    partnerEnergy: formData.getAll("partnerEnergy"),
  };
}

function isValidSubmission(data) {
  return (
    data.name &&
    data.email &&
    data.age &&
    data.location &&
    data.gender &&
    data.datingPreference &&
    data.relationshipIntent &&
    data.careerMode &&
    data.riskTolerance &&
    data.lifestyleRhythm &&
    data.mixerInterest &&
    data.partnerEnergy.length > 0
  );
}

function downloadFile(filename, contents, type) {
  const blob = new Blob([contents], { type });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

function csvEscape(value) {
  const stringValue = Array.isArray(value) ? value.join("; ") : String(value ?? "");
  return `"${stringValue.replaceAll('"', '""')}"`;
}

function downloadCsv() {
  const submissions = getStoredSubmissions();
  const headers = [
    "submittedAt",
    "name",
    "email",
    "age",
    "location",
    "gender",
    "datingPreference",
    "social",
    "relationshipIntent",
    "careerMode",
    "riskTolerance",
    "lifestyleRhythm",
    "mixerInterest",
    "partnerEnergy",
    "archetype",
  ];
  const rows = submissions.map((submission) => headers.map((key) => csvEscape(submission[key])).join(","));
  downloadFile("tandem-waitlist-submissions.csv", [headers.join(","), ...rows].join("\n"), "text/csv");
}

function downloadJson() {
  downloadFile(
    "tandem-waitlist-submissions.json",
    JSON.stringify(getStoredSubmissions(), null, 2),
    "application/json"
  );
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const data = getFormData();

  if (!isValidSubmission(data)) {
    formError.textContent = "Please complete the required fields and choose at least one partner energy.";
    return;
  }

  const archetype = calculateArchetype(data);
  const submission = { ...data, archetype };

  saveSubmission(submission);
  trackEvent("waitlist_completed", {
    archetype,
    mixerInterest: data.mixerInterest,
    careerMode: data.careerMode,
  });
  archetypeResult.textContent = archetype;
  form.hidden = true;
  successState.hidden = false;
  successState.focus();
});

document.querySelectorAll("[data-analytics]").forEach((element) => {
  element.addEventListener("click", () => {
    trackEvent(element.dataset.analytics, { label: element.textContent.trim() });
  });
});

form.addEventListener(
  "input",
  () => {
    trackEvent("waitlist_started");
  },
  { once: true }
);

form.elements.mixerInterest.addEventListener("change", (event) => {
  if (event.target.value) {
    trackEvent("mixer_interest_selected", { mixerInterest: event.target.value });
  }
});

downloadCsvButton.addEventListener("click", () => {
  trackEvent("submissions_exported", { format: "csv" });
  downloadCsv();
});
downloadJsonButton.addEventListener("click", () => {
  trackEvent("submissions_exported", { format: "json" });
  downloadJson();
});

trackEvent("landing_view");
setupTallyEmbed();
