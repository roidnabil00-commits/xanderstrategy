// ============================================================================
// FILE: components/TestimonialMarquee.tsx
// DESCRIPTION: Privacy-First Client Shield Marquee (Exclusivity Mode)
// PURPOSE: Showcasing data protection & confidentiality instead of public reviews.
// ============================================================================
"use client";

import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Lock, EyeOff, Fingerprint, ShieldAlert } from "lucide-react";

// ============================================================================
// 1. INTERFACES & TYPE DEFINITIONS
// ============================================================================

interface PrivacyBadgeData {
  id: string;
  label: "CONFIDENTIAL" | "PRIVAT" | "EKSLUSIF";
  icon: React.ReactNode;
  code: string;
}

interface MarqueeRowProps {
  items: PrivacyBadgeData[];
  direction?: "left" | "right";
  speed?: number;
}

// ============================================================================
// 2. DATA STRUCTURES (THE PRIVACY PROTOCOL)
// ============================================================================

const privacyBadges: PrivacyBadgeData[] = [
  {
    id: "p-1",
    label: "CONFIDENTIAL",
    icon: <Lock className="w-5 h-5 text-rose-500" />,
    code: "PROT-X-001"
  },
  {
    id: "p-2",
    label: "PRIVAT",
    icon: <EyeOff className="w-5 h-5 text-teal-400" />,
    code: "PRIV-X-99"
  },
  {
    id: "p-3",
    label: "EKSLUSIF",
    icon: <ShieldCheck className="w-5 h-5 text-blue-400" />,
    code: "EKS-ST-10"
  },
  {
    id: "p-4",
    label: "CONFIDENTIAL",
    icon: <Fingerprint className="w-5 h-5 text-amber-500" />,
    code: "AUTH-882"
  },
  {
    id: "p-5",
    label: "PRIVAT",
    icon: <Lock className="w-5 h-5 text-teal-500" />,
    code: "ENCR-YR-4"
  },
  {
    id: "p-6",
    label: "EKSLUSIF",
    icon: <ShieldAlert className="w-5 h-5 text-indigo-400" />,
    code: "X-PRO-TOP"
  }
];

// ============================================================================
// 3. SUB-COMPONENTS
// ============================================================================

/**
 * PRIVACY BADGE CARD
 * Desain kartu yang menonjolkan aspek keamanan data.
 */
const PrivacyBadge: React.FC<{ data: PrivacyBadgeData }> = ({ data }) => {
  return (
    <div className="w-[240px] md:w-[280px] bg-[#131A2A]/60 backdrop-blur-xl border border-white/5 rounded-xl p-4 md:p-6 flex flex-col items-center justify-center shrink-0 shadow-lg hover:border-teal-500/30 transition-all duration-500 group relative overflow-hidden">
      
      {/* Background Scanning Animation Effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-teal-500/10 to-transparent -translate-y-full group-hover:translate-y-full transition-transform duration-[2s] ease-linear pointer-events-none"></div>

      <div className="relative z-10 flex flex-col items-center gap-4">
        {/* Ikon Keamanan dengan Efek Glow */}
        <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-[#0A0F1C] border border-white/10 flex items-center justify-center shadow-inner group-hover:shadow-[0_0_20px_rgba(45,212,191,0.2)] transition-all">
          {data.icon}
        </div>
        
        <div className="flex flex-col items-center text-center">
          {/* Kata Kunci Utama: CONFIDENTIAL / PRIVAT / EKSLUSIF */}
          <h4 className="text-white font-black text-lg md:text-xl tracking-[0.2em] mb-1 group-hover:text-teal-400 transition-colors">
            {data.label}
          </h4>
          
          {/* Meta Data Enkripsi (Hanya untuk visual) */}
          <div className="flex items-center gap-2 px-2 py-0.5 rounded bg-white/5 border border-white/5">
            <div className="w-1.5 h-1.5 rounded-full bg-teal-500 animate-pulse"></div>
            <span className="text-[10px] font-mono text-slate-400 tracking-widest uppercase">
              {data.code}
            </span>
          </div>
        </div>
      </div>

      {/* Decorative Corner Borders */}
      <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white/20"></div>
      <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white/20"></div>
    </div>
  );
};

/**
 * MARQUEE ROW COMPONENT
 */
const MarqueeRow: React.FC<MarqueeRowProps> = ({ items, direction = "left", speed = 40 }) => {
  const duplicatedItems = [...items, ...items, ...items, ...items];
  const xAnimation = direction === "left" ? ["0%", "-25%"] : ["-25%", "0%"];

  return (
    <div className="relative flex overflow-hidden w-full py-4">
      <motion.div
        className="flex gap-4 md:gap-6 w-max"
        animate={{ x: xAnimation }}
        transition={{
          repeat: Infinity,
          ease: "linear",
          duration: speed,
        }}
      >
        {duplicatedItems.map((item, idx) => (
          <PrivacyBadge key={`${item.id}-${idx}`} data={item} />
        ))}
      </motion.div>
    </div>
  );
};

// ============================================================================
// 4. MAIN COMPONENT EXPORT
// ============================================================================

export default function TestimonialMarquee() {
  const topRow = useMemo(() => privacyBadges.slice(0, 3), []);
  const bottomRow = useMemo(() => privacyBadges.slice(3, 6), []);

  return (
    <section 
      id="testimonials" 
      className="py-16 md:py-24 border-t border-b border-white/5 relative overflow-hidden bg-cover bg-center"
      style={{ backgroundImage: "url('/banner2.png')" }}
    >
      {/* OVERLAY GELAP BIAR TEXT TETAP TERBACA */}
      <div className="absolute inset-0 bg-[#0A0F1C]/85 z-0"></div>

      {/* Visual background atmospheric */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 w-[800px] h-[300px] bg-rose-900/10 rounded-[100%] blur-[120px] transform -translate-x-1/2 -translate-y-1/2 opacity-50"></div>
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-teal-900/10 rounded-full blur-[100px] opacity-30"></div>
      </div>

      {/* HEADER SECTION (Fokus pada Data Privacy) */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 md:mb-16 text-center">
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 mb-6"
        >
          <ShieldAlert className="w-4 h-4" />
          <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest">
            Privacy Protocol v2.5
          </span>
        </motion.div>
        
        <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight leading-tight mb-6">
          Privasi Klien Adalah <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-500">Prioritas Mutlak.</span>
        </h2>
        
        <p className="text-slate-300 text-sm md:text-lg leading-relaxed max-w-2xl mx-auto">
          Kami tidak mempublikasikan data spesifik atau kisah sukses klien secara vulgar. Setiap strategi yang kami susun bersifat <span className="text-white font-bold">rahasia dapur</span> bagi bisnis Anda, diproteksi sepenuhnya dari jangkauan kompetitor.
        </p>
      </div>

      {/* AREA MARQUEE (Security Tickers) */}
      <div className="relative z-10 w-full flex flex-col gap-2 md:gap-4 overflow-hidden">
        
        {/* Shadow Overlay Kiri Kanan */}
        <div className="absolute left-0 top-0 bottom-0 w-24 md:w-64 bg-gradient-to-r from-[#0A0F1C]/90 to-transparent z-20 pointer-events-none"></div>
        <div className="absolute right-0 top-0 bottom-0 w-24 md:w-64 bg-gradient-to-l from-[#0A0F1C]/90 to-transparent z-20 pointer-events-none"></div>

        <MarqueeRow items={topRow} direction="left" speed={30} />
        <MarqueeRow items={bottomRow} direction="right" speed={35} />

      </div>

      {/* FOOTER TEXT */}
      <div className="mt-12 text-center relative z-10">
        <p className="text-slate-400 font-mono text-[10px] uppercase tracking-[0.3em] flex items-center justify-center gap-4">
          <span className="w-8 h-px bg-white/10"></span>
          Non-Disclosure Agreement Guaranteed
          <span className="w-8 h-px bg-white/10"></span>
        </p>
      </div>
    </section>
  );
}