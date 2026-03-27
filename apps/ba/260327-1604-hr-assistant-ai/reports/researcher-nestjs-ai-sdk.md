---
title: NestJS + Vercel AI SDK + PostgreSQL Integration Research
date: 2026-03-27
type: researcher
---

# NestJS 11 + Vercel AI SDK + PostgreSQL Architecture Report

## 1. NestJS + Vercel AI SDK Integration (Gemini 2.0 Flash)

### Service Pattern (Recommended)

```typescript
// ai.service.ts
import { Injectable } from '@nestjs/common';
import { generateText, streamText } from 'ai';
import { google } from '@ai-sdk/google';

@Injectable()
export class AiService {
  private model = google('gemini-2.0-flash', {
    apiKey: process.env.GOOGLE_API_KEY,
  });

  // Structured output (JSON mode)
  async analyzeCandidate(jd: string, profile: string) {
    const { object } = await generateObject({
      model: this.model,
      schema: z.object({
        score: z.number().min(0).max(100),
        skills_match: z.array(z.string()),
        gaps: z.array(z.string()),
      }),
      prompt: `JD: ${jd}\nProfile: ${profile}\nAnalyze fit.`,
    });
    return object;
  }

  // Streaming response
  async streamGeneration(prompt: string) {
    const { stream } = await streamText({
      model: this.model,
      prompt,
    });
    return stream;
  }
}
```

### Controller Integration

```typescript
@Controller('ai')
export class AiController {
  constructor(private aiService: AiService) {}

  @Post('analyze-candidate')
  async analyzeCandidate(@Body() dto: { jd: string; profile: string }) {
    return this.aiService.analyzeCandidate(dto.jd, dto.profile);
  }

  @Get('stream-post/:type')
  @Header('Content-Type', 'text/event-stream')
  async streamPost(@Param('type') type: string, @Response() res: Response) {
    const prompt = `Generate a professional ${type} post for HR...`;
    const stream = await this.aiService.streamGeneration(prompt);

    for await (const chunk of stream) {
      res.write(`data: ${JSON.stringify(chunk)}\n\n`);
    }
    res.end();
  }
}
```

**Install:** `npm install ai @ai-sdk/google zod`

---

## 2. NestJS + PostgreSQL: ORM Comparison

| Feature | Prisma | TypeORM | Drizzle |
|---------|--------|---------|---------|
| **Setup time** | 5 min (fastest) | 15 min | 10 min |
| **Type safety** | ⭐⭐⭐⭐⭐ (best) | ⭐⭐⭐ | ⭐⭐⭐⭐ |
| **Relations** | Simple, intuitive | Complex joins | Query-builder centric |
| **Raw SQL** | Limited | Full support | Full support |
| **Hackathon fit** | ✅ BEST | ⚠️ Slower learning | ⭐ Good alternative |

### Recommendation: **PRISMA** (for hackathon speed)

**Setup:**
```bash
npm install @prisma/client
npm install -D prisma

npx prisma init  # creates .env + schema.prisma
```

**schema.prisma:**
```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model Employee {
  id        Int     @id @default(autoincrement())
  name      String
  email     String  @unique
  birthDate DateTime?

  @@map("employees")
}

model Candidate {
  id      Int     @id @default(autoincrement())
  linkedinUrl String
  score   Int?
  postedAt DateTime @default(now())

  @@map("candidates")
}
```

**NestJS Service:**
```typescript
@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }
  async onModuleDestroy() {
    await this.$disconnect();
  }
}

@Injectable()
export class EmployeeService {
  constructor(private prisma: PrismaService) {}

  async getUpcomingBirthdays(days: number) {
    return this.prisma.employee.findMany({
      where: {
        birthDate: {
          gte: new Date(),
          lte: addDays(new Date(), days),
        },
      },
    });
  }
}
```

---

## 3. NestJS Module Architecture (Multi-Feature)

### Recommended Structure

```
src/
├── employees/
│   ├── employees.module.ts
│   ├── employees.service.ts
│   ├── employees.controller.ts
│   └── dto/
│       └── create-employee.dto.ts
├── candidates/
│   ├── candidates.module.ts
│   ├── candidates.service.ts
│   ├── candidates.controller.ts
│   └── dto/
├── linkedin/
│   ├── linkedin.module.ts
│   ├── linkedin.service.ts (Proxycurl integration)
│   └── linkedin-posts/
│       ├── linkedin-posts.service.ts
│       └── linkedin-posts.controller.ts
├── ai/
│   ├── ai.module.ts
│   ├── ai.service.ts
│   └── ai.controller.ts
├── database/ (shared)
│   └── prisma.service.ts
├── app.module.ts
└── main.ts
```

### Module Definition Pattern

```typescript
// employees.module.ts
import { Module } from '@nestjs/common';
import { EmployeeService } from './employees.service';
import { EmployeeController } from './employees.controller';
import { PrismaService } from 'src/database/prisma.service';

@Module({
  imports: [], // Import other modules if needed
  controllers: [EmployeeController],
  providers: [EmployeeService, PrismaService],
  exports: [EmployeeService], // For use in other modules
})
export class EmployeeModule {}

// app.module.ts
@Module({
  imports: [
    EmployeeModule,
    CandidateModule,
    LinkedinModule,
    AiModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
```

### Service Dependency Injection

```typescript
// linkedin.service.ts - uses Proxycurl API
@Injectable()
export class LinkedinService {
  constructor(
    private http: HttpService,
    private aiService: AiService, // Cross-module dependency
  ) {}

  async enrichCandidate(linkedinUrl: string) {
    const profile = await this.http.get(/* Proxycurl */).toPromise();
    const analysis = await this.aiService.analyzeCandidate(profile);
    return { profile, analysis };
  }
}

// Add HttpModule to linkedin.module.ts imports
```

---

## Key Takeaways for Hackathon

| Decision | Rationale |
|----------|-----------|
| **Prisma** | 5-min setup, best DX for rapid prototyping |
| **Vercel AI SDK** | Native Gemini 2.0 Flash support, streaming out-of-box |
| **Feature modules** | Isolate employees/candidates/LinkedIn—easy to test & scale |
| **PrismaService singleton** | Share DB connection across all modules |
| **Services as business logic** | Controllers thin, services fat—easier to test |

---

## Next Steps

1. **Install deps**: `ai`, `@ai-sdk/google`, `@prisma/client`, `prisma`
2. **Setup Prisma**: `npx prisma init`, configure `DATABASE_URL`
3. **Create feature modules**: employees → candidates → LinkedIn → AI
4. **Wire Prisma globally**: Create `PrismaModule`, export `PrismaService`
5. **Implement streaming endpoint**: Test AI streaming in controller

**Unresolved Questions:**
- Error handling strategy for Gemini API timeouts (recommend Circuit Breaker pattern)?
- Pagination strategy for large candidate lists (offset-limit vs cursor)?
- Image generation for birthday posts—use separate service or embed in AiService?
