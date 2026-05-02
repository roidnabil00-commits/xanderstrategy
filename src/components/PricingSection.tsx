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
  Package,
  Store, // Icon for Offline
  Globe, // Icon for Online
  Ticket // Icon for Promo/Voucher
} from "lucide-react";

// ============================================================================
// 1. INTERFACES & TYPE DEFINITIONS
// ============================================================================

interface FeatureItem {
  title: string;
}

interface PricingData {
  id: string;
  category: "offline" | "online"; // Identifier kategori
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
  promoCode: string; // <-- Tambahan untuk field promo/referral
}

interface FormErrors {
  name?: string;
  phone?: string;
}

// ============================================================================
// 2. CONSTANTS & DATA (GABUNGAN 8 PAKET)
// ============================================================================

const WA_TARGET_NUMBER = "6281931656410";

const pricingData: PricingData[] = [
  // --- KATEGORI OFFLINE (FISIK) ---
  {
    id: "offline-1",
    category: "offline",
    tier: "SINGLE",
    headline: "Snapshot Pasar",
    price: "Rp. 500.000",
    desc: "PDF, via WhatsApp dalam 24 jam",
    features: [
      { title: "Potensi pasar di lokasi target berdasarkan data aktual" },
      { title: "3 kompetitor terdekat beserta kelemahan utama mereka" },
      { title: "1 celah pasar yang belum diisi siapapun di area tersebut" },
      { title: "Skor kelayakan: Rendah / Sedang / Tinggi" },
      { title: "1 rekomendasi strategis personal dari kami" },
      { title: "Hasil: PDF 1 halaman via WA" }
    ],
    buttonText: "Pilih Paket Single",
    popular: false
  },
  {
    id: "offline-2",
    category: "offline",
    tier: "BASIC",
    headline: "Kelayakan Lokasi",
    price: "Rp 1–1,5 Juta",
    desc: "PDF 8–12 halaman, delivered 1-2 hari kerja",
    features: [
      { title: "Analisis traffic lokasi: jam sibuk, hari paling ramai, pola kunjungan" },
      { title: "Daya beli warga di area target berdasarkan data dan profil demografis" },
      { title: "Aksesibilitas lokasi: parkir, visibilitas dari jalan utama, kemudahan akses" },
      { title: "Analisis 5 kompetitor terdekat: konsep, harga jual, dan kekuatan mereka" },
      { title: "Kelemahan kompetitor berdasarkan review Google Maps dan media sosial" },
      { title: "1 peluang konkret yang bisa langsung diambil dari gap kompetitor" },
      { title: "Hasil: PDF via Google Drive" }
    ],
    buttonText: "Pilih Paket Basic",
    popular: false
  },
  {
    id: "offline-3",
    category: "offline",
    tier: "BUSINESS / PRO",
    headline: "Strategic Blueprint",
    price: "Rp 3–5 Juta",
    desc: "PDF + PPT Strategic Blueprint, delivered 3-5 hari kerja",
    features: [
      { title: "Estimasi traffic dan volume transaksi harian kompetitor di lapangan" },
      { title: "Pemetaan anchor tenant dan magnet pengunjung di sekitar lokasi target" },
      { title: "Analisis supply chain dan vendor utama kompetitor di industri tersebut" },
      { title: "Business Model Canvas 9 pilar dirancang khusus untuk bisnis dan lokasi kamu" },
      { title: "Positioning statement dan brand archetype vs kompetitor" },
      { title: "Marketing strategy: channel prioritas, taktik per channel, dan guidline" },
      { title: "Seasonal strategy: cara menghadapi peak, shoulder, dan low season" },
      { title: "Cara mengubah tim kamu menjadi aset marketing karyawan sebagai brand ambassador" },
      { title: "Go-to-market plan dari pre-launch sampai bulan pertama buka" },
      { title: "Action plan 30 hari pertama siap eksekusi" },
      { title: "Hasil: PDF Strategic Blueprint via Google Drive" }
    ],
    buttonText: "Pilih Paket Business",
    popular: true
  },
  {
    id: "offline-4",
    category: "offline",
    tier: "CORPORATE",
    headline: "Master End-to-End",
    price: "Rp 7–10 Juta",
    desc: "PPT + PDF delivered 3-7 hari kerja",
    features: [
      { title: "Competitor intelligence mendalam: estimasi revenue, pola operasional, dan strategi pricing" },
      { title: "Pemetaan ekosistem bisnis lengkap: pemain, supplier, dan mitra strategis" },
      { title: "Analisis sentimen pelanggan kompetitor dari semua platform secara menyeluruh" },
      { title: "Business Model Canvas premium dengan validasi data lapangan" },
      { title: "Full marketing strategy: brand positioning, channel mix, content direction, dan budget" },
      { title: "Strategi membangun tim marketing internal dari nol" },
      { title: "Word-of-mouth engineering: sistem rekomendasi natural dari pelanggan" },
      { title: "Kampanye pre-launch sampai 90 hari pertama secara detail" },
      { title: "Lobbying roadmap: cara mendekati komunitas lokal, tokoh daerah, dan mitra strategis" },
      { title: "Executive pitch deck PPT 9–12 slide siap presentasi ke investor" },
      { title: "Pendampingan retainer 30 hari via WhatsApp" },
      { title: "Hasil: PPT + PDF dalam 1 folder Google Drive" }
    ],
    buttonText: "Pilih Paket Corporate",
    popular: false
  },

  // --- KATEGORI ONLINE (DIGITAL) ---
  {
    id: "online-1",
    category: "online",
    tier: "SINGLE",
    headline: "Snapshot Digital",
    price: "Rp.500.000",
    desc: "PDF, via WhatsApp dalam 24 jam",
    features: [
      { title: "Potensi pasar digital untuk kategori produk atau jasa kamu" },
      { title: "3 kompetitor online terdekat beserta kelemahan utama mereka" },
      { title: "1 celah pasar digital yang belum diisi siapapun" },
      { title: "Skor kelayakan: Rendah / Sedang / Tinggi" },
      { title: "1 rekomendasi strategis personal dari kami" },
      { title: "Hasil: PDF 1 halaman via WA" }
    ],
    buttonText: "Minta Riset",
    popular: false
  },
  {
    id: "online-2",
    category: "online",
    tier: "BASIC",
    headline: "Potensi Platform",
    price: "Rp 1–1,5 Juta",
    desc: "PDF 8–12 halaman, delivered 1-2 hari kerja",
    features: [
      { title: "Analisis volume pencarian: seberapa banyak orang mencari di Google dan TikTok" },
      { title: "Identifikasi platform paling potensial: Tokopedia, Shopee, TikTok Shop, atau IG" },
      { title: "Analisis 5 kompetitor online: platform, harga jual, dan konsep konten" },
      { title: "Kelemahan kompetitor berdasarkan review marketplace dan komentar sosmed" },
      { title: "Rating dan reputasi kompetitor di semua platform aktif mereka" },
      { title: "1 peluang konkret yang bisa langsung diambil dari gap kompetitor online" },
      { title: "Hasil: PDF via Google Drive" }
    ],
    buttonText: "Pilih Paket Basic",
    popular: false
  },
  {
    id: "online-3",
    category: "online",
    tier: "BUSINESS / PRO",
    headline: "Digital Blueprint",
    price: "Rp 3–5 Juta",
    desc: "PDF + PPT Strategic Blueprint, delivered 3-5 hari kerja",
    features: [
      { title: "Estimasi traffic bulanan kompetitor berdasarkan data platform dan engagement" },
      { title: "Ad intelligence: iklan kompetitor dan seberapa agresif mereka beriklan" },
      { title: "Content gap analysis: konten yang dicari audiens tapi belum dibuat kompetitor" },
      { title: "Keyword opportunity: kata kunci potensial untuk didominasi lebih cepat" },
      { title: "Review mining mendalam: keluhan pelanggan kompetitor di marketplace" },
      { title: "Business Model Canvas 9 pilar dirancang khusus untuk bisnis online kamu" },
      { title: "Positioning statement dan brand archetype vs kompetitor digital" },
      { title: "Marketing strategy: platform prioritas, taktik per platform, content direction, dan KPI" },
      { title: "Cara mengubah tim jadi aset: admin, CS, dan reseller sebagai brand ambassador" },
      { title: "Go-to-market plan digital dari pre-launch sampai bulan pertama live" },
      { title: "Action plan 30 hari pertama siap eksekusi" },
      { title: "Hasil: PDF Strategic Blueprint via Google Drive" }
    ],
    buttonText: "Pilih Paket Business",
    popular: true
  },
  {
    id: "online-4",
    category: "online",
    tier: "CORPORATE",
    headline: "Master Digital",
    price: "Rp 7–10 Juta",
    desc: "PPT + PDF delivered 3-7 hari kerja",
    features: [
      { title: "Competitor intelligence mendalam: estimasi revenue online, volume, dan pricing" },
      { title: "Pemetaan ekosistem digital: pemain utama, affiliator terbesar, dan mitra strategis" },
      { title: "Analisis sentimen pelanggan kompetitor dari semua platform secara menyeluruh" },
      { title: "Full keyword dan SEO opportunity mapping untuk dominasi jangka panjang" },
      { title: "Platform audit komprehensif: rekomendasi channel mix paling optimal" },
      { title: "Business Model Canvas premium dengan validasi data digital lapangan" },
      { title: "Full marketing strategy: brand positioning digital, budget allocation, dan KPI" },
      { title: "Strategi melatih admin dan CS agar setiap interaksi jadi peluang konversi" },
      { title: "Word-of-mouth engineering digital: sistem rekomendasi dan share natural" },
      { title: "Kampanye pre-launch digital sampai 90 hari pertama secara detail" },
      { title: "Affiliate dan reseller roadmap: cara membangun jaringan penjual" },
      { title: "Executive pitch deck PPT 9–12 slide siap presentasi ke investor" },
      { title: "Pendampingan retainer 30 hari via WhatsApp" },
      { title: "Hasil: PPT + PDF dalam 1 folder Google Drive" }
    ],
    buttonText: "Pilih Paket Corporate",
    popular: false
  }
];

// ============================================================================
// 3. MAIN COMPONENT
// ============================================================================

export default function PricingSection() {
  // State untuk Kategori Tab (Offline / Online)
  const [activeCategory, setActiveCategory] = useState<"offline" | "online">("offline");

  // State untuk Modal & Form
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTier, setSelectedTier] = useState<PricingData | null>(null);
  
  // Ditambahkan inisiasi state promoCode
  const [formData, setFormData] = useState<FormData>({ name: "", phone: "", email: "", message: "", promoCode: "" });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Filter paket berdasarkan kategori aktif
  const filteredData = pricingData.filter(tier => tier.category === activeCategory);

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
      // Reset form beserta field promoCode
      setFormData({ name: "", phone: "", email: "", message: "", promoCode: "" });
    }, 300);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    // Otomatis ubah kode promo menjadi huruf kapital
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
      
      const categoryText = selectedTier.category === 'offline' ? 'Toko Fisik / Offline' : 'Toko Online / Digital';
      
      // Jika ada kode promo, sisipkan ke dalam template WhatsApp
      const promoText = formData.promoCode.trim() !== "" ? `\n*Kode Promo:* ${formData.promoCode.trim()}` : "";
      
      const textMessage = `Halo Tim Xander SBB,

Saya tertarik untuk mengambil paket *${selectedTier.tier} (${categoryText})* bulan ini. Berikut data saya:

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
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight mb-4">
            Pilih Katalog SBB Anda
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto">Dari riset cepat hingga pendampingan korporat end-to-end. Sesuaikan dengan model bisnis Anda.</p>
        </div>

        {/* TAB TOGGLE (OFFLINE VS ONLINE) */}
        <div className="flex justify-center mb-12">
          <div className="bg-[#131A2A] p-1.5 rounded-xl border border-white/10 flex items-center shadow-lg w-full max-w-md">
            <button
              onClick={() => setActiveCategory("offline")}
              className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg text-sm font-bold transition-all ${activeCategory === "offline" ? "bg-teal-500 text-[#0A0F1C] shadow-[0_0_15px_rgba(20,184,166,0.3)]" : "text-slate-400 hover:text-white"}`}
            >
              <Store className="w-4 h-4" /> Buka Toko Fisik
            </button>
            <button
              onClick={() => setActiveCategory("online")}
              className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg text-sm font-bold transition-all ${activeCategory === "online" ? "bg-teal-500 text-[#0A0F1C] shadow-[0_0_15px_rgba(20,184,166,0.3)]" : "text-slate-400 hover:text-white"}`}
            >
              <Globe className="w-4 h-4" /> Bisnis Digital/Online
            </button>
          </div>
        </div>

        {/* PRICING GRID DENGAN ANIMASI TRANSISI SAAT PINDAH TAB */}
        <AnimatePresence mode="wait">
          <motion.div 
            key={activeCategory} // Kunci unik agar animasi ke-trigger saat state berubah
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 items-stretch"
          >
            {filteredData.map((tier, index) => (
              <motion.div
                key={tier.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`relative flex flex-col h-full bg-[#131A2A] rounded-2xl border ${tier.popular ? "border-teal-500 shadow-2xl shadow-teal-500/10" : "border-white/5 hover:border-white/10"} p-6 lg:p-8 transition-all`}
              >
                {tier.popular && (
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
                    <span className="bg-gradient-to-r from-teal-400 to-blue-500 text-[#0A0F1C] text-xs font-bold uppercase tracking-wider py-1 px-4 rounded-full shadow-lg">
                      Paling Diminati
                    </span>
                  </div>
                )}
                
                {/* Header Kartu Harga */}
                <div className="mb-6">
                  <h4 className="text-xl font-bold text-white mb-1">{tier.tier}</h4>
                  <p className="text-teal-400 text-sm font-semibold mb-3">{tier.headline}</p>
                  <p className="text-sm text-slate-400 min-h-[60px] leading-relaxed">{tier.desc}</p>
                </div>
                
                {/* Info Harga */}
                <div className="mb-6 border-b border-white/5 pb-6">
                  <p className="text-xs text-slate-500 uppercase tracking-widest mb-1">Investasi</p>
                  <span className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400">{tier.price}</span>
                </div>
                
                {/* Daftar Fitur (Scrollable if too long to maintain consistent height) */}
                <div className="flex-grow overflow-y-auto custom-scrollbar pr-2 mb-8" style={{ maxHeight: '350px' }}>
                  <ul className="space-y-4">
                    {tier.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start">
                        <CheckCircle2 className={`w-4 h-4 shrink-0 mr-3 mt-0.5 ${tier.popular ? "text-teal-400" : "text-slate-500"}`} />
                        <span className={`text-sm leading-relaxed ${tier.popular ? "text-slate-200" : "text-slate-300"}`}>
                          {feature.title}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                {/* Tombol Aksi */}
                <div className="mt-auto pt-4 border-t border-white/5">
                  <button 
                    onClick={() => handleOpenModal(tier)}
                    className={`block w-full text-center py-3.5 px-4 rounded-xl font-bold transition-all ${tier.popular ? "bg-teal-500 text-[#0A0F1C] hover:bg-teal-400 shadow-[0_0_15px_rgba(20,184,166,0.3)] transform hover:-translate-y-1" : "bg-white/5 text-white hover:bg-white/10 border border-white/10 transform hover:-translate-y-1"}`}
                  >
                    {tier.buttonText}
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
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
                  <h3 className="text-xl font-bold text-white">Amankan Slot SBB Anda</h3>
                  <p className="text-xs text-slate-400 mt-1">Isi data singkat untuk terhubung via WhatsApp.</p>
                </div>
                <button onClick={handleCloseModal} className="p-2 bg-white/5 hover:bg-white/10 rounded-full transition-colors text-slate-400 hover:text-white">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 overflow-y-auto custom-scrollbar">
                <div className="flex items-center gap-3 bg-teal-500/10 border border-teal-500/20 p-4 rounded-xl mb-6">
                  <Package className="w-6 h-6 text-teal-400 shrink-0" />
                  <div>
                    <p className="text-[10px] text-teal-500 font-bold uppercase tracking-widest">
                      Paket {selectedTier.category === 'offline' ? 'Toko Fisik' : 'Digital/Online'}
                    </p>
                    <p className="text-white font-semibold">{selectedTier.tier} <span className="text-slate-400 text-sm">({selectedTier.price})</span></p>
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
                    <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider ml-1 mb-1 block">Kebutuhan Bisnis (Opsional)</label>
                    <div className="relative flex items-start bg-[#131A2A] border border-white/10 hover:border-white/20 focus-within:border-teal-500 rounded-lg transition-colors pt-3">
                      <div className="absolute left-4 text-slate-500"><MessageSquare className="w-4 h-4" /></div>
                      <textarea name="message" value={formData.message} onChange={handleInputChange} rows={3} placeholder="Ceritakan singkat bisnis yang ingin dibangun..." className="w-full bg-transparent text-white text-sm pb-3 pl-11 pr-4 outline-none resize-none" />
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
                        <>Lanjut ke WhatsApp <Send className="w-4 h-4" /></>
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