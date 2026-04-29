import { FilePlus, ClipboardList } from "lucide-react";
import { StatusBadge } from "../StatusBadge";

export default function BerandaView({ onViewDetail, onOpenModal }) {
  const reports = [
    { id: "SFK-2026-001", tgl: "17 April 2026", lokasi: "Gedung Dewi Sartika", ruang: "Lantai 3, Ruang FIK-301", masalah: "Pemborosan AC", status: "Reported" },
    { id: "SFK-2026-002", tgl: "12 April 2026", lokasi: "Gedung Ki Hajar Dewantara", ruang: "Lantai 3, Toilet", masalah: "Toilet Rusak", status: "Inprogress" },
    { id: "SFK-2026-003", tgl: "15 Maret 2026", lokasi: "Gedung Dewi Sartika", ruang: "Lantai 2, Ruang FIK-202", masalah: "Pemborosan AC", status: "Resolved" },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <button onClick={onOpenModal} className="flex items-center gap-2 bg-[#107C41] text-white px-8 py-3.5 rounded-xl font-bold shadow-lg hover:bg-[#0d6334] transition-all">
        <FilePlus size={20} /> Buat Laporan Baru
      </button>

      <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-8 border-b border-gray-50 flex items-center gap-3 font-bold text-[#107C41] text-lg">
          <ClipboardList size={24} /> Riwayat Laporan
        </div>
        <table className="w-full text-left">
          <thead className="bg-[#107C41] text-white text-[10px] uppercase tracking-[0.2em]">
            <tr>
              <th className="p-6">Tanggal</th>
              <th className="p-6">Lokasi Singkat</th>
              <th className="p-6">Jenis Masalah</th>
              <th className="p-6 text-center">Status</th>
              <th className="p-6 text-center">Detail</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {reports.map((r) => (
              <tr key={r.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                <td className="p-6 text-gray-500">{r.tgl}</td>
                <td className="p-6">
                  <p className="font-bold text-[#107C41] leading-tight">{r.lokasi}</p>
                  <p className="text-[10px] text-gray-400 mt-1">{r.ruang}</p>
                </td>
                <td className="p-6 font-semibold text-gray-700">{r.masalah}</td>
                <td className="p-6 text-center"><StatusBadge status={r.status} /></td>
                <td className="p-6 text-center">
                  <button onClick={onViewDetail} className="text-[#107C41] font-extrabold hover:underline text-xs">Lihat Detail</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}