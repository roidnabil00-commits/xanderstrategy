"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

// --- DATA STRUCTURES (NEW COPYWRITING) ---

const whyData = [
  {
    title: "Kepastian Berbasis Data",
    desc: "Setiap keputusan didukung fakta lapangan. Kami membedah 52 poin krusial mulai dari demografi, pergerakan kompetitor, hingga regulasi lokal. Bukan sekadar tebak-tebakan.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
    isHighlight: false,
  },
  {
    title: "Kecepatan Tinggi Berkat AI",
    desc: "Riset mendalam yang biasanya memakan waktu hingga 3 bulan oleh konsultan tradisional, kami selesaikan hanya dalam 1 hingga 11 hari kerja berkat AI dan Technology",
    image: "https://i.imgur.com/SRBDFBq.jpeg",
    isHighlight: true, // Highlight poin AI ini karena ini competitive advantage utama lu
  },
  {
    title: "Kualitas Korporat, Harga Terjangkau",
    desc: "Dapatkan wawasan strategis (insight) dan kualitas analisis sekelas konsultan bisnis mahal, namun dengan harga yang sangat masuk akal bagi UKM dan pebisnis lokal.",
    image: "https://awsimages.detik.net.id/community/media/visual/2023/07/10/corporate_169.jpeg?w=1200",
    isHighlight: false,
  },
  {
    title: "Rekomendasi \"Quick Wins\"",
    desc: "Kami tidak hanya memberi setumpuk data. Anda akan mendapatkan 3 hingga 5 langkah praktis yang bisa langsung Anda eksekusi dalam bisnis dengan modal minim (Guerrilla Marketing strategy).",
    image: "https://www.pixartprinting.co.uk/blog/wp-content/uploads/2024/12/Marketing-Strategy.jpg",
    isHighlight: false,
  }
];

export default function WhySection() {
  return (
    <section id="why" className="py-24 bg-[#0A0F1C] relative border-b border-white/5">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* HEADER & SUB-HEADER */}
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight mb-6"
          >
            Kenapa Pilih Strategic <br className="hidden md:block" /> Business Blueprint (SBB)?
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-base md:text-lg text-slate-400 max-w-3xl mx-auto leading-relaxed"
          >
            SBB hadir untuk mengubah cara Anda mengeksekusi bisnis. Inilah 4 alasan mengapa SBB adalah investasi terbaik Anda:
          </motion.p>
        </div>

        {/* GRID LAYOUT (Diubah jadi md:grid-cols-2 agar 4 item pas jadi 2x2) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 pt-4">
          {whyData.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.15 }}
              className={`relative rounded-3xl rounded-tr-[4rem] p-6 lg:p-8 flex flex-col h-full transition-transform hover:-translate-y-1 duration-300 ${
                item.isHighlight ? "bg-teal-500 shadow-[0_0_30px_rgba(20,184,166,0.15)]" : "bg-[#131A2A] border border-white/5 hover:border-white/10"
              }`}
            >
              {/* DECORATIVE CUT-OUT CIRCLE */}
              <div 
                className={`absolute -top-6 -right-4 w-16 h-16 rounded-full border-[8px] border-[#0A0F1C] flex items-center justify-center shadow-inner ${
                  item.isHighlight ? "bg-[#0A0F1C]" : "bg-teal-500"
                }`}
              >
                <ArrowUpRight className={`w-6 h-6 ${item.isHighlight ? "text-teal-400" : "text-[#0A0F1C]"}`} />
              </div>

              {/* CONTENT TEXT */}
              <div className="flex-grow flex flex-col justify-start mb-8 pr-6 mt-2">
                <h3 className={`text-2xl font-bold mb-4 leading-tight ${item.isHighlight ? "text-[#0A0F1C]" : "text-white"}`}>
                  {item.title}
                </h3>
                <p className={`text-sm md:text-base leading-relaxed ${item.isHighlight ? "text-teal-950 font-medium" : "text-slate-400"}`}>
                  {item.desc}
                </p>
              </div>

              {/* IMAGE SLOT */}
              <div className="h-56 md:h-48 w-full relative rounded-2xl overflow-hidden mt-auto shadow-lg bg-[#0A0F1C]">
                <div className={`absolute inset-0 z-10 mix-blend-overlay ${item.isHighlight ? "bg-teal-500/20" : "bg-transparent"}`}></div>
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity duration-500"
                />
              </div>
            </motion.div>
          ))}
        </div>
        
      </div>
    </section>
  );
}