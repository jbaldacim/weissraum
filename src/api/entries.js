export async function getEntries() {
  const res = await fetch("/api/entries");

  if (!res.ok) throw new Error("Failed to fetch entries.");

  return res.json();
}

export async function getEntryById(id) {
  const res = await fetch(`/api/entries/${id}`);

  if (!res.ok) throw new Response("Entry not found.", { status: 404 });

  return res.json();
}
