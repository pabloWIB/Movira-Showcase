"use client";
import { useEffect } from "react";
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

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  useEffect(() => {
    ScrollTrigger.refresh();

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <main className="relative">
      <Section01Hero />
      <Section02Grid />
      <Section03aDashboards />
      <Section03bEcommerce />
      <Section03Mobile />
      <Section04Split />
      <Section05aMobileFirst />
      <Section05Browsers />
      <Section06CTA />
    </main>
  );
}
