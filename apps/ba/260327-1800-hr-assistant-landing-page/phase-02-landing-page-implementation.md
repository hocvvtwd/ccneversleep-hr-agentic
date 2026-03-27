# Phase 2: Landing Page Implementation — Swiss Minimalism + Storytelling

**Effort:** 6h
**Priority:** P1
**Status:** Pending

## Design Philosophy

**Swiss Style Minimalism:**
- Grid-based, typography-driven, generous whitespace
- No decorative blobs, no gradients on backgrounds
- Black text on white. Single accent: violet (#7C3AED)
- Content IS the design. Every element earns its place.
- Product screenshots in clean browser frames

**Storytelling:** Page follows an HR person's journey from chaos to clarity across 5 acts.

## Grid System

```
12 columns | 1200px max | 24px gutter | 8px base unit
Section padding: 120px top/bottom
Mobile: single column, 16px padding, 80px section padding
```

---

## Storytelling Sections

### ACT 1: THE OPENING — "Monday Morning"

**Section 1: Navbar** (sticky, minimal)
```
┌─────────────────────────────────────────────────┐
│  ◆ HR Assistant        Features  Pricing  FAQ    │
│                                    [Get Started] │
└─────────────────────────────────────────────────┘
```
- Logo mark (left) — geometric, no text on mobile
- 3 nav links (center-right) — Inter 14px, uppercase, letter-spacing 1px
- CTA (right) — solid violet button, no border-radius (Swiss sharp)
- On scroll: white bg + subtle bottom border (1px gray-200)
- Mobile: hamburger → fullscreen overlay menu (Swiss large type)

**Section 2: Hero** — "The Monday Problem"
```
┌─────────────────────────────────────────────────┐
│                                                   │
│                                                   │
│  It's Monday morning.                             │
│                                                   │
│  5 birthdays this week.                           │
│  3 positions to fill.                             │
│  47 resumes to screen.                            │
│  0 LinkedIn posts scheduled.                      │
│                                                   │
│  What if your AI colleague                        │
│  already handled it?                              │
│                                                   │
│  [Start Free]          [See How It Works ↓]       │
│                                                   │
│                                                   │
└─────────────────────────────────────────────────┘
```

**Swiss treatment:**
- No hero image. Pure typography.
- "It's Monday morning." — 72px, Extra Bold, black
- Problem lines — 32px, Regular, gray-500, stagger reveal
- "What if..." — 48px, Semi Bold, violet accent
- Massive whitespace above and below (200px padding)
- Two CTAs: primary solid violet, secondary ghost/text link

**Animation (anime.js):**
- "It's Monday morning." appears first (fade in, 400ms)
- Problem lines stagger in, 300ms delay each
- Pause 500ms
- "What if..." fades in with slight translateY(-10px)
- CTAs appear last

---

### ACT 2: THE PROOF — "Numbers Don't Lie"

**Section 3: The Cost of Manual HR**
```
┌─────────────────────────────────────────────────┐
│                                                   │
│  The cost of doing it manually.                   │
│                                                   │
│  ──────────────────────────────────────────────   │
│                                                   │
│     75 min          5 hours        2.5 hours      │
│   Birthday cards   Finding        Writing         │
│   per month        candidates     LinkedIn posts  │
│                                                   │
│  ──────────────────────────────────────────────   │
│                                                   │
│     12 hours / week                               │
│     wasted on tasks AI can do in minutes.         │
│                                                   │
└─────────────────────────────────────────────────┘
```

**Swiss treatment:**
- Section title: 20px, uppercase, letter-spacing 4px, gray-400
- Numbers: 72px, Extra Bold, black — counter animation
- Labels: 16px, Regular, gray-500
- Horizontal rules as section dividers (1px, gray-200)
- "12 hours / week" — 48px, violet accent

**Animation:** Numbers count up from 0 on scroll intersection.

---

### ACT 3: THE SOLUTION — "Meet Your AI Colleague"

**Section 4: Three Modules**
```
┌─────────────────────────────────────────────────┐
│                                                   │
│  Three things. Done automatically.                │
│                                                   │
│  ┌─────────────────────────────────────────────┐ │
│  │                                               │ │
│  │  01                                           │ │
│  │  Birthday & Onboarding                        │ │
│  │                                               │ │
│  │  AI creates the card. You approve.            │ │
│  │  It sends itself — Slack, Telegram, WhatsApp. │ │
│  │  No one gets forgotten.                       │ │
│  │                                               │ │
│  │  [Screenshot: card preview with approve btn]  │ │
│  │                                               │ │
│  └─────────────────────────────────────────────┘ │
│                                                   │
│  ┌─────────────────────────────────────────────┐ │
│  │                                               │ │
│  │  02                                           │ │
│  │  LinkedIn Automation                          │ │
│  │                                               │ │
│  │  Paste a job description.                     │ │
│  │  AI writes 3 variants. You pick one.          │ │
│  │  Schedule. Track. Repeat.                     │ │
│  │                                               │ │
│  │  [Screenshot: content variants UI]            │ │
│  │                                               │ │
│  └─────────────────────────────────────────────┘ │
│                                                   │
│  ┌─────────────────────────────────────────────┐ │
│  │                                               │ │
│  │  03                                           │ │
│  │  Candidate Finder                             │ │
│  │                                               │ │
│  │  Upload a JD. AI parses it.                   │ │
│  │  Scores every candidate. Ranks them.          │ │
│  │  You review the shortlist.                    │ │
│  │                                               │ │
│  │  [Screenshot: ranked candidate list]          │ │
│  │                                               │ │
│  └─────────────────────────────────────────────┘ │
│                                                   │
└─────────────────────────────────────────────────┘
```

**Swiss treatment:**
- Number prefix: 72px, Extra Bold, violet, right-aligned or top-left
- Module title: 32px, Bold, black
- Description: 20px, Regular, gray-600 — short sentences, one action per line
- Screenshot: in a minimal browser frame, subtle shadow-sm
- Each module = full-width card, stacked vertically, 80px gap
- No icons. No emojis. Typography + screenshot only.

**Animation:** Each module card slides in from bottom on scroll (translateY(40px) → 0, opacity).

---

### ACT 4: THE VISION — "The AI That Thinks"

**Section 5: Agentic Workflow**
```
┌─────────────────────────────────────────────────┐
│                                                   │
│  Most tools copy-paste.                           │
│  This one reads first.                            │
│                                                   │
│  ──────────────────────────────────────────────   │
│                                                   │
│  You say:                                         │
│  "Find 10 senior backend engineers               │
│   in Vietnam with fintech experience"             │
│                                                   │
│  ──────────────────────────────────────────────   │
│                                                   │
│  The agent:                                       │
│                                                   │
│  01  Analyzes your requirements                   │
│  02  Researches each candidate's profile          │
│  03  Writes personalized messages                 │
│  04  Plans the approach — direct? referral?       │
│  05  Tracks replies, reads sentiment              │
│  06  Learns what works, adjusts strategy          │
│  07  Escalates when it should                     │
│                                                   │
│  ──────────────────────────────────────────────   │
│                                                   │
│  "The only recruitment tool that reads            │
│   a candidate's profile before writing to them."  │
│                                                   │
└─────────────────────────────────────────────────┘
```

**Swiss treatment:**
- "Most tools copy-paste." — 48px, Bold, black
- "This one reads first." — 48px, Bold, violet
- Quote block: 24px, italic, left-border 4px violet
- Steps: numbered 01-07, monospace numbers, 20px body
- Each step on its own line, generous line-height (2.0)
- USP quote at bottom: 32px, Semi Bold, centered
- Horizontal rules as act dividers

**Animation:** Steps appear one-by-one as user scrolls. Each number fades in with a subtle left slide (translateX(-10px) → 0). The USP quote fades in last with a 500ms delay.

---

### ACT 5: THE DECISION — "Your Move"

**Section 6: Before/After**
```
┌─────────────────────────────────────────────────┐
│                                                   │
│  Before                          After            │
│                                                   │
│  5h finding candidates           1h               │
│  2.5h writing posts              30 min           │
│  75 min birthday cards           5 min            │
│  2h reports                      5 min            │
│  ─────────────────────────────────────────        │
│  12h / week                      2h / week        │
│                                                   │
│                 10 hours saved.                    │
│                 Every single week.                 │
│                                                   │
└─────────────────────────────────────────────────┘
```

**Swiss treatment:**
- Two-column layout, clean horizontal alignment
- "Before" column: gray-400 text (the old way, faded)
- "After" column: black text, bold numbers
- "10 hours saved." — 48px, Extra Bold, violet
- "Every single week." — 48px, Regular, black
- Thin divider line between rows

**Section 7: Pricing**
```
┌─────────────────────────────────────────────────┐
│                                                   │
│  Simple pricing. Start free.                      │
│                                                   │
│  [Monthly]  [Yearly — save 20%]                   │
│                                                   │
│  ┌───────┐  ┌───────────┐  ┌───────┐  ┌───────┐ │
│  │ Free  │  │ Pro    ◆  │  │ Team  │  │Custom │ │
│  │ $0    │  │ $29/mo    │  │ $79/mo│  │       │ │
│  │       │  │           │  │       │  │       │ │
│  │ 5/day │  │ 50/day    │  │ Unlim │  │ Unlim │ │
│  │ 1 pos │  │ 5 pos     │  │ 20 pos│  │ Custom│ │
│  │       │  │           │  │       │  │ ERP   │ │
│  │[Start]│  │[Start]    │  │[Talk] │  │[Talk] │ │
│  └───────┘  └───────────┘  └───────┘  └───────┘ │
│                                                   │
└─────────────────────────────────────────────────┘
```

**Swiss treatment:**
- Section title: 48px, Bold
- Cards: no border-radius, 1px border gray-200, white bg
- Pro card: violet top border (4px), "Recommended" badge
- Prices: 40px, Extra Bold
- Features: 14px, Regular, gray-600
- Toggle: pill shape, clean transition
- Equal card widths, strict grid alignment

**Section 8: FAQ**
- Section title: "Questions." — 48px, Bold
- shadcn Accordion, no outer border
- Question: 20px, Semi Bold
- Answer: 16px, Regular, gray-600
- Divider line between items (1px gray-100)
- 8 questions (same list as before)

**Section 9: Final CTA**
```
┌─────────────────────────────────────────────────┐
│                                                   │
│                                                   │
│  Your Monday mornings                             │
│  don't have to be like this.                      │
│                                                   │
│  [Start Free — No Credit Card]                    │
│                                                   │
│                                                   │
└─────────────────────────────────────────────────┘
```

**Swiss treatment:**
- Callback to hero story ("Monday mornings")
- 48px, Bold, centered, black
- Single CTA button, violet, centered
- 200px padding top/bottom — maximum breathing room
- No background color change — stays white

**Section 10: Footer**
- Minimal. Three columns:
  - Left: Logo + one-line tagline (14px, gray-400)
  - Center: Links (Features, Pricing, FAQ, Contact) — 14px, uppercase
  - Right: Social icons (LinkedIn, X) — Lucide icons, 20px, gray-400
- Bottom: copyright + privacy/terms — 12px, gray-300
- Top border: 1px gray-100
- No background change — white continues

---

## Files to Create

| File | Description |
|------|-------------|
| `src/pages/landing/index.tsx` | Landing page — composes all sections |
| `src/pages/landing/sections/hero.tsx` | Act 1: Monday morning story |
| `src/pages/landing/sections/cost.tsx` | Act 2: Manual HR cost numbers |
| `src/pages/landing/sections/modules.tsx` | Act 3: Three modules (01, 02, 03) |
| `src/pages/landing/sections/agentic.tsx` | Act 4: AI agent 7-step reveal |
| `src/pages/landing/sections/comparison.tsx` | Act 5: Before/after table |
| `src/pages/landing/sections/pricing.tsx` | Pricing 4-tier cards |
| `src/pages/landing/sections/faq.tsx` | FAQ accordion |
| `src/pages/landing/sections/final-cta.tsx` | Closing CTA (callback to hero) |
| `src/pages/landing/sections/footer.tsx` | Minimal 3-column footer |
| `src/components/landing/navbar.tsx` | Sticky minimal navbar |
| `src/components/landing/section.tsx` | Section wrapper (120px padding, max-w) |
| `src/components/landing/counter.tsx` | Animated number counter |
| `src/components/landing/browser-frame.tsx` | Screenshot frame |
| `src/hooks/use-scroll-reveal.ts` | IntersectionObserver + anime.js |

## Animation Guidelines (Swiss Restraint)

| Element | Animation | Timing | Rule |
|---------|-----------|--------|------|
| Hero lines | Stagger fade-in | 300ms delay | Text only, no movement |
| "What if..." | Fade in + translateY(-10px) | 500ms after lines | Subtle lift |
| Cost numbers | Count up (0 → target) | 1.5s, easeOutExpo | On scroll |
| Module cards | translateY(40px) → 0 + opacity | 600ms, on scroll | One at a time |
| Agent steps | translateX(-10px) → 0 + opacity | 200ms stagger | Sequential |
| USP quote | Fade in | 500ms after last step | Pause for impact |
| Pricing cards | Stagger opacity | 100ms delay | Left to right |

**Swiss animation rules:**
- No bouncing, no elastic, no spring physics
- Only `easeOutQuad` or `easeOutExpo` — smooth, dignified
- No animation on CTAs — they must be instantly clickable
- No parallax — content moves with scroll, not against it
- Duration: never > 800ms for any single element

## Todo List

- [ ] Create section wrapper component (grid, padding, max-width)
- [ ] Build Navbar (minimal, sticky)
- [ ] Build Hero — storytelling typography, stagger animation
- [ ] Build Cost section — animated counters
- [ ] Build Modules section — 01/02/03 cards with screenshots
- [ ] Build Agentic section — sequential step reveal
- [ ] Build Comparison — two-column before/after
- [ ] Build Pricing — 4 cards + monthly/yearly toggle
- [ ] Build FAQ — shadcn Accordion
- [ ] Build Final CTA — callback to "Monday morning"
- [ ] Build Footer — minimal 3-column
- [ ] Create useScrollReveal hook
- [ ] Create AnimatedCounter component
- [ ] Create BrowserFrame component
- [ ] Responsive: 375px / 768px / 1024px / 1440px
- [ ] Test: all animations < 800ms, easeOut only, 60fps

## Success Criteria

- **Swiss feel:** Clean, grid-aligned, typography-driven, no visual noise
- **Story arc:** Reader feels the Monday pain → discovers the solution → sees the vision → decides to try
- **Conversion:** Clear path hero CTA → pricing → signup
- **Performance:** LCP < 2.5s, Lighthouse 90+ all categories
- **Responsive:** Reads beautifully on phone (375px) — story works at any width
- **Animation restraint:** Enhances reading rhythm, never distracts
