## 🚀 Installation Instructions (วิธีติดตั้งและรันโปรเจค)

### 🔧 Backend Setup

1. ไปที่โฟลเดอร์ backend

   ```bash
   cd backend
   ```

2. ติดตั้ง dependencies

   ```bash
   npm install
   ```

3. สร้างไฟล์ `.env` ในโฟลเดอร์ backend แล้วใส่ค่า

   ```env
   PORT=3000
   SECRET_KEY=your_secret_key_here
   ```token ตัวอย่าง

4. รันเซิร์ฟเวอร์

   ```bash
   node server.js
   ```

---

### 🎨 Frontend Setup

1. ไปที่โฟลเดอร์ frontend

   ```bash
   cd frontend
   ```

2. ติดตั้ง dependencies

   ```bash
   npm install
   ```

3. สร้างไฟล์ `.env` ในโฟลเดอร์ frontend

   ```env
   VITE_API_URL=http://localhost:3000/api/notes
   VITE_SECRET_KEY=your_secret_key_here
   ``` token ตัวอย่าง

   👉 ใช้เชื่อมต่อกับ backend และส่ง token เพื่อยืนยันตัวตน

4. รัน frontend

   ```bash
   npm run dev
   ```

---

## 🌐 API Endpoints 

| Method | Endpoint       | Description          |
| ------ | -------------- | -------------------- |
| GET    | /api/notes     | ดึงข้อมูลโน้ตทั้งหมด |
| POST   | /api/notes     | เพิ่มโน้ตใหม่        |
| DELETE | /api/notes/:id | ลบโน้ตตาม id         |

---

## 🛠️ Tech Stack 

* Frontend: React + Tailwind CSS (Vite)
* Backend: Node.js + Express
* Communication: REST API (Fetch)

---




