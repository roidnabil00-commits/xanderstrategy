// ============================================================================
// FILE: components/Footer.tsx
// DESCRIPTION: Professional Footer for RECA Intelligence Suite
// FIX: Using Bulletproof Inline SVGs for Instagram & LinkedIn to bypass TS errors.
// ============================================================================
import React from "react";
import { 
  Mail, 
  MessageCircle, 
  Music2, 
  ShieldCheck,
  ChevronRight
} from "lucide-react";

// --- CUSTOM INLINE SVGS (Anti-Error TypeScript) ---
const InstagramSVG = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);

const LinkedinSVG = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
    <rect width="4" height="12" x="2" y="9"/>
    <circle cx="4" cy="4" r="2"/>
  </svg>
);

export default function Footer() {
  // Daftar navigasi sitemap untuk ke semua lini atas
  const navigationLinks = [
    { name: "Home", href: "#" },
    { name: "The Problem", href: "#problem" },
    { name: "Why RECA", href: "#why" },
    { name: "Our Workflow", href: "#journey" },
    { name: "Data Deliverables", href: "#deliverables" },
    { name: "Intelligence Pricing", href: "#pricing" },
    { name: "FAQ", href: "#faq" },
  ];

  return (
    <footer className="bg-[#0A0F1C] border-t border-white/10 pt-16 pb-8 relative overflow-hidden">
      {/* Efek Glow Dekoratif di Background */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[200px] bg-teal-900/5 rounded-[100%] blur-[100px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* 1. SEKSI BRANDING */}
          <div className="flex flex-col items-start">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-teal-500 rounded flex items-center justify-center transform -skew-x-12 shadow-lg shadow-teal-500/20">
                <span className="text-[#0A0F1C] font-black text-xl leading-none transform skew-x-12">R</span>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-black text-white tracking-tighter uppercase leading-none">
                  RECA<span className="text-teal-500">.</span>
                </span>
                <span className="text-[9px] text-teal-500 font-bold tracking-[0.2em] mt-1.5 uppercase">AI Terminal System</span>
              </div>
            </div>
            <p className="text-slate-500 text-xs md:text-sm leading-relaxed max-w-xs">
              Platform intelijen data dan teknologi AI terpadu khusus untuk ekosistem Restaurant, Retail, Cafe, dan Catering di Indonesia.
            </p>
            <div className="mt-4 flex items-center gap-2 text-[10px] text-slate-600 font-mono uppercase tracking-widest">
               <ShieldCheck className="w-3 h-3 text-teal-600" /> Managed by Xander Tech
            </div>
          </div>

          {/* 2. SEKSI NAVIGASI (SITEMAP) */}
          <div className="flex flex-col">
            <span className="text-slate-500 text-xs font-bold tracking-[0.2em] mb-6 uppercase">Navigation</span>
            <nav className="flex flex-col gap-3">
              {navigationLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href} 
                  className="text-sm text-slate-400 hover:text-teal-400 transition-all flex items-center gap-2 group"
                >
                  <ChevronRight className="w-3 h-3 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all text-teal-500" />
                  {link.name}
                </a>
              ))}
            </nav>
          </div>

          {/* 3. SEKSI SOCIAL MEDIA CONNECT */}
          <div className="flex flex-col">
            <span className="text-slate-500 text-xs font-bold tracking-[0.2em] mb-6 uppercase">Connect With Us</span>
            <div className="flex flex-wrap items-center gap-3">
              {/* Instagram (Menggunakan Inline SVG) */}
              <a href="https://www.instagram.com/reca.terminal?igsh=N3pzNjJwamtmM3B6" target="_blank" rel="noopener noreferrer" className="w-11 h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-teal-400 hover:border-teal-500/50 hover:bg-teal-500/5 transition-all group">
                <InstagramSVG className="w-5 h-5 group-hover:scale-110 transition-transform" />
              </a>
              {/* TikTok */}
              <a href="https://www.tiktok.com/@bilxander?is_from_webapp=1&sender_device=pc" target="_blank" rel="noopener noreferrer" className="w-11 h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-teal-400 hover:border-teal-500/50 hover:bg-teal-500/5 transition-all group">
                <Music2 className="w-5 h-5 group-hover:scale-110 transition-transform" />
              </a>
              {/* Mail */}
              <a href="mailto:hallovalify@gmail.com" className="w-11 h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-teal-400 hover:border-teal-500/50 hover:bg-teal-500/5 transition-all group">
                <Mail className="w-5 h-5 group-hover:scale-110 transition-transform" />
              </a>
              {/* WhatsApp */}
              <a href="https://wa.me/6281931656410" target="_blank" rel="noopener noreferrer" className="w-11 h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-teal-400 hover:border-teal-500/50 hover:bg-teal-500/5 transition-all group">
                <MessageCircle className="w-5 h-5 group-hover:scale-110 transition-transform" />
              </a>
              {/* LinkedIn (Menggunakan Inline SVG) */}
              <a href="https://www.linkedin.com/company/reca-ai-analyst-terminal/?viewAsMember=true" target="_blank" rel="noopener noreferrer" className="w-11 h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-teal-400 hover:border-teal-500/50 hover:bg-teal-500/5 transition-all group">
                <LinkedinSVG className="w-5 h-5 group-hover:scale-110 transition-transform" />
              </a>
            </div>
          </div>

          {/* 4. SEKSI INFORMASI HUKUM */}
          <div className="flex flex-col lg:items-end">
             <span className="text-slate-500 text-xs font-bold tracking-[0.2em] mb-6 uppercase">Information</span>
             <nav className="flex flex-col lg:items-end gap-3">
               <a href="#" className="text-sm text-slate-400 hover:text-white transition-colors">
                 Terms & Condition
               </a>
               <a href="#" className="text-sm text-slate-400 hover:text-white transition-colors">
                 Privacy Policy
               </a>
             </nav>
          </div>

        </div>

        {/* AREA HAK CIPTA */}
        <div className="text-center border-t border-white/5 pt-8">
          <p className="text-[10px] md:text-xs text-slate-600 uppercase tracking-[0.3em] font-medium">
            &copy; 2026 XANDER SYSTEMS. ALL RIGHTS RESERVED.
          </p>
        </div>
      </div>
    </footer>
  );
}