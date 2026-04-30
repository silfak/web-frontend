import React from "react";
import ReportTable from "@/components/DashboardOBPage/Views/ReportTable";
import { FilePlus } from "lucide-react";

export default function BerandaOB({ onOpenModal, onViewDetail }) {
  // Data simulasi (Semua laporan yang masuk ke sistem)
  const allReports = [
    { tgl: "17 April 2026", lokasi: "Gedung Dewi Sartika", ruang: "Lantai 3, Ruang FIK-301", masalah: "Pemborosan AC", status: "Reported" },
    { tgl: "12 April 2026", lokasi: "Gedung Ki Hajar Dewantara", ruang: "Lantai 3, Toilet", masalah: "Toilet Rusak", status: "Reported" },
    { tgl: "15 Maret 2026", lokasi: "Gedung Dewi Sartika", ruang: "Lantai 2, Ruang FIK-202", masalah: "Pemborosan AC", status: "Reported" },
    { tgl: "02 November 2025", lokasi: "Gedung Ki Hajar Dewantara", ruang: "Lantai 2, Ruang FIKLAB-303", masalah: "Pemborosan AC", status: "Resolved" },
    { tgl: "17 April 2026", lokasi: "Gedung Dewi Sartika", ruang: "Lantai 3, Ruang FIK-301", masalah: "Pemborosan AC", status: "Reported" },
    { tgl: "12 April 2026", lokasi: "Gedung Ki Hajar Dewantara", ruang: "Lantai 3, Toilet", masalah: "Toilet Rusak", status: "Inprogress" },
    { tgl: "15 Maret 2026", lokasi: "Gedung Dewi Sartika", ruang: "Lantai 2, Ruang FIK-202", masalah: "Pemborosan AC", status: "Resolved" },
    { tgl: "02 November 2025", lokasi: "Gedung Ki Hajar Dewantara", ruang: "Lantai 2, Ruang FIKLAB-303", masalah: "Pemborosan AC", status: "Resolved" },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <button 
        onClick={onOpenModal}
        className="flex items-center gap-2 bg-[#107C41] text-white px-8 py-3.5 rounded-xl font-bold shadow-lg hover:bg-[#0d6334] transition-all"
      >
        <FilePlus size={20} /> Buat Laporan Baru
      </button>

      <ReportTable reports={allReports} onViewDetail={onViewDetail} />
    </div>
  );
}