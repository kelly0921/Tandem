const ARCHETYPE_ORDER = ["Builder", "Stabilizer", "Accelerator", "Creator", "Operator", "Explorer"];

const ARCHETYPES = {
  Builder: {
    name: "Builder",
    adjective: "opportunity-maker",
    headline: "You tend to create opportunities rather than wait for them.",
    description:
      "You are comfortable starting before everything is certain, learning through action, and building your own path.",
    secondaryLabel: "turning motion into something real",
    image: "../assets/archetypes/tandem-archetype-builder-v2.png",
  },
  Stabilizer: {
    name: "Stabilizer",
    adjective: "steadying force",
    headline: "You tend to make ambition feel grounded enough to last.",
    description:
      "You value rhythm, care, and a life that can support big goals without losing its center.",
    secondaryLabel: "protecting the foundation while life grows",
    image: "../assets/archetypes/tandem-archetype-stabilizer-v2.png",
  },
  Accelerator: {
    name: "Accelerator",
    adjective: "momentum-seeker",
    headline: "You tend to look for the next level and move toward it quickly.",
    description:
      "You are energized by growth, challenge, and the feeling that your life is expanding toward something sharper.",
    secondaryLabel: "raising the ceiling and keeping pace",
    image: "../assets/archetypes/tandem-archetype-accelerator-v2.png",
  },
  Creator: {
    name: "Creator",
    adjective: "meaning-maker",
    headline: "You tend to turn ideas, taste, and perspective into momentum.",
    description:
      "You care about expression, audience, originality, and making a life that feels recognizably yours.",
    secondaryLabel: "making ambition feel alive and personal",
    image: "../assets/archetypes/tandem-archetype-creator-v2.png",
  },
  Operator: {
    name: "Operator",
    adjective: "follow-through engine",
    headline: "You tend to make good ideas work in the real world.",
    description:
      "You notice what needs structure, build the system, and keep the plan moving after the first spark fades.",
    secondaryLabel: "turning intention into repeatable action",
    image: "../assets/archetypes/tandem-archetype-operator-v2.png",
  },
  Explorer: {
    name: "Explorer",
    adjective: "possibility-scout",
    headline: "You tend to learn your direction by testing what feels true.",
    description:
      "You are open to new versions of yourself, and you would rather discover a real fit than force a path too early.",
    secondaryLabel: "keeping the future open while you choose",
    image: "../assets/archetypes/tandem-archetype-explorer-v2.png",
  },
};

const QUIZ_QUESTIONS = [
  {
    id: "chapter",
    title: "Which best describes the chapter you are in right now?",
    hint: "Choose the one that feels closest, even if your real life is messier.",
    options: [
      {
        id: "chapter-steady",
        text: "I am growing steadily in a path I care about.",
        weights: { Stabilizer: 3, Operator: 1, Accelerator: 1 },
      },
      {
        id: "chapter-own",
        text: "I am building something of my own, even if it is still early.",
        weights: { Builder: 3, Creator: 1, Explorer: 1 },
      },
      {
        id: "chapter-next",
        text: "I am moving quickly and looking for the next level.",
        weights: { Accelerator: 3, Builder: 1, Operator: 1 },
      },
      {
        id: "chapter-multi",
        text: "I am creating across several interests, projects, or communities.",
        weights: { Creator: 3, Explorer: 1, Builder: 1 },
      },
      {
        id: "chapter-systems",
        text: "I am turning ideas into a more reliable way of living.",
        weights: { Operator: 3, Stabilizer: 1, Builder: 1 },
      },
      {
        id: "chapter-searching",
        text: "I am actively figuring out which direction fits me best.",
        weights: { Explorer: 3, Creator: 1, Stabilizer: 1 },
      },
    ],
  },
  {
    id: "risk",
    title: "When a high-upside opportunity appears, what is your instinct?",
    hint: "Think about your first honest reaction before you talk yourself into the polished answer.",
    options: [
      {
        id: "risk-protect",
        text: "I check what it could destabilize before I get excited.",
        weights: { Stabilizer: 3, Operator: 1 },
      },
      {
        id: "risk-model",
        text: "I map the tradeoffs and decide where the risk actually sits.",
        weights: { Operator: 3, Stabilizer: 1, Accelerator: 1 },
      },
      {
        id: "risk-bet",
        text: "If the upside is real, I can take the calculated leap.",
        weights: { Builder: 3, Accelerator: 1 },
      },
      {
        id: "risk-speed",
        text: "I move fast while the window is open.",
        weights: { Accelerator: 3, Builder: 1 },
      },
      {
        id: "risk-prototype",
        text: "I test a small version first and see what I learn.",
        weights: { Explorer: 3, Creator: 1, Operator: 1 },
      },
      {
        id: "risk-meaning",
        text: "I pursue it if it gives me a more meaningful thing to make.",
        weights: { Creator: 3, Builder: 1, Explorer: 1 },
      },
    ],
  },
  {
    id: "rhythm",
    title: "What does a good week feel like to you?",
    hint: "Not your ideal Instagram week. The rhythm that actually makes you feel like yourself.",
    options: [
      {
        id: "rhythm-structured",
        text: "Structured enough that I can trust myself to show up.",
        weights: { Stabilizer: 3, Operator: 1 },
      },
      {
        id: "rhythm-deep",
        text: "Deeply focused, with protected time for the thing that matters.",
        weights: { Operator: 3, Stabilizer: 1, Creator: 1 },
      },
      {
        id: "rhythm-full",
        text: "Full, fast, and a little intense in a way that energizes me.",
        weights: { Accelerator: 3, Builder: 1 },
      },
      {
        id: "rhythm-open",
        text: "Flexible, varied, and open to a few useful surprises.",
        weights: { Explorer: 3, Creator: 1 },
      },
      {
        id: "rhythm-expressive",
        text: "Social or expressive, with room to make something people can feel.",
        weights: { Creator: 3, Accelerator: 1 },
      },
      {
        id: "rhythm-starting",
        text: "A mix of momentum, experiments, and things I am getting off the ground.",
        weights: { Builder: 3, Explorer: 1 },
      },
    ],
  },
  {
    id: "ideas",
    title: "When an idea grabs you, what usually happens next?",
    hint: "The pattern matters more than the specific idea.",
    options: [
      {
        id: "ideas-start",
        text: "I start making it real so I can learn from motion.",
        weights: { Builder: 3, Creator: 1 },
      },
      {
        id: "ideas-strategy",
        text: "I place it inside a larger strategy before I chase it.",
        weights: { Accelerator: 3, Operator: 1 },
      },
      {
        id: "ideas-shape",
        text: "I turn it into something with a clear voice, taste, or point of view.",
        weights: { Creator: 3, Builder: 1 },
      },
      {
        id: "ideas-versions",
        text: "I explore a few versions before deciding what it wants to become.",
        weights: { Explorer: 3, Creator: 1 },
      },
      {
        id: "ideas-process",
        text: "I figure out the process that would make it sustainable.",
        weights: { Operator: 3, Stabilizer: 1 },
      },
      {
        id: "ideas-protect",
        text: "I decide whether it deserves to disrupt the life I have been building.",
        weights: { Stabilizer: 3, Operator: 1 },
      },
    ],
  },
  {
    id: "progress",
    title: "What kind of progress feels most satisfying?",
    hint: "The answer you would feel proud of even if nobody posted about it.",
    options: [
      {
        id: "progress-new",
        text: "Creating something that did not exist before.",
        weights: { Builder: 3, Creator: 1 },
      },
      {
        id: "progress-exceptional",
        text: "Becoming undeniably better at a path I care about.",
        weights: { Accelerator: 3, Operator: 1 },
      },
      {
        id: "progress-secure",
        text: "Building a life that feels secure, calm, and durable.",
        weights: { Stabilizer: 3, Operator: 1 },
      },
      {
        id: "progress-working",
        text: "Watching a system work because I built it well.",
        weights: { Operator: 3, Stabilizer: 1 },
      },
      {
        id: "progress-expression",
        text: "Making something that feels honest, resonant, or culturally alive.",
        weights: { Creator: 3, Explorer: 1 },
      },
      {
        id: "progress-direction",
        text: "Discovering a direction that feels more like mine.",
        weights: { Explorer: 3, Builder: 1 },
      },
    ],
  },
  {
    id: "change",
    title: "What happens when your original plan stops making sense?",
    hint: "Imagine the plan has stopped fitting, not just become inconvenient.",
    options: [
      {
        id: "change-rebuild",
        text: "I rebuild quickly and keep moving.",
        weights: { Builder: 3, Accelerator: 1 },
      },
      {
        id: "change-optimize",
        text: "I look for the adjustment that gets the most leverage.",
        weights: { Accelerator: 3, Operator: 1 },
      },
      {
        id: "change-stabilize",
        text: "I slow down enough to protect what still matters.",
        weights: { Stabilizer: 3, Explorer: 1 },
      },
      {
        id: "change-system",
        text: "I redesign the structure so the next plan is less fragile.",
        weights: { Operator: 3, Stabilizer: 1 },
      },
      {
        id: "change-reframe",
        text: "I reinterpret it and look for a more interesting way through.",
        weights: { Creator: 3, Explorer: 1 },
      },
      {
        id: "change-alternatives",
        text: "I try other paths until one starts to feel honest.",
        weights: { Explorer: 3, Creator: 1 },
      },
    ],
  },
  {
    id: "group",
    title: "When you are building with other people, what role do you naturally fall into?",
    hint: "Not the title you want. The thing people often rely on you for.",
    options: [
      {
        id: "group-spark",
        text: "I create the first spark and get people moving.",
        weights: { Builder: 3, Accelerator: 1 },
      },
      {
        id: "group-calm",
        text: "I keep the group grounded when things get noisy.",
        weights: { Stabilizer: 3, Operator: 1 },
      },
      {
        id: "group-pace",
        text: "I raise the pace and push toward a clearer win.",
        weights: { Accelerator: 3, Builder: 1 },
      },
      {
        id: "group-story",
        text: "I shape the story, feeling, or creative direction.",
        weights: { Creator: 3, Explorer: 1 },
      },
      {
        id: "group-execution",
        text: "I notice the moving pieces and make sure they land.",
        weights: { Operator: 3, Stabilizer: 1 },
      },
      {
        id: "group-questions",
        text: "I ask the questions that open up better possibilities.",
        weights: { Explorer: 3, Creator: 1 },
      },
    ],
  },
  {
    id: "optimize",
    title: "What are you optimizing for most in this stage of life?",
    hint: "The thing that keeps quietly steering your decisions.",
    options: [
      {
        id: "optimize-upside",
        text: "Upside: I want room for the big swing.",
        weights: { Builder: 3, Accelerator: 1 },
      },
      {
        id: "optimize-momentum",
        text: "Momentum: I want the next version of myself to arrive faster.",
        weights: { Accelerator: 3, Builder: 1 },
      },
      {
        id: "optimize-security",
        text: "Security: I want the life I am building to hold.",
        weights: { Stabilizer: 3, Operator: 1 },
      },
      {
        id: "optimize-expression",
        text: "Expression: I want my life to reflect what I actually care about.",
        weights: { Creator: 3, Explorer: 1 },
      },
      {
        id: "optimize-execution",
        text: "Execution: I want more follow-through and less friction.",
        weights: { Operator: 3, Stabilizer: 1 },
      },
      {
        id: "optimize-optionality",
        text: "Optionality: I want space to discover what is next.",
        weights: { Explorer: 3, Creator: 1 },
      },
    ],
  },
];

function createEmptyScores() {
  return ARCHETYPE_ORDER.reduce((scores, archetype) => {
    scores[archetype] = 0;
    return scores;
  }, {});
}

function addWeights(scores, weights = {}) {
  Object.entries(weights).forEach(([archetype, points]) => {
    if (Object.prototype.hasOwnProperty.call(scores, archetype)) {
      scores[archetype] += points;
    }
  });
}

function calculateArchetypeResult(answers) {
  const scores = createEmptyScores();

  QUIZ_QUESTIONS.forEach((question) => {
    const selectedId = answers[question.id];
    const selectedOption = question.options.find((option) => option.id === selectedId);
    if (selectedOption) {
      addWeights(scores, selectedOption.weights);
    }
  });

  const ranked = ARCHETYPE_ORDER.map((name, index) => ({ name, score: scores[name], index })).sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    return a.index - b.index;
  });

  return {
    primary: ranked[0].name,
    secondary: ranked[1].name,
    scores,
    answered: Object.keys(answers).filter(Boolean).length,
  };
}

function getArchetype(name) {
  return ARCHETYPES[name] || ARCHETYPES.Builder;
}

export { ARCHETYPE_ORDER, ARCHETYPES, QUIZ_QUESTIONS, calculateArchetypeResult, getArchetype };
