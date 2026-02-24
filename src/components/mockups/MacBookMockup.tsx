"use client";
import React, { useRef, useEffect } from "react";

interface MacBookMockupProps {
  videoUrl: string;
  className?: string;
}

export function MacBookMockup({ videoUrl, className = "" }: MacBookMockupProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      className={`overflow-hidden rounded-xl ${className}`}
      style={{ boxShadow: "0 4px 20px rgba(0, 0, 0, 0.3), 0 20px 60px rgba(0, 0, 0, 0.25)" }}
    >
      <div className="flex h-8 items-center gap-3 border-b border-[#1a1a1a] bg-[#2d2d2d] px-4">
        <div className="flex gap-1.5">
          <div className="h-3 w-3 rounded-full bg-[#FF5F57]" />
          <div className="h-3 w-3 rounded-full bg-[#FFBD2E]" />
          <div className="h-3 w-3 rounded-full bg-[#28CA41]" />
        </div>

        <div className="absolute left-1/2 -translate-x-1/2">
          <div
            className="h-1 w-1 rounded-full"
            style={{
              background: "radial-gradient(circle, #1a3d2e 0%, #0a1a12 70%)",
              boxShadow: "0 0 2px rgba(0, 255, 100, 0.3)",
            }}
          />
        </div>
      </div>

      <div className="relative bg-black">
        <video
          ref={videoRef}
          className="w-full"
          loop
          muted
          playsInline
        >
          <source src={videoUrl} type="video/mp4" />
        </video>

        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background: `
              linear-gradient(
                135deg,
                rgba(255, 255, 255, 0.1) 0%,
                rgba(255, 255, 255, 0.03) 20%,
                transparent 40%,
                transparent 60%,
                rgba(255, 255, 255, 0.02) 80%,
                rgba(255, 255, 255, 0.08) 100%
              )
            `,
          }}
        />
      </div>
    </div>
  );
}
