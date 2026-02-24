"use client";
import React, { useRef, useEffect } from "react";

interface IPhoneMockupProps {
  videoUrl: string;
  className?: string;
}

export function IPhoneMockup({ videoUrl, className = "" }: IPhoneMockupProps) {
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
    <div className={`relative ${className}`}>
      <div
        className="relative h-[420px] w-[200px] md:h-[600px] md:w-[290px] rounded-[36px] md:rounded-[52px] p-2 md:p-3"
        style={{
          background: `
            linear-gradient(145deg,
              #3a3a3a 0%,
              #2d2d2d 25%,
              #252525 50%,
              #1f1f1f 75%,
              #1a1a1a 100%
            )
          `,
          boxShadow: `
            0 2px 4px rgba(0, 0, 0, 0.1),
            0 8px 16px rgba(0, 0, 0, 0.15),
            0 16px 32px rgba(0, 0, 0, 0.2),
            0 32px 64px rgba(0, 0, 0, 0.25),
            inset 0 0 0 1px rgba(255, 255, 255, 0.1),
            inset 0 2px 1px rgba(255, 255, 255, 0.05)
          `,
        }}
      >
        <div
          className="absolute right-0 top-24 h-16 w-1 rounded-l-sm"
          style={{
            background: "linear-gradient(to bottom, #4a4a4a, #2a2a2a)",
            boxShadow: "inset 0 1px 2px rgba(0, 0, 0, 0.5)",
          }}
        />

        <div
          className="absolute left-0 top-28 h-12 w-1 rounded-r-sm"
          style={{
            background: "linear-gradient(to bottom, #4a4a4a, #2a2a2a)",
            boxShadow: "inset 0 1px 2px rgba(0, 0, 0, 0.5)",
          }}
        />
        <div
          className="absolute left-0 top-44 h-12 w-1 rounded-r-sm"
          style={{
            background: "linear-gradient(to bottom, #4a4a4a, #2a2a2a)",
            boxShadow: "inset 0 1px 2px rgba(0, 0, 0, 0.5)",
          }}
        />

        <div
          className="relative h-full w-full overflow-hidden rounded-[30px] md:rounded-[44px]"
          style={{ background: "#000" }}
        >
          <video
            ref={videoRef}
            className="h-full w-full object-cover"
            loop
            muted
            playsInline
          >
            <source src={videoUrl} type="video/mp4" />
          </video>

          <div className="pointer-events-none absolute inset-0" />
        </div>
      </div>

      <div
        className="absolute -bottom-8 left-1/2 h-12 w-[70%] -translate-x-1/2 blur-2xl"
        style={{
          background: "radial-gradient(ellipse, rgba(0, 0, 0, 0.5) 0%, transparent 70%)",
        }}
      />
    </div>
  );
}
