# Telegram Bot API, Proxycurl, & NestJS Scheduling Research

## 1. Telegram Bot with NestJS

### Package Options
- **`nestjs-telegraf`**: Official NestJS wrapper, full decorator support, cleaner integration
- **`telegraf`**: Underlying library, more mature, lower-level control

### Setup (NestJS)
```bash
npm install nestjs-telegraf telegraf
```

### Module Configuration
```typescript
// telegram.module.ts
import { Module } from '@nestjs/common';
import { TelegrafModule } from 'nestjs-telegraf';

@Module({
  imports: [
    TelegrafModule.forRoot({
      token: process.env.TELEGRAM_BOT_TOKEN,
    }),
  ],
  providers: [TelegramService],
  exports: [TelegramService],
})
export class TelegramModule {}
```

### Sending Messages & Images
```typescript
// telegram.service.ts
import { Injectable } from '@nestjs/common';
import { InjectBot } from 'nestjs-telegraf';
import { Context, Telegraf } from 'telegraf';

@Injectable()
export class TelegramService {
  constructor(@InjectBot() private bot: Telegraf<Context>) {}

  // Send text message to chat/group
  async sendMessage(chatId: number, text: string): Promise<void> {
    await this.bot.telegram.sendMessage(chatId, text, {
      parse_mode: 'HTML',
    });
  }

  // Send birthday card image + caption
  async sendBirthdayCard(chatId: number, employeeName: string, imagePath: string): Promise<void> {
    await this.bot.telegram.sendPhoto(chatId, { source: imagePath }, {
      caption: `🎉 Happy Birthday ${employeeName}! 🎉`,
      parse_mode: 'HTML',
    });
  }

  // Send to entire group
  async notifyGroup(groupChatId: string, message: string): Promise<void> {
    await this.bot.telegram.sendMessage(groupChatId, message);
  }
}
```

### Key Details
- **Group Chat ID**: Get via `@userinfobot` in Telegram or log from updates
- **Media**: Use `sendPhoto`, `sendDocument`, `sendVideo` for images/files
- **Parse Mode**: Use `HTML` or `Markdown` for formatting
- **Rate Limit**: ~30 msgs/sec per chat, design queue for burst

---

## 2. Proxycurl API — LinkedIn Candidate Search

### Overview
Proxycurl API scrapes LinkedIn data without official API. Returns structured JSON for person/company profiles.

### Key Endpoints
| Endpoint | Purpose | Rate Limit |
|----------|---------|-----------|
| `/api/v2/linkedin_profile_api/search/` | Search person by name/title/skills | 100 req/month (free) |
| `/api/v2/linkedin_profile_api/profile` | Get full profile (name, company, skills) | 500 req/month (free) |
| `/api/v2/company_api/company/` | Get company info | 100 req/month (free) |

### Authentication
```typescript
// proxycurl.service.ts
import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class ProxycurlService {
  private readonly apiKey = process.env.PROXYCURL_API_KEY;
  private readonly baseUrl = 'https://nubela.co/proxycurl/api/v2';

  async searchLinkedInProfile(query: {
    keyword_title?: string;
    keyword_company?: string;
    keyword_skills?: string;
    country?: string;
  }): Promise<any> {
    try {
      const response = await axios.get(
        `${this.baseUrl}/linkedin_profile_api/search/`,
        {
          params: query,
          headers: { 'Authorization': `Bearer ${this.apiKey}` },
        }
      );
      return response.data;
    } catch (error) {
      console.error('Proxycurl search error:', error.response?.data);
      throw error;
    }
  }

  async getProfileDetails(linkedInUrl: string): Promise<any> {
    const response = await axios.get(
      `${this.baseUrl}/linkedin_profile_api/profile`,
      {
        params: { url: linkedInUrl, extra: 'include' },
        headers: { 'Authorization': `Bearer ${this.apiKey}` },
      }
    );
    return response.data;
  }
}
```

### Pricing & Rate Limits (Free Tier)
- **500 credits/month** (≈ 50 profile searches)
- **100 searches/month** via search endpoint
- **Paid**: $99–$499/mo for 5k–50k credits
- **No per-request cost**, monthly quota only

### Example: Find Senior React Developers
```typescript
const candidates = await proxycurl.searchLinkedInProfile({
  keyword_title: 'Senior Engineer',
  keyword_skills: 'React, TypeScript',
  country: 'US',
});
// Returns: { results: [{ name, headline, url, ... }] }
```

---

## 3. NestJS Scheduling (Cron Jobs)

### Setup
```bash
npm install @nestjs/schedule
```

### Module Registration
```typescript
// app.module.ts
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [ScheduleModule.forRoot(), /* ... other imports */],
})
export class AppModule {}
```

### Daily Birthday Check & Notification
```typescript
// employee-scheduler.service.ts
import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { EmployeeService } from './employee.service';
import { TelegramService } from './telegram.service';

@Injectable()
export class EmployeeSchedulerService {
  private logger = new Logger('EmployeeScheduler');

  constructor(
    private employeeService: EmployeeService,
    private telegramService: TelegramService,
  ) {}

  @Cron('0 9 * * *') // Daily at 9 AM
  async checkBirthdaysDaily(): Promise<void> {
    this.logger.log('Running birthday check...');

    const todayBirthdays = await this.employeeService.findBirthdaysToday();

    for (const employee of todayBirthdays) {
      await this.telegramService.sendBirthdayCard(
        process.env.TELEGRAM_GROUP_CHAT_ID,
        employee.name,
        employee.cardImagePath
      );
    }
  }

  @Cron('0 8 * * 1') // Weekly on Monday at 8 AM
  async checkOnboardingDates(): Promise<void> {
    this.logger.log('Checking onboarding dates...');

    const nextWeekOnboardings = await this.employeeService.findOnboardingDatesNextWeek();

    if (nextWeekOnboardings.length > 0) {
      const message = `📋 Next week's onboarding:\n${nextWeekOnboardings.map(e => `• ${e.name} (${e.startDate})`).join('\n')}`;
      await this.telegramService.notifyGroup(
        process.env.TELEGRAM_GROUP_CHAT_ID,
        message
      );
    }
  }
}
```

### Cron Pattern Reference
- `'0 9 * * *'` = 9 AM daily
- `'0 8 * * 1'` = 8 AM Monday
- `'*/30 * * * *'` = Every 30 minutes
- `'0 0 1 * *'` = 1st of month

### Task Execution Guarantees
- **Single Process**: Runs in main NestJS process only
- **No Built-in Lock**: Use Redis for multi-instance clusters
- **Error Handling**: Wrap in try-catch, log failures

---

## Integration Pattern (Full Example)

```typescript
// hr-assistant.service.ts
@Injectable()
export class HRAssistantService {
  constructor(
    private telegramService: TelegramService,
    private proxycurlService: ProxycurlService,
    private employeeService: EmployeeService,
  ) {}

  @Cron('0 9 * * *')
  async dailyRoutine(): Promise<void> {
    // Check birthdays
    const birthdays = await this.employeeService.findBirthdaysToday();
    for (const emp of birthdays) {
      await this.telegramService.sendBirthdayCard(
        process.env.TELEGRAM_GROUP_ID,
        emp.name,
        emp.cardImage
      );
    }

    // Find & notify hiring needs
    const openings = await this.employeeService.getOpenPositions();
    for (const pos of openings) {
      const candidates = await this.proxycurlService.searchLinkedInProfile({
        keyword_title: pos.jobTitle,
        keyword_skills: pos.requiredSkills,
      });
      // Log candidates for manual review
      this.logger.log(`Found ${candidates.results.length} candidates for ${pos.jobTitle}`);
    }
  }
}
```

---

## Summary

| Tech | Key Point | Hackathon Use |
|------|-----------|---------------|
| **Telegraf/nestjs-telegraf** | Send rich messages/images to Telegram | Birthday cards + notifications |
| **Proxycurl** | LinkedIn search via API (no official API) | Find candidates by skills/title |
| **@nestjs/schedule** | Cron jobs built into NestJS | Automate daily/weekly checks |

**Gotchas:**
- Proxycurl free tier: 500 credits/mo (pace requests)
- Telegram rate limits: Queue bursts for large groups
- Cron jobs: Single instance only, use Redis locks for scaling

---

**Report Generated:** 2026-03-27
**Status:** Ready for integration into HR Assistant feature set
