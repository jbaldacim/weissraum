export function isEntryNew(entry) {
  const created = Temporal.Instant.from(entry.createdAt);
  const now = Temporal.Now.instant();

  return now.since(created).total("days") <= 14;
}
