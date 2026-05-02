"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative h-screen min-h-[500px] flex items-center justify-center overflow-hidden bg-[#0A0F1C]">
      
      {/* BACKGROUND IMAGE & OVERLAY */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0F1C]/60 via-[#0A0F1C]/80 to-[#0A0F1C] z-10"></div>
        <div 
          className="w-full h-full bg-cover bg-center"
          style={{ backgroundImage: "url('/banner.png')" }}
        />
      </div>

      {/* MAIN CONTENT */}
      <div className="relative z-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center justify-center w-full mt-10">
        
        {/* HEADLINE (JUDUL UTAMA) - DIPERKECIL */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-2xl md:text-4xl lg:text-5xl font-extrabold text-white uppercase tracking-tight leading-[1.3] md:leading-[1.2] shadow-black drop-shadow-2xl mb-5 max-w-3xl mx-auto">
            Gunakan Riset & Data Untuk Bangun Bisnis <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-500">
              Jangan Asal Nebak 
            </span> <br className="hidden md:block" />
            Blueprint Riset & Data
          </h1>
        </motion.div>

        {/* SUBTITLE (DESKRIPSI) - DISESUAIKAN PROPORSI NYA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="max-w-xl mx-auto mb-8"
        >
          <p className="text-sm md:text-base text-slate-400 leading-relaxed">
            Dapatkan kompas navigasi bisnis Anda hari ini. Kami mengekstraksi data riil lapangan untuk menyusun SOP dan arsitektur sistem bisnis yang siap dieksekusi.
          </p>
        </motion.div>

        {/* CALL TO ACTION (CTA) - DIPERKECIL */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="w-full"
        >
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full">
            {/* CTA Utama */}
            <a 
              href="#pricing" 
              className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-teal-400 to-blue-500 hover:from-teal-300 hover:to-blue-400 text-[#0A0F1C] font-extrabold text-sm py-2.5 px-6 rounded-md transition-all shadow-[0_0_15px_rgba(45,212,191,0.3)] hover:shadow-[0_0_25px_rgba(45,212,191,0.5)] transform hover:-translate-y-0.5 w-full sm:w-auto"
            >
              Minta Riset Gratis <ArrowRight className="w-4 h-4" />
            </a>
            
            {/* CTA Sekunder */}
            <a 
              href="#journey" 
              className="inline-flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold text-sm py-2.5 px-6 rounded-md transition-all w-full sm:w-auto"
            >
              Lihat Cara Kerja
            </a>
          </div>
        </motion.div>

      </div>
    </section>
  );
}