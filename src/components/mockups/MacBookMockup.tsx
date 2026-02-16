"use client";
import { cn } from "@/lib/utils";
import React, { useRef, useEffect } from "react";

interface MacBookMockupProps {
  videoUrl: string;
  className?: string;
  autoPlay?: boolean;
}

export function MacBookMockup({ videoUrl, className, autoPlay = true }: MacBookMockupProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current && autoPlay) {
      videoRef.current.play().catch(() => {});
    }
  }, [autoPlay]);

  return (
    <div className={cn("gpu-accelerated w-full max-w-5xl", className)}>
      <div
        className="relative rounded-xl p-3"
        style={{
          background: "linear-gradient(to bottom, #2d2d2d, #1a1a1a)",
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08), 0 20px 60px rgba(0, 0, 0, 0.06)",
        }}
      >
        <div className="mx-auto mb-2 h-1.5 w-16 rounded-full bg-black/30" />
        <div className="overflow-hidden rounded-lg bg-black">
          <video ref={videoRef} className="w-full" autoPlay={autoPlay} loop muted playsInline>
            <source src={videoUrl} type="video/mp4" />
          </video>
        </div>
      </div>
      <div
        className="-mt-1 h-5 rounded-b-xl"
        style={{ background: "linear-gradient(to bottom, #3a3a3a, #2d2d2d)" }}
      />
    </div>
  );
}
