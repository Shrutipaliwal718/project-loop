# 📑 Comprehensive Project Report: LOOP — AI Customer-Feedback Intelligence Platform

---

## 1. Project Overview

### 1.1 Executive Summary
Modern digital products receive hundreds of thousands of customer reviews, bug reports, and survey responses every month across disconnected channels (App Store, Twitter/X, Zendesk, Email, In-App Surveys). Product and engineering teams face severe bottlenecks trying to manually aggregate, categorize, and prioritize this feedback, resulting in missed critical bugs and delayed product iterations.

**LOOP** is an enterprise-grade AI-powered Customer-Feedback Intelligence Platform engineered to solve this challenge. LOOP ingests unstructured multi-channel customer feedback, performs real-time sentiment scoring and theme categorization using large language models, provides historical trend analytics, detects rising friction signals, and provides an interactive natural language assistant for querying voice-of-customer data.

### 1.2 Core Objectives
- **Centralize Feedback**: Aggregate scattered customer voices into a unified, searchable workspace.
- **Automate Intelligence**: Eliminate manual tagging through zero-shot AI sentiment scoring and business theme classification.
- **Surface Actionable Signals**: Prioritize negative sentiment anomalies before they affect churn and app ratings.
- **Empower Decision Makers**: Provide natural language query capabilities ("Ask LOOP") and exportable executive intelligence reports.

---

## 2. Technology Stack

| Layer | Technology | Version / Provider | Rationale |
|---|---|---|---|
| **Frontend Framework** | **Next.js** (App Router) | v14.2.35 | Server-side rendering (SSR), optimized bundle size, fast First Contentful Paint. |
| **Language** | **TypeScript** | v5.x | End-to-end type safety, preventing runtime errors across data models and API contracts. |
| **Styling & UI** | **Tailwind CSS** + Vanilla CSS | v3.4 | Maximum design flexibility, bespoke Cyberpunk neon dark mode and high-contrast light mode. |
| **Data Visualization** | **Recharts** | v3.10 | Responsive, composable SVG charts for sentiment donuts, theme distributions, and trend lines. |
| **Backend & APIs** | **Next.js Route Handlers** | Node.js 20+ runtime | Serverless endpoints handling ingestion, authentication, analytics queries, and reporting. |
| **Database** | **PostgreSQL** | Supabase Cloud | Scalable relational storage with connection pooling (PgBouncer) and SSL security. |
| **ORM** | **Prisma ORM** | v6.19 | Declarative schema, automated migrations, type-safe database queries. |
| **AI & NLP Engine** | **Google Gemini 3.5 Flash Lite** | `@google/genai` | Low-latency, cost-effective reasoning for sentiment scoring, theme classification, and AI chat. |
| **Local Fallback NLP** | Heuristic Synthesis Engine | Custom In-Memory | Ensures 100% platform availability even during network disruptions or API quota limits. |
| **Authentication** | **JWT & Bcrypt** | `jose` & `bcryptjs` | Stateless session management with secure, tamper-proof `HttpOnly` cookies. |
| **Deployment** | **Vercel** | Edge Network | Automatic CI/CD pipeline linked to GitHub with zero-config serverless deployments. |

---

## 3. System Architecture & Data Flow

### 3.1 Architectural Diagram

```
+---------------------------------------------------------------------------------+
|                                 CLIENT TIER                                     |
|  +---------------------+  +---------------------+  +-------------------------+  |
|  | Executive Dashboard |  | Trends & Analytics  |  | Natural Language AI     |  |
|  | (Stats, Donut, Bars)|  | (7d, 12d, 30d Range)|  | ("Ask LOOP" Assistant)  |  |
|  +---------------------+  +---------------------+  +-------------------------+  |
|  +---------------------+  +---------------------+  +-------------------------+  |
|  | Feedback Ingestion  |  | Executive Reports   |  | Settings & Preferences  |  |
|  | (CSV, Manual, Stream|  | (Export / Insights) |  | (Theme, Alerts, RBAC)   |  |
|  +---------------------+  +---------------------+  +-------------------------+  |
+----------------------------------------+----------------------------------------+
                                         | HTTPS (JSON / REST API)
+----------------------------------------v----------------------------------------+
|                             NEXT.JS 14 BACKEND ENGINE                           |
|  +---------------------------------------------------------------------------+  |
|  | Authentication & RBAC Middleware (`require-auth.ts`)                      |  |
|  +---------------------------------------------------------------------------+  |
|  | Route Handlers:                                                           |  |
|  |  * `/api/dashboard`       - Aggregated metrics, theme distributions       |  |
|  |  * `/api/feedback`        - Ingestion, pagination, CSV bulk parser        |  |
|  |  * `/api/ai/ask-loop`     - Conversational query engine                   |  |
|  |  * `/api/reports`         - Executive report generator                    |  |
|  |  * `/api/auth/*`          - User sessions, registration, profile updates  |  |
+--------------------+-----------------------------------+------------------------+
                     |                                   |
                     v                                   v
+--------------------+--------------+   +----------------+------------------------+
|         AI INTELLIGENCE           |   |            PERSISTENCE TIER             |
|  +-----------------------------+  |   |  +-----------------------------------+  |
|  | Google Gemini 3.5 API       |  |   |  | PostgreSQL on Supabase Cloud      |  |
|  | (Classification & Chat)     |  |   |  | (Workspaces, Feedbacks, Themes)   |  |
|  +-----------------------------+  |   |  +-----------------------------------+  |
|  | Resilient Fallback Engine   |  |   |  | Prisma ORM Client (Type-Safe CRUD)|  |
|  | (Zero-downtime synthesis)   |  |   |  +-----------------------------------+  |
+-----------------------------------+   +-----------------------------------------+
```

### 3.2 Data Flow Pipeline
1. **Ingestion**: Feedback arrives from App Store, Twitter, Zendesk, Surveys, or Bulk CSV uploads.
2. **AI Classification**: The text is evaluated for sentiment score (`-1.0` to `+1.0`), categorical classification (`POS`, `NEU`, `NEG`), and business theme assignment.
3. **Database Normalization**: The feedback is linked to the active `Workspace` and stored in PostgreSQL.
4. **Aggregation**: Real-time aggregation pipelines calculate volume, sentiment ratios, theme growth velocity, and emerging friction alerts.
5. **Consumption**: Front-end charts update reactively, providing instant visibility to product managers.

---

## 4. Key Platform Features & Modules

### 4.1 Executive Intelligence Dashboard
- **Key Metrics Overview**: Real-time counter of total feedbacks, average sentiment index, active customer themes, and critical issue alerts.
- **Sentiment Distribution**: Donut visualization showing exact breakdown across Positive, Neutral, and Negative sentiments.
- **Top Business Themes**: Visual volume breakdown across core product pillars (Checkout, Performance, Dark Mode, Customer Support).
- **Action Signals**: Highlights high-urgency pain points that require immediate engineering intervention.
- **Emerging Issues**: AI radar flagging rising negative patterns before they trend.

### 4.2 Dynamic Trends & Predictive Analytics
- **Multi-Range Time Filtering**: Seamless switching between **7 Days**, **12 Days**, and **30 Days** with instant API recalculations.
- **Sentiment Trajectory**: Historical area chart showing sentiment evolution over time.
- **Theme Velocity**: Identifies which customer topics are gaining or losing momentum.

### 4.3 Ingestion & Bulk CSV Processing
- **Multi-Channel Feeds**: Ingestion forms supporting App Store, Twitter, Zendesk, Email, and In-App Surveys.
- **Bulk CSV Upload**: Drag-and-drop CSV importer with column mapping and schema validation.
- **Simulated Real-Time Channels**: Built-in test streaming simulator generating realistic multi-channel feedback for testing and presentations.

### 4.4 "Ask LOOP" AI Natural Language Search
- Ask natural language questions against customer feedback (e.g., *"What do users dislike about the checkout flow?"* or *"Why is mobile app satisfaction high?"*).
- AI retrieves relevant feedback items, synthesizes a concise executive answer, and cites feedback IDs as verifiable sources.

### 4.5 Executive Voice-of-Customer Reports
- Generates publication-ready executive reports containing executive summaries, KPI tables, top themes, and recommended product actions.

### 4.6 Multi-Tenant Workspace & Role-Based Access Control (RBAC)
- **Role Isolation**:
  - **ADMIN**: Full access including team member invitation, role modification, and workspace configurations.
  - **ANALYST**: Ingestion, classification, reporting, and dashboard viewing.
  - **VIEWER**: Read-only access to dashboards, trends, and reports.

### 4.7 Interactive Settings & Preferences
- In-app multi-tabbed settings modal:
  - **Profile**: Live name, email, and avatar editing with instant database sync.
  - **Theme**: Instant toggle cards between Cyberpunk Dark Mode and Modern Light Mode.
  - **Alerts**: Real-time toggles for Critical Negative Spikes (>20%) and Weekly Digests.
  - **Workspace**: 1-click Workspace ID copy, session security badge, and team management shortcuts.

---

## 5. Database Schema & Data Models

The relational database architecture is defined in Prisma ORM:

```prisma
model Workspace {
  id        String            @id @default(cuid())
  name      String            @unique
  createdAt DateTime          @default(now())
  feedbacks Feedback[]
  reports   Report[]
  themes    Theme[]
  users     User[]
  invites   WorkspaceInvite[]
}

model User {
  id           String    @id @default(cuid())
  name         String
  email        String    @unique
  passwordHash String
  role         Role      @default(ANALYST)
  profileImage String?
  workspaceId  String
  workspace    Workspace @relation(fields: [workspaceId], references: [id], onDelete: Cascade)
}

model Feedback {
  id             String         @id @default(cuid())
  content        String
  channel        String
  sentiment      SentimentType?
  sentimentScore Float?
  featureArea    String?
  status         FeedbackStatus @default(NEW)
  customerLabel  String?
  workspaceId    String
  workspace      Workspace      @relation(fields: [workspaceId], references: [id], onDelete: Cascade)
  createdAt      DateTime       @default(now())
}

enum Role {
  ADMIN
  ANALYST
  VIEWER
}

enum SentimentType {
  POS
  NEU
  NEG
}
```

---

## 6. Security, Performance & Code Quality

1. **Authentication & Data Protection**:
   - Passwords hashed using `bcryptjs` with salt rounds.
   - JWT tokens signed with `AUTH_SECRET` and transmitted via strict `HttpOnly`, `SameSite=Lax` cookies to prevent XSS.
   - Multi-tenant query scoping: All database queries are strictly filtered by `workspaceId`.
2. **Resilience & Fault Tolerance**:
   - Zero-crash AI design: When external LLM APIs experience rate limits or network issues, the platform falls back to an intelligent in-memory heuristic engine.
3. **Build & Type Safety**:
   - Strict TypeScript configuration (`npx tsc --noEmit` verified with 0 errors).
   - Clean Next.js 14 production build verified with 21 static and dynamic routes.

---

## 7. Conclusion & Future Roadmap

### 7.1 Conclusion
**LOOP** successfully bridges the gap between raw customer sentiment and agile product management. By combining modern Next.js architecture, reactive data visualizations, and robust AI classification, it empowers cross-functional teams to make data-backed product decisions rapidly.

### 7.2 Future Enhancements
- **Automated Webhook Integrations**: Native incoming webhooks for Zendesk tickets, Jira issues, and Slack alerts.
- **Multilingual Sentiment Translation**: Real-time cross-language sentiment normalization for global customer bases.
- **Jira / Linear Issue Auto-Creation**: One-click action item conversion from critical feedback signals directly into engineering backlogs.

---

*Report Prepared for Project Submission & Technical Assessment.*
