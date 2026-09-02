const TALLY_FORM_ID = "0QyVD6";
const TALLY_PUBLIC_URL = `https://tally.so/r/${TALLY_FORM_ID}`;
const TALLY_EMBED_URL = `https://tally.so/embed/${TALLY_FORM_ID}?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1`;

const tallyFrame = document.querySelector("#tallyFrame");
const tallyDirectLink = document.querySelector("#tallyDirectLink");
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function setupTallyEmbed() {
  if (tallyFrame) {
    tallyFrame.src = TALLY_EMBED_URL;
    tallyFrame.addEventListener(
      "load",
      () => {
        trackEvent("founding_form_loaded");
      },
      { once: true }
    );
  }

  if (tallyDirectLink) {
    tallyDirectLink.href = TALLY_PUBLIC_URL;
  }
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
    ".steps-list li",
    ".form-intro > *",
    ".form-routing",
    ".tally-shell",
    ".privacy-note",
    ".partner-inner > *",
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

function trackEvent(name, metadata = {}) {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: name,
    path: window.location.pathname,
    timestamp: new Date().toISOString(),
    ...metadata,
  });
}

document.querySelectorAll("[data-analytics]").forEach((element) => {
  element.addEventListener("click", () => {
    trackEvent(element.dataset.analytics, { label: element.textContent.trim() });
  });
});

trackEvent("landing_view");
setupTallyEmbed();
setupScrollReveals();
