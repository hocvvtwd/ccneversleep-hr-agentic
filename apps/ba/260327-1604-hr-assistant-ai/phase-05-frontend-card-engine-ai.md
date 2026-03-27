# Phase 5: Frontend — Card Engine + AI Integration

**Day:** 5 (31/3/2026)
**Priority:** P1
**Status:** Pending
**Effort:** 8h

## Context Links

- [Phase 4: Backend Core](./phase-04-backend-core-db-ai-apis.md)
- [Phase 2: Birthday/Onboarding Docs](./phase-02-ba-docs-birthday-onboarding.md)
- [Brainstorm Report](../reports/brainstorm-260327-1604-hr-assistant-ai.md)

## Overview

Build all shared FE components (card preview, image uploader, approval panel) and the Birthday/Onboarding creation flows. FE now calls backend APIs instead of direct Gemini calls. End-to-end: select employee → AI generates card (via BE) → preview with animation → approve → Telegram delivery.

## Key Insights

- All AI calls go through backend API (no direct Gemini from FE)
- `services/api.ts` = axios instance pointing to `localhost:3000/api`
- Shared card engine: Birthday & Onboarding share ~70% components
- anime.js card reveal = key demo moment
- Employee data comes from backend (not mock data files)

## Requirements

**Functional:**
- API client service hitting backend endpoints
- Employee selector: fetches from `GET /api/employees`
- Card generation: calls `POST /api/cards/generate` → shows AI result
- Card preview with anime.js flip/reveal animation
- Approval panel: approve calls `PATCH /api/cards/:id/approve` (triggers Telegram)
- Tone + language selectors affect generation
- Regenerate button for new AI output
- Card history: fetches from `GET /api/cards`
- Dashboard: upcoming birthdays from `GET /api/employees/upcoming-birthdays`

**Non-functional:**
- Loading animations during API calls
- Error handling: show retry on API failure
- Responsive: desktop + tablet
- All components fully typed

## Architecture

### API Client

```typescript
// services/api.ts
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
});

export const employeeApi = {
  list: () => api.get('/employees'),
  upcomingBirthdays: () => api.get('/employees/upcoming-birthdays'),
  upcomingOnboarding: () => api.get('/employees/upcoming-onboarding'),
};

export const cardApi = {
  generate: (data: GenerateCardRequest) => api.post('/cards/generate', data),
  list: (params?: CardListParams) => api.get('/cards', { params }),
  get: (id: number) => api.get(`/cards/${id}`),
  approve: (id: number) => api.patch(`/cards/${id}/approve`),
  reject: (id: number) => api.patch(`/cards/${id}/reject`),
  regenerate: (id: number) => api.post(`/cards/${id}/regenerate`),
};
```

### Component Tree

```
shared/
├── image-uploader/
│   └── image-uploader.tsx        # Drag-drop + click, preview thumbnails
├── card-preview/
│   ├── card-preview.tsx          # Card display with anime.js reveal
│   └── card-skeleton.tsx         # Loading skeleton
├── platform-selector/
│   └── platform-selector.tsx     # Telegram checkbox (future: Slack, WA)
├── approval-panel/
│   └── approval-panel.tsx        # Approve/reject/regenerate buttons
├── employee-selector/
│   └── employee-selector.tsx     # Combobox fetching from BE
├── ai-generation/
│   ├── generation-panel.tsx      # Tone + language + generate button
│   └── shimmer-loading.tsx       # AI thinking animation
└── card-history/
    └── card-history-list.tsx     # List from BE API

pages/
├── dashboard/
│   └── index.tsx                 # Upcoming birthdays + stats
├── birthday/
│   ├── index.tsx                 # Birthday page (list + create)
│   └── birthday-creator.tsx      # Full creation flow
└── onboarding/
    ├── index.tsx                 # Onboarding page
    └── onboarding-creator.tsx    # Full creation flow
```

## Files to Create

| File | Description |
|------|-------------|
| `src/services/api.ts` | Axios API client (employees, cards) |
| `src/types/employee.ts` | Employee interface |
| `src/types/card.ts` | Card + generation request types |
| `src/components/shared/image-uploader/image-uploader.tsx` | Multi-image drag-drop |
| `src/components/shared/card-preview/card-preview.tsx` | Card display + animation |
| `src/components/shared/card-preview/card-skeleton.tsx` | Loading skeleton |
| `src/components/shared/approval-panel/approval-panel.tsx` | Approve/reject/regenerate |
| `src/components/shared/employee-selector/employee-selector.tsx` | Employee combobox |
| `src/components/shared/ai-generation/generation-panel.tsx` | Tone + generate |
| `src/components/shared/ai-generation/shimmer-loading.tsx` | AI loading animation |
| `src/components/shared/platform-selector/platform-selector.tsx` | Platform picker |
| `src/components/shared/card-history/card-history-list.tsx` | Card history |
| `src/utils/animations.ts` | anime.js animation presets |
| `src/hooks/use-card-generation.ts` | Hook wrapping card API calls |
| `src/store/card-store.ts` | Zustand store for cards |
| `src/pages/dashboard/index.tsx` | Dashboard with upcoming events |
| `src/pages/birthday/birthday-creator.tsx` | Birthday creation flow |
| `src/pages/onboarding/onboarding-creator.tsx` | Onboarding creation flow |

## Implementation Steps

### Core Setup (~1h)

1. Create TypeScript interfaces (Employee, Card, GenerateCardRequest)
2. Create `services/api.ts` — axios client with all endpoints
3. Create Zustand card store

### Shared Components (~3.5h)

4. Build `EmployeeSelector` — shadcn combobox, fetches from BE
5. Build `ImageUploader` — drag-drop zone, file input, thumbnails
6. Build `CardPreview` — card display container + loading skeleton
7. Add anime.js card reveal animation (flip + fade)
8. Build `GenerationPanel` — tone selector, language selector, generate button
9. Build `ShimmerLoading` — anime.js pulse while API processes
10. Build `ApprovalPanel` — approve/reject/regenerate with status
11. Build `PlatformSelector` — Telegram checkbox
12. Build `CardHistoryList` — fetches from BE, displays list

### Page Flows (~3.5h)

13. Build Dashboard — upcoming birthdays/onboarding cards from BE
14. Build `BirthdayCreator` — full flow: select employee → generate → preview → approve
15. Build `OnboardingCreator` — same flow, different labels/tone defaults
16. Build birthday/onboarding list pages with card history
17. Wire success animation (confetti on approve+send)
18. Test end-to-end with running backend

## Todo List

- [ ] Create TypeScript interfaces
- [ ] Create API client service
- [ ] Create Zustand card store
- [ ] Build EmployeeSelector (fetches from BE)
- [ ] Build ImageUploader
- [ ] Build CardPreview + anime.js reveal
- [ ] Build GenerationPanel + ShimmerLoading
- [ ] Build ApprovalPanel
- [ ] Build PlatformSelector
- [ ] Build CardHistoryList
- [ ] Build Dashboard (upcoming events from BE)
- [ ] Build BirthdayCreator (full flow)
- [ ] Build OnboardingCreator (full flow)
- [ ] Test end-to-end: FE → BE → Gemini → approve → Telegram

## Success Criteria

- Dashboard shows upcoming birthdays from backend
- Birthday flow end-to-end: select → generate (via BE) → preview → approve → Telegram sent
- Onboarding flow works with different tone
- Card reveal animation plays smoothly (60fps)
- Shimmer loading during AI generation
- Regenerate produces different content
- Card history shows sent cards from BE
- No direct Gemini calls from frontend

## Risk Assessment

| Risk | Mitigation |
|------|------------|
| Backend not ready | Can mock API responses temporarily with axios interceptors |
| CORS issues | Already enabled in Phase 1; verify with browser devtools |
| anime.js + React DOM conflicts | useRef for DOM elements, useEffect for animations |
| Image upload memory | Limit 5 images, 5MB each, revoke URLs on unmount |

## Next Steps

Phase 6: Backend services (Proxycurl, scheduler) + Frontend LinkedIn/Candidate UI.
