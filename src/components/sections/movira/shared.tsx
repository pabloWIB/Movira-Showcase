"use client";
import { useEffect, RefObject } from "react";
import { Montserrat } from "next/font/google";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";
import { Android } from "@/components/ui/android";
import { Safari } from "@/components/ui/safari";
import {
  DriverScreen,
  SAFARI_SCREENS,
  type SafariScreenKey,
} from "./FramedScreens";

gsap.registerPlugin(ScrollTrigger);

export const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});
export const ACCENT = "#0A0A0A";
export const MUTED = "#71717A";
export const TEXT_SIZE = "clamp(21px, 4.39vw, 47px)";

/* The device frames wrap a hand-built JSX screen, not a screenshot or a video.
   They are decorative illustrations of the product, so the frame is hidden from
   assistive tech and the section's own heading carries the meaning. */

export function AndroidFrame({ className }: { className?: string }) {
  return (
    <div aria-hidden="true">
      <Android screen={<DriverScreen />} className={cn("h-auto w-[240px]", className)} />
    </div>
  );
}

export function SafariFrame({
  url,
  screen,
  className,
}: {
  url?: string;
  screen: SafariScreenKey;
  className?: string;
}) {
  const Screen = SAFARI_SCREENS[screen];
  return (
    <div aria-hidden="true">
      <Safari screen={<Screen />} url={url} className={cn("w-full", className)} />
    </div>
  );
}

export function AccentTitle({
  text,
  className = "",
}: {
  text: string;
  className?: string;
}) {
  const words = text.split(" ");
  return (
    <h2
      className={`text-center ${className}`}
      style={{
        fontSize: TEXT_SIZE,
        fontWeight: 600,
        lineHeight: 1.12,
        letterSpacing: "-0.03em",
        color: MUTED,
        fontFamily: montserrat.style.fontFamily,
      }}
    >
      {words.map((word, i, arr) => {
        const isLast = i === arr.length - 1;
        return (
          <span key={i} style={isLast ? { color: ACCENT } : undefined}>
            {word}
            {!isLast && " "}
          </span>
        );
      })}
    </h2>
  );
}

export function FadeTop({ bg }: { bg: string }) {
  return (
    <div
      className="absolute inset-x-0 top-0 h-40 pointer-events-none"
      style={{
        background: `linear-gradient(to bottom, ${bg} 0%, transparent 100%)`,
        zIndex: 2,
      }}
    />
  );
}

export function useSlideEntrance(
  sectionRef: RefObject<HTMLElement | null>,
  mockupRef: RefObject<HTMLElement | null> | null
) {
  useEffect(() => {
    const s = sectionRef.current;
    const m = mockupRef?.current ?? null;
    if (!s || !m) return;

    gsap.fromTo(
      m,
      { scale: 0.93, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 1.0,
        delay: 0.18,
        ease: "power3.out",
        scrollTrigger: {
          trigger: s,
          start: "top 72%",
          toggleActions: "play none none reverse",
        },
      }
    );
  }, [sectionRef, mockupRef]);
}
