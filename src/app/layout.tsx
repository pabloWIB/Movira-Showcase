import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Premium Web Development",
  description: "Building products that convert",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
