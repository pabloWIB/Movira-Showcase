"use client";
import { useEffect, useRef, useCallback, useState } from "react";
import { Montserrat } from "next/font/google";
import { useInView } from "motion/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MacbookScroll } from "@/components/ui/macbook-scroll";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import { TypewriterEffect } from "@/components/ui/typewriter-effect";
import { MacBookMockup } from "@/components/mockups/MacBookMockup";
// import { GooeyInput } from "@/components/ui/gooey-input";
// import { Keyboard } from "@/components/ui/keyboard";

gsap.registerPlugin(ScrollTrigger);

const montserrat = Montserrat({ subsets: ["latin"], weight: ["900"] });

const ACCENT = "#004DDA";
const TEXT_SIZE = "clamp(33px, 6.75vw, 72px)";

const GIGS = [
  { id: "app-1", text: "Client & booking management system", video: "/videos/11.mp4", bg: "#FFFFFF" },
  { id: "app-2", text: "Operations dashboard",               video: "/videos/3.mp4",  bg: "#F8F9FA" },
  { id: "app-3", text: "Process automation tool",            video: "/videos/5.mp4",  bg: "#FFFFFF" },
  { id: "app-4", text: "Internal CRM for small teams",       video: "/videos/7.mp4",  bg: "#F8F9FA" },
  { id: "app-5", text: "Data-driven admin panel",            video: "/videos/8.mp4",  bg: "#FFFFFF" },
  { id: "app-6", text: "Team workflow system",               video: "/videos/9.mp4",  bg: "#F8F9FA" },
  { id: "app-7", text: "Custom business tool",               video: "/videos/17.mp4", bg: "#FFFFFF" },
];

// ─── Section 1 title — TypewriterEffect, last word blue ──────────────────────

function HeroTitle() {
  const wordObjects = [
    { text: "Client"     },
    { text: "&"          },
    { text: "booking",    className: "text-[#004DDA]" },
    { text: "management", className: "text-[#004DDA]" },
    { text: "system"     },
  ];

  return (
    <TypewriterEffect
      words={wordObjects}
      className="text-[clamp(33px,6.75vw,72px)] font-black"
      cursorClassName="bg-[#004DDA] h-[0.75em] w-[3px]"
    />
  );
}

// ─── Sections 2-7 title — static, last word blue ─────────────────────────────

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

// ─── Shared top-fade overlay ──────────────────────────────────────────────────

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

// ─── Sections 3-7: MacBookMockup + GSAP ──────────────────────────────────────

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
          <MacBookMockup videoUrl={video} className="w-full md:w-[75%]" />
        </div>
      </div>
    </section>
  );
}

const DEMO_TEXT = "I need a custom booking app for my team…";

function charToKeyCode(char: string): string | null {
  if (char === " ")  return "Space";
  if (char === ".")  return "Period";
  if (char === ",")  return "Comma";
  if (char === "!")  return "Digit1";
  if (char === "&")  return "Digit7";
  if (char === "…")  return "Period";
  if (char === "-")  return "Minus";
  if (char === "'")  return "Quote";
  if (char === "y" || char === "Y") return "KeyY";
  const upper = char.toUpperCase();
  if (/^[A-Z]$/.test(upper)) return `Key${upper}`;
  if (/^[0-9]$/.test(char))  return `Digit${char}`;
  return null;
}

function CTASection({ zIndex }: { zIndex: number }) {
  const sectionRef             = useRef<HTMLElement>(null);
  const isInView               = useInView(sectionRef, { once: true, margin: "-20%" });
  const [open,       setOpen]       = useState(false);
  const [inputVal,   setInputVal]   = useState("");
  const [activeKeys, setActiveKeys] = useState<string[]>([]);

  useEffect(() => {
    if (!isInView) return;

    const expandTimer = setTimeout(() => setOpen(true), 700);

    let i = 0;
    const typeTimer = setTimeout(() => {
      const interval = setInterval(() => {
        const char = DEMO_TEXT[i];
        i += 1;
        setInputVal(DEMO_TEXT.slice(0, i));

        const keyCode = charToKeyCode(char);
        if (keyCode) {
          setActiveKeys([keyCode]);
          setTimeout(() => setActiveKeys([]), 45);
        }

        if (i >= DEMO_TEXT.length) clearInterval(interval);
      }, 55);
      return () => clearInterval(interval);
    }, 1300);

    return () => {
      clearTimeout(expandTimer);
      clearTimeout(typeTimer);
    };
  }, [isInView]);

  return (
    <section
      ref={sectionRef}
      id="app-cta"
      className="min-h-screen h-screen flex items-center justify-center"
      style={{ background: "#FFFFFF", position: "relative", zIndex, overflow: "hidden" }}
    >
      <FadeTop bg="#FFFFFF" />
      <div className="flex flex-col items-center gap-6 text-center px-4 w-full">
        <h2
          style={{
            fontSize: TEXT_SIZE,
            fontWeight: 900,
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
            color: "#000000",
            fontFamily: montserrat.style.fontFamily,
          }}
        >
          Let&apos;s build your next{" "}
          <span style={{ color: ACCENT }}>app</span>
        </h2>

        <p
          style={{
            fontSize: "clamp(14px, 1.5vw, 18px)",
            color: "#666666",
            fontWeight: 400,
            maxWidth: "460px",
          }}
        >
          Tell us about your project and we&apos;ll get back to you.
        </p>
      </div>
    </section>
  );
}

const ALL_IDS = [...GIGS.map((g) => g.id), "app-cta"];

export default function AppPage() {
  const scrollToNext = useCallback(() => {
    const scrollY = window.scrollY;
    for (const id of ALL_IDS) {
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
      {/* Section 1 — MacbookScroll lid-open + TypewriterEffect */}
      <div
        id={hero.id}
        style={{ background: hero.bg, position: "relative", zIndex: 1 }}
      >
        <MacbookScroll
          title={<HeroTitle />}
          videoSrc={hero.video}
          showGradient={false}
        />
      </div>

      {/* Section 2 — ContainerScroll tilt animation */}
      <ContainerSection {...second} zIndex={2} />

      {/* Sections 3-7 — MacBookMockup + GSAP, each higher z-index */}
      {rest.map((g, i) => (
        <GigSection key={g.id} {...g} zIndex={i + 3} />
      ))}

      {/* Last section — GooeyInput CTA */}
      <CTASection zIndex={rest.length + 3} />
    </main>
  );
}
