import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import { alHurraFont } from "@/lib/fonts";
import "./globals.css";
import { TopLoadingBar } from "@/components/TopLoadingBar";
import { Navbar, Footer } from "@/components/Navigation";
import { LanguageProvider } from "@/lib/LanguageContext";
import { Suspense } from "react";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata: Metadata = {
  title: "أ. فرح نشأت | معلمة الكيمياء - المدرسة الإسلامية الحديثة (إربد)",
  description: "الملف التعليمي والتحضيري للحصة النموذجية والمقابلة الشخصية للأستاذة فرح نشأت - كيمياء الصف التاسع (منهاج كولينز).",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" className={`${alHurraFont.variable} ${outfit.variable}`}>
      <body className="bg-slate-50 text-slate-900 min-h-screen flex flex-col antialiased selection:bg-emerald-100 selection:text-emerald-900">
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
