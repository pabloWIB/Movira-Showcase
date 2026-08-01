# Movira-Showcase

Scroll-driven product showcase for the Movira logistics platform: driver app, company dashboard, AI pricing and public dispatch board, presented as one narrative.

[![Hire me on Fiverr](https://img.shields.io/badge/Hire%20me%20on-Fiverr-1DBF73?style=for-the-badge&logo=fiverr&logoColor=white)](https://www.fiverr.com/pablonietop)

[![Live demo](https://img.shields.io/badge/demo-movirashowcasekkrd.wib.digital-2ea44f)](https://movirashowcasekkrd.wib.digital)
[![Next.js](https://img.shields.io/badge/Next.js-16.1.6-000000)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-3178c6)](https://www.typescriptlang.org)

## Description

Movira is not one product — it is a driver app, a dashboard for companies, an AI quoting tool and a public dispatch board. A slide deck showing them one at a time never conveys that they are the same system. This page tells it as a single scroll: the story starts with the driver app and widens out until the whole ecosystem is on screen.

The page is driven by one declarative array. Each entry in `SLIDES` names a `kind` — `phoneHero`, `connected`, `container`, `gig`, `ecosystem`, `moduleflow`, `techstack` — and the renderer maps that to a section component. Adding a beat to the story means adding an object, not writing a component.

Every product screen is **built in JSX, not captured**: `FramedScreens.tsx` hand-renders the driver app, the company dashboard, the public site, the AI quoter, the dispatch wizard and the admin panel, and each one is mounted inside an Android or Safari device shell. Nothing on the page depends on a screenshot, a video file or a remote asset.

## Features

- Single scroll narrative built from a typed `SLIDES` array; section components are selected by `kind`, so an entry with an unhandled `kind` fails at compile time.
- Six product screens rendered as live JSX inside Android and Safari device frames.
- GSAP with `ScrollTrigger` for scroll-bound entrances, plus Lenis for smooth scrolling.
- Draggable module and ecosystem diagrams, with static grid fallbacks at narrow widths.
- Honours `prefers-reduced-motion`: the Lenis wrapper is skipped and CSS animation is cut.

## Tech stack

| Layer | Technology | Version | Role in project |
|---|---|---|---|
| Framework | Next.js | 16.1.6 | App Router, single route |
| UI library | React | 19.2.3 | Components |
| Language | TypeScript | 5.9.3 | Application source |
| Styling | Tailwind CSS | 4.1.18 | CSS-first config via `@theme` in `globals.css` |
| Scroll animation | GSAP + ScrollTrigger | 3.14.2 | Scroll-bound section entrances |
| Smooth scroll | Lenis | 1.3.23 | Scroll damping |
| Motion | motion | 12.40.0 | Drag and in-view animation in `ContainerSection` |
| Primitives | `@radix-ui/react-*` | accordion 1.2, scroll-area 1.2, slot 1.2 | Accessible base for the file tree |
| Icons | lucide-react | 0.564.0 | Icon set |
| Annotation | rough-notation | 0.5.1 | Hand-drawn text highlight |
| Generator | shadcn | 3.8.4 | Component scaffolding (`components.json`) |

Tailwind v4 takes its configuration from `@theme` inside `src/app/globals.css`. There is no `tailwind.config.ts`.

## Prerequisites

- Node.js `>=20.9.0` — required by `next@16.1.6`
- npm 10 or newer

## Installation

```bash
git clone https://github.com/pabloWIB/Movira-Showcase.git
cd Movira-Showcase
npm install
npm run dev
```

Open `http://localhost:3000`. No environment variables are required, and the project makes no network calls at runtime.

## Usage

The story is one array in `src/app/page.tsx`. A slide is an object whose `kind` selects the section component:

```tsx
const SLIDES: Slide[] = [
  { kind: "phoneHero", id: "mv-1", bg: WHITE,
    text: "Todo empezó con una app" },

  { kind: "gig", id: "mv-4", bg: WHITE,
    text: "Precios dinámicos con IA",
    url: "despachos.movira.com.co", screen: "ia" },
]
```

Reorder the array to reorder the page. The `Slide` union type is declared directly above it.

The `screen` key on a `gig` or `ecosystem` entry picks which hand-built screen the Safari frame renders, from the `SAFARI_SCREENS` map in `FramedScreens.tsx`:

```tsx
export type SafariScreenKey = "dashboard" | "web" | "ia" | "despachos" | "admin"
```

To change what a frame shows, edit that screen component. To add a new one, add it to `SAFARI_SCREENS` and the key becomes available to the slide array.

## Project structure

```
src/
├── app/
│   ├── page.tsx                     # SLIDES array + renderer
│   ├── layout.tsx                   # Root layout, metadata, JSON-LD, footer
│   ├── not-found.tsx                # 404 with a link back to the story
│   ├── robots.ts                    # Generated /robots.txt
│   ├── sitemap.ts                   # Generated /sitemap.xml
│   ├── globals.css                  # Tailwind v4 @theme tokens, base, Lenis handshake
│   ├── favicon.ico / icon.png / apple-icon.png
├── components/
│   ├── sections/movira/
│   │   ├── PhoneHero.tsx            # Opening, vertical device + scroll cue
│   │   ├── ConnectedSection.tsx     # App and dashboard joined by animated beams
│   │   ├── ContainerSection.tsx     # Draggable module cards
│   │   ├── GigSection.tsx           # Framed screen with a URL bar
│   │   ├── EcosystemGrid.tsx        # All six products at once
│   │   ├── ModuleFlow.tsx           # Module diagram, grid below `lg`
│   │   ├── TechStackSection.tsx     # Repo tree + counters
│   │   ├── FramedScreens.tsx        # The six hand-built product screens
│   │   └── shared.tsx               # Tokens, device frames, entrance hook
│   ├── ui/                          # android, safari, animated-beam, file-tree,
│   │                                # number-ticker, highlighter, button, scroll-area
│   ├── SmoothScrolling.tsx          # Lenis wrapper, reduced-motion aware
│   └── SiteFooter.tsx               # Attribution footer
└── lib/
    ├── site.ts                      # Canonical URL, title, description
    └── utils.ts                     # cn()
docs/
├── auditoria.md                     # Audit of the pre-cleanup state
└── cambios.md                       # Change log by phase
```

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Dev server on `http://localhost:3000` |
| `npm run build` | Production build |
| `npm start` | Serves the production build |
| `npm run lint` | ESLint via `eslint-config-next` |

## Deployment

Deployed on Vercel at [movirashowcasekkrd.wib.digital](https://movirashowcasekkrd.wib.digital). The whole route is statically prerendered, there are no environment variables and no server-side data fetching.

The canonical URL lives in `src/lib/site.ts` and feeds the `<link rel="canonical">`, the Open Graph tags, `robots.txt` and `sitemap.xml`. Change it there if the domain changes.

## Author

**Pablo Nieto Pérez** — [wib.digital](https://wib.digital)
GitHub: [@pabloWIB](https://github.com/pabloWIB)

---

## Hire me

I build **custom internal tools, CRMs and dashboards** for small teams, and
**conversion-focused websites** for businesses.

- [Custom internal tool, CRM or dashboard](https://www.fiverr.com/pablonietop/build-a-custom-internal-app-for-your-business) — from $45
- [Conversion-focused website](https://www.fiverr.com/pablonietop/convert-your-landing-page-design-to-code) — from $80
- [All my services on Fiverr](https://www.fiverr.com/pablonietop)
- [wib.digital](https://wib.digital)
