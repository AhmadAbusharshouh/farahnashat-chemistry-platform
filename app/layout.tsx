import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import { zainFont } from "@/lib/fonts";
import "./globals.css";
import { TopLoadingBar } from "@/components/TopLoadingBar";
import { Navbar, Footer } from "@/components/Navigation";
import { SplashScreen } from "@/components/SplashScreen";
import { LanguageProvider } from "@/lib/LanguageContext";
import { Suspense } from "react";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Farah Nashat | Chemistry Education & Virtual Lab - أ. فرح نشأت",
  description: "Official Chemistry Educational Platform, 3D Interactive Virtual Laboratory, and Concept Guides by Teacher Farah Nashat.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" className={`${zainFont.variable} ${outfit.variable}`}>
      <body className="bg-[#fafbfb] text-slate-900 min-h-screen flex flex-col antialiased selection:bg-emerald-100 selection:text-emerald-900">
        <SplashScreen />
        <LanguageProvider>
          <Suspense fallback={null}>
            <TopLoadingBar />
          </Suspense>
          <Navbar />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
