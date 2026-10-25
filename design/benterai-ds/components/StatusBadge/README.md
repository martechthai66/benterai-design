# StatusBadge

Background-job and account status. Every status carries an icon or spinner AND a word, never colour alone.

| status | tone | use |
|---|---|---|
| `pending` | neutral + clock | queued job (document, artifact) |
| `processing` | info + spinner, optional `progress` % | extraction / OCR / generation |
| `ready` | success + check | usable in chat / downloadable |
| `failed` | danger + x | show the reason next to it |
| `active` / `pending-account` / `suspended` | success / warning / danger | user accounts |
| `uploading` / `reading` | info + spinner | chat attachments |

Pass `children` to override the label (e.g. “กำลังสร้าง…” for artifacts).
