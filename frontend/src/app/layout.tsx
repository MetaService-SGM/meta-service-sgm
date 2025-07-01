
import type { Metadata } from "next";
import { Geist, Geist_Mono, Nunito } from "next/font/google";
import "./reset.css";
import "./globals.css";
import { PageTransitionLoader } from "@/components/ui/page-transition-loader";
import { Toaster } from "react-hot-toast";
import AuthGuard from "@/components/utils/AuthGuard";

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SGM",
  description: "Sistema de Gerenciamento e Manutenção",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body
        className={`
          ${geistSans.variable}
          ${geistMono.variable}
          ${nunito.variable}
          antialiased
        `}
      >
        <Toaster position="top-right" />
        <PageTransitionLoader />
        <AuthGuard>{children}</AuthGuard>
      </body>
    </html>
  );
}
