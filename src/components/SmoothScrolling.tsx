"use client";

import { ReactLenis, useLenis } from "lenis/react";
import { useCallback, useEffect, useSyncExternalStore } from "react";
import { usePathname } from "next/navigation";

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

function ScrollReset() {
  const pathname = usePathname();
  const lenis = useLenis();

  useEffect(() => {
    lenis?.scrollTo(0, { immediate: true });
  }, [pathname, lenis]);

  return null;
}

/* Subscribes to the media query itself rather than mirroring it into state, so
   the server render and the first client render agree on `false` and the value
   updates without an extra render pass. */
function usePrefersReducedMotion() {
  const subscribe = useCallback((onChange: () => void) => {
    const mq = window.matchMedia(REDUCED_MOTION_QUERY);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(REDUCED_MOTION_QUERY).matches,
    () => false
  );
}

export default function SmoothScrolling({
  children,
}: {
  children: React.ReactNode;
}) {
  const reduceMotion = usePrefersReducedMotion();

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
