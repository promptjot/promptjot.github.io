# PromptJot | Free Local AI Prompt Library & Organizer

> **A 100% client-side, zero-server AI prompt management tool built with Astro, React Islands, and Tailwind CSS.** Save, tag, search, and copy AI prompts instantly with absolute privacy.

[![Live Site](https://img.shields.io/badge/Live-promptjot.github.io-2A7C13?style=for-the-badge&logo=github)](https://promptjot.github.io)
[![License: MIT](https://img.shields.io/badge/License-MIT-76C457.svg?style=for-the-badge)](LICENSE)
[![Support Developer](https://img.shields.io/badge/Support-Buy%20Me%20A%20Coffee-FBE6C2?style=for-the-badge&logo=buy-me-a-coffee&logoColor=2A7C13)](https://buymeacoffee.com/kisharadilz)

---

## ⚡ Architectural Highlights

- **Static Site Generation (SSG)**: Built on [Astro 5](https://astro.build) for sub-second initial paint times, zero layout shifts, and search-engine indexable static HTML.
- **React Islands Architecture**: Dynamic client-side features (instant search, tag aggregation, prompt CRUD, modal interactions, clipboard transitions, confetti feedback) hydrate in isolation via `<PromptManager client:load />`.
- **Zero-Server Privacy Guarantee**: 100% client-side storage engine using HTML5 `localStorage`. No user prompts, API keys, or proprietary workflows are ever sent to remote cloud databases or third-party servers.
- **Custom Organic Palette**:
  - Primary: `#2A7C13` (Forest Green)
  - Accent: `#76C457` (Leaf Green)
  - Canvas Background: `#FFF8CF` (Butter Cream)
  - Surface & Border: `#FBE6C2` (Warm Sand)
  - Seamless Light/Dark mode toggling with zero flash of unstyled theme (FOUC).
- **Mobile & Tablet Optimized**: Clean, minimalist, icon-driven header navigation on mobile and tablet devices with quick-access controls for language, theme, and developer support.
- **Internationalization (i18n)**: Static localized subpath routing for 6 major languages:
  - English (`/`)
  - Español (`/es/`)
  - Português (`/pt/`)
  - Deutsch (`/de/`)
  - Français (`/fr/`)
  - 日本語 (`/ja/`)

---

## 🔍 World-Class SEO & Topical Authority Architecture

PromptJot is architected to achieve a **100% SEO score** across Technical, Semantic, and Schema standards:

### 1. Interconnected Schema.org Knowledge Graph (`@graph`)
A single unified JSON-LD script links all structural entities for Google's Knowledge Graph:
- **`WebSite`**: Configured with deep-linked `SearchAction` (`/?q={search_term_string}`).
- **`Organization`**: Brand identity with official logo, GitHub repository, and founder links.
- **`WebApplication` & `SoftwareApplication`**: Category: `UtilitiesApplication`, `offers.price: "0"`, browser-based operating system, and feature lists.
- **`BreadcrumbList`**: Structured root hierarchy for clean breadcrumb presentation in SERPs.
- **`FAQPage`**: 6 pre-rendered Q&As matching on-page FAQs to qualify for expandable accordion rich snippets.
- **`HowTo`**: 4-step workflow schema matching the numbered step-by-step guide.

### 2. Search Engine Directives & Meta Optimization
- **Crawl Directives**: `robots`, `googlebot`, and `bingbot` set to `index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1`.
- **Title Tag**: Exactly 59 characters, keyword-dense for maximum SERP click-through rate without truncation.
- **Meta Description**: Exactly 158 characters with clear value propositions (ChatGPT, Claude, Midjourney, 100% private, offline).
- **Hreflang & Canonicals**: Bi-directional canonical URLs and `hreflang` links across all 6 locales with `x-default`.
- **Sitemap & Robots**: Full `public/sitemap.xml` with `<priority>1.0</priority>` on root domain and clean `public/robots.txt`.

### 3. Static Topical Authority Sections (SSG)
- **Feature Pillars**: Detailed breakdown of local-first security, sub-millisecond execution, and JSON portability.
- **Workflow Guide (`<ol>`)**: Step-by-step instructions matching the `HowTo` schema.
- **Comparison Table (`<table>`)**: Side-by-side comparison of PromptJot vs traditional Cloud SaaS prompt managers.
- **AI Model Compatibility Hub**: Semantic keyword signals covering OpenAI ChatGPT (GPT-4o, o1), Anthropic Claude (Claude 3.5 Sonnet), Midjourney v6 / Flux.1, Google Gemini 1.5, DeepSeek (R1, V3), and Cursor / Copilot.
- **Native FAQ Accordion (`<details>/<summary>`)**: Crawlable HTML questions and answers reflecting the `FAQPage` schema.

### 4. Core Web Vitals & Analytics
- Preconnect and DNS-prefetch tags for Google Fonts (`fonts.googleapis.com` & `fonts.gstatic.com`) with `display=swap`.
- WCAG AAA color contrast compliance (> 7.5:1 ratio between text and canvas).
- Clean Google tag (`gtag.js` `G-7QEDD333WQ`) integration in `<head>` using Astro's `is:inline`.

---

## 🚀 Key Functional Capabilities

### 1. Prompt Management Engine
- **Full CRUD**: Create, edit, tag, categorize, and delete AI prompts.
- **1-Click Copy**: Instant clipboard copy button with visual state transition (`Copied!`), counter increments, and subtle confetti blast.
- **Variable Syntax Support**: Highlights placeholders like `{{VARIABLE}}` or `[VARIABLE]` within prompt templates for quick fill-ins.
- **Pin to Top**: Pin priority or daily-driver prompts to the top of your library.

### 2. Search & Tag Discovery
- **Sub-millisecond Search**: Real-time filtering across titles, prompt content, descriptions, and `#tags`.
- **Dynamic Tag Aggregation**: Live tag ribbon calculating tag counts automatically with 1-click active tag filtering.
- **Flexible Sorting**: Sort by *Newest First*, *Oldest First*, *Alphabetical (A-Z)*, or *Most Used (Copies)*.
- **View Modes**: Toggle between multi-column card grid and compact list.

### 3. Absolute Data Portability
- **JSON Backup Export**: Download your entire prompt vault anytime as `promptjot-backup-YYYY-MM-DD.json`.
- **Safe JSON Import**: Restore backups with the option to either *Merge* (de-duplicating by title) or *Replace* all existing prompts.
- **Starter Templates**: Pre-loaded with curated, battle-tested system prompts for code review, copywriting, Midjourney v6 photorealism, SQL optimization, and first-principles strategy.

---

## ⌨️ Keyboard Shortcuts

| Shortcut | Action |
| :--- | :--- |
| <kbd>/</kbd> or <kbd>Ctrl</kbd> + <kbd>K</kbd> | Focus instant search bar |
| <kbd>N</kbd> | Open New Prompt modal |
| <kbd>Esc</kbd> | Close modal / Clear filters |

---

## 🛠️ Local Development

### Prerequisites
- Node.js `v20+` or `v22+` (Tested on `v24.19.0`)
- npm `v10+`

### Installation
```bash
# Clone the repository
git clone https://github.com/promptjot/promptjot.github.io.git
cd promptjot.github.io

# Install dependencies
npm install

# Start development server
npm run dev
```

### Production Build & Preview
```bash
# Generate static HTML across all locales and output to /dist
npm run build

# Preview production build locally
npm run preview
```

---

## 🌐 Deployment to GitHub Pages

This repository is configured for automated root-domain deployment to GitHub Pages via GitHub Actions:
- Push to the `main` branch triggers `.github/workflows/deploy.yml`.
- Site builds statically and deploys directly to `https://promptjot.github.io`.

---

## ☕ Support the Developer

If PromptJot accelerates your AI productivity and keeps your prompt vault organized, consider supporting ongoing development:

👉 **[buymeacoffee.com/kisharadilz](https://buymeacoffee.com/kisharadilz)**

---

## 📄 License

Released under the [MIT License](LICENSE).
