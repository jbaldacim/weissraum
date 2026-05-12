export function createEntry(data) {
  return {
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),

    assumption: "",
    category: "",

    experiment: "",
    predictions: "",
    possibleProblems: "",
    strategies: "",

    whatHappened: "",
    resultsVsPredictions: "",
    unexpectedOutcomes: "",
    copingStrategies: "",

    alternativeAssumption: "",

    ...data,
  };
}

export function updateEntry(entry, updates) {
  return {
    ...entry,
    ...updates,
    updatedAt: new Date().toISOString(),
  };
}

export function isEntryResolved(entry) {
  return !!(entry.alternativeAssumption?.trim());
}
