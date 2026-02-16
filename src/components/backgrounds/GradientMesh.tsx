"use client";
import { cn } from "@/lib/utils";
import React, { forwardRef } from "react";

export const GradientMesh = forwardRef<HTMLDivElement, { children?: React.ReactNode; className?: string }>(
  function GradientMesh({ children, className }, ref) {
    return (
      <div ref={ref} className={cn("relative w-full bg-background", className)}>
        <div className="absolute inset-0 bg-[radial-gradient(at_40%_20%,rgba(124,58,237,0.3)_0%,transparent_50%),radial-gradient(at_80%_0%,rgba(0,217,255,0.3)_0%,transparent_50%),radial-gradient(at_0%_50%,rgba(16,185,129,0.3)_0%,transparent_50%)]" />
        <div className="relative z-10">{children}</div>
      </div>
    );
  }
);
