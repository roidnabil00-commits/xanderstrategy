// ============================================================================
// FILE: components/CtaSection.tsx
// ============================================================================
"use client";

import React, { useState, FormEvent, ChangeEvent } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { 
  Send, 
  User, 
  Phone, 
  Mail, 
  MessageSquare, 
  Package, 
  Clock, 
  AlertOctagon,
  ShieldCheck,
  Zap,
  ArrowRight
} from "lucide-react";

// ============================================================================
// 1. INTERFACES & TYPE DEFINITIONS
// ============================================================================

/**
 * Interface untuk struktur data formulir prospek klien SBB.
 * Memastikan semua field terdefinisi dengan baik sebelum dikirim ke WA.
 */
interface ProspectFormData {
  name: string;
  phone: string;
  email: string;
  package: string;
  message: string;
}

/**
 * Interface untuk input error state.
 */
interface FormErrors {
  name?: string;
  phone?: string;
  email?: string;
  package?: string;
  message?: string;
}

/**
 * Properti untuk komponen InputField kustom.
 */
interface InputFieldProps {
  id: string;
  label: string;
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  error?: string;
  icon: React.ReactNode;
  isTextArea?: boolean;
}

// ============================================================================
// 2. CONSTANTS & MOCK DATA
// ============================================================================

/** Nomor WhatsApp tujuan. Wajib format angka diawali kode negara (62 untuk Indonesia). */
const WA_TARGET_NUMBER = "6281931656410";

/** Daftar pilihan paket SBB untuk dropdown */
const PACKAGE_OPTIONS = [
  { value: "", label: "-- Pilih Katalog SBB --" },
  { value: "Free - Riset Awal 1 Lokasi", label: "Single / Free (Gratis Riset Awal)" },
  { value: "Premium - SBB Basic", label: "Premium (SBB Basic)" },
  { value: "Business - SBB Pro", label: "Business (SBB Pro - Paling Diminati)" },
  { value: "Corporate - Master Blueprint", label: "Corporate (Master Blueprint)" },
];

// ============================================================================
// 3. FRAMER MOTION VARIANTS (SISTEM ANIMASI)
// ============================================================================

const sectionVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { duration: 0.8, ease: "easeOut", staggerChildren: 0.2 }
  }
};

const leftContentVariants: Variants = {
  hidden: { opacity: 0, x: -30 },
  visible: { 
    opacity: 1, 
    x: 0, 
    transition: { duration: 0.6, ease: "easeOut", staggerChildren: 0.15 } 
  }
};

const rightFormVariants: Variants = {
  hidden: { opacity: 0, x: 30 },
  visible: { 
    opacity: 1, 
    x: 0, 
    transition: { duration: 0.6, ease: "easeOut", delay: 0.3 } 
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

const glowVariants: Variants = {
  pulse: {
    opacity: [0.3, 0.6, 0.3],
    scale: [0.95, 1.05, 0.95],
    transition: { duration: 4, repeat: Infinity, ease: "easeInOut" }
  }
};

// ============================================================================
// 4. HELPER FUNCTIONS
// ============================================================================

/**
 * Membuat format pesan URL WhatsApp yang dinamis berdasarkan input user.
 * Menggunakan encodeURIComponent agar enter/spasi terbaca benar di WA.
 */
const generateWhatsAppURL = (data: ProspectFormData): string => {
  const textMessage = `Halo Tim Xander SBB,

Saya tertarik untuk konsultasi dan mengamankan slot SBB bulan ini. Berikut data saya:

*Nama:* ${data.name}
*No. WhatsApp:* ${data.phone}
*Email:* ${data.email}
*Paket Pilihan:* ${data.package}

*Kebutuhan Bisnis/Pertanyaan Tambahan:*
${data.message || "-"}

Mohon info lebih lanjut mengenai proses eksekusinya. Terima kasih!`;

  return `https://wa.me/${WA_TARGET_NUMBER}?text=${encodeURIComponent(textMessage)}`;
};

// ============================================================================
// 5. SUB-COMPONENTS
// ============================================================================

/**
 * [SUB-COMPONENT] CtaBackground
 * Latar belakang section dengan sentuhan warna urgensi (Amber/Rose)
 * yang memudar ke warna dasar gelap.
 */
const CtaBackground: React.FC = () => {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
      {/* Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.02]" 
        style={{ 
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h40v40H0V0zm20 20h20v20H20V20zM0 20h20v20H0V20z' fill='%232dd4bf' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E")` 
        }}
      ></div>
      
      {/* Glow Merah/Amber di Kiri (Untuk nuansa Scarcity/Urgensi) */}
      <motion.div 
        variants={glowVariants}
        animate="pulse"
        className="absolute top-1/2 left-0 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-amber-900/10 rounded-full blur-[100px] transform -translate-y-1/2"
      ></motion.div>
      
      {/* Glow Teal di Kanan (Untuk form area) */}
      <motion.div 
        variants={glowVariants}
        animate="pulse"
        style={{ animationDelay: "2s" }}
        className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-teal-900/10 rounded-full blur-[100px] transform translate-x-1/4 translate-y-1/4"
      ></motion.div>
    </div>
  );
};

/**
 * [SUB-COMPONENT] InputField
 * Komponen reusable untuk input teks, nomor, email, atau textarea.
 * Dilengkapi dengan ikon di sebelah kiri dan handling status error.
 */
const InputField: React.FC<InputFieldProps> = ({ 
  id, label, type = "text", placeholder, value, onChange, error, icon, isTextArea = false 
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="flex flex-col gap-1 w-full mb-4">
      <label htmlFor={id} className="text-xs font-semibold text-slate-400 uppercase tracking-wider ml-1">
        {label}
      </label>
      <div className={`relative flex items-start w-full bg-[#0A0F1C]/50 border rounded-lg transition-all duration-300 overflow-hidden ${
        error 
          ? "border-rose-500/50 shadow-[0_0_10px_rgba(244,63,94,0.1)]" 
          : isFocused 
            ? "border-teal-500/50 shadow-[0_0_15px_rgba(45,212,191,0.15)]" 
            : "border-white/10 hover:border-white/20"
      }`}>
        {/* Ikon Input */}
        <div className={`absolute top-0 left-0 bottom-0 flex items-center justify-center w-12 border-r border-white/5 transition-colors ${
          error ? "bg-rose-500/10 text-rose-400" : isFocused ? "bg-teal-500/10 text-teal-400" : "bg-white/5 text-slate-500"
        }`}>
          {/* Posisi ikon disesuaikan jika textarea agar tetap berada di atas */}
          <div className={isTextArea ? "absolute top-3" : ""}>
            {icon}
          </div>
        </div>

        {/* Element Input HTML */}
        {isTextArea ? (
          <textarea
            id={id}
            name={id}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            rows={4}
            className="w-full bg-transparent text-white text-sm px-4 py-3 pl-14 outline-none resize-none placeholder:text-slate-600 focus:ring-0"
          />
        ) : (
          <input
            id={id}
            name={id}
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className="w-full bg-transparent text-white text-sm px-4 py-3.5 pl-14 outline-none placeholder:text-slate-600 focus:ring-0"
          />
        )}
      </div>
      
      {/* Pesan Error */}
      <AnimatePresence>
        {error && (
          <motion.span 
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            className="text-xs text-rose-400 ml-1 mt-0.5"
          >
            {error}
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  );
};

/**
 * [SUB-COMPONENT] ScarcityContent
 * Area copywriting sebelah kiri. Menghantam sisi psikologis klien
 * dengan memberikan urgensi (slot terbatas, waktu terus berjalan).
 */
const ScarcityContent: React.FC = () => {
  return (
    <motion.div variants={leftContentVariants} className="flex flex-col h-full justify-center pr-0 lg:pr-10">
      
      {/* Badge Scarcity (Animasi berkedip) */}
      <motion.div variants={itemVariants} className="inline-flex items-center space-x-2 bg-rose-500/10 border border-rose-500/30 px-3 py-1.5 rounded-full mb-6 w-max">
        <span className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-rose-500"></span>
        </span>
        <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-rose-400">
          Kapasitas Tersisa: 2 Klien Bulan Ini
        </span>
      </motion.div>

      {/* Headline Utama */}
      <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-[1.15] mb-6">
        Siap Menguasai Pasar Sebelum <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-rose-400">Keduluan Kompetitor?</span>
      </motion.h2>

      {/* Body Copy */}
      <motion.p variants={itemVariants} className="text-base md:text-lg text-slate-300 leading-relaxed mb-6">
        Karena kualitas analisis SBB ditangani langsung oleh konsultan utama, kami membatasi kapasitas maksimal hanya untuk <span className="font-bold text-white border-b border-rose-500">3-4 klien eksklusif setiap bulannya.</span>
      </motion.p>
      
      <motion.p variants={itemVariants} className="text-sm md:text-base text-slate-400 leading-relaxed mb-10 flex items-start gap-3 bg-white/5 p-4 rounded-xl border border-white/10">
        <Clock className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
        <span>Waktu terus berjalan. Jangan biarkan ide bisnis Anda hanya menjadi angan-angan yang dicuri oleh pesaing Anda.</span>
      </motion.p>

      {/* Value Pointers (Keuntungan Langsung) */}
      <motion.div variants={itemVariants} className="grid grid-cols-2 gap-4 mt-auto border-t border-white/10 pt-8">
        <div className="flex items-center gap-3">
          <ShieldCheck className="w-8 h-8 text-teal-500 bg-teal-500/10 p-1.5 rounded-lg" />
          <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">Garansi<br/>Privasi Data</span>
        </div>
        <div className="flex items-center gap-3">
          <Zap className="w-8 h-8 text-amber-500 bg-amber-500/10 p-1.5 rounded-lg" />
          <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">Eksekusi<br/>Lebih Cepat</span>
        </div>
      </motion.div>

    </motion.div>
  );
};

/**
 * [SUB-COMPONENT] WhatsAppForm
 * Area formulir di sebelah kanan. Memvalidasi input dan 
 * meng-generate link direct WhatsApp saat tombol disubmit.
 */
const WhatsAppForm: React.FC = () => {
  // State manajemen formulir
  const [formData, setFormData] = useState<ProspectFormData>({
    name: "",
    phone: "",
    email: "",
    package: "",
    message: ""
  });
  
  // State manajemen error validasi
  const [errors, setErrors] = useState<FormErrors>({});
  
  // State proses pengiriman (efek loading UI sesaat)
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handler perubahan input
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Hapus error state jika user mulai mengetik ulang
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  // Validasi formulir dasar sebelum dilempar ke WA
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    if (!formData.name.trim()) newErrors.name = "Nama wajib diisi";
    if (!formData.phone.trim()) {
      newErrors.phone = "No. WhatsApp wajib diisi";
    } else if (!/^[0-9+\-\s]+$/.test(formData.phone)) {
      newErrors.phone = "Format nomor tidak valid";
    }
    if (!formData.package) newErrors.package = "Silakan pilih salah satu paket";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handler Submit Formulir
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsSubmitting(true);
      
      // Simulasi loading sekian milidetik agar transisinya kerasa premium
      setTimeout(() => {
        const waUrl = generateWhatsAppURL(formData);
        window.open(waUrl, '_blank'); // Buka link WA di tab baru
        setIsSubmitting(false);
      }, 800);
    }
  };

  return (
    <motion.div variants={rightFormVariants} className="h-full relative">
      {/* Decorative Glow di belakang formulir */}
      <div className="absolute inset-0 bg-gradient-to-br from-teal-500/5 to-blue-500/5 rounded-3xl transform translate-x-2 translate-y-2 blur-sm"></div>
      
      {/* Kotak Formulir Utama */}
      <div className="relative bg-[#131A2A] border border-white/10 rounded-3xl p-6 md:p-10 shadow-2xl shadow-black/50 z-10">
        
        {/* Header Form */}
        <div className="mb-8">
          <h3 className="text-xl md:text-2xl font-bold text-white mb-2">Amankan Slot Anda Bulan Ini!</h3>
          <p className="text-sm text-slate-400">Isi data di bawah, sistem akan meneruskannya ke WhatsApp konsultan kami.</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col">
          
          {/* Kolom 1: Nama */}
          <InputField 
            id="name"
            label="Nama Lengkap"
            placeholder="Ketik nama Anda di sini"
            icon={<User className="w-5 h-5" />}
            value={formData.name}
            onChange={handleChange}
            error={errors.name}
          />

          {/* Kolom 2 & 3: WA & Email (Grid di Desktop) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
            <InputField 
              id="phone"
              label="Nomor WhatsApp"
              type="tel"
              placeholder="Contoh: 0812345..."
              icon={<Phone className="w-5 h-5" />}
              value={formData.phone}
              onChange={handleChange}
              error={errors.phone}
            />
            <InputField 
              id="email"
              label="Email (Opsional)"
              type="email"
              placeholder="nama@email.com"
              icon={<Mail className="w-5 h-5" />}
              value={formData.email}
              onChange={handleChange}
              error={errors.email}
            />
          </div>

          {/* Kolom 4: Dropdown Pilihan Paket */}
          <div className="flex flex-col gap-1 w-full mb-4">
            <label htmlFor="package" className="text-xs font-semibold text-slate-400 uppercase tracking-wider ml-1">
              Pilihan Paket SBB
            </label>
            <div className={`relative flex items-center w-full bg-[#0A0F1C]/50 border rounded-lg transition-all duration-300 overflow-hidden ${errors.package ? "border-rose-500/50" : "border-white/10 hover:border-white/20"}`}>
              <div className="absolute top-0 left-0 bottom-0 flex items-center justify-center w-12 border-r border-white/5 bg-white/5 text-slate-500 pointer-events-none">
                <Package className="w-5 h-5" />
              </div>
              <select
                id="package"
                name="package"
                value={formData.package}
                onChange={handleChange}
                className={`w-full bg-transparent text-sm px-4 py-3.5 pl-14 outline-none focus:ring-0 appearance-none cursor-pointer ${formData.package ? "text-white" : "text-slate-600"}`}
              >
                {PACKAGE_OPTIONS.map((opt, idx) => (
                  <option key={idx} value={opt.value} className="bg-[#131A2A] text-white py-2">
                    {opt.label}
                  </option>
                ))}
              </select>
              {/* Custom Dropdown Arrow */}
              <div className="absolute right-4 pointer-events-none text-slate-500">
                ▼
              </div>
            </div>
            <AnimatePresence>
              {errors.package && (
                <motion.span initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }} className="text-xs text-rose-400 ml-1 mt-0.5">
                  {errors.package}
                </motion.span>
              )}
            </AnimatePresence>
          </div>

          {/* Kolom 5: Pertanyaan / Kebutuhan (Textarea) */}
          <InputField 
            id="message"
            label="Apa Yang Ingin Dibangun? (Opsional)"
            placeholder="Ceritakan singkat tentang bisnis yang ingin Anda buka atau tantangan yang sedang dihadapi..."
            icon={<MessageSquare className="w-5 h-5" />}
            value={formData.message}
            onChange={handleChange}
            error={errors.message}
            isTextArea={true}
          />

          {/* Tombol Submit Utama */}
          <button 
            type="submit"
            disabled={isSubmitting}
            className={`mt-4 w-full flex items-center justify-center gap-3 bg-gradient-to-r from-teal-400 to-blue-500 hover:from-teal-300 hover:to-blue-400 text-[#0A0F1C] font-extrabold text-sm md:text-base py-4 px-6 rounded-xl transition-all shadow-[0_0_20px_rgba(45,212,191,0.2)] hover:shadow-[0_0_30px_rgba(45,212,191,0.4)] transform ${isSubmitting ? 'scale-95 opacity-80' : 'hover:-translate-y-1'}`}
          >
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <span className="animate-spin h-5 w-5 border-2 border-[#0A0F1C] border-t-transparent rounded-full"></span>
                Memproses...
              </span>
            ) : (
              <>
                Ya, Saya Mau Konsultasi Gratis Dulu! <Send className="w-5 h-5" />
              </>
            )}
          </button>

          {/* Footer Teks Bawah Tombol */}
          <div className="mt-5 text-center flex flex-col items-center justify-center gap-2">
            <span className="text-[10px] md:text-xs text-slate-500">
              Klik tombol di atas untuk terhubung langsung via WhatsApp dengan tim kami.
            </span>
            <div className="flex items-center gap-1.5 text-[10px] text-teal-500/70 font-medium bg-teal-500/10 px-2 py-1 rounded">
              <AlertOctagon className="w-3 h-3" />
              Tindak lanjut biasanya direspon dalam kurun waktu 1-2 jam.
            </div>
          </div>

        </form>
      </div>
    </motion.div>
  );
};

// ============================================================================
// 6. MAIN COMPONENT EXPORT (CTA SECTION)
// ============================================================================

/**
 * Komponen Utama CtaSection
 * Menyatukan Background, Copywriting Kiri (Scarcity), dan Form Kanan (WhatsApp).
 * Layout menggunakan Grid 2 kolom di layar besar (lg) dan bertumpuk di layar kecil.
 */
export default function CtaSection() {
  return (
    <motion.section 
      id="cta" 
      className="relative py-20 md:py-32 bg-[#0A0F1C] overflow-hidden border-t border-white/5"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={sectionVariants}
    >
      <CtaBackground />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          
          {/* Kolom Kiri: Copywriting Scarcity */}
          <ScarcityContent />

          {/* Kolom Kanan: Form WhatsApp */}
          <WhatsAppForm />

        </div>
      </div>
    </motion.section>
  );
}

