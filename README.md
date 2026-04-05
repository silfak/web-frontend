# 🌿 SILFAK - Frontend Client

**Web-based Green Campus Facility Analytics & Reporting Management System**

Repositori ini adalah _frontend client_ untuk platform SILFAK, dibangun untuk memudahkan mahasiswa dan OB melaporkan pemborosan energi, serta menyediakan _dashboard_ analitik untuk Admin Sarpras FIK.

## 🚀 Tech Stack

- **Framework:** React 19 + Vite (JavaScript)
- **Styling:** Tailwind CSS v4
- **UI Components:** Shadcn UI (Radix Primitives)
- **Linting:** ESLint

## 🛠️ Installation & Setup

1. **Clone repository**

   ```bash
   git clone https://github.com/silfak/web-frontend.git
   cd silfak-frontend
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Environment setup**

   Buat file `.env` di root folder (copy dari `.env.example`):

   ```env
   VITE_API_BASE_URL=http://localhost:8000/api
   ```

4. **Run development server**

   ```bash
   npm run dev
   ```

   Aplikasi akan berjalan di http://localhost:5173.

## 📁 Folder Structure Overview

```plaintext
src/
├── assets/           # Gambar, icon, dan aset statis lainnya
├── components/ui/    # Dumb components (Button, Input dari Shadcn)
├── features/         # Smart components (Logic form, chart analitik)
├── pages/            # Rakitan halaman (Dashboard, Landing Page)
├── lib/              # Utility/helper functions (termasuk utils dari shadcn)
├── services/         # Konfigurasi API (Axios/Fetch)
└── App.jsx           # Root routing
```

## 🌿 Git Branching Strategy

- `main`: Production-ready (**no direct push**).
- `develop`: Base branch untuk integrasi.
- `feature/<nama-task>`: Fitur baru (contoh: `feature/report-form`).
- `fix/<nama-bug>`: Perbaikan bug (contoh: `fix/login-ui`).
