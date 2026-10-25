# Screens, states & flows

ทุก card ในกลุ่ม **Screens** เป็นหน้าจอที่กดได้จริง แถบด้านบนสลับ Device · Theme · ภาษาเนื้อหา · ภาษาเมนู · Font +0–+4 และแถว **State** เลือกสถานะที่ต้องรีวิว

| URL | Card | States ที่ออกแบบ | Permission |
|---|---|---|---|
| `/` | ScreenLogin | ว่าง · กำลังเข้าสู่ระบบ · รหัสผิด · rate limit · บัญชีถูกระงับ · รออนุมัติ | สาธารณะ |
| `/reset` · `/reset?token=` | ScreenReset | ขอลิงก์ · ส่งแล้ว (ไม่เปิดเผยว่ามีบัญชี) · ตั้งรหัสใหม่ · รหัสสั้นกว่า 10 ตัว · ลิงก์หมดอายุ · สำเร็จ | สาธารณะ / token |
| `/app/chat` | ScreenNewChat | เริ่มต้น · เมนู + · เพิ่มจากไลบรารี · ไฟล์กำลังอ่าน · ไฟล์พร้อม · ชนิดไฟล์ไม่อนุญาต · เกิน 5 MB · เลือกเอกสาร 1 ฉบับ · ค้นเว็บเปิด · ไม่มี `chat.use` (+ Role Admin/Member) | `chat.use` |
| `/app/chat/:id` | ScreenChatThread | ตอบพร้อม citation · กำลังตอบ (Stop) · เปิดแหล่งอ้างอิง · ค้นเว็บ · ตอบไม่สำเร็จ · โควตาหมด · Mobile drawer | เจ้าของแชต |
| `/app/knowledge` | ScreenKnowledge | รายการ · OCR กำลังทำ · กำลังโหลด · ว่าง · แชร์ให้กลุ่ม · เวอร์ชัน · ยืนยันลบ · toast ผิดพลาด · ไม่มี `documents.use` | `documents.use` |
| `/app/files` | ScreenCreateFiles | รายการงาน (pending / processing / ready / failed) · กำลังส่งงาน · ว่าง | `chat.use` |
| `/app/organization` | ScreenOrgAccess | ผู้ใช้ · สร้างผู้ใช้ · รหัสชั่วคราว (แสดงครั้งเดียว) · ยืนยันระงับ · กลุ่มและสิทธิ์ · โมเดล · Audit log · นโยบายข้อมูล · ยืนยัน Cleanup · ไม่มีสิทธิ์ | `users.list` + สิทธิ์ย่อย |
| `/app/organization/usage` | ScreenUsage | ปกติ · ใกล้ครบโควตา · ไม่มี `usage.manage` | `usage.manage` |
| `/app/settings` | ScreenSettings | ค่าเริ่มต้น · บังคับเปลี่ยนรหัส · รหัสปัจจุบันผิด · บันทึกแล้ว | ผู้ใช้ที่ล็อกอิน |

## Flow map

**Flow A · Chat + Knowledge + citation** (card *Prototype* > A)

▪️ Login > `/app/chat` (หน้าต้อนรับ ไม่มี Overview) > เมนู Knowledge > อัปโหลดเอกสาร > สถานะ รอคิว > กำลังประมวลผล (OCR หน้า n/N) > พร้อมใช้ + toast > AI conversations > `+` > เพิ่มจากไลบรารี > เลือกเอกสาร (Knowledge mode = เลือก 1 ฉบับ, chip เอกสารใน composer) > ส่ง > status line > streaming + Stop > คำตอบพร้อม `[1] [2]` > กดแหล่งอ้างอิง > excerpt พร้อมชื่อเอกสาร + เลขหน้า

**Flow B · Admin สร้างผู้ใช้และกำหนดสิทธิ์** (card *Prototype* > B)

▪️ Login > Organization > ผู้ใช้ > สร้างผู้ใช้ (อีเมล · ชื่อ · กลุ่ม) > dialog รหัสผ่านชั่วคราว (แสดงครั้งเดียว, ต้องกดยืนยันว่าบันทึกแล้ว) > กลุ่มและสิทธิ์ > ติ๊ก permission ของกลุ่ม > บันทึก > toast “มีผลกับสมาชิกทุกคนทันที”

**Flow อื่นที่กดได้ในทุก Screen card**

▪️ `+` > สร้างรูปภาพ > ไป Create files พร้อม prompt เดิม และเลือก PNG ไว้
▪️ Recent chats > `…` > เปลี่ยนชื่อ (inline) / ปักหมุด / ส่งออก .md / ลบ (dialog)
▪️ Settings > การแสดงผล > Font size และ Theme เปลี่ยนทั้งหน้าทันที · ภาษาเมนู/เนื้อหาเปลี่ยนแยกกัน
▪️ Login > ลืมรหัสผ่าน > ส่งลิงก์ > กลับเข้าสู่ระบบ · Sign out จาก sidebar
