# Agentic Recruitment Workflow — Creative Direction & Pricing Strategy

**Date:** 27/3/2026
**Context:** Addition to HR Assistant plan — LinkedIn Automation module vision
**Status:** Brainstorm

---

## The Product Vision

**HR Assistant with AI** is not just a content tool. The core differentiator is an **autonomous AI recruitment agent** that handles the entire candidate outreach pipeline:

```
HR says: "Find 10 senior backend engineers in Vietnam with fintech experience"

Agent autonomously:
1. Analyzes requirements → builds ideal candidate profile
2. Searches candidates (ERP + LinkedIn + Facebook)
3. Deep-researches each candidate's profile, background, mutual interests
4. Writes deeply personalized messages (not mail merge — real context)
5. Plans approach strategy per candidate (direct offer? soft networking? referral?)
6. Tracks replies → sentiment analysis → suggests/drafts responses
7. Self-learns: which messages/approaches work? → adjusts strategy
8. Escalates: "This candidate has competing offer → suggest call directly"
```

**Tool stack:** LinkedIn API/scraper, CRM, Claude/Gemini API for reasoning, analytics database

---

## Creative Direction

### Product Positioning

**Not another LinkedIn automation tool.** Those are dumb bots that copy-paste templates and get accounts banned.

This is an **AI Recruiter Colleague** — it thinks, researches, personalizes, learns, and knows when to escalate to a human.

### Brand Angle Options

| Angle | Tagline | Feeling |
|-------|---------|---------|
| **The AI Colleague** | "Your smartest recruiter never sleeps" | Professional, trustworthy |
| **The Recruitment Brain** | "From JD to hire, autonomously" | Technical, powerful |
| **The Humanizer** | "AI that writes like a human, not a bot" | Warm, anti-spam positioning |
| **The 10x Recruiter** | "One recruiter, ten times the output" | Productivity-focused |

**Recommended:** **"The AI Colleague"** angle — positions as a team member, not a tool. Differentiates from "automation" (bots) by emphasizing intelligence + judgment.

### Key Differentiators vs Competition

| Feature | Dumb Automation (Expandi, etc.) | HR Assistant AI Agent |
|---------|-------------------------------|----------------------|
| Messaging | Mail merge templates | Deep personalization per candidate |
| Strategy | Same sequence for everyone | Custom approach per candidate |
| Learning | No learning | Self-adjusts from results |
| Escalation | None | Intelligent human handoff |
| Compliance | Violates LinkedIn ToS | Official APIs + compliant |
| Content | User writes everything | AI generates + optimizes |
| Research | User does manually | Agent reads profiles, finds connections |

### Creative USP

> **"The only recruitment tool that reads a candidate's profile BEFORE writing to them."**

This single sentence captures the key differentiator. Every other tool copy-pastes. This one actually understands context.

---

## Pricing Strategy

### Freemium Model (All Segments)

#### Tier Structure

| Tier | Price | Target | Limits | Key Features |
|------|-------|--------|--------|-------------|
| **Free** | $0 | Solo HR / SMB tryout | 5 AI generations/day, 1 position, 10 candidates | Birthday/onboarding cards, basic content generation, manual candidate scoring |
| **Pro** | $29/mo per seat | SMB HR teams (1-5) | 50 AI generations/day, 5 positions, 100 candidates | Full agentic workflow (search → personalize → sequence), LinkedIn Posts API, basic analytics |
| **Team** | $79/mo per seat | Mid-market (5-20) | Unlimited generations, 20 positions, 500 candidates | Team collaboration, shared pipelines, advanced analytics, A/B testing, approval workflows |
| **Enterprise** | Custom ($200+/seat) | Enterprise (50+) | Unlimited everything | SSO/SAML, ERP integration (Workday, iCIMS), custom AI prompts, dedicated support, SLA |

### Pricing Psychology

**Why $29 Pro:**
- Below LinkedIn Recruiter Lite ($170/mo) → easy "add-on" purchase
- Below Expandi ($99/mo) → cheaper AND safer (no ban risk)
- Above "free hobby tool" perception
- Sweet spot for SMB HR budget approval (no procurement needed)

**Why $79 Team:**
- Mid-market HR teams typically budget $50-150/tool/seat
- Team features (shared pipelines, approval) justify 2.7x uplift
- Still 53% cheaper than LinkedIn Recruiter Lite

**Why Custom Enterprise:**
- Enterprise needs: SSO, compliance, ERP integration, dedicated support
- Custom pricing allows value-based negotiation
- $200+/seat still far below LinkedIn Recruiter Corporate ($900/seat/mo)

### Value Metrics

| Metric | Free | Pro | Team | Enterprise |
|--------|------|-----|------|-----------|
| AI generations/day | 5 | 50 | Unlimited | Unlimited |
| Active positions | 1 | 5 | 20 | Unlimited |
| Candidate pool | 10 | 100 | 500 | Unlimited |
| Birthday/onboarding cards | 3/mo | Unlimited | Unlimited | Unlimited |
| LinkedIn content variants | 1 | 3 | 5 | Custom |
| Agentic outreach sequences | No | Basic (3-step) | Advanced (7-step) | Custom |
| Sentiment analysis | No | No | Yes | Yes |
| Self-learning loop | No | No | Yes | Yes |
| Escalation alerts | No | Basic | Smart | Custom rules |
| Team collaboration | No | No | Yes | Yes + RBAC |
| Analytics | Basic | Standard | Advanced | Custom |
| ERP integration | No | No | No | Yes |
| Support | Community | Email | Priority | Dedicated |

### Revenue Projections (Conservative)

**Assumptions:** 100 free users/month → 10% convert to Pro → 3% to Team → 0.5% Enterprise

| Month | Free | Pro ($29) | Team ($79) | Enterprise (~$200) | MRR |
|-------|------|-----------|-----------|-------------------|-----|
| 3 | 300 | 30 | 9 | 1 | $1,781 |
| 6 | 800 | 80 | 24 | 3 | $4,820 |
| 12 | 2000 | 200 | 60 | 10 | $11,540 |

### Competitive Pricing Landscape

| Tool | Price | What You Get |
|------|-------|-------------|
| LinkedIn Recruiter Lite | $170/mo | Search + 30 InMails |
| LinkedIn Recruiter Corporate | $900/mo | Full platform |
| Expandi | $99-299/mo | Automation bot (ToS risk) |
| Dux-Soup | €12.99-99/mo | Browser extension (ToS risk) |
| PhantomBuster | $30-900/mo | Data scraping |
| **HR Assistant Pro** | **$29/mo** | **AI agent + content + cards + compliant** |
| **HR Assistant Team** | **$79/mo** | **Full agentic + team + analytics** |

**Key insight:** We're the cheapest AND the safest AND the smartest. That's a rare positioning.

---

## How This Fits Into Current Plan

### MVP (7-day sprint) — unchanged

The agentic workflow is the **vision**, not the MVP. The 7-day sprint delivers:
- Birthday/onboarding cards (AI-generated, multi-platform)
- LinkedIn content generation (3 variants, Posts API)
- Candidate finder (JD parsing, scoring, shortlist)
- Basic UI for all features

### Post-MVP Roadmap (add agentic capabilities)

| Phase | Timeline | Features |
|-------|----------|----------|
| **MVP** | Week 1 | Content generation + cards + basic candidate scoring |
| **v0.2** | Week 2-3 | Deep personalization per candidate, approach strategy selector |
| **v0.3** | Week 4-5 | Sequence builder (3-step: connect → message → follow-up) |
| **v0.4** | Week 6-8 | Sentiment analysis on replies, smart escalation |
| **v0.5** | Week 9-12 | Self-learning loop (track what works, auto-adjust) |
| **v1.0** | Month 4 | Full agentic workflow, team features, analytics |

### What Changes in Current Plan

**Phase 3 (BA Docs):** Add agentic workflow as "vision" section in LinkedIn automation docs. Document the 7-step agent flow. Spec the data models for sequences, sentiment, learning.

**Phase 6 (MVP UI):** No change — still basic content generation UI. But design the UI architecture to support future agentic features (extensible components).

---

## Agentic Workflow — Technical Architecture (Vision)

### Agent Loop

```
┌─────────────────────────────────────────────┐
│           RECRUITER INPUT                    │
│  "Find 10 senior backend devs, fintech, VN" │
└──────────────────┬──────────────────────────┘
                   ▼
┌──────────────────────────────────────────────┐
│  STEP 1: ANALYZE & PLAN                      │
│  LLM parses requirements → ideal profile     │
│  Output: search criteria, deal-breakers,      │
│          nice-to-haves, salary range          │
└──────────────────┬───────────────────────────┘
                   ▼
┌──────────────────────────────────────────────┐
│  STEP 2: SEARCH & RESEARCH                   │
│  Search ERP pool + LinkedIn + Facebook        │
│  Per candidate: read profile, extract skills, │
│  find mutual interests, shared connections    │
│  Output: 30 candidates with research notes    │
└──────────────────┬───────────────────────────┘
                   ▼
┌──────────────────────────────────────────────┐
│  STEP 3: SCORE & RANK                        │
│  AI scores each candidate (0-100)             │
│  Top 10 → proceed to outreach                │
│  Output: ranked list with score breakdown     │
└──────────────────┬───────────────────────────┘
                   ▼
┌──────────────────────────────────────────────┐
│  STEP 4: PERSONALIZE & STRATEGIZE            │
│  Per candidate:                               │
│  - Write personalized message (context-aware) │
│  - Choose approach: direct/soft/referral      │
│  - Plan sequence (connect → msg → follow-up)  │
│  Output: 10 personalized outreach plans       │
└──────────────────┬───────────────────────────┘
                   ▼
┌──────────────────────────────────────────────┐
│  STEP 5: EXECUTE & MONITOR                   │
│  Send messages (via LinkedIn/email)           │
│  Track: opens, replies, sentiment             │
│  Auto-draft responses to replies              │
│  Output: engagement dashboard                 │
└──────────────────┬───────────────────────────┘
                   ▼
┌──────────────────────────────────────────────┐
│  STEP 6: LEARN & ADAPT                       │
│  Which messages got replies? Which approach?  │
│  Update strategy for next batch               │
│  Output: optimized templates + strategies     │
└──────────────────┬───────────────────────────┘
                   ▼
┌──────────────────────────────────────────────┐
│  STEP 7: ESCALATE                            │
│  "Candidate X has competing offer"            │
│  "Candidate Y wants to negotiate salary"      │
│  → Alert recruiter for human intervention     │
│  Output: escalation alerts with context       │
└──────────────────────────────────────────────┘
```

### Tech Stack (Vision)

| Component | Technology | Purpose |
|-----------|-----------|---------|
| **Reasoning Engine** | Claude API / Gemini | Analysis, personalization, sentiment |
| **Search** | LinkedIn API (official) + ERP API | Candidate sourcing |
| **CRM** | Custom DB (PostgreSQL) | Candidate tracking, history |
| **Sequence Engine** | Custom (Node.js/Python) | Multi-step outreach automation |
| **Analytics** | Custom dashboard | Engagement tracking, learning metrics |
| **Frontend** | React + shadcn (current stack) | HR-facing interface |

---

## Summary

**Product = 3 layers:**

1. **Layer 1 (MVP):** Content tools — birthday cards, onboarding, LinkedIn posts, JD parsing
2. **Layer 2 (v0.2-0.4):** Smart recruitment — personalization, sequences, sentiment
3. **Layer 3 (v1.0):** Autonomous agent — full agentic loop with self-learning

**Pricing = Freemium:**
- Free: Layer 1 basics (5/day)
- Pro $29/mo: Layer 1 full + Layer 2 basic
- Team $79/mo: Layer 1-2 full + Layer 3 basic
- Enterprise custom: Everything + ERP + SSO

**Creative positioning:** "The AI Colleague" — not a bot, not a tool, a smart team member that researches, personalizes, learns, and knows when to ask for help.
