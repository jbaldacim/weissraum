# Weissraum — Component Roadmap

CBT Underlying Assumptions Tracker  
Stack: Vite + React + Styled Components  
Fonts: IBM Plex Sans (UI) · DM Mono (user input)  
Vibe: Quiet & contemplative · Ink blue accent

---

## Architecture Decisions

These decisions were made deliberately and should be revisited only with good
reason.

**Navigation** — React Router with page-based routing. Each entry has its own
URL (e.g. `/entries/123`), honouring the permanence and identity of each
assumption as a meaningful document. The browser's back button, bookmarking, and
direct linking all work naturally as a result.

**Card-to-entry transition** — The `AssumptionCard` navigates to a dedicated
`Entry` page rather than expanding in place. The View Transition API animates
the transition between the list and the entry page, preserving spatial
continuity. This is architecturally cleaner than in-page shared element
transitions and maps naturally to the page-based routing model.

**Controlled form primitives** — `FloatingLabelField`, `FloatingLabelTextArea`,
and `FloatingLabelCombobox` are controlled inputs. Form data lives in the parent
view, while local component state is reserved for presentation concerns such as
focus, popover visibility, and textarea sizing. This keeps save, discard, reset,
validation, and future backend integration straightforward.

**Editable Entry page** — The `Entry` page is a fully editable document view,
not a mixed read/edit surface. It owns both a saved snapshot and a draft version
of the entry, allowing the whole form to be revised before committing changes
through explicit Save and Discard actions. This keeps the interaction quiet and
predictable while fitting the permanence of a document-like page.

**Database** — Relational with `better-sqlite3`. Categories live in a dedicated
`categories` table as a single source of truth, preventing inconsistency across
entries. All entry fields are fetched at once when the Entry page loads — one
API call, all fields, no partial fetching needed at this scale.
