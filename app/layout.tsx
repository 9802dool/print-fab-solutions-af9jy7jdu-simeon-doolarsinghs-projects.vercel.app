import type { Metadata } from "next";
import { DM_Sans, Outfit } from "next/font/google";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Print Fab Solutions | Sublimation Sportswear & DTF Printing",
    template: "%s | Print Fab Solutions",
  },
  description:
    "Design and print sublimation sports jerseys, shorts, and pants. Professional DTF printing for teams, clubs, and brands.",
  keywords: [
    "sublimation printing",
    "sports jerseys",
    "DTF print",
    "custom sportswear",
    "team kits",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${dmSans.variable} ${outfit.variable}`}>
      <body className="min-h-screen font-sans">
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
