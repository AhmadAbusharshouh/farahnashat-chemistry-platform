import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import "./globals.css";
import { TopLoadingBar } from "@/components/TopLoadingBar";
import { Navbar, Footer } from "@/components/Navigation";
import { Suspense } from "react";

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-cairo",
  display: "swap",
});

export const metadata: Metadata = {
  title: "منصة الكيمياء التفاعلية | أ. فرح نشأت - المدرسة الإسلامية الحديثة إربد (حكما)",
  description: "المنصة التعليمية الشاملة والمختبر الافتراضي للكيمياء - تحضير الحصة النموذجية لدرس الحموض والقواعد من منهاج الصف التاسع (كولينز).",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" className={cairo.variable}>
      <body className="bg-slate-50 text-slate-900 min-h-screen flex flex-col antialiased selection:bg-emerald-100 selection:text-emerald-900">
        <Suspense fallback={null}>
          <TopLoadingBar />
        </Suspense>
        <Navbar />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
