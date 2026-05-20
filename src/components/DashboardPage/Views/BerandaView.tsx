import React from "react";
import ReportTable from "@/components/DashboardPage/Views/ReportTable";
import { FilePlus, ClipboardList } from "lucide-react";

export default function BerandaView({ reports, onViewDetail, onOpenModal }) {
const isReportsEmpty = reports.length === 0;

return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Tombol Buat Laporan Baru */}
      <button 
        onClick={onOpenModal}
        className="flex items-center gap-2 bg-[#107C41] text-white px-8 py-3.5 rounded-xl font-bold shadow-lg hover:bg-[#0d6334] transition-all"
      >
        <FilePlus size={20} /> Buat Laporan Baru
      </button>

      <div className="space-y-4">
        {/* Header Sekunder */}
        <div className="flex items-center gap-3 font-bold text-[#107C41] text-lg">
          <ClipboardList size={24} /> 
          <h3>Riwayat Laporan</h3>
        </div>

        {/* --- CONDITIONAL RENDERING --- */}
        {isReportsEmpty ? (
          /* DESAIN GAMBAR PERTAMA: EMPTY STATE */
          <div className="w-full bg-white border border-gray-100 rounded-4xl p-20 flex flex-col items-center justify-center shadow-sm">
            {/* Container Ikon dengan Background Bulat Halus */}
            <div className="w-24 h-24 bg-[#E8F5EE] rounded-full flex items-center justify-center mb-6">
              <ClipboardList size={40} className="text-[#107C41]" />
            </div>

            {/* Teks Header & Deskripsi (Sesuai Gambar 16) */}
            <div className="text-center max-w-sm space-y-2">
              <h4 className="text-xl font-bold text-[#107C41]">
                Belum ada Riwayat Laporan
              </h4>
              <p className="text-sm text-gray-400 font-medium leading-relaxed">
                Anda belum memiliki catatan laporan fasilitas. Gunakan tombol 
                'Buat laporan baru' di atas untuk melaporkan kendala yang Anda temui di kampus.
              </p>
            </div>
          </div>
        ) : (
          /* TAMPILAN JIKA ADA DATA (TABEL) */
          <div className="animate-in zoom-in-95 duration-300">
             <ReportTable reports={reports} onViewDetail={onViewDetail} />
          </div>
        )}
      </div>
    </div>
  );
}