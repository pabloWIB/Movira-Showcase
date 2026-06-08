"use client";
import { useEffect, useRef, useState, type ReactNode, type PointerEvent as ReactPointerEvent } from "react";
import { AccentTitle, AndroidFrame, FadeTop, SafariFrame, montserrat } from "./shared";
import type { SafariScreenKey } from "./FramedScreens";

export type EcosystemItem = {
  id: string;
  kind: "android" | "safari";
  label: string;
  url?: string;
  video: string;
  poster: string;
  screen?: SafariScreenKey;
};

const CANVAS_H = 560;

const CENTER_BOX = { w: 150, h: 224 };
const SPOKE_BOX = { w: 150, h: 112 };
const SPOKE_FRACS = [
  { l: 0.5, t: 0.13 },
  { l: 0.85, t: 0.4 },
  { l: 0.72, t: 0.84 },
  { l: 0.28, t: 0.84 },
  { l: 0.15, t: 0.4 },
];

type Box = { w: number; h: number };
type Pos = { x: number; y: number };
type NodeDef = { id: string; item: EcosystemItem; box: Box; frac: { l: number; t: number }; isCenter: boolean };

const clamp = (v: number, min: number, max: number) => Math.min(Math.max(v, min), max);

function bez(a: Pos, b: Pos): string {
  const dx = Math.max(40, Math.abs(b.x - a.x) * 0.5);
  return `M ${a.x} ${a.y} C ${a.x + dx} ${a.y}, ${b.x - dx} ${b.y}, ${b.x} ${b.y}`;
}

function Mockup({ item, w }: { item: EcosystemItem; w: string }) {
  return item.kind === "android" ? (
    <AndroidFrame video={item.video} poster={item.poster} screen className={w} />
  ) : (
    <SafariFrame video={item.video} poster={item.poster} url={item.url} screen={item.screen} className="w-full" />
  );
}

function Label({ children }: { children: ReactNode }) {
  return (
    <span
      className="mt-3 inline-flex items-center rounded-full border border-[#EAEAEA] px-3 py-1.5 text-[11px] md:text-xs font-medium"
      style={{ background: "#F7F7F8", color: "#0A0A0A" }}
    >
      {children}
    </span>
  );
}

export function EcosystemGrid({
  id,
  text,
  bg,
  zIndex,
  items,
}: {
  id: string;
  text: string;
  bg: string;
  zIndex: number;
  items: EcosystemItem[];
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);

  const center = items.find((i) => i.kind === "android") ?? items[0];
  const spokes = items.filter((i) => i !== center).slice(0, 5);
  const nodes: NodeDef[] = [
    { id: center.id, item: center, box: CENTER_BOX, frac: { l: 0.5, t: 0.5 }, isCenter: true },
    ...spokes.map((item, i) => ({ id: item.id, item, box: SPOKE_BOX, frac: SPOKE_FRACS[i], isCenter: false })),
  ];
  const boxOf = (nid: string) => nodes.find((n) => n.id === nid)!.box;

  const computeLayout = (w: number, h: number): Record<string, Pos> =>
    Object.fromEntries(nodes.map((n) => [n.id, { x: n.frac.l * w - n.box.w / 2, y: n.frac.t * h - n.box.h / 2 }]));

  const [positions, setPositions] = useState<Record<string, Pos>>(() => computeLayout(960, CANVAS_H));
  const [dragging, setDragging] = useState<string | null>(null);
  const [canvasW, setCanvasW] = useState(0);
  const offset = useRef<Pos>({ x: 0, y: 0 });

  useEffect(() => {
    const el = canvasRef.current;
    if (!el) return;
    const update = () => setCanvasW(el.clientWidth);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const layoutKey = Math.round(canvasW / 60);
  useEffect(() => {
    const el = canvasRef.current;
    if (!el || !el.clientWidth) return;
    setPositions(computeLayout(el.clientWidth, CANVAS_H));
  }, [layoutKey]);

  const handlePointerDown = (e: ReactPointerEvent<HTMLDivElement>, nid: string) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;
    const pos = positions[nid];
    offset.current = { x: e.clientX - rect.left - pos.x, y: e.clientY - rect.top - pos.y };
    setDragging(nid);
    e.currentTarget.setPointerCapture(e.pointerId);
  };
  const handlePointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (!dragging) return;
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;
    const box = boxOf(dragging);
    const x = clamp(e.clientX - rect.left - offset.current.x, 0, rect.width - box.w);
    const y = clamp(e.clientY - rect.top - offset.current.y, 0, rect.height - box.h);
    setPositions((p) => ({ ...p, [dragging]: { x, y } }));
  };
  const handlePointerUp = () => setDragging(null);

  const centerOf = (nid: string): Pos => {
    const p = positions[nid] ?? { x: 0, y: 0 };
    const b = boxOf(nid);
    return { x: p.x + b.w / 2, y: p.y + b.h / 2 };
  };
  const connections = spokes.map((s) => ({
    id: s.id,
    d: bez(centerOf(center.id), centerOf(s.id)),
    active: dragging === center.id || dragging === s.id,
  }));

  return (
    <section
      ref={sectionRef}
      id={id}
      className={`min-h-screen md:h-screen flex items-center justify-center py-16 md:py-0 ${montserrat.className}`}
      style={{ background: bg, position: "relative", zIndex, overflow: "hidden" }}
    >
      <FadeTop bg={bg} />
      <div className="w-full max-w-6xl mx-auto px-4 md:px-12">
        {text && (
          <div className="mb-3 md:mb-4">
            <AccentTitle text={text} />
          </div>
        )}
        <div
          ref={canvasRef}
          className="relative mx-auto hidden w-full max-w-[980px] overflow-hidden rounded-3xl border border-[#EAEAEA] md:block"
          style={{
            height: CANVAS_H,
            backgroundColor: "#FAFAFA",
            backgroundImage: "radial-gradient(circle, rgba(0,0,0,0.05) 1px, transparent 1px)",
            backgroundSize: "22px 22px",
          }}
        >
          <svg className="pointer-events-none absolute inset-0 h-full w-full">
            {connections.map((c) => (
              <path
                key={c.id}
                d={c.d}
                fill="none"
                stroke={c.active ? "#171717" : "#D4D4D4"}
                strokeWidth={1.5}
              />
            ))}
          </svg>

          {nodes.map((n) => (
            <div
              key={n.id}
              onPointerDown={(e) => handlePointerDown(e, n.id)}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              className={`absolute left-0 top-0 flex touch-none select-none flex-col items-center ${
                dragging === n.id ? "z-30 cursor-grabbing" : "z-10 cursor-grab"
              }`}
              style={{ transform: `translate3d(${(positions[n.id] ?? { x: 0, y: 0 }).x}px, ${(positions[n.id] ?? { x: 0, y: 0 }).y}px, 0)`, width: n.box.w }}
            >
              <Mockup item={n.item} w={n.isCenter ? "w-[96px]" : "w-[110px]"} />
              <Label>{n.item.label}</Label>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-5 md:hidden">
          {items.map((item) => (
            <div key={item.id} className="flex flex-col items-center justify-end">
              <div className="flex w-full items-center justify-center">
                <Mockup item={item} w="w-[110px]" />
              </div>
              <Label>{item.label}</Label>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
