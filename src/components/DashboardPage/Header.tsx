import React, { useState } from "react";
import { Bell, CircleUser, X, RefreshCw, BellOff } from "lucide-react";

export default function Header({ title, onProfileClick, onViewDetail, reports}) {

  const [showNotif, setShowNotif] = useState(false);

  // Data simulasi untuk notifikasi
  const dummyNotif = {
    id: "SFK-2026-001",
    lokasi: "Gedung Ki Hajar Dewantara",
    ruang: "Ruang FIKLAB-201",
    status: "Inprogress",
    tgl: "17 April 2026",
    masalah: "Pemborosan Listrik",
    deskripsi: "AC diruangan FIKLAB 201 Sering masih menyala ketika sore hari , dan tiap hari kamis"
  };

return (
    <div className="flex justify-between items-center mb-8 pb-4 border-b border-gray-200 relative">
      <h2 className="text-2xl font-bold text-[#107C41]">{title}</h2>
      
      <div className="flex gap-6 items-center text-gray-400">
        <div className="relative">
          <button 
            onClick={() => setShowNotif(!showNotif)}
            className={`hover:text-[#107C41] transition-all relative ${showNotif ? 'text-[#107C41]' : ''}`}
          >
            <Bell size={22} />
            {/* Badge merah hanya muncul jika sudah ada laporan/notifikasi */}
            {reports.length > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-red-500 border-2 border-white rounded-full"></span>
            )}
          </button>

          {showNotif && (
            <div className="absolute top-full right-0 mt-4 w-80 bg-white shadow-2xl rounded-3xl border border-gray-100 z-100 animate-in slide-in-from-top-2 duration-300">
              <div className="absolute -top-2 right-2 w-4 h-4 bg-white rotate-45 border-t border-l border-gray-50"></div>

              <div className="p-6 relative">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-bold text-gray-800">Notification</h3>
                  <button onClick={() => setShowNotif(false)} className="text-gray-400 hover:text-gray-600">
                    <X size={20} />
                  </button>
                </div>

                {/* --- LOGIKA EMPTY STATE NOTIFIKASI (Sesuai Gambar Terbaru) --- */}
                {reports.length === 0 ? (
                  <div className="py-10 flex flex-col items-center justify-center text-center">
                    <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mb-4 text-gray-400">
                      <BellOff size={32} />
                    </div>
                    <p className="text-sm font-bold text-gray-700 mb-1">Belum Ada Notifikasi</p>
                    <p className="text-[11px] text-gray-400 px-6 leading-relaxed">
                      Notifikasi akan muncul saat status laporanmu berubah
                    </p>
                  </div>
                ) : (
                  /* TAMPILAN JIKA SUDAH ADA LAPORAN (Notifikasi Muncul) */
                  <div className="flex gap-4 items-start">
                    <div className="w-2 h-2 bg-[#107C41] rounded-full mt-5 shrink-0"></div>
                    <div className="w-12 h-12 bg-[#E8F5EE] text-[#107C41] rounded-xl flex items-center justify-center shrink-0">
                      <RefreshCw size={20} />
                    </div>
                    <div className="flex-1 space-y-3">
                      <p className="text-[12px] text-gray-600 leading-relaxed">
                        Status laporan kamu di <span className="font-bold text-[#107C41]">Gedung Ki Hajar Dewantara</span> berubah menjadi <span className="font-bold text-[#7C5A10]">In Progress</span>
                      </p>
                      <div className="flex justify-between items-center">
                        <span className="text-[10px] text-gray-400">Baru saja</span>
                        <button 
                          onClick={() => { onViewDetail(dummyNotif); setShowNotif(false); }}
                          className="text-[11px] font-black text-[#107C41] hover:underline"
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

        <button onClick={onProfileClick} className="hover:text-[#107C41] transition-all">
          <CircleUser size={24} />
        </button>
      </div>
    </div>
  );
}