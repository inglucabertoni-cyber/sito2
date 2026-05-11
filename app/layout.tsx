import type { Metadata } from "next";
import { Geist, Geist_Mono, Caveat } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.helpforhome.it"),
  title: {
    default: "help for home — Consulenza immobiliare a Milano",
    template: "%s | help for home",
  },
  description:
    "Compra, vendi o ristruttura casa a Milano con la certezza di avere al fianco esperti indipendenti. Perizie, due diligence, valutazioni e ristrutturazioni integrate. Oltre 20.000 perizie. CTU Tribunale di Milano.",
  keywords: [
    "consulenza immobiliare Milano",
    "perizie immobiliari Milano",
    "due diligence immobiliare",
    "acquisto casa Milano",
    "valutazione immobile Milano",
    "CTU tribunale Milano",
    "ristrutturazione casa Milano",
    "perito immobiliare Milano",
    "conformità urbanistica",
    "help for home",
  ],
  authors: [{ name: "Giuliana Roccaro" }],
  creator: "Roccaro e Bertoni",
  openGraph: {
    type: "website",
    locale: "it_IT",
    url: "https://www.helpforhome.it",
    siteName: "help for home",
    title: "help for home — Consulenza immobiliare a Milano",
    description:
      "Compra, vendi o ristruttura casa a Milano con esperti indipendenti. Oltre 20.000 perizie. CTU Tribunale di Milano.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  alternates: {
    canonical: "https://www.helpforhome.it",
    languages: { "it-IT": "https://www.helpforhome.it" },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="it"
      className={`${geistSans.variable} ${geistMono.variable} ${caveat.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
