"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Tree, type TreeViewElement } from "@/components/ui/file-tree";
import { NumberTicker } from "@/components/ui/number-ticker";
import { Highlighter } from "@/components/ui/highlighter";
import { ACCENT, AccentTitle, FadeTop, montserrat } from "./shared";

gsap.registerPlugin(ScrollTrigger);

// El ecosistema real de repos en producción
const ELEMENTS: TreeViewElement[] = [
  {
    id: "movira",
    name: "movira/",
    type: "folder",
    children: [
      {
        id: "app",
        name: "movira-app — conductores (Expo)",
        type: "folder",
        children: [
          { id: "app-marketplace", name: "marketplace.tsx" },
          { id: "app-despacho", name: "despacho-activo.tsx" },
        ],
      },
      {
        id: "dashboard",
        name: "movira-dashboard — empresas",
        type: "folder",
        children: [
          { id: "dash-orden", name: "crear-orden.tsx" },
          { id: "dash-tracking", name: "tracking.tsx" },
        ],
      },
      { id: "web", name: "movira-web — SEO público", type: "folder", children: [{ id: "web-home", name: "page.tsx" }] },
      { id: "ai", name: "movira-ai-backend — precios IA", type: "folder", children: [{ id: "ai-pricing", name: "pricing-engine.ts" }] },
      { id: "despachos", name: "movira-despachos — cotizador", type: "folder", children: [{ id: "desp-wizard", name: "wizard.tsx" }] },
      { id: "admin", name: "movira-admin — panel interno", type: "folder", children: [{ id: "adm-solicitudes", name: "solicitudes.tsx" }] },
      { id: "docs", name: "docs/ — schema v2.0 + planes", type: "folder", children: [{ id: "docs-schema", name: "schema.sql" }] },
    ],
  },
];

const STATS = [
  { value: 6, label: "productos conectados" },
  { value: 1, label: "única plataforma" },
];

// Sección "Lo que ya tenemos" · file-tree del ecosistema + stats animadas
export function TechStackSection({
  id,
  text,
  bg,
  zIndex,
}: {
  id: string;
  text: string;
  bg: string;
  zIndex: number;
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const s = sectionRef.current;
    const b = bodyRef.current;
    if (!s || !b) return;

    gsap.fromTo(
      b,
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.9,
        delay: 0.2,
        ease: "power3.out",
        scrollTrigger: { trigger: s, start: "top 72%", toggleActions: "play none none reverse" },
      }
    );
  }, []);

  return (
    <section
      ref={sectionRef}
      id={id}
      className={`min-h-screen md:h-screen flex items-center justify-center py-16 md:py-0 ${montserrat.className}`}
      style={{ background: bg, position: "relative", zIndex, overflow: "hidden" }}
    >
      <FadeTop bg={bg} />
      <div className="w-full max-w-6xl mx-auto px-4 md:px-16">
        <div ref={titleRef} className="mb-4 md:mb-6">
          <AccentTitle text={text} />
        </div>
        <p className="text-center text-base md:text-lg font-normal text-[#666666] mb-10 md:mb-14">
          No es una promesa —{" "}
          <Highlighter action="highlight" color="#E5E5E5" isView>
            <span className="font-semibold text-black">ya está funcionando hoy</span>
          </Highlighter>
          .
        </p>

        <div ref={bodyRef} className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* File tree del ecosistema */}
          <div
            className="h-[320px] md:h-[360px] rounded-2xl border border-[#E5E5E5] bg-white p-3"
            style={{ boxShadow: "0 10px 40px rgba(0,0,0,0.06)" }}
          >
            <Tree
              className="bg-white"
              initialSelectedId="dash-tracking"
              initialExpandedItems={["movira", "app", "dashboard"]}
              elements={ELEMENTS}
            />
          </div>

          {/* Stats animadas */}
          <div className="grid grid-cols-2 gap-4 md:gap-6">
            {STATS.map((stat) => (
              <div key={stat.label} className="flex flex-col items-center text-center gap-2">
                <NumberTicker
                  value={stat.value}
                  className="text-5xl md:text-6xl font-semibold tracking-[-0.03em]"
                  style={{ color: ACCENT }}
                />
                <span className="text-xs md:text-sm font-medium text-[#666666] leading-snug">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
