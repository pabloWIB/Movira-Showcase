"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MacBookMockup } from "@/components/mockups/MacBookMockup";
import { BrowserWindow } from "@/components/mockups/BrowserWindow";

gsap.registerPlugin(ScrollTrigger);

const VIDEO_URL = "/videos/8.mp4";

export function Section03aDashboards() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const mainRef = useRef<HTMLDivElement>(null);
  const sideRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    const main = mainRef.current;
    const side = sideRef.current;

    if (!section || !title || !main || !side) return;

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
      main,
      { x: -80, opacity: 0 },
      {
        x: 0,
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
      side.children,
      { x: 80, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        stagger: 0.15,
        duration: 0.8,
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
      id="section-3a"
      className="min-h-screen h-screen flex items-center justify-center relative"
      style={{ background: "#FBFBFB" }}
    >
      <div className="w-full max-w-7xl mx-auto px-16">
        <div ref={titleRef} className="mb-16 text-center">
          <h2 style={{ fontSize: "56px", fontWeight: 700, lineHeight: 1.2, letterSpacing: "-0.01em", color: "#000000", marginBottom: "16px" }}>
            Data-Driven <span style={{ color: "#0040C8" }}>Dashboards</span>
          </h2>
          <p style={{ fontSize: "18px", lineHeight: 1.6, color: "#666666", maxWidth: "500px", margin: "0 auto" }}>
            Real-time analytics and admin panels built for scale.
          </p>
        </div>

        <BrowserWindow videoUrl={VIDEO_URL} url="admin-panel.io" />

        {/* <div className="flex items-center gap-10">
          <div ref={mainRef} className="w-[62%]">
            <MacBookMockup videoUrl={VIDEO_URL} />
          </div>


          <div ref={sideRef} className="w-[38%] flex flex-col gap-6">
            <BrowserWindow videoUrl={VIDEO_URL} url="analytics.app" />
          </div>
        </div> */}
      </div>
    </section>
  );
}
