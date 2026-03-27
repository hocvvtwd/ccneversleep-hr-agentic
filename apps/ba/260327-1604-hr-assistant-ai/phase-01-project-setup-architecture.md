# Phase 1: Project Setup & Architecture (Full-Stack)

**Day:** 1 (27/3/2026)
**Priority:** P1
**Status:** Pending
**Effort:** 6h

## Context Links

- [Brainstorm Report](../reports/brainstorm-260327-1604-hr-assistant-ai.md)
- [NestJS + AI SDK Research](./reports/researcher-nestjs-ai-sdk.md)

## Overview

Scaffold both frontend (Vite + React) and backend (NestJS + Prisma + PostgreSQL). Configure routing, folder structure, module architecture, and write architecture documentation.

## Key Insights

- Frontend: shadcn/ui + shadCN Studio for theming, anime.js for animations, Zustand for state
- Backend: NestJS 11 feature modules, Prisma ORM, Vercel AI SDK for Gemini
- Monorepo already exists: `apps/backend/` + `apps/frontend/`
- Backend is bare NestJS scaffold — need to add Prisma, modules, env config

## Requirements

**Functional:**
- Both apps scaffolded and running locally (`pnpm dev`)
- Frontend: shadcn components installed, 5 routes configured, layout built
- Backend: Prisma initialized, feature module folders created, CORS enabled
- Folder structures match architecture spec

**Non-functional:**
- TypeScript strict mode (both apps)
- ESLint + Prettier configured (both apps)
- Hot reload working (both apps)
- `pnpm build` produces no errors

## Architecture

### Frontend (`apps/frontend/src/`)

```
src/
├── components/
│   ├── ui/                    # shadcn components
│   ├── layout/                # sidebar, header, breadcrumb
│   └── shared/                # cross-module reusable
├── pages/
│   ├── dashboard/
│   ├── birthday/
│   ├── onboarding/
│   ├── linkedin/
│   └── candidate/
├── services/
│   └── api.ts                 # Backend API client
├── hooks/
├── types/
├── utils/
├── store/
└── assets/
```

### Backend (`apps/backend/src/`)

```
src/
├── ai/                        # Vercel AI SDK + Gemini
│   ├── ai.module.ts
│   └── ai.service.ts
├── employees/                 # Employee CRUD
│   ├── employees.module.ts
│   ├── employees.service.ts
│   └── employees.controller.ts
├── cards/                     # Birthday/Onboarding cards
│   ├── cards.module.ts
│   ├── cards.service.ts
│   └── cards.controller.ts
├── telegram/                  # Telegram Bot
│   ├── telegram.module.ts
│   └── telegram.service.ts
├── linkedin/                  # LinkedIn post generation
│   ├── linkedin.module.ts
│   ├── linkedin.service.ts
│   └── linkedin.controller.ts
├── candidates/                # Candidate search + scoring
│   ├── candidates.module.ts
│   ├── candidates.service.ts
│   └── candidates.controller.ts
├── proxycurl/                 # Proxycurl API client
│   ├── proxycurl.module.ts
│   └── proxycurl.service.ts
├── scheduler/                 # Cron jobs
│   ├── scheduler.module.ts
│   └── scheduler.service.ts
├── database/                  # Shared Prisma
│   └── prisma.service.ts
├── app.module.ts
└── main.ts
```

## Implementation Steps

### Frontend (morning ~3h)

1. Install deps: `shadcn/ui`, `anime.js`, `zustand`, `react-router-dom`, `axios`
2. Configure shadCN Studio theme
3. Set up path aliases (`@/` → `src/`)
4. Create folder structure per architecture spec
5. Configure React Router v7 with all 5 routes
6. Build layout components (sidebar, header, app-layout)
7. Create page shells (empty pages with titles)
8. Create `services/api.ts` — axios instance pointing to `localhost:3000`

### Backend (afternoon ~3h)

9. Install deps: `@prisma/client`, `prisma`, `ai`, `@ai-sdk/google`, `zod`, `nestjs-telegraf`, `telegraf`, `@nestjs/schedule`, `@nestjs/config`, `axios`
10. `npx prisma init` — creates `.env` + `schema.prisma`
11. Configure `.env`: `DATABASE_URL`, `GOOGLE_API_KEY`, `TELEGRAM_BOT_TOKEN`
12. Create `database/prisma.service.ts` (shared Prisma client)
13. Create empty module/service/controller files for all feature modules
14. Wire all modules in `app.module.ts`
15. Enable CORS in `main.ts`
16. Verify `pnpm dev:be` and `pnpm dev:fe` start without errors

## Todo List

- [ ] FE: Install all dependencies
- [ ] FE: Configure shadCN Studio theme
- [ ] FE: Set up path aliases
- [ ] FE: Create folder structure
- [ ] FE: Configure routing (5 pages)
- [ ] FE: Build layout (sidebar + header)
- [ ] FE: Create page shells
- [ ] FE: Create API client service
- [ ] BE: Install all dependencies
- [ ] BE: Initialize Prisma
- [ ] BE: Configure environment variables
- [ ] BE: Create PrismaService
- [ ] BE: Create module scaffolds (all 7 modules)
- [ ] BE: Wire modules in AppModule
- [ ] BE: Enable CORS
- [ ] Verify both apps build and run

## Success Criteria

- `pnpm dev:fe` starts, all 5 routes navigate correctly, sidebar shows active route
- `pnpm dev:be` starts, responds on port 3000
- Prisma client generated, connects to PostgreSQL
- shadcn theme applied consistently
- `pnpm build` succeeds for both apps

## Risk Assessment

| Risk | Mitigation |
|------|------------|
| shadCN Studio theme import issues | Fallback to default shadcn theme |
| PostgreSQL not installed | Docker: `docker run -p 5432:5432 -e POSTGRES_PASSWORD=postgres postgres` |
| Prisma schema validation errors | Start minimal, add models in Phase 4 |

## Next Steps

Phase 2: BA documentation for Birthday & Onboarding module.
