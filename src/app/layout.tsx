import type { Metadata } from "next";
import { Caveat, EB_Garamond } from "next/font/google";
import Navbar from "@/components/Navbar";
import "./globals.css";

const serifBody = EB_Garamond({
  variable: "--font-serif-body",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const scriptLogo = Caveat({
  variable: "--font-script-logo",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Why Eat",
  description:
    "Why Eat explores the emotional and psychological relationship with food.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${serifBody.variable} ${scriptLogo.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white text-neutral-900 font-sans">
        <Navbar />
        <main className="flex-1">{children}</main>
      </body>
    </html>
  );
}
