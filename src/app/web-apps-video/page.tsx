"use client";
import { useEffect, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { WAV01Hero } from "@/components/web-apps-video/WAV01Hero";
import { WAV02CoreOffer } from "@/components/web-apps-video/WAV02CoreOffer";
import { WAV03Dashboards } from "@/components/web-apps-video/WAV03Dashboards";
import { WAV04Projects } from "@/components/web-apps-video/WAV04Projects";
import { WAV05CTA } from "@/components/web-apps-video/WAV05CTA";

gsap.registerPlugin(ScrollTrigger);

const SECTION_IDS = ["wav-1", "wav-2", "wav-3", "wav-4", "wav-5"];

export default function WebAppsVideoPage() {
  const scrollToNextSection = useCallback(() => {
    const scrollY = window.scrollY;
    for (const id of SECTION_IDS) {
      const el = document.getElementById(id);
      if (!el) continue;
      const top = el.getBoundingClientRect().top + scrollY;
      if (top > scrollY + 10) {
        window.scrollTo({ top, behavior: "smooth" });
        return;
      }
    }
  }, []);

  useEffect(() => {
    ScrollTrigger.refresh();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "q" || e.key === "Q") {
        scrollToNextSection();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [scrollToNextSection]);

  return (
    <main className="relative">
      <WAV01Hero />
      <WAV02CoreOffer />
      <WAV03Dashboards />
      <WAV04Projects />
      <WAV05CTA />
    </main>
  );
}
