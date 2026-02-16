"use client";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

export function CTAButton({ icon: Icon, children, variant = "primary", className }: { icon?: LucideIcon; children: React.ReactNode; variant?: "primary" | "secondary"; className?: string }) {
  const variants = {
    primary: "bg-[#0040C8] text-white hover:bg-[#0028A0]",
    secondary: "bg-white border-2 border-[#0040C8] text-[#0040C8] hover:bg-[#0040C8]/5",
  };

  return (
    <button className={cn("inline-flex items-center justify-center gap-3 rounded-xl px-10 py-4 text-lg font-semibold transition-all hover:-translate-y-0.5", variants[variant], className)}>
      {Icon && <Icon className="h-5 w-5" />}
      <span>{children}</span>
    </button>
  );
}
