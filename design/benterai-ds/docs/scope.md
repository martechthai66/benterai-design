# Visual redesign vs new features

แยกไว้ชัดเจนเพื่อให้ Codex ไม่ตีความผิด — **ส่วน A** ทำได้ใน frontend อย่างเดียวโดยใช้ API เดิม **ส่วน B** ต้องเพิ่ม/แก้ backend หรือเปลี่ยนพฤติกรรม ต้องอนุมัติแยก

## A · Visual / layout redesign (ไม่ต้องแก้ API)

▪️ Token ชุดใหม่ทั้งหมด (สี light/dark, IBM Plex Sans Thai, spacing 4px, radius corporate, shadow, motion) แทน `system-ui` + `#0755f5` เดิม
▪️ Sidebar สี navy พร้อม wordmark reversed, ปุ่ม New chat แบบ primary, ตัวบ่งชี้ nav ที่เลือก, Recent chats แบ่งกลุ่ม Pinned / Today / Previous 7 days
▪️ เมนูที่ไม่มีสิทธิ์แสดงแบบล็อก + tooltip (ข้อมูลสิทธิ์มีอยู่แล้วใน `/api/me`)
▪️ Mobile shell ใหม่ — top bar 56px + drawer (แทนแถบเมนูแนวนอนเดิม) ข้อมูลและเมนูครบเท่าเดิม
▪️ หน้าต้อนรับแชต + composer hero, ปุ่ม `+` เป็นเมนู 4 รายการ, chip ค้นเว็บ, ModelPicker ใน composer, แถว Knowledge mode แบบ segmented, ข้อความแจ้งการส่งข้อมูลให้โมเดลภายนอก
▪️ ข้อความแชต: bubble ผู้ใช้ / คำตอบไม่มี bubble + spark avatar, citation marker `[n]`, SourceList + excerpt (ใช้ข้อมูลแหล่งอ้างอิงที่เก็บอยู่แล้ว)
▪️ Knowledge: dropzone, ตัวกรองสถานะ, ตาราง + OCR progress, dialog แชร์/เวอร์ชัน/ลบ, list บน mobile
▪️ Create files: การ์ดเลือกรูปแบบ 4 แบบ, รายการงานพร้อมสถานะ 4 ระดับ
▪️ Organization: tabs + segmented 5 ส่วน, ตารางผู้ใช้, permission matrix ของกลุ่ม, ตารางโมเดล (default/fallback), Audit log, Data policy, dialog รหัสชั่วคราว
▪️ AI Usage & Limits: stat tiles, กราฟรายวัน, UsageMeter รายคน
▪️ Settings: แบ่ง 5 หมวด, font size slider พร้อม preview, theme/ภาษาแบบ segmented
▪️ Pattern dialog ยืนยันการลบเดียวกันทั้งระบบ, Toast, EmptyState สำหรับ ว่าง / ไม่มีสิทธิ์ / ลิงก์หมดอายุ

## B · New capability proposals (ต้องอนุมัติ + งาน backend)

| ข้อเสนอ | เหตุผล | ผลกระทบ |
|---|---|---|
| ปุ่ม **ส่งอีกครั้ง** (Retry) บนคำตอบที่ error | ลดการพิมพ์ใหม่เมื่อ stream ขาด | ต้องมี endpoint/flag regenerate จาก message เดิม |
| **Drag & drop** อัปโหลดใน Knowledge และ composer | ผู้ใช้ desktop คาดหวัง | ฝั่ง UI เป็นหลัก ใช้ upload API เดิม — ยืนยันว่าไม่ชนกับ paste handler |
| **แนบหลายไฟล์ต่อ composer** | ปัจจุบันจำกัด 1 ไฟล์ | ต้องแก้ `/api/chat` ให้รับ attachment หลายรายการ (แบบนี้ยังแสดงแค่ 1 ไฟล์) |
| **Toast แจ้งเอกสารพร้อมใช้** แม้อยู่หน้าอื่น | ลดการ poll ด้วยสายตา | ต้องมี polling ระดับ app หรือ push |
| ตัวกรองเวลา/ประเภทใน **Audit log** และส่งออก **CSV** | ผู้ตรวจสอบต้องการ | ตรวจว่า `/api/admin/audit` รองรับ query เหล่านี้หรือยัง |
| **กราฟคำขอรายวัน** + Tokens / Web searches tiles | ผู้บริหารดูแนวโน้ม | `/api/admin/usage` ต้องคืนข้อมูลรายวันและแยกประเภท |
| **Prompt ตัวอย่าง** ในหน้าต้อนรับ | ไม่ได้ใส่ในแบบนี้ — เผื่ออนาคต | ต้องมีที่เก็บ prompt ขององค์กร |

🔥 ถ้าไม่อนุมัติส่วน B ให้ซ่อนองค์ประกอบนั้น — หน้าจอทั้งหมดยังทำงานครบด้วย API ตามเอกสารเดิม
