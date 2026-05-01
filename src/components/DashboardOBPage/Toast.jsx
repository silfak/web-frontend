import React, { useEffect, useState } from "react";
import { CheckCircle2, X } from "lucide-react";

export default function Toast({ message, isOpen, onClose }) {
    const [shouldRender, setShouldRender] = useState(isOpen);
    const [isAnimating, setIsAnimating] = useState(false);

    // logika toast
    useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      // Memberikan waktu kecil bagi React untuk render DOM sebelum menjalankan animasi masuk
      const startTimer = setTimeout(() => setIsAnimating(true), 10);

      // Auto-hide setelah 3 detik
      const closeTimer = setTimeout(() => {
        handleClose();
      }, 5000);

      return () => {
        clearTimeout(startTimer);
        clearTimeout(closeTimer);
      };
    }
  }, [isOpen]);

  const handleClose = () => {
    setIsAnimating(false); // Memicu animasi keluar (geser ke kanan)
    
    // Tunggu durasi transisi selesai baru hilangkan dari DOM dan lapor ke parent
    setTimeout(() => {
      setShouldRender(false);
      onClose();
    }, 500); 
  };

  // Gunakan shouldRender sebagai kontrol utama, bukan isOpen
  if (!shouldRender || !message) return null;

    return (
    <div 
      className={`fixed top-8 right-8 z-200 transform transition-all duration-500 ease-in-out
        ${isAnimating 
          ? "translate-x-0 opacity-100" // Muncul sempurna
          : "translate-x-full opacity-0" // Bergeser ke kanan dan menghilang
        }`}
    >
      <div className="bg-white border-l-4 border-[#107C41] rounded-xl shadow-2xl p-4 flex items-start gap-3 max-w-70">
        {/* Ikon Checkmark */}
        <div className="bg-[#E8F5EE] text-[#107C41] p-2 rounded-full shrink-0">
          <CheckCircle2 size={20} />
        </div>

        {/* Konten Teks */}
        <div className="flex-1">
          <p className="text-[13px] font-bold text-gray-700 leading-snug">
            {message}
          </p>
        </div>

        {/* Tombol Close Manual */}
        <button 
          onClick={(e) => {
            e.stopPropagation();
            handleClose();
          }}
          className="text-gray-400 hover:text-gray-600 transition-colors p-1"
        >
          <X size={18} />
        </button>
      </div>
    </div>
  );
}