export function createEntry(data) {
  return {
    id: crypto.randomUUID(),
    createdAt: Temporal.Now.instant().toString(),
    updatedAt: Temporal.Now.instant().toString(),

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
    updatedAt: Temporal.Now.instant().toString(),
  };
}

export function isEntryResolved(entry) {
  return !!(entry.alternativeAssumption?.trim());
}
