# Goal Description

Build a Next.js 14 App Router website for "Sensasi Geprek 38", a restaurant in Semarang. The project requires strict adherence to `AGENTS.md` guidelines, utilizing TypeScript, Tailwind CSS, shadcn/ui, and `next-sitemap` for SEO.

The website will include a dynamic real-time "Open/Closed" status, a floating WhatsApp button, an animated scroll wrapper, and four main pages (Home, Menu, About, Contact). Content will be strictly based on the provided real data and Markdown file.

## User Review Required

> [!IMPORTANT]
> The current working directory (`d:\upwork\Sensasi Geprek`) already contains files (`AGENTS.md`, `Public/`, `content/`). 
> Since `create-next-app` typically requires an empty directory to initialize in the current folder (`.`), my plan is to generate the Next.js app in a temporary folder `temp-app` and then copy its files over to the root workspace. I will also rename the `Public` folder to `public` to comply with Next.js standards.

> [!NOTE]
> I will use `generate_image` to create the placeholder `og-image.jpg` as requested, or place a simple placeholder if it fails.

## Open Questions

None at this moment. The requirements and constraints provided are extremely detailed and actionable.

## Proposed Changes

---

### Project Initialization & Setup
- Run `npx create-next-app@14 temp-app ...` and move contents to root.
- Install dependencies: `next-sitemap`, `lucide-react`, `clsx`, `tailwind-merge` (for shadcn).
- Initialize shadcn/ui using `npx shadcn-ui@latest init` and add required components (Button, Card, Badge, Tabs, etc.).
- Update `package.json` to include `"postbuild": "next-sitemap"`.
- Rename `Public` to `public` and create `public/menu/`.

#### [NEW] .env.example
#### [NEW] next-sitemap.config.js

---

### Data & Types
Create the strictly defined constants and types based on user instructions.

#### [NEW] src/lib/constants.ts
- Static configuration: `RESTAURANT`, `HOURS`, `SEO`.

#### [NEW] src/types/menu.ts
- Interfaces: `MenuItem`, `MenuCategory`, `MenuData`.

#### [NEW] src/data/menu.json
- Placeholder menu data.

---

### Reusable UI Components
Develop custom React components marked with `'use client'` where appropriate.

#### [NEW] src/components/ui/FloatingWhatsApp.tsx
- Fixed WhatsApp button with pulse animation.

#### [NEW] src/components/ui/OpenStatus.tsx
- Real-time WIB (UTC+7) open/closed logic.

#### [NEW] src/components/ui/MenuCard.tsx
- Standardized UI for menu items.

#### [NEW] src/components/ui/ScrollAnimation.tsx
- Intersection Observer based fade+slide up wrapper.

---

### Layout Components
Develop site-wide layouts.

#### [NEW] src/components/layout/Navbar.tsx
- Sticky navbar with mobile hamburger menu.

#### [NEW] src/components/layout/Footer.tsx
- Footer with quick links and scroll-to-top button.

---

### Pages & SEO
Implement the main application pages and global layouts.

#### [MODIFY] src/app/layout.tsx
- Global metadata configuration.
- JSON-LD Structured Data for `Restaurant`.

#### [MODIFY] src/app/page.tsx
- Home page with Hero, Feature Cards, Menu Preview, and CTA sections.

#### [NEW] src/app/menu/page.tsx
- Grid layout displaying categories and `MenuCard`s.

#### [NEW] src/app/about/page.tsx
- Parses `content/about.md` and displays the owner card and timeline.

#### [NEW] src/app/contact/page.tsx
- Displays interactive Hours, Location (Google Maps iframe), and WhatsApp CTA.

## Verification Plan

### Automated Tests
- Run `npm run lint` and TypeScript compilation (`npm run build`).
- Verify `.env.example` existence and configuration.

### Manual Verification
- Deploy locally using `npm run dev` to verify responsive design and animations.
- Test `OpenStatus.tsx` logic by mocking times.
- Ensure Mobile Navigation works.
- Verify `AGENTS.md` rules (Path headers, JSDoc comments) are followed in every new file.
