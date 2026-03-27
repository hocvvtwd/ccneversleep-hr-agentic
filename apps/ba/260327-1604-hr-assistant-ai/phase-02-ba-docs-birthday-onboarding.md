# Phase 2: BA Docs — Birthday & Onboarding Module

**Day:** 2 (28/3/2026)
**Priority:** P1
**Status:** Pending

## Overview

Write comprehensive BA documentation for the Birthday & Onboarding Card Generator module. Covers user stories, wireframes (ASCII), **backend API specs**, data models, and workflow diagrams. Now includes full-stack specs: FE components + BE endpoints + Telegram delivery.

## Key Insights (from requirement table)

- **Auto-check schedule**: Backend cron job checks employee birthday/start date daily at 9 AM
- **Auto-create images + content**: Gemini generates via backend AI service (Vercel AI SDK)
- **Approval workflow**: Cards auto-generated but NOT sent until HR approves via FE
- **Telegram delivery**: Backend sends card to Telegram group/user on approval
- Birthday & Onboarding share 70% of code — document shared engine + differentiators

## Requirements

**Functional (Birthday):**
- FR-B01: Backend cron auto-detects upcoming birthdays from PostgreSQL
- FR-B02: AI generates birthday card (title + message) via backend `/api/cards/generate` endpoint
- FR-B03: HR can upload additional images to customize card
- FR-B04: FE card preview with animated reveal
- FR-B05: HR approves card via FE → backend updates status
- FR-B06: Backend sends card to Telegram on approval via Bot API
- FR-B07: History of sent cards viewable (FE reads from backend API)

**Functional (Onboarding):**
- FR-O01: Backend cron detects new employee onboarding dates
- FR-O02: AI generates welcome card with team intro, role info
- FR-O03: Same upload, preview, approve, send flow as birthday
- FR-O04: Different tone/templates (welcoming vs celebratory)

**Non-functional:**
- NFR-01: Card generation < 10s (backend Gemini call)
- NFR-02: Support JPEG/PNG image upload, max 5 images, max 5MB each
- NFR-03: Card preview renders at 1200x630px (social media standard)

## Architecture

### Full-Stack Flow

```
[Cron 9AM] → Employee DB check → Pending cards created
    ↓
[FE Dashboard] → Shows pending cards → HR clicks "Review"
    ↓
[FE Card Creator] → Employee selected → POST /api/cards/generate
    ↓
[Backend AI Service] → Gemini 2.0 Flash → Returns title + message
    ↓
[FE Card Preview] → Animated reveal → HR edits/approves
    ↓
[POST /api/cards/:id/approve] → Backend updates status
    ↓
[Backend Telegram Service] → sendPhoto + caption to group
    ↓
[Card status = 'sent'] → Visible in history
```

### Backend API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/employees` | List employees (with birthday/onboarding filters) |
| GET | `/api/employees/upcoming-birthdays` | Next 7 days birthdays |
| GET | `/api/employees/upcoming-onboarding` | Next 7 days onboarding |
| POST | `/api/cards/generate` | Generate card via Gemini (type, employeeId, tone, language) |
| GET | `/api/cards` | List cards (filter by type, status) |
| GET | `/api/cards/:id` | Get single card |
| PATCH | `/api/cards/:id/approve` | Approve card → triggers Telegram send |
| PATCH | `/api/cards/:id/reject` | Reject card |
| POST | `/api/cards/:id/regenerate` | Regenerate card content |

### Data Models (Prisma)

```prisma
model Employee {
  id         Int       @id @default(autoincrement())
  name       String
  email      String    @unique
  department String
  position   String
  birthday   DateTime?
  startDate  DateTime?
  avatarUrl  String?
  cards      Card[]
  createdAt  DateTime  @default(now())
  @@map("employees")
}

model Card {
  id             Int        @id @default(autoincrement())
  type           String     // 'birthday' | 'onboarding'
  employeeId     Int
  employee       Employee   @relation(fields: [employeeId], references: [id])
  title          String
  message        String
  imageUrl       String?
  uploadedImages String[]
  status         String     @default("draft") // draft|pending_approval|approved|sent|rejected
  platforms      String[]   // ['telegram']
  tone           String     @default("casual") // formal|casual|fun
  language       String     @default("vi") // en|vi
  approvedBy     String?
  sentAt         DateTime?
  createdAt      DateTime   @default(now())
  @@map("cards")
}
```

### Gemini Prompts (via Backend)

**Birthday Card:**
```
Generate a birthday card for {employee.name} who works as {employee.position}
in {employee.department}. Create:
1. A warm, {tone} birthday message (2-3 sentences)
2. A creative title
Output as JSON: { "title": "...", "message": "..." }
Tone: {formal|casual|fun} | Language: {en|vi}
```

**Onboarding Card:**
```
Generate a welcome card for {employee.name} joining as {employee.position}
in {employee.department}. Create:
1. A welcoming message introducing them to the team (2-3 sentences)
2. A creative welcome title
Output as JSON: { "title": "...", "message": "..." }
Tone: {formal|casual|fun} | Language: {en|vi}
```

## Files to Create (Docs)

| File | Description |
|------|-------------|
| `docs/modules/birthday-onboarding-user-stories.md` | User stories with acceptance criteria |
| `docs/modules/birthday-onboarding-wireframes.md` | ASCII wireframes for all screens |
| `docs/modules/birthday-onboarding-api-specs.md` | Backend API specs, Gemini prompts, data models |

## Implementation Steps

1. Write user stories (8-12 stories with acceptance criteria, covering FE + BE)
2. Create ASCII wireframes for: card list, creation flow, preview, history
3. Document backend API endpoints (REST specs with request/response examples)
4. Document Prisma data models (Employee, Card)
5. Document Gemini prompt templates
6. Document approval workflow state machine
7. Document Telegram delivery spec (sendPhoto flow)
8. Review and validate completeness

## Todo List

- [ ] Write user stories (birthday) — include BE endpoints
- [ ] Write user stories (onboarding)
- [ ] Create wireframes (card list view)
- [ ] Create wireframes (card creation flow)
- [ ] Create wireframes (card preview + approval)
- [ ] Document backend API endpoints (REST)
- [ ] Document Prisma data models
- [ ] Document Gemini prompt templates
- [ ] Document approval workflow state machine
- [ ] Document Telegram delivery spec

## Success Criteria

- All user stories have acceptance criteria covering FE + BE
- Wireframes cover all screens in the flow
- Backend API specs include request/response examples
- Prisma models ready for `prisma migrate`
- Gemini prompts tested conceptually
- Telegram delivery documented (sendPhoto + caption)
- Team can implement FE and BE from docs alone
