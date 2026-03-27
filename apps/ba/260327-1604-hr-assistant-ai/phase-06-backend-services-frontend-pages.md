# Phase 6: Backend Services + Frontend Pages (LinkedIn & Candidate)

**Day:** 6 (01/4/2026)
**Priority:** P2
**Status:** Pending
**Effort:** 8h

## Context Links

- [Phase 3: LinkedIn & Candidate Docs](./phase-03-ba-docs-linkedin-candidate.md)
- [Phase 5: FE Card Engine](./phase-05-frontend-card-engine-ai.md)
- [Research: Telegram + Proxycurl](./reports/researcher-telegram-proxycurl.md)

## Overview

Two parallel tracks:
- **Backend:** LinkedIn post generation, Candidate module (Proxycurl + Gemini scoring), Scheduler (cron for birthday checks)
- **Frontend:** LinkedIn Content Studio UI, Candidate Finder UI (both hitting new BE APIs)

## Key Insights

- LinkedIn post generation reuses AI service (different prompt)
- Proxycurl free tier: 500 credits/mo — cache results, use sparingly for demo
- Candidate scoring: Gemini `generateObject` with Zod schema (score breakdown)
- Scheduler: `@nestjs/schedule` cron for daily birthday check at 9 AM
- FE LinkedIn page: 3 variants display, copy to clipboard, post history
- FE Candidate page: JD input → parsed view → search results → shortlist

## Requirements

### Backend

**LinkedIn Module:**
- `POST /api/linkedin/generate` — 3 variants via Gemini
- `POST /api/linkedin/posts` — save selected post
- `GET /api/linkedin/posts` — list history

**Candidate Module:**
- `POST /api/candidates/parse-jd` — Gemini structured JD parsing
- `POST /api/candidates/search` — Proxycurl LinkedIn search
- `POST /api/candidates/score` — Gemini scoring per candidate
- `GET /api/candidates` — list with filters
- `PATCH /api/candidates/:id/status` — shortlist management

**Scheduler Module:**
- Daily 9 AM: check upcoming birthdays, auto-create draft cards
- Weekly Monday 8 AM: check onboarding dates, notify

### Frontend

**LinkedIn Content Studio:**
- JD input textarea
- 3 AI variants display with select/copy
- Hashtag manager (add/remove)
- Character count (3000 limit)
- Post preview (LinkedIn-style card)
- Post history list

**Candidate Finder:**
- JD input (textarea or file upload)
- Parsed requirements display (editable tags)
- Search results: ranked candidate cards with match score %
- Score breakdown per candidate
- Shortlist actions: approve/reject/hold

## Files to Create

### Backend

| File | Description |
|------|-------------|
| `prisma/schema.prisma` | Add LinkedInPost, JobDescription, Candidate models |
| `src/linkedin/linkedin.module.ts` | LinkedIn module |
| `src/linkedin/linkedin.service.ts` | Post generation + CRUD |
| `src/linkedin/linkedin.controller.ts` | REST endpoints |
| `src/linkedin/dto/generate-post.dto.ts` | Generation DTO |
| `src/candidates/candidates.module.ts` | Candidate module |
| `src/candidates/candidates.service.ts` | Parse JD, search, score, CRUD |
| `src/candidates/candidates.controller.ts` | REST endpoints |
| `src/candidates/dto/parse-jd.dto.ts` | JD parsing DTO |
| `src/proxycurl/proxycurl.module.ts` | Proxycurl module |
| `src/proxycurl/proxycurl.service.ts` | LinkedIn search API client |
| `src/scheduler/scheduler.module.ts` | Scheduler module |
| `src/scheduler/scheduler.service.ts` | Cron jobs (birthday, onboarding) |

### Frontend

| File | Description |
|------|-------------|
| `src/services/api.ts` | Add linkedin + candidate API methods |
| `src/types/linkedin.ts` | LinkedIn post types |
| `src/types/candidate.ts` | Candidate + JD types |
| `src/pages/linkedin/index.tsx` | LinkedIn page |
| `src/pages/linkedin/content-studio.tsx` | Content generation + variants |
| `src/pages/linkedin/variant-card.tsx` | Single variant display |
| `src/pages/linkedin/post-preview.tsx` | LinkedIn-style preview |
| `src/pages/linkedin/post-history.tsx` | Post history list |
| `src/pages/candidate/index.tsx` | Candidate page |
| `src/pages/candidate/jd-input-panel.tsx` | JD textarea + file upload |
| `src/pages/candidate/parsed-requirements.tsx` | Parsed JD display |
| `src/pages/candidate/candidate-results.tsx` | Ranked results list |
| `src/pages/candidate/candidate-card.tsx` | Candidate with score |
| `src/pages/candidate/shortlist-panel.tsx` | Shortlist management |
| `src/store/linkedin-store.ts` | Zustand for LinkedIn |
| `src/store/candidate-store.ts` | Zustand for candidates |

## Implementation Steps

### Backend — LinkedIn + Scheduler (morning ~2.5h)

1. Add LinkedInPost model to Prisma schema, run migration
2. Build `linkedin.service.ts` — `generatePosts()` calls AiService with LinkedIn prompt
3. Build `linkedin.controller.ts` — generate, save, list endpoints
4. Build `scheduler.service.ts` — daily birthday cron, weekly onboarding cron
5. Test LinkedIn generation with curl

### Backend — Candidate + Proxycurl (~2.5h)

6. Add JobDescription + Candidate models to Prisma, run migration
7. Build `proxycurl.service.ts` — `searchProfiles()` with Bearer auth
8. Build `candidates.service.ts`:
   - `parseJD()` — Gemini structured output with Zod
   - `searchCandidates()` — Proxycurl search by parsed skills/title
   - `scoreCandidate()` — Gemini scoring with breakdown
9. Build `candidates.controller.ts` — parse, search, score, list, status update
10. Test with curl: parse JD → search → score

### Frontend — LinkedIn UI (~1.5h)

11. Add LinkedIn API methods to `services/api.ts`
12. Build LinkedIn content studio page:
    - JD input textarea + tone selector
    - 3 variants display (variant-card with copy button)
    - Character count + hashtag tags
    - Post preview (LinkedIn-style card)
    - Post history list
13. Create Zustand linkedin store

### Frontend — Candidate UI (~1.5h)

14. Add Candidate API methods to `services/api.ts`
15. Build Candidate finder page:
    - JD input panel (textarea + file upload)
    - Parsed requirements display (editable tags/chips)
    - Search button → loading → ranked results
    - Candidate card with match score % bar
    - Shortlist actions (approve/reject/hold)
16. Create Zustand candidate store

## Todo List

- [ ] BE: Add LinkedIn/JD/Candidate Prisma models + migrate
- [ ] BE: Build LinkedIn service + controller
- [ ] BE: Build Scheduler service (birthday cron)
- [ ] BE: Build Proxycurl service
- [ ] BE: Build Candidate service (parse, search, score)
- [ ] BE: Build Candidate controller
- [ ] BE: Test all new endpoints with curl
- [ ] FE: Add LinkedIn + Candidate API methods
- [ ] FE: Build LinkedIn Content Studio page
- [ ] FE: Build Candidate Finder page
- [ ] FE: Create LinkedIn + Candidate stores
- [ ] Test FE → BE integration for LinkedIn generation
- [ ] Test FE → BE → Proxycurl integration for candidate search

## Success Criteria

- LinkedIn: input JD → BE generates 3 variants → FE displays → copy works
- Candidate: input JD → BE parses → search Proxycurl → ranked results
- Candidate scoring shows breakdown per criteria
- Shortlist status updates persist in DB
- Scheduler: birthday cron logged (verify in NestJS console)
- Character count validates against 3000 limit
- Both pages responsive and themed

## Risk Assessment

| Risk | Mitigation |
|------|------------|
| Proxycurl free tier exhausted | Cache search results, use mock data for repeated demos |
| Too much to build in one day | LinkedIn gets priority (simpler), Candidate shortlist simplified |
| Gemini JSON parsing unreliable | Zod schema enforces structure, fallback to raw text |
| PDF text extraction in browser | Skip for MVP, JD = textarea input only |

## Next Steps

Phase 7: E2E integration testing, polish, animations, documentation review.
