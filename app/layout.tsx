import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Script from "next/script";

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
        <Script id="google-tag-manager" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-K3TVZQ2T');
          `}
        </Script>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/logo/coalshift_logo_favicon-color.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/logo/coalshift_logo_favicon-color.svg" type="image/svg+xml" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#ffffff" />
        <meta name="format-detection" content="telephone=no" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <noscript>
          <iframe 
            src="https://www.googletagmanager.com/ns.html?id=GTM-K3TVZQ2T"
            height="0" 
            width="0" 
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        {children}
      </body>
    </html>
  );
}
