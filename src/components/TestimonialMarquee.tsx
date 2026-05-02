// ============================================================================
// FILE: components/TestimonialMarquee.tsx
// ============================================================================
"use client";

import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { Quote, Star, MapPin, Briefcase } from "lucide-react";

// ============================================================================
// 1. INTERFACES & TYPE DEFINITIONS
// ============================================================================

interface TestimonialData {
  id: string;
  name: string;
  role: string;
  location: string;
  text: string;
  rating: number;
}

interface MarqueeRowProps {
  items: TestimonialData[];
  direction?: "left" | "right";
  speed?: number;
}

interface TestimonialCardProps {
  data: TestimonialData;
}

// ============================================================================
// 2. CONSTANTS & DATA
// ============================================================================

const testimonials: TestimonialData[] = [
  {
    id: "testi-1",
    name: "Arief Budiman",
    role: "Owner, Kedai Kopi & Roastery",
    location: "Bandung",
    rating: 5,
    text: "Gua udah mau buka cabang kedua di Cimahi, tapi ragu lokasinya tepat atau nggak. Setelah dapat blueprint dari Xander Strategy, baru ketahuan kalau area yang gua incar itu sudah oversaturated ada 11 cafe dalam radius 500 meter. Mereka rekomendasiin lokasi alternatif. Sekarang cabang kedua gua udah jalan 4 bulan dan sudah balik modal."
  },
  {
    id: "testi-2",
    name: "Sinta Maharani",
    role: "Founder, Brand Skincare Lokal",
    location: "Jakarta",
    rating: 5,
    text: "Gua seller Tokopedia yang udah 2 tahun tapi stagnan. Ternyata setelah diriset sama Xander Strategy, keyword yang gua pakai itu hampir nggak ada yang nyarinya gua salah target audiens. Blueprint-nya kasih gua keyword baru dan repositioning produk. Dalam 60 hari, omset gua naik hampir 3x."
  },
  {
    id: "testi-3",
    name: "Doni Prasetya",
    role: "Investor, F&B & Properti",
    location: "Surabaya",
    rating: 5,
    text: "Biasanya sebelum invest gua butuh waktu 2–3 bulan buat due diligence sendiri. Xander Strategy selesaikan dalam 7 hari kerja, lengkap dengan 3 skenario proyeksi keuangan semua ada asumsinya dan bisa gua audit. Sekarang kalau ada deal masuk, gua langsung minta SBB dulu."
  },
  {
    id: "testi-4",
    name: "Rizka Amalia",
    role: "Owner, Butik Fashion",
    location: "Yogyakarta",
    rating: 5,
    text: "Yang bikin gua kaget adalah bagian kompetitor intelligence-nya. Xander Strategy bisa breakdown kelemahan 5 toko pesaing gua dari review pelanggan mereka keluhan apa yang paling sering muncul. Dari situ gua tahu persis celah mana yang bisa gua masuk."
  },
  {
    id: "testi-5",
    name: "Hendra Kusuma",
    role: "CEO, Startup Logistik",
    location: "Bekasi",
    rating: 5,
    text: "Gua butuh pitch deck untuk investor tapi nggak mau isinya generik. Xander Strategy riset landscape kompetitor logistik di Jabodetabek secara mendalam siapa pemainnya dan gap yang belum ada. Hasilnya jadi backbone presentasi gua ke investor. Deal-nya closed."
  },
  {
    id: "testi-6",
    name: "Yuni Astuti",
    role: "Owner, Wedding Organizer",
    location: "Semarang",
    rating: 5,
    text: "Bisnis gua udah 5 tahun tapi gua nggak pernah benar-benar tahu siapa target pelanggan gua yang paling profitable. Ketahuan bahwa 70% revenue gua datang dari segmen yang selama ini gua anggap sekunder. Strategi marketing gua pivot, dalam 3 bulan closing rate naik."
  },
  {
    id: "testi-7",
    name: "Fajar Ramadhan",
    role: "Entrepreneur, Franchise",
    location: "Cianjur",
    rating: 5,
    text: "Gua mau buka franchise di 3 kota sekaligus. Xander Strategy kerjain ketiganya dalam 14 hari lengkap dengan perbandingan potensi per kota dan kompetitor masing-masing. Hasilnya actionable banget, bukan laporan yang cuma enak dibaca tapi susah dieksekusi."
  }
];

// ============================================================================
// 3. HELPER FUNCTIONS
// ============================================================================

const getInitials = (name: string): string => {
  const parts = name.trim().split(" ");
  if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
  return name.substring(0, 2).toUpperCase();
};

const getAvatarColor = (id: string): string => {
  const colors = ["bg-teal-500", "bg-blue-500", "bg-emerald-500", "bg-amber-500", "bg-rose-500", "bg-indigo-500", "bg-cyan-500"];
  let hash = 0;
  for (let i = 0; i < id.length; i++) hash = id.charCodeAt(i) + ((hash << 5) - hash);
  return colors[Math.abs(hash) % colors.length];
};

// ============================================================================
// 4. SUB-COMPONENTS
// ============================================================================

const StarRating: React.FC<{ rating: number }> = ({ rating }) => {
  return (
    <div className="flex items-center gap-0.5 mb-2.5">
      {[...Array(5)].map((_, i) => (
        <Star 
          key={i} 
          className={`w-3 h-3 ${i < rating ? "fill-amber-400 text-amber-400" : "fill-slate-700 text-slate-700"}`} 
        />
      ))}
    </div>
  );
};

/**
 * TESTIMONIAL CARD
 * Diperkecil ukurannya (w-64 = 256px) agar muat berdampingan di layar mobile.
 * Padding dan font-size disusutkan agar tetap proporsional.
 */
const TestimonialCard: React.FC<TestimonialCardProps> = ({ data }) => {
  const avatarColor = getAvatarColor(data.id);
  const initials = getInitials(data.name);

  return (
    <div className="w-[260px] md:w-[320px] bg-[#131A2A] border border-white/5 rounded-xl p-4 md:p-5 flex flex-col shrink-0 whitespace-normal shadow-lg hover:border-white/10 transition-colors group">
      
      {/* Header Kartu */}
      <div className="flex items-start gap-3 mb-3">
        <div className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center shrink-0 shadow-md ${avatarColor}`}>
          <span className="text-[#0A0F1C] font-extrabold text-[10px] md:text-xs tracking-wider">
            {initials}
          </span>
        </div>
        
        <div className="flex flex-col flex-grow min-w-0">
          <h4 className="text-white font-bold text-xs md:text-sm truncate">{data.name}</h4>
          <div className="flex items-center gap-1 text-slate-400 mt-0.5">
            <Briefcase className="w-3 h-3 shrink-0 text-teal-500" />
            <span className="text-[9px] md:text-[10px] truncate">{data.role}</span>
          </div>
          <div className="flex items-center gap-1 text-slate-400 mt-0.5">
            <MapPin className="w-3 h-3 shrink-0 text-rose-400" />
            <span className="text-[9px] md:text-[10px] truncate">{data.location}</span>
          </div>
        </div>

        <Quote className="w-5 h-5 md:w-6 md:h-6 text-white/5 shrink-0 group-hover:text-teal-500/20 transition-colors" />
      </div>

      <StarRating rating={data.rating} />

      {/* Body Teks (Leading diperkecil agar tidak memakan ruang) */}
      <div className="flex-grow">
        <p className="text-slate-300 text-[10px] md:text-xs leading-snug italic">
          "{data.text}"
        </p>
      </div>

    </div>
  );
};

/**
 * MARQUEE ROW
 * Menghandle animasi berjalan. Gap diperkecil (gap-3 / gap-4) agar padat.
 */
const MarqueeRow: React.FC<MarqueeRowProps> = ({ items, direction = "left", speed = 40 }) => {
  const duplicatedItems = [...items, ...items, ...items]; // Dikalikan 3x agar layar PC ultrawide tidak kosong
  const xAnimation = direction === "left" ? ["0%", "-33.33%"] : ["-33.33%", "0%"];

  return (
    <div className="relative flex overflow-hidden w-full py-2">
      <motion.div
        className="flex gap-3 md:gap-4 w-max"
        animate={{ x: xAnimation }}
        transition={{
          repeat: Infinity,
          ease: "linear",
          duration: speed,
        }}
      >
        {duplicatedItems.map((item, idx) => (
          <TestimonialCard key={`${item.id}-${idx}`} data={item} />
        ))}
      </motion.div>
    </div>
  );
};

// ============================================================================
// 5. MAIN COMPONENT EXPORT
// ============================================================================

export default function TestimonialMarquee() {
  const { topRow, bottomRow } = useMemo(() => {
    return {
      topRow: testimonials.slice(0, 4),
      bottomRow: testimonials.slice(4, 7)
    };
  }, []);

  return (
    <section 
      id="testimonials" 
      className="py-16 md:py-24 bg-[#0A0F1C] border-t border-b border-white/5 relative overflow-hidden"
    >
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 w-[600px] h-[200px] bg-teal-900/10 rounded-[100%] blur-[100px] transform -translate-x-1/2 -translate-y-1/2"></div>
      </div>

      {/* HEADER COMPACT (Dipusatkan ke tengah dan ukurannya diperkecil) */}
      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 md:mb-12 text-center">
        <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-teal-500/10 border border-teal-500/20 text-teal-400 mb-4">
          <Quote className="w-5 h-5" />
        </div>
        <h2 className="text-2xl md:text-4xl font-bold text-white tracking-tight leading-tight mb-3">
          Kisah Sukses Klien <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-500">Xander SBB</span>
        </h2>
        <p className="text-slate-400 text-xs md:text-sm leading-relaxed max-w-xl mx-auto">
          Dari UMKM lokal hingga ekspansi korporat. Temukan bagaimana blueprint kami menghemat ratusan juta rupiah dari risiko salah langkah.
        </p>
      </div>

      {/* AREA MARQUEE (Jarak antar baris dipersempit) */}
      <div className="relative z-10 w-full flex flex-col gap-1 md:gap-2 overflow-hidden">
        
        {/* Shadow Overlay Kiri Kanan untuk efek pudar */}
        <div className="absolute left-0 top-0 bottom-0 w-12 md:w-32 bg-gradient-to-r from-[#0A0F1C] to-transparent z-20 pointer-events-none"></div>
        <div className="absolute right-0 top-0 bottom-0 w-12 md:w-32 bg-gradient-to-l from-[#0A0F1C] to-transparent z-20 pointer-events-none"></div>

        <MarqueeRow items={topRow} direction="left" speed={60} />
        <MarqueeRow items={bottomRow} direction="right" speed={55} />

      </div>
    </section>
  );
}