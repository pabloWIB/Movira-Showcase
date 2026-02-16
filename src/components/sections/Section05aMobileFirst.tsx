"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { IPhoneMockup } from "@/components/mockups/IPhoneMockup";
import { MacBookMockup } from "@/components/mockups/MacBookMockup";

gsap.registerPlugin(ScrollTrigger);

const VIDEO_URL = "/videos/15.mp4";

export function Section05aMobileFirst() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const centerRef = useRef<HTMLDivElement>(null);
  const flanksRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    const center = centerRef.current;
    const flanks = flanksRef.current;

    if (!section || !title || !center || !flanks) return;

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
      center,
      { scale: 0.85, opacity: 0 },
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

    gsap.fromTo(
      flanks.children,
      { scale: 0.8, opacity: 0, y: 40 },
      {
        scale: 1,
        opacity: 1,
        y: 0,
        stagger: 0.1,
        duration: 0.8,
        delay: 0.3,
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
      id="section-5a"
      className="min-h-screen h-screen flex items-center justify-center relative"
      style={{ background: "#F8F9FA" }}
    >
      <div className="w-full max-w-7xl mx-auto px-4 md:px-16">
        <div ref={titleRef} className="mb-8 md:mb-16 text-center">
          <h2 style={{ fontSize: "clamp(28px, 6vw, 56px)", fontWeight: 700, lineHeight: 1.2, letterSpacing: "-0.01em", color: "#000000", marginBottom: "16px" }}>
            Mobile-First <span style={{ color: "#0040C8" }}>Design</span>
          </h2>
        </div>

        <div className="flex items-center justify-center gap-4 md:gap-8">
          <div ref={flanksRef} className="flex items-center gap-4 md:gap-6">
            <IPhoneMockup videoUrl={VIDEO_URL} />
            {/* <IPhoneMockup videoUrl={VIDEO_URL} /> */}
          </div>

        </div>
      </div>
    </section>
  );
}
