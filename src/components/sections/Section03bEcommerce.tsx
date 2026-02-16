"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BrowserWindow } from "@/components/mockups/BrowserWindow";
import { IPhoneMockup } from "@/components/mockups/IPhoneMockup";
import { ScrollButton } from "@/components/shared/ScrollButton";

gsap.registerPlugin(ScrollTrigger);

const VIDEO_URL = "https://google.com";

export function Section03bEcommerce() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const browserRef = useRef<HTMLDivElement>(null);
  const phonesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    const browser = browserRef.current;
    const phones = phonesRef.current;

    if (!section || !title || !browser || !phones) return;

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
      browser,
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

    gsap.fromTo(
      phones.children,
      { y: 60, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.12,
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
      id="section-3b"
      className="min-h-screen h-screen flex items-center justify-center bg-white relative"
    >
      <ScrollButton nextSectionId="section-4" />

      <div className="w-full max-w-7xl mx-auto px-16">
        <div ref={titleRef} className="mb-16 text-center">
          <h2 style={{ fontSize: "56px", fontWeight: 700, lineHeight: 1.2, letterSpacing: "-0.01em", color: "#000000", marginBottom: "16px" }}>
            E-Commerce <span style={{ color: "#0040C8" }}>Solutions</span>
          </h2>
          <p style={{ fontSize: "18px", lineHeight: 1.6, color: "#666666", maxWidth: "500px", margin: "0 auto" }}>
            Conversion-optimized storefronts across every device.
          </p>
        </div>

        <div ref={browserRef} className="mb-10">
          <BrowserWindow videoUrl={VIDEO_URL} url="premium-store.com" className="w-[85%] mx-auto" />
        </div>

        {/* <div ref={phonesRef} className="flex justify-center items-center gap-6">
          <IPhoneMockup videoUrl={VIDEO_URL} />
          <IPhoneMockup videoUrl={VIDEO_URL} />
          <IPhoneMockup videoUrl={VIDEO_URL} />
        </div> */}
      </div>
    </section>
  );
}
