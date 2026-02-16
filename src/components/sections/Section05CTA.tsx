"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CTAButton } from "@/components/shared/CTAButton";
import { Send, ExternalLink } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export function Section05CTA() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const heading = headingRef.current;
    const buttons = buttonsRef.current;
    const badge = badgeRef.current;

    if (!section || !heading || !buttons || !badge) return;

    gsap.fromTo(
      heading,
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
      buttons.children,
      { y: 20, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.1,
        duration: 0.6,
        delay: 0.3,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top 70%",
          toggleActions: "play none none reverse",
        },
      }
    );

    gsap.fromTo(
      badge,
      { opacity: 0 },
      {
        opacity: 1,
        duration: 0.6,
        delay: 0.6,
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
    <div ref={sectionRef} className="scroll-section bg-white" id="section-5">
      <div className="w-full max-w-4xl mx-auto px-16 py-32 text-center">
        {/* Heading */}
        <div ref={headingRef} className="mb-12">
          <h2 style={{ fontSize: "64px", fontWeight: 700, lineHeight: 1.1, letterSpacing: "-0.02em", color: "#000000", marginBottom: "24px" }}>
            Let&apos;s Build <span style={{ color: "#0040C8" }}>Your Project</span>
          </h2>
          <p style={{ fontSize: "18px", lineHeight: 1.6, color: "#666666" }}>
            Fast <span style={{ color: "#0040C8", margin: "0 8px" }}>&bull;</span> Professional <span style={{ color: "#0040C8", margin: "0 8px" }}>&bull;</span> Affordable
          </p>
        </div>

        {/* Buttons */}
        <div ref={buttonsRef} className="flex gap-6 justify-center mb-12">
          <CTAButton icon={Send} variant="primary" className="h-14 text-lg px-12">
            Message Me
          </CTAButton>
          <CTAButton icon={ExternalLink} variant="secondary" className="h-14 text-lg px-12">
            View Portfolio
          </CTAButton>
        </div>

        {/* Badge */}
        <div ref={badgeRef}>
          <span
            className="inline-flex items-center px-6 py-3 rounded-full text-sm font-medium"
            style={{ background: "rgba(0, 64, 200, 0.05)", color: "#0040C8" }}
          >
            Available for new projects &bull; 48h start
          </span>
        </div>
      </div>
    </div>
  );
}
