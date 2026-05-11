export async function getEntryStats() {
  const res = await fetch("/api/entries/stats");

  if (!res.ok) throw new Error("Failed to fetch entry stats.");

  return res.json();
}

export async function getCategories() {
  const res = await fetch("/api/categories");

  if (!res.ok) throw new Error("Failed to fetch categories.");

  return res.json();
}

export async function getEntries(categoryId = null, page = 1, limit = 10) {
  const params = new URLSearchParams();
  if (categoryId) params.set("category", categoryId);
  params.set("page", page);
  params.set("limit", limit);
  const res = await fetch(`/api/entries?${params}`);

  if (!res.ok) throw new Error("Failed to fetch entries.");

  return res.json();
}

export async function getEntryById(id) {
  const res = await fetch(`/api/entries/${id}`);

  if (!res.ok) throw new Response("Entry not found.", { status: 404 });

  return res.json();
}

export async function saveEntry(entry) {
  const res = await fetch("/api/entries", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(entry),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || "Failed to save entry.");
  }

  return res.json();
}

export async function updateEntry(id, updates) {
  const res = await fetch(`/api/entries/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updates),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || "Failed to update entry.");
  }

  return res.json();
}
