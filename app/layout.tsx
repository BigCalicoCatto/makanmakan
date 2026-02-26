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
  title: "Makan Makan — Makanan Jasad & Jiwa",
  description:
    "Tak tahu nak makan apa hari ini? Biar Makan Makan pilihkan untuk kamu — berserta sajian keinsafan dan kesyukuran untuk jiwa. Makanan jasad & makanan jiwa, dalam satu tempat.",
  keywords: [
    "makan makan",
    "food randomizer",
    "cadangan makanan",
    "nak makan apa",
    "pemilih makanan",
    "nasihat harian",
    "makanan jiwa",
    "fatcalico",
  ],
  authors: [{ name: "Fat Calico & Co" }],
  creator: "Fat Calico & Co",
  metadataBase: new URL("https://makanmakan.vercel.app"),

  openGraph: {
    title: "Makan Makan — Makanan Jasad & Jiwa",
    description:
      "Tak tahu nak makan apa hari ini? Biar Makan Makan pilihkan untuk kamu — berserta nasihat jiwa yang menyejukkan hati.",
    url: "https://makanmakan.vercel.app",
    siteName: "Makan Makan",
    images: [
      {
        url: "/thinking.webp",
        width: 1000,
        height: 1400,
        alt: "Makan Makan — Makanan Jasad & Jiwa",
      },
    ],
    locale: "ms_MY",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Makan Makan — Makanan Jasad & Jiwa",
    description:
      "Tak tahu nak makan apa? Biar Makan Makan pilihkan — dengan nasihat jiwa sekali. 🍊🌙",
    images: ["/thinking.webp"],
    creator: "@fatcalico",
  },

  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ms">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
