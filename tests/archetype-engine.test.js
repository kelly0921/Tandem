import test from "node:test";
import assert from "node:assert/strict";
import { ARCHETYPE_ORDER, QUIZ_QUESTIONS, calculateArchetypeResult } from "../tandem/archetype-engine.js";

const representativePaths = {
  Builder: {
    chapter: "chapter-own",
    risk: "risk-bet",
    rhythm: "rhythm-starting",
    ideas: "ideas-start",
    progress: "progress-new",
    change: "change-rebuild",
    group: "group-spark",
    optimize: "optimize-upside",
  },
  Stabilizer: {
    chapter: "chapter-steady",
    risk: "risk-protect",
    rhythm: "rhythm-structured",
    ideas: "ideas-protect",
    progress: "progress-secure",
    change: "change-stabilize",
    group: "group-calm",
    optimize: "optimize-security",
  },
  Accelerator: {
    chapter: "chapter-next",
    risk: "risk-speed",
    rhythm: "rhythm-full",
    ideas: "ideas-strategy",
    progress: "progress-exceptional",
    change: "change-optimize",
    group: "group-pace",
    optimize: "optimize-momentum",
  },
  Creator: {
    chapter: "chapter-multi",
    risk: "risk-meaning",
    rhythm: "rhythm-expressive",
    ideas: "ideas-shape",
    progress: "progress-expression",
    change: "change-reframe",
    group: "group-story",
    optimize: "optimize-expression",
  },
  Operator: {
    chapter: "chapter-systems",
    risk: "risk-model",
    rhythm: "rhythm-deep",
    ideas: "ideas-process",
    progress: "progress-working",
    change: "change-system",
    group: "group-execution",
    optimize: "optimize-execution",
  },
  Explorer: {
    chapter: "chapter-searching",
    risk: "risk-prototype",
    rhythm: "rhythm-open",
    ideas: "ideas-versions",
    progress: "progress-direction",
    change: "change-alternatives",
    group: "group-questions",
    optimize: "optimize-optionality",
  },
};

test("quiz contains eight self-oriented questions", () => {
  assert.equal(QUIZ_QUESTIONS.length, 8);
  assert.deepEqual(
    QUIZ_QUESTIONS.map((question) => question.id),
    ["chapter", "risk", "rhythm", "ideas", "progress", "change", "group", "optimize"]
  );
});

for (const archetype of ARCHETYPE_ORDER) {
  test(`representative path returns ${archetype} as the primary archetype`, () => {
    const result = calculateArchetypeResult(representativePaths[archetype]);
    assert.equal(result.primary, archetype);
    assert.ok(ARCHETYPE_ORDER.includes(result.secondary));
    assert.notEqual(result.secondary, result.primary);
  });
}

test("tie breaking is deterministic", () => {
  const result = calculateArchetypeResult({});
  assert.equal(result.primary, "Builder");
  assert.equal(result.secondary, "Stabilizer");
});

test("partner preference fields do not affect participant archetype score", () => {
  const result = calculateArchetypeResult({
    ...representativePaths.Operator,
    partnerEnergy: ["Ambitious", "Creative", "Builder mindset"],
  });

  assert.equal(result.primary, "Operator");
});
