"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MacBookMockup } from "@/components/mockups/MacBookMockup";
import { StatBadge } from "@/components/shared/StatBadge";
import { Award, Star, Clock } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const VIDEO_URL = "https://google.com";

export function Section04Stats() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const video = videoRef.current;
    const stats = statsRef.current;

    if (!section || !video || !stats) return;

    gsap.fromTo(
      video,
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
      stats.children,
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.1,
        duration: 0.6,
        delay: 0.3,
        ease: "power3.out",
        scrollTrigger: {
          trigger: stats,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      }
    );
  }, []);

  return (
    <div
      ref={sectionRef}
      className="scroll-section"
      id="section-4"
      style={{ background: "linear-gradient(135deg, #0040C8 0%, #0028A0 100%)" }}
    >
      <div className="w-full max-w-7xl mx-auto px-16 py-32">
        {/* MacBook */}
        <div ref={videoRef} className="mb-16 flex justify-center">
          <MacBookMockup videoUrl={VIDEO_URL} className="w-[80%]" />
        </div>

        {/* Stats */}
        <div ref={statsRef} className="flex justify-center gap-8">
          <StatBadge icon={Award} value="50+" label="Projects Completed" />
          <StatBadge icon={Star} value="5.0" label="Average Rating" />
          <StatBadge icon={Clock} value="48h" label="Delivery Time" />
        </div>
      </div>
    </div>
  );
}
