import { getEntryById } from "../api/entries";

export async function entryLoader({ params }) {
  const entry = await getEntryById(params.id);

  if (!entry) {
    throw new Response("Entry not found", { status: 404 });
  }

  return entry;
}
