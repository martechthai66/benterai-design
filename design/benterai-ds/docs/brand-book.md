BenterAI คือ Enterprise AI Workspace สำหรับองค์กรไทย ระบบนี้กำหนดหน้าตาแบบ **Corporate** — พื้นขาว Sidebar สีกรมท่า (navy) น้ำเงิน BenterAI เป็นสีเดียวที่ใช้สื่อ action รัศมีมุมเล็ก เส้นบาง เงาน้อย และตัวอักษร IBM Plex Sans Thai ที่อ่านง่ายทั้งไทยและอังกฤษ ทุกค่าที่อ้างถึงด้านล่างคือชื่อ token ใน `tokens.json`

ดูหน้าจอจริงได้ที่ card กลุ่ม **Screens** (ทุกหน้ามี toggle Desktop/Mobile · Light/Dark · ไทย/EN · เมนู EN/ไทย · Font +0–+4 · State) และ **Prototype** (flow ที่กดได้จริง 2 เส้นทาง) ส่วนรายละเอียดสำหรับ Codex อยู่ใน section *Handoff for Codex* และ *Visual redesign vs new features*

## Design principles

1. **Trust before delight** — ผู้ใช้เป็นพนักงานที่ส่งข้อมูลองค์กรให้ AI ทุกคำตอบที่อ้างเอกสารต้องกดดูแหล่งได้ (ชื่อเอกสาร + เลขหน้า) และ composer บอกเสมอว่าข้อมูลถูกส่งให้โมเดลภายนอก ✔︎ ใช้ SourceList ทุกครั้งที่มีแหล่ง ✔︎ ห้ามซ่อนสถานะงานเบื้องหลัง
2. **Chat is the front door** — หลังล็อกอินเข้าหน้าแชตทันที composer ขนาดใหญ่พร้อมพิมพ์ ทุกอย่างอื่น (Knowledge, Create files, ค้นเว็บ) เข้าถึงได้จากปุ่ม `+` โดยไม่ต้องออกจากแชต
3. **Every wait has a name** — upload, OCR, chat streaming และ generation ใช้เวลาต่างกัน จึงมี state ต่างกัน (StatusBadge + ProgressBar แบบมีตัวเลข / indeterminate / caret) ผู้ใช้ต้องไม่สงสัยว่า “กดแล้วเกิดอะไรขึ้น”
4. **Permission is visible, not hidden** — เมนูที่ไม่มีสิทธิ์ยังแสดงแต่ล็อก พร้อมบอกชื่อ permission ที่ขาด ผู้ดูแลเห็นผลของสิทธิ์ทุกครั้งที่บันทึก และ UI ไม่เปิด action ที่ API จะปฏิเสธ
5. **Corporate calm** — หน้าตาสงบ น่าเชื่อถือแบบระบบองค์กร ใช้สีน้อย ใช้ `brand-strong` เฉพาะ action หลัก ไม่มี gradient ไม่มี emoji ไม่มีภาพประกอบตกแต่ง เพื่อให้ผู้บริหารและฝ่าย IT ยอมรับใช้ทั้งองค์กร

## Content fundamentals

- เนื้อหาเป็น **ภาษาไทยเป็นค่าเริ่มต้น** เมนูซ้ายเป็น **English เป็นค่าเริ่มต้น** — สองอย่างนี้เปลี่ยนแยกกันใน Settings > ภาษา
- Technical terms ใช้คำทับศัพท์อังกฤษ: Knowledge, Create files, Audit log, OCR, Fallback, AI Usage & Limits ไม่แปลเป็นไทยเพื่อให้ตรงกับเอกสารภายในและการอบรม
- น้ำเสียงสุภาพแบบทางการ กระชับ ไม่ใช้ “ค่ะ/ครับ” ในปุ่มหรือ label ใช้ได้ในข้อความต้อนรับเท่านั้น ไม่ใช้ emoji ใน UI
- ปุ่มขึ้นต้นด้วยกริยา: “อัปโหลดเอกสาร” “สร้างไฟล์” “ส่งลิงก์รีเซ็ต” ปุ่มยืนยันการลบใช้กริยาเดียวกับหัวข้อ dialog (“ลบเอกสาร?” > “ลบเอกสาร”)
- Error บอก (1) เกิดอะไรขึ้น (2) ทำอะไรต่อ: “ไฟล์ 12.4 MB เกินขนาด 5 MB” · “ใช้โควตาเดือนนี้ครบแล้ว — รีเซ็ต 1 พ.ย. หรือติดต่อผู้ดูแล”
- ข้อความรีเซ็ตรหัสผ่านต้องไม่เปิดเผยว่ามีบัญชีหรือไม่: “หากอีเมลนี้มีบัญชีในระบบ เราได้ส่งลิงก์รีเซ็ตไปแล้ว”
- คำอธิบายการส่งข้อมูลให้โมเดลภายนอกใช้ภาษาธรรมดา ไม่เอ่ยชื่อผู้ให้บริการโครงสร้างพื้นฐาน: “ข้อความและไฟล์ที่ส่งจะถูกประมวลผลโดยโมเดล AI ภายนอกตามนโยบายข้อมูลขององค์กร”
- วันที่ใช้รูปแบบไทยย่อ “26 ต.ค. 2026” (ค.ศ.) ตัวเลขใช้ comma และ tabular figures ในตาราง

## Visual foundations

### Colour

- พื้นหลักของเนื้อหาคือ `canvas` (ขาว) Sidebar และแผงแบรนด์หน้า Login ใช้ `sidebar` (navy #0b1f3f) ตัวอักษรบน navy ใช้ `sidebar-ink` / `sidebar-muted` และ active item ใช้ `sidebar-active` + แถบ `sidebar-accent` 3px ด้านซ้าย
- ตัวอักษรหลัก `ink` รอง `ink-muted` placeholder `ink-subtle` (เฉพาะบน `canvas` / `surface-raised`)
- 🔥 `brand-strong` คือสี action เดียว: ปุ่ม primary, link, tab ที่เลือก, citation, focus ring ข้อความบนสีนี้ใช้ `on-brand` เสมอ
- `brand` (น้ำเงินจากโลโก้ #3479fa) ใช้กับโลโก้ ไอคอน และพื้นที่ใหญ่เท่านั้น — contrast บนขาว 3.99:1 จึงห้ามใช้เป็นตัวอักษรเล็ก
- `brand-soft` สำหรับสถานะ “เลือกอยู่/เปิดอยู่” (ค้นเว็บเปิด, เอกสาร Knowledge ที่เลือก, citation pill)
- Surface ลำดับชั้น `canvas` > `surface-subtle` (หัวตาราง, footer dialog) > `surface-sunken` (bubble ผู้ใช้, hover, track ของ segmented) — `surface-raised` + `line` สำหรับ card/menu/dialog
- สถานะ `success` / `warning` / `danger` คู่กับ `*-soft` เป็นพื้น ทุกสถานะต้องมีไอคอนหรือคำกำกับเสมอ ไม่ใช้สีอย่างเดียว
- Dark theme ใช้ชื่อ token เดิมทุกตัว (ค่าต่างกัน) ปุ่ม primary ใน dark เป็นน้ำเงินอ่อนพร้อมตัวอักษรเข้ม (`on-brand` #0a1430) ทุกคู่ตัวอักษร/พื้นผ่าน 4.5:1 ทั้งสอง theme (ดู usage ของแต่ละ token)

### Typography

- ฟอนต์เดียว `--font-sans` = IBM Plex Sans Thai (Google Fonts, น้ำหนัก 400/500/600/700) ครอบคลุมทั้งไทยและละติน · `--font-mono` = IBM Plex Mono สำหรับรหัสผ่านชั่วคราว, permission key, audit action
- Scale (ค่าฐาน +0 pt) `display` 32 · `h1` 28 · `h2` 22 · `h3` 18 · `h4` 16 · `body-lg` 16 (ข้อความแชต) · `body` 14 · `small` 13 · `caption` 12 · `label` 14/500
- 🔥 Font size ปรับได้ 0–4 pt บนค่าฐาน ค่าเริ่มต้น **+1 pt** — implement เป็น `font-size: calc(<base> + var(--font-adjust))` (ดู `bundle.css` ตัวแปร `--ba-fs-*`) ห้าม fix px ในคอมโพเนนต์
- Line-height แบบ unitless และสูงกว่าปกติเพื่อสระบน/ล่างและวรรณยุกต์ไทย: body 1.65, ข้อความแชต 1.75, heading 1.25–1.5 ห้ามต่ำกว่า 1.25 กับข้อความไทย
- น้ำหนัก 600 สำหรับ heading, 500 สำหรับ label/nav, 400 เนื้อหา ไม่ใช้ italic กับภาษาไทย ตัวพิมพ์ใหญ่ทั้งคำใช้เฉพาะ label กลุ่มใน sidebar (ภาษาอังกฤษ)

### Spacing, layout & breakpoints

- Grid 4px: `space-1` 4 … `space-16` 64 ระยะในฟอร์ม `space-4` ระหว่าง section `space-6` padding หน้า desktop `space-8` mobile `space-4`
- Layout desktop = Sidebar `width-sidebar` 272px + header `height-header` 56px + เนื้อหากว้างสุด `width-content` 1120px ข้อความแชตและ composer กว้างสุด `width-chat` 768px
- Breakpoints `bp-md` 760px (ต่ำกว่านี้เป็น mobile shell: top bar 56px + drawer) · `bp-lg` 1100px (sidebar เต็ม, ตาราง Knowledge ครบทุกคอลัมน์) · `bp-xl` 1440px
- Mobile: ตารางรายการหลัก (Knowledge, Create files) เปลี่ยนเป็น list แบบ DocumentRow, Dialog เป็น bottom sheet, touch target ≥ `size-touch` 44px

### Shape, borders & elevation

- Corporate radius เล็ก `radius-xs` 2 · `radius-sm` 4 (badge/chip) · `radius-md` 6 (ปุ่ม/input) · `radius-lg` 8 (card/ตาราง/menu) · `radius-xl` 12 (composer/dialog เท่านั้น) · `radius-pill` เฉพาะ switch/avatar
- ใช้เส้น `line` 1px แบ่งส่วนมากกว่าเงา เงา `shadow-sm` ปุ่ม secondary · `shadow-md` composer/menu/toast · `shadow-lg` dialog/drawer
- ไม่มี gradient, ไม่มี card ที่มีแถบสีด้านซ้าย (ยกเว้นตัวบ่งชี้ nav ที่เลือกใน sidebar)

### States & motion

- Hover = พื้น `surface-sunken` (บน navy ใช้ `sidebar-hover`) · Pressed/selected = `brand-soft` + `brand-strong`
- 🔥 Focus = outline 2px `focus-ring` offset 2px ทุก element ที่กดได้ (บน navy ใช้ `sidebar-accent`) input ใช้ border `brand-strong` + halo `brand-soft` 3px
- Disabled = opacity .45 + cursor not-allowed และต้องมีเหตุผลใกล้ ๆ (tooltip/hint)
- Loading แยกตามงาน: ปุ่ม = spinner ในปุ่ม · รายการแรก = Skeleton · upload/OCR = ProgressBar มีตัวเลขหน้า · generation = indeterminate bar + “กำลังสร้าง…” · แชต = status line > caret streaming > ปุ่ม Stop
- Motion `duration-fast` 120ms hover · `duration-base` 180ms menu · `duration-slow` 280ms dialog/drawer/toast ด้วย `ease-standard` เคารพ `prefers-reduced-motion`

## Iconography

- ไอคอนเส้น 24px grid, stroke 1.75, round caps/joins สี `currentColor` ขนาด 16 (ใน chip/ปุ่ม sm) · 18 (ค่าเริ่มต้น) · 20–22 (empty state/dialog)
- ชุดใน `bundle.js` (`B.Icon`) วาดเองให้ตรงสเปก และ **ตั้งชื่อตาม Lucide** — ฝั่ง production ให้ใช้ `lucide-react` ชื่อเดียวกัน (`message-square` สำหรับ `chat`, `book-open` สำหรับ `book`, `layers` สำหรับ `library`, `sliders-horizontal` สำหรับ `settings`, `sparkles`/`spark` ใช้ไอคอนดาวสี่แฉกของแบรนด์) ⚠︎ ไม่มีชุดไอคอนต้นฉบับจากระบบเดิม จึงเป็นการเลือกใหม่ที่ต้องอนุมัติ
- ไม่มี emoji ใน UI ไอคอนที่สื่อความหมาย (สถานะ, ล็อก) ต้องมีข้อความกำกับเสมอ

## Logo

- ใช้ไฟล์ใน asset group **Logos** เท่านั้น — wordmark ใน product, logo เต็มพร้อม tagline เฉพาะหน้า Login/การตลาด
- บน `sidebar` (navy) และ dark theme ใช้เวอร์ชัน reversed ที่ทำจากไฟล์ต้นฉบับ (ต้องให้เจ้าของแบรนด์อนุมัติ และขอไฟล์ SVG ต้นฉบับ)
- Spark สองดวงจากโลโก้คือ avatar ของ BenterAI ในแชต และเป็น motif เดียวของแบรนด์ (ใช้ใน cover) ห้ามนำไปทำ pattern ในหน้าจอใช้งาน
