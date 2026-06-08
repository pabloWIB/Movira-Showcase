"use client";
import { useRef } from "react";
import { AnimatedBeam } from "@/components/ui/animated-beam";
import {
  ACCENT,
  AndroidFrame,
  SafariFrame,
  AccentTitle,
  FadeTop,
  montserrat,
  useSlideEntrance,
} from "./shared";

// Slide 2 — "Conectada en tiempo real" · app ↔ dashboard con haz animado
export function ConnectedSection({
  id,
  text,
  bg,
  zIndex,
  appVideo,
  appPoster,
  webVideo,
  webPoster,
  url,
}: {
  id: string;
  text: string;
  bg: string;
  zIndex: number;
  appVideo: string;
  appPoster: string;
  webVideo: string;
  webPoster: string;
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
            <AndroidFrame video={appVideo} poster={appPoster} screen className="w-[120px] md:w-[200px]" />
          </div>
          <div ref={rightRef} className="z-10 min-w-0 flex-1">
            <SafariFrame video={webVideo} poster={webPoster} url={url} screen="dashboard" className="w-full" />
          </div>

          <AnimatedBeam
            containerRef={containerRef}
            fromRef={leftRef}
            toRef={rightRef}
            duration={3}
            curvature={-40}
            gradientStartColor={ACCENT}
            gradientStopColor="#A1A1AA"
          />
          <AnimatedBeam
            containerRef={containerRef}
            fromRef={leftRef}
            toRef={rightRef}
            duration={3}
            delay={1.5}
            curvature={40}
            reverse
            gradientStartColor="#A1A1AA"
            gradientStopColor={ACCENT}
          />
        </div>
      </div>
    </section>
  );
}
