# Phase 4: Backend Core — DB Schema, AI Service, Employee/Card APIs

**Day:** 4 (30/3/2026)
**Priority:** P1
**Status:** Pending
**Effort:** 8h

## Context Links

- [Phase 2: Birthday/Onboarding Docs](./phase-02-ba-docs-birthday-onboarding.md)
- [NestJS + AI SDK Research](./reports/researcher-nestjs-ai-sdk.md)
- [Telegram + Proxycurl Research](./reports/researcher-telegram-proxycurl.md)

## Overview

Build the backend foundation: Prisma schema + migrations, AI service (Vercel AI SDK + Gemini), Employee CRUD, Card generation + approval + Telegram delivery. This is the most critical backend phase — card generation end-to-end must work by end of day.

## Key Insights

- Prisma ORM: fastest setup, best type safety, `npx prisma migrate dev` for schema
- Vercel AI SDK: `generateObject()` with Zod for structured JSON, `generateText()` for free-form
- nestjs-telegraf: decorator-based Telegram bot, `sendPhoto` + `sendMessage`
- Card approval flow: draft → pending_approval → approved (triggers Telegram send) → sent
- Seed data: 12 mock employees with real-looking Vietnamese names

## Requirements

**Functional:**
- Prisma schema with Employee, Card models + migrations applied
- AI service: card generation (title + message) with tone/language params
- Employee CRUD: list, get, filter by upcoming birthdays/onboarding
- Card CRUD: create, generate via AI, approve, reject, regenerate
- Telegram delivery: send card message to configured chat on approval
- Seed script: 12 employees with birthdays spread across next 30 days

**Non-functional:**
- All endpoints return proper DTOs (no Prisma internal types leaked)
- Validation via `class-validator` on all POST/PATCH bodies
- Error handling: Gemini failures return 503 with retry message
- API prefix: `/api/` on all routes

## Architecture

### Prisma Schema (Full)

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

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
  updatedAt  DateTime  @updatedAt
  @@map("employees")
}

model Card {
  id             Int       @id @default(autoincrement())
  type           String    // 'birthday' | 'onboarding'
  employeeId     Int
  employee       Employee  @relation(fields: [employeeId], references: [id])
  title          String
  message        String
  imageUrl       String?
  uploadedImages String[]
  status         String    @default("draft")
  platforms      String[]  @default(["telegram"])
  tone           String    @default("casual")
  language       String    @default("vi")
  approvedBy     String?
  sentAt         DateTime?
  createdAt      DateTime  @default(now())
  updatedAt      DateTime  @updatedAt
  @@map("cards")
}
```

### AI Service Pattern

```typescript
// ai.service.ts
@Injectable()
export class AiService {
  private model = google('gemini-2.0-flash');

  async generateCard(employee: Employee, type: string, tone: string, language: string) {
    const { object } = await generateObject({
      model: this.model,
      schema: z.object({
        title: z.string(),
        message: z.string(),
      }),
      prompt: `Generate a ${type} card for ${employee.name}, ${employee.position} in ${employee.department}. Tone: ${tone}. Language: ${language}.`,
    });
    return object;
  }
}
```

### Card Approval → Telegram Flow

```typescript
// cards.service.ts
async approveCard(id: number, approvedBy: string) {
  const card = await this.prisma.card.update({
    where: { id },
    data: { status: 'approved', approvedBy },
    include: { employee: true },
  });

  // Send to Telegram
  await this.telegramService.sendCardMessage(
    card.employee.name,
    card.title,
    card.message,
    card.type,
  );

  return this.prisma.card.update({
    where: { id },
    data: { status: 'sent', sentAt: new Date() },
  });
}
```

## Files to Create

| File | Description |
|------|-------------|
| `prisma/schema.prisma` | Full Prisma schema (Employee, Card) |
| `prisma/seed.ts` | Seed 12 employees |
| `src/database/prisma.service.ts` | Shared Prisma client |
| `src/database/database.module.ts` | Database module (exports PrismaService) |
| `src/ai/ai.module.ts` | AI module |
| `src/ai/ai.service.ts` | Gemini via Vercel AI SDK |
| `src/ai/ai.controller.ts` | AI endpoints (card generation, etc.) |
| `src/employees/employees.module.ts` | Employee module |
| `src/employees/employees.service.ts` | Employee CRUD + birthday queries |
| `src/employees/employees.controller.ts` | Employee REST endpoints |
| `src/employees/dto/create-employee.dto.ts` | Validation DTO |
| `src/cards/cards.module.ts` | Card module |
| `src/cards/cards.service.ts` | Card CRUD + approval + Telegram trigger |
| `src/cards/cards.controller.ts` | Card REST endpoints |
| `src/cards/dto/generate-card.dto.ts` | Generation request DTO |
| `src/telegram/telegram.module.ts` | Telegram module |
| `src/telegram/telegram.service.ts` | Bot sendMessage/sendPhoto |

## Implementation Steps

### Database (morning ~2h)

1. Write full `prisma/schema.prisma` (Employee + Card models)
2. Create `database/prisma.service.ts` + `database.module.ts`
3. Run `npx prisma migrate dev --name init`
4. Write `prisma/seed.ts` with 12 Vietnamese employees
5. Run `npx prisma db seed`
6. Verify with `npx prisma studio`

### AI Service (~1.5h)

7. Create `ai/ai.service.ts` — `generateCard()` with Zod structured output
8. Create `ai/ai.module.ts` — exports AiService
9. Create `ai/ai.controller.ts` — test endpoint `POST /api/ai/test`
10. Test with curl: card generation returns `{ title, message }`

### Employee Module (~1.5h)

11. Create `employees/employees.service.ts` — CRUD + `getUpcomingBirthdays(days)` + `getUpcomingOnboarding(days)`
12. Create `employees/employees.controller.ts` — REST endpoints
13. Create DTOs with class-validator
14. Test all employee endpoints with curl

### Card Module + Telegram (~3h)

15. Create `telegram/telegram.service.ts` — `sendCardMessage()` method
16. Create `telegram/telegram.module.ts` — TelegrafModule.forRoot
17. Create `cards/cards.service.ts` — generate (calls AiService), approve (calls TelegramService), reject, regenerate
18. Create `cards/cards.controller.ts` — REST endpoints
19. Create DTOs for card generation/approval
20. Test end-to-end: generate card → approve → Telegram message sent
21. Wire all modules in `app.module.ts`

## Todo List

- [ ] Write Prisma schema (Employee + Card)
- [ ] Create PrismaService + DatabaseModule
- [ ] Run initial migration
- [ ] Create seed script (12 employees)
- [ ] Build AI service (generateCard with Zod)
- [ ] Build Employee module (CRUD + birthday queries)
- [ ] Build Telegram service (sendCardMessage)
- [ ] Build Card module (generate, approve → Telegram, reject)
- [ ] Wire all modules in AppModule
- [ ] Test end-to-end: generate → approve → Telegram delivery
- [ ] Verify all endpoints with curl

## Success Criteria

- `npx prisma studio` shows 12 seeded employees
- `GET /api/employees/upcoming-birthdays` returns filtered list
- `POST /api/cards/generate` returns AI-generated title + message
- `PATCH /api/cards/:id/approve` sends message to Telegram group
- Card status transitions correctly: draft → approved → sent
- All endpoints return proper JSON responses
- No TypeScript compilation errors

## Risk Assessment

| Risk | Mitigation |
|------|------------|
| Gemini API key not configured | Clear error message, `.env.example` with instructions |
| Telegram bot token missing | Skip Telegram send, log to console, return success anyway |
| Prisma migration fails | Check PostgreSQL running, verify DATABASE_URL |
| Vercel AI SDK + NestJS incompatibility | Test import early, fallback to direct `@google/generative-ai` SDK |

## Security Considerations

- API keys in `.env` only, `.env` in `.gitignore`
- No auth for MVP — but note in docs that production needs RBAC
- Validate all input DTOs (class-validator)
- Sanitize AI-generated content before Telegram send

## Next Steps

Phase 5: Frontend card engine + AI integration (FE hits these BE APIs).
