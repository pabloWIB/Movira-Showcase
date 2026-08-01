"use client";

import React, { useRef, useState } from "react";
import {
  Smartphone,
  LayoutDashboard,
  Globe,
  Zap,
  Truck,
  Shield,
} from "lucide-react";

interface Module {
  id: string;
  title: string;
  icon: React.ComponentType<{ size: number; className: string }>;
  description: string;
  x: number;
  y: number;
  connectedTo: string[];
}

const CARD_W = 200;
const CARD_H = 88;
const CANVAS_W = 880;
const CANVAS_H = 460;

const MODULES: Module[] = [
  {
    id: "app-conductores",
    title: "App Conductores",
    icon: Smartphone,
    description: "Marketplace y despachos",
    x: 40,
    y: 70,
    connectedTo: ["dashboard"],
  },
  {
    id: "dashboard",
    title: "Dashboard",
    icon: LayoutDashboard,
    description: "Órdenes y tracking en vivo",
    x: 340,
    y: 70,
    connectedTo: ["web", "despachos"],
  },
  {
    id: "web",
    title: "Web Pública",
    icon: Globe,
    description: "SEO y captación",
    x: 640,
    y: 70,
    connectedTo: ["motor-ia"],
  },
  {
    id: "motor-ia",
    title: "Motor IA",
    icon: Zap,
    description: "Cotización dinámica",
    x: 640,
    y: 300,
    connectedTo: ["despachos"],
  },
  {
    id: "despachos",
    title: "Despachos",
    icon: Truck,
    description: "Cotizador público",
    x: 340,
    y: 300,
    connectedTo: ["admin"],
  },
  {
    id: "admin",
    title: "Admin",
    icon: Shield,
    description: "Panel interno",
    x: 40,
    y: 300,
    connectedTo: [],
  },
];

const INITIAL_POSITIONS: Record<string, { x: number; y: number }> =
  Object.fromEntries(MODULES.map((m) => [m.id, { x: m.x, y: m.y }]));

function ModuleCard({ module: m }: { module: Module }) {
  const Icon = m.icon;
  return (
    <div className="rounded-2xl border border-[#E5E5E5] bg-white p-3.5 shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
      <div className="flex items-center gap-2.5">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-[#E5E5E5] bg-[#F5F5F5]">
          <Icon size={16} className="text-neutral-500" />
        </span>
        <span className="text-sm font-semibold text-neutral-900">{m.title}</span>
      </div>
      <p className="mt-2 text-xs leading-snug text-neutral-500">{m.description}</p>
    </div>
  );
}

function getBezierPath(
  from: { x: number; y: number },
  to: { x: number; y: number }
): string {
  const x1 = from.x + CARD_W / 2;
  const y1 = from.y + CARD_H / 2;
  const x2 = to.x + CARD_W / 2;
  const y2 = to.y + CARD_H / 2;
  const dx = Math.max(40, Math.abs(x2 - x1) * 0.5);
  return `M ${x1} ${y1} C ${x1 + dx} ${y1}, ${x2 - dx} ${y2}, ${x2} ${y2}`;
}

export function ModuleFlow({
  id,
  text = "Así se conecta todo",
  bg = "#FFFFFF",
  zIndex = 1,
}: {
  id: string;
  text?: string;
  bg?: string;
  zIndex?: number;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [positions, setPositions] =
    useState<Record<string, { x: number; y: number }>>(INITIAL_POSITIONS);
  const [dragging, setDragging] = useState<string | null>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handlePointerDown = (
    e: React.PointerEvent<HTMLDivElement>,
    moduleId: string
  ) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const pos = positions[moduleId];
    setOffset({ x: e.clientX - rect.left - pos.x, y: e.clientY - rect.top - pos.y });
    setDragging(moduleId);
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragging) return;
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    let x = e.clientX - rect.left - offset.x;
    let y = e.clientY - rect.top - offset.y;
    x = Math.max(0, Math.min(x, rect.width - CARD_W));
    y = Math.max(0, Math.min(y, rect.height - CARD_H));
    setPositions((p) => ({ ...p, [dragging]: { x, y } }));
  };

  const handlePointerUp = () => setDragging(null);

  const connections = MODULES.flatMap((m) =>
    m.connectedTo.map((targetId) => ({
      key: `${m.id}->${targetId}`,
      from: m.id,
      to: targetId,
      d: getBezierPath(positions[m.id], positions[targetId]),
    }))
  );

  const words = text.split(" ");

  return (
    <section
      id={id}
      className="flex min-h-screen items-center justify-center px-6 py-16 md:h-screen md:py-0"
      style={{ backgroundColor: bg, position: "relative", zIndex }}
    >
      <div className="mx-auto w-full max-w-5xl">
        <h2
          className="mb-8 text-center md:mb-10"
          style={{
            fontSize: "clamp(21px, 4.39vw, 47px)",
            fontWeight: 600,
            lineHeight: 1.12,
            letterSpacing: "-0.03em",
          }}
        >
          {words.map((w, i, arr) => (
            <span
              key={i}
              className={i === arr.length - 1 ? "text-[#0A0A0A]" : "text-[#71717A]"}
            >
              {w}
              {i < arr.length - 1 ? " " : ""}
            </span>
          ))}
        </h2>

        {/* The canvas positions cards at fixed pixel offsets on an 880px board,
            so it only fits from `lg` up. Below that the same modules render as
            a plain grid — otherwise four of the six sit outside the clip. */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:hidden">
          {MODULES.map((m) => (
            <ModuleCard key={m.id} module={m} />
          ))}
        </div>

        <div
          ref={containerRef}
          className="relative mx-auto hidden w-full overflow-hidden rounded-3xl border border-[#EAEAEA] lg:block"
          style={{
            maxWidth: CANVAS_W,
            height: CANVAS_H,
            backgroundColor: "#FFFFFF",
          }}
        >
          <svg className="pointer-events-none absolute inset-0 h-full w-full">
            {connections.map((c) => {
              const active = dragging === c.from || dragging === c.to;
              return (
                <path
                  key={c.key}
                  d={c.d}
                  fill="none"
                  stroke={active ? "#171717" : "#D4D4D4"}
                  strokeWidth={1.5}
                />
              );
            })}
          </svg>

          {MODULES.map((m) => {
            const pos = positions[m.id];
            const isDragging = dragging === m.id;
            const Icon = m.icon;
            return (
              <div
                key={m.id}
                onPointerDown={(e) => handlePointerDown(e, m.id)}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
                className={`absolute left-0 top-0 touch-none select-none rounded-2xl border bg-white p-3.5 transition-[border-color,box-shadow] ${
                  isDragging
                    ? "z-30 cursor-grabbing border-[#0A0A0A] shadow-[0_8px_30px_rgba(0,0,0,0.10)]"
                    : "z-10 cursor-grab border-[#E5E5E5] shadow-[0_1px_2px_rgba(0,0,0,0.04)] hover:border-[#BDBDBD]"
                }`}
                style={{
                  width: CARD_W,
                  height: CARD_H,
                  transform: `translate3d(${pos.x}px, ${pos.y}px, 0)`,
                }}
              >
                <div className="flex items-center gap-2.5">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-[#E5E5E5] bg-[#F5F5F5]">
                    <Icon
                      size={16}
                      className={isDragging ? "text-neutral-900" : "text-neutral-500"}
                    />
                  </span>
                  <span className="text-sm font-semibold text-neutral-900">{m.title}</span>
                </div>
                <p className="mt-2 text-xs leading-snug text-neutral-500">
                  {m.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
