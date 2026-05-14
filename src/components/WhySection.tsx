"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

// --- DATA STRUCTURES (RECA COPYWRITING) ---
const whyData = [
  {
    title: "Keputusan Berbasis Data & AI",
    desc: "RECA mengumpulkan dan mengolah data menggunakan Algoritma, Statistika, dan AI untuk menghasilkan keputusan bisnis presisi yang meminimalisir kerugian.",
    image: "produk1.jpg",
    isHighlight: false,
  },
  {
    title: "Bukan Sekadar Tools, Tapi Teman",
    desc: "Kami hadir untuk mendampingi bisnis Anda di Indonesia agar tidak ketinggalan zaman dan terus bisa beradaptasi di era Teknologi & AI.",
    image: "https://www.nvidia.com/content/nvidiaGDC/us/en_US/solutions/ai/agentic-ai/_jcr_content/root/responsivegrid/nv_container_copy_10/nv_container/nv_teaser_copy_626440742.coreimg.100.1070.jpeg/1773697497073/nvidia-nims-blueprint.jpeg",
    isHighlight: true, 
  },
  {
    title: "Edukasi & Inovasi Sistem",
    desc: "Misi kami adalah mengedukasi penggunaan AI dan terus berinovasi dalam sistem serta teknologi khusus untuk industri RECA agar bisnis Anda berkembang pesat.",
    image: "banner1.jpg",
    isHighlight: false,
  },
  {
    title: "Cegah Kerugian & PHK",
    desc: "Mendorong pertumbuhan ekonomi dengan pemahaman data dan riset, sehingga keputusan salah bisa diminimalisir untuk mencegah kerugian besar yang berujung pada PHK.",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROBpX8-yA9KcNgc6eOHScF-PpGw4ElmpXGWA&s",
    isHighlight: false,
  }
];

export default function WhySection() {
  return (
    <section 
      id="why" 
      className="py-24 relative border-b border-white/5 bg-cover bg-center" 
      style={{ backgroundImage: "url('/banner1.jpg')" }}
    >
      {/* OVERLAY GELAP BIAR TEKS TETAP JELAS */}
      <div className="absolute inset-0 bg-[#0A0F1C]/85 z-0"></div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* HEADER & SUB-HEADER */}
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight mb-6"
          >
            Kenapa Memilih <br className="hidden md:block" /> RECA?
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-base md:text-lg text-slate-400 max-w-3xl mx-auto leading-relaxed"
          >
            RECA Industri (Restaurant, Retail Khusus Makanan & Minuman, Cafe, Catering) selama ini telah menjadi penggerak terbesar ekonomi Indonesia, Maka dari itu RECA hadir untuk memperbesar industri ini menggunakan technology terbaru dan AI agar industri ini bisa terus beradaptasi di zaman sekarang. Berikut value yang kami berikan:
          </motion.p>
        </div>

        {/* GRID LAYOUT */}
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