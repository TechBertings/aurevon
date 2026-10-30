import type { Metadata } from "next";
import { Fraunces, Jost } from "next/font/google";
import "./globals.css";
import Navbar from "./components/navbar";
import Footer from "./components/footer";

const display = Fraunces({ subsets: ["latin"], variable: "--font-display" });
const jost = Jost({ subsets: ["latin"], variable: "--font-jost" });

export const metadata: Metadata = {
  title: "Aurevon Global Partners",
  description: "Property investment and residency opportunities.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${display.variable} ${jost.variable}`}>
      <body
        suppressHydrationWarning
        className="bg-stone-50 font-[family-name:var(--font-jost)] text-slate-800 antialiased"
      >
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}