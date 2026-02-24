"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BrowserWindow } from "@/components/mockups/BrowserWindow";

gsap.registerPlugin(ScrollTrigger);

const VIDEO_URL = "/videos/16.mp4";

export function Section05Browsers() {
  const sectionRef = useRef<HTMLElement>(null);
  const browser1Ref = useRef<HTMLDivElement>(null);
  const browser2Ref = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const browser1 = browser1Ref.current;
    const browser2 = browser2Ref.current;
    const title = titleRef.current;

    if (!section || !browser1 || !browser2 || !title) return;

    gsap.fromTo(
      title,
      { y: 30, opacity: 0 },
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
      browser1,
      { y: 60, opacity: 0 },
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
      browser2,
      { y: 60, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        delay: 0.2,
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
    <section ref={sectionRef} id="section-5" className="min-h-screen h-screen flex items-center justify-center relative" style={{ background: "#FBFBFB" }}>
      <div className="w-full max-w-6xl mx-auto px-4 md:px-16">
        <h2
          ref={titleRef}
          className="text-center mb-8 md:mb-16"
          style={{ fontSize: "clamp(24px, 5vw, 48px)", fontWeight: 700, lineHeight: 1.2, letterSpacing: "-0.01em", color: "#000000" }}
        >
          Optimized <span style={{ color: "#0040C8" }}>Performance</span>
        </h2>

        <div className="flex flex-col gap-6">
          <div ref={browser1Ref}>
            <BrowserWindow videoUrl={VIDEO_URL} url="" />
          </div>

          {/* <div ref={browser2Ref}>
            <BrowserWindow videoUrl={VIDEO_URL} url="saas-dashboard.io" />
          </div> */}
        </div>
      </div>
    </section>
  );
}
