"use client";
import { useRef } from "react";
import { ChevronDown } from "lucide-react";
import { AndroidFrame, FadeTop, MUTED, TEXT_SIZE, montserrat, useSlideEntrance } from "./shared";

export function PhoneHero({
  id,
  text,
  bg,
  zIndex,
  onAdvance,
}: {
  id: string;
  text: string;
  bg: string;
  zIndex: number;
  onAdvance: () => void;
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
      <h1
        className="relative z-10 text-center px-4 font-semibold tracking-[-0.03em]"
        style={{ fontSize: TEXT_SIZE, color: MUTED, lineHeight: 1.12 }}
      >
        {words.map((word, i) => (
          <span key={i} className={i === words.length - 1 ? "text-[#0A0A0A]" : undefined}>
            {word}
            {i < words.length - 1 ? " " : ""}
          </span>
        ))}
      </h1>
      <div ref={mockupRef} className="relative z-10 flex justify-center">
        <AndroidFrame className="w-[210px] md:w-[270px]" />
      </div>

      <button
        type="button"
        onClick={onAdvance}
        aria-label="Ir a la siguiente sección"
        className="absolute bottom-8 left-1/2 z-10 flex h-11 w-11 -translate-x-1/2 items-center justify-center rounded-full border border-[#E5E5E5] bg-white text-[#71717A] transition-colors duration-200 hover:border-[#0A0A0A] hover:text-[#0A0A0A] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0A0A0A] motion-safe:animate-bounce"
      >
        <ChevronDown size={20} aria-hidden="true" />
      </button>
    </section>
  );
}
