# Conceptual Report: JS Engine, Runtime, DOM, Env Variables

## JavaScript Engine
- JS engine เช่น V8 (Chrome/Node), SpiderMonkey (Firefox) แปล JavaScript เป็น bytecode/เครื่องจักร.
- ส่วนประกอบหลัก: parser, compiler, garbage collector.
- ในโปรเจกต์นี้ backend ใช้ Node.js (V8) แปล `server.js` ขณะ runtime.

## JavaScript Runtime
- Runtime คือสภาพแวดล้อมที่รันโค้ด เช่น Node.js/Browser.
- มี API ที่ไม่ใช่ core JS เช่น `require`, `process`, `fetch` (ใน browser) และ I/O.
- `server.js` ใช้ Express, cors และ dotenv จาก runtime ของ Node.
- `frontend` รันใน browser ผ่าน bundle สร้างโดย Vite.

## DOM (Document Object Model)
- DOM เป็น API browser สำหรับจัดการโครงสร้าง HTML/CSS.
- React สร้าง virtual DOM เพื่อ diff payload และอัพเดตจริงน้อยที่สุด.
- `App.jsx` render UI, update state (notes) แล้ว React จะ update DOM.

## Environment Variables
- env vars เก็บค่าลับ/คอนฟิกต่าง ๆ เช่น `PORT`, `SECRET_KEY`.
- ต้องไม่ commit `.env` ลง Git (เหตุผล: secret leak).
- Backend: `dotenv` โหลดค่า `.env` แล้วใช้ process.env.
- Frontend (Vite): `import.meta.env.VITE_*` เพื่อเข้าถึงค่า env.

## HTTP Protocol
- API ใช้ GET/POST/DELETE ตาม REST.
- สถานะตอบรับใน server:
  - `200` ข้อมูลปกติ
  - `201` สร้างสำเร็จ
  - `400` ขอผิด
  - `403` auth ผิด
  - `404` ไม่พบ

## Full-stack flow
1. Browser => GET /api/notes => server ส่ง list
2. Add note => POST /api/notes (Authorization + body)
3. Delete note => DELETE /api/notes/:id (Authorization)
4. UI update: React fetch ใหม่ => render note list
