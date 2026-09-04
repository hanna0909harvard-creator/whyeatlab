import type { Metadata } from "next";
import { EB_Garamond } from "next/font/google";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";
import "./globals.css";

const serifBody = EB_Garamond({
  variable: "--font-serif-body",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
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
      className={`${serifBody.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white text-neutral-900 font-sans">
        <PageTransition>{children}</PageTransition>
        <Footer />
      </body>
    </html>
  );
}
