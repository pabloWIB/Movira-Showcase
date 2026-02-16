"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MacBookMockup } from "@/components/mockups/MacBookMockup";
import { BrowserWindow } from "@/components/mockups/BrowserWindow";

gsap.registerPlugin(ScrollTrigger);

const VIDEO_URL = "https://google.com";

interface GridItem {
  id: string;
  mockupType: "macbook" | "browser";
  label: string;
  url: string;
}

export function Section02Grid() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);

  const items: GridItem[] = [
    { id: "landing", mockupType: "browser", label: "Landing Page", url: "client-site.com" },
    { id: "dashboard", mockupType: "macbook", label: "Dashboard", url: "" },
    { id: "ecommerce", mockupType: "browser", label: "E-commerce", url: "shop-demo.com" },
    { id: "saas", mockupType: "macbook", label: "SaaS", url: "" },
    { id: "portfolio", mockupType: "browser", label: "Portfolio", url: "portfolio-demo.com" },
    { id: "mobile", mockupType: "macbook", label: "Mobile App", url: "" },
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
    <div ref={sectionRef} className="scroll-section" id="section-2" style={{ background: "#F8F9FA" }}>
      <div className="w-full max-w-7xl mx-auto px-16 py-32">
        {/* Title */}
        <div ref={titleRef} className="mb-16 text-center">
          <h2 style={{ fontSize: "56px", fontWeight: 700, lineHeight: 1.2, letterSpacing: "-0.01em", color: "#000000", marginBottom: "16px" }}>
            Real Projects, <span style={{ color: "#0040C8" }}>Real Results</span>
          </h2>
          <p style={{ fontSize: "18px", lineHeight: 1.6, color: "#666666", maxWidth: "500px", margin: "0 auto" }}>
            A selection of production-ready applications built for real clients.
          </p>
        </div>

        {/* 2x3 Grid */}
        <div ref={gridRef} className="grid grid-cols-3 gap-8">
          {items.map((item) => (
            <div key={item.id} className="flex flex-col items-center gap-4">
              <div className="w-full">
                {item.mockupType === "browser" ? (
                  <BrowserWindow videoUrl={VIDEO_URL} url={item.url} />
                ) : (
                  <MacBookMockup videoUrl={VIDEO_URL} />
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
    </div>
  );
}
