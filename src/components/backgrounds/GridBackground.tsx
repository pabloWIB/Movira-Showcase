"use client";
import { cn } from "@/lib/utils";
import React, { forwardRef } from "react";

interface GridBackgroundProps {
  children?: React.ReactNode;
  className?: string;
}

export const GridBackground = forwardRef<HTMLDivElement, GridBackgroundProps>(
  function GridBackground({ children, className }, ref) {
    return (
      <div ref={ref} className={cn("relative flex w-full items-center justify-center bg-black", className)}>
        <div className="absolute inset-0 [background-size:40px_40px] [background-image:linear-gradient(to_right,#262626_1px,transparent_1px),linear-gradient(to_bottom,#262626_1px,transparent_1px)]" />
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
        <div className="relative z-20">{children}</div>
      </div>
    );
  }
);
