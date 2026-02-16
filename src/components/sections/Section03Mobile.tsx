"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { IPhoneMockup } from "@/components/mockups/IPhoneMockup";
import { ScrollButton } from "@/components/shared/ScrollButton";

gsap.registerPlugin(ScrollTrigger);

const VIDEO_URL = "https://google.com";

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
    <section ref={sectionRef} id="section-4" className="min-h-screen h-screen flex items-center justify-center bg-white relative">
      <ScrollButton nextSectionId="section-4-split" />

      <div className="w-full max-w-7xl mx-auto px-16">
        <h2
          ref={titleRef}
          className="text-center mb-20"
          style={{ fontSize: "48px", fontWeight: 700, lineHeight: 1.2, letterSpacing: "-0.01em", color: "#000000" }}
        >
          Mobile Experiences
        </h2>

        <div ref={phonesRef} className="flex justify-center items-center gap-8">
          {[1, 2, 3].map((i) => (
            <div key={i}>
              <IPhoneMockup videoUrl={VIDEO_URL} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
