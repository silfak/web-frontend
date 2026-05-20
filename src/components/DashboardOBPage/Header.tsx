import React, { useState } from "react";
import { Bell, CircleUser, X, ClipboardList, BellOff } from "lucide-react";
import type { Report } from "@/types";

interface HeaderProps {
  title: string;
  onProfileClick: () => void;
  onViewDetail: (report: Report) => void;
  reports?: Report[];
}

export default function Header({ title, onProfileClick, onViewDetail, reports = [] }: HeaderProps) {
  // State kontrol buka/tutup pop-up
  const [showNotif, setShowNotif] = useState(false);

  // Mengambil data laporan terbaru untuk ditampilkan di notifikasi
  const latestReport = reports.length > 0 ? reports[0] : null;

return (
    <div className="flex justify-between items-center mb-8 pb-4 border-b border-gray-200 relative">
      <h2 className="text-2xl font-bold text-[#107C41]">{title}</h2>
      
      <div className="flex gap-6 items-center text-gray-400">
        
        {/* --- CONTAINER LONCENG --- */}
        <div className="relative">
          <button 
            onClick={() => setShowNotif(!showNotif)}
            className={`hover:text-[#107C41] transition-all relative ${showNotif ? 'text-[#107C41]' : ''}`}
          >
            <Bell size={22} />
            {/* Badge merah muncul jika ada laporan baru */}
            {reports.length > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-red-500 border-2 border-white rounded-full"></span>
            )}
          </button>

          {/* --- POP-UP NOTIFICATION OB --- */}
          {showNotif && (
            <div className="absolute top-full right-0 mt-4 w-96 bg-white shadow-2xl rounded-3xl border border-gray-50 z-100 animate-in slide-in-from-top-2 duration-300">
              {/* Segitiga Penunjuk */}
              <div className="absolute -top-2 right-2 w-4 h-4 bg-white rotate-45 border-t border-l border-gray-50"></div>

              <div className="p-6 relative">
                {/* Header Pop-up */}
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-bold text-gray-800">Notification</h3>
                  <button onClick={() => setShowNotif(false)} className="text-gray-400 hover:text-gray-600">
                    <X size={20} />
                  </button>
                </div>

                {/* --- LOGIKA KONDISIONAL (EMPTY VS TERISI) --- */}
                {reports.length === 0 ? (
                  /* TAMPILAN KOSONG (gambar_18.png) */
                  <div className="py-10 flex flex-col items-center justify-center text-center">
                    <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mb-4 text-gray-400">
                      <BellOff size={32} />
                    </div>
                    <p className="text-sm font-bold text-gray-700 mb-1">Belum Ada Notifikasi</p>
                    <p className="text-[11px] text-gray-400 px-6 leading-relaxed">
                      Notifikasi akan muncul saat ada laporan baru dari mahasiswa atau staf.
                    </p>
                  </div>
                ) : (
                  /* TAMPILAN NOTIFIKASI BARU OB (gambar_20.png) */
                  <div className="flex gap-4 items-start relative">
                    {/* Dot Hijau Indikator Baru */}
                    <div className="w-2.5 h-2.5 bg-[#107C41] rounded-full mt-5 shrink-0"></div>

                    {/* Icon Clipboard Box Hijau Muda */}
                    <div className="w-12 h-12 bg-[#E8F5EE] text-[#107C41] rounded-xl flex items-center justify-center shrink-0">
                      <ClipboardList size={22} />
                    </div>

                    {/* Teks Pesan OB */}
                    <div className="flex-1 space-y-3">
                      <div className="text-[13px] text-gray-600 leading-snug">
                        Laporan Baru masuk di <span className="font-bold text-[#107C41]">{latestReport?.ruang}</span>
                        <p className="font-bold text-[#107C41]">{latestReport?.lokasi}</p>
                      </div>
                      
                      <div className="flex justify-between items-center pt-1">
                        <span className="text-[10px] text-gray-400 font-medium">Baru saja</span>
                        <button 
                          onClick={() => {
                            if (latestReport) onViewDetail(latestReport); 
                            setShowNotif(false);
                          }}
                          className="text-xs font-bold text-[#107C41] hover:underline"
                        >
                          Lihat Laporan
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* PROFILE BUTTON */}
        <button onClick={onProfileClick} className="hover:text-[#107C41] transition-all">
          <CircleUser size={24} />
        </button>
      </div>
    </div>
  );
}
