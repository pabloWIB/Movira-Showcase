"use client";
import { LucideIcon } from "lucide-react";

export function StatBadge({ icon: Icon, value, label }: { icon: LucideIcon; value: string; label: string }) {
  return (
    <div
      className="flex flex-col items-center gap-2 rounded-2xl bg-white px-10 py-8 text-center"
      style={{ boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)" }}
    >
      <Icon className="h-6 w-6 text-[#0040C8] mb-1" />
      <p className="text-5xl font-bold text-black" style={{ letterSpacing: "-0.02em" }}>{value}</p>
      <p className="text-sm font-medium text-[#666666]">{label}</p>
    </div>
  );
}
