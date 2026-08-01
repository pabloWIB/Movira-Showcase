"use client";
import { useRef } from "react";
import { AnimatedBeam } from "@/components/ui/animated-beam";
import {
  ACCENT,
  MUTED,
  AndroidFrame,
  SafariFrame,
  AccentTitle,
  FadeTop,
  montserrat,
  useSlideEntrance,
} from "./shared";

export function ConnectedSection({
  id,
  text,
  bg,
  zIndex,
  url,
}: {
  id: string;
  text: string;
  bg: string;
  zIndex: number;
  url?: string;
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  useSlideEntrance(sectionRef, containerRef);

  return (
    <section
      ref={sectionRef}
      id={id}
      className={`min-h-screen md:h-screen flex items-center justify-center py-16 md:py-0 ${montserrat.className}`}
      style={{ background: bg, position: "relative", zIndex, overflow: "hidden" }}
    >
      <FadeTop bg={bg} />
      <div className="w-full max-w-7xl mx-auto px-4 md:px-16 flex flex-col items-center gap-12 md:gap-16">
        <div ref={textRef}>
          <AccentTitle text={text} />
        </div>

        <div
          ref={containerRef}
          className="relative flex w-full max-w-5xl items-center justify-between gap-6 md:gap-10"
        >
          <div ref={leftRef} className="z-10 shrink-0">
            <AndroidFrame className="w-[120px] md:w-[200px]" />
          </div>
          <div ref={rightRef} className="z-10 min-w-0 flex-1">
            <SafariFrame url={url} screen="dashboard" className="w-full" />
          </div>

          <AnimatedBeam
            containerRef={containerRef}
            fromRef={leftRef}
            toRef={rightRef}
            duration={3}
            curvature={-40}
            gradientStartColor={ACCENT}
            gradientStopColor={MUTED}
          />
          <AnimatedBeam
            containerRef={containerRef}
            fromRef={leftRef}
            toRef={rightRef}
            duration={3}
            delay={1.5}
            curvature={40}
            reverse
            gradientStartColor={MUTED}
            gradientStopColor={ACCENT}
          />
        </div>
      </div>
    </section>
  );
}
