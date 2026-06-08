"use client";

import { ReactLenis, useLenis } from "lenis/react";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

/**
 * Resets the smoothed scroll position to the top on client-side navigation.
 * Next.js App Router keeps the page alive between routes, so without this
 * Lenis would carry the previous scroll offset into the new page.
 */
function ScrollReset() {
  const pathname = usePathname();
  const lenis = useLenis();

  useEffect(() => {
    lenis?.scrollTo(0, { immediate: true });
  }, [pathname, lenis]);

  return null;
}

/**
 * Wraps the app in Lenis smooth scrolling (document/window scroll).
 *
 * - `lerp: 0.09` defines the feel: lower is floatier, higher is snappier.
 * - Honors `prefers-reduced-motion`: when set, Lenis is never created and
 *   native scrolling is left untouched.
 * - Lenis scrolls the real document (no transforms), so `position: sticky`,
 *   `IntersectionObserver`, and anchor links keep working.
 */
export default function SmoothScrolling({
  children,
}: {
  children: React.ReactNode;
}) {
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReduceMotion(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  if (reduceMotion) return <>{children}</>;

  return (
    <ReactLenis
      root
      options={{ lerp: 0.09, wheelMultiplier: 1, smoothWheel: true }}
    >
      <ScrollReset />
      {children}
    </ReactLenis>
  );
}
