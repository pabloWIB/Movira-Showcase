"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MacBookMockup } from "@/components/mockups/MacBookMockup";
import { IPhoneMockup } from "@/components/mockups/IPhoneMockup";
import { ScrollButton } from "@/components/shared/ScrollButton";

gsap.registerPlugin(ScrollTrigger);

const VIDEO_URL = "https://google.com";

export function Section04Split() {
  const sectionRef = useRef<HTMLElement>(null);
  const macbookRef = useRef<HTMLDivElement>(null);
  const iphoneRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const macbook = macbookRef.current;
    const iphone = iphoneRef.current;
    const text = textRef.current;

    if (!section || !macbook || !iphone || !text) return;

    gsap.fromTo(
      macbook,
      { x: -100, opacity: 0 },
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
      iphone,
      { x: 100, opacity: 0 },
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
      text,
      { y: 20, opacity: 0 },
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
    <section ref={sectionRef} id="section-4-split" className="min-h-screen h-screen flex items-center justify-center relative" style={{ background: "#F8F9FA" }}>
      <ScrollButton nextSectionId="section-5a" />

      <div className="w-full max-w-7xl mx-auto px-16">
        <div className="flex items-center justify-center gap-16">
          <div ref={macbookRef} className="w-[60%]">
            <MacBookMockup videoUrl={VIDEO_URL} />
          </div>

        </div>

        <p
          ref={textRef}
          className="text-center mt-12"
          style={{ fontSize: "32px", fontWeight: 600, color: "#666666" }}
        >
          Responsive Design
        </p>
      </div>
    </section>
  );
}
