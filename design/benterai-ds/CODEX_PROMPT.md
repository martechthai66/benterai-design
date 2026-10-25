# Prompt for Codex

Copy everything inside the block into Codex. The app code lives in a separate repository; give Codex access to both repositories, or copy `design/benterai-ds/` into the app repository first.

```
You are implementing an approved UI redesign for BenterAI (Next.js App Router + React + TypeScript, built to Cloudflare Workers via vinext, app in apps/web).

The design package is in design/benterai-ds/. Read these first, in this order:
1. docs/handoff.md   – token mapping, component anatomy, responsive rules, interaction rules, files to change
2. docs/scope.md     – Part A = visual/layout redesign (DO THIS). Part B = new capabilities (DO NOT build; hide those elements)
3. docs/screens.md   – URL > screen > states > permission table and the two flows
4. docs/brand-book.md – design principles, content rules, colour/type/spacing/state usage
5. docs/source-brief.md – the original system brief (flows, URLs, permissions, API) that must be preserved

Source of truth for values and styling:
- fonts/ – self-hosted IBM Plex Sans Thai / Sans / Mono woff2 + fonts.css (OFL)
- tokens/tokens.json (+ tokens/tokens.css) – every colour (light + dark), type size, spacing, radius, shadow, breakpoint, motion token
- components/bundle.css – production-ready CSS for every component and state (class prefix ba-)
- components/index.d.ts – props of every component
- components/<Name>/README.md – usage rules per component
- components/bundle.js – REFERENCE ONLY React prototype of every screen; port structure and behaviour into the real components, do not ship this file
- screenshots/ – every state of every screen, desktop + mobile, light + dark, TH/EN, font +4
- preview/index.html – run `npx serve design/benterai-ds` and open /preview/ to click through all screens and the prototype

Rules:
- Keep every existing URL, permission gate, API call, SSE handling and polling behaviour. The API is unchanged.
- Implement tokens as CSS custom properties with the SAME names in apps/web/src/app/globals.css (:root + [data-theme="dark"]).
- --font-adjust is in pt (0–4, default 1pt); every font-size = calc(base + var(--font-adjust)).
- Font: IBM Plex Sans Thai (400/500/600/700) + IBM Plex Mono. Self-host the files in fonts/ (copy fonts/*.woff2 + fonts.css into apps/web/public/fonts/ and load fonts.css first); do not depend on Google Fonts at runtime.
- Icons: lucide-react using the mapping in docs/handoff.md section 5.
- Logos: copy assets/logos/*.png into apps/web/public/brand/.
- Thai IME: never send on Enter while composing.
- All destructive actions use the single confirmation Dialog pattern.

Deliver as separate PRs in this order, each with desktop + mobile, light + dark screenshots compared against screenshots/:
1. Tokens + fonts + base styles
2. App shell: navy Sidebar, header, mobile top bar + drawer, locked nav items
3. Chat: welcome + hero composer, + menu, library picker, web chip, model picker, Knowledge row, messages, streaming/Stop, citations + SourceList, errors
4. Knowledge
5. Create files
6. Organization (users, groups & permissions, models, audit log, data policy) + AI Usage & Limits
7. Settings
8. Login + Reset

Stop and ask if anything in the design needs an API change that is not listed in docs/scope.md Part B.
```
