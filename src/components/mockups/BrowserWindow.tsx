"use client";
import { cn } from "@/lib/utils";
import React, { useRef, useEffect } from "react";

export function BrowserWindow({ videoUrl, url = "yourproject.com", className }: { videoUrl: string; url?: string; className?: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  }, []);

  return (
    <div
      className={cn("overflow-hidden rounded-xl", className)}
      style={{ boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08), 0 20px 60px rgba(0, 0, 0, 0.06)" }}
    >
      <div className="flex h-10 items-center gap-3 border-b border-[#E5E5E5] bg-[#F8F9FA] px-4">
        <div className="flex gap-1.5">
          <div className="h-3 w-3 rounded-full bg-[#FF5F57]" />
          <div className="h-3 w-3 rounded-full bg-[#FFBD2E]" />
          <div className="h-3 w-3 rounded-full bg-[#28CA41]" />
        </div>
        <div className="flex flex-1 items-center gap-2 rounded-md bg-white px-3 py-1.5 border border-[#E5E5E5]">
          <svg className="h-3 w-3 text-[#28CA41]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
          <span className="text-xs text-[#666666]">{url}</span>
        </div>
      </div>
      <div className="bg-white">
        <video ref={videoRef} className="w-full" autoPlay loop muted playsInline>
          <source src={videoUrl} type="video/mp4" />
        </video>
      </div>
    </div>
  );
}
