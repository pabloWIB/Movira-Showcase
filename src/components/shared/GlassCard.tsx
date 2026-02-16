"use client";
import { cn } from "@/lib/utils";

export function GlassCard({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("rounded-2xl bg-white border border-[#E5E5E5] p-6", className)} style={{ boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)" }}>
      {children}
    </div>
  );
}
