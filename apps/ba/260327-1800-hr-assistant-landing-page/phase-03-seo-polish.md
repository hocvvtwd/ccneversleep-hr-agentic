# Phase 3: SEO & Polish

**Effort:** 3h
**Priority:** P2
**Status:** Pending

## Overview

Optimize landing page for search engines, performance, and final polish.

## SEO Implementation

### Meta Tags
```html
<title>HR Assistant AI — AI-Powered Recruitment & HR Automation</title>
<meta name="description" content="Automate birthday cards, LinkedIn posts, and candidate finding with AI. Save 10+ hours/week. Free to start, no credit card required." />
<meta name="keywords" content="HR assistant, AI recruitment, LinkedIn automation, candidate finder, birthday cards, onboarding" />

<!-- Open Graph -->
<meta property="og:title" content="HR Assistant AI — Your Smartest Recruiter Never Sleeps" />
<meta property="og:description" content="AI-powered HR tool: auto-generate cards, LinkedIn posts, find & score candidates. Free tier available." />
<meta property="og:image" content="/og-image.png" />
<meta property="og:type" content="website" />

<!-- Twitter -->
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="HR Assistant AI" />
<meta name="twitter:description" content="Save 10+ hours/week with AI-powered HR automation" />
```

### Structured Data (JSON-LD)
```json
{
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "HR Assistant AI",
  "applicationCategory": "BusinessApplication",
  "operatingSystem": "Web",
  "offers": [
    { "@type": "Offer", "price": "0", "priceCurrency": "USD", "name": "Free" },
    { "@type": "Offer", "price": "29", "priceCurrency": "USD", "name": "Pro" },
    { "@type": "Offer", "price": "79", "priceCurrency": "USD", "name": "Team" }
  ],
  "description": "AI-powered HR assistant for birthday cards, LinkedIn automation, and candidate finding"
}
```

Plus FAQ schema for each FAQ item.

### Performance Targets

| Metric | Target | How |
|--------|--------|-----|
| LCP | < 2.5s | Lazy load below-fold images, preload hero |
| FID | < 100ms | Defer non-critical JS |
| CLS | < 0.1 | Set image dimensions, font-display: swap |
| Bundle size | < 200KB gzip | Code split, tree shake |

### Sitemap & Robots
```
/sitemap.xml — auto-generated
/robots.txt — allow all crawlers
```

## Polish Checklist

- [ ] Meta tags (title, description, OG, Twitter)
- [ ] JSON-LD structured data (SoftwareApplication + FAQ)
- [ ] OG image (1200x630px)
- [ ] Favicon set (16, 32, 180, 192, 512)
- [ ] Apple touch icon
- [ ] robots.txt + sitemap.xml
- [ ] Lazy load images below fold
- [ ] Font preload (Inter)
- [ ] Responsive final check (375, 768, 1024, 1440)
- [ ] Cross-browser (Chrome, Firefox, Safari)
- [ ] Accessibility: alt tags, ARIA labels, keyboard nav
- [ ] 404 page
- [ ] Analytics tag placeholder (GA4/Plausible)
- [ ] Performance audit (Lighthouse 90+ all categories)

## Files to Create/Modify

| File | Description |
|------|-------------|
| `index.html` | Modify: meta tags, structured data |
| `public/og-image.png` | OG share image |
| `public/robots.txt` | Crawler permissions |
| `public/sitemap.xml` | Site map |
| `src/components/seo/seo-head.tsx` | SEO component |

## Success Criteria

- Lighthouse: 90+ Performance, Accessibility, SEO, Best Practices
- OG preview renders correctly on LinkedIn/Twitter/Slack
- Core Web Vitals all green
- Structured data validates in Google Rich Results Test
- Page indexed and crawlable
