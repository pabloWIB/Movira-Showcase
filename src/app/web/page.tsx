"use client";
import { useEffect, useRef, useCallback } from "react";
import { Montserrat } from "next/font/google";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MacbookScroll } from "@/components/ui/macbook-scroll";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import { TypewriterEffect } from "@/components/ui/typewriter-effect";
import { BrowserWindow } from "@/components/mockups/BrowserWindow";

gsap.registerPlugin(ScrollTrigger);

const montserrat = Montserrat({ subsets: ["latin"], weight: ["900"] });

const ACCENT = "#F97316";
const TEXT_SIZE = "clamp(33px, 6.75vw, 72px)";

const GIGS = [
  { id: "web-1", text: "Conversion-focused landing page",       video: "/videos/2.mp4",  bg: "#FFFFFF" },
  { id: "web-2", text: "Business website that generates leads", video: "/videos/4.mp4",  bg: "#F8F9FA" },
  { id: "web-3", text: "Fast & modern responsive site",         video: "/videos/6.mp4",  bg: "#FFFFFF" },
  { id: "web-4", text: "Brand presence with clear structure",   video: "/videos/8.mp4",  bg: "#F8F9FA" },
  { id: "web-5", text: "Campaign-ready sales page",             video: "/videos/14.mp4", bg: "#FFFFFF" },
  { id: "web-6", text: "Service website built to convert",      video: "/videos/1.mp4",  bg: "#F8F9FA" },
];

// "Conversion-focused" black — "landing page" orange (last 2 words)
function HeroTitle({ text }: { text: string }) {
  const words = text.split(" ");
  const orangeFrom = words.length - 2; // last 2 words → orange
  const wordObjects = words.map((word, i) => ({
    text: word,
    className: i >= orangeFrom ? "text-[#F97316]" : undefined,
  }));

  return (
    <TypewriterEffect
      words={wordObjects}
      className="text-[clamp(33px,6.75vw,72px)] font-black"
      cursorClassName="bg-[#F97316] h-[0.75em] w-[3px]"
    />
  );
}

// Standard title for sections 2-6 (last word orange)
function GigTitle({ text }: { text: string }) {
  const words = text.split(" ");
  const last  = words.pop()!;
  return (
    <span
      style={{
        fontSize: TEXT_SIZE,
        fontWeight: 900,
        lineHeight: 1.1,
        letterSpacing: "-0.02em",
        color: "#000000",
        fontFamily: montserrat.style.fontFamily,
      }}
    >
      {words.join(" ")}{" "}
      <span style={{ color: ACCENT }}>{last}</span>
    </span>
  );
}

// Shared top-fade overlay — softens the transition edge
function FadeTop({ bg }: { bg: string }) {
  return (
    <div
      className="absolute inset-x-0 top-0 h-40 pointer-events-none"
      style={{
        background: `linear-gradient(to bottom, ${bg} 0%, transparent 100%)`,
        zIndex: 2,
      }}
    />
  );
}

// ─── Section 2: ContainerScroll ──────────────────────────────────────────────

function ContainerSection({
  id, text, video, bg, zIndex,
}: { id: string; text: string; video: string; bg: string; zIndex: number }) {
  return (
    <div
      id={id}
      style={{ background: bg, position: "relative", zIndex, overflow: "hidden" }}
    >
      <FadeTop bg={bg} />
      <ContainerScroll titleComponent={<div className="mb-10"><GigTitle text={text} /></div>}>
        <video
          src={video}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover rounded-xl"
        />
      </ContainerScroll>
    </div>
  );
}

// ─── Sections 3-6: BrowserWindow + GSAP ──────────────────────────────────────

function GigSection({
  id, text, video, bg, zIndex,
}: { id: string; text: string; video: string; bg: string; zIndex: number }) {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef    = useRef<HTMLHeadingElement>(null);
  const mockupRef  = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const s = sectionRef.current;
    const t = textRef.current;
    const m = mockupRef.current;
    if (!s || !t || !m) return;

    gsap.fromTo(t, { y: 50, opacity: 0 }, {
      y: 0, opacity: 1, duration: 0.75, ease: "power3.out",
      scrollTrigger: { trigger: s, start: "top 72%", toggleActions: "play none none reverse" },
    });
    gsap.fromTo(m, { scale: 0.93, opacity: 0 }, {
      scale: 1, opacity: 1, duration: 1.0, delay: 0.18, ease: "power3.out",
      scrollTrigger: { trigger: s, start: "top 72%", toggleActions: "play none none reverse" },
    });
  }, []);

  return (
    <section
      ref={sectionRef}
      id={id}
      className="min-h-screen h-screen flex items-center justify-center"
      style={{ background: bg, position: "relative", zIndex, overflow: "hidden" }}
    >
      <FadeTop bg={bg} />
      <div className="w-full max-w-7xl mx-auto px-4 md:px-16 flex flex-col items-center gap-10 md:gap-14">
        <h2
          ref={textRef}
          className="text-center"
          style={{
            fontSize: TEXT_SIZE,
            fontWeight: 900,
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
            color: "#000000",
          }}
        >
          {text.split(" ").map((word, i, arr) => {
            const isLast = i === arr.length - 1;
            return (
              <span key={i} style={isLast ? { color: ACCENT } : undefined}>
                {word}{!isLast && " "}
              </span>
            );
          })}
        </h2>

        <div ref={mockupRef} className="w-full flex justify-center">
          <BrowserWindow videoUrl={video} url="" className="w-full md:w-[82%]" />
        </div>
      </div>
    </section>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function WebPage() {
  const scrollToNext = useCallback(() => {
    const scrollY = window.scrollY;
    for (const { id } of GIGS) {
      const el = document.getElementById(id);
      if (!el) continue;
      const top = el.getBoundingClientRect().top + scrollY;
      if (top > scrollY + 10) {
        window.scrollTo({ top, behavior: "smooth" });
        return;
      }
    }
  }, []);

  useEffect(() => {
    ScrollTrigger.refresh();
    const onKey = (e: KeyboardEvent) => { if (e.key === "q" || e.key === "Q") scrollToNext(); };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [scrollToNext]);

  const [hero, second, ...rest] = GIGS;

  return (
    <main className={montserrat.className}>
      {/* Section 1 — MacbookScroll (z-index: 1, no overflow clip) */}
      <div
        id={hero.id}
        style={{ background: hero.bg, position: "relative", zIndex: 1 }}
      >
        <MacbookScroll
          title={<HeroTitle text={hero.text} />}
          videoSrc={hero.video}
          showGradient={false}
        />
      </div>

      {/* Section 2 — ContainerScroll (z-index: 2, hides section 1 overflow) */}
      <ContainerSection {...second} zIndex={2} />

      {/* Sections 3-6 — each higher z-index (3→6), hides previous overflow */}
      {rest.map((g, i) => (
        <GigSection key={g.id} {...g} zIndex={i + 3} />
      ))}
    </main>
  );
}
