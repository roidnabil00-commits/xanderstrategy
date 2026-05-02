"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight } from "lucide-react";

const NAV_LINKS = [
  { name: "The Problem", href: "#problem" },
  { name: "Why Us", href: "#why" },
  { name: "Framework", href: "#journey" },
  { name: "Deliverables", href: "#deliverables" },
  { name: "Katalog", href: "#pricing" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Efek transisi background saat di-scroll
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? "bg-[#0A0F1C]/80 backdrop-blur-lg border-b border-white/5 py-4 shadow-lg shadow-black/20" : "bg-transparent py-6"}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          
          {/* LOGO (Teks Clean & Profesional) */}
          <a href="#" className="flex items-center group">
            <span className="text-xl md:text-2xl font-extrabold text-white tracking-widest uppercase transition-transform group-hover:scale-105">
              XANDER STRATEGY<span className="text-teal-500">.</span>
            </span>
          </a>
          
          {/* DESKTOP MENU */}
          <div className="hidden lg:flex items-center space-x-8">
            {NAV_LINKS.map((link, index) => (
              <a 
                key={index} 
                href={link.href} 
                className="text-sm font-semibold text-slate-300 hover:text-teal-400 transition-colors"
              >
                {link.name}
              </a>
            ))}
            
            {/* Tombol CTA Utama - Diarahkan ke form WhatsApp terbawah */}
            <a 
              href="#cta" 
              className="bg-teal-500/10 border border-teal-500/50 text-teal-400 px-5 py-2.5 rounded-lg text-sm font-bold hover:bg-teal-500 hover:text-[#0A0F1C] hover:shadow-[0_0_20px_rgba(45,212,191,0.3)] transition-all flex items-center space-x-2"
            >
              <span>Konsultasi Gratis</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          {/* MOBILE MENU BUTTON */}
          <div className="lg:hidden">
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
              className="text-slate-300 hover:text-white transition-colors p-2"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE MENU OVERLAY */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="lg:hidden bg-[#0A0F1C]/95 backdrop-blur-xl border-b border-white/5 overflow-hidden absolute w-full left-0 top-full shadow-2xl"
          >
            <div className="px-4 pt-4 pb-8 space-y-2 flex flex-col">
              {NAV_LINKS.map((link, index) => (
                <a 
                  key={index}
                  href={link.href} 
                  onClick={() => setMobileMenuOpen(false)} 
                  className="block px-4 py-3.5 text-slate-300 font-semibold border-b border-white/5 hover:bg-white/5 hover:text-teal-400 transition-colors rounded-lg"
                >
                  {link.name}
                </a>
              ))}
              
              <a 
                href="#cta" 
                onClick={() => setMobileMenuOpen(false)} 
                className="flex justify-center items-center gap-2 mt-6 bg-gradient-to-r from-teal-400 to-blue-500 text-[#0A0F1C] px-6 py-4 rounded-xl font-extrabold shadow-[0_0_15px_rgba(45,212,191,0.2)]"
              >
                Konsultasi Gratis Sekarang <ArrowRight className="w-5 h-5" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}