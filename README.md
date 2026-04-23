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

- [x] `src/components/Form/FloatingLabelField.jsx` — controlled single-line
      input with floating label, DM Mono input text, ink blue focus state
- [x] `src/components/Form/FloatingLabelTextArea.jsx` — controlled multiline
      variant for longer reflections, with auto-resize behavior
- [x] `src/components/Form/FloatingLabelCombobox.jsx` — controlled searchable,
      creatable category input with floating label
- [x] `src/components/Card/AssumptionCard.jsx` — displays a saved underlying
      assumption entry
- [x] `src/components/Nav/Nav.jsx` — top navigation bar
- [x] `src/components/SectionHeader/SectionHeader.jsx` — heading + optional
      label, lead paragraph and action

---

## Layer 5 — Views / Pages

Full page compositions. Each view is assembled from the layers above.

- [x] `src/views/Home.jsx` — entry point, recent entries, navigation to new
      entry
- [x] `src/views/NewEntry.jsx` — controlled form to log a new underlying
      assumption; parent view owns the full form state
- [x] `src/views/Entry.jsx` — editable single-entry document view with
      parent-owned draft state and explicit Save / Discard actions
- [x] `src/views/Archive.jsx` — list of all past entries as AssumptionCards,
      filterable by date or category

---

## CBT Form Fields Reference

Each entry maps to a behavioural experiment structure used to test underlying
assumptions:

1. **Assumption** — the underlying belief being tested

### The Experiment

2. **Experiment** — the action taken to test the assumption
3. **Predictions** — what you expect will happen
4. **Possible problems** — what could go wrong
5. **Strategies** — how you plan to cope with those problems

### The Results

6. **What happened** — what actually occurred during the experiment
7. **Results vs predictions** — how reality compared to your expectations
8. **Unexpected outcomes** — anything surprising that emerged
9. **Coping strategies** — how you managed in the moment

### The Conclusion

10. **Alternative assumption** — a more balanced or updated belief

---

## Notes

- Floating labels use linear transitions only — no easing curves
- Accent `#2C4A6E` used sparingly: active fields, primary CTA, key interactive
  states only
- Physical forms always completed first — this app is an archive and access
  layer, not a replacement for the therapeutic process
- Layout and actions follow a Swiss/minimalist approach: strong left alignment,
  restrained hierarchy, and rhythm through spacing rather than decorative UI

## To Do

- [ ] Add return button so view transition works
- [ ] Add more mock entries
- [ ] Add pagination on archive to reduce cognitive load
