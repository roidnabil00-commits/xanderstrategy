// ============================================================================
// FILE: components/PricingSection.tsx
// ============================================================================
"use client";

import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  CheckCircle2, 
  X, 
  Send, 
  User, 
  Phone, 
  Mail, 
  MessageSquare,
  Ticket,
  Terminal
} from "lucide-react";

// ============================================================================
// 1. INTERFACES & TYPE DEFINITIONS
// ============================================================================

interface FeatureItem {
  title: string;
  detail?: string;
}

interface PricingData {
  id: string;
  tier: string;
  headline: string;
  price: string;
  desc: string;
  features: FeatureItem[];
  buttonText: string;
  popular: boolean;
}

interface FormData {
  name: string;
  phone: string;
  email: string;
  message: string;
  promoCode: string;
}

interface FormErrors {
  name?: string;
  phone?: string;
}

// ============================================================================
// 2. CONSTANTS & DATA (NEW RECA COPYWRITING)
// ============================================================================

const WA_TARGET_NUMBER = "6281931656410";

const pricingData: PricingData[] = [
  {
    id: "tier-1",
    tier: "BASIC",
    headline: "Small Business, UMKM Only",
    price: "Rp 500.000",
    desc: "Entry point untuk kamu yang baru mau mulai. (Per project)",
    features: [
      { title: "Territory Intelligence Report (PDF)", detail: "Report & Analisa" },
      { title: "Consumer Behavior & Peak Hours" },
      { title: "Weather Impact Analysis" },
      { title: "ROI Calculator Sederhana" },
      { title: "Competitor List & Positioning" },
      { title: "AI Prompt Pack", detail: "" },
      { title: "Tutorial Implementasi Data" },
      { title: "Akses Komunitas Belajar" }
    ],
    buttonText: "Pilih Starter",
    popular: false
  },
  {
    id: "tier-2",
    tier: "BUSINESS / PRO",
    headline: "Business or Corporate Mikro & Makro",
    price: "Rp 3.500.000",
    desc: "Next level for business owner & team. (Per bulan)",
    features: [
      { title: "Semua yang ada di Starter / Basic" },
      { title: "Macro Overview Ekonomi Wilayah Lengkap" },
      { title: "F&B Market Valuation & Potensi Omzet" },
      { title: "Tourist Origin & Demographic Breakdown" },
      { title: "Land Value Trend Komersial" },
      { title: "Competitor Analysis", detail: "Analisis mendalam 3 kompetitor" },
      { title: "Gap Opportunity Mapping" },
      { title: "ROI Calculator Lengkap", detail: "BEP & proyeksi" },
      { title: "E-course F&B", detail: "Operasional, Marketing, SDM, Sales, Ekspansi" },
      { title: "Update Data Bulanan" }
    ],
    buttonText: "Request Demo",
    popular: true
  },
  {
    id: "tier-3",
    tier: "CORPORATE",
    headline: "Enterprise & Corporate",
    price: "Rp 8.500.000",
    desc: "Full access. For Corporate, investor, owner, and your team. (Per bulan)",
    features: [
      { title: "Semua yang ada di Pro" },
      { title: "Akses Dashboard Software Interaktif", detail: "Filter per sub-wilayah & industri, input data POS bisnis lo" },
      { title: "AI Vertical Agent 24/7 — Ask Anything" },
      { title: "Marketing Strategy Report", detail: "Termasuk seasonal marketing calendar" },
      { title: "SDM & Operational Guide" },
      { title: "Konsultasi Eksklusif" },
      { title: "Eksklusivitas Wilayah" },
      { title: "Keamanan Terjamin", detail: "Data client 100% konfidensial" }
    ],
    buttonText: "Request Akses",
    popular: false
  }
];

// ============================================================================
// 3. MAIN COMPONENT
// ============================================================================

export default function PricingSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTier, setSelectedTier] = useState<PricingData | null>(null);
  
  const [formData, setFormData] = useState<FormData>({ name: "", phone: "", email: "", message: "", promoCode: "" });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isModalOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "unset";
    return () => { document.body.style.overflow = "unset"; };
  }, [isModalOpen]);

  const handleOpenModal = (tier: PricingData) => {
    setSelectedTier(tier);
    setIsModalOpen(true);
    setErrors({});
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => {
      setSelectedTier(null);
      setFormData({ name: "", phone: "", email: "", message: "", promoCode: "" });
    }, 300);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    // Auto uppercase untuk promoCode
    const finalValue = name === "promoCode" ? value.toUpperCase() : value;
    
    setFormData(prev => ({ ...prev, [name]: finalValue }));
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const validateForm = () => {
    const newErrors: FormErrors = {};
    if (!formData.name.trim()) newErrors.name = "Nama wajib diisi";
    if (!formData.phone.trim()) {
      newErrors.phone = "No. WhatsApp wajib diisi";
    } else if (!/^[0-9+\-\s]+$/.test(formData.phone)) {
      newErrors.phone = "Format nomor tidak valid";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (validateForm() && selectedTier) {
      setIsSubmitting(true);
      
      const promoText = formData.promoCode.trim() !== "" ? `\n*Kode Promo:* ${formData.promoCode.trim()}` : "";
      
      const textMessage = `Halo Tim RECA by Xander,

Saya tertarik untuk mengambil paket *${selectedTier.tier} (${selectedTier.headline})*. Berikut data saya:

*Nama:* ${formData.name}
*No. WhatsApp:* ${formData.phone}
*Email:* ${formData.email || "-"}${promoText}

*Kebutuhan Tambahan/Bisnis:*
${formData.message || "-"}

Mohon panduan untuk proses selanjutnya. Terima kasih!`;

      const waUrl = `https://wa.me/${WA_TARGET_NUMBER}?text=${encodeURIComponent(textMessage)}`;
      
      setTimeout(() => {
        window.open(waUrl, '_blank');
        setIsSubmitting(false);
        handleCloseModal();
      }, 600);
    }
  };

  return (
    <section id="pricing" className="py-24 bg-[#0A0F1C] relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-teal-900/20 via-[#0A0F1C] to-[#0A0F1C] pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* HEADER SECTION */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight mb-4">
            RECA <span className="text-teal-500">Catalog</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Sistem data, AI, dan riset terpadu. Pilih analitik yang sesuai untuk mengakselerasi bisnis RECA Anda.
          </p>
        </div>

        {/* PRICING GRID DENGAN 3 KOLOM SEJAJAR */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch max-w-6xl mx-auto">
          {pricingData.map((tier, index) => (
            <motion.div
              key={tier.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative flex flex-col h-full bg-[#131A2A] rounded-2xl border ${tier.popular ? "border-teal-500 shadow-2xl shadow-teal-500/10" : "border-white/5 hover:border-white/10"} p-6 lg:p-8 transition-all`}
            >
              {tier.popular && (
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
                  <span className="bg-gradient-to-r from-teal-400 to-blue-500 text-[#0A0F1C] text-xs font-bold uppercase tracking-wider py-1 px-4 rounded-full shadow-lg">
                    Rekomendasi Utama
                  </span>
                </div>
              )}
              
              <div className="mb-6">
                <h4 className="text-xl font-bold text-white mb-1">{tier.tier}</h4>
                <p className="text-teal-400 text-sm font-semibold mb-3">{tier.headline}</p>
                <p className="text-sm text-slate-400 min-h-[60px] leading-relaxed">{tier.desc}</p>
              </div>
              
              <div className="mb-6 border-b border-white/5 pb-6">
                <p className="text-xs text-slate-500 uppercase tracking-widest mb-1">Investasi</p>
                <span className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400">{tier.price}</span>
              </div>
              
              <div className="flex-grow overflow-y-auto custom-scrollbar pr-2 mb-8" style={{ maxHeight: '380px' }}>
                <ul className="space-y-4">
                  {tier.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <CheckCircle2 className={`w-4 h-4 shrink-0 mr-3 mt-0.5 ${tier.popular ? "text-teal-400" : "text-slate-500"}`} />
                      <div className="flex flex-col">
                        <span className={`text-sm font-semibold leading-relaxed ${tier.popular ? "text-slate-200" : "text-slate-300"}`}>
                          {feature.title}
                        </span>
                        {feature.detail && (
                          <span className="text-xs text-slate-400 mt-1 leading-relaxed">
                            {feature.detail}
                          </span>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="mt-auto pt-4 border-t border-white/5">
                <button 
                  onClick={() => handleOpenModal(tier)}
                  className={`block w-full text-center py-4 px-4 rounded-xl font-bold transition-all ${tier.popular ? "bg-teal-500 text-[#0A0F1C] hover:bg-teal-400 shadow-[0_0_15px_rgba(20,184,166,0.3)] transform hover:-translate-y-1" : "bg-white/5 text-white hover:bg-white/10 border border-white/10 transform hover:-translate-y-1"}`}
                >
                  {tier.buttonText}
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ============================================================================ */}
      {/* MODAL / POP-UP FORMULIR WITH PROMO CODE */}
      {/* ============================================================================ */}
      <AnimatePresence>
        {isModalOpen && selectedTier && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={handleCloseModal}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm cursor-pointer"
            ></motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-lg bg-[#0A0F1C] border border-white/10 rounded-2xl md:rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
            >
              <div className="flex items-center justify-between p-6 border-b border-white/5 bg-[#131A2A]">
                <div>
                  <h3 className="text-xl font-bold text-white">Akses Terminal RECA</h3>
                  <p className="text-xs text-slate-400 mt-1">Isi data singkat untuk terhubung via WhatsApp.</p>
                </div>
                <button onClick={handleCloseModal} className="p-2 bg-white/5 hover:bg-white/10 rounded-full transition-colors text-slate-400 hover:text-white">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 overflow-y-auto custom-scrollbar">
                <div className="flex items-center gap-3 bg-teal-500/10 border border-teal-500/20 p-4 rounded-xl mb-6">
                  <Terminal className="w-6 h-6 text-teal-400 shrink-0" />
                  <div>
                    <p className="text-[10px] text-teal-500 font-bold uppercase tracking-widest">
                      {selectedTier.tier}
                    </p>
                    <p className="text-white font-semibold">{selectedTier.headline} <span className="text-slate-400 text-sm">({selectedTier.price})</span></p>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* FIELD NAMA */}
                  <div>
                    <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider ml-1 mb-1 block">Nama Lengkap</label>
                    <div className={`relative flex items-center bg-[#131A2A] border rounded-lg transition-colors ${errors.name ? 'border-rose-500' : 'border-white/10 hover:border-white/20 focus-within:border-teal-500'}`}>
                      <div className="absolute left-4 text-slate-500"><User className="w-4 h-4" /></div>
                      <input type="text" name="name" value={formData.name} onChange={handleInputChange} placeholder="Nama Anda" className="w-full bg-transparent text-white text-sm py-3 pl-11 pr-4 outline-none" />
                    </div>
                    {errors.name && <p className="text-[10px] text-rose-400 mt-1 ml-1">{errors.name}</p>}
                  </div>

                  {/* FIELD WHATSAPP */}
                  <div>
                    <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider ml-1 mb-1 block">Nomor WhatsApp</label>
                    <div className={`relative flex items-center bg-[#131A2A] border rounded-lg transition-colors ${errors.phone ? 'border-rose-500' : 'border-white/10 hover:border-white/20 focus-within:border-teal-500'}`}>
                      <div className="absolute left-4 text-slate-500"><Phone className="w-4 h-4" /></div>
                      <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} placeholder="Contoh: 0812345..." className="w-full bg-transparent text-white text-sm py-3 pl-11 pr-4 outline-none" />
                    </div>
                    {errors.phone && <p className="text-[10px] text-rose-400 mt-1 ml-1">{errors.phone}</p>}
                  </div>

                  {/* FIELD EMAIL */}
                  <div>
                    <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider ml-1 mb-1 block">Email (Opsional)</label>
                    <div className="relative flex items-center bg-[#131A2A] border border-white/10 hover:border-white/20 focus-within:border-teal-500 rounded-lg transition-colors">
                      <div className="absolute left-4 text-slate-500"><Mail className="w-4 h-4" /></div>
                      <input type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="nama@email.com" className="w-full bg-transparent text-white text-sm py-3 pl-11 pr-4 outline-none" />
                    </div>
                  </div>

                  {/* FIELD PROMO/REFERRAL */}
                  <div>
                    <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider ml-1 mb-1 flex items-center gap-1.5">
                      Kode Promo / Referral <span className="text-[9px] text-teal-500 bg-teal-500/10 px-1.5 py-0.5 rounded">(Opsional)</span>
                    </label>
                    <div className="relative flex items-center bg-[#131A2A] border border-white/10 hover:border-white/20 focus-within:border-teal-500 rounded-lg transition-colors">
                      <div className="absolute left-4 text-slate-500"><Ticket className="w-4 h-4" /></div>
                      <input type="text" name="promoCode" value={formData.promoCode} onChange={handleInputChange} placeholder="Punya kode voucher? Ketik di sini..." className="w-full bg-transparent text-white text-sm py-3 pl-11 pr-4 outline-none uppercase placeholder:normal-case" />
                    </div>
                  </div>

                  {/* FIELD MESSAGE */}
                  <div>
                    <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider ml-1 mb-1 block">Kebutuhan Bisnis RECA (Opsional)</label>
                    <div className="relative flex items-start bg-[#131A2A] border border-white/10 hover:border-white/20 focus-within:border-teal-500 rounded-lg transition-colors pt-3">
                      <div className="absolute left-4 text-slate-500"><MessageSquare className="w-4 h-4" /></div>
                      <textarea name="message" value={formData.message} onChange={handleInputChange} rows={3} placeholder="Ceritakan singkat bisnis F&B yang ingin dibangun..." className="w-full bg-transparent text-white text-sm pb-3 pl-11 pr-4 outline-none resize-none" />
                    </div>
                  </div>

                  {/* SUBMIT BUTTON */}
                  <div className="pt-4 mt-6 border-t border-white/5">
                    <button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-teal-400 to-blue-500 hover:from-teal-300 hover:to-blue-400 text-[#0A0F1C] font-extrabold text-sm py-4 px-6 rounded-xl transition-all shadow-[0_0_20px_rgba(45,212,191,0.2)]"
                    >
                      {isSubmitting ? (
                        <span className="flex items-center gap-2"><span className="animate-spin h-4 w-4 border-2 border-[#0A0F1C] border-t-transparent rounded-full"></span> Memproses...</span>
                      ) : (
                        <>Kirim ke WhatsApp <Send className="w-4 h-4" /></>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* STYLE UNTUK CUSTOM SCROLLBAR */}
      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(45, 212, 191, 0.2); border-radius: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(45, 212, 191, 0.5); }
      `}} />
    </section>
  );
}