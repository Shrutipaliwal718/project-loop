# 🔄 LOOP — AI Customer-Feedback Intelligence Platform

[![Next.js](https://img.shields.io/badge/Next.js-14.2.35-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Prisma](https://img.shields.io/badge/Prisma-6.19-2D3748?style=for-the-badge&logo=prisma)](https://www.prisma.io/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Supabase-336791?style=for-the-badge&logo=postgresql)](https://supabase.com/)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)

> **Listen • Understand • Build Better**  
> **LOOP** transforms raw, chaotic customer feedback into high-impact, actionable product intelligence using AI-driven sentiment analysis, automated theme clustering, and real-time trend tracking.

---

## 🌟 Key Highlights

- 📊 **Executive Intelligence Dashboard**: Real-time feedback volume metrics, dynamic sentiment distribution (Positive, Neutral, Negative), and top customer theme distributions.
- 🚨 **Action Signals & Emerging Issues**: AI algorithms detect recurring friction, negative sentiment spikes, and prioritize blockers before they escalate.
- 📈 **Trends & Predictive Analytics**: Interactive historical tracking with multi-range time filters (`7 Days`, `12 Days`, `30 Days`) backed by live API recalculations.
- 💬 **Ask LOOP (AI Assistant)**: Natural language conversational search powered by Gemini to ask questions like *"What are users complaining about in Checkout?"* or *"Summarize mobile app feedback"*.
- 📥 **Multi-Channel Ingestion & Bulk CSV**: Ingest feedback via manual entry, simulated channels (Twitter, App Store, Zendesk, Survey), or bulk CSV upload.
- 📄 **Executive Reporting**: One-click Voice-of-Customer summary generation with actionable recommendations for leadership and product stakeholders.
- ⚙️ **Interactive Settings & Preferences**: In-app modal for account profile editing, instant Dark/Light mode theme switching, alert thresholds, and workspace management.
- 🏢 **Multi-Tenant Workspaces & RBAC**: Complete workspace isolation with Role-Based Access Control (`ADMIN`, `ANALYST`, `VIEWER`) and team invitation management.
- 🎨 **Cyberpunk Glow & Modern Light Themes**: Crafted with glassmorphism, tailored gradients, and high contrast for dark mode and modern light mode.

---

## 🏗️ Architecture & Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | [Next.js 14](https://nextjs.org/) (App Router, Server Components & Route Handlers) |
| **Language** | [TypeScript](https://www.typescriptlang.org/) (Strict Mode) |
| **Styling** | [Tailwind CSS](https://tailwindcss.com/) + Custom CSS Glassmorphic Design System |
| **Data Visualization** | [Recharts](https://recharts.org/) (Responsive Area, Bar, and Donut charts) |
| **Database & ORM** | [PostgreSQL](https://www.postgresql.org/) (Hosted on Supabase) with [Prisma ORM v6](https://www.prisma.io/) |
| **Authentication** | Custom JWT authentication with HTTP-only secure cookies and `bcryptjs` encryption |
| **AI Engine** | [Google Gemini 3.5 Flash Lite](https://ai.google.dev/) (`@google/genai`) with resilient local fallback engine |

---

## 📁 Project Directory Structure

```text
project-loop/
├── prisma/
│   └── schema.prisma            # Prisma schema (Workspace, User, Feedback, Theme, Report)
├── public/                      # Static assets & icons
├── src/
│   ├── app/                     # Next.js App Router
│   │   ├── admin/members/       # Team members & workspace invitation management
│   │   ├── api/                 # Backend REST endpoints (auth, dashboard, feedback, reports, AI)
│   │   ├── ask/                 # Ask LOOP natural language AI interface
│   │   ├── dashboard/           # Main executive intelligence dashboard
│   │   ├── inbox/               # Feedback ingestion & stream management
│   │   ├── login/ & signup/     # Authentication pages
│   │   ├── profile/             # User account & profile management
│   │   ├── reports/             # Executive intelligence reports
│   │   ├── trends/              # Historical trend analytics & insights
│   │   ├── globals.css          # Core design tokens, light & dark theme styling
│   │   └── layout.tsx           # Root layout & font configurations
│   ├── components/              # Modular UI components
│   │   ├── Auth/                # Login, signup & auth wrappers
│   │   ├── Common/              # AppNavbar, Sidebar, AppLayout, Settings & Help modals
│   │   ├── Dashboard/           # Stats, Sentiment, Themes, Action Signals, Emerging Issues
│   │   ├── Feedback/            # Manual input, CSV upload, Simulated channels
│   │   └── Trends/              # Sentiment trends, Theme velocity, Range selector
│   └── lib/
│       ├── ai/                  # Gemini AI engine, classification & fallback synthesis
│       ├── prisma.ts            # Global Prisma database client instance
│       ├── require-auth.ts      # Server-side authentication & RBAC middleware
│       ├── theme.ts             # Theme state manager (Dark / Light)
│       └── seed-workspace.ts    # Realistic mock feedback & historical trend generator
├── .env                         # Environment variables (Database & Secrets)
├── package.json                 # Project dependencies & build scripts
└── tailwind.config.ts           # Tailwind CSS configuration
```

---

## 🚀 Getting Started Locally

### 1. Clone the Repository
```bash
git clone https://github.com/Shrutipaliwal718/project-loop.git
cd project-loop
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Setup Environment Variables
Create a `.env` file in the root directory (or update the existing one):

```env
# PostgreSQL connection string (Supabase, Neon, or local PostgreSQL)
DATABASE_URL="postgresql://username:password@host:5432/database?sslmode=require"

# JWT session encryption key
AUTH_SECRET="your-super-secret-jwt-key"

# Optional: Google Gemini API key for AI summaries & classification
GEMINI_API_KEY="your-gemini-api-key"
```

### 4. Sync Database Schema
Generate Prisma client and synchronize tables:
```bash
npx prisma db push
```

### 5. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## ☁️ Deploying to Vercel

This repository is pre-configured for deployment on **[Vercel](https://vercel.com/)**:

1. Log in to [vercel.com](https://vercel.com) and click **"Add New..." ➔ "Project"**.
2. Select your repository: **`Shrutipaliwal718/project-loop`**.
3. Under **Environment Variables**, add:
   - `DATABASE_URL` — Your hosted PostgreSQL / Supabase connection URL.
   - `AUTH_SECRET` — A secure secret key for JWT session cookies.
   - `GEMINI_API_KEY` *(Optional)* — Your Gemini API key.
4. Click **Deploy**. Vercel will run `postinstall: prisma generate` and `next build` automatically.

---

## 👥 User Roles & Permissions (RBAC)

| Feature / Action | Admin | Analyst | Viewer |
|---|:---:|:---:|:---:|
| View Dashboard & Metrics | ✅ | ✅ | ✅ |
| View Historical Trends | ✅ | ✅ | ✅ |
| Query "Ask LOOP" AI | ✅ | ✅ | ✅ |
| Ingest & Classify Feedback | ✅ | ✅ | ❌ |
| Generate & Export Reports | ✅ | ✅ | ❌ |
| Invite Members & Manage Roles | ✅ | ❌ | ❌ |
| Edit Workspace Settings | ✅ | ❌ | ❌ |

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
