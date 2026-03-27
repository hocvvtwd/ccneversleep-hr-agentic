---
title: "HR Assistant with AI - Full-Stack MVP"
description: "BA documentation + full-stack MVP (NestJS + React) for AI-powered HR assistant with birthday/onboarding cards, LinkedIn automation, and candidate finder"
status: pending
priority: P1
effort: 50h
branch: main
tags: [fullstack, backend, frontend, ai, feature, docs]
blockedBy: []
blocks: []
created: 2026-03-27
---

# HR Assistant with AI - Full-Stack Implementation Plan

## Overview

Build a full-stack MVP + complete BA documentation for an AI-powered HR Assistant. 3 modules: Birthday/Onboarding Card Generator, LinkedIn Automation, Candidate Finder Bot. NestJS backend with PostgreSQL, React frontend, Gemini AI via Vercel AI SDK, Telegram Bot delivery, Proxycurl for LinkedIn search.

**Stack:** NestJS 11 + Prisma + PostgreSQL | React 19 + Vite + shadcn/ui + anime.js | Gemini 2.0 Flash (Vercel AI SDK) | Telegram Bot | Proxycurl API
**Timeline:** 27/3/2026 - 02/4/2026 (7 days)
**Brainstorm:** [brainstorm-260327-1604-hr-assistant-ai.md](../reports/brainstorm-260327-1604-hr-assistant-ai.md)

## Research Reports

- [LinkedIn Automation Research](./reports/researcher-linkedin-automation.md) — What it is, management areas, tools, compliance
- [LinkedIn API & Tools Research](./reports/researcher-linkedin-api-tools.md) — Official APIs, third-party tools, pricing
- [NestJS + AI SDK Research](./reports/researcher-nestjs-ai-sdk.md) — Vercel AI SDK, Prisma, module architecture
- [Telegram + Proxycurl Research](./reports/researcher-telegram-proxycurl.md) — Bot API, Proxycurl, NestJS scheduling

## Cross-Plan Dependencies

None (greenfield project).

## Phases

| Phase | Name | Day | Date | Status |
|-------|------|-----|------|--------|
| 1 | [Project Setup & Architecture](./phase-01-project-setup-architecture.md) | 1 | 27/3 | Pending |
| 2 | [BA Docs: Birthday & Onboarding](./phase-02-ba-docs-birthday-onboarding.md) | 2 | 28/3 | Pending |
| 3 | [BA Docs: LinkedIn & Candidate](./phase-03-ba-docs-linkedin-candidate.md) | 3 | 29/3 | Pending |
| 4 | [Backend Core: DB, AI Service, APIs](./phase-04-backend-core-db-ai-apis.md) | 4 | 30/3 | Pending |
| 5 | [Frontend: Card Engine + AI Integration](./phase-05-frontend-card-engine-ai.md) | 5 | 31/3 | Pending |
| 6 | [Backend Services + Frontend Pages](./phase-06-backend-services-frontend-pages.md) | 6 | 01/4 | Pending |
| 7 | [E2E Integration, Polish & Review](./phase-07-e2e-integration-polish-review.md) | 7 | 02/4 | Pending |

## Dependencies

- Google Gemini API key (required by Phase 4)
- PostgreSQL database running (required by Phase 4)
- Telegram Bot token + group chat ID (required by Phase 4)
- Proxycurl API key (required by Phase 6)
- shadCN Studio theme configuration (Phase 1)

## Team Message

See [team-kickoff-message.md](./team-kickoff-message.md) for the team communication message.
