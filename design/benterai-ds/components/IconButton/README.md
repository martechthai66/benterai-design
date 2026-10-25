# IconButton

Square icon-only button (36px; `sm` 28px for rows, `lg` 44px for mobile touch targets).

- `label` is REQUIRED — it becomes `aria-label` and the tooltip.
- Variants: default ghost, `outline` (composer `+`), `primary` (Send), `stop` (Stop while streaming — ink fill so it reads differently from Send), `active` for a pressed toggle.
- Send is disabled while the composer is empty or an attachment is still uploading/reading.
