import { getEntryById } from "../data/entries";

export async function entryLoader({ params }) {
  const entry = await getEntryById(params.id);

  if (!entry) {
    throw new Response("Not found", { status: 404 });
  }

  return entry;
}
