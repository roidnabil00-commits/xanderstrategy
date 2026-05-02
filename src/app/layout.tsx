// ============================================================================
// FILE: app/layout.tsx
// DESCRIPTION: Root Layout & Global Metadata Configuration
// ============================================================================
import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

// 1. Inisialisasi Font Utama (Bisa diganti sesuai selera desain lu)
const inter = Inter({ subsets: ["latin"] });

// ============================================================================
// VIEWPORT CONFIGURATION (Standar Next.js 14+)
// ============================================================================
export const viewport: Viewport = {
  themeColor: "#0A0F1C", // Warna background utama Xander agar browser bar di HP ikut gelap
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
    default: "Xander Strategy | Strategic Business Blueprint (SBB)",
    template: "%s | Xander Strategy",
  },
  description:
    "Layanan riset pasar dan strategi marketing berbasis data (Offline & Digital) untuk memastikan ekspansi bisnis Anda presisi, terukur, dan minim risiko.",
  keywords: [
    "Xander Strategy",
    "Strategic Business Blueprint",
    "SBB",
    "Riset Pasar",
    "Konsultan Bisnis",
    "Strategi Marketing",
    "Business Plan",
    "Digital Marketing",
    "Ekspansi Bisnis",
    "Analisis Kompetitor",
    "Indonesia"
  ],
  authors: [{ name: "Bil Xander", url: "https://xanderstrategy.vercel.app/" }],
  creator: "Xander Systems",
  publisher: "Xander Strategy",

  // --- Open Graph (Preview Link untuk WhatsApp, Facebook, LinkedIn) ---
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "https://xanderstrategy.vercel.app/", // Ganti dengan domain asli lu nanti
    title: "Xander Strategy | Strategic Business Blueprint",
    description: "Gunakan Riset & Data Untuk Bangun Bisnis Jangan Asal Nebak Blueprint Riset & Data. ",
    siteName: "Xander Strategy",
    images: [
      {
        url: "/og-image.jpg", // Masukkan gambar banner ukuran 1200x630px di folder /public
        width: 1200,
        height: 630,
        alt: "Xander Strategy SBB Preview",
      },
    ],
  },

  // --- Twitter / X Cards ---
  twitter: {
    card: "summary_large_image",
    title: "Xander Strategy | Strategic Business Blueprint",
    description: "Eksekusi strategi bisnis tanpa tebak-tebakan. Validasi ide dan pasar Anda dengan data aktual.",
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