"use client";
import { useEffect, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Section01Hero } from "@/components/sections/Section01Hero";
import { Section02Grid } from "@/components/sections/Section02ProjectGrid";
import { Section03aDashboards } from "@/components/sections/Section03aDashboards";
import { Section03bEcommerce } from "@/components/sections/Section03bEcommerce";
import { Section03Mobile } from "@/components/sections/Section03Mobile";
import { Section04Split } from "@/components/sections/Section04Split";
import { Section05aMobileFirst } from "@/components/sections/Section05aMobileFirst";
import { Section05Browsers } from "@/components/sections/Section05Browsers";
import { Section06CTA } from "@/components/sections/Section06CTA";
import { Section02Hero } from "@/components/sections/Section02Hero";

gsap.registerPlugin(ScrollTrigger);

const SECTION_IDS = [
  "section-1",
  "section-2",
  "section-3a",
  "section-hero2",
  "section-3b",
  "section-4",
  "section-4-split",
  "section-5a",
  "section-5",
  "section-6",
];

export default function Home() {
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
      <Section01Hero />
      <Section02Grid />
      <Section03aDashboards />
      <Section02Hero />
      <Section03bEcommerce />
      <Section03Mobile />
      <Section04Split />
      <Section05aMobileFirst />
      <Section05Browsers />
      <Section06CTA />
    </main>
  );
}
