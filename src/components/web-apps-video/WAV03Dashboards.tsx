"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BrowserWindow } from "@/components/mockups/BrowserWindow";

gsap.registerPlugin(ScrollTrigger);

const VIDEO_URL = "/videos/8.mp4";

export function WAV03Dashboards() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const mockupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    const mockup = mockupRef.current;

    if (!section || !title || !mockup) return;

    gsap.fromTo(
      title,
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top 70%",
          toggleActions: "play none none reverse",
        },
      }
    );

    gsap.fromTo(
      mockup,
      { scale: 0.9, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 1.0,
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
      id="wav-3"
      className="min-h-screen h-screen flex items-center justify-center relative"
      style={{ background: "#F8F9FA" }}
    >
      <div className="w-full max-w-7xl mx-auto px-4 md:px-16">
        <div ref={titleRef} className="mb-8 md:mb-16 text-center">
          <h2
            style={{
              fontSize: "clamp(28px, 6vw, 56px)",
              fontWeight: 700,
              lineHeight: 1.2,
              letterSpacing: "-0.01em",
              color: "#000000",
              marginBottom: "16px",
            }}
          >
            Business <span style={{ color: "#0040C8" }}>Dashboards</span>
          </h2>
        </div>

        <div ref={mockupRef}>
          <BrowserWindow videoUrl={VIDEO_URL} url="credifirme.app" />
        </div>
      </div>
    </section>
  );
}
