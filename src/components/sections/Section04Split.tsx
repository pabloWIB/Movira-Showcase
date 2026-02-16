"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BrowserWindow } from "@/components/mockups/BrowserWindow";

gsap.registerPlugin(ScrollTrigger);

const VIDEO_URL = "/videos/14.mp4";

export function Section04Split() {
  const sectionRef = useRef<HTMLElement>(null);
  const browserRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const browser = browserRef.current;
    const title = titleRef.current;
    const subtitle = subtitleRef.current;

    if (!section || !browser || !title || !subtitle) return;

    // Title animation
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

    // Subtitle animation
    gsap.fromTo(
      subtitle,
      { y: 20, opacity: 0 },
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

    // Browser window animation
    gsap.fromTo(
      browser,
      { scale: 0.95, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 1.0,
        delay: 0.4,
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
      id="section-4-split" 
      className="min-h-screen h-screen flex items-center justify-center relative" 
      style={{ background: "#FBFBFB" }}
    >
      <div className="w-full max-w-7xl mx-auto px-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h2
            ref={titleRef}
            className="mb-4"
            style={{ 
              fontSize: "64px", 
              fontWeight: 700, 
              lineHeight: 1.1, 
              letterSpacing: "-0.02em", 
              color: "#000000" 
            }}
          >
            Websites That <span style={{ color: "#0040C8" }}>Convert</span>
          </h2>
        </div>

        {/* Browser Window */}
        <div ref={browserRef} className="flex justify-center">
          <BrowserWindow 
            videoUrl={VIDEO_URL} 
            url="yourproject.com"
            className="w-[85%]"
          />
        </div>
      </div>
    </section>
  );
}