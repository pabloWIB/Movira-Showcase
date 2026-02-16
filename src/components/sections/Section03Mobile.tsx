"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { IPhoneMockup } from "@/components/mockups/IPhoneMockup";

gsap.registerPlugin(ScrollTrigger);

const VIDEO_URLS = ["/videos/11.mp4", "/videos/12.mp4", "/videos/13.mp4"];

export function Section03Mobile() {
  const sectionRef = useRef<HTMLElement>(null);
  const phonesRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const phones = phonesRef.current;
    const title = titleRef.current;

    if (!section || !phones || !title) return;

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
      phones.children,
      { scale: 0.8, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        stagger: 0.15,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: phones,
          start: "top 70%",
          toggleActions: "play none none reverse",
        },
      }
    );
  }, []);

  return (
    <section ref={sectionRef} id="section-4" className="min-h-screen h-screen flex items-center justify-center relative" style={{ background: "#F8F9FA" }}>
      <div className="w-full max-w-7xl mx-auto px-4 md:px-16">
        <h2
          ref={titleRef}
          className="text-center mb-10 md:mb-20"
          style={{ fontSize: "clamp(24px, 5vw, 48px)", fontWeight: 700, lineHeight: 1.2, letterSpacing: "-0.01em", color: "#000000" }}
        >
          Mobile <span style={{ color: "#0040C8" }}>Experiences</span>
        </h2>

        <div ref={phonesRef} className="flex justify-center items-center gap-4 md:gap-8">
          {VIDEO_URLS.map((url, i) => (
            <div key={i}>
              <IPhoneMockup videoUrl={url} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
