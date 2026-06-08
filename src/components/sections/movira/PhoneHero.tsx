"use client";
import { useRef } from "react";
import { AndroidFrame, FadeTop, montserrat, useSlideEntrance } from "./shared";

export function PhoneHero({
  id,
  text,
  video,
  bg,
  zIndex,
  poster,
}: {
  id: string;
  text: string;
  video: string;
  bg: string;
  zIndex: number;
  poster: string;
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const mockupRef = useRef<HTMLDivElement>(null);
  useSlideEntrance(sectionRef, mockupRef);

  const words = text.split(" ");

  return (
    <section
      ref={sectionRef}
      id={id}
      className={`min-h-screen h-screen flex flex-col items-center justify-center gap-8 md:gap-12 ${montserrat.className}`}
      style={{ background: bg, position: "relative", zIndex, overflow: "hidden" }}
    >
      <FadeTop bg={bg} />
      <h1 className="relative z-10 text-[clamp(21px,4.39vw,47px)] font-semibold tracking-[-0.03em] text-center px-4 text-[#A1A1AA]">
        {words.map((word, i) => (
          <span key={i} className={i === words.length - 1 ? "text-[#0A0A0A]" : undefined}>
            {word}
            {i < words.length - 1 ? " " : ""}
          </span>
        ))}
      </h1>
      <div ref={mockupRef} className="relative z-10 flex justify-center">
        <AndroidFrame video={video} poster={poster} screen className="w-[210px] md:w-[270px]" />
      </div>
    </section>
  );
}
