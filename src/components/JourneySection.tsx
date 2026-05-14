// ============================================================================
// FILE: components/JourneySection.tsx
// ============================================================================
"use client";

import React from "react";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

// ============================================================================
// DATA STRUCTURES (RECA BRANDING UPDATE)
// ============================================================================

const journeyData = [
  {
    step: "1",
    title: "Intake & Concept Briefing",
    desc: "Kami memulai dengan membedah visi bisnis RECA (Restaurant, Retail, Cafe, Catering) Anda untuk menyelaraskan target riset dengan objektif ekspansi Anda.",
    image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=800&q=80",
    stats: "Visi Terpetakan"
  },
  {
    step: "2",
    title: "AI Data Extraction",
    desc: "Algoritma AI Terminal & Tim kami bekerja mengekstraksi data makro wilayah, perputaran uang, behavior customer, hingga memetakan blind spot kompetitor secara presisi dan data, riset, informasi lainnya.",
    image: "https://storage.googleapis.com/gweb-uniblog-publish-prod/images/Gemini2.5DeepResearch_SocialShare_1920x1080.max-1440x810.png",
    stats: "Intelijen Terintegrasi"
  },
  {
    step: "3",
    title: "Blueprint Architecture",
    desc: "Transformasi data mentah menjadi strategi matang. Kami menyusun proyeksi secara presisi, trend dilapangan, yang dirubah menjadi data, analisis real time.",
    image: "produk1.jpg",
    stats: "Strategi Terbentuk"
  },
  {
    step: "4",
    title: "Implementation & Access",
    desc: "Penyerahan instrumen analitik lengkap. Dapatkan panduan eksekusi langkah-demi-langkah atau akses dashboard interaktif untuk monitoring bisnis Anda secara real-time.",
    image: "banner1.jpg",
    stats: "Siap Dieksekusi"
  }
];

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export default function JourneySection() {
  return (
    <section id="journey" className="py-24 bg-[#0A0F1C] border-t border-white/5 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* HEADER SECTION */}
        <div className="text-center mb-16 md:mb-24">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-5xl font-bold text-white tracking-tight leading-tight mb-4"
          >
            Alur Kerja <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-500">RECA-Ai-Terminal</span> <br className="hidden md:block" /> Untuk Bisnis Anda
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-teal-400 font-medium tracking-wide uppercase text-sm"
          >
            (Metodologi Presisi & Berbasis Data)
          </motion.p>
        </div>

        <div className="relative">
          {/* Vertical Line - Left on Mobile, Center on Desktop */}
          <div className="absolute left-[23px] md:left-1/2 top-4 bottom-0 w-px bg-white/10 md:bg-gradient-to-b md:from-transparent md:via-teal-500/50 md:to-transparent transform md:-translate-x-1/2"></div>

          {/* TIMELINE LIST */}
          <div className="space-y-16 md:space-y-24">
            {journeyData.map((item, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                className={`relative pl-16 md:pl-0 flex flex-col md:flex-row md:items-center gap-6 md:gap-12 lg:gap-20 ${index % 2 === 0 ? "md:flex-row-reverse" : ""}`}
              >
                {/* Number Circle - Top-left on Mobile, Center on Desktop */}
                <div className="absolute left-0 md:left-1/2 top-0 md:top-1/2 w-12 h-12 rounded-full bg-teal-500 flex items-center justify-center font-bold text-[#0A0F1C] text-xl md:-translate-x-1/2 md:-translate-y-1/2 z-10 shadow-[0_0_15px_rgba(20,184,166,0.3)]">
                  {item.step}
                </div>

                {/* Content Side (Text) */}
                <div className={`w-full md:w-1/2 ${index % 2 === 0 ? "md:text-left" : "md:text-right"}`}>
                  <h3 className="text-xl md:text-3xl font-bold text-white mb-3 md:mb-4 pt-2 md:pt-0">
                    {item.title}
                  </h3>
                  <p className="text-slate-300 md:text-slate-400 text-sm md:text-base leading-relaxed mb-5 md:mb-6">
                    {item.desc}
                  </p>
                  
                  {/* Status Box */}
                  <div className={`inline-flex items-center space-x-3 bg-[#131A2A] rounded-xl border border-white/5 p-3 pr-5 ${index % 2 === 0 ? "" : "md:flex-row-reverse md:space-x-reverse"}`}>
                    <div className="w-8 h-8 rounded-full bg-[#0A0F1C] border border-teal-500/30 flex items-center justify-center shrink-0">
                      <CheckCircle2 className="w-4 h-4 text-teal-400" />
                    </div>
                    <div className={index % 2 === 0 ? "text-left" : "md:text-right text-left"}>
                      <p className="text-white font-medium text-xs md:text-sm">Fase {item.step} Selesai</p>
                      <p className="text-slate-500 text-[10px] md:text-xs">{item.stats}</p>
                    </div>
                  </div>
                </div>

                {/* Image Side */}
                <div className="w-full md:w-1/2 relative mt-2 md:mt-0">
                  <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-xl group">
                    <div className="absolute inset-0 bg-teal-500/10 opacity-0 group-hover:opacity-100 transition-opacity z-10 mix-blend-overlay"></div>
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      className="w-full h-48 md:h-auto object-cover transform group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  {/* Decorative glow behind image */}
                  <div className={`hidden md:block absolute top-1/2 -z-10 w-full h-full bg-gradient-to-br from-teal-500/10 to-blue-500/10 rounded-2xl blur-xl transform -translate-y-1/2 ${index % 2 === 0 ? "-left-4" : "left-4"}`}></div>
                </div>

              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}