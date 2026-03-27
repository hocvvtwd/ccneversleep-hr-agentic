# Phase 3: BA Docs — LinkedIn Automation & Candidate Finder

**Day:** 3 (29/3/2026)
**Priority:** P1
**Status:** Pending
**Effort:** 7h

## Context Links

- [Brainstorm Report](../reports/brainstorm-260327-1604-hr-assistant-ai.md)
- [Phase 2: Birthday/Onboarding Docs](./phase-02-ba-docs-birthday-onboarding.md)
- [Research: LinkedIn Automation](./reports/researcher-linkedin-automation.md)
- [Research: LinkedIn API & Tools](./reports/researcher-linkedin-api-tools.md)
- [Research: Telegram + Proxycurl](./reports/researcher-telegram-proxycurl.md)

## Overview

Write BA documentation for LinkedIn Automation and Candidate Finder modules. Now includes full-stack specs: backend API endpoints, Proxycurl integration, Gemini structured output for JD parsing, candidate scoring algorithm.

## What is LinkedIn Automation? (from research)

**Definition:** Software-assisted workflows automating recruitment tasks on LinkedIn — content publishing, candidate engagement, analytics.

**MVP scope:** AI content generation + Proxycurl candidate search. No direct LinkedIn posting API (content copied/exported).

**Compliance:** Uses Proxycurl (third-party scraper) for candidate search. No LinkedIn ToS violations from direct automation.

## Key Insights

**LinkedIn Automation:**
- Backend generates 3 content variants via Gemini (structured JSON output)
- FE displays variants, HR picks/edits, copies to clipboard or schedules (mock)
- Post history stored in PostgreSQL

**Candidate Finder (full-stack flow):**
1. HR inputs JD → `POST /api/candidates/parse-jd` → Gemini structured output
2. Backend searches Proxycurl → `POST /api/candidates/search` → LinkedIn candidates
3. Backend scores each candidate via Gemini → `POST /api/candidates/score`
4. FE displays ranked list, HR manages shortlist
5. Export shortlist

## Requirements

### LinkedIn Automation

**Functional:**
- FR-L01: `POST /api/linkedin/generate` — input JD, generate 3 variants via Gemini
- FR-L02: Tone/style selector (professional, casual, engaging)
- FR-L03: Hashtag suggestions from Gemini
- FR-L04: Character count validation (3000 char LinkedIn limit)
- FR-L05: `POST /api/linkedin/posts` — save post to DB
- FR-L06: `GET /api/linkedin/posts` — post history
- FR-L07: Copy to clipboard + schedule (mock) on FE

### Candidate Finder

**Functional:**
- FR-C01: `POST /api/candidates/parse-jd` — Gemini parses JD → structured JSON
- FR-C02: FE displays parsed requirements for HR review/edit
- FR-C03: `POST /api/candidates/search` — Proxycurl search by skills/title/location
- FR-C04: `POST /api/candidates/score` — Gemini scores candidate vs JD
- FR-C05: `GET /api/candidates` — ranked candidate list (filter by score, source)
- FR-C06: `PATCH /api/candidates/:id/status` — shortlist actions (approve/reject/hold)
- FR-C07: Bulk resume upload → text extraction → Gemini scoring
- FR-C08: Export shortlist (JSON/CSV)

**Non-functional:**
- NFR-L01: Content generation < 8s
- NFR-C01: JD parsing < 5s (Gemini structured output)
- NFR-C02: Proxycurl search < 10s
- NFR-C03: Candidate scoring < 3s per candidate

## Architecture

### Backend API Endpoints — LinkedIn

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/linkedin/generate` | Generate 3 variants (JD + tone → Gemini) |
| POST | `/api/linkedin/posts` | Save selected post |
| GET | `/api/linkedin/posts` | List post history |
| GET | `/api/linkedin/posts/:id` | Get single post |

### Backend API Endpoints — Candidate

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/candidates/parse-jd` | Parse JD via Gemini → structured JSON |
| POST | `/api/candidates/search` | Search via Proxycurl (skills, title, location) |
| POST | `/api/candidates/score` | Score candidate(s) vs parsed JD via Gemini |
| GET | `/api/candidates` | List candidates (filter: score, source, status) |
| PATCH | `/api/candidates/:id/status` | Update shortlist status + notes |
| POST | `/api/candidates/upload-resumes` | Bulk resume upload → parse → score |
| GET | `/api/candidates/export` | Export shortlist (JSON/CSV) |

### Data Models (Prisma)

```prisma
model LinkedInPost {
  id              Int       @id @default(autoincrement())
  jobDescription  String
  selectedContent String?
  hashtags        String[]
  tone            String    @default("professional")
  status          String    @default("draft") // draft|scheduled|published
  scheduledAt     DateTime?
  variants        Json      // [{ content, tone }]
  createdAt       DateTime  @default(now())
  @@map("linkedin_posts")
}

model JobDescription {
  id         Int         @id @default(autoincrement())
  title      String
  rawText    String
  parsed     Json        // ParsedJD structure
  candidates Candidate[]
  createdAt  DateTime    @default(now())
  @@map("job_descriptions")
}

model Candidate {
  id               Int            @id @default(autoincrement())
  name             String
  email            String?
  phone            String?
  source           String         // 'proxycurl' | 'resume_upload' | 'manual'
  profileUrl       String?
  resumeUrl        String?
  skills           String[]
  experience       String?
  location         String?
  matchScore       Int?           // 0-100
  scoreBreakdown   Json?          // [{ criteria, weight, score, explanation }]
  status           String         @default("new") // new|shortlisted|rejected|hold
  notes            String?
  jobDescriptionId Int
  jobDescription   JobDescription @relation(fields: [jobDescriptionId], references: [id])
  createdAt        DateTime       @default(now())
  @@map("candidates")
}
```

### Gemini Prompts (Structured Output via Vercel AI SDK)

**JD Parsing (generateObject with Zod schema):**
```typescript
const schema = z.object({
  position: z.string(),
  techstack: z.array(z.string()),
  skills: z.array(z.string()),
  experienceLevel: z.string(),
  location: z.string().optional(),
  salaryRange: z.string().optional(),
  requirements: z.array(z.string()),
  niceToHave: z.array(z.string()),
});
```

**Candidate Scoring:**
```typescript
const schema = z.object({
  overallScore: z.number().min(0).max(100),
  breakdown: z.array(z.object({
    criteria: z.string(),
    weight: z.number(),
    score: z.number(),
    explanation: z.string(),
  })),
});
```

**LinkedIn Post Generation:**
```
Generate 3 LinkedIn recruitment post variants for: {jobDescription}
Tone: {professional|casual|engaging}
Include relevant hashtags. Keep under 3000 characters each.
Return JSON array of { content, hashtags[] }.
```

## Files to Create (Docs)

| File | Description |
|------|-------------|
| `docs/modules/linkedin-automation-user-stories.md` | User stories + acceptance criteria |
| `docs/modules/linkedin-automation-wireframes.md` | ASCII wireframes |
| `docs/modules/linkedin-automation-api-specs.md` | Backend API specs + Gemini prompts |
| `docs/modules/candidate-finder-user-stories.md` | User stories + acceptance criteria |
| `docs/modules/candidate-finder-wireframes.md` | ASCII wireframes |
| `docs/modules/candidate-finder-api-specs.md` | Backend API + Proxycurl + scoring specs |

## Implementation Steps

1. Write LinkedIn user stories (6-8, covering FE + BE)
2. Create LinkedIn wireframes (content generation, post preview, history)
3. Document LinkedIn backend API specs (with request/response examples)
4. Write Candidate Finder user stories (10-12, covering FE + BE + Proxycurl)
5. Create Candidate wireframes (JD input, parsed view, search results, shortlist)
6. Document Candidate backend API specs (parse, search, score)
7. Document Proxycurl integration spec (search endpoint, auth, rate limits)
8. Document Gemini structured output schemas (Zod)
9. Review all docs for completeness

## Todo List

- [ ] LinkedIn: user stories (FE + BE)
- [ ] LinkedIn: wireframes (content generation, preview)
- [ ] LinkedIn: backend API specs
- [ ] LinkedIn: Gemini prompt specs
- [ ] Candidate: user stories (FE + BE + Proxycurl)
- [ ] Candidate: wireframes (JD input, search results, shortlist)
- [ ] Candidate: backend API specs
- [ ] Candidate: Proxycurl integration spec
- [ ] Candidate: Gemini scoring schema (Zod)
- [ ] Review all Phase 2 + Phase 3 docs

## Success Criteria

- All user stories cover FE + BE interactions
- Backend API specs include request/response JSON examples
- Proxycurl integration documented (auth, endpoints, rate limits)
- Gemini Zod schemas ready for copy-paste into code
- Wireframes cover complete user journeys
- Team can implement FE and BE independently from docs

## Risk Assessment

| Risk | Mitigation |
|------|------------|
| Candidate Finder scope too large | Proxycurl search = real, scoring = real, ERP = skip for MVP |
| Proxycurl free tier limits | Cache results, use 5-10 real searches for demo, mock rest |
| JD parsing accuracy | Zod schema enforces structure, fallback to manual edit |

## Next Steps

Phase 4: Backend core — Prisma schema, AI service, Employee/Card APIs.
