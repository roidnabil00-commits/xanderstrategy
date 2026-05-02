"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ============================================================================
// DATA STRUCTURES (COPYWRITING FAQ BARU)
// ============================================================================

const faqCategories = [
  {
    category: "Tentang Layanan",
    items: [
      {
        q: "Apa itu Strategic Business Blueprint (SBB)?",
        a: "SBB adalah layanan riset pasar dan strategi marketing berbasis data yang membantu kamu memahami potensi pasar, memetakan kompetitor, dan masuk ke pasar dengan strategi yang tepat sebelum kamu mengeluarkan modal besar."
      },
      {
        q: "Siapa yang cocok menggunakan layanan ini?",
        a: "Siapapun yang ingin membuka bisnis baru, memperluas bisnis yang sudah ada, atau ingin tahu kenapa bisnis mereka tidak berkembang. Baik bisnis offline maupun online, dari skala UKM sampai korporasi."
      },
      {
        q: "Apa bedanya SBB dengan riset bisnis biasa?",
        a: "SBB memberikan dokumen riset yang konkret, berbasis data aktual, dan langsung bisa kamu eksekusi tanpa perlu interpretasi tambahan."
      },
      {
        q: "Apakah SBB cocok untuk bisnis online maupun offline?",
        a: "Ya. SBB tersedia dalam dua versi: offline untuk bisnis dengan lokasi fisik, dan online untuk bisnis di marketplace, media sosial, atau website. Kamu tinggal pilih sesuai model bisnis kamu."
      },
      {
        q: "Apakah saya perlu pengalaman bisnis sebelumnya untuk menggunakan layanan ini?",
        a: "Tidak perlu. SBB justru paling berguna untuk mereka yang baru mau mulai dan ingin memastikan langkah pertama mereka tidak salah arah."
      }
    ]
  },
  {
    category: "Tentang Proses",
    items: [
      {
        q: "Bagaimana cara memulai?",
        a: "Mulai dari yang gratis dulu: isi form Snapshot Pasar dan kamu akan menerima laporan pertama via WhatsApp dalam 24 jam. Setelah itu kamu bisa memutuskan apakah ingin lanjut ke paket berbayar."
      },
      {
        q: "Berapa lama proses pengerjaan dari awal sampai dokumen selesai?",
        a: "Tergantung paket yang kamu pilih. Free selesai dalam 24 jam, Basic 1-2 hari kerja, Business 2-3 hari kerja, dan Corporate 3-5 hari kerja."
      },
      {
        q: "Informasi apa yang perlu saya siapkan sebelum mulai?",
        a: "Cukup tiga hal: jenis bisnis yang ingin kamu buka atau kembangkan, lokasi atau platform target, dan gambaran target pelanggan kamu. Sisanya kami yang cari dan analisis."
      },
      {
        q: "Apakah ada sesi diskusi atau konsultasi sebelum pengerjaan dimulai?",
        a: "Ya, untuk paket Business dan Corporate ada sesi brief awal via WhatsApp atau call untuk memastikan riset yang kami lakukan benar-benar sesuai dengan kebutuhan spesifik kamu."
      },
      {
        q: "Bagaimana cara saya menerima hasil risetnya?",
        a: "Hasil riset akan dikirim secara personal lewat WhatsApp dan Google Drive (untuk format dokumen lengkap)."
      }
    ]
  },
  {
    category: "Tentang Hasil & Kualitas",
    items: [
      {
        q: "Apakah data yang digunakan benar-benar aktual dan bukan template generik?",
        a: "Ya. Setiap laporan dibuat khusus berdasarkan bisnis, lokasi, dan industri kamu bukan copy-paste dari template. Data diambil dari Google, marketplace, media sosial, dan platform riset pada saat pengerjaan berlangsung."
      },
      {
        q: "Seberapa dalam analisis kompetitor yang diberikan?",
        a: "Tergantung paket. Basic mencakup 5 kompetitor dengan analisis permukaan, Business masuk ke estimasi traffic dan strategi konten mereka, Corporate mencakup estimasi revenue, ad strategy, dan pemetaan ekosistem bisnis mereka secara menyeluruh."
      },
      {
        q: "Apakah hasilnya bisa langsung saya eksekusi sendiri tanpa bantuan tim ahli?",
        a: "Ya, itu tujuan utamanya. Setiap rekomendasi di dalam dokumen SBB ditulis dalam bahasa yang praktis dan actionable bukan bahasa konsultan yang butuh diterjemahkan lagi."
      },
      {
        q: "Apakah ada revisi jika hasil tidak sesuai ekspektasi?",
        a: "Untuk paket Basic ke atas tersedia satu kali revisi yang sudah termasuk dalam harga. Revisi dilakukan jika ada data yang kurang akurat atau ada poin yang perlu disesuaikan dengan kondisi aktual kamu di lapangan."
      },
      {
        q: "Apakah SBB menjamin bisnis saya akan sukses setelah menggunakan layanan ini?",
        a: "Tidak ada yang bisa menjamin kesuksesan bisnis termasuk konsultan manapun. Yang SBB jamin adalah kamu membuat keputusan berdasarkan data yang valid, bukan asumsi. Risiko tetap ada, tapi jauh lebih terukur."
      }
    ]
  },
  {
    category: "Tentang Harga & Pembayaran",
    items: [
      {
        q: "Mengapa ada paket gratis? Apa motivasinya?",
        a: "Karena kami percaya kamu harus merasakan kualitas kerja kami sebelum memutuskan untuk bayar. Snapshot Pasar gratis adalah cara kami membuktikan bahwa riset berbasis data benar-benar membuat perbedaan, bukan sekadar klaim."
      },
      {
        q: "Bagaimana sistem pembayarannya?",
        a: "Pembayaran dilakukan di awal sebelum pengerjaan dimulai. Kami menerima transfer bank dan QRIS. Untuk semua paket terdapat opsi DP 50% di awal dan 50% setelah dokumen selesai."
      },
      {
        q: "Apakah harga bisa dinegosiasi?",
        a: "Harga yang tertera sudah mencerminkan waktu, kedalaman riset, dan nilai yang kamu dapatkan. Namun untuk kebutuhan spesifik atau volume lebih dari satu project, silakan hubungi kami langsung untuk diskusi lebih lanjut."
      }
    ]
  },
  {
    category: "Tentang Keamanan Data",
    items: [
      {
        q: "Apakah informasi bisnis yang saya berikan dijaga kerahasiaannya?",
        a: "Ya. Semua informasi yang kamu berikan hanya digunakan untuk keperluan riset kamu dan tidak akan dibagikan kepada pihak manapun. Setiap dokumen yang kami hasilkan adalah milik eksklusif kamu."
      },
      {
        q: "Apakah kompetitor saya bisa tahu bahwa saya sedang melakukan riset tentang mereka?",
        a: "Tidak. Semua riset dilakukan secara pasif menggunakan data yang sudah tersedia secara publik, review, media sosial, marketplace, dan platform riset. Tidak ada aktivitas yang bisa terdeteksi oleh kompetitor kamu."
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
            Pelajari Lebih Lanjut <br className="hidden md:block"/> Tentang SBB
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