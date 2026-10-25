# Button

Text button for every action. One `primary` per view, for the action the page exists for (Upload, Create file, Sign in, Save).

- Variants: `primary` (brand-strong fill, on-brand text), `secondary` (default — surface-raised, line-strong border), `ghost` (toolbar / tertiary), `danger` (confirming a destructive dialog), `danger-ghost` (starting a destructive action in a table row).
- Sizes: `sm` 32px (tables, toolbars), `md` 40px (default), `lg` 48px (login, mobile full-width CTAs).
- `loading` swaps the icon for a spinner, sets `aria-busy` and disables the button — keep the label, change it to the progressive verb (“กำลังเข้าสู่ระบบ…”).
- Consumer provides: `children` label (verb first, sentence case, Thai by default), optional `icon` / `iconRight` (names from Icon), `onClick`.
- Don’t: put two primary buttons side by side; use `danger` fill outside a confirmation dialog.
