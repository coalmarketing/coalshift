import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Coalshift | Inteligentní systém pro plánování směn a docházky",
  description: "Automatizujte plánování směn a správu docházky. Ušetřete až 50 hodin měsíčně s cloudovým řešením pro efektivní řízení směn ve výrobě, maloobchodu a hotelnictví.",
  keywords: "plánování směn, docházkový systém, správa směn, automatizace docházky, směnový software, digitální docházka, cloudový docházkový systém, SaaS plánovač směn, plánování směn ve výrobě, směnový software pro hotely",
  openGraph: {
    title: "Coalshift | Inteligentní systém pro plánování směn",
    description: "Automatizujte plánování směn a ušetřete až 50 hodin měsíčně. Cloudové řešení pro efektivní řízení směn.",
    type: "website",
    locale: "cs_CZ",
    siteName: "Coalshift",
  },
  twitter: {
    card: "summary_large_image",
    title: "Coalshift | Plánování směn a docházky",
    description: "Automatizujte plánování směn a ušetřete až 50 hodin měsíčně. Cloudové řešení pro efektivní řízení směn.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  alternates: {
    canonical: "https://coalshift.cz",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="cs">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#ffffff" />
        <meta name="format-detection" content="telephone=no" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
