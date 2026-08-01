"use client";
import { useEffect, useCallback } from "react";
import { useLenis } from "lenis/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PhoneHero } from "@/components/sections/movira/PhoneHero";
import { ConnectedSection } from "@/components/sections/movira/ConnectedSection";
import { ContainerSection } from "@/components/sections/movira/ContainerSection";
import { GigSection } from "@/components/sections/movira/GigSection";
import { EcosystemGrid, EcosystemItem } from "@/components/sections/movira/EcosystemGrid";
import type { SafariScreenKey } from "@/components/sections/movira/FramedScreens";
import { ModuleFlow } from "@/components/sections/movira/ModuleFlow";
import { TechStackSection } from "@/components/sections/movira/TechStackSection";
import { montserrat } from "@/components/sections/movira/shared";

gsap.registerPlugin(ScrollTrigger);

const WHITE = "#FFFFFF";
const GRAY = "#F4F4F5";

type Slide =
  | { kind: "phoneHero"; id: string; text: string; bg: string }
  | { kind: "connected"; id: string; text: string; bg: string; url?: string }
  | { kind: "container"; id: string; text: string; bg: string }
  | { kind: "gig"; id: string; text: string; bg: string; screen: SafariScreenKey; url?: string }
  | { kind: "ecosystem"; id: string; text: string; bg: string; items: EcosystemItem[] }
  | { kind: "moduleflow"; id: string; text: string; bg: string }
  | { kind: "techstack"; id: string; text: string; bg: string };

const SLIDES: Slide[] = [
  { kind: "phoneHero", id: "mv-1", bg: WHITE, text: "Todo empezó con una app" },

  { kind: "connected", id: "mv-2", bg: GRAY, text: "Conectada en tiempo real", url: "empresas.movira.com.co" },

  { kind: "container", id: "mv-3", bg: WHITE, text: "Un módulo para cada servicio" },

  { kind: "gig", id: "mv-4", bg: WHITE, text: "Precios dinámicos con IA", url: "despachos.movira.com.co", screen: "ia" },

  {
    kind: "ecosystem", id: "mv-5", bg: WHITE, text: "Seis productos, una plataforma",
    items: [
      { id: "eco-driver", kind: "android", label: "App Conductores" },
      { id: "eco-dashboard", kind: "safari", label: "Dashboard Empresas", url: "empresas.movira.com.co", screen: "dashboard" },
      { id: "eco-web", kind: "safari", label: "Web Pública", url: "movira.com.co", screen: "web" },
      { id: "eco-ia", kind: "safari", label: "Motor de Precios IA", url: "despachos.movira.com.co", screen: "ia" },
      { id: "eco-despachos", kind: "safari", label: "Despachos", url: "despachos.movira.com.co", screen: "despachos" },
      { id: "eco-admin", kind: "safari", label: "Admin", url: "admin.movira.com.co", screen: "admin" },
    ],
  },

  { kind: "moduleflow", id: "mv-6", bg: GRAY, text: "Así se conecta todo" },

  { kind: "techstack", id: "mv-7", bg: WHITE, text: "Lo que ya está en producción" },
];

const ALL_IDS = SLIDES.map((s) => s.id);

function renderSlide(slide: Slide, zIndex: number, onAdvance: () => void) {
  switch (slide.kind) {
    case "phoneHero":
      return <PhoneHero key={slide.id} {...slide} zIndex={zIndex} onAdvance={onAdvance} />;
    case "connected":
      return <ConnectedSection key={slide.id} {...slide} zIndex={zIndex} />;
    case "container":
      return <ContainerSection key={slide.id} {...slide} zIndex={zIndex} />;
    case "gig":
      return <GigSection key={slide.id} {...slide} zIndex={zIndex} />;
    case "ecosystem":
      return <EcosystemGrid key={slide.id} {...slide} zIndex={zIndex} />;
    case "moduleflow":
      return <ModuleFlow key={slide.id} {...slide} zIndex={zIndex} />;
    case "techstack":
      return <TechStackSection key={slide.id} {...slide} zIndex={zIndex} />;
  }
}

export default function MoviraPage() {
  /* `undefined` when the visitor prefers reduced motion — SmoothScrolling skips
     the Lenis wrapper entirely then, so fall back to the native scroll. */
  const lenis = useLenis();

  const scrollToNext = useCallback(() => {
    const scrollY = window.scrollY;
    for (const id of ALL_IDS) {
      const el = document.getElementById(id);
      if (!el) continue;
      const top = el.getBoundingClientRect().top + scrollY;
      if (top > scrollY + 10) {
        if (lenis) lenis.scrollTo(top);
        else window.scrollTo({ top, behavior: "smooth" });
        return;
      }
    }
  }, [lenis]);

  useEffect(() => {
    ScrollTrigger.refresh();
    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <main className={montserrat.className}>
      {SLIDES.map((slide, i) => renderSlide(slide, i + 1, scrollToNext))}
    </main>
  );
}
