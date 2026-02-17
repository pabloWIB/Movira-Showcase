"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MacBookMockup } from "@/components/mockups/MacBookMockup";

gsap.registerPlugin(ScrollTrigger);

const VIDEO_URL = "/videos/7.mp4";

export function WAV05CTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const macbookRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const macbook = macbookRef.current;
    const text = textRef.current;

    if (!section || !macbook || !text) return;

    gsap.fromTo(
      macbook,
      { scale: 0.85, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top 70%",
          toggleActions: "play none none reverse",
        },
      }
    );

    gsap.fromTo(
      text,
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        delay: 0.5,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top 70%",
          toggleActions: "play none none reverse",
        },
      }
    );
  }, []);

  return (
    <section
      ref={sectionRef}
      id="wav-5"
      className="min-h-screen h-screen flex items-center justify-center relative"
      style={{ background: "linear-gradient(135deg, #0040C8 0%, #0028A0 100%)" }}
    >
      <div className="w-full max-w-5xl mx-auto px-4 md:px-16 text-center">
        <div ref={macbookRef} className="mb-8 md:mb-12">
          <MacBookMockup videoUrl={VIDEO_URL} className="w-full md:w-[80%] mx-auto" />
        </div>

        <h2
          ref={textRef}
          style={{
            fontSize: "clamp(28px, 6vw, 56px)",
            fontWeight: 700,
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
            color: "#FFFFFF",
          }}
        >
          Build Your Internal Tool
        </h2>
      </div>
    </section>
  );
}
