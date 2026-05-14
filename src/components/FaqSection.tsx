"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ============================================================================
// DATA STRUCTURES (RECA PROFESSIONAL COPYWRITING)
// ============================================================================

const faqCategories = [
  {
    category: "Tentang Layanan & AI Terminal",
    items: [
      {
        q: "Apa itu RECA-AI-TERMINAL?",
        a: "RECA adalah layanan teknologi berbasis AI, data, dan riset khusus untuk industri F&B (Restaurant, Retail, Cafe, Catering). Kami membantu Anda memvalidasi ide, memetakan kompetitor, dan mengeksekusi strategi berdasarkan data aktual, bukan sekadar insting."
      },
      {
        q: "Siapa yang cocok menggunakan layanan ini?",
        a: "Pebisnis F&B dari berbagai level: mulai dari calon pengusaha yang ingin membuka kedai kopi pertama, hingga investor dan korporasi F&B yang ingin melakukan ekspansi cabang dengan presisi tinggi."
      },
      {
        q: "Apa bedanya RECA dengan konsultan bisnis tradisional?",
        a: "Konsultan tradisional biasanya memakan waktu berbulan-bulan dan seringkali mengandalkan opini subjektif. RECA menggunakan AI dan teknologi untuk mengolah data (demografi, cuaca, sentimen kompetitor) dengan kecepatan tinggi, menghasilkan insight objektif dalam hitungan hari."
      }
    ]
  },
  {
    category: "Tentang Proses & Hasil Riset",
    items: [
      {
        q: "Berapa lama waktu pemrosesan datanya?",
        a: "Sangat efisien. Paket Starter dan Pro (PDF/PPT) selesai dalam 1-5 hari kerja. Untuk akses Corporate (Software Dashboard interaktif & AI), setup awal memakan waktu 3-7 hari kerja."
      },
      {
        q: "Informasi apa yang perlu saya berikan di awal?",
        a: "Cukup spesifikasikan lokasi target, konsep F&B Anda (misal: kedai kopi, restoran keluarga, atau catering), dan estimasi skala bisnis. Algoritma kami akan mencari dan mengolah sisanya dari berbagai sumber digital dan riil."
      },
      {
        q: "Apakah datanya sulit dibaca oleh orang awam?",
        a: "Sama sekali tidak. Semua data disajikan dalam dashboard atau blueprint laporan yang sangat visual dan mudah dipahami. Kami juga menyertakan 'Tutorial Implementasi' dan 'AI Prompt Pack' agar Anda tahu persis apa langkah eksekusi selanjutnya."
      }
    ]
  },
  {
    category: "Fitur, Keuntungan & Eksklusivitas",
    items: [
      {
        q: "Bagaimana cara kerja ROI Calculator di laporan RECA?",
        a: "Anda cukup memasukkan angka modal awal dan estimasi biaya operasional. Sistem kami (didukung oleh rata-rata data wilayah tersebut) akan mengeluarkan estimasi Break-Even Point (BEP) dan proyeksi omzet bulanan secara rasional."
      },
      {
        q: "Apakah ada sistem eksklusivitas teritorial?",
        a: "Ya, khusus untuk tier Corporate, kami membatasi maksimal 3 klien per wilayah per kuartal. Kompetitor Anda di wilayah tersebut tidak akan bisa mengakses data pemetaan spasial dan insight yang sama dari kami. Ini memberikan Anda First Mover Advantage."
      },
      {
        q: "Apakah RECA menjamin bisnis F&B saya pasti sukses?",
        a: "Tidak ada entitas yang bisa menjamin kesuksesan bisnis 100%. Yang RECA pastikan adalah Anda mengeksekusi bisnis dengan probabilitas keberhasilan yang jauh lebih tinggi. Dengan data yang valid, kerugian ratusan juta rupiah akibat salah pilih lokasi atau salah konsep bisa dihindari."
      }
    ]
  },
  {
    category: "Keamanan & Privasi Data",
    items: [
      {
        q: "Apakah data POS (Point of Sales) saya aman jika diintegrasikan ke sistem RECA?",
        a: "Sangat aman dan 100% konfidensial. Jika Anda berada di paket Corporate, data operasional Anda hanya digunakan untuk melatih Asisten AI pribadi Anda dan memberikan visualisasi yang akurat. Data tersebut dienkripsi dan tidak akan pernah dibagikan atau dijual kepada klien/pihak lain."
      },
      {
        q: "Apakah kompetitor akan tahu kalau saya sedang meriset mereka?",
        a: "Tidak. Pengumpulan intelijen kompetitor yang kami lakukan bersifat pasif dan menggunakan teknologi analisis jejak digital, sentimen media sosial, serta data publik. Kompetitor Anda tidak akan mendeteksi aktivitas riset ini."
      }
    ]
  }
];

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export default function FaqSection() {
  // Menggunakan string state (categoryIndex-itemIndex) agar ID unik
  const [openId, setOpenId] = useState<string | null>("0-0"); // Buka FAQ pertama secara default

  const toggleFaq = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section className="py-24 bg-[#0A0F1C] border-t border-white/5 relative">
      {/* Background Ornaments */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-teal-900/5 rounded-full blur-[100px] transform translate-x-1/3 -translate-y-1/3"></div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Section */}
        <div className="text-center mb-16">
          <p className="text-teal-500 font-bold text-sm mb-3 tracking-widest uppercase flex items-center justify-center gap-2">
            <span className="w-8 h-px bg-teal-500/50"></span>
            Frequently Asked Questions
            <span className="w-8 h-px bg-teal-500/50"></span>
          </p>
          <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight">
            Pelajari Lebih Lanjut <br className="hidden md:block"/> Tentang RECA
          </h2>
        </div>

        {/* FAQ Categories Render */}
        <div className="space-y-12">
          {faqCategories.map((cat, catIndex) => (
            <div key={catIndex} className="space-y-4">
              
              {/* Category Title */}
              <h3 className="text-lg md:text-xl font-bold text-white border-b border-white/10 pb-3 mb-6">
                {cat.category}
              </h3>

              {/* Accordion List for this category */}
              <div className="space-y-3">
                {cat.items.map((faq, itemIndex) => {
                  const currentId = `${catIndex}-${itemIndex}`;
                  const isOpen = openId === currentId;

                  return (
                    <div 
                      key={currentId} 
                      className={`bg-[#131A2A] border rounded-xl overflow-hidden transition-all duration-300 ${
                        isOpen ? "border-teal-500/50 shadow-[0_0_15px_rgba(20,184,166,0.1)]" : "border-white/5 hover:border-white/10"
                      }`}
                    >
                      <button
                        className="w-full px-5 py-4 md:px-6 md:py-5 text-left flex justify-between items-center focus:outline-none group"
                        onClick={() => toggleFaq(currentId)}
                      >
                        <span className={`font-semibold text-sm md:text-base pr-8 transition-colors ${isOpen ? "text-white" : "text-slate-300 group-hover:text-white"}`}>
                          {faq.q}
                        </span>
                        
                        <div className={`w-8 h-8 rounded-full border flex items-center justify-center shrink-0 transition-all duration-300 ${isOpen ? "bg-teal-500 text-[#0A0F1C] border-teal-500" : "bg-[#0A0F1C] border-white/10 text-teal-500 group-hover:border-teal-500/30"}`}>
                          <span className={`text-xl font-light transform transition-transform duration-300 leading-none ${isOpen ? "rotate-45" : ""}`}>
                            +
                          </span>
                        </div>
                      </button>
                      
                      <AnimatePresence>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                          >
                            <div className="px-5 pb-5 md:px-6 md:pb-6 pt-0 text-slate-400 text-sm md:text-base leading-relaxed">
                              <div className="border-t border-white/5 pt-4 mt-2">
                                {faq.a}
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}