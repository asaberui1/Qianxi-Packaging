# Qianxi Packaging Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transform the ScrewFast template into a corrugated box factory foreign-trade brand website (Chengdu Qianxi Packaging Materials Co., Ltd.) with EN+ZH i18n, Modern Steel color scheme, and inquiry form lead capture.

**Architecture:** Astro 7 SSG with Tailwind CSS 4 + Preline UI 4. Path-based i18n (`/` for EN, `/zh/` for ZH). Six deployed pages (Home, About, Products List, Product Detail, Contact, 404). Key-based translation system in `src/i18n/`. Configurable inquiry form with reCAPTCHA v3 placeholder. Reserved pages kept in codebase but excluded from navigation.

**Tech Stack:** Astro 7, Tailwind CSS 4, Preline UI 4, Lenis, GSAP, Google Fonts (Montserrat + Roboto), pnpm

---

## File Structure Map

### New files to create:
- `src/i18n/types.ts` — shared translation type interface
- `src/i18n/en.ts` — English translation keys
- `src/i18n/zh.ts` — Chinese translation keys
- `src/i18n/utils.ts` — i18n utility functions (language detection, key lookup)
- `src/pages/about.astro` — EN About Us page
- `src/pages/zh/index.astro` — ZH Homepage
- `src/pages/zh/about.astro` — ZH About Us
- `src/pages/zh/products/index.astro` — ZH Products list
- `src/pages/zh/products/[id].astro` — ZH Product detail
- `src/pages/zh/contact.astro` — ZH Contact
- `src/data_files/testimonials.json` — testimonial entries
- `src/components/ImagePlaceholder.astro` — reusable image placeholder component
- `src/components/sections/home/HeroSection.astro` — new industrial hero
- `src/components/sections/home/WhyChooseUs.astro` — 4 selling points
- `src/components/sections/home/ProductShowcase.astro` — product cards grid
- `src/components/sections/home/FactorySnapshot.astro` — factory photos + SNS
- `src/components/sections/home/CTASection.astro` — inline email capture
- `src/components/sections/home/TestimonialsCarousel.astro` — testimonial slider
- `src/components/sections/about/CompanyIntro.astro` — company story + stats
- `src/components/sections/about/FactoryGallery.astro` — lightbox gallery
- `src/components/sections/about/Certifications.astro` — cert cards
- `src/components/sections/contact/InquiryForm.astro` — full inquiry form
- `src/components/sections/contact/ContactSidebar.astro` — contact info sidebar
- `src/components/sections/contact/GoogleMapEmbed.astro` — maps embed

### Files to modify:
- `astro.config.mjs` — update site metadata, sitemap i18n, remove Starlight
- `src/assets/styles/global.css` — Modern Steel color palette, Google Fonts import
- `src/data_files/constants.ts` — Qianxi company info, SEO metadata
- `src/utils/navigation.ts` — new nav links, footer links, social links
- `src/utils/fr/navigation.ts` — replace with ZH navigation
- `src/components/BrandLogo.astro` — new "Q" logo for Qianxi
- `src/components/Meta.astro` — update hreflang, theme-color, schema
- `src/components/sections/navbar&footer/Navbar.astro` — remove dark mode, update colors, add Products dropdown
- `src/components/sections/navbar&footer/FooterSection.astro` — new 5-column footer
- `src/layouts/MainLayout.astro` — remove dark mode, body colors, update fonts
- `src/pages/index.astro` — complete rewrite with new sections
- `src/pages/contact.astro` — complete rewrite with new form
- `src/pages/products/index.astro` — rewrite with sidebar + cards
- `src/pages/products/[id].astro` — rewrite with corrugated specs
- `src/pages/404.astro` — update for EN/ZH
- `src/content.config.ts` — simplify product schema for corrugated boxes
- `src/components/ThemeIcon.astro` — disable/hide dark mode toggle
- `src/components/ui/LanguagePicker.astro` — EN/ZH switcher
- `src/data_files/features.json` — replace with Qianxi selling points
- `src/data_files/faqs.json` — replace with packaging industry FAQs

### Content to create:
- `src/content/products/en/item-3layer.md`
- `src/content/products/en/item-5layer.md`
- `src/content/products/en/item-heavyduty.md`
- `src/content/products/en/item-customprint.md`
- `src/content/products/zh/` — Chinese product counterparts

### Reserved (do not modify):
- `src/pages/blog/`, `src/pages/insights/`, `src/pages/services/`
- `src/content/blog/`, `src/content/insights/`, `src/content/docs/`
- `src/components/sections/pricing/`, `src/components/sections/misc/Authentication.astro`
- `src/components/ui/forms/LoginModal.astro`, `RegisterModal.astro`, `RecoverModal.astro`

---

### Task 1: Foundation — Color Palette, Fonts, and Constants

**Files:**
- Modify: `src/assets/styles/global.css`
- Modify: `src/data_files/constants.ts`
- Modify: `src/components/ThemeIcon.astro`

- [ ] **Step 1: Replace color palette in global.css with Modern Steel theme**

Replace the entire `@theme` block in `src/assets/styles/global.css`. Keep the existing `@import` lines and Preline config, and add Google Fonts import at the top. Replace all color definitions with the Modern Steel palette (steel blue `#1e3a5f` as the custom primary, burnt orange as accent, remove yellow, neutralize grays). Add Google Fonts import for Montserrat and Roboto.

Add this before `@import 'tailwindcss'`:
```css
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700;800&family=Roboto:wght@400;500;700&display=swap');
```

Replace the `@theme` block — keep the `--color-*: initial` reset pattern but change color values:
```css
@theme {
  --color-*: initial;
  --color-transparent: transparent;
  --color-current: currentColor;
  --color-black: #000;
  --color-white: #fff;

  /* Gray scale — neutral slate */
  --color-gray-50: #f8fafc;
  --color-gray-100: #f1f5f9;
  --color-gray-200: #e2e8f0;
  --color-gray-300: #cbd5e1;
  --color-gray-400: #94a3b8;
  --color-gray-500: #64748b;
  --color-gray-600: #475569;
  --color-gray-700: #334155;
  --color-gray-800: #1e293b;
  --color-gray-900: #0f172a;
  --color-gray-950: #020617;

  /* Primary — Steel Blue */
  --color-primary-50: #eff4fb;
  --color-primary-100: #dbe5f5;
  --color-primary-200: #bdd0ed;
  --color-primary-300: #8fb2e0;
  --color-primary-400: #5b8ecf;
  --color-primary-500: #3b71ba;
  --color-primary-600: #2b589e;
  --color-primary-700: #244780;
  --color-primary-800: #1e3a5f;
  --color-primary-900: #1a2f4e;
  --color-primary-950: #0f1f36;

  /* Accent — Burnt Orange */
  --color-accent-50: #fff8ed;
  --color-accent-100: #ffefd4;
  --color-accent-200: #ffdba8;
  --color-accent-300: #ffc170;
  --color-accent-400: #ff9c36;
  --color-accent-500: #fe7f11;
  --color-accent-600: #ea580c;
  --color-accent-700: #c24808;
  --color-accent-800: #9a3a0f;
  --color-accent-900: #7c3210;
  --color-accent-950: #431606;

  /* Neutral — for light background scheme */
  --color-neutral-50: #f8fafc;
  --color-neutral-100: #f1f5f9;
  --color-neutral-200: #e2e8f0;
  --color-neutral-300: #cbd5e1;
  --color-neutral-400: #94a3b8;
  --color-neutral-500: #64748b;
  --color-neutral-600: #475569;
  --color-neutral-700: #334155;
  --color-neutral-800: #1e293b;
  --color-neutral-900: #0f172a;
  --color-neutral-950: #020617;

  /* Keep orange for Preline compatibility */
  --color-orange-50: #fff8ed;
  --color-orange-100: #ffefd4;
  --color-orange-200: #ffdba8;
  --color-orange-300: #ffc170;
  --color-orange-400: #ff9c36;
  --color-orange-500: #fe7f11;
  --color-orange-600: #ea580c;
  --color-orange-700: #c24808;
  --color-orange-800: #9a3a0f;
  --color-orange-900: #7c3210;
  --color-orange-950: #431606;

  --color-red-50: oklch(0.971 0.013 17.38);
  --color-red-100: oklch(0.936 0.032 17.717);
  --color-red-200: oklch(0.885 0.062 18.334);
  --color-red-300: oklch(0.808 0.114 19.571);
  --color-red-400: oklch(0.704 0.191 22.216);
  --color-red-500: oklch(0.637 0.237 25.331);
  --color-red-600: oklch(0.577 0.245 27.325);
  --color-red-700: oklch(0.505 0.213 27.518);
  --color-red-800: oklch(0.444 0.177 26.899);
  --color-red-900: oklch(0.396 0.141 25.723);
  --color-red-950: oklch(0.258 0.092 26.042);

  /* Font families */
  --font-sans: 'Roboto', ui-sans-serif, system-ui, sans-serif;
  --font-heading: 'Montserrat', 'Roboto', ui-sans-serif, system-ui, sans-serif;

  /* Yellow kept minimal for any residual template uses */
  --color-yellow-50: oklch(0.987 0.026 102.212);
  --color-yellow-100: oklch(0.973 0.071 103.193);
  --color-yellow-200: oklch(0.945 0.129 101.54);
  --color-yellow-300: oklch(0.905 0.182 98.111);
  --color-yellow-400: oklch(0.852 0.199 91.936);
  --color-yellow-500: oklch(0.795 0.184 86.047);
  --color-yellow-600: oklch(0.681 0.162 75.834);
  --color-yellow-700: oklch(0.554 0.135 66.442);
  --color-yellow-800: oklch(0.476 0.114 61.907);
  --color-yellow-900: oklch(0.421 0.095 57.708);
  --color-yellow-950: oklch(0.286 0.066 53.813);

  --color-zinc-50: oklch(0.985 0 0);
  --color-zinc-100: oklch(0.967 0.001 286.375);
  --color-zinc-200: oklch(0.92 0.004 286.32);
  --color-zinc-300: oklch(0.871 0.006 286.286);
  --color-zinc-400: oklch(0.705 0.015 286.067);
  --color-zinc-500: oklch(0.552 0.016 285.938);
  --color-zinc-600: oklch(0.442 0.017 285.786);
  --color-zinc-700: oklch(0.37 0.013 285.805);
  --color-zinc-800: oklch(0.274 0.006 286.033);
  --color-zinc-900: oklch(0.21 0.006 285.885);
  --color-zinc-950: oklch(0.141 0.005 285.823);
}
```

Also add a base layer font rule after the existing `@layer base` block:
```css
@layer base {
  h1, h2, h3, h4, h5, h6 {
    font-family: var(--font-heading);
  }
}
```

- [ ] **Step 2: Update constants.ts with Qianxi company info**

Replace the entire content of `src/data_files/constants.ts`:

```typescript
import ogImageSrc from '@images/social.png';

export const SITE = {
  title: 'Qianxi Packaging',
  tagline: 'Your Trusted Corrugated Box Manufacturer',
  description:
    'Chengdu Qianxi Packaging Materials Co., Ltd. — Factory-direct custom corrugated boxes. 3-layer, 5-layer, heavy-duty, and custom printed packaging solutions with global shipping.',
  description_short:
    'Factory-direct custom corrugated boxes from China. ISO certified, free sampling, 24/7 support.',
  url: 'https://asaberui1.github.io',
  author: 'Whereby',
};

export const COMPANY = {
  name: 'Chengdu Qianxi Packaging Materials Co., Ltd.',
  nameZh: '成都芊西包装材料有限公司',
  address: {
    en: 'Building 22, No. 301 Lianhua Road, Baiguo Street, Jintang County, Chengdu, Sichuan, China',
    zh: '四川省成都市金堂县白果街道莲花路301号22栋1层（四川金堂经济开发区内）',
  },
  email: 'sales@qianxipackaging.com',
  phone: '+86 XXX XXXX XXXX',
  whatsapp: '+86 XXX XXXX XXXX',
  coordinates: {
    lat: 30.86,
    lng: 104.41,
  },
};

export const SEO = {
  title: SITE.title,
  description: SITE.description,
  structuredData: {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: COMPANY.name,
    url: SITE.url,
    description: SITE.description,
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Building 22, No. 301 Lianhua Road, Baiguo Street',
      addressLocality: 'Chengdu',
      addressRegion: 'Sichuan',
      addressCountry: 'CN',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      email: COMPANY.email,
      contactType: 'sales',
    },
  },
};

export const OG = {
  locale: 'en_US',
  type: 'website',
  url: SITE.url,
  title: `${SITE.title} — Factory Direct Corrugated Box Manufacturer`,
  description:
    'Custom corrugated boxes from Chengdu Qianxi Packaging. ISO certified factory, free sampling, 24-hour quotation. 3-layer, 5-layer, heavy-duty, and custom printed boxes for global export.',
  image: ogImageSrc,
};

export const partnersData: Array<{
  icon: string;
  name: string;
  href: string;
}> = [];
```

- [ ] **Step 3: Hide dark mode toggle by rendering nothing in ThemeIcon**

Edit `src/components/ThemeIcon.astro` — add a return at the top to render nothing (we're removing dark mode for Phase 1):

```astro
---
// Dark mode disabled for Phase 1
---
<!-- No dark mode toggle for now -->
```

- [ ] **Step 4: Verify the build**

Run: `pnpm run build`

Expected: Build may have errors from color class changes in other files. Note them — we'll fix them as we update each page.

- [ ] **Step 5: Commit**

```bash
git add src/assets/styles/global.css src/data_files/constants.ts src/components/ThemeIcon.astro
git commit -m "feat: apply Modern Steel color palette and Qianxi company constants"
```

---

### Task 2: i18n System — Translation Keys and Language Detection

**Files:**
- Create: `src/i18n/types.ts`
- Create: `src/i18n/en.ts`
- Create: `src/i18n/zh.ts`
- Create: `src/i18n/utils.ts`

- [ ] **Step 1: Create the shared translation type interface**

Create `src/i18n/types.ts`:

```typescript
export interface SiteTranslations {
  nav: {
    home: string;
    about: string;
    products: string;
    contact: string;
    getQuote: string;
  };
  footer: {
    brandTagline: string;
    quickLinks: string;
    productLinks: string;
    support: string;
    newsletter: string;
    newsletterPlaceholder: string;
    subscribe: string;
    copyright: string;
    privacyPolicy: string;
    terms: string;
  };
  home: {
    heroTitle: string;
    heroSubtitle: string;
    heroCTA: string;
    trustCard1Title: string;
    trustCard1Desc: string;
    trustCard2Title: string;
    trustCard2Desc: string;
    trustCard3Title: string;
    trustCard3Desc: string;
    whyChooseTitle: string;
    whyChoose1Title: string;
    whyChoose1Desc: string;
    whyChoose2Title: string;
    whyChoose2Desc: string;
    whyChoose3Title: string;
    whyChoose3Desc: string;
    whyChoose4Title: string;
    whyChoose4Desc: string;
    productShowcaseTitle: string;
    factorySnapshotTitle: string;
    followUs: string;
    followUsDesc: string;
    ctaTitle: string;
    ctaSubtitle: string;
    ctaEmailPlaceholder: string;
    ctaNamePlaceholder: string;
    ctaRequirementsPlaceholder: string;
    ctaButton: string;
    testimonialsTitle: string;
    faqTitle: string;
  };
  about: {
    title: string;
    introHeading: string;
    introText: string;
    yearsExperience: string;
    exportCountries: string;
    annualCapacity: string;
    galleryTitle: string;
    workshopLabel: string;
    warehouseLabel: string;
    qcLabLabel: string;
    certificationsTitle: string;
    certISO: string;
    certISODesc: string;
    certFSC: string;
    certFSCDesc: string;
    certSGS: string;
    certSGSDesc: string;
    certREACH: string;
    certREACHDesc: string;
    closingCTA: string;
    closingCTASubtitle: string;
    closingCTABtn: string;
  };
  products: {
    listTitle: string;
    filterFluteType: string;
    filterUsage: string;
    filterBtn: string;
    flute3layer: string;
    flute5layer: string;
    flute7layer: string;
    fluteE: string;
    usageMoving: string;
    usageEcommerce: string;
    usageIndustrial: string;
    usageRetail: string;
    detailSpecs: string;
    detailApplications: string;
    detailCustomOptions: string;
    detailRequestQuote: string;
  };
  contact: {
    title: string;
    formTitle: string;
    formSubtitle: string;
    nameLabel: string;
    emailLabel: string;
    phoneLabel: string;
    boxSpecs: string;
    lengthLabel: string;
    widthLabel: string;
    heightLabel: string;
    materialLabel: string;
    materialOption1: string;
    materialOption2: string;
    materialOption3: string;
    materialOption4: string;
    quantityLabel: string;
    qty500: string;
    qty1000: string;
    qty5000: string;
    qty10000: string;
    printLabel: string;
    printNone: string;
    printFlexo: string;
    printOffset: string;
    messageLabel: string;
    messagePlaceholder: string;
    recaptchaNotice: string;
    submitBtn: string;
    sidebarWhy: string;
    sidebarWhy1: string;
    sidebarWhy2: string;
    sidebarWhy3: string;
    sidebarWhy4: string;
    sidebarWhy5: string;
    contactInfo: string;
    addressLabel: string;
    emailLabel2: string;
    phoneLabel2: string;
    whatsappLabel: string;
    successTitle: string;
    successMessage: string;
    errorMessage: string;
  };
  langSwitch: string;
}
```

- [ ] **Step 2: Create English translations**

Create `src/i18n/en.ts`:

```typescript
import type { SiteTranslations } from './types';

const en: SiteTranslations = {
  nav: {
    home: 'Home',
    about: 'About Us',
    products: 'Products',
    contact: 'Contact',
    getQuote: 'Get a Quote',
  },
  footer: {
    brandTagline: 'Your Trusted Corrugated Box Manufacturer — Factory Direct, Custom Solutions, Global Shipping.',
    quickLinks: 'Quick Links',
    productLinks: 'Products',
    support: 'Support',
    newsletter: 'Newsletter',
    newsletterPlaceholder: 'your@email.com',
    subscribe: 'Subscribe',
    copyright: `© ${new Date().getFullYear()} Chengdu Qianxi Packaging Materials Co., Ltd. All rights reserved.`,
    privacyPolicy: 'Privacy Policy',
    terms: 'Terms',
  },
  home: {
    heroTitle: 'Your Trusted Corrugated Box Manufacturer',
    heroSubtitle: 'Factory Direct · Custom Solutions · Fast Global Delivery',
    heroCTA: 'Get Your Custom Quote',
    trustCard1Title: 'ISO Certified',
    trustCard1Desc: 'ISO 9001 quality management, consistent production standards.',
    trustCard2Title: 'Advanced Automation',
    trustCard2Desc: 'Fully automated corrugated line, high efficiency output.',
    trustCard3Title: 'Export Experience',
    trustCard3Desc: 'Serving buyers across multiple countries and regions.',
    whyChooseTitle: 'Why Choose Qianxi Packaging',
    whyChoose1Title: 'Factory Direct',
    whyChoose1Desc: 'No middlemen. Competitive pricing direct from the source.',
    whyChoose2Title: 'Free Sampling',
    whyChoose2Desc: 'Custom samples delivered within 3-5 business days.',
    whyChoose3Title: 'Advanced Equipment',
    whyChoose3Desc: 'Automated production line ensuring consistent quality.',
    whyChoose4Title: '24/7 Support',
    whyChoose4Desc: 'Dedicated representative, WhatsApp response within hours.',
    productShowcaseTitle: 'Our Products',
    factorySnapshotTitle: 'Inside Our Factory',
    followUs: 'Follow Us',
    followUsDesc: 'See our daily production and latest orders on social media.',
    ctaTitle: 'Get Your Custom Quote in 24 Hours',
    ctaSubtitle: 'Tell us what you need — we will respond with a detailed quotation within one business day.',
    ctaEmailPlaceholder: 'Your Email Address *',
    ctaNamePlaceholder: 'Your Name',
    ctaRequirementsPlaceholder: 'Brief Requirements (optional)',
    ctaButton: 'Send Inquiry',
    testimonialsTitle: 'What Our Clients Say',
    faqTitle: 'Frequently Asked Questions',
  },
  about: {
    title: 'About Us',
    introHeading: 'Chengdu Qianxi Packaging Materials Co., Ltd.',
    introText: 'Located in Jintang Economic Development Zone, Chengdu, Sichuan, we specialize in manufacturing corrugated cardboard boxes for export. Our factory features automated production lines and a dedicated QC laboratory, serving buyers worldwide with reliable quality and competitive pricing.',
    yearsExperience: 'Years Experience',
    exportCountries: 'Export Countries',
    annualCapacity: 'Annual Capacity (tons)',
    galleryTitle: 'Factory Gallery',
    workshopLabel: 'Production Workshop — Corrugated line in operation',
    warehouseLabel: 'Warehouse — Finished goods storage area',
    qcLabLabel: 'QC Laboratory — Testing equipment & inspection',
    certificationsTitle: 'Certifications & Compliance',
    certISO: 'ISO 9001',
    certISODesc: 'Quality Management System',
    certFSC: 'FSC Certified',
    certFSCDesc: 'Sustainable Forestry Materials',
    certSGS: 'SGS Tested',
    certSGSDesc: 'Material & Strength Testing',
    certREACH: 'REACH / CE',
    certREACHDesc: 'European Market Compliance',
    closingCTA: 'Ready to Work With a Reliable Corrugated Box Partner?',
    closingCTASubtitle: 'Let us discuss your packaging needs. We respond to every inquiry within 24 hours.',
    closingCTABtn: 'Contact Us Today',
  },
  products: {
    listTitle: 'Our Products',
    filterFluteType: 'Filter by Flute Type',
    filterUsage: 'Filter by Usage',
    filterBtn: 'Filter',
    flute3layer: '3-Layer (A/B/C Flute)',
    flute5layer: '5-Layer (AB/BC Flute)',
    flute7layer: '7-Layer (AAA Flute)',
    fluteE: 'E-Flute (Cosmetic Boxes)',
    usageMoving: 'Moving / Relocation',
    usageEcommerce: 'E-commerce Shipping',
    usageIndustrial: 'Industrial / Heavy Parts',
    usageRetail: 'Retail / Custom Printed',
    detailSpecs: 'Specifications',
    detailApplications: 'Applications',
    detailCustomOptions: 'Custom Options',
    detailRequestQuote: 'Request Quote for This Product',
  },
  contact: {
    title: 'Get a Custom Quote',
    formTitle: 'Request a Custom Quote',
    formSubtitle: 'Fill in the details below. We will respond with a tailored quotation within 24 hours.',
    nameLabel: 'Your Name *',
    emailLabel: 'Email Address *',
    phoneLabel: 'WhatsApp / Phone',
    boxSpecs: 'Box Specifications',
    lengthLabel: 'Length (mm)',
    widthLabel: 'Width (mm)',
    heightLabel: 'Height (mm)',
    materialLabel: 'Material Requirement',
    materialOption1: 'Select material grade...',
    materialOption2: 'K=K (Kraft face / Kraft liner)',
    materialOption3: 'A=A (Grade A both sides)',
    materialOption4: 'Not sure — need recommendation',
    quantityLabel: 'Quantity',
    qty500: '500 pcs',
    qty1000: '1,000 pcs',
    qty5000: '5,000 pcs',
    qty10000: '10,000+ pcs',
    printLabel: 'Printing Requirement',
    printNone: 'No printing needed',
    printFlexo: '1-2 color flexo',
    printOffset: 'Full color / offset',
    messageLabel: 'Message / Additional Details',
    messagePlaceholder: 'Describe your product, usage scenario, any special requirements...',
    recaptchaNotice: 'This site is protected by reCAPTCHA v3. By submitting, you agree to our Privacy Policy.',
    submitBtn: 'Send Inquiry',
    sidebarWhy: 'Why Send an Inquiry?',
    sidebarWhy1: 'Free quotation within 24 hours',
    sidebarWhy2: 'Expert material recommendation',
    sidebarWhy3: 'Free custom sample service',
    sidebarWhy4: 'Dedicated account manager',
    sidebarWhy5: 'Secure, confidential handling',
    contactInfo: 'Contact Information',
    addressLabel: 'Address',
    emailLabel2: 'Email',
    phoneLabel2: 'Phone',
    whatsappLabel: 'WhatsApp',
    successTitle: 'Thank You!',
    successMessage: 'Your inquiry has been received. We will reply within 24 hours.',
    errorMessage: 'Something went wrong. Please try emailing us directly.',
  },
  langSwitch: '中文',
};

export default en;
```

- [ ] **Step 3: Create Chinese translations**

Create `src/i18n/zh.ts` — same structure as `en.ts` but with Chinese text for all string values. (Omitted for brevity in the plan — the actual file will have ~100 Chinese translations covering all keys.)

- [ ] **Step 4: Create i18n utility functions**

Create `src/i18n/utils.ts`:

```typescript
import en from './en';
import zh from './zh';
import type { SiteTranslations } from './types';

export const locales = {
  en: { label: 'English', key: 'en', translations: en },
  zh: { label: '中文', key: 'zh', translations: zh },
} as const;

export type Locale = keyof typeof locales;

export const defaultLocale: Locale = 'en';

export function getLocaleFromPath(pathname: string): Locale {
  if (pathname.startsWith('/zh')) return 'zh';
  return 'en';
}

export function getTranslations(locale: Locale): SiteTranslations {
  return locales[locale].translations;
}

export function detectBrowserLanguage(): Locale {
  if (typeof navigator === 'undefined') return defaultLocale;
  const lang = navigator.language || (navigator as any).userLanguage || '';
  if (lang.startsWith('zh')) return 'zh';
  return 'en';
}

export function getLocalizedPath(path: string, locale: Locale): string {
  const cleanPath = path.replace(/^\/(zh|en)\//, '/').replace(/^\/zh$/, '/');
  if (locale === 'en') {
    return cleanPath.startsWith('/') ? cleanPath : `/${cleanPath}`;
  }
  return `/zh${cleanPath.startsWith('/') ? cleanPath : `/${cleanPath}`}`;
}

export type { SiteTranslations };
```

- [ ] **Step 5: Commit**

```bash
git add src/i18n/
git commit -m "feat: add i18n system with EN and ZH translation keys"
```

---

### Task 3: Navigation & Footer Data

**Files:**
- Modify: `src/utils/navigation.ts`

- [ ] **Step 1: Rewrite navigation and footer data**

Replace `src/utils/navigation.ts` entirely:

```typescript
const navBarLinks = [
  { name: 'Home', url: '/' },
  { name: 'Products', url: '/products' },
  { name: 'About Us', url: '/about' },
  { name: 'Contact', url: '/contact' },
];

const megaMenuLinks = {
  byFluteType: [
    { name: '3-Layer Corrugated Boxes', url: '/products' },
    { name: '5-Layer Corrugated Boxes', url: '/products' },
    { name: '7-Layer Heavy-Duty Boxes', url: '/products' },
    { name: 'E-Flute Cosmetic Boxes', url: '/products' },
  ],
  byUsage: [
    { name: 'Moving / Relocation Boxes', url: '/products' },
    { name: 'E-commerce Shipping Boxes', url: '/products' },
    { name: 'Industrial / Heavy Parts', url: '/products' },
    { name: 'Retail / Custom Printed', url: '/products' },
  ],
};

const footerLinks = [
  {
    section: 'Quick Links',
    links: [
      { name: 'Home', url: '/' },
      { name: 'About Us', url: '/about' },
      { name: 'Products', url: '/products' },
      { name: 'Contact', url: '/contact' },
    ],
  },
  {
    section: 'Products',
    links: [
      { name: '3-Layer Boxes', url: '/products' },
      { name: '5-Layer Boxes', url: '/products' },
      { name: 'Heavy-Duty Boxes', url: '/products' },
      { name: 'Custom Printed Boxes', url: '/products' },
    ],
  },
  {
    section: 'Support',
    links: [
      { name: 'FAQ', url: '/#faq' },
      { name: 'Shipping Info', url: '#' },
      { name: 'Custom Order', url: '/contact' },
      { name: 'Samples', url: '/contact' },
    ],
  },
];

const socialLinks = {
  facebook: 'https://www.facebook.com/',
  x: 'https://twitter.com/',
  instagram: 'https://www.instagram.com/',
  linkedin: 'https://www.linkedin.com/',
};

export default {
  navBarLinks,
  megaMenuLinks,
  footerLinks,
  socialLinks,
};
```

- [ ] **Step 2: Commit**

```bash
git add src/utils/navigation.ts
git commit -m "feat: update navigation with Qianxi site structure"
```

---

### Task 4: Shared Components — BrandLogo, Meta, ImagePlaceholder

**Files:**
- Modify: `src/components/BrandLogo.astro`
- Modify: `src/components/Meta.astro`
- Create: `src/components/ImagePlaceholder.astro`

- [ ] **Step 1: Create new BrandLogo — a stylized "Q" icon mark**

Replace `src/components/BrandLogo.astro` with a simple text-based logo. This avoids complex SVG maintenance and renders cleanly:

```astro
---
const { class: className = 'h-auto w-36' } = Astro.props;
---
<div class={`flex items-center gap-2 ${className}`}>
  <span
    class="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent-600 text-lg font-extrabold text-white"
    style="font-family: var(--font-heading);">
    Q
  </span>
  <span
    class="text-lg font-bold text-primary-800 whitespace-nowrap"
    style="font-family: var(--font-heading);">
    Qianxi Packaging
  </span>
</div>
```

- [ ] **Step 2: Update Meta.astro for EN+ZH hreflang and new theme-color**

In `src/components/Meta.astro`, change:
- The `languages` object from `{ en: '', fr: 'fr' }` to `{ en: '', zh: 'zh' }`
- The `languages` map function — replace `fr` references with `zh`
- The `og:locale` logic: replace `'/fr'` check with `'/zh'`
- The `theme-color` meta tag: change `#facc15` to `#1e3a5f`

These are targeted edits. Make the following replacements:

Old: `fr: 'fr'` → New: `zh: 'zh'`

Old: `/^\/(fr|en)\//` → New: `/^\/(zh|en)\//` (two occurrences)

Old: `basePath.startsWith('/fr') ? 'fr_FR' : 'en_US'` → New: `basePath.startsWith('/zh') ? 'zh_CN' : 'en_US'`

Old: `content="#facc15"` → New: `content="#1e3a5f"`

- [ ] **Step 3: Create ImagePlaceholder component**

Create `src/components/ImagePlaceholder.astro`:

```astro
---
const {
  label,
  width = 'w-full',
  height = 'h-48',
  class: extraClass = '',
} = Astro.props;

interface Props {
  label: string;
  width?: string;
  height?: string;
  class?: string;
}
---
<div
  class={`${width} ${height} ${extraClass} flex items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-100`}
>
  <p class="px-4 text-center text-sm text-gray-400">{label}</p>
</div>
```

- [ ] **Step 4: Commit**

```bash
git add src/components/BrandLogo.astro src/components/Meta.astro src/components/ImagePlaceholder.astro
git commit -m "feat: update BrandLogo, Meta for EN+ZH, add ImagePlaceholder component"
```

---

### Task 5: Header Navbar — Remove Dark Mode, Update Colors, Add Products Dropdown

**Files:**
- Modify: `src/components/sections/navbar&footer/Navbar.astro`
- Modify: `src/components/ui/LanguagePicker.astro`
- Modify: `src/layouts/MainLayout.astro`

- [ ] **Step 1: Rewrite Navbar.astro with Modern Steel colors and Products mega menu**

Replace the contents of `src/components/sections/navbar&footer/Navbar.astro`:

Key changes:
- Remove `ThemeIcon` import and usage (no dark mode toggle)
- Remove `Authentication` import and usage (reserved page)
- Change the nav container background from `bg-yellow-50/60` to `bg-white/90` with steel blue border
- Change `text-yellow-500` references to `text-accent-600`
- Update text colors from `neutral-*` to `gray-*`
- Remove `enStrings`/`frStrings` — use a single strings import since i18n is handled at the Astro page level via translations prop
- Replace `LanguagePicker` with a simplified EN/ZH toggle
- Add Products dropdown using Preline's dropdown component with `megaMenuLinks`

The full replacement component is ~120 lines. Key structure:
```astro
---
import NavLink from '@components/ui/links/NavLink.astro';
import BrandLogo from '@components/BrandLogo.astro';
import enStrings from '@utils/navigation.ts';

const homeUrl = '/';
---

<header class="sticky inset-x-0 top-4 z-50 flex w-full flex-wrap text-sm md:flex-nowrap md:justify-start">
  <nav class="relative mx-2 w-full rounded-[36px] border border-primary-200/40 bg-white/90 px-4 py-3 backdrop-blur-md md:flex md:items-center md:justify-between md:px-6 md:py-0 lg:px-8 xl:mx-auto" aria-label="Global">
    <div class="flex items-center justify-between">
      <a class="flex-none rounded-lg text-xl font-bold outline-hidden focus-visible:ring-3 ring-primary-500" href={homeUrl} aria-label="Brand">
        <BrandLogo class="h-auto w-36" />
      </a>
      <div class="mr-5 ml-auto md:hidden">
        <button type="button" class="hs-collapse-toggle flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold text-gray-600 transition duration-300 hover:bg-gray-200 disabled:pointer-events-none disabled:opacity-50" data-hs-collapse="#navbar-collapse-with-animation" aria-controls="navbar-collapse-with-animation" aria-label="Toggle navigation">
          <!-- hamburger SVG (same as original) -->
        </button>
      </div>
    </div>
    <div id="navbar-collapse-with-animation" class="hs-collapse hidden grow basis-full overflow-hidden transition-all duration-300 md:block">
      <div class="mt-5 flex flex-col gap-x-0 gap-y-4 md:mt-0 md:flex-row md:items-center md:justify-end md:gap-x-4 md:gap-y-0 md:ps-7 lg:gap-x-7">
        {enStrings.navBarLinks.slice(0, 3).map(link => (
          <NavLink url={link.url} name={link.name} />
        ))}
        <a href="/contact" class="rounded-lg bg-accent-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-accent-700">
          Get a Quote
        </a>
        <a href="/zh/" class="text-sm text-gray-600 hover:text-primary-700 transition">中文</a>
      </div>
    </div>
  </nav>
</header>
```

- [ ] **Step 2: Replace LanguagePicker with simple link toggle**

Create a minimal inline language toggle in the Navbar (no separate component needed — handled inline with a link to the ZH version).

Already done above with the `<a href="/zh/">` link.

- [ ] **Step 3: Update MainLayout — remove dark mode, update body colors**

Edit `src/layouts/MainLayout.astro`:

Change the `<html>` tag from:
```
<html lang={lang} class="scrollbar-hide lenis lenis-smooth scroll-pt-16">
```
to:
```
<html lang={lang} class="scrollbar-hide lenis lenis-smooth scroll-pt-16">
```
(No change to class, but remove the dark mode inline script.)

Remove the entire dark mode detection `<script is:inline>` block (lines 41-52).

Change the `<body>` class from:
```
class="flex min-h-screen flex-col bg-neutral-200 selection:bg-yellow-400 selection:text-neutral-700 dark:bg-neutral-800"
```
to:
```
class="flex min-h-screen flex-col bg-gray-100 selection:bg-accent-600 selection:text-white"
```

- [ ] **Step 4: Commit**

```bash
git add src/components/sections/navbar&footer/Navbar.astro src/layouts/MainLayout.astro
git commit -m "feat: modernize Navbar with steel blue theme, remove dark mode"
```

---

### Task 6: Homepage — Hero, Why Choose Us, Product Showcase

**Files:**
- Create: `src/components/sections/home/HeroSection.astro`
- Create: `src/components/sections/home/WhyChooseUs.astro`
- Create: `src/components/sections/home/ProductShowcase.astro`
- Create: `src/components/sections/home/FactorySnapshot.astro`
- Create: `src/components/sections/home/CTASection.astro`
- Create: `src/components/sections/home/TestimonialsCarousel.astro`
- Modify: `src/data_files/features.json`
- Modify: `src/data_files/faqs.json`
- Create: `src/data_files/testimonials.json`
- Modify: `src/pages/index.astro`

- [ ] **Step 1: Write HeroSection component**

Create `src/components/sections/home/HeroSection.astro`:

```astro
---
import ImagePlaceholder from '@components/ImagePlaceholder.astro';
import type { SiteTranslations } from '@i18n/types';

const { t } = Astro.props;
interface Props { t: SiteTranslations; }
---

<section class="relative overflow-hidden rounded-3xl bg-primary-900 py-20 text-white md:py-32">
  <div class="absolute inset-0 opacity-20">
    <ImagePlaceholder label="[Factory hero image — modern corrugated production line, well-lit, clean industrial setting]" height="h-full" />
  </div>
  <div class="relative z-10 mx-auto max-w-3xl px-4 text-center">
    <h1 class="mb-4 text-4xl font-extrabold leading-tight md:text-5xl" style="font-family: var(--font-heading);">
      {t.home.heroTitle}
    </h1>
    <p class="mb-8 text-lg text-gray-300">{t.home.heroSubtitle}</p>
    <a href="/contact" class="inline-block rounded-lg bg-accent-600 px-8 py-3 text-lg font-semibold text-white transition hover:bg-accent-700">
      {t.home.heroCTA} →
    </a>
  </div>
</section>

<!-- Trust Cards -->
<div class="-mt-10 relative z-10 mx-auto grid max-w-4xl gap-6 px-4 sm:grid-cols-3">
  <div class="rounded-xl bg-white p-6 text-center shadow-lg">
    <div class="mb-3 text-3xl">🏭</div>
    <h3 class="text-lg font-bold text-primary-800" style="font-family: var(--font-heading);">{t.home.trustCard1Title}</h3>
    <p class="mt-2 text-sm text-gray-600">{t.home.trustCard1Desc}</p>
  </div>
  <div class="rounded-xl bg-white p-6 text-center shadow-lg">
    <div class="mb-3 text-3xl">⚙️</div>
    <h3 class="text-lg font-bold text-primary-800" style="font-family: var(--font-heading);">{t.home.trustCard2Title}</h3>
    <p class="mt-2 text-sm text-gray-600">{t.home.trustCard2Desc}</p>
  </div>
  <div class="rounded-xl bg-white p-6 text-center shadow-lg">
    <div class="mb-3 text-3xl">🌍</div>
    <h3 class="text-lg font-bold text-primary-800" style="font-family: var(--font-heading);">{t.home.trustCard3Title}</h3>
    <p class="mt-2 text-sm text-gray-600">{t.home.trustCard3Desc}</p>
  </div>
</div>
```

Note: Emoji icons are placeholders — replaced with SVG icons in Task 14.

- [ ] **Step 2: Write WhyChooseUs component**

Create `src/components/sections/home/WhyChooseUs.astro` — 4 icon cards in a responsive grid (4 columns desktop, 2 tablet, 1 mobile). Each card has an icon placeholder, title, and description from translations. Section heading uses `t.home.whyChooseTitle`.

- [ ] **Step 3: Write ProductShowcase component**

Create `src/components/sections/home/ProductShowcase.astro` — a 4-column grid of product cards using the Astro content collection for products. Each card shows the product image placeholder, title, and brief description. Links to `/products/[id]`.

```astro
---
import { getCollection } from 'astro:content';
import ImagePlaceholder from '@components/ImagePlaceholder.astro';
import type { SiteTranslations } from '@i18n/types';

const { t } = Astro.props;
const products = await getCollection('products', (entry) => entry.id.startsWith('en/'));
interface Props { t: SiteTranslations; }
---
<section class="py-20">
  <div class="mx-auto max-w-7xl px-4">
    <h2 class="mb-12 text-center text-3xl font-extrabold text-primary-900" style="font-family: var(--font-heading);">
      {t.home.productShowcaseTitle}
    </h2>
    <div class="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
      {products.slice(0, 4).map(product => (
        <a href={`/products/${product.data.main.id}`} class="group block overflow-hidden rounded-xl bg-white shadow-md transition hover:shadow-lg">
          <ImagePlaceholder label={`[${product.data.title} Image]`} height="h-48" />
          <div class="p-4">
            <h3 class="font-bold text-primary-800 group-hover:text-accent-600" style="font-family: var(--font-heading);">{product.data.title}</h3>
            <p class="mt-1 text-sm text-gray-600">{product.data.description}</p>
          </div>
        </a>
      ))}
    </div>
  </div>
</section>
```

- [ ] **Step 4: Write FactorySnapshot, CTASection, TestimonialsCarousel components**

Create each as a focused Astro component:

`FactorySnapshot.astro` — 2-column layout. Left: 3 factory photos in a grid (using ImagePlaceholder). Right: social media links card with Instagram/Facebook/LinkedIn icons.

`CTASection.astro` — Full-width dark banner with "Get Your Custom Quote in 24 Hours" heading, subtitle, and inline form (email required, name, brief requirements optional, submit button). Form uses `window.QIANXI_CONFIG` for endpoint.

```astro
---
import type { SiteTranslations } from '@i18n/types';
const { t } = Astro.props;
interface Props { t: SiteTranslations; }
---
<section class="py-20">
  <div class="mx-auto max-w-4xl rounded-2xl bg-primary-900 px-6 py-16 text-center text-white">
    <h2 class="mb-4 text-3xl font-extrabold" style="font-family: var(--font-heading);">{t.home.ctaTitle}</h2>
    <p class="mb-8 text-gray-300">{t.home.ctaSubtitle}</p>
    <form id="homepage-cta-form" class="mx-auto flex max-w-xl flex-wrap gap-3">
      <input type="email" name="email" required placeholder={t.home.ctaEmailPlaceholder}
        class="flex-1 rounded-lg border-0 px-4 py-3 text-gray-900 min-w-[200px]" />
      <input type="text" name="name" placeholder={t.home.ctaNamePlaceholder}
        class="flex-1 rounded-lg border-0 px-4 py-3 text-gray-900 min-w-[150px]" />
      <input type="text" name="requirements" placeholder={t.home.ctaRequirementsPlaceholder}
        class="w-full rounded-lg border-0 px-4 py-3 text-gray-900" />
      <button type="submit" class="mx-auto rounded-lg bg-accent-600 px-8 py-3 font-semibold transition hover:bg-accent-700">
        {t.home.ctaButton} →
      </button>
    </form>
    <p class="mt-4 text-xs text-gray-400">Protected by reCAPTCHA. We respect your privacy.</p>
  </div>
</section>
```

`TestimonialsCarousel.astro` — Uses testimonials JSON data. Auto-rotating carousel (GSAP or CSS animation). Each slide shows a quote, author name, company, and country flag emoji.

- [ ] **Step 5: Update data files**

Update `src/data_files/features.json`:

```json
[
  {
    "heading": "Factory Direct",
    "content": "No middlemen. Competitive pricing direct from the source manufacturing.",
    "svg": "groups"
  },
  {
    "heading": "Free Sampling",
    "content": "Custom samples delivered within 3-5 business days for your evaluation.",
    "svg": "verified"
  },
  {
    "heading": "Advanced Equipment",
    "content": "Automated corrugated production line ensuring consistent quality output.",
    "svg": "tools"
  },
  {
    "heading": "24/7 Support",
    "content": "Dedicated representative with WhatsApp response within hours, not days.",
    "svg": "frame"
  }
]
```

Update `src/data_files/faqs.json`:

```json
{
  "subTitle": "Common questions about our corrugated box products and services.",
  "faqs": [
    {
      "question": "What is your minimum order quantity (MOQ)?",
      "answer": "Our standard MOQ is 500 pieces per size/design. For larger or custom orders, we can discuss flexible arrangements."
    },
    {
      "question": "How long does sampling take?",
      "answer": "Custom samples are typically produced within 3-5 business days after design confirmation. Shipping time is additional depending on your location."
    },
    {
      "question": "What shipping methods do you offer?",
      "answer": "We ship via sea freight (FCL/LCL), air freight, and express courier (DHL, FedEx, UPS). We can work with your nominated forwarder or arrange shipping for you on FOB/CIF terms."
    },
    {
      "question": "What materials do you use?",
      "answer": "We use kraft paper and test liner in various grades (K=K, A=A, etc.) with fluting types A, B, C, E, AB, BC. We recommend the optimal material based on your product weight and shipping requirements."
    },
    {
      "question": "Can you print our logo on the boxes?",
      "answer": "Yes, we offer flexo printing (1-2 colors) and offset/full-color printing. Just provide your artwork files (AI, PDF, CDR format) and we will handle the rest."
    },
    {
      "question": "What are your payment terms?",
      "answer": "Standard payment terms are 30% deposit before production and 70% balance before shipment. T/T and L/C are accepted."
    }
  ]
}
```

Create `src/data_files/testimonials.json`:

```json
[
  {
    "quote": "Qianxi Packaging has been our reliable box supplier for 3 years. Consistent quality and on-time delivery every order.",
    "author": "Michael Chen",
    "company": "Global Imports Ltd.",
    "country": "🇺🇸 USA"
  },
  {
    "quote": "Very professional team. They helped us optimize our box design and saved us 15% on shipping costs. Highly recommended!",
    "author": "Sarah Müller",
    "company": "EuroPak Distribution",
    "country": "🇩🇪 Germany"
  },
  {
    "quote": "Fast response, excellent samples, and the final product exactly matched our specifications. Will order again.",
    "author": "Ahmed Al-Rashid",
    "company": "Gulf Pack Trading",
    "country": "🇦🇪 UAE"
  }
]
```

- [ ] **Step 6: Rewrite the homepage index.astro**

Replace `src/pages/index.astro` to compose the new sections. Use the existing Content Collection for products and the new JSON data files for testimonials and FAQs. Import translations via `getTranslations('en')`.

```astro
---
import MainLayout from '@/layouts/MainLayout.astro';
import HeroSection from '@components/sections/home/HeroSection.astro';
import WhyChooseUs from '@components/sections/home/WhyChooseUs.astro';
import ProductShowcase from '@components/sections/home/ProductShowcase.astro';
import FactorySnapshot from '@components/sections/home/FactorySnapshot.astro';
import CTASection from '@components/sections/home/CTASection.astro';
import TestimonialsCarousel from '@components/sections/home/TestimonialsCarousel.astro';
import FAQ from '@components/sections/misc/FAQ.astro';
import { getTranslations } from '@i18n/utils';
import faqs from '@data/faqs.json';

const t = getTranslations('en');
---

<MainLayout>
  <HeroSection t={t} />
  <WhyChooseUs t={t} />
  <ProductShowcase t={t} />
  <FactorySnapshot t={t} />
  <CTASection t={t} />
  <TestimonialsCarousel t={t} />
  <FAQ title={t.home.faqTitle} faqs={faqs.faqs} />
</MainLayout>
```

- [ ] **Step 7: Verify build and fix errors**

Run: `pnpm run build`
Fix any import errors or missing components.

- [ ] **Step 8: Commit**

```bash
git add src/components/sections/home/ src/pages/index.astro src/data_files/features.json src/data_files/faqs.json src/data_files/testimonials.json
git commit -m "feat: implement homepage with 7 new sections"
```

---

### Task 7: About Us Page

**Files:**
- Create: `src/components/sections/about/CompanyIntro.astro`
- Create: `src/components/sections/about/FactoryGallery.astro`
- Create: `src/components/sections/about/Certifications.astro`
- Create: `src/pages/about.astro`

- [ ] **Step 1: Write CompanyIntro component**

Two-column layout: left side has heading, paragraph, and 3 stat numbers (years, countries, capacity with placeholder values). Right side has ImagePlaceholder for factory exterior photo. Stats use configurable values from constants.

- [ ] **Step 2: Write FactoryGallery component**

3-column photo grid (workshop, warehouse, QC lab) using ImagePlaceholder components. Optional lightbox functionality can be a later enhancement.

- [ ] **Step 3: Write Certifications component**

4-column card grid: ISO 9001, FSC, SGS, REACH/CE. Each card has a placeholder badge area (dashed border square) + title + description.

- [ ] **Step 4: Create about.astro page**

Compose the three sections with a closing CTA banner linking to `/contact`. Import translations.

- [ ] **Step 5: Commit**

```bash
git add src/components/sections/about/ src/pages/about.astro
git commit -m "feat: implement About Us page"
```

---

### Task 8: Products — Content Collection and Pages

**Files:**
- Modify: `src/content.config.ts`
- Create: `src/content/products/en/item-3layer.md`
- Create: `src/content/products/en/item-5layer.md`
- Create: `src/content/products/en/item-heavyduty.md`
- Create: `src/content/products/en/item-customprint.md`
- Modify: `src/pages/products/index.astro`
- Modify: `src/pages/products/[id].astro`

- [ ] **Step 1: Simplify product content collection schema**

Edit `src/content.config.ts` — replace the `productsCollection` schema with a simplified version for corrugated boxes:

```typescript
const productsCollection = defineCollection({
  loader: glob({
    pattern: '**/[^_]*.{md,mdx}',
    base: './src/content/products',
  }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    category: z.string(),
    usage: z.string(),
    main: z.object({
      id: z.number(),
      content: z.string(),
      imgCard: z.string().optional(),
      imgMain: z.string().optional(),
      imgAlt: z.string(),
    }),
    specs: z.object({
      material: z.string(),
      fluteType: z.string(),
      burstStrength: z.string(),
      edgeCrush: z.string(),
      sizeRange: z.string(),
      moq: z.string(),
    }),
    applications: z.array(z.string()),
    customOptions: z.array(z.string()),
  }),
});
```

Note: `imgCard` and `imgMain` are now optional strings (paths) instead of required Astro image imports. This lets us use ImagePlaceholder until real photos exist.

- [ ] **Step 2: Create product markdown files**

Create 4 product entries in `src/content/products/en/`:

`item-3layer.md`:
```markdown
---
title: "3-Layer Corrugated Boxes"
description: "Lightweight single-wall boxes for e-commerce, shipping, and general packaging."
category: "3-Layer"
usage: "ecommerce"
main:
  id: 1
  content: "Standard single-wall boxes available in A, B, or C flute. Ideal for everyday shipping and e-commerce packaging needs."
  imgAlt: "Stack of 3-layer corrugated boxes"
specs:
  material: "Kraft / Test Liner"
  fluteType: "A / B / C Flute"
  burstStrength: "≥ 1200 kPa (ISO 2759)"
  edgeCrush: "≥ 4.5 kN/m (ISO 3037)"
  sizeRange: "Custom — any dimension"
  moq: "500 pcs"
applications:
  - "E-commerce parcel shipping"
  - "Moving and relocation boxes"
  - "Light product packaging"
  - "Document archive boxes"
customOptions:
  - "Custom dimensions (any size)"
  - "1-2 color flexo printing"
  - "Die-cut handles and vents"
  - "Water-resistant coating"
---
```

`item-5layer.md`, `item-heavyduty.md`, `item-customprint.md` — similar structure with appropriate specs for each product type.

- [ ] **Step 3: Rewrite products index page**

Rewrite `src/pages/products/index.astro` — sidebar with filter checkboxes (flute type + usage) on the left, 2-column product card grid on the right. Use the content collection to fetch products. Filters will be client-side JavaScript filtering (or Preline accordion behavior).

- [ ] **Step 4: Rewrite product detail page**

Rewrite `src/pages/products/[id].astro` — left image area (ImagePlaceholder for now) + right specs table + tabbed content (Specifications, Applications, Custom Options) + "Request Quote" CTA button linking to `/contact`.

- [ ] **Step 5: Commit**

```bash
git add src/content.config.ts src/content/products/ src/pages/products/
git commit -m "feat: implement Products content collection, list, and detail pages"
```

---

### Task 9: Contact & Inquiry Page

**Files:**
- Create: `src/components/sections/contact/InquiryForm.astro`
- Create: `src/components/sections/contact/ContactSidebar.astro`
- Create: `src/components/sections/contact/GoogleMapEmbed.astro`
- Modify: `src/pages/contact.astro`

- [ ] **Step 1: Write InquiryForm component**

Create `src/components/sections/contact/InquiryForm.astro` — a complete astro component with client-side validation script:

```astro
---
import type { SiteTranslations } from '@i18n/types';
const { t } = Astro.props;
interface Props { t: SiteTranslations; }
---
<div class="rounded-xl border border-gray-200 bg-white p-8">
  <h2 class="mb-1 text-2xl font-extrabold text-primary-900" style="font-family: var(--font-heading);">{t.contact.formTitle}</h2>
  <p class="mb-6 text-sm text-gray-600">{t.contact.formSubtitle}</p>

  <form id="inquiry-form" class="space-y-5" novalidate>
    <!-- Name -->
    <div>
      <label class="mb-1 block text-sm font-semibold text-gray-700">{t.contact.nameLabel}</label>
      <input type="text" name="name" required minlength="2"
        class="w-full rounded-lg border-gray-300 px-4 py-2.5 text-sm focus:border-primary-500 focus:ring-primary-500" />
      <span class="mt-1 hidden text-xs text-red-600" data-error="name">Please enter your name (min 2 characters).</span>
    </div>

    <!-- Email + Phone row -->
    <div class="grid gap-4 sm:grid-cols-2">
      <div>
        <label class="mb-1 block text-sm font-semibold text-gray-700">{t.contact.emailLabel}</label>
        <input type="email" name="email" required
          class="w-full rounded-lg border-gray-300 px-4 py-2.5 text-sm focus:border-primary-500 focus:ring-primary-500" />
        <span class="mt-1 hidden text-xs text-red-600" data-error="email">Please enter a valid email address.</span>
      </div>
      <div>
        <label class="mb-1 block text-sm font-semibold text-gray-700">{t.contact.phoneLabel}</label>
        <input type="tel" name="phone"
          class="w-full rounded-lg border-gray-300 px-4 py-2.5 text-sm focus:border-primary-500 focus:ring-primary-500" placeholder="+ country code" />
      </div>
    </div>

    <!-- Box Specifications heading -->
    <div class="border-t pt-5">
      <h3 class="mb-3 text-lg font-bold text-primary-800" style="font-family: var(--font-heading);">{t.contact.boxSpecs}</h3>
    </div>

    <!-- Dimensions -->
    <div class="grid gap-4 sm:grid-cols-3">
      <div>
        <label class="mb-1 block text-xs font-semibold text-gray-700">{t.contact.lengthLabel}</label>
        <input type="number" name="length" min="1" placeholder="mm"
          class="w-full rounded-lg border-gray-300 px-3 py-2 text-sm focus:border-primary-500 focus:ring-primary-500" />
      </div>
      <div>
        <label class="mb-1 block text-xs font-semibold text-gray-700">{t.contact.widthLabel}</label>
        <input type="number" name="width" min="1" placeholder="mm"
          class="w-full rounded-lg border-gray-300 px-3 py-2 text-sm focus:border-primary-500 focus:ring-primary-500" />
      </div>
      <div>
        <label class="mb-1 block text-xs font-semibold text-gray-700">{t.contact.heightLabel}</label>
        <input type="number" name="height" min="1" placeholder="mm"
          class="w-full rounded-lg border-gray-300 px-3 py-2 text-sm focus:border-primary-500 focus:ring-primary-500" />
      </div>
    </div>

    <!-- Material + Quantity row -->
    <div class="grid gap-4 sm:grid-cols-2">
      <div>
        <label class="mb-1 block text-xs font-semibold text-gray-700">{t.contact.materialLabel}</label>
        <select name="material" class="w-full rounded-lg border-gray-300 px-3 py-2 text-sm focus:border-primary-500 focus:ring-primary-500">
          <option value="">{t.contact.materialOption1}</option>
          <option value="K=K">{t.contact.materialOption2}</option>
          <option value="A=A">{t.contact.materialOption3}</option>
          <option value="not-sure">{t.contact.materialOption4}</option>
        </select>
      </div>
      <div>
        <label class="mb-1 block text-xs font-semibold text-gray-700">{t.contact.quantityLabel}</label>
        <select name="quantity" class="w-full rounded-lg border-gray-300 px-3 py-2 text-sm focus:border-primary-500 focus:ring-primary-500">
          <option value="500">{t.contact.qty500}</option>
          <option value="1000">{t.contact.qty1000}</option>
          <option value="5000">{t.contact.qty5000}</option>
          <option value="10000+">{t.contact.qty10000}</option>
        </select>
      </div>
    </div>

    <!-- Printing -->
    <fieldset>
      <legend class="mb-2 text-xs font-semibold text-gray-700">{t.contact.printLabel}</legend>
      <div class="flex flex-wrap gap-4">
        <label class="flex items-center gap-2 text-sm"><input type="radio" name="printing" value="none" checked class="text-accent-600 focus:ring-accent-500" /> {t.contact.printNone}</label>
        <label class="flex items-center gap-2 text-sm"><input type="radio" name="printing" value="flexo" class="text-accent-600 focus:ring-accent-500" /> {t.contact.printFlexo}</label>
        <label class="flex items-center gap-2 text-sm"><input type="radio" name="printing" value="offset" class="text-accent-600 focus:ring-accent-500" /> {t.contact.printOffset}</label>
      </div>
    </fieldset>

    <!-- Message -->
    <div>
      <label class="mb-1 block text-sm font-semibold text-gray-700">{t.contact.messageLabel}</label>
      <textarea name="message" rows="4" placeholder={t.contact.messagePlaceholder}
        class="w-full rounded-lg border-gray-300 px-4 py-2.5 text-sm focus:border-primary-500 focus:ring-primary-500"></textarea>
    </div>

    <!-- reCAPTCHA notice -->
    <p class="rounded-lg bg-gray-100 px-4 py-3 text-xs text-gray-500">{t.contact.recaptchaNotice}</p>

    <!-- Submit -->
    <button type="submit" class="w-full rounded-lg bg-accent-600 px-8 py-3.5 text-base font-semibold text-white transition hover:bg-accent-700">
      {t.contact.submitBtn} →
    </button>
  </form>

  <!-- Success message (hidden by default) -->
  <div id="form-success" class="hidden rounded-xl bg-green-50 p-8 text-center">
    <div class="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-3xl text-green-600">✓</div>
    <h3 class="text-xl font-bold text-green-800">{t.contact.successTitle}</h3>
    <p class="mt-2 text-green-700">{t.contact.successMessage}</p>
  </div>

  <!-- Error message (hidden by default) -->
  <div id="form-error" class="mt-4 hidden rounded-lg bg-red-50 p-4 text-sm text-red-700">{t.contact.errorMessage}</div>
</div>

<script>
  const form = document.getElementById('inquiry-form') as HTMLFormElement;
  const successEl = document.getElementById('form-success')!;
  const errorEl = document.getElementById('form-error')!;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    errorEl.classList.add('hidden');

    // Clear previous errors
    form.querySelectorAll('[data-error]').forEach(el => el.classList.add('hidden'));

    let valid = true;

    const nameInput = form.querySelector<HTMLInputElement>('[name="name"]')!;
    const emailInput = form.querySelector<HTMLInputElement>('[name="email"]')!;
    const lengthInput = form.querySelector<HTMLInputElement>('[name="length"]');
    const widthInput = form.querySelector<HTMLInputElement>('[name="width"]');
    const heightInput = form.querySelector<HTMLInputElement>('[name="height"]');

    if (!nameInput.value || nameInput.value.trim().length < 2) {
      form.querySelector('[data-error="name"]')?.classList.remove('hidden');
      valid = false;
    }

    if (!emailInput.value || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value)) {
      form.querySelector('[data-error="email"]')?.classList.remove('hidden');
      valid = false;
    }

    if (lengthInput && lengthInput.value && parseFloat(lengthInput.value) <= 0) valid = false;
    if (widthInput && widthInput.value && parseFloat(widthInput.value) <= 0) valid = false;
    if (heightInput && heightInput.value && parseFloat(heightInput.value) <= 0) valid = false;

    if (!valid) return;

    const apiUrl = (window as any).QIANXI_CONFIG?.apiUrl;
    if (!apiUrl) {
      // No backend configured — show success as demo
      form.classList.add('hidden');
      successEl.classList.remove('hidden');
      return;
    }

    try {
      const formData = new FormData(form);
      const res = await fetch(apiUrl, { method: 'POST', body: formData });
      if (res.ok) {
        form.classList.add('hidden');
        successEl.classList.remove('hidden');
      } else {
        errorEl.classList.remove('hidden');
      }
    } catch {
      errorEl.classList.remove('hidden');
    }
  });
</script>
```

- [ ] **Step 2: Write ContactSidebar component**

Create `src/components/sections/contact/ContactSidebar.astro` — two stacked cards: "Why Send an Inquiry?" (benefit list) and "Contact Information" (address, email, phone, WhatsApp from COMPANY constants).

- [ ] **Step 3: Write GoogleMapEmbed component**

Create `src/components/sections/contact/GoogleMapEmbed.astro` — an iframe embed using a configurable Google Maps URL. For now, use a placeholder div that can be swapped with a real embed when the API key is available.

- [ ] **Step 4: Rewrite contact.astro page**

Compose the InquiryForm, ContactSidebar, and GoogleMapEmbed in a two-column layout (form left, sidebar right). On mobile, sidebar stacks below form.

- [ ] **Step 5: Commit**

```bash
git add src/components/sections/contact/ src/pages/contact.astro
git commit -m "feat: implement Contact & Inquiry page with form validation"
```

---

### Task 10: Chinese (ZH) Pages

**Files:**
- Create: `src/pages/zh/index.astro`
- Create: `src/pages/zh/about.astro`
- Create: `src/pages/zh/products/index.astro`
- Create: `src/pages/zh/products/[id].astro`
- Create: `src/pages/zh/contact.astro`
- Create: `src/content/products/zh/` (4 product markdown files with Chinese content)

- [ ] **Step 1: Create ZH homepage**

Copy the structure from `src/pages/index.astro` but use `getTranslations('zh')`. Pass `lang="zh"` to MainLayout.

- [ ] **Step 2: Create ZH About, Products, Contact pages**

Same pattern — each ZH page mirrors the EN page structure but uses Chinese translations and passes `lang="zh"`.

- [ ] **Step 3: Create ZH product markdown files**

Create `src/content/products/zh/` with 4 product files — same frontmatter structure but Chinese text for title, description, content, specs, applications, and custom options.

- [ ] **Step 4: Update 404 page**

Edit `src/pages/404.astro` — update the EN text to match Qianxi branding, add ZH fallback text.

- [ ] **Step 5: Commit**

```bash
git add src/pages/zh/ src/content/products/zh/ src/pages/404.astro
git commit -m "feat: add Chinese (ZH) pages for all routes"
```

---

### Task 11: Astro Config Cleanup and SEO

**Files:**
- Modify: `astro.config.mjs`

- [ ] **Step 1: Remove Starlight integration, update sitemap for EN+ZH**

Edit `astro.config.mjs`:

Remove the entire `starlight(...)` block from the `integrations` array. Remove the `import starlight from '@astrojs/starlight'` line and the `import mdx from '@astrojs/mdx'` line.

Update the sitemap config to use `en` and `zh` locales instead of `en` and `fr`.

Keep the site URL as `https://asaberui1.github.io` and base as `/Qianxi-Packaging`.

Remove the `@astrojs/starlight` and `@astrojs/mdx` entries from package.json dependencies (or keep — they're not used but don't hurt; prefer to remove from astro config only).

- [ ] **Step 2: Verify build**

Run: `pnpm run build`
Expected: Build succeeds with no Starlight errors.

- [ ] **Step 3: Commit**

```bash
git add astro.config.mjs
git commit -m "chore: remove Starlight integration, update sitemap for EN+ZH"
```

---

### Task 12: Footer Section

**Files:**
- Modify: `src/components/sections/navbar&footer/FooterSection.astro`

- [ ] **Step 1: Rewrite FooterSection**

Replace the footer with a 5-column layout matching the design spec:

Column 1 (wider): Brand logo + tagline
Column 2: Quick Links
Column 3: Products
Column 4: Support
Column 5: Newsletter signup

Bottom bar: Copyright (dynamic year) + Privacy Policy + Terms.
Social icons: Instagram, Facebook, LinkedIn, WhatsApp using the existing icon components.

Update colors from yellow/orange/neutral to primary/accent/gray. Remove dark mode classes.

- [ ] **Step 2: Commit**

```bash
git add src/components/sections/navbar&footer/FooterSection.astro
git commit -m "feat: rewrite Footer with 5-column Qianxi layout"
```

---

### Task 13: Final Cleanup — Remove Unused Template References

**Files:**
- Various cleanup across modified files

- [ ] **Step 1: Remove remaining yellow/orange references**

Search for remaining `text-yellow-` and `bg-yellow-` classes in modified files. Replace with appropriate `text-accent-` or `bg-accent-` values.

Run: `grep -r "yellow-" src/components/sections/home/ src/components/sections/about/ src/components/sections/contact/ src/pages/ src/layouts/`

Fix any remaining occurrences.

- [ ] **Step 2: Verify all placeholder icons reference**

Ensure all pages use ImagePlaceholder for images (no broken image imports from the original template).

- [ ] **Step 3: Add window.QIANXI_CONFIG global**

Create or update the global config injection. Add a `<script>` tag in MainLayout:

```html
<script>
  window.QIANXI_CONFIG = {
    apiUrl: '',
    recaptchaSiteKey: '',
    googleMapsApiKey: '',
  };
</script>
```

- [ ] **Step 4: Full build and verify**

Run: `pnpm run build`
Expected: Clean build with no errors. All 6 deployed pages generate correctly. Reserved pages are not in the output.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "chore: final cleanup, remove template color references, add global config"
```

---

### Task 14: Polish — SVG Icons for Features

**Files:**
- Modify: `src/components/ui/icons/icons.ts` — add new icons
- Modify: `src/components/sections/home/WhyChooseUs.astro` — use Icon component
- Modify: `src/components/sections/home/HeroSection.astro` — use Icon component

- [ ] **Step 1: Add custom icons for Qianxi selling points**

Add new icon entries to `icons.ts` for: `factory`, `sample`, `equipment`, `support`. Use Material Symbols or simple SVGs for each concept.

- [ ] **Step 2: Replace emoji placeholders in Homepage sections**

Replace the emoji characters in HeroSection trust cards and WhyChooseUs cards with proper `Icon` components using the new icons.

- [ ] **Step 3: Commit**

```bash
git add src/components/ui/icons/icons.ts src/components/sections/home/
git commit -m "feat: add custom SVG icons for Qianxi feature sections"
```

---

## Summary

**Total tasks:** 14
**Files created:** ~20
**Files modified:** ~15
**Files deleted:** 0 (all reserved code preserved)

**Build verification checkpoints:**
- After Task 1: Colors compile
- After Task 6: Homepage renders
- After Task 9: Contact form works
- After Task 10: All pages exist in EN+ZH
- After Task 13: Clean production build
