import ReportTable from "@/components/DashboardPage/Views/ReportTable";
import { ClipboardList, Plus } from "lucide-react";

export default function LaporanView({ reports, onViewDetail, onOpenModal }) {
  const isReportsEmpty = reports.length === 0;

return (
    <div className="animate-in fade-in duration-500 space-y-6">
      {/* Header Halaman (Opsional, sesuaikan dengan desain tim UI kamu) */}
      <div className="flex items-center gap-3 font-bold text-[#107C41] text-lg mb-4">
        <ClipboardList size={24} /> 
        <h3>Riwayat Laporan</h3>
      </div>

      {isReportsEmpty ? (
        /* DESAIN GAMBAR KEDUA: EMPTY STATE LAPORAN */
        <div className="w-full bg-white border border-gray-100 rounded-4xl p-20 flex flex-col items-center justify-center shadow-sm">
          {/* Container Ikon (Sesuai Gambar Screenshot 2026-05-01 110016.png) */}
          <div className="w-24 h-24 bg-[#E8F5EE] rounded-full flex items-center justify-center mb-6">
            <ClipboardList size={40} className="text-[#107C41]" />
          </div>

          {/* Teks Deskripsi */}
          <div className="text-center max-w-sm mb-8 space-y-2">
            <h4 className="text-xl font-bold text-[#107C41]">
              Belum ada Laporan
            </h4>
            <p className="text-sm text-gray-400 font-medium leading-relaxed">
              Anda belum pernah membuat laporan. <br />
              Buat Laporan pertamamu
            </p>
          </div>

          {/* Tombol Tambah di Tengah (Sesuai Gambar Screenshot 2026-05-01 110016.png) */}
          <button 
            onClick={onOpenModal}
            className="flex items-center gap-2 bg-[#107C41] text-white px-6 py-3 rounded-xl font-bold shadow-lg hover:bg-[#0d6334] transition-all active:scale-95"
          >
            <Plus size={20} /> Buat Laporan
          </button>
        </div>
      ) : (
        /* TAMPILAN JIKA ADA DATA (TABEL) */
        <div className="animate-in zoom-in-95 duration-300">
          <ReportTable reports={reports} onViewDetail={onViewDetail} />
        </div>
      )}
    </div>
  );
}