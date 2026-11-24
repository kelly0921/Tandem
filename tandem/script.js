import { QUIZ_QUESTIONS, calculateArchetypeResult, getArchetype } from "./archetype-engine.js";

const QUIZ_STATE_KEY = "tandem_quiz_state_v1";
const QUIZ_RESULT_KEY = "tandem_quiz_result_v1";
const QUIZ_OPTION_SEED_KEY = "tandem_quiz_option_seed_v1";
const REFERRAL_SOURCE_KEY = "tandem_referral_source_v1";

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const urlParams = new URLSearchParams(window.location.search);
const referralSource = getReferralSource();

const quizShell = document.querySelector("#quizShell");
const quizIntro = document.querySelector("#quizIntro");
const quizForm = document.querySelector("#quizForm");
const quizResult = document.querySelector("#quizResult");
const quizStart = document.querySelector("#quizStart");
const quizQuestionText = document.querySelector("#quizQuestionText");
const quizQuestionHint = document.querySelector("#quizQuestionHint");
const quizOptions = document.querySelector("#quizOptions");
const quizStepLabel = document.querySelector("#quizStepLabel");
const quizProgressBar = document.querySelector("#quizProgressBar");
const quizBack = document.querySelector("#quizBack");
const quizNext = document.querySelector("#quizNext");
const quizError = document.querySelector("#quizError");
const resultImage = document.querySelector("#resultImage");
const resultTitle = document.querySelector("#resultTitle");
const resultHeadline = document.querySelector("#resultHeadline");
const resultDescription = document.querySelector("#resultDescription");
const resultSecondary = document.querySelector("#resultSecondary");
const resultDisclaimer = document.querySelector("#resultDisclaimer");
const resultJoin = document.querySelector("#resultJoin");
const resultRetake = document.querySelector("#resultRetake");
const resultShare = document.querySelector("#resultShare");
const resultShareStatus = document.querySelector("#resultShareStatus");
const resultEmailForm = document.querySelector("#resultEmailForm");
const resultEmailSubmit = document.querySelector("#resultEmailSubmit");
const resultEmailStatus = document.querySelector("#resultEmailStatus");

const communityForm = document.querySelector("#communityForm");
const communitySteps = [...document.querySelectorAll("#communityForm .form-step")];
const communityBack = document.querySelector("#communityBack");
const communityNext = document.querySelector("#communityNext");
const communitySubmit = document.querySelector("#communitySubmit");
const communityStepLabel = document.querySelector("#communityStepLabel");
const communityProgressBar = document.querySelector("#communityProgressBar");
const communityError = document.querySelector("#communityError");
const communitySuccess = document.querySelector("#communitySuccess");
const communityArchetypeNote = document.querySelector("#communityArchetypeNote");
const referralLink = document.querySelector("#referralLink");
const referralShare = document.querySelector("#referralShare");
const referralCopyStatus = document.querySelector("#referralCopyStatus");

const partnerForm = document.querySelector("#partnerForm");
const partnerSuccess = document.querySelector("#partnerSuccess");
const partnerError = document.querySelector("#partnerError");

const quizState = restoreQuizState();
let communityStep = 0;

function normalizePublicCode(value) {
  return String(value || "")
    .trim()
    .replace(/[^a-zA-Z0-9_-]/g, "")
    .slice(0, 80);
}

function getReferralSource() {
  const fromUrl = normalizePublicCode(urlParams.get("ref"));
  if (fromUrl) {
    try {
      sessionStorage.setItem(REFERRAL_SOURCE_KEY, fromUrl);
    } catch {
      // Referral tracking should never block the page.
    }
    return fromUrl;
  }

  try {
    return normalizePublicCode(sessionStorage.getItem(REFERRAL_SOURCE_KEY));
  } catch {
    return "";
  }
}

function setupReferralLinkPropagation() {
  if (!referralSource) return;
  document.querySelectorAll('a[href^="./join.html"], a[href^="join.html"]').forEach((link) => {
    const url = new URL(link.getAttribute("href"), window.location.href);
    url.searchParams.set("ref", referralSource);
    link.href = url.pathname.split("/").pop() + url.search + url.hash;
  });
}

function trackEvent(name) {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: name,
    path: window.location.pathname,
    timestamp: new Date().toISOString(),
  });
}

function getPageEventName() {
  const fileName = window.location.pathname.split("/").filter(Boolean).pop() || "home";
  const page = {
    "tandem": "home",
    "index.html": "home",
    "quiz.html": "quiz",
    "join.html": "join",
    "partners.html": "partners",
    "privacy.html": "privacy",
  }[fileName] || fileName.replace(/\.html$/, "");

  return `tandem_${page}_view`;
}

function getQuizSeed() {
  try {
    const existing = sessionStorage.getItem(QUIZ_OPTION_SEED_KEY);
    if (existing) return existing;
    const seed = crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random()}`;
    sessionStorage.setItem(QUIZ_OPTION_SEED_KEY, seed);
    return seed;
  } catch {
    return "tandem";
  }
}

function hashString(value) {
  let hash = 0;
  for (let index = 0; index < value.length; index += 1) {
    hash = (hash * 31 + value.charCodeAt(index)) >>> 0;
  }
  return hash;
}

function getDisplayOptions(question) {
  const seed = getQuizSeed();
  return [...question.options].sort((a, b) => {
    const aHash = hashString(`${seed}:${question.id}:${a.id}`);
    const bHash = hashString(`${seed}:${question.id}:${b.id}`);
    return aHash - bHash;
  });
}

function restoreQuizState() {
  try {
    const saved = JSON.parse(sessionStorage.getItem(QUIZ_STATE_KEY) || "{}");
    return {
      index: Number.isInteger(saved.index) ? saved.index : 0,
      answers: saved.answers && typeof saved.answers === "object" ? saved.answers : {},
    };
  } catch {
    return { index: 0, answers: {} };
  }
}

function saveQuizState() {
  try {
    sessionStorage.setItem(QUIZ_STATE_KEY, JSON.stringify(quizState));
  } catch {
    // Quiz recovery is helpful, but not required for the experience to work.
  }
}

function saveQuizResult(result) {
  try {
    sessionStorage.setItem(QUIZ_RESULT_KEY, JSON.stringify(result));
  } catch {
    // The result can still be shown without session storage.
  }
}

function getSavedQuizResult() {
  try {
    const result = JSON.parse(sessionStorage.getItem(QUIZ_RESULT_KEY) || "{}");
    return result.primary && result.secondary ? result : null;
  } catch {
    return null;
  }
}

function clearSavedQuizResult() {
  try {
    sessionStorage.removeItem(QUIZ_RESULT_KEY);
  } catch {
    // No-op.
  }
}

function resetQuizForFreshRun() {
  quizState.index = 0;
  quizState.answers = {};
  saveQuizState();
  clearSavedQuizResult();
}

function setupQuiz() {
  if (!quizShell) return;

  quizStart?.addEventListener("click", () => {
    if (getSavedQuizResult()) {
      resetQuizForFreshRun();
    }
    quizIntro.hidden = true;
    quizForm.hidden = false;
    quizResult.hidden = true;
    quizState.index = Math.min(quizState.index, QUIZ_QUESTIONS.length - 1);
    renderQuizQuestion();
    trackEvent("archetype_quiz_started");
  });

  quizBack?.addEventListener("click", () => {
    if (quizState.index === 0) {
      quizForm.hidden = true;
      quizIntro.hidden = false;
      quizError.textContent = "";
      return;
    }
    quizState.index -= 1;
    saveQuizState();
    renderQuizQuestion();
  });

  quizNext?.addEventListener("click", () => {
    const question = QUIZ_QUESTIONS[quizState.index];
    if (!quizState.answers[question.id]) {
      quizError.textContent = "Choose the answer that feels closest before continuing.";
      return;
    }

    if (quizState.index === QUIZ_QUESTIONS.length - 1) {
      const result = calculateArchetypeResult(quizState.answers);
      saveQuizResult(result);
      showQuizResult(result);
      trackEvent("archetype_quiz_completed");
      trackEvent(`archetype_result_${result.primary.toLowerCase()}`);
      return;
    }

    quizState.index += 1;
    saveQuizState();
    renderQuizQuestion();
  });

  resultRetake?.addEventListener("click", () => {
    resetQuizForFreshRun();
    resetResultEmailForm();
    quizResult.hidden = true;
    quizIntro.hidden = true;
    quizForm.hidden = false;
    renderQuizQuestion();
    trackEvent("archetype_quiz_started");
  });

  resultShare?.addEventListener("click", shareQuizResult);

  resultJoin?.addEventListener("click", () => {
    const result = getSavedQuizResult();
    if (result) {
      applyArchetypeToCommunityForm(result, "archetype_quiz");
    }
  });

  setupResultEmailForm();
}

function renderQuizQuestion() {
  const question = QUIZ_QUESTIONS[quizState.index];
  const progress = ((quizState.index + 1) / QUIZ_QUESTIONS.length) * 100;
  quizQuestionText.textContent = question.title;
  quizQuestionHint.textContent = question.hint;
  quizStepLabel.textContent = `Question ${quizState.index + 1} of ${QUIZ_QUESTIONS.length}`;
  quizProgressBar.style.width = `${progress}%`;
  quizBack.textContent = quizState.index === 0 ? "Back to intro" : "Back";
  quizNext.textContent = quizState.index === QUIZ_QUESTIONS.length - 1 ? "Reveal my archetype" : "Continue";
  quizError.textContent = "";

  const selected = quizState.answers[question.id];
  quizOptions.innerHTML = "";
  getDisplayOptions(question).forEach((option) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "quiz-option";
    button.dataset.optionId = option.id;
    button.setAttribute("aria-pressed", String(option.id === selected));
    button.innerHTML = `<span>${option.text}</span>`;
    button.addEventListener("click", () => {
      quizState.answers[question.id] = option.id;
      saveQuizState();
      quizError.textContent = "";
      [...quizOptions.querySelectorAll(".quiz-option")].forEach((item) => {
        item.setAttribute("aria-pressed", String(item.dataset.optionId === option.id));
      });
    });
    quizOptions.appendChild(button);
  });
}

function showQuizResult(result, options = {}) {
  const primary = getArchetype(result.primary);
  const secondary = getArchetype(result.secondary);
  quizIntro.hidden = true;
  quizForm.hidden = true;
  quizResult.hidden = false;

  resultImage.src = primary.image;
  resultImage.alt = `${primary.name} archetype illustration`;
  resultTitle.textContent = `You are a ${primary.name}.`;
  resultHeadline.textContent = primary.headline;
  resultDescription.textContent = primary.description;
  resultSecondary.textContent = `${secondary.name}: you also lean toward ${secondary.secondaryLabel}.`;
  resultDisclaimer.textContent =
    "This is not a personality diagnosis or compatibility score. It is a shorthand for how you tend to approach ambition and building a life.";
  if (resultEmailForm) {
    resultEmailForm.elements.primary_archetype.value = result.primary;
    resultEmailForm.elements.secondary_archetype.value = result.secondary;
    resultEmailStatus.textContent = "";
    resultEmailStatus.classList.remove("is-success");
  }

  applyArchetypeToCommunityForm(result, options.restored ? "archetype_quiz_saved" : "archetype_quiz");
}

function resetResultEmailForm() {
  resultEmailForm?.reset();
  if (resultEmailStatus) {
    resultEmailStatus.textContent = "";
    resultEmailStatus.classList.remove("is-success");
  }
}

function setupResultEmailForm() {
  if (!resultEmailForm) return;

  resultEmailForm.addEventListener(
    "input",
    () => {
      trackEvent("result_email_started");
    },
    { once: true }
  );

  resultEmailForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    resultEmailStatus.textContent = "";
    resultEmailStatus.classList.remove("is-success");

    const result = getSavedQuizResult();
    if (!result) {
      resultEmailStatus.textContent = "Finish the quiz first, then you can email yourself the result.";
      return;
    }

    resultEmailForm.elements.primary_archetype.value = result.primary;
    resultEmailForm.elements.secondary_archetype.value = result.secondary;

    if (!resultEmailForm.checkValidity()) {
      resultEmailStatus.textContent = "Enter a valid email to receive your result.";
      resultEmailForm.reportValidity();
      return;
    }

    resultEmailSubmit.disabled = true;
    resultEmailSubmit.textContent = "Sending...";

    try {
      const payload = collectResultEmailPayload();
      const response = await fetch("/api/tandem/result", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Result email request failed");
      }

      const data = await response.json();
      resultEmailStatus.classList.add("is-success");
      resultEmailStatus.textContent = data.emailSent
        ? "Sent. Check your inbox for your Tandem result."
        : "Saved. Email delivery is not enabled here yet, but your result request is recorded.";
      trackEvent("result_email_requested");
      if (data.emailSent) trackEvent("result_email_sent");
    } catch {
      resultEmailStatus.textContent =
        "Something did not send. If you are previewing locally, run the site with Wrangler to test saving.";
    } finally {
      resultEmailSubmit.disabled = false;
      resultEmailSubmit.textContent = "Email me my result";
    }
  });
}

function collectResultEmailPayload() {
  const form = resultEmailForm.elements;
  return {
    first_name: form.first_name.value,
    email: form.email.value,
    primary_archetype: form.primary_archetype.value,
    secondary_archetype: form.secondary_archetype.value,
    marketing_consent: form.marketing_consent.checked,
    company: form.company.value,
  };
}

async function shareQuizResult() {
  const result = getSavedQuizResult();
  if (!result) return;
  const primary = getArchetype(result.primary);
  const shareData = {
    title: "My Tandem Ambition Archetype",
    text: `I got ${primary.name} on Tandem: ${primary.headline}`,
    url: `${window.location.origin}${window.location.pathname}#quiz`,
  };

  try {
    if (navigator.share) {
      await navigator.share(shareData);
    } else {
      await navigator.clipboard.writeText(`${shareData.text} ${shareData.url}`);
      resultShareStatus.textContent = "Copied.";
    }
    trackEvent("referral_share_clicked");
  } catch {
    resultShareStatus.textContent = "Sharing did not work here, but your result is saved on this device.";
  }
}

function applyArchetypeToCommunityForm(result, source) {
  if (!communityForm || !result?.primary || !result?.secondary) return;
  communityForm.elements.primary_archetype.value = result.primary;
  communityForm.elements.secondary_archetype.value = result.secondary;
  communityForm.elements.signup_source.value = source;

  const primary = getArchetype(result.primary);
  const secondary = getArchetype(result.secondary);
  communityArchetypeNote.innerHTML = `
    <strong>Your Tandem archetype: ${primary.name}</strong>
    <span>Secondary energy: ${secondary.name}. We will carry this into signup, but you can also join without taking the quiz.</span>
  `;
}

function setupCommunityForm() {
  if (!communityForm) return;

  communityForm.elements.referral_source.value = referralSource;
  const savedResult = getSavedQuizResult();
  if (savedResult) {
    applyArchetypeToCommunityForm(savedResult, "archetype_quiz_saved");
  }

  communityForm.addEventListener(
    "input",
    () => {
      trackEvent("founding_form_started");
    },
    { once: true }
  );

  communityBack.addEventListener("click", () => {
    if (communityStep === 0) return;
    communityStep -= 1;
    renderCommunityStep();
  });

  communityNext.addEventListener("click", () => {
    if (!validateStep(communitySteps[communityStep], communityError)) return;
    communityStep += 1;
    renderCommunityStep();
  });

  communityForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (!validateStep(communitySteps[communityStep], communityError)) return;
    communityError.textContent = "";
    communitySubmit.disabled = true;
    communitySubmit.textContent = "Sending...";

    try {
      const payload = collectCommunityPayload();
      const response = await fetch("/api/tandem/community", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Submission failed");
      }

      const data = await response.json();
      showCommunitySuccess(data.referralCode);
      trackEvent("founding_form_completed");
    } catch {
      communityError.textContent =
        "Something did not send. If you are previewing locally, run the site with Wrangler to test saving.";
    } finally {
      communitySubmit.disabled = false;
      communitySubmit.textContent = "Join the founding list";
    }
  });

  renderCommunityStep();
}

function renderCommunityStep() {
  const progress = ((communityStep + 1) / communitySteps.length) * 100;
  communitySteps.forEach((step, index) => {
    step.hidden = index !== communityStep;
    step.classList.toggle("is-active", index === communityStep);
  });
  communityStepLabel.textContent = `Step ${communityStep + 1} of ${communitySteps.length}`;
  communityProgressBar.style.width = `${progress}%`;
  communityBack.disabled = communityStep === 0;
  communityNext.hidden = communityStep === communitySteps.length - 1;
  communitySubmit.hidden = communityStep !== communitySteps.length - 1;
  communityError.textContent = "";
}

function validateStep(step, errorElement) {
  const invalidControl = [...step.querySelectorAll("input, select, textarea")].find((control) => {
    if (control.type === "hidden" || control.closest(".honeypot-field")) return false;
    return !control.checkValidity();
  });

  if (invalidControl) {
    errorElement.textContent = "Please complete the highlighted field before continuing.";
    invalidControl.focus();
    return false;
  }

  const missingGroup = [...step.querySelectorAll("[data-required-group]")].find((group) => {
    const name = group.dataset.requiredGroup;
    return !step.querySelector(`input[name="${name}"]:checked`);
  });

  if (missingGroup) {
    errorElement.textContent = missingGroup.dataset.error || "Please choose at least one option before continuing.";
    const firstOption = missingGroup.querySelector("input");
    firstOption?.focus();
    return false;
  }

  return true;
}

function valuesFor(name, form = communityForm) {
  return [...form.querySelectorAll(`input[name="${name}"]:checked`)].map((input) => input.value);
}

function collectCommunityPayload() {
  const form = communityForm.elements;
  return {
    first_name: form.first_name.value,
    email: form.email.value,
    age_range: form.age_range.value,
    location_area: form.location_area.value,
    neighborhood: form.neighborhood.value,
    gender_identity: form.gender_identity.value,
    gender_self_description: form.gender_self_description.value,
    interested_in: valuesFor("interested_in"),
    relationship_intention: form.relationship_intention.value,
    event_interest: form.event_interest.value,
    availability: valuesFor("availability"),
    interest_reason: form.interest_reason.value,
    acquisition_source: form.acquisition_source.value,
    referral_source: form.referral_source.value,
    social_link: form.social_link.value,
    primary_archetype: form.primary_archetype.value,
    secondary_archetype: form.secondary_archetype.value,
    source: form.signup_source.value || (form.primary_archetype.value ? "archetype_quiz_saved" : "direct"),
    marketing_consent: form.marketing_consent.checked,
    company: form.company.value,
  };
}

function showCommunitySuccess(referralCode) {
  communityForm.hidden = true;
  communitySuccess.hidden = false;
  communitySuccess.focus();

  const code = normalizePublicCode(referralCode) || normalizePublicCode(referralSource) || "founding";
  const homeUrl = new URL("./", window.location.href);
  homeUrl.searchParams.set("ref", code);
  const url = homeUrl.toString();
  referralLink.value = url;
}

function setupReferralShare() {
  referralShare?.addEventListener("click", async () => {
    const url = referralLink.value;
    try {
      if (navigator.share) {
        await navigator.share({
          title: "Tandem founding NYC list",
          text: "Know someone thoughtful who belongs in Tandem?",
          url,
        });
      } else {
        await navigator.clipboard.writeText(url);
        referralCopyStatus.textContent = "Copied.";
      }
      trackEvent("referral_share_clicked");
    } catch {
      referralCopyStatus.textContent = "Sharing did not work here, but the link is ready to copy.";
    }
  });
}

function setupPartnerForm() {
  if (!partnerForm) return;

  partnerForm.addEventListener(
    "input",
    () => {
      trackEvent("partner_inquiry_started");
    },
    { once: true }
  );

  partnerForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    partnerError.textContent = "";
    if (!partnerForm.checkValidity()) {
      partnerError.textContent = "Please complete the required partner fields before sending.";
      partnerForm.reportValidity();
      return;
    }

    const button = partnerForm.querySelector("button[type='submit']");
    button.disabled = true;
    button.textContent = "Sending...";

    try {
      const payload = collectPartnerPayload();
      const response = await fetch("/api/tandem/partners", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Partner inquiry failed");
      }

      partnerForm.hidden = true;
      partnerSuccess.hidden = false;
      partnerSuccess.focus();
      trackEvent("partner_inquiry_completed");
    } catch {
      partnerError.textContent =
        "Something did not send. If you are previewing locally, run the site with Wrangler to test saving.";
    } finally {
      button.disabled = false;
      button.textContent = "Send partner inquiry";
    }
  });
}

function collectPartnerPayload() {
  const form = partnerForm.elements;
  return {
    name: form.name.value,
    email: form.email.value,
    organization: form.organization.value,
    website_or_social: form.website_or_social.value,
    organization_type: form.organization_type.value,
    audience_size: form.audience_size.value,
    collaboration_interest: form.collaboration_interest.value,
    notes: form.notes.value,
    company: form.company.value,
  };
}

function setupScrollReveals() {
  const revealSelectors = [
    ".dating-signal-inner > *",
    ".premise-inner > *",
    ".aha-card > .eyebrow",
    ".aha-card > h2",
    ".aha-subcopy",
    ".formula-stage",
    ".combo-card",
    ".aha-line",
    ".archetype-bridge > div",
    ".section-heading > *",
    ".archetype-card",
    ".steps-copy > *",
    ".flow-page-hero > *",
    ".form-intro > *",
  ];

  const revealElements = [...new Set(revealSelectors.flatMap((selector) => [...document.querySelectorAll(selector)]))];

  revealElements.forEach((element, index) => {
    element.classList.add("reveal-on-scroll");
    element.style.setProperty("--reveal-delay", `${Math.min((index % 6) * 70, 350)}ms`);
  });

  if (prefersReducedMotion || !("IntersectionObserver" in window)) {
    revealElements.forEach((element) => element.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    { rootMargin: "0px 0px -12% 0px", threshold: 0.12 }
  );

  revealElements.forEach((element) => observer.observe(element));
}

document.querySelectorAll("[data-analytics]").forEach((element) => {
  element.addEventListener("click", () => {
    trackEvent(element.dataset.analytics);
  });
});

trackEvent(getPageEventName());
setupReferralLinkPropagation();
setupQuiz();
setupCommunityForm();
setupReferralShare();
setupPartnerForm();
setupScrollReveals();
