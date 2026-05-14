// ============================================================================
// FILE: components/DeliverablesSection.tsx
// ============================================================================
"use client";

import React, { useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { 
  FileText, 
  FileSpreadsheet, 
  Gift,
  CheckCircle,
  Download,
  Cpu,
  Terminal,
  BookOpen
} from "lucide-react";

// ============================================================================
// 1. INTERFACES & TYPE DEFINITIONS
// ============================================================================

interface DeliverableTheme {
  border: string;
  iconBg: string;
  badge: string;
  title: string;
  check: string;
  hoverOverlay: string;
  glowLine: string;
}

interface DeliverableData {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  isBonus: boolean;
  fileType: string;
  themeColor: "teal" | "blue" | "emerald" | "amber";
}

interface DeliverableCardProps {
  data: DeliverableData;
  index: number;
}

// ============================================================================
// 2. CONSTANTS & MOCK DATA (RECA DELIVERABLES)
// ============================================================================

const deliverablesData: DeliverableData[] = [
  {
    id: "del-1",
    title: "Territory Intelligence",
    description: "Laporan PDF berisi analisis wilayah, perputaran uang, dan perilaku konsumen F&B.",
    icon: <FileText className="w-5 h-5 md:w-8 md:h-8 text-blue-400" />,
    isBonus: false,
    fileType: ".PDF REPORT",
    themeColor: "blue"
  },
  {
    id: "del-2",
    title: "ROI & Financial Tool",
    description: "Kalkulator dinamis untuk menghitung Break-Even Point (BEP) dan proyeksi omzet bisnis.",
    icon: <FileSpreadsheet className="w-5 h-5 md:w-8 md:h-8 text-emerald-400" />,
    isBonus: false,
    fileType: "DATA TOOL",
    themeColor: "emerald"
  },
  {
    id: "del-3",
    title: "AI Terminal",
    description: "AI Terminal, Analytics Data, Real Time, Vertical AI, Information Center.",
    icon: <Terminal className="w-5 h-5 md:w-8 md:h-8 text-teal-400" />,
    isBonus: false,
    fileType: "SOFTWARE",
    themeColor: "teal"
  },
  {
    id: "del-4",
    title: "RECA Learning System",
    description: "Panduan eksekusi data, E-Course industri F&B, dan draf SOP operasional bisnis.",
    icon: <BookOpen className="w-5 h-5 md:w-8 md:h-8 text-amber-400" />,
    isBonus: true,
    fileType: "ACCESS & DOCS",
    themeColor: "amber"
  }
];

// ============================================================================
// 3. FRAMER MOTION VARIANTS
// ============================================================================

const sectionVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { duration: 0.8, ease: "easeOut", staggerChildren: 0.15 }
  }
};

const headerVariants: Variants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const cardVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95, y: 20 },
  visible: { 
    opacity: 1, 
    scale: 1, 
    y: 0, 
    transition: { duration: 0.6, ease: "easeOut" } 
  },
  hover: { 
    y: -4,
    scale: 1.02,
    transition: { duration: 0.3, ease: "easeInOut" }
  }
};

const glowVariants: Variants = {
  pulse: {
    opacity: [0.2, 0.5, 0.2],
    scale: [0.95, 1.05, 0.95],
    transition: { duration: 4, repeat: Infinity, ease: "easeInOut" }
  }
};

// ============================================================================
// 4. HELPER FUNCTIONS
// ============================================================================

const getThemeClasses = (theme: string, isHovered: boolean, isBonus: boolean): DeliverableTheme => {
  if (isBonus) {
    return {
      border: "border-amber-500/40 shadow-[0_0_15px_rgba(245,158,11,0.15)]",
      iconBg: "bg-amber-500/10 border-amber-500/30",
      badge: "bg-gradient-to-r from-amber-500 to-orange-500 text-[#0A0F1C]",
      title: "text-amber-400",
      check: "text-amber-500",
      hoverOverlay: "bg-amber-500/5",
      glowLine: "from-transparent via-amber-400 to-transparent"
    };
  }

  switch (theme) {
    case "blue":
      return {
        border: `border-white/5 ${isHovered ? 'border-blue-500/30 shadow-[0_0_20px_rgba(59,130,246,0.1)]' : ''}`,
        iconBg: `bg-[#0A0F1C] border-white/10 ${isHovered ? 'border-blue-500/30' : ''}`,
        badge: "bg-white/10 text-slate-300",
        title: `text-white ${isHovered ? 'text-blue-100' : ''}`,
        check: "text-blue-500",
        hoverOverlay: "bg-blue-500/5",
        glowLine: "from-transparent via-blue-400 to-transparent"
      };
    case "emerald":
      return {
        border: `border-white/5 ${isHovered ? 'border-emerald-500/30 shadow-[0_0_20px_rgba(16,185,129,0.1)]' : ''}`,
        iconBg: `bg-[#0A0F1C] border-white/10 ${isHovered ? 'border-emerald-500/30' : ''}`,
        badge: "bg-white/10 text-slate-300",
        title: `text-white ${isHovered ? 'text-emerald-100' : ''}`,
        check: "text-emerald-500",
        hoverOverlay: "bg-emerald-500/5",
        glowLine: "from-transparent via-emerald-400 to-transparent"
      };
    case "teal":
    default:
      return {
        border: `border-white/5 ${isHovered ? 'border-teal-500/30 shadow-[0_0_20px_rgba(45,212,191,0.1)]' : ''}`,
        iconBg: `bg-[#0A0F1C] border-white/10 ${isHovered ? 'border-teal-500/30' : ''}`,
        badge: "bg-white/10 text-slate-300",
        title: `text-white ${isHovered ? 'text-teal-100' : ''}`,
        check: "text-teal-500",
        hoverOverlay: "bg-teal-500/5",
        glowLine: "from-transparent via-teal-400 to-transparent"
      };
  }
};

// ============================================================================
// 5. SUB-COMPONENTS
// ============================================================================

const DeliverableBackground: React.FC = () => {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
      <div 
        className="absolute inset-0 opacity-[0.015]" 
        style={{ 
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%232dd4bf' fill-opacity='1' fill-rule='evenodd'%3E%3Ccircle cx='3' cy='3' r='3'/%3E%3Cg%3E%3C/svg%3E")` 
        }}
      ></div>
      <motion.div 
        variants={glowVariants}
        animate="pulse"
        className="absolute top-1/2 left-1/2 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-teal-900/10 rounded-full blur-[80px] md:blur-[120px] transform -translate-x-1/2 -translate-y-1/2"
      ></motion.div>
    </div>
  );
};

const AnimatedCircuitBoard: React.FC = () => {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center">
      <svg className="w-full h-full absolute inset-0" preserveAspectRatio="none">
        <motion.circle 
          cx="50%" cy="50%" r="40" 
          fill="rgba(45, 212, 191, 0.05)"
          animate={{ r: [30, 60, 30], opacity: [0.2, 0.5, 0.2] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="hidden md:block"
        />
        <circle cx="50%" cy="50%" r="8" fill="#2dd4bf" className="opacity-50 hidden md:block" />
        <g stroke="rgba(255, 255, 255, 0.05)" strokeWidth="1.5" fill="none">
          <path d="M 50% 50% L 25% 50% L 25% 25%" />
          <path d="M 50% 50% L 75% 50% L 75% 25%" />
          <path d="M 50% 50% L 25% 50% L 25% 75%" />
          <path d="M 50% 50% L 75% 50% L 75% 75%" />
        </g>
        <g fill="none" strokeLinecap="round">
          <motion.path 
            d="M 50% 50% L 25% 50% L 25% 25%" 
            stroke="#60a5fa" strokeWidth="2" strokeDasharray="100 200"
            animate={{ strokeDashoffset: [300, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            className="opacity-50 md:opacity-70"
          />
          <motion.path 
            d="M 50% 50% L 75% 50% L 75% 25%" 
            stroke="#34d399" strokeWidth="2" strokeDasharray="100 200"
            animate={{ strokeDashoffset: [300, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear", delay: 1 }}
            className="opacity-50 md:opacity-70"
          />
          <motion.path 
            d="M 50% 50% L 25% 50% L 25% 75%" 
            stroke="#2dd4bf" strokeWidth="2" strokeDasharray="100 200"
            animate={{ strokeDashoffset: [300, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear", delay: 2 }}
            className="opacity-50 md:opacity-70"
          />
          <motion.path 
            d="M 50% 50% L 75% 50% L 75% 75%" 
            stroke="#fbbf24" strokeWidth="2" strokeDasharray="100 200"
            animate={{ strokeDashoffset: [300, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear", delay: 3 }}
            className="opacity-50 md:opacity-70"
          />
        </g>
        <circle cx="25%" cy="25%" r="3" fill="#60a5fa" className="opacity-80" />
        <circle cx="75%" cy="25%" r="3" fill="#34d399" className="opacity-80" />
        <circle cx="25%" cy="75%" r="3" fill="#2dd4bf" className="opacity-80" />
        <circle cx="75%" cy="75%" r="3" fill="#fbbf24" className="opacity-80" />
      </svg>
    </div>
  );
};

const DeliverableCard: React.FC<DeliverableCardProps> = ({ data, index }) => {
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const theme = getThemeClasses(data.themeColor, isHovered, data.isBonus);

  return (
    <motion.div
      variants={cardVariants}
      whileHover="hover"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className={`relative p-3 md:p-8 rounded-xl md:rounded-2xl bg-[#131A2A]/80 backdrop-blur-md border overflow-hidden group transition-all duration-300 flex flex-col h-full z-10 min-w-0 ${theme.border}`}
    >
      <AnimatePresence>
        {isHovered && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`absolute inset-0 z-0 pointer-events-none ${theme.hoverOverlay}`}
          />
        )}
      </AnimatePresence>

      <div className="relative z-10 flex flex-col h-full min-w-0 break-words">
        <div className="flex flex-col lg:flex-row lg:justify-between items-start lg:items-center mb-3 md:mb-6 gap-2 lg:gap-0">
          <div className={`w-8 h-8 md:w-16 md:h-16 rounded-lg md:rounded-xl border flex items-center justify-center shrink-0 shadow-lg transition-transform duration-500 ${isHovered ? 'scale-110' : 'scale-100'} ${theme.iconBg}`}>
            {data.icon}
          </div>
          <div className="flex flex-col">
            <span className={`text-[8px] md:text-[10px] font-bold px-2 py-0.5 md:px-3 md:py-1 rounded-full uppercase tracking-wider text-center shrink-0 whitespace-nowrap ${theme.badge}`}>
              {data.isBonus ? 'BONUS' : data.fileType}
            </span>
          </div>
        </div>

        <h3 className={`text-xs md:text-2xl font-bold mb-1.5 md:mb-3 tracking-tight transition-colors leading-tight ${theme.title}`}>
          {data.title}
        </h3>
        
        <p className="text-[10px] md:text-base text-slate-400 leading-snug md:leading-relaxed flex-grow">
          {data.description}
        </p>

        <div className="mt-3 pt-3 md:mt-6 md:pt-6 border-t border-white/5 flex items-center gap-1.5 md:gap-2">
          <CheckCircle className={`w-3 h-3 md:w-4 md:h-4 shrink-0 ${theme.check}`} />
          <span className="text-[8px] md:text-xs text-slate-500 uppercase tracking-widest font-semibold">
            Termasuk di RECA
          </span>
        </div>
      </div>
      
      {data.isBonus && (
        <div className={`absolute top-0 left-0 right-0 h-0.5 md:h-1 bg-gradient-to-r opacity-50 transform -translate-x-full animate-[shimmer_2s_infinite] ${theme.glowLine}`}></div>
      )}
    </motion.div>
  );
};

// ============================================================================
// 6. MAIN COMPONENT (DELIVERABLES SECTION EXPORT)
// ============================================================================

export default function DeliverablesSection() {
  return (
    <motion.section 
      id="deliverables" 
      className="relative py-16 md:py-24 bg-[#0A0F1C] overflow-hidden border-b border-white/5"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={sectionVariants}
    >
      <DeliverableBackground />
      <AnimatedCircuitBoard />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <motion.div variants={headerVariants} className="text-center max-w-4xl mx-auto mb-10 md:mb-16">
          <div className="inline-flex items-center space-x-1.5 md:space-x-2 bg-blue-500/10 border border-blue-500/20 px-2 py-0.5 md:px-3 md:py-1.5 rounded-full mb-4 md:mb-6">
            <Download className="w-3 h-3 md:w-4 md:h-4 text-blue-400" />
            <span className="text-[8px] md:text-[10px] font-bold uppercase tracking-widest text-blue-400">
              Data Siap Pakai
            </span>
          </div>
          
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-white tracking-tight leading-tight mb-3 md:mb-6 px-2">
            Ambil Keputusan Presisi dengan <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-500">Data & Teknologi AI RECA.</span>
          </h2>
          
          <p className="text-xs sm:text-sm md:text-lg text-slate-400 leading-relaxed max-w-2xl mx-auto px-2">
            Dapatkan terminal analitik lengkap yang dirancang khusus untuk mengakselerasi dominasi Anda di industri Restaurant, Cafe, dan Retail F&B.
          </p>
        </motion.div>

        <div className="relative z-10 grid grid-cols-2 gap-2 sm:gap-4 md:gap-8 max-w-5xl mx-auto">
          <div className="hidden md:flex absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 w-16 h-16 bg-[#0A0F1C] border-2 border-teal-500/50 rounded-full items-center justify-center shadow-[0_0_30px_rgba(45,212,191,0.2)]">
            <Cpu className="w-8 h-8 text-teal-400 animate-pulse" />
          </div>

          {deliverablesData.map((item, index) => (
            <DeliverableCard key={item.id} data={item} index={index} />
          ))}
        </div>

      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}} />
    </motion.section>
  );
}