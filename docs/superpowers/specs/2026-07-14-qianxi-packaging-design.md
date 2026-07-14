# Qianxi Packaging — Foreign Trade Brand Website Design Spec

**Date:** 2026-07-14  
**Author:** Whereby  
**Template:** ScrewFast (MIT License)  
**Company:** Chengdu Qianxi Packaging Materials Co., Ltd. (成都芊西包装材料有限公司)

## 1. Project Overview

Build a foreign-trade brand website for a corrugated box factory. The site's core purpose is to **generate qualified leads** — showcase manufacturing capability, then guide visitors to submit custom requirements via the inquiry form. No standard pricing (all products are custom), so the conversion path is: **Show strength → Build trust → Collect requirements → Sales follow-up**.

**Target audience:** Overseas buyers (importers, distributors, brands) looking for custom corrugated packaging from China.

## 2. Tech Stack

| Layer | Choice |
|-------|--------|
| Framework | Astro 7 (SSG) |
| Styling | Tailwind CSS 4 + Preline UI 4 |
| Fonts | Montserrat (headings), Roboto (body) — Google Fonts |
| Animations | Lenis smooth scroll, GSAP (product detail page) |
| Forms | Custom validation, configurable API endpoint, reCAPTCHA v3 ready |
| Maps | Google Maps embed (configurable API key) |
| i18n | Custom key-based system (EN primary, ZH secondary, pluggable for future) |
| Deployment | GitHub Pages (`asaberui1.github.io/Qianxi-Packaging`) |
| Package Manager | pnpm |

## 3. Color Scheme — "Modern Steel"

| Role | Color | Hex | Tailwind |
|------|-------|-----|----------|
| Primary (dark) | Steel Blue | `#1e3a5f` | Custom slate-blue |
| Secondary (neutral) | Slate | `#94a3b8` | `slate-400` |
| Accent (CTA, highlights) | Burnt Orange | `#ea580c` | `orange-600` |
| Background (light) | Cool Gray | `#f1f5f9` | `slate-100` |
| Text (headings) | Near-black navy | `#0f172a` | `slate-900` |
| Text (body) | Medium gray | `#475569` | `slate-600` |

Dark mode: not in scope for Phase 1.

## 4. Page Architecture

### Deployed Pages (6)

| Page | Route | Purpose |
|------|-------|---------|
| Home | `/` | Visual impact + trust + lead capture |
| About Us | `/about` | Factory credibility, certifications, gallery |
| Products List | `/products` | Filterable product catalog |
| Product Detail | `/products/[id]` | Specs, applications, CTA |
| Contact / Inquiry | `/contact` | Full inquiry form + maps + contact info |
| 404 | `/404` | Bilingual error page |

### Reserved Pages (code kept, not deployed)

Blog (`/blog`), Insights (`/insights`), Services (`/services`), Starlight Docs, Pricing section, Authentication modals — kept in repo for potential future use.

### New Pages (not in original template)

Testimonials section (on Homepage), FAQ section (on Homepage).

## 5. i18n Architecture

- **Key-based translation system** in `src/i18n/`
  - `types.ts` — shared translation interface
  - `en.ts` — English (primary, default)
  - `zh.ts` — Chinese (secondary)
  - Future: `es.ts`, `ar.ts` — add file + register in language list
- **Auto-detection:** `navigator.language` → match available locale → fallback to `en`
- **Manual override:** Language toggle in header, preference saved to `localStorage`
- **URL strategy:** Path-based routing — `/` for EN (default), `/zh/` for Chinese. Future languages get their own path prefix (e.g., `/es/`, `/ar/`). This matches Astro's built-in i18n routing pattern and is SEO-friendly for hreflang tags.

## 6. Page-by-Page Design

### 6.1. Header (Sticky, Glassmorphism)

- **Logo:** Stylized "Q" icon mark + "Qianxi Packaging" wordmark
- **Nav items:** Home, About Us, Products (mega menu dropdown), Contact
- **Products dropdown:** 2-column mega menu — by flute type (3/5/7-layer, E-flute) and usage (moving, shipping, industrial, custom print)
- **CTA button:** "Get a Quote" — burnt orange, stands out
- **Language switcher:** Toggle EN / 中文
- **Mobile:** Hamburger → off-canvas slide-out panel. CTA button remains prominent

### 6.2. Footer (5-Column)

1. Brand intro + tagline
2. Quick Links (Home, About, Products, Contact)
3. Products (3-Layer, 5-Layer, Heavy-Duty, Custom Print)
4. Support (FAQ, Shipping, Custom Order, Samples)
5. Newsletter signup (email input + submit)

Bottom bar: copyright, privacy policy, terms. Social icons (Instagram, Facebook, LinkedIn, WhatsApp).

### 6.3. Homepage (`/`)

7 sections in scrolling order:

**Section 1 — Hero:** Full-width factory image with overlay. Headline: "Your Trusted Corrugated Box Manufacturer". Subtitle: "Factory Direct · Custom Solutions · Fast Global Delivery". CTA button: "Get Your Custom Quote →". Below: 3 trust cards (ISO Certified, Advanced Automation, Export Experience).

**Section 2 — Why Choose Us:** 4 icon cards in a grid — Factory Direct Pricing, Free Sampling, Advanced Equipment, 24/7 Support.

**Section 3 — Product Showcase:** 4 product cards — 3-Layer Boxes, 5-Layer Boxes, Heavy-Duty Boxes, Custom Printed Boxes. Each has image placeholder, name, brief description. Link to product detail or list.

**Section 4 — Factory Snapshot:** Left: factory photo grid or video thumbnail. Right: social media card with Instagram/Facebook/LinkedIn links.

**Section 5 — CTA (Lead Capture):** "Get Your Custom Quote in 24 Hours" banner. Inline form: Email (required), Name, Brief Requirements (optional) + "Send Inquiry" button. reCAPTCHA badge.

**Section 6 — Testimonials:** Auto-rotating carousel, 3-5 client quotes. Each has name, company, country flag. Placeholder content initially.

**Section 7 — FAQ:** Accordion with 5-6 common questions (MOQ, sampling time, shipping methods, payment terms, custom printing, material options).

### 6.4. About Us (`/about`)

**Section 1 — Company Intro:** Left text + right image (factory exterior). Key stat numbers: years experience, export countries, annual capacity. Stats use configurable values.

**Section 2 — Factory Gallery:** 3-column photo grid (workshop, warehouse, QC lab). Click to open lightbox viewer with navigation arrows. Mobile: single column.

**Section 3 — Certifications:** 4 cards — ISO 9001, FSC, SGS, REACH/CE. Each has placeholder badge icon + description. Replace with real cert logos when available.

**Section 4 — Closing CTA:** "Ready to Work With Us?" banner with "Contact Us Today" button linking to `/contact`.

### 6.5. Products List (`/products`)

- **Left sidebar:** Filter checkboxes — by flute type (3-layer, 5-layer, 7-layer, E-flute) and usage (moving, e-commerce, industrial, retail/custom print)
- **Right grid:** Product cards — image, name, flute type, size range. 2 columns desktop, 1 mobile
- **Mobile:** "Filter" button opens slide-out panel
- **Data source:** Astro content collection (`src/content/products/`) — markdown files with YAML frontmatter

### 6.6. Product Detail (`/products/[id]`)

- **Left:** Main product image (placeholder) + thumbnail strip below
- **Right:** Product name, description, key parameters table (material, flute, burst strength, edge crush, size range, MOQ) + "Request Quote" CTA
- **Tabs:** Specifications (full table), Applications (scenario descriptions), Custom Options (printing, coating, die-cutting)
- **Mobile:** Stacks vertically, tabs remain as horizontal scroll

### 6.7. Contact & Inquiry (`/contact`)

**Form fields (left column):**
1. Your Name * — text input
2. Email Address * — email input
3. WhatsApp / Phone — tel input
4. Box Dimensions — L × W × H (number, mm)
5. Material Requirement — dropdown (K=K, A=A, Standard Test Liner, Not sure)
6. Quantity — dropdown (500, 1000, 5000, 10000+ pcs)
7. Printing Requirement — radio (None, 1-2 color flexo, Full color/offset)
8. Message / Details — textarea

**Sidebar (right column):**
- "Why Send an Inquiry?" benefit list
- Full contact info: address, email, phone, WhatsApp

**Validation:** Name (required, min 2 chars), Email (required, valid format), Dimensions (positive numbers if filled), reCAPTCHA token required.

**Submission:** Validate → reCAPTCHA v3 → POST to `window.QIANXI_CONFIG.apiUrl` → success message ("Thank you! We'll reply within 24 hours.") or error fallback.

**Google Maps:** Embedded below the form. Configurable API key.

## 7. Content Collections

### Products (`src/content/products/`)
Schema fields: title, description, category (flute type), usage, image placeholders, specifications (material, burst strength, ECT, size range, MOQ), application descriptions, custom options.

Initial 4 placeholder entries:
1. 3-Layer Corrugated Boxes (B/C flute)
2. 5-Layer Corrugated Boxes (BC/AB flute)
3. 7-Layer Heavy-Duty Boxes (AAA flute)
4. Custom Printed E-Flute Boxes

### Testimonials (JSON data file)
Array of { name, company, country, quote, flag } objects. 3-5 placeholder entries.

### FAQ (JSON data file)
Array of { question, answer } objects. 5-6 entries covering common buyer questions.

## 8. SEO Configuration

- **Per-page meta:** title, description, OG image (placeholder)
- **Structured data:** WebPage, Product, Organization (LocalBusiness) JSON-LD schemas
- **Sitemap:** Auto-generated via `@astrojs/sitemap`
- **Robots.txt:** Generated, points to sitemap
- **hreflang:** EN + ZH alternates
- **Canonical URLs:** Properly set per page

## 9. Form & Data Handling

- **Frontend validation:** Required fields, email format, number ranges
- **reCAPTCHA v3:** Site key via config, token attached to form payload
- **API endpoint:** Configurable via global config object (`window.QIANXI_CONFIG.apiUrl`). Default: placeholder — form shows success but data not sent until endpoint is provided
- **Success state:** Form replaced with green checkmark + "Thank you! We'll reply within 24 hours."
- **Error state:** Inline error message + fallback email contact

## 10. Image Strategy

No product/factory images currently exist. All image locations use styled placeholder boxes with text labels describing the required image (e.g., "[Factory exterior photo — modern building with company sign]"). Images can be dropped in later by replacing placeholder paths.

Placeholder style: dashed border, light gray background, centered label text matching the overall design language.

## 11. Attribution & License

- Original ScrewFast template: MIT License, Copyright (c) 2024 Emil Gulamov
- Modified work author: **Whereby**
- MIT License preserved with original copyright notice

## 12. Out of Scope (Phase 1)

- Dark mode
- Blog, Insights, Services, Docs, Pricing, Auth pages (code preserved, not deployed)
- Backend API / CRM integration (frontend prepared, endpoint configurable)
- Real product images and certification logos
- Spanish / Arabic language support (architecture ready)
- E-commerce / payment functionality
