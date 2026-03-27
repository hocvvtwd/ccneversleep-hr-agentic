---
title: "HR Assistant AI — Landing Page"
description: "High-converting landing page for HR Assistant AI product with logo, SEO, animations, and pricing"
status: pending
priority: P1
effort: 12h
branch: main
tags: [frontend, landing-page, design, seo]
blockedBy: []
blocks: []
created: 2026-03-27
---

# HR Assistant AI — Landing Page Plan

## Overview

Build a high-converting landing page for HR Assistant AI. Showcases 3 modules (Birthday/Onboarding Cards, LinkedIn Automation, Candidate Finder), the agentic recruitment vision, and freemium pricing.

**Stack:** Vite + React + TypeScript + shadcn/ui + shadCN Studio + anime.js + Tailwind CSS
**Product Context:** [HR Assistant Plan](../260327-1604-hr-assistant-ai/plan.md)
**Research:** [Landing Page Best Practices](./research/researcher-landing-page-best-practices.md)

## Brand Identity

- **Name:** HR Assistant AI
- **Positioning:** "The AI Colleague" — not a bot, a smart team member
- **USP:** "The only recruitment tool that reads a candidate's profile BEFORE writing to them"
- **Tagline:** "Your smartest recruiter never sleeps"
- **Tone:** Professional, warm, trustworthy. Anti-spam positioning.
- **Colors:** To be generated via shadCN Studio (purple/blue gradient primary, clean whites)

## Design Direction: Swiss Style Minimalism + Storytelling

**Visual Style:** International Typographic Style (Swiss Design)
- Grid-based layout with strict alignment
- Generous whitespace — let content breathe
- Typography-driven hierarchy (Inter, large headings, clean body)
- Minimal decorative elements — content IS the design
- Monochrome base + single accent color (violet)
- No gradients on backgrounds, no rounded blob shapes
- Flat illustrations or geometric shapes only

**Storytelling Structure:**
The page tells the story of an HR person's day — from pain to solution:

```
Act 1: THE PROBLEM (empathy)
  "It's Monday morning. You have 5 birthdays this week,
   3 positions to fill, and a pile of resumes..."

Act 2: THE DISCOVERY (revelation)
  "What if your AI colleague already handled it?"

Act 3: THE SOLUTION (proof)
  3 modules shown through the lens of one HR day

Act 4: THE FUTURE (vision)
  Agentic workflow — the AI that thinks before it writes

Act 5: THE DECISION (conversion)
  Pricing + CTA — start free today
```

**Swiss Design Principles Applied:**
- **Grid:** 12-column, 1200px max, 24px gutter
- **Type Scale:** 72/48/32/20/16/14px (strict hierarchy)
- **Spacing:** 8px base unit, sections = 120px padding
- **Color:** Black text on white, violet (#7C3AED) accent only
- **Images:** Product screenshots in browser frames, no stock photos
- **Icons:** Lucide icons (line style), consistent 24px

## Landing Page Structure

| # | Section | Purpose | Priority |
|---|---------|---------|----------|
| 1 | **Navbar** | Logo + nav links + CTA button | Must |
| 2 | **Hero** | Headline + subheadline + CTA + product screenshot | Must |
| 3 | **Social Proof Bar** | "Trusted by X companies" + logos | Should |
| 4 | **Problem Statement** | Pain points HR teams face | Must |
| 5 | **3 Modules** | Birthday/Onboarding, LinkedIn, Candidate cards | Must |
| 6 | **Agentic Workflow** | The 7-step AI agent demo | Must |
| 7 | **Before/After** | Manual vs automated comparison table | Should |
| 8 | **Pricing** | Free / Pro / Team / Enterprise tiers | Must |
| 9 | **FAQ** | 8-10 common questions | Should |
| 10 | **Final CTA** | Signup/demo request | Must |
| 11 | **Footer** | Links, legal, social | Must |

## Phases

| Phase | Name | Effort | Status |
|-------|------|--------|--------|
| 1 | [Design & Brand Identity](./phase-01-design-brand-identity.md) | 3h | Pending |
| 2 | [Landing Page Implementation](./phase-02-landing-page-implementation.md) | 6h | Pending |
| 3 | [SEO & Polish](./phase-03-seo-polish.md) | 3h | Pending |

## Dependencies

- Logo design (Phase 1)
- shadCN Studio theme (from MVP Phase 1)
- Product screenshots/mockups (can use placeholder)
- Pricing tiers finalized (done in brainstorm)
