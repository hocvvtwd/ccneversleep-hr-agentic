# Phase 1: Design & Brand Identity

**Effort:** 3h
**Priority:** P1
**Status:** Pending

## Overview

Create logo, color palette, typography, and design system for the landing page. Establish brand identity that positions HR Assistant AI as "The AI Colleague."

## Logo Design

**Style:** Modern, clean, professional. Convey AI + HR/people.

**Concept options:**
1. **People + Brain** — Two people silhouette with neural/circuit pattern connecting them
2. **Shield + Sparkle** — HR shield icon with AI sparkle/star element
3. **Chat Bubble + Person** — Conversational AI meets HR
4. **Abstract Mark** — Geometric shapes suggesting connection + intelligence

**Requirements:**
- Works at 32px (favicon) and 200px (navbar)
- Looks good on dark and light backgrounds
- SVG format for web
- No text in icon (text logo separate)

**Generation:** Use Gemini Nano Banana model via ai-artist skill

## Color Palette

**Primary:** Purple-blue gradient (trust + innovation)
**Base from shadCN Studio:**

| Token | Color | Usage |
|-------|-------|-------|
| Primary | `#7C3AED` (violet-600) | CTAs, links, active states |
| Primary Dark | `#5B21B6` (violet-800) | Hover, pressed states |
| Accent | `#06B6D4` (cyan-500) | Highlights, badges |
| Background | `#FAFAFA` (neutral-50) | Page background |
| Surface | `#FFFFFF` | Card backgrounds |
| Text | `#1E1E2E` | Body text |
| Muted | `#6B7280` (gray-500) | Secondary text |
| Success | `#10B981` | Positive states |
| Destructive | `#EF4444` | Errors, warnings |

## Typography

| Element | Font | Size | Weight |
|---------|------|------|--------|
| H1 (Hero) | Inter | 56px / 3.5rem | 800 (Extra Bold) |
| H2 (Section) | Inter | 40px / 2.5rem | 700 (Bold) |
| H3 (Card) | Inter | 24px / 1.5rem | 600 (Semi Bold) |
| Body | Inter | 16px / 1rem | 400 (Regular) |
| Small | Inter | 14px / 0.875rem | 400 |
| CTA Button | Inter | 16px / 1rem | 600 |

## Design Tokens (shadCN Studio)

Configure via shadcnstudio.com:
- Border radius: 8px (rounded-lg)
- Shadow: subtle (shadow-sm for cards, shadow-md for hover)
- Spacing: 8px grid
- Max content width: 1200px
- Section padding: 80px vertical

## Files to Create

| File | Description |
|------|-------------|
| `public/logo.svg` | Logo icon SVG |
| `public/logo-text.svg` | Logo with text |
| `public/favicon.svg` | 32px favicon |
| `src/styles/design-tokens.css` | CSS custom properties |
| `src/components/ui/logo.tsx` | Logo component |

## Todo List

- [ ] Generate logo concepts (3-4 options)
- [ ] Select and refine logo
- [ ] Create favicon
- [ ] Configure shadCN Studio theme
- [ ] Export design tokens as CSS variables
- [ ] Create Logo component
- [ ] Document brand guidelines

## Success Criteria

- Logo renders crisp at 32px and 200px
- Color palette passes WCAG AA contrast
- Design tokens applied consistently via shadcn
- Brand feels: professional, trustworthy, innovative (not startup-y)
