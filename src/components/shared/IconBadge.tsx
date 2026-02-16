"use client";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

export function IconBadge({ icon: Icon, label, className }: { icon: LucideIcon; label: string; className?: string }) {
  return (
    <div className={cn("inline-flex items-center gap-3 px-6 py-3 bg-white border-2 border-[#0040C8] rounded-full", className)}>
      <Icon className="h-4 w-4 text-[#0040C8]" strokeWidth={2.5} />
      <span className="text-sm font-semibold text-[#0040C8]">{label}</span>
    </div>
  );
}
