import express from "express";
import cors from "cors";
import Database from "better-sqlite3";
import { createEntry } from "../src/domain/entry.js";

const app = express();
app.use(cors());
app.use(express.json());

const db = new Database("server/data.db");

db.exec(`
  CREATE TABLE IF NOT EXISTS categories (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT UNIQUE NOT NULL
  );

  CREATE TABLE IF NOT EXISTS entries (
    id TEXT PRIMARY KEY,
    assumption TEXT NOT NULL,
    category_id INTEGER NOT NULL REFERENCES categories(id),
    status TEXT NOT NULL DEFAULT 'new',
    -- No default for dates — we'll set them manually in ISO format
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL,
    experiment TEXT DEFAULT '',
    predictions TEXT DEFAULT '',
    possible_problems TEXT DEFAULT '',
    strategies TEXT DEFAULT '',
    what_happened TEXT DEFAULT '',
    results_vs_predictions TEXT DEFAULT '',
    unexpected_outcomes TEXT DEFAULT '',
    coping_strategies TEXT DEFAULT '',
    alternative_assumption TEXT DEFAULT ''
  );
`);

const rawEntries = [
  {
    id: "1",
    assumption: "If I make a mistake, I will be rejected",
    category: "Self-worth",
    status: "new",
    date: "12 Mar 2026",
    experiment: "",
    predictions: "",
    possibleProblems: "",
    strategies: "",
    whatHappened: "",
    resultsVsPredictions: "",
    unexpectedOutcomes: "",
    copingStrategies: "",
    alternativeAssumption: "",
  },
  {
    id: "2",
    assumption: "I must always be in control or something bad will happen",
    category: "Control",
    status: "resolved",
    date: "10 Mar 2026",
    experiment: "Let one small plan unfold without over-checking it.",
    predictions: "Something will go wrong and I will regret it.",
    possibleProblems: "I may feel anxious if I do not monitor everything.",
    strategies: "Pause before reacting. Write down what actually happened.",
    whatHappened:
      "It felt uncomfortable at first, but nothing serious happened.",
    resultsVsPredictions:
      "The outcome was much less catastrophic than I expected.",
    unexpectedOutcomes: "I felt some relief from not carrying everything.",
    copingStrategies:
      "Breathing, slowing down, and delaying my first reaction.",
    alternativeAssumption:
      "I can tolerate uncertainty without everything falling apart.",
  },
  {
    id: "3",
    assumption: "If I am vulnerable, people will take advantage of me",
    category: "Relationships",
    status: "new",
    date: "08 Mar 2026",
    experiment: "",
    predictions: "",
    possibleProblems: "",
    strategies: "",
    whatHappened: "",
    resultsVsPredictions: "",
    unexpectedOutcomes: "",
    copingStrategies: "",
    alternativeAssumption: "",
  },
  {
    id: "4",
    assumption: "If I say no, people will stop liking me",
    category: "Relationships",
    status: "new",
    date: "07 Mar 2026",
    experiment: "",
    predictions: "",
    possibleProblems: "",
    strategies: "",
    whatHappened: "",
    resultsVsPredictions: "",
    unexpectedOutcomes: "",
    copingStrategies: "",
    alternativeAssumption: "",
  },
  {
    id: "5",
    assumption: "I need to be productive all the time to be valuable",
    category: "Self-worth",
    status: "resolved",
    date: "05 Mar 2026",
    experiment: "Take one evening off without doing any productive task.",
    predictions: "I will feel guilty and fall behind.",
    possibleProblems: "Strong urge to check tasks or study.",
    strategies: "Plan rest intentionally and avoid task lists that evening.",
    whatHappened:
      "I felt guilty at first, but later felt more rested and focused.",
    resultsVsPredictions:
      "The guilt faded and I did not fall behind as expected.",
    unexpectedOutcomes:
      "I had more energy the next day and worked more efficiently.",
    copingStrategies: "Self-talk and reminding myself rest is necessary.",
    alternativeAssumption:
      "Rest supports productivity instead of reducing my value.",
  },
  {
    id: "6",
    assumption: "If things are uncertain, it means something is wrong",
    category: "Control",
    status: "new",
    date: "03 Mar 2026",
    experiment: "",
    predictions: "",
    possibleProblems: "",
    strategies: "",
    whatHappened: "",
    resultsVsPredictions: "",
    unexpectedOutcomes: "",
    copingStrategies: "",
    alternativeAssumption: "",
  },
  {
    id: "7",
    assumption: "If someone is upset, it is probably my fault",
    category: "Relationships",
    status: "new",
    date: "01 Mar 2026",
    experiment: "",
    predictions: "",
    possibleProblems: "",
    strategies: "",
    whatHappened: "",
    resultsVsPredictions: "",
    unexpectedOutcomes: "",
    copingStrategies: "",
    alternativeAssumption: "",
  },
  {
    id: "8",
    assumption: "Resting means I am being lazy",
    category: "Self-worth",
    status: "resolved",
    date: "27 Feb 2026",
    experiment: "Schedule a full rest day with no obligations.",
    predictions: "I will feel useless and waste time.",
    possibleProblems: "Feeling restless or trying to justify working.",
    strategies: "Define rest activities beforehand (reading, walking).",
    whatHappened:
      "I initially felt uneasy, but gradually relaxed and enjoyed the day.",
    resultsVsPredictions:
      "I did not feel useless; instead I felt mentally refreshed.",
    unexpectedOutcomes: "I returned to work with more clarity and less stress.",
    copingStrategies: "Accepting discomfort and reframing rest as recovery.",
    alternativeAssumption:
      "Rest is a valid and necessary part of being effective.",
  },
  {
    id: "9",
    assumption: "If I don’t understand something quickly, I am not capable",
    category: "Self-worth",
    status: "new",
    date: "25 Feb 2026",
    experiment: "",
    predictions: "",
    possibleProblems: "",
    strategies: "",
    whatHappened: "",
    resultsVsPredictions: "",
    unexpectedOutcomes: "",
    copingStrategies: "",
    alternativeAssumption: "",
  },
  {
    id: "10",
    assumption: "I need to please everyone to avoid conflict",
    category: "Relationships",
    status: "resolved",
    date: "22 Feb 2026",
    experiment: "Express a mild disagreement in a conversation.",
    predictions: "The other person will react negatively or reject me.",
    possibleProblems: "Fear of confrontation and overthinking afterward.",
    strategies: "Stay calm and focus on expressing my perspective clearly.",
    whatHappened: "The conversation remained respectful and nothing escalated.",
    resultsVsPredictions: "The reaction was neutral, not negative as expected.",
    unexpectedOutcomes: "I felt more confident after expressing my opinion.",
    copingStrategies: "Grounding myself and avoiding overanalysis afterward.",
    alternativeAssumption:
      "I can disagree respectfully without damaging relationships.",
  },
];

const existingCount = db
  .prepare("SELECT COUNT(*) as count FROM entries")
  .get().count;
if (existingCount === 0) {
  const insertCategory = db.prepare(
    "INSERT OR IGNORE INTO categories (name) VALUES (?)",
  );
  const insertEntry = db.prepare(`
    INSERT INTO entries (id, assumption, category_id, status, experiment, predictions,
      possible_problems, strategies, what_happened, results_vs_predictions,
      unexpected_outcomes, coping_strategies, alternative_assumption, created_at, updated_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  const now = new Date().toISOString();

  const seed = db.transaction(() => {
    for (const e of rawEntries) {
      insertCategory.run(e.category);
      const catRow = db
        .prepare("SELECT id FROM categories WHERE name = ?")
        .get(e.category);

      insertEntry.run(
        e.id,
        e.assumption,
        catRow.id,
        e.status || "new",
        e.experiment || "",
        e.predictions || "",
        e.possibleProblems || "",
        e.strategies || "",
        e.whatHappened || "",
        e.resultsVsPredictions || "",
        e.unexpectedOutcomes || "",
        e.copingStrategies || "",
        e.alternativeAssumption || "",
        now,
        now,
      );
    }
  });

  seed();
  console.log("Database seeded with initial entries.");
}

function mapEntry(row) {
  return {
    id: row.id,
    assumption: row.assumption,
    category: row.category_name,
    status: row.status,
    date: new Date(row.created_at).toLocaleDateString("pt-BR", {
      day: "numeric",
      month: "short",
      year: "numeric",
    }),
    experiment: row.experiment,
    predictions: row.predictions,
    possibleProblems: row.possible_problems,
    strategies: row.strategies,
    whatHappened: row.what_happened,
    resultsVsPredictions: row.results_vs_predictions,
    unexpectedOutcomes: row.unexpected_outcomes,
    copingStrategies: row.coping_strategies,
    alternativeAssumption: row.alternative_assumption,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

app.get("/api/entries", (req, res) => {
  const rows = db
    .prepare(
      `
    SELECT e.*, c.name as category_name
    FROM entries e
    JOIN categories c ON e.category_id = c.id
    ORDER BY e.created_at DESC
  `,
    )
    .all();
  res.json(rows.map(mapEntry));
});

app.get("/api/entries/:id", (req, res) => {
  const row = db
    .prepare(
      `
    SELECT e.*, c.name as category_name
    FROM entries e
    JOIN categories c ON e.category_id = c.id
    WHERE e.id = ?
  `,
    )
    .get(req.params.id);

  if (!row) return res.status(404).json({ error: "Entry not found" });
  res.json(mapEntry(row));
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`API server running at http://localhost:${PORT}`);
});
