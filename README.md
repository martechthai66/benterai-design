# BenterAI Design

Design system and approved screen designs for **BenterAI — Build your own Enterprise AI**, ready to hand off to Codex for implementation.

## What's inside

| Path | Contents |
|---|---|
| `design/benterai-ds/CODEX_PROMPT.md` | Paste-ready prompt for Codex |
| `design/benterai-ds/docs/` | `handoff.md` (Codex spec) · `scope.md` (visual redesign vs new features) · `screens.md` (screens, states, flows) · `brand-book.md` (principles and foundations) · `source-brief.md` (original system brief) |
| `design/benterai-ds/tokens/` | `tokens.json` + `tokens.css` — colour (light/dark), type, spacing, radius, shadow, breakpoints, motion |
| `design/benterai-ds/components/` | `bundle.css` (component styles) · `index.d.ts` (props) · one README per component · `bundle.js` (reference prototype, not production) |
| `design/benterai-ds/screenshots/` | 100+ PNGs — every state of all 9 screens, desktop/mobile, light/dark, TH/EN, font +4 |
| `design/benterai-ds/preview/` | Clickable viewer of every screen and the 2-flow prototype |
| `design/benterai-ds/fonts/` | Self-hosted IBM Plex Sans Thai / Sans / Mono (woff2 + `fonts.css`, SIL OFL) |
| `design/benterai-ds/assets/logos/` | Logo, reversed logo, wordmark, spark |

## View the screens locally

```bash
npx serve design/benterai-ds
# open http://localhost:3000/preview/
```

Each screen has toggles for device, theme, content language, menu language, font size (+0–+4 pt) and state.

## Hand off to Codex

1. Give Codex access to this repository and the BenterAI app repository (or copy `design/benterai-ds/` into the app repository).
2. Paste the prompt from `design/benterai-ds/CODEX_PROMPT.md`.
3. Review each PR against `design/benterai-ds/screenshots/`.

## Open items before production

- The reversed logo and the wordmark-only logo were derived from the supplied PNG. They need brand-owner approval, and an SVG master should be supplied.
- The icons follow Lucide naming and are a new choice, because the current system has no icon set.
- Model names, users, documents and figures in the screens are sample data for a fictional organisation.
