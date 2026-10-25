# Handoff for Codex

แบบอ้างอิงคือไฟล์ในระบบนี้ — `tokens.json` (ค่าจริงทุก token), `components/bundle.css` (anatomy + states ทุกคอมโพเนนต์ เป็น CSS ที่ใช้ได้เลย), `components/bundle.js` (โครงสร้าง React ของทุกหน้า ใช้เป็น reference ไม่ใช่โค้ด production), card **Screens** และ **Prototype**

## 1 · Tokens > CSS variables

▪️ สร้าง `:root` / `[data-theme="dark"]` ใน `apps/web/src/app/globals.css` จาก `tokens.json` ด้วยชื่อเดียวกัน (`--canvas`, `--ink`, `--brand-strong`, `--sidebar`, `--space-4`, `--radius-md`, `--shadow-md` …)
▪️ แทนค่าระบบเดิม — `#0755f5` > `--brand-strong` (#1d5bd8) · ตัวอักษร `#152a50` > `--ink` (#1a1d24) · พื้น `#f8faff` > `--canvas` (#ffffff) และ `--surface-subtle` · `system-ui` > `--font-sans` (IBM Plex Sans Thai — self-host จากโฟลเดอร์ `fonts/` ที่มี woff2 + `fonts.css` ให้แล้ว ไม่พึ่ง Google Fonts ตอนใช้งานจริง)
▪️ คง `--font-adjust` เดิม แต่เปลี่ยนค่าเป็นหน่วย `pt` (0–4, default `1pt`) และให้ทุก font-size เป็น `calc(<base> + var(--font-adjust))` ตามตัวแปร `--ba-fs-*` ใน `bundle.css`
▪️ Breakpoints คงค่าเดิม `760px` (`bp-md`) และ `1100px` (`bp-lg`) เพิ่ม `480px` และ `1440px`
▪️ Theme, ภาษา, font size ยังเก็บใน localStorage เหมือนเดิม; ตั้ง `data-theme` บน `<html>`

## 2 · Component anatomy (ย่อ)

| Component | Anatomy | Variants / states |
|---|---|---|
| Button | [icon] label [iconRight] · h 32/40/48 · r `radius-md` | primary · secondary · ghost · danger · danger-ghost · hover · focus · disabled · loading |
| Composer | attachments > textarea > bar [+ · web chip · spacer · model · send/stop] > Knowledge row > note | hero · docked · focus-within · drag · streaming · send disabled |
| Message | user bubble (`surface-sunken`) / assistant [spark avatar · body-lg · citations · SourceList · meta] | streaming · error · stopped |
| SourceList | label + count > source cards [n · title · page/domain] > excerpt panel | closed · open (marker solid `brand-strong`) |
| Sidebar | wordmark > New chat > nav ×5 > Recent chats [search · groups · rows] > user box | active · hover · locked · drawer (mobile) |
| StatusBadge | icon/spinner + label (+ %) · h 22 · r `radius-sm` | pending · processing · ready · failed · active · pending-account · suspended · uploading · reading |
| DataTable | header `surface-subtle` · rows 1px `line` · primary cell = tile/avatar + title + sub | hover row · empty · mobile > list |
| Dialog | [icon well] title + description [×] > body > footer `surface-subtle` | info · success · warning · danger · mobile bottom sheet |
| Toast | icon well · title · message · [×] | success · info · warning · danger (ไม่ auto-dismiss) |

รายละเอียดแต่ละตัวอยู่ใน README ของ component card และ props ใน `components/index.d.ts`

## 3 · Responsive

▪️ ≥ 1100px — sidebar 272px, ตารางครบคอลัมน์
▪️ 760–1099px — sidebar 240px (`width-sidebar-compact`), ตาราง Knowledge ซ่อนคอลัมน์ “แชร์” และ “เวอร์ชัน”
▪️ < 760px — top bar 56px (menu · ชื่อหน้า · แชตใหม่) + drawer กว้าง min(86%, 320px) ที่มี nav และ Recent chats ครบ, composer docked เต็มกว้าง, Knowledge/Create files เป็น list, Settings nav เป็น chip แนวนอน, Dialog เป็น bottom sheet, toast อยู่บน

## 4 · Interaction rules

▪️ ทุกหน้าเปลี่ยน URL และรองรับ Back/Forward (ตาม URL ในเอกสารเดิม) — แท็บ Organization ↔ Usage ก็เปลี่ยน URL
▪️ Enter ส่งข้อความ, Shift+Enter ขึ้นบรรทัด, ห้ามส่งระหว่าง IME composing (ภาษาไทย)
▪️ ปุ่ม Send disabled เมื่อ composer ว่าง หรือไฟล์ยัง uploading/reading — ระหว่าง SSE stream แสดง Stop แทน
▪️ Knowledge picker แสดงเฉพาะเอกสาร `ready` ที่ผู้ใช้มีสิทธิ์
▪️ Polling: attachment ทุก 1s, Knowledge/Artifacts ทุก 3s ขณะมีรายการ pending/processing
▪️ Destructive ทุกตัวใช้ Dialog pattern เดียวกัน; รหัสผ่านชั่วคราวต้องกดยืนยันก่อนปิด
▪️ Focus ring มองเห็นเสมอเมื่อใช้คีย์บอร์ด; menu ปิดด้วย Esc และคลิกนอก

## 5 · Assets & icons

▪️ Logos (asset group) — `benterai-wordmark.png`, `benterai-wordmark-reversed.png`, `benterai-logo.png`, `benterai-logo-reversed.png`, `benterai-spark.png` ⚠︎ ขอ SVG ต้นฉบับก่อน production
▪️ Icons — ใช้ `lucide-react` ตาม mapping ใน README > Iconography: plus, search, message-square, book-open, file-plus, building-2, sliders-horizontal, arrow-up, square, paperclip, globe, image, layers, pin, more-horizontal, trash-2, download, upload, users, user-plus, check, x, triangle-alert, info, circle-check, circle-x, clock, chevron-down/right/left, user, log-out, menu, sun, moon, lock, copy, refresh-cw, pencil, file, file-text, history, eye, key-round, shield, external-link, mail, type, archive, gauge, sparkles

## 6 · สิ่งที่ต่างจากระบบเดิม

▪️ Font system > IBM Plex Sans Thai · สีน้ำเงินเข้มขึ้นเพื่อผ่าน contrast · sidebar จากพื้นสว่างเป็น navy
▪️ Mobile จากแถบแนวนอนเป็น top bar + drawer
▪️ Composer รวม model selector + web chip + Knowledge mode ไว้ในที่เดียว
▪️ Organization จัดเป็น 2 tabs + 5 ส่วนย่อย (URL เดิมยังใช้ได้; ส่วนย่อยใช้ query `?section=` ได้ถ้าต้องการ deep link)
▪️ รายการที่ต้องงาน backend ดู section *Visual redesign vs new features* ส่วน B

## 7 · ไฟล์ที่ต้องแก้ใน repo

`globals.css` (tokens, components) · `page.tsx` + `reset/page.tsx` (AuthLayout) · `dashboard.tsx` (AppShell, Sidebar, Settings, Organization, Usage) · `chat-workspace.tsx` (Composer, Message, SourceList) · `document-workspace.tsx` (Knowledge) · `artifact-workspace.tsx` (Create files) · `lib/i18n.ts` (ข้อความใหม่ทั้งไทย/อังกฤษตาม card)
