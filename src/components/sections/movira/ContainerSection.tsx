"use client";
import { useRef } from "react";
import { motion } from "motion/react";
import { Navigation, Package, Sparkles } from "lucide-react";
import { AccentTitle, ACCENT, FadeTop, montserrat } from "./shared";

export function ContainerSection({
  id,
  text,
  bg,
  zIndex,
}: {
  id: string;
  text: string;
  video: string;
  bg: string;
  zIndex: number;
  poster?: string;
}) {
  const boardRef = useRef<HTMLDivElement>(null);

  return (
    <section
      id={id}
      className={`min-h-screen h-screen flex flex-col items-center justify-center ${montserrat.className}`}
      style={{ background: bg, position: "relative", zIndex, overflow: "hidden" }}
    >
      <FadeTop bg={bg} />

      <div className="relative z-10 w-full max-w-5xl mx-auto px-4 md:px-8 flex flex-col items-center">
        <div className="mb-8">
          <AccentTitle text={text} />
        </div>

        <div
          ref={boardRef}
          className="relative w-full h-[380px] md:h-[440px] rounded-3xl border border-[#EAEAEA]"
          style={{ backgroundColor: "#FAFAFA" }}
        >
          {MODULES.map((m, i) => (
            <DraggableModule key={m.title} module={m} index={i} boardRef={boardRef} />
          ))}
        </div>
      </div>
    </section>
  );
}

type ModuleData = {
  title: string;
  tag: string;
  icon: React.ComponentType<{ size?: number; strokeWidth?: number }>;
  body: React.ReactNode;
  pos: { left: string; top: string };
  rotate: number;
};

const MODULES: ModuleData[] = [
  {
    title: "Tracking en vivo",
    tag: "Operación",
    icon: Navigation,
    rotate: -5,
    pos: { left: "4%", top: "10%" },
    body: (
      <div className="flex items-center gap-2">
        <span className="relative flex h-2.5 w-2.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-neutral-400 opacity-60" />
          <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-neutral-900" />
        </span>
        <span className="text-2xl font-semibold text-neutral-900">12</span>
        <span className="text-xs font-medium text-neutral-400">vehículos en ruta</span>
      </div>
    ),
  },
  {
    title: "Despachos",
    tag: "Órdenes",
    icon: Package,
    rotate: 4,
    pos: { left: "52%", top: "6%" },
    body: (
      <div className="flex items-end gap-1.5">
        {[40, 70, 45, 90, 60, 80].map((h, i) => (
          <span
            key={i}
            className="w-2 rounded-sm"
            style={{ height: `${h * 0.32}px`, backgroundColor: ACCENT, opacity: 0.35 + i * 0.1 }}
          />
        ))}
        <span className="ml-2 text-xs font-medium text-neutral-400">38 hoy</span>
      </div>
    ),
  },
  {
    title: "Precios con IA",
    tag: "Cotizador",
    icon: Sparkles,
    rotate: -2,
    pos: { left: "28%", top: "52%" },
    body: (
      <div>
        <div className="text-2xl font-semibold text-neutral-900">$ 1.250.000</div>
        <div className="text-xs font-medium text-neutral-400">cotización automática</div>
      </div>
    ),
  },
];

function DraggableModule({
  module: m,
  index,
  boardRef,
}: {
  module: ModuleData;
  index: number;
  boardRef: React.RefObject<HTMLDivElement | null>;
}) {
  const Icon = m.icon;
  return (
    <motion.div
      drag
      dragConstraints={boardRef}
      dragElastic={0.12}
      dragMomentum={false}
      initial={{ opacity: 0, scale: 0.8, rotate: m.rotate }}
      whileInView={{ opacity: 1, scale: 1, rotate: m.rotate }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ delay: 0.15 + index * 0.12, type: "spring", stiffness: 220, damping: 20 }}
      whileHover={{ scale: 1.03, rotate: 0 }}
      whileDrag={{ scale: 1.06, rotate: 0, zIndex: 50, cursor: "grabbing" }}
      className="absolute w-[190px] md:w-[230px] cursor-grab select-none rounded-2xl border border-[#E5E5E5] bg-white p-4 shadow-[0_8px_30px_rgba(0,0,0,0.08)]"
      style={{ left: m.pos.left, top: m.pos.top }}
    >
      <div className="mb-3 flex items-center justify-between">
        <span
          className="flex h-9 w-9 items-center justify-center rounded-xl"
          style={{ backgroundColor: "rgba(0,0,0,0.05)", color: ACCENT }}
        >
          <Icon size={18} strokeWidth={2.2} />
        </span>
        <span className="text-[10px] font-semibold uppercase tracking-wider text-neutral-300">
          {m.tag}
        </span>
      </div>
      <div className="mb-3 text-sm font-semibold text-neutral-900">{m.title}</div>
      {m.body}
    </motion.div>
  );
}
