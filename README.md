# Weissraum — Component Roadmap

CBT Underlying Assumptions Tracker  
Stack: Vite + React + Styled Components  
Fonts: IBM Plex Sans (UI) · DM Mono (user input)  
Vibe: Quiet & contemplative · Ink blue accent

---

## Layer 1 — Design Tokens & Base

The foundation. Everything else depends on this layer being solid.

- [x] `src/styles/GlobalStyle.js` — CSS reset and base body styles
- [x] `src/styles/theme.js` — design tokens (colors, fonts, spacing, etc.)
- [x] `src/components/Typography/Text.jsx` — Display, Heading, Lead, Body,
      Label, Caption, InputText
- [ ] `src/components/Divider/Divider.jsx` — horizontal rule, used for rhythm
      and section separation

---

## Layer 2 — Atomic Components

Smallest interactive or visual units. Self-contained, depend only on the theme.

- [ ] `src/components/Button/Button.jsx` — primary, secondary, ghost variants
- [ ] `src/components/Tag/Tag.jsx` — small uppercase label for categories and
      status
- [ ] `src/components/Link/Link.jsx` — styled anchor, respects type system and
      accent colour

---

## Layer 3 — Layout Primitives

Invisible structural components. The skeleton everything else hangs on.

- [ ] `src/components/Layout/Container.jsx` — max-width wrapper, centred,
      horizontal padding
- [ ] `src/components/Layout/Grid.jsx` — CSS grid wrapper with column system
- [ ] `src/components/Layout/Stack.jsx` — vertical flexbox with controlled
      spacing between children

---

## Layer 4 — Content Components

Meaningful UI pieces composed from the layers above.

- [ ] `src/components/Form/FloatingLabelField.jsx` — text input with floating
      label, DM Mono input text, ink blue focus state
- [ ] `src/components/Form/FloatingLabelTextarea.jsx` — multiline variant for
      longer reflections
- [ ] `src/components/Card/AssumptionCard.jsx` — displays a saved underlying
      assumption entry
- [ ] `src/components/Nav/Nav.jsx` — top navigation bar
- [ ] `src/components/SectionHeader/SectionHeader.jsx` — label + heading +
      optional lead paragraph

---

## Layer 5 — Views / Pages

Full page compositions. Each view is assembled from the layers above.

- [ ] `src/views/Home.jsx` — entry point, recent entries, navigation to new
      entry
- [ ] `src/views/NewEntry.jsx` — form to log a new underlying assumption
- [ ] `src/views/Entry.jsx` — view a single saved entry in full
- [ ] `src/views/Archive.jsx` — list of all past entries, filterable by date or
      tag

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

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript
with type-aware lint rules enabled. Check out the
[TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts)
for information on how to integrate TypeScript and
[`typescript-eslint`](https://typescript-eslint.io) in your project.
