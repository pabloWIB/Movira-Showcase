"use client";
import { cn } from "@/lib/utils";
import React, { useRef, useEffect } from "react";

export function IPhoneMockup({ videoUrl, className }: { videoUrl: string; className?: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  }, []);

  return (
    <div className={cn("gpu-accelerated", className)}>
      <div
        className="relative h-[520px] w-[250px] rounded-[44px] p-2.5"
        style={{
          background: "linear-gradient(to bottom, #2d2d2d, #1a1a1a)",
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08), 0 20px 60px rgba(0, 0, 0, 0.06)",
        }}
      >
        <div className="absolute left-1/2 top-3 z-10 h-6 w-20 -translate-x-1/2 rounded-full bg-black" />
        <div className="h-full w-full overflow-hidden rounded-[34px] bg-black">
          <video ref={videoRef} className="h-full w-full object-cover" autoPlay loop muted playsInline>
            <source src={videoUrl} type="video/mp4" />
          </video>
        </div>
      </div>
    </div>
  );
}
