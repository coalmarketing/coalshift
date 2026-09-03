import type { Metadata, Viewport } from "next";
import "./globals.css";
import Script from "next/script";
import { themeScript } from "./components/theme/themeScript";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
};

const HOME_TITLE = "coalshift | AI plánovač směn a docházky";
const HOME_DESC =
  "Plánujte směny s pomocí AI, spravujte nepřítomnosti a mějte přehled o svém týmu. Vyzkoušejte coalshift na 14 dní zdarma.";

/**
 * Layout metadata carries only `metadataBase` plus a plain title/description
 * fallback (used by routes with no own metadata, e.g. the built-in 404). Every
 * content route owns its canonical, Open Graph and Twitter via `app/lib/seo.ts`
 * (Phase 03) — nothing here is inherited as a per-route canonical or social card.
 */
export const metadata: Metadata = {
  metadataBase: new URL("https://coalshift.cz"),
  title: HOME_TITLE,
  description: HOME_DESC,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="cs" suppressHydrationWarning>
      <head>
        {/* Render-blocking theme bootstrap — sets the theme class before paint. */}
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />

        <Script id="google-tag-manager" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-NQDZKVLF');
          `}
        </Script>
        <link rel="icon" href="/favicon/favicon.ico" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png" />
        <link rel="apple-touch-icon" href="/favicon/apple-touch-icon.png" />
        <link rel="manifest" href="/favicon/site.webmanifest" />
        <meta name="format-detection" content="telephone=no" />

        {/* Local fonts with Czech (Latin Extended) glyph coverage. */}
        <link
          rel="preload"
          as="font"
          type="font/woff2"
          href="/fonts/inter-v20-latin-ext-regular.woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          as="font"
          type="font/woff2"
          href="/fonts/inter-v20-latin-ext-600.woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          as="font"
          type="font/woff2"
          href="/fonts/lekton-v21-latin-ext-700.woff2"
          crossOrigin="anonymous"
        />
      </head>
      <body>
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-NQDZKVLF"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        {children}
      </body>
    </html>
  );
}
