"use client";
import { useRef } from "react";
import { AccentTitle, AndroidFrame, FadeTop, SafariFrame, montserrat, useSlideEntrance } from "./shared";
import { AnimatedBeam } from "@/components/ui/animated-beam";
import type { SafariScreenKey } from "./FramedScreens";

export type Surface = {
  kind: "android" | "safari";
  video: string;
  poster: string;
  url?: string;
  /** Mini-app a recrear: `true` para el teléfono (driver), o una clave Safari. */
  screen?: SafariScreenKey;
};

function Mockup({ s }: { s: Surface }) {
  if (s.kind === "android")
    return <AndroidFrame video={s.video} poster={s.poster} screen className="w-[150px] md:w-[200px]" />;
  return <SafariFrame video={s.video} poster={s.poster} url={s.url} screen={s.screen} className="w-full" />;
}

// Slide 6 — dos navegadores conectados (despachos públicos ↔ admin interno)
// El haz animado materializa "del cliente al conductor": el flujo entre ambos.
export function SplitSection({
  id,
  text,
  bg,
  zIndex,
  left,
  right,
}: {
  id: string;
  text: string;
  bg: string;
  zIndex: number;
  left: Surface;
  right: Surface;
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const mockupRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  useSlideEntrance(sectionRef, mockupRef);

  return (
    <section
      ref={sectionRef}
      id={id}
      className={`min-h-screen md:h-screen flex items-center justify-center py-16 md:py-0 ${montserrat.className}`}
      style={{ background: bg, position: "relative", zIndex, overflow: "hidden" }}
    >
      <FadeTop bg={bg} />
      <div className="w-full max-w-7xl mx-auto px-4 md:px-16 flex flex-col items-center gap-10 md:gap-14">
        <div ref={textRef}>
          <AccentTitle text={text} />
        </div>
        <div
          ref={mockupRef}
          className="relative w-full flex flex-col md:flex-row items-center justify-center gap-8 md:gap-10"
        >
          <div ref={leftRef} className="z-10 flex-1 flex justify-center min-w-0">
            <Mockup s={left} />
          </div>
          <div ref={rightRef} className="z-10 flex-1 flex justify-center min-w-0">
            <Mockup s={right} />
          </div>

          {/* Haz bidireccional monocromo entre ambos productos */}
          <AnimatedBeam
            containerRef={mockupRef}
            fromRef={leftRef}
            toRef={rightRef}
            duration={3}
            curvature={-36}
            pathColor="#0A0A0A"
            pathOpacity={0.06}
            gradientStartColor="#0A0A0A"
            gradientStopColor="#A1A1AA"
          />
          <AnimatedBeam
            containerRef={mockupRef}
            fromRef={leftRef}
            toRef={rightRef}
            duration={3}
            delay={1.5}
            curvature={36}
            reverse
            pathColor="#0A0A0A"
            pathOpacity={0.06}
            gradientStartColor="#A1A1AA"
            gradientStopColor="#0A0A0A"
          />
        </div>
      </div>
    </section>
  );
}
