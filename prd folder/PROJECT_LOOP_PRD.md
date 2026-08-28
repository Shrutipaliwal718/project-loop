# Product Requirement Document (PRD): Project LOOP
**AI-Powered Customer Feedback Intelligence Platform**

---

## 1. Executive Summary & Vision
**Project LOOP** is an enterprise-grade, multi-tenant AI customer feedback intelligence SaaS platform designed to centralize, organize, and analyze customer feedback from multiple channels in one unified system. 

By leveraging **Anthropic Claude API (`claude-sonnet-4-6`)** and **`pgvector` semantic vector search**, Project LOOP automatically classifies sentiment, clusters recurring themes, flags emerging trend spikes, provides an **"Ask LOOP" RAG Q&A engine**, and generates 1-click Voice-of-Customer (VoC) executive reports.

---

## 2. Core Functional Requirements & Features

### 2.1 Multi-Tenant Workspaces & RBAC
- **Workspace Isolation**: Strict tenant data separation at the database layer (each feedback entry belongs to a specific `Workspace`).
- **Role-Based Access Control (RBAC)** (3 Roles):
  - `ADMIN`: Full access (Workspace settings, user invitations, RBAC management, API keys, full CRUD & AI features).
  - `ANALYST`: Access to feedback ingestion, Inbox management, status pipeline, AI Q&A, and VoC report generation.
  - `VIEWER`: Read-only access to Dashboards, Feedback Inbox, and generated VoC reports.

### 2.2 Multi-Channel Feedback Ingestion (3 Methods)
1. **Single Manual Entry**: Interactive UI form to add custom individual feedback entries.
2. **CSV Bulk Upload**: Parsed CSV importer supporting bulk feedback dataset ingestion with column mapping.
3. **Simulated Integration Buttons**: One-click simulated webhooks/ingestors for Zendesk, Intercom, App Store, Play Store, and Trustpilot.

### 2.3 Feedback Inbox & Status Pipeline
- **Server-Side Pagination & Filtering**: Filter by channel, date range, sentiment grade, category tag, and status.
- **Status Workflow Pipeline**:
  - `NEW` $\rightarrow$ `REVIEWED` $\rightarrow$ `ACTIONED`
- **Global Search**: Instant text search across feedback titles and content.

### 2.4 Interactive Analytics Dashboard (Recharts)
- **Real-Time Visualizations** (3 Core Charts):
  1. **Feedback Volume Timeline**: Area/Line chart showing daily/weekly feedback velocity.
  2. **Sentiment Breakdown**: Donut/Pie chart displaying `Positive`, `Negative`, `Neutral`, and `Mixed` ratios.
  3. **Top Themes & Friction Heatmap**: Bar chart showing top issue categories and sentiment scores.

### 2.5 4 Core AI Capabilities (Anthropic Claude API + `pgvector`)
1. **Auto-Classification**: Ingestion-time AI analysis returning structured JSON:
   - Sentiment Tag (`Positive`, `Negative`, `Neutral`, `Mixed`)
   - Sentiment Score (`-1.0` to `+1.0`)
   - Category / Sub-topic (e.g., *Billing*, *UX/UI*, *Performance*, *Bug*, *Feature Request*)
2. **Theme Clustering & Emerging Trend Detection**:
   - Grouping feedback into macro-themes and detecting sudden frequency spikes (alerting team on emerging product bugs or friction).
3. **"Ask LOOP" (RAG Q&A Engine)**:
   - Natural language conversational chat over workspace feedback using `pgvector` semantic vector retrieval.
   - Answers cite exact feedback source IDs and quotes for 100% factual accuracy.
4. **Voice-of-Customer (VoC) Executive Reports**:
   - 1-Click weekly VoC digest generation.
   - Exportable as PDF or viewable on a shareable web page with key insights, top risks, and feature recommendations.

---

## 3. Prescribed Standardized Tech Stack

| Layer | Technology | Rationale & Description |
|---|---|---|
| **Framework** | **Next.js 14 (App Router) + TypeScript** | Full-stack architecture with App Router, Server Components, and Server Actions. |
| **Styling** | **Tailwind CSS** | Premium utility CSS with dark/light mode and modern component design. |
| **Database & ORM** | **PostgreSQL (Neon / Supabase) + Prisma ORM** | Relational integrity, type-safe queries, and workspace multi-tenancy. |
| **Auth & Validation** | **NextAuth.js (Auth.js) + Zod** | Role-based session management and end-to-end API boundary validation. |
| **AI Engine & Search** | **Anthropic Claude API (`claude-sonnet-4-6`) + `pgvector`** | Structured JSON classification, RAG semantic search, and VoC report synthesis. |
| **Charts & Hosting** | **Recharts + Vercel** | Interactive dashboard charts and zero-config serverless deployment. |

---

## 4. 4-Week Sprint Plan

### **Week 1: Foundation & Architecture**
- Setup Next.js 14 App Router project with TypeScript, Tailwind CSS, Prisma, and NextAuth.js.
- Design PostgreSQL schema with Prisma (User, Workspace, WorkspaceUser, Feedback, VectorEmbedding, VoCReport).
- Implement Multi-Tenant Workspace isolation and RBAC middleware (`ADMIN`, `ANALYST`, `VIEWER`).
- Build basic Single Feedback Entry CRUD and auth pages.

### **Week 2: Core Application & Ingestion Pipeline**
- Build CSV Bulk Upload parser with Zod schema validation.
- Implement Simulated Integration Buttons (Zendesk, Intercom, App Store, Trustpilot).
- Build paginated Feedback Inbox with status pipeline (`NEW` $\rightarrow$ `REVIEWED` $\rightarrow$ `ACTIONED`) and search filters.
- Build Interactive Analytics Dashboard UI with Recharts (Volume, Sentiment Breakdown, Top Themes).

### **Week 3: AI Engine & RAG Integration**
- Integrate Anthropic Claude API for background Auto-Classification (Sentiment, Score, Category JSON).
- Implement `pgvector` embedding pipeline for all ingested feedback entries.
- Build Theme Clustering and Emerging Trend spike detection algorithm.
- Develop **"Ask LOOP"** RAG Q&A chat interface with vector retrieval and source citation.

### **Week 4: Intelligence, VoC Reports & Final Polish**
- Develop 1-click Voice-of-Customer (VoC) Report generation (PDF & Shareable Page).
- Write database seed script generating **120+ realistic customer feedback entries** across diverse channels.
- UI polishing, micro-animations, mobile responsiveness, and dark mode refinement.
- Comprehensive `README.md` documentation and 3–5 min video demo walkthrough script.

---

## 5. Seed Data & Deliverables Checklist
- [ ] Multi-tenant isolation verified with RBAC rules.
- [ ] Seed database script with 120+ realistic multi-channel feedback rows.
- [ ] Real-time Recharts dashboards.
- [ ] Claude API auto-tagging + `pgvector` "Ask LOOP" vector search.
- [ ] VoC PDF report generator.
- [ ] Clean GitHub repository with documentation.
