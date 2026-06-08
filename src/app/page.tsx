"use client";
import { useEffect, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PhoneHero } from "@/components/sections/movira/PhoneHero";
import { ConnectedSection } from "@/components/sections/movira/ConnectedSection";
import { SplitSection, Surface } from "@/components/sections/movira/SplitSection";
import { ContainerSection } from "@/components/sections/movira/ContainerSection";
import { GigSection } from "@/components/sections/movira/GigSection";
import { EcosystemGrid, EcosystemItem } from "@/components/sections/movira/EcosystemGrid";
import type { SafariScreenKey } from "@/components/sections/movira/FramedScreens";
import { ModuleFlow } from "@/components/sections/movira/ModuleFlow";
import { TechStackSection } from "@/components/sections/movira/TechStackSection";
import { MoviraCTA } from "@/components/sections/movira/MoviraCTA";
import { montserrat } from "@/components/sections/movira/shared";
import { posterDataUri } from "@/lib/placeholder";

gsap.registerPlugin(ScrollTrigger);

const WHITE = "#FFFFFF";
const GRAY = "#F4F4F5"; // gris suave para diferenciar secciones alternas

// ─── Placeholder posters (se ven dentro de los mockups hasta tener los .mp4) ──
const P = {
  driver: posterDataUri({ label: "App Conductores", vertical: true }),
  driverOferta: posterDataUri({ label: "Oferta en vivo", vertical: true }),
  dashboardOrden: posterDataUri({ label: "Crear orden" }),
  dashboardTracking: posterDataUri({ label: "Tracking en vivo" }),
  web: posterDataUri({ label: "movira.com.co" }),
  cotizadorIa: posterDataUri({ label: "Cotizador IA" }),
  despachos: posterDataUri({ label: "Despachos públicos" }),
  admin: posterDataUri({ label: "Admin Movira" }),
};

// ─── La historia en 10 secciones — editar aquí = cambiar la historia ─────────
type Slide =
  | { kind: "phoneHero"; id: string; text: string; bg: string; video: string; poster: string }
  | { kind: "connected"; id: string; text: string; bg: string; appVideo: string; appPoster: string; webVideo: string; webPoster: string; url?: string }
  | { kind: "container"; id: string; text: string; bg: string; video: string; poster: string }
  | { kind: "gig"; id: string; text: string; bg: string; video: string; poster: string; url?: string; screen?: SafariScreenKey }
  | { kind: "split"; id: string; text: string; bg: string; left: Surface; right: Surface }
  | { kind: "ecosystem"; id: string; text: string; bg: string; items: EcosystemItem[] }
  | { kind: "moduleflow"; id: string; text: string; bg: string }
  | { kind: "techstack"; id: string; text: string; bg: string }
  | { kind: "cta"; id: string; text: string; video: string; poster: string; url?: string };

const SLIDES: Slide[] = [
  // 1 — Hero: la app de conductores (Android)
  { kind: "phoneHero", id: "mv-1", bg: WHITE, text: "Todo empezó con una app", video: "/videos/driver.mp4", poster: P.driver },

  // 2 — Móvil ↔ Web conectados en tiempo real (haz animado)
  {
    kind: "connected", id: "mv-2", bg: GRAY, text: "Conectada en tiempo real", url: "empresas.movira.com.co",
    appVideo: "/videos/driver-oferta.mp4", appPoster: P.driverOferta,
    webVideo: "/videos/dashboard-orden.mp4", webPoster: P.dashboardOrden,
  },

  // 3 — Dashboard modular: un módulo por servicio (arrastrables)
  { kind: "container", id: "mv-3", bg: WHITE, text: "Un módulo para cada servicio", video: "/videos/dashboard-tracking.mp4", poster: P.dashboardTracking },

  // 4 — Web pública SEO (Safari)
  { kind: "gig", id: "mv-4", bg: GRAY, text: "Una web que trae clientes", url: "movira.com.co", video: "/videos/web.mp4", poster: P.web, screen: "web" },

  // 5 — Motor de precios con IA (Safari)
  { kind: "gig", id: "mv-5", bg: WHITE, text: "Precios dinámicos con IA", url: "despachos.movira.com.co", video: "/videos/cotizador-ia.mp4", poster: P.cotizadorIa, screen: "ia" },

  // 6 — Despachos públicos + Admin (dos Safari)
  {
    kind: "split", id: "mv-6", bg: GRAY, text: "Del cliente al conductor, sin fricción",
    left: { kind: "safari", url: "despachos.movira.com.co", video: "/videos/despachos.mp4", poster: P.despachos, screen: "despachos" },
    right: { kind: "safari", url: "admin.movira.com.co", video: "/videos/admin.mp4", poster: P.admin, screen: "admin" },
  },

  // 7 — El ecosistema completo
  {
    kind: "ecosystem", id: "mv-7", bg: WHITE, text: "",
    items: [
      { id: "eco-driver", kind: "android", label: "App Conductores", video: "/videos/driver.mp4", poster: P.driver },
      { id: "eco-dashboard", kind: "safari", label: "Dashboard Empresas", url: "empresas.movira.com.co", video: "/videos/dashboard-tracking.mp4", poster: P.dashboardTracking, screen: "dashboard" },
      { id: "eco-web", kind: "safari", label: "Web Pública", url: "movira.com.co", video: "/videos/web.mp4", poster: P.web, screen: "web" },
      { id: "eco-ia", kind: "safari", label: "Motor de Precios IA", url: "despachos.movira.com.co", video: "/videos/cotizador-ia.mp4", poster: P.cotizadorIa, screen: "ia" },
      { id: "eco-despachos", kind: "safari", label: "Despachos", url: "despachos.movira.com.co", video: "/videos/despachos.mp4", poster: P.despachos, screen: "despachos" },
      { id: "eco-admin", kind: "safari", label: "Admin", url: "admin.movira.com.co", video: "/videos/admin.mp4", poster: P.admin, screen: "admin" },
    ],
  },

  // 8 — Cómo se conecta el ecosistema (interactivo, draggable)
  { kind: "moduleflow", id: "mv-8", bg: GRAY, text: "Así se conecta todo" },

  // 9 — Lo que ya tenemos (file-tree + stats)
  { kind: "techstack", id: "mv-9", bg: WHITE, text: "Lo que ya está en producción" },

  // 10 — CTA final
  { kind: "cta", id: "mv-11", text: "La infraestructura logística de Colombia", url: "empresas.movira.com.co", video: "/videos/dashboard-tracking.mp4", poster: P.dashboardTracking },
];

const ALL_IDS = SLIDES.map((s) => s.id);

function renderSlide(slide: Slide, zIndex: number) {
  switch (slide.kind) {
    case "phoneHero":
      return <PhoneHero key={slide.id} {...slide} zIndex={zIndex} />;
    case "connected":
      return <ConnectedSection key={slide.id} {...slide} zIndex={zIndex} />;
    case "container":
      return <ContainerSection key={slide.id} {...slide} zIndex={zIndex} />;
    case "gig":
      return <GigSection key={slide.id} {...slide} zIndex={zIndex} />;
    case "split":
      return <SplitSection key={slide.id} {...slide} zIndex={zIndex} />;
    case "ecosystem":
      return <EcosystemGrid key={slide.id} {...slide} zIndex={zIndex} />;
    case "moduleflow":
      return <ModuleFlow key={slide.id} {...slide} zIndex={zIndex} />;
    case "techstack":
      return <TechStackSection key={slide.id} {...slide} zIndex={zIndex} />;
    case "cta":
      return <MoviraCTA key={slide.id} {...slide} zIndex={zIndex} />;
  }
}

export default function MoviraPage() {
  const scrollToNext = useCallback(() => {
    const scrollY = window.scrollY;
    for (const id of ALL_IDS) {
      const el = document.getElementById(id);
      if (!el) continue;
      const top = el.getBoundingClientRect().top + scrollY;
      if (top > scrollY + 10) {
        window.scrollTo({ top, behavior: "smooth" });
        return;
      }
    }
  }, []);

  useEffect(() => {
    ScrollTrigger.refresh();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "q" || e.key === "Q") scrollToNext();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [scrollToNext]);

  return (
    <main className={montserrat.className}>
      {SLIDES.map((slide, i) => renderSlide(slide, i + 1))}
    </main>
  );
}
