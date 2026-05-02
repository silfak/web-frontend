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

  // Logika untuk mengecek apakah message punya title & desc (objek) atau hanya string biasa
  const hasTitle = typeof message === 'object' && message.title;

    return (
    <div 
      className={`fixed top-8 right-8 z-200 transform transition-all duration-500 ease-in-out
        ${isAnimating 
          ? "translate-x-0 opacity-100" // Muncul sempurna
          : "translate-x-full opacity-0" // Bergeser ke kanan dan menghilang
        }`}
    >
      {/* max-w-[320px] agar pas dengan desain dua baris */}
      <div className="bg-white border-l-4 border-[#107C41] rounded-xl shadow-2xl p-5 flex items-start gap-4 max-w-95">
        <div className="bg-[#E8F5EE] text-[#107C41] p-2 rounded-full shrink-0">
          <CheckCircle2 size={24} />
        </div>

        <div className="flex-1 space-y-1">
          {hasTitle ? (
            <>
              <p className="text-sm font-bold text-[#107C41] leading-tight">
                {message.title}
              </p>
              <p className="text-xs text-gray-500 leading-relaxed">
                {message.desc}
              </p>
            </>
          ) : (
            <p className="text-sm font-bold text-gray-700 leading-snug pt-1">
              {message}
            </p>
          )}
        </div>

        <button 
          onClick={(e) => {
            e.stopPropagation();
            handleClose();
          }}
          className="text-gray-400 hover:text-gray-600 transition-colors p-1"
        >
          <X size={20} />
        </button>
      </div>
    </div>
  );
}