import { montserrat } from "@/components/sections/movira/shared";

export function SiteFooter() {
  return (
    <footer
      className={`site-footer border-t border-[#E5E5E5] bg-white px-6 py-10 ${montserrat.className}`}
    >
      <p className="text-center text-sm leading-relaxed text-[#71717A]">
        Built by{" "}
        <a
          href="https://wib.digital"
          rel="noopener"
          className="font-medium text-[#0A0A0A] underline underline-offset-4 decoration-[#D4D4D8] transition-colors duration-200 hover:decoration-[#0A0A0A] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0A0A0A]"
        >
          wib.digital
        </a>{" "}
        —{" "}
        <a
          href="https://www.fiverr.com/pablonietop"
          rel="noopener"
          className="font-medium text-[#0A0A0A] underline underline-offset-4 decoration-[#D4D4D8] transition-colors duration-200 hover:decoration-[#0A0A0A] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0A0A0A]"
        >
          hire me on Fiverr
        </a>
      </p>
    </footer>
  );
}
