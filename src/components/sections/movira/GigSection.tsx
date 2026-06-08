"use client";
import { useRef } from "react";
import { AccentTitle, FadeTop, SafariFrame, montserrat, useSlideEntrance } from "./shared";
import type { SafariScreenKey } from "./FramedScreens";

// Slides 4 & 5 — título + un navegador Safari (web SEO / cotizador IA)
export function GigSection({
  id,
  text,
  video,
  bg,
  zIndex,
  url,
  poster,
  screen,
}: {
  id: string;
  text: string;
  video: string;
  bg: string;
  zIndex: number;
  url?: string;
  poster: string;
  screen?: SafariScreenKey;
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const mockupRef = useRef<HTMLDivElement>(null);
  useSlideEntrance(sectionRef, mockupRef);

  return (
    <section
      ref={sectionRef}
      id={id}
      className={`min-h-screen h-screen flex items-center justify-center ${montserrat.className}`}
      style={{ background: bg, position: "relative", zIndex, overflow: "hidden" }}
    >
      <FadeTop bg={bg} />
      <div className="w-full max-w-7xl mx-auto px-4 md:px-16 flex flex-col items-center gap-10 md:gap-14">
        <div ref={textRef}>
          <AccentTitle text={text} />
        </div>
        <div ref={mockupRef} className="w-full flex justify-center">
          <SafariFrame video={video} poster={poster} url={url} screen={screen} className="w-full md:w-[82%]" />
        </div>
      </div>
    </section>
  );
}
