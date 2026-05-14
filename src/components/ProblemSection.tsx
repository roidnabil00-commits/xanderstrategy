"use client";

import React, { useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { 
  MapPinOff, 
  Hourglass, 
  TrendingDown, 
  AlertTriangle,
  ChevronRight,
  ShieldAlert
} from "lucide-react";

interface ProblemData {
  id: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
}

interface ProblemCardProps {
  data: ProblemData;
}

// --- COPYWRITING RECA DIUPDATE DI SINI ---
const problemsData: ProblemData[] = [
  {
    id: "problem-1",
    icon: <MapPinOff className="w-4 h-4 md:w-6 md:h-6 text-rose-400" />,
    title: "Ketidaktahuan Eksekusi Bisnis",
    description: "Banyak business owner tidak kompeten bukan karena tidak mampu, tapi karena murni ketidaktahuan dalam menjalankan bisnis.",
    delay: 0.1,
  },
  {
    id: "problem-2",
    icon: <Hourglass className="w-4 h-4 md:w-6 md:h-6 text-rose-400" />,
    title: "Ego Produk vs Kebutuhan Pasar",
    description: "Hanya fokus membuat produk dan marketing yang disukai menurut diri sendiri, padahal pada kenyataannya pasar tidak membutuhkannya.",
    delay: 0.2,
  },
  {
    id: "problem-3",
    icon: <TrendingDown className="w-4 h-4 md:w-6 md:h-6 text-rose-400" />,
    title: "Keputusan Bisnis Tanpa Data",
    description: "Memulai dan mengembangkan bisnis tanpa acuan data, yang akhirnya berujung pada kerugian finansial dan keputusan yang salah.",
    delay: 0.3,
  }
];

const sectionVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.8, ease: "easeOut", staggerChildren: 0.2 } }
};

const headerVariants: Variants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  hover: { y: -5, scale: 1.02, transition: { duration: 0.3, ease: "easeInOut" } }
};

const agitateVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.6, delay: 0.5, ease: "easeOut" } }
};

const pulseVariants: Variants = {
  pulse: {
    scale: [1, 1.05, 1],
    opacity: [0.5, 0.8, 0.5],
    transition: { duration: 3, repeat: Infinity, ease: "easeInOut" }
  }
};

const ProblemBackground: React.FC = () => {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
      <div 
        className="absolute inset-0 opacity-[0.02]" 
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23f43f5e' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }}
      ></div>
      <motion.div variants={pulseVariants} animate="pulse" className="absolute top-0 left-1/4 w-[250px] md:w-[500px] h-[250px] md:h-[500px] bg-rose-900/10 rounded-full blur-[60px] md:blur-[100px] transform -translate-x-1/2 -translate-y-1/2"></motion.div>
      <motion.div variants={pulseVariants} animate="pulse" style={{ animationDelay: "1.5s" }} className="absolute bottom-0 right-1/4 w-[200px] md:w-[400px] h-[200px] md:h-[400px] bg-orange-900/10 rounded-full blur-[60px] md:blur-[100px] transform translate-x-1/2 translate-y-1/2"></motion.div>
      {/* Gradient untuk transisi halus antar section */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A0F1C] via-transparent to-[#0A0F1C]"></div>
    </div>
  );
};

const ProblemCard: React.FC<ProblemCardProps> = ({ data }) => {
  const [isHovered, setIsHovered] = useState<boolean>(false);
  return (
    <motion.div
      variants={cardVariants}
      whileHover="hover"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="relative p-3 sm:p-5 md:p-8 rounded-lg md:rounded-2xl bg-[#131A2A]/80 backdrop-blur-sm border border-white/5 overflow-hidden group transition-colors duration-300 hover:bg-[#1A2235]/90 hover:border-rose-500/30 flex flex-col h-full"
    >
      <AnimatePresence>
        {isHovered && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-gradient-to-br from-rose-500/10 to-transparent z-0 pointer-events-none" />
        )}
      </AnimatePresence>
      <div className="relative z-10 flex flex-col h-full">
        <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-14 md:h-14 rounded-md md:rounded-xl bg-[#0A0F1C] border border-rose-500/20 flex items-center justify-center mb-3 md:mb-6 shadow-[0_0_10px_rgba(244,63,94,0.1)] group-hover:shadow-[0_0_25px_rgba(244,63,94,0.25)] transition-shadow duration-300">
          <motion.div animate={isHovered ? { rotate: [0, -10, 10, -10, 10, 0] } : { rotate: 0 }} transition={{ duration: 0.5 }}>
            {data.icon}
          </motion.div>
        </div>
        <h3 className="text-[10px] sm:text-xs md:text-xl font-bold text-white mb-1.5 md:mb-3 tracking-tight group-hover:text-rose-100 transition-colors leading-tight">
          {data.title}
        </h3>
        <p className="text-[8px] sm:text-[10px] md:text-sm text-slate-400 leading-tight md:leading-relaxed flex-grow">
          {data.description}
        </p>
        <div className="mt-3 md:mt-6 w-6 md:w-12 h-0.5 bg-rose-500/20 group-hover:bg-rose-500/50 transition-colors duration-300"></div>
      </div>
    </motion.div>
  );
};

const AgitateBanner: React.FC = () => {
  return (
    <motion.div variants={agitateVariants} className="mt-8 md:mt-16 relative w-full max-w-4xl mx-auto rounded-xl md:rounded-2xl overflow-hidden border border-rose-500/20 shadow-[0_0_40px_rgba(244,63,94,0.05)]">
      <div className="absolute inset-0 bg-gradient-to-r from-rose-950/40 via-[#131A2A] to-rose-950/40 z-0"></div>
      <div className="absolute top-0 left-0 right-0 h-1 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+PHBhdGggZD0iTTAgNDBoNDBMMDAgMHoiIGZpbGw9IiNmNDNmNWUiIGZpbGwtb3BhY2l0eT0iMC4yIi8+PC9zdmc+')] z-10"></div>
      <div className="relative z-20 p-3 sm:p-5 md:p-10 flex flex-row items-center gap-3 md:gap-8">
        <div className="shrink-0 relative">
          <motion.div animate={{ scale: [1, 1.1, 1], opacity: [0.5, 1, 0.5] }} transition={{ duration: 2, repeat: Infinity }} className="absolute inset-0 bg-rose-500/20 rounded-full blur-md"></motion.div>
          <div className="w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16 rounded-full bg-rose-500/10 border border-rose-500/30 flex items-center justify-center relative z-10">
            <ShieldAlert className="w-4 h-4 sm:w-6 sm:h-6 md:w-8 md:h-8 text-rose-400" />
          </div>
        </div>
        <div className="text-left flex-grow">
          {/* --- TEKS AGITATE RECA DIUPDATE DI SINI --- */}
          <p className="text-[9px] sm:text-xs md:text-lg text-slate-300 leading-snug md:leading-relaxed">
            Jika dibiarkan, keputusan bisnis yang salah dapat membuat <span className="font-bold text-rose-400">kerugian besar hingga berujung PHK.</span> <br className="hidden md:block" />
            <span className="font-semibold text-white">Anda butuh acuan data yang jelas, bukan sekadar tebak-tebakan.</span>
          </p>
        </div>
        <div className="shrink-0 flex items-center justify-center">
          <motion.div animate={{ x: [0, 5, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}>
            <ChevronRight className="w-4 h-4 sm:w-6 sm:h-6 md:w-8 md:h-8 text-rose-500/50" />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default function ProblemSection() {
  return (
    <motion.section 
      id="problem" 
      className="relative py-16 md:py-24 overflow-hidden border-b border-white/5 bg-cover bg-center"
      style={{ backgroundImage: "url('/banner1.jpg')" }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={sectionVariants}
    >
      {/* OVERLAY GELAP BIAR TEXT TETAP TERBACA */}
      <div className="absolute inset-0 bg-[#0A0F1C]/85 z-0"></div>

      <ProblemBackground />
      
      <div className="relative z-10 w-full max-w-7xl mx-auto px-2 sm:px-4 md:px-6 lg:px-8">
        <motion.div variants={headerVariants} className="text-center max-w-3xl mx-auto mb-8 md:mb-16">
          <div className="inline-flex items-center space-x-1.5 md:space-x-2 bg-rose-500/10 border border-rose-500/20 px-2 py-0.5 md:px-3 md:py-1 rounded-full mb-3 md:mb-6">
            <AlertTriangle className="w-2.5 h-2.5 md:w-3.5 md:h-3.5 text-rose-400" />
            <span className="text-[8px] md:text-[10px] font-bold uppercase tracking-widest text-rose-400">
              The Problem
            </span>
          </div>
          {/* --- HEADER TEKS DIUPDATE --- */}
          <h2 className="text-lg sm:text-2xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight px-2">
            Sering Mengalami Hal Ini Saat Ingin <br className="hidden sm:block"/> 
            Menjalankan Bisnis Industri RECA?
          </h2>
        </motion.div>

        <div className="grid grid-cols-3 gap-1.5 sm:gap-3 md:gap-6 lg:gap-8 max-w-5xl mx-auto">
          {problemsData.map((problem) => (
            <ProblemCard key={problem.id} data={problem} />
          ))}
        </div>

        <AgitateBanner />
      </div>
    </motion.section>
  );
}