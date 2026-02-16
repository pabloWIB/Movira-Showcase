"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MacBookMockup } from "@/components/mockups/MacBookMockup";
import { ScrollButton } from "@/components/shared/ScrollButton";

gsap.registerPlugin(ScrollTrigger);

const VIDEO_URL = "https://google.com";

export function Section01Hero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const video = videoRef.current;
    const title = titleRef.current;

    if (!section || !video || !title) return;

    gsap.fromTo(
      video,
      { scale: 0.9, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top 70%",
          toggleActions: "play none none reverse",
        },
      }
    );

    gsap.fromTo(
      title,
      { y: 50, opacity: 0 },
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
    <section ref={sectionRef} id="section-1" className="min-h-screen h-screen flex items-center justify-center bg-white relative">
      <ScrollButton nextSectionId="section-2" />

      <div className="w-full max-w-7xl mx-auto px-16">
        <div ref={titleRef} className="mb-16 text-center">
          <h1
            className="mb-6"
            style={{ fontSize: "72px", fontWeight: 700, lineHeight: 1.1, letterSpacing: "-0.02em", color: "#000000" }}
          >
            <span style={{ color: "#0040C8" }}>Premium</span> Web Development
            <br />
            Building Products That Convert
          </h1>
          <p style={{ fontSize: "18px", fontWeight: 400, lineHeight: 1.6, color: "#666666", maxWidth: "600px", margin: "0 auto" }}>
            Fast, modern, and functional web experiences for startups and agencies.
          </p>
        </div>

        <div ref={videoRef} className="flex justify-center">
          <MacBookMockup videoUrl={VIDEO_URL} className="w-[70%]" />
        </div>
      </div>
    </section>
  );
}
