# Project LOOP (Zidio)

**AI-Powered Customer Feedback Intelligence & VoC Analytics Platform**

Project LOOP is an enterprise-grade, multi-tenant AI customer feedback intelligence SaaS platform designed to centralize, organize, analyze, and extract actionable insights from customer feedback across multiple channels in a single unified dashboard.

---

## Key Features

### 🏢 1. Multi-Tenant Workspaces & RBAC
- **Strict Data Isolation**: Tenant data separation at the database layer ensuring every feedback entry belongs exclusively to a specific workspace.
- **Role-Based Access Control (RBAC)**:
  - **ADMIN**: Workspace settings, user invitations, RBAC permissions management, API keys, and full CRUD.
  - **ANALYST**: Feedback ingestion, Inbox pipeline management, AI Q&A, and VoC executive report generation.
  - **VIEWER**: Read-only access to Dashboards, Feedback Inbox, and generated VoC reports.

### 📥 2. Multi-Channel Feedback Ingestion
- **Single Manual Ingestion**: Interactive UI form for adding custom customer reviews.
- **CSV Bulk Import**: Native parser for importing bulk feedback datasets with column mapping.
- **Simulated Integrations**: One-click simulated webhook ingestors for Zendesk, Intercom, App Store, Play Store, and Trustpilot.

### 📋 3. Feedback Inbox & Status Workflow Pipeline
- **Paginated Inbox**: Server-side pagination, global text search, and filtering by channel, date, sentiment score, category, and status.
- **Status Workflow**: Track lifecycle from `NEW` → `REVIEWED` → `ACTIONED`.

### 📊 4. Interactive Analytics Dashboard (Recharts)
- **Feedback Volume Timeline**: Track feedback velocity over time.
- **Sentiment Breakdown**: Visual ratio of `Positive`, `Negative`, `Neutral`, and `Mixed` customer reviews.
- **Top Friction Heatmap**: Issue category frequency and sentiment severity heatmap.

### 🤖 5. Core AI Capabilities (Claude API + RAG Vector Search)
- **Automated AI Classification**: Real-time structured JSON extraction returning Sentiment Tag, Score (-1.0 to +1.0), and Category (Billing, UX/UI, Performance, Bug, Feature Request).
- **"Ask LOOP" (RAG Q&A Engine)**: Conversational chat interface over workspace feedback using semantic vector retrieval with source citations.
- **Voice-of-Customer (VoC) Executive Reports**: 1-Click weekly VoC report generation with key risks, sentiment summary, and strategic feature recommendations.

---

## Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | **Next.js 14 (App Router)** + **TypeScript** |
| **Styling** | **Tailwind CSS** + **Lucide React Icons** |
| **Database & ORM** | **PostgreSQL** + **Prisma ORM** |
| **Authentication** | **NextAuth.js (Auth.js)** + **Zod** |
| **AI & Vector Search** | **Anthropic Claude API** + **`pgvector`** |
| **Data Visualization** | **Recharts** |

---

## Project Structure

```
├── app/
│   ├── api/
│   │   ├── ai/ask-loop/          # RAG Q&A Endpoint
│   │   ├── auth/[...nextauth]/   # NextAuth authentication
│   │   ├── feedback/             # Feedback ingestion & inbox status API
│   │   ├── reports/              # VoC executive report generation API
│   │   └── workspace/            # Workspace management & member RBAC API
│   ├── dashboard/                # Analytics, Inbox, Ingest, VoC Reports UI
│   ├── login/                    # Login page
│   ├── layout.tsx                # Root layout & providers
│   └── page.tsx                  # Home landing page
├── components/                   # Reusable UI components & Recharts charts
├── lib/                          # Prisma client, Auth config, AI Engine helpers
├── prisma/                       # Database schema, seed data script & migrations
├── prd/                          # Product Requirement Documents
└── README.md
```

---

## Getting Started

### Prerequisites
- **Node.js**: v18.x or higher
- **npm** / **yarn** / **pnpm**
- **PostgreSQL Database**

### 1. Clone the Repository
```bash
git clone git@github.com:itsashish1/zidio.git
cd zidio
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Setup Environment Variables
Create a `.env` file in the root directory:
```env
DATABASE_URL="postgresql://user:password@localhost:5432/zidio_db?schema=public"
NEXTAUTH_SECRET="your-super-secret-key"
NEXTAUTH_URL="http://localhost:3000"
ANTHROPIC_API_KEY="your-anthropic-api-key"
```

### 4. Setup Database & Prisma
```bash
# Generate Prisma Client
npx prisma generate

# Run Database Migrations
npx prisma db push

# Seed the Database with sample feedback & users
npx prisma db seed
```

### 5. Run Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to explore the platform.

---

## License

This project is licensed under the MIT License.
