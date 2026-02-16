"use client";
import { ChevronDown } from "lucide-react";

interface ScrollButtonProps {
  nextSectionId: string;
}

export function ScrollButton({ nextSectionId }: ScrollButtonProps) {
  const handleScroll = () => {
    const nextSection = document.getElementById(nextSectionId);

    if (nextSection) {
      const rect = nextSection.getBoundingClientRect();
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const targetPosition = rect.top + scrollTop;

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <button
      onClick={handleScroll}
      className="absolute bottom-8 left-1/2 -translate-x-1/2 z-50 flex items-center justify-center w-12 h-12 bg-[#0040C8] text-white rounded-full shadow-lg hover:scale-110 transition-transform duration-300 hover:shadow-xl animate-bounce"
      aria-label="Scroll to next section"
    >
      <ChevronDown className="w-6 h-6" />
    </button>
  );
}
