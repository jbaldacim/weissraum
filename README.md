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

**Inline editing on the Entry page** — Filled fields render as plain text. Empty
fields render as `FloatingLabelTextarea` components, quietly inviting completion
without demanding it. No mode switch, no edit button — progressive disclosure.

**Database** — Relational (PostgreSQL for production, SQLite for local
development). Categories live in a dedicated `categories` table as a single
source of truth, preventing inconsistency across entries. All entry fields are
fetched at once when the Entry page loads — one API call, all fields, no partial
fetching needed at this scale.

---

## Layer 1 — Design Tokens & Base

The foundation. Everything else depends on this layer being solid.

- [x] `src/styles/GlobalStyle.js` — CSS reset and base body styles
- [x] `src/styles/theme.js` — design tokens (colors, fonts, spacing, etc.)
- [x] `src/components/Typography/Text.jsx` — Display, Heading, Lead, Body,
      Label, Caption, InputText
- [x] `src/components/Divider/Divider.jsx` — horizontal rule, used for rhythm
      and section separation

---

## Layer 2 — Atomic Components

Smallest interactive or visual units. Self-contained, depend only on the theme.

- [x] `src/components/Button/Button.jsx` — primary, secondary, ghost variants
- [x] `src/components/Tag/Tag.jsx` — small uppercase label for categories and
      status
- [x] `src/components/Link/Link.jsx` — styled anchor, respects type system and
      accent colour

---

## Layer 3 — Layout Primitives

Invisible structural components. The skeleton everything else hangs on.

- [x] `src/components/Layout/Container.jsx` — max-width wrapper, centred,
      horizontal padding
- [x] `src/components/Layout/Grid.jsx` — CSS grid wrapper with column system
- [x] `src/components/Layout/Stack.jsx` — vertical flexbox with controlled
      spacing between children

---

## Layer 4 — Content Components

Meaningful UI pieces composed from the layers above.

- [x] `src/components/Form/FloatingLabelField.jsx` — text input with floating
      label, DM Mono input text, ink blue focus state
- [x] `src/components/Form/FloatingLabelTextarea.jsx` — multiline variant for
      longer reflections
- [x] `src/components/Card/AssumptionCard.jsx` — displays a saved underlying
      assumption entry
- [x] `src/components/Nav/Nav.jsx` — top navigation bar
- [ ] `src/components/SectionHeader/SectionHeader.jsx` — label + heading +
      optional lead paragraph
- [ ] `src/components/Form/FloatingLabelCombobox.jsx` — searchable, creatable
      dropdown for category selection with floating label

---

## Layer 5 — Views / Pages

Full page compositions. Each view is assembled from the layers above.

- [ ] `src/views/Home.jsx` — entry point, recent entries, navigation to new
      entry
- [ ] `src/views/NewEntry.jsx` — form to log a new underlying assumption
- [ ] `src/views/Entry.jsx` — view and incrementally complete a single saved
      entry; filled fields render as text, empty fields render as
      FloatingLabelTextarea
- [ ] `src/views/Archive.jsx` — list of all past entries as AssumptionCards,
      filterable by date or category

---

## CBT Form Fields Reference

Each entry in the tracker maps to the underlying assumptions form structure:

1. **Situation** — what triggered this assumption?
2. **Assumption** — the underlying belief identified
3. **Evidence for** — what supports this assumption?
4. **Evidence against** — what contradicts it?
5. **Alternative belief** — a more balanced interpretation
6. **Outcome** — how does the alternative belief feel?

---

## Notes

- Floating labels use linear transitions only — no easing curves
- Accent `#2C4A6E` used sparingly: active fields, primary CTA, key interactive
  states only
- Physical forms always completed first — this app is an archive and access
  layer, not a replacement for the therapeutic process
