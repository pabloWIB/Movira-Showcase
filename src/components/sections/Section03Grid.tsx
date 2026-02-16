"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { IPhoneMockup } from "@/components/mockups/IPhoneMockup";
import { Zap, Palette, Code2, BarChart3 } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const VIDEO_URL = "https://google.com";

interface Feature {
  id: string;
  icon: any;
  title: string;
  description: string;
}

export function Section03Features() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);

  const features: Feature[] = [
    {
      id: "fast",
      icon: Zap,
      title: "Fast Delivery",
      description: "From concept to launch in days, not months. Rapid iteration with quality.",
    },
    {
      id: "design",
      icon: Palette,
      title: "Quality Design",
      description: "Pixel-perfect interfaces that look premium and feel intuitive.",
    },
    {
      id: "code",
      icon: Code2,
      title: "Modern Stack",
      description: "Built with React, Next.js, and Tailwind. Clean, maintainable code.",
    },
    {
      id: "results",
      icon: BarChart3,
      title: "Results That Work",
      description: "Optimized for conversions, performance, and real business outcomes.",
    },
  ];

  useEffect(() => {
    const section = sectionRef.current;
    const grid = gridRef.current;
    const title = titleRef.current;

    if (!section || !grid || !title) return;

    gsap.fromTo(
      title,
      { y: 50, opacity: 0 },
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
      grid.children,
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.15,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: {
          trigger: grid,
          start: "top 70%",
          toggleActions: "play none none reverse",
        },
      }
    );
  }, []);

  return (
    <div ref={sectionRef} className="scroll-section bg-white" id="section-3">
      <div className="w-full max-w-7xl mx-auto px-16 py-32">
        {/* Title */}
        <div ref={titleRef} className="mb-16 text-center">
          <h2 style={{ fontSize: "56px", fontWeight: 700, lineHeight: 1.2, letterSpacing: "-0.01em", color: "#000000", marginBottom: "16px" }}>
            Why Work <span style={{ color: "#0040C8" }}>With Me</span>
          </h2>
        </div>

        {/* 2x2 Grid */}
        <div ref={gridRef} className="grid grid-cols-2 gap-8">
          {features.map((feature) => (
            <div
              key={feature.id}
              className="flex flex-col items-center rounded-2xl border border-[#E5E5E5] bg-white p-10"
            >
              {/* Icon */}
              <div
                className="flex h-12 w-12 items-center justify-center rounded-xl mb-5"
                style={{ background: "rgba(0, 64, 200, 0.08)" }}
              >
                <feature.icon className="h-6 w-6 text-[#0040C8]" strokeWidth={2} />
              </div>

              {/* Title */}
              <h3 style={{ fontSize: "24px", fontWeight: 600, lineHeight: 1.3, color: "#000000", marginBottom: "8px" }}>
                {feature.title}
              </h3>

              {/* Description */}
              <p style={{ fontSize: "16px", lineHeight: 1.6, color: "#666666", textAlign: "center", marginBottom: "24px", maxWidth: "320px" }}>
                {feature.description}
              </p>

              {/* iPhone Mockup */}
              <IPhoneMockup videoUrl={VIDEO_URL} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
