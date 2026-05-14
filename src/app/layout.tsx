// ============================================================================
// FILE: app/layout.tsx
// DESCRIPTION: Root Layout & Global Metadata Configuration (RECA Branding)
// ============================================================================
import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

// 1. Inisialisasi Font Utama
const inter = Inter({ subsets: ["latin"] });

// ============================================================================
// VIEWPORT CONFIGURATION (Standar Next.js 14+)
// ============================================================================
export const viewport: Viewport = {
  themeColor: "#0A0F1C", // Warna background utama agar browser bar di HP ikut gelap
  width: "device-width",
  initialScale: 1,
  maximumScale: 1, // Mencegah zoom berlebih di mobile agar UI tidak rusak
};

// ============================================================================
// GLOBAL METADATA & SEO OPTIMIZATION
// ============================================================================
export const metadata: Metadata = {
  // --- Basic SEO ---
  title: {
    default: "RECA | AI Terminal Analyst",
    template: "%s | RECA",
  },
  description:
    "Perusahaan teknologi berbasis AI, data, dan riset khusus untuk industri RECA (Restaurant, Retail F&B, Cafe, Catering). Ambil keputusan bisnis presisi, minimalisir kerugian, dan ekspansi dengan data faktual.",
  keywords: [
    "RECA",
    "AI Terminal Analyst",
    "AI Terminal",
    "Mulai Bisnis F&b",
    "Riset F&B",
    "Data Restoran",
    "Bisnis Kuliner",
    "Konsultan F&B",
    "Strategi Cafe",
    "Business Plan F&B",
    "AI Bisnis",
    "Ekspansi Bisnis",
    "Indonesia"
  ],
  authors: [{ name: "Bil Xander", url: "https://xanderstrategy.vercel.app/" }],
  creator: "Xander Tech System",
  publisher: "RECA by Xander",

  // --- Open Graph (Preview Link untuk WhatsApp, Facebook, LinkedIn) ---
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "https://xanderstrategy.vercel.app/", // Pastikan ganti dengan domain asli lu nanti jika sudah ada
    title: "RECA | AI Terminal Analyst",
    description: "Platform intelijen data & teknologi AI untuk industri F&B. Ambil keputusan presisi dan dominasi pasar Anda tanpa sekadar menebak.",
    siteName: "RECA Intelligence Suite",
    images: [
      {
        url: "/og-image.jpg", // Pastikan file gambar banner ukuran 1200x630px ada di folder /public
        width: 1200,
        height: 630,
        alt: "RECA AI Terminal Preview",
      },
    ],
  },

  // --- Twitter / X Cards ---
  twitter: {
    card: "summary_large_image",
    title: "RECA | AI Terminal Analyst",
    description: "Platform intelijen data & teknologi AI untuk industri F&B. Ambil keputusan presisi dan dominasi pasar Anda tanpa sekadar menebak.",
    images: ["/og-image.jpg"], // Menggunakan gambar yang sama dengan Open Graph
  },

  // --- Konfigurasi Robot Crawler Google ---
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // --- Favicon & App Icons ---
  icons: {
    icon: "/icon.png", // Harus ada file icon.png ukuran 512x512 di folder /public
    shortcut: "/icon.png",
    apple: "/apple-icon.png", // Opsional, untuk icon di home screen iPhone
  },
};

// ============================================================================
// ROOT LAYOUT COMPONENT
// ============================================================================
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className="scroll-smooth">
      <body className={`${inter.className} bg-[#0A0F1C] text-white antialiased`}>
        {children}
      </body>
    </html>
  );
}