"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ACCENT, FadeTop, SafariFrame, montserrat } from "./shared";

gsap.registerPlugin(ScrollTrigger);

export function MoviraCTA({
  id,
  text,
  video,
  zIndex,
  poster,
  url,
}: {
  id: string;
  text: string;
  video: string;
  zIndex: number;
  poster: string;
  url?: string;
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const mockupRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const s = sectionRef.current;
    const m = mockupRef.current;
    if (!s || !m) return;

    gsap.fromTo(
      m,
      { scale: 0.85, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: { trigger: s, start: "top 70%", toggleActions: "play none none reverse" },
      }
    );
  }, []);

  const words = text.split(" ");
  const last = words.pop()!;

  return (
    <section
      ref={sectionRef}
      id={id}
      className={`min-h-screen h-screen flex items-center justify-center ${montserrat.className}`}
      style={{
        background: "#FFFFFF",
        position: "relative",
        zIndex,
        overflow: "hidden",
      }}
    >
      <FadeTop bg="#FFFFFF" />
      <div className="relative z-10 w-full max-w-5xl mx-auto px-4 md:px-16 text-center">
        <div ref={mockupRef} className="mb-10 md:mb-14 flex justify-center">
          <SafariFrame video={video} poster={poster} url={url} screen="dashboard" className="w-full md:w-[72%]" />
        </div>
        <h2
          style={{
            fontSize: "clamp(20px, 3.9vw, 42px)",
            fontWeight: 600,
            lineHeight: 1.12,
            letterSpacing: "-0.03em",
            color: "#A1A1AA",
          }}
          ref={textRef}
        >
          {words.join(" ")} <span style={{ color: ACCENT }}>{last}</span>
        </h2>
      </div>
    </section>
  );
}
