import ReportTable from "@/components/DashboardOBPage/Views/ReportTable";
import { ClipboardList, Plus } from "lucide-react";
import type { Report } from "@/types";

interface LaporanOBProps {
  reports: Report[];
  onOpenModal: () => void;
  onViewDetail: (report: Report) => void;
}

export default function LaporanOB({ reports, onOpenModal, onViewDetail }: LaporanOBProps) {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3 font-bold text-[#107C41] text-lg">
          <ClipboardList size={24} />
          <h3>Riwayat Laporan</h3>
        </div>
        <button
          onClick={onOpenModal}
          className="flex items-center gap-2 bg-[#107C41] text-white px-6 py-2.5 rounded-xl font-bold shadow hover:bg-[#0d6334] transition-all text-sm"
        >
          <Plus size={16} /> Buat Laporan
        </button>
      </div>

      {reports.length === 0 ? (
        <div className="w-full bg-white border border-gray-100 rounded-4xl p-20 flex flex-col items-center justify-center shadow-sm">
          <div className="w-24 h-24 bg-[#E8F5EE] rounded-full flex items-center justify-center mb-6">
            <ClipboardList size={40} className="text-[#107C41]" />
          </div>
          <div className="text-center max-w-sm space-y-2">
            <h4 className="text-xl font-bold text-[#107C41]">Belum Ada Laporan</h4>
            <p className="text-sm text-gray-400 font-medium leading-relaxed">
              Kamu belum pernah membuat laporan. Tekan tombol "Buat Laporan" untuk membuat laporan baru.
            </p>
          </div>
        </div>
      ) : (
        <div className="animate-in zoom-in-95 duration-300">
          <ReportTable reports={reports} onViewDetail={onViewDetail} />
        </div>
      )}
    </div>
  );
}
