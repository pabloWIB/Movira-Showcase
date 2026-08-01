import type { Metadata } from "next";
import Link from "next/link";
import { montserrat } from "@/components/sections/movira/shared";

export const metadata: Metadata = {
  title: "Página no encontrada — Movira",
  description:
    "La dirección que buscas no existe en este sitio. El recorrido por la plataforma logística Movira vive en una sola página: vuelve al inicio para verlo.",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-center gap-6 px-6 text-center ${montserrat.className}`}
    >
      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#71717A]">
        Error 404
      </p>
      <h1
        className="max-w-[18ch] font-semibold tracking-[-0.03em] text-[#0A0A0A]"
        style={{ fontSize: "clamp(28px, 5vw, 48px)", lineHeight: 1.12 }}
      >
        Esta página no existe
      </h1>
      <p className="max-w-[46ch] text-base leading-relaxed text-[#71717A]">
        El recorrido de Movira vive en una sola página. Vuelve al inicio para
        verlo completo.
      </p>
      <Link
        href="/"
        className="mt-2 inline-flex min-h-[44px] items-center rounded-xl bg-[#0A0A0A] px-6 text-[15px] font-semibold text-white transition-colors duration-200 hover:bg-[#262626] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0A0A0A]"
      >
        Volver al inicio
      </Link>
    </main>
  );
}
