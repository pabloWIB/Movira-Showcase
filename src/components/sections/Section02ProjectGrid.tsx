"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MacBookMockup } from "@/components/mockups/MacBookMockup";
import { BrowserWindow } from "@/components/mockups/BrowserWindow";

gsap.registerPlugin(ScrollTrigger);

interface GridItem {
  id: string;
  mockupType: "macbook" | "browser";
  label: string;
  url: string;
  videoUrl: string;
}

export function Section02Grid() {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);

  const items: GridItem[] = [
    { id: "landing", mockupType: "browser", label: "Landing Page", url: "", videoUrl: "/videos/2.mp4" },
    { id: "dashboard", mockupType: "macbook", label: "Real-Time Analytics", url: "", videoUrl: "/videos/3.mp4" },
    { id: "ecommerce", mockupType: "browser", label: "Full-Stack Platform", url: "", videoUrl: "/videos/4.mp4" },
    { id: "saas", mockupType: "macbook", label: "SaaS Dashboard", url: "", videoUrl: "/videos/5.mp4" },
    { id: "portfolio", mockupType: "browser", label: "Custom Web App", url: "", videoUrl: "/videos/6.mp4" },
    { id: "mobile", mockupType: "macbook", label: "Interactive UI", url: "", videoUrl: "/videos/7.mp4" },
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
      { scale: 0.95, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        stagger: 0.1,
        duration: 0.6,
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
    <section ref={sectionRef} id="section-2" className="min-h-screen md:h-screen flex items-center justify-center relative py-12 md:py-0" style={{ background: "#F8F9FA" }}>
      <div className="w-full max-w-7xl mx-auto px-4 md:px-16">
        <div ref={titleRef} className="mb-8 md:mb-16 text-center">
          <h2 style={{ fontSize: "clamp(28px, 6vw, 56px)", fontWeight: 700, lineHeight: 1.2, letterSpacing: "-0.01em", color: "#000000", marginBottom: "16px" }}>
            Real Projects, <span style={{ color: "#0040C8" }}>Real Results</span>
          </h2>
        </div>

        <div ref={gridRef} className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8">
          {items.map((item) => (
            <div key={item.id} className="flex flex-col items-center gap-4">
              <div className="w-full">
                {item.mockupType === "browser" ? (
                  <BrowserWindow videoUrl={item.videoUrl} url={item.url} />
                ) : (
                  <MacBookMockup videoUrl={item.videoUrl} />
                )}
              </div>
              <span
                className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium"
                style={{ background: "rgba(0, 64, 200, 0.05)", color: "#0040C8" }}
              >
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
