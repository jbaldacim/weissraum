# Weissraum — Agent Guide

## Stack

- **Client**: Vite 7 + React 19 + styled-components 6 + React Router 7
- **API**: Express 5 + better-sqlite3 (SQLite), auto-creates/seeds `server/data.db`
- **No TypeScript** — plain JSX. No test runner configured.

## Commands

| Command | What it does |
|---|---|
| `npm run dev` | Starts both Vite dev server + Express API (port 3001) via `concurrently` |
| `npm run dev:client` | Vite only |
| `npm run dev:api` | Express API only |
| `npm run lint` | ESLint (flat config in `eslint.config.js`) |
| `npm run build` | Vite production build to `dist/` |
| `npm run preview` | Vite preview of built output |

Vite proxies `/api/*` to `http://localhost:3001`.

## Architecture

- **Entrypoint** — `src/main.jsx` (routing via `createBrowserRouter`). `App.jsx` is empty.
- **Server** — `server/index.js`, all API logic inline.
- **API client** — `src/api/entries.js` uses bare `fetch`, no React Query or SWR.
- **Domain** — `src/domain/entry.js` uses the TC39 `Temporal` API (no polyfill in deps — may need `@js-temporal/polyfill` at runtime).
- **Styling** — styled-components with `ThemeProvider`. Theme tokens (`theme.js`) are also mirrored as CSS custom properties via `GlobalStyles.js` (e.g., `var(--space-sm)`, `var(--color-surface)`).

## Notable Conventions

- **DB → API field mapping**: Server stores `snake_case` columns but maps to `camelCase` JSON in `mapEntry()`. The API client and views use `camelCase` throughout.
- **Dates formatted server-side** with `pt-BR` locale.
- **View Transition API**: Card-to-entry transitions use React Router's `useViewTransitionState` + `viewTransition` prop — `viewTransitionName` is applied only during the active transition to avoid naming conflicts.
- **Form inputs** (`FloatingLabelField`, `FloatingLabelTextArea`, `FloatingLabelCombobox`) are **controlled** — state lives in the parent view.
- **Fonts**: IBM Plex Sans (UI), DM Mono (user input), imported via `@fontsource` packages.
- **Accent color** `#2C4A6E` used sparingly (active fields, primary CTA, interactive states only).
- **Floating labels** use `linear` transitions only — no easing curves.
- **Four routes**: `/` (Home), `/archive`, `/entries/new`, `/entries/:id` (with `entryLoader` + `errorElement` for 404).
