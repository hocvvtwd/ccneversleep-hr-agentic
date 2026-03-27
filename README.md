# TWD Hackathon — HR Agentic AI

AI-powered HR assistant with 3 agent capabilities: auto birthday/onboarding posts, LinkedIn recruitment automation, and intelligent candidate search.

## Tech Stack

- **Backend**: NestJS (TypeScript)
- **Frontend**: React + Vite (TypeScript)
- **Database**: PostgreSQL
- **LLM**: Gemini 2.0 Flash (via Vercel AI SDK)
- **Chat**: Telegram Bot API
- **LinkedIn Data**: Proxycurl API

## Monorepo Structure

```
apps/
├── backend/    — NestJS API server, agent orchestration
├── frontend/   — React dashboard (Vite)
└── ba/         — Business analysis docs, requirements, specs
```

## Getting Started

```bash
# Install all dependencies
pnpm install

# Run backend
pnpm dev:be

# Run frontend
pnpm dev:fe

# Run both
pnpm dev
```

## Features

1. **Auto Birthday & Onboarding Posts** — checks calendar, generates content/images, sends via Telegram after approval
2. **LinkedIn Automation** — optimizes JDs, manages LinkedIn recruitment posting
3. **Candidate Search** — analyzes JD, searches ERP + LinkedIn, ranks candidates, notifies HRM
