# Brainstorm Report: HR Assistant with AI

**Date:** 2026-03-27
**Author:** BA / Full-Stack Developer
**Timeline:** 27/3/2026 - 02/4/2026 (7 days)
**Status:** Approved (Updated with backend)

---

## Problem Statement

HR teams spend significant time on repetitive tasks: creating birthday/onboarding cards manually, writing LinkedIn recruitment posts, and screening candidates. An AI-powered HR Assistant can automate content generation, multi-platform delivery, and candidate evaluation — freeing HR to focus on people, not production.

## Project Scope

**Deliverables:**
- Full BA documentation (all 3 modules, FE + BE specs)
- Working full-stack MVP: NestJS backend + React frontend
- Real Gemini AI integration via backend proxy (Vercel AI SDK)
- Real Telegram Bot delivery for cards/notifications
- Proxycurl integration for LinkedIn candidate search

**Out of scope (MVP):**
- Auth/RBAC (no login required)
- Real LinkedIn posting API (content generation only)
- Web scraping for candidate sourcing (Proxycurl handles LinkedIn)
- Production deployment / CI/CD
- Multi-tenant support

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| **Backend** | NestJS 11 (TypeScript) |
| **Frontend** | React 19 + Vite + TypeScript |
| **Database** | PostgreSQL + Prisma ORM |
| **AI** | Gemini 2.0 Flash via Vercel AI SDK (`ai` + `@ai-sdk/google`) |
| **Chat** | Telegram Bot API (`nestjs-telegraf`) |
| **LinkedIn Data** | Proxycurl API |
| **Scheduling** | `@nestjs/schedule` (cron jobs) |
| **UI Library** | shadcn/ui + shadCN Studio |
| **Animation** | anime.js |
| **State** | Zustand |
| **Routing** | React Router v7 |

---

## Module Design

### Module 1: Birthday & Onboarding Card Generator

**Purpose:** Auto-generate celebration cards with AI, deliver via Telegram after HR approval.

**User Flow:**
1. System auto-checks employee calendar via cron job (daily 9 AM)
2. AI auto-generates: card image + title + personalized message (Gemini via backend)
3. HR reviews card preview with animated reveal on dashboard
4. HR approves card (approval workflow)
5. Backend sends to Telegram group/user via Bot API

**Backend responsibilities:**
- Employee CRUD + birthday/onboarding date tracking (PostgreSQL)
- Gemini card generation endpoint (Vercel AI SDK)
- Card approval workflow state machine
- Telegram delivery on approval
- Daily cron: check upcoming birthdays/onboarding

**Shared Engine:** Birthday & Onboarding share ~70% code (different prompts/tone).

### Module 2: LinkedIn Automation for Recruitment

**Purpose:** Generate optimized LinkedIn recruitment content with AI.

**User Flow:**
1. HR inputs job description
2. Backend calls Gemini → generates 3 LinkedIn post variants
3. FE: preview, edit, refine (tone/hashtag/character count)
4. Schedule/copy (LinkedIn posting = mocked, content generation = real)
5. Post history + engagement dashboard (UI shell)

**Backend responsibilities:**
- JD storage + LinkedIn post CRUD (PostgreSQL)
- Gemini content generation endpoint (3 variants)
- Post scheduling records

### Module 3: Candidate Finder Bot

**Purpose:** Find, screen, and rank candidates using AI.

**User Flow:**
1. HR inputs JD → backend parses via Gemini (structured JSON output)
2. Backend searches Proxycurl for LinkedIn candidates matching parsed requirements
3. Backend scores each candidate via Gemini (match %, breakdown)
4. FE displays ranked candidates, HR manages shortlist
5. Export shortlist / send to HRM

**Backend responsibilities:**
- JD parsing endpoint (Gemini structured output)
- Proxycurl search integration
- Candidate scoring endpoint (Gemini)
- Candidate CRUD + shortlist management (PostgreSQL)
- Resume upload + text extraction

---

## Backend Architecture

```
apps/backend/src/
├── ai/
│   ├── ai.module.ts
│   ├── ai.service.ts              # Vercel AI SDK + Gemini
│   └── ai.controller.ts           # Generation endpoints
├── employees/
│   ├── employees.module.ts
│   ├── employees.service.ts
│   ├── employees.controller.ts
│   └── dto/
├── cards/
│   ├── cards.module.ts
│   ├── cards.service.ts           # Card CRUD + approval workflow
│   ├── cards.controller.ts
│   └── dto/
├── telegram/
│   ├── telegram.module.ts
│   └── telegram.service.ts        # nestjs-telegraf bot
├── linkedin/
│   ├── linkedin.module.ts
│   ├── linkedin.service.ts        # Post CRUD + generation
│   └── linkedin.controller.ts
├── candidates/
│   ├── candidates.module.ts
│   ├── candidates.service.ts      # Search + scoring
│   ├── candidates.controller.ts
│   └── dto/
├── proxycurl/
│   ├── proxycurl.module.ts
│   └── proxycurl.service.ts       # LinkedIn profile search
├── scheduler/
│   ├── scheduler.module.ts
│   └── scheduler.service.ts       # Cron: birthday check, etc.
├── database/
│   └── prisma.service.ts          # Shared Prisma client
├── app.module.ts
└── main.ts
```

## Front-end Architecture

```
apps/frontend/src/
├── components/
│   ├── ui/                    # shadcn components
│   ├── layout/                # Sidebar, header, breadcrumb
│   └── shared/                # Cross-module reusable
│       ├── image-uploader/
│       ├── platform-selector/
│       ├── ai-generation/
│       └── card-preview/
├── pages/
│   ├── dashboard/
│   ├── birthday/
│   ├── onboarding/
│   ├── linkedin/
│   └── candidate/
├── services/
│   └── api.ts                 # Backend API client (fetch/axios)
├── hooks/
├── types/
├── utils/
└── store/                     # Zustand stores
```

---

## Key Screens

| # | Screen | Core Features |
|---|--------|---------------|
| 1 | **Dashboard** | Upcoming birthdays, new joiners, LinkedIn stats, candidate pipeline |
| 2 | **Birthday Card Creator** | Employee picker → AI generates → preview → approve → send via Telegram |
| 3 | **Onboarding Card Creator** | Same flow, different tone/templates |
| 4 | **LinkedIn Content Studio** | JD input → AI content variants → preview/edit → copy/schedule |
| 5 | **Candidate Finder** | JD → AI parse → Proxycurl search → AI scoring → ranked shortlist |

---

## Animation Strategy (anime.js)

| Animation | Where | Effect |
|-----------|-------|--------|
| Card reveal | Card preview | Flip/3D rotate when AI finishes generating |
| Page transitions | Route changes | Smooth slide-fade between pages |
| AI thinking | Generation panel | Subtle shimmer/pulse while Gemini processes |
| Success | After send | Confetti burst or checkmark animation |
| Micro-interactions | Buttons, cards | Hover lift, press scale, list item stagger entrance |

---

## 7-Day Sprint Plan

| Day | Date | Focus | Deliverables |
|-----|------|-------|-------------|
| 1 | 27/3 | Setup + Architecture | FE scaffold + BE scaffold + Prisma + routing |
| 2 | 28/3 | BA: Birthday & Onboarding | User stories, wireframes, API specs, data models |
| 3 | 29/3 | BA: LinkedIn & Candidate | User stories, wireframes, API specs, data models |
| 4 | 30/3 | Backend Core | Prisma schema, AI service, Employee/Card APIs, Telegram bot |
| 5 | 31/3 | FE Card Engine + AI | Shared components, Gemini integration via BE API |
| 6 | 01/4 | BE Services + FE Pages | Proxycurl, scheduler + LinkedIn/Candidate UI |
| 7 | 02/4 | E2E Integration + Polish | Wire FE↔BE, animations, responsive, docs review |

---

## Technical Decisions

| Decision | Rationale |
|----------|-----------|
| Gemini via backend proxy (Vercel AI SDK) | Secure API key, streaming support, structured output |
| Prisma ORM | Fastest setup (5 min), best type safety, hackathon-optimal |
| nestjs-telegraf | Official NestJS wrapper, decorator support, clean integration |
| Proxycurl for LinkedIn | No official LinkedIn search API; Proxycurl = structured data |
| @nestjs/schedule | Built-in NestJS cron, no extra infra needed |
| Zustand (FE state) | Lightweight, zero boilerplate |
| shadcn/ui + Studio | Consistent design, easy theming, professional look |
| anime.js | Lightweight (17kb), simple API, performant |

---

## Risks & Mitigations

| Risk | Severity | Mitigation |
|------|----------|------------|
| 7-day timeline tight for full-stack | High | BE minimal viable: CRUD + AI + Telegram. FE reuses shared engine |
| Proxycurl free tier limits (500 credits/mo) | Medium | Cache results, use mock data for demo, real search for key demos |
| Gemini API rate limits / slow responses | Medium | Retry with backoff, streaming for UX, cache generations |
| Telegram Bot setup complexity | Low | Simple sendMessage/sendPhoto, group chat ID via @userinfobot |
| PostgreSQL setup | Low | Docker compose or local install, Prisma migrate handles schema |
| FE↔BE integration issues | Medium | Define API contracts early (Phase 2-3 BA docs), test with curl first |

---

## Success Metrics

- [ ] Complete BA documentation for all 3 modules (FE + BE specs)
- [ ] Working backend: Employee/Card CRUD, AI generation, Telegram delivery
- [ ] Working MVP: Birthday card end-to-end (FE → BE → Gemini → Telegram)
- [ ] Working MVP: Onboarding card (reusing card engine)
- [ ] Working MVP: LinkedIn content generation (FE → BE → Gemini)
- [ ] Working MVP: Candidate search (FE → BE → Proxycurl → Gemini scoring)
- [ ] Animations: Card reveal, page transitions, AI loading states
- [ ] Team can demo the MVP to stakeholders

---

## Evaluated Approaches

### Approach A: Docs-First + Full-Stack (SELECTED)
- Days 1-3: Full BA docs (includes BE API specs) → Days 4-7: Full-stack coding
- **Pros:** Complete specs before coding, real integrations, production-like architecture
- **Cons:** Tight coding window, need parallel FE/BE focus

### Approach B: FE-Only MVP (PREVIOUS)
- Days 1-3: BA docs → Days 4-7: FE only, mock everything
- **Pros:** Simpler, less risk
- **Cons:** No real integrations, demo feels fake, backend debt

### Approach C: BE-First
- Days 1-2: BA docs → Days 3-5: Backend → Days 6-7: FE
- **Pros:** Solid API, FE just consumes
- **Cons:** FE rushed, may not look polished for demo

**Selected Approach A** because: full-stack MVP with real Gemini + Telegram + Proxycurl makes a much stronger hackathon demo than mocked FE-only.
