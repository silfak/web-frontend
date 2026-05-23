import React, { useState, useMemo } from "react";
import { ClipboardList, ChevronLeft, ChevronRight, SearchX } from "lucide-react";
import { StatusBadge } from "@/components/DashboardOBPage/StatusBadge";
import type { Report } from "@/types";

interface ReportTableProps {
  reports: Report[];
  onViewDetail: (report: Report) => void;
}

export default function ReportTable({ reports, onViewDetail }: ReportTableProps) {
  const [filterGedung, setFilterGedung] = useState("Semua");
  const [filterStatus, setFilterStatus] = useState("Semua");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;

  const uniqueBuildings = useMemo(() => {
    const b = new Set(reports.map(r => r.lokasi).filter(Boolean));
    return Array.from(b);
  }, [reports]);

  const filteredReports = useMemo(() => {
    return reports.filter((r) => {
      const matchGedung = filterGedung === "Semua" || r.lokasi === filterGedung;
      const matchStatus = filterStatus === "Semua" || r.status === filterStatus;
      return matchGedung && matchStatus;
    });
  }, [reports, filterGedung, filterStatus]);

  const totalPages = Math.ceil(filteredReports.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentReports = filteredReports.slice(indexOfFirstItem, indexOfLastItem);

  const handleFilterChange = (type: "gedung" | "status", value: string) => {
    if (type === "gedung") setFilterGedung(value);
    if (type === "status") setFilterStatus(value);
    setCurrentPage(1);
  };

  return (
    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden animate-in fade-in duration-500">
      <div className="p-6 border-b border-gray-50 flex items-center gap-3 font-bold text-[#107C41] text-lg">
        <ClipboardList size={24} /> Riwayat Laporan
      </div>
      <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6 bg-gray-50/50">
        <div className="space-y-2">
          <label className="text-xs font-bold text-gray-600">Pilih Gedung</label>
          <select value={filterGedung} onChange={(e) => handleFilterChange("gedung", e.target.value)} className="w-full p-3 bg-white border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#107C41]/10 cursor-pointer">
            <option value="Semua">Semua Gedung</option>
            {uniqueBuildings.map(b => (
              <option key={b} value={b}>{b}</option>
            ))}
          </select>
        </div>
        <div className="space-y-2">
          <label className="text-xs font-bold text-gray-600">Pilih Status</label>
          <select value={filterStatus} onChange={(e) => handleFilterChange("status", e.target.value)} className="w-full p-3 bg-white border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#107C41]/10 cursor-pointer">
            <option value="Semua">Semua Status</option>
            <option value="Reported">Reported</option>
            <option value="Inprogress">In Progress</option>
            <option value="Resolved">Resolved</option>
          </select>
        </div>
      </div>
      {filteredReports.length === 0 ? (
        <div className="p-20 flex flex-col items-center justify-center text-center space-y-4">
          <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center text-gray-300">
            <SearchX size={48} />
          </div>
          <div className="space-y-1">
            <h4 className="text-lg font-bold text-gray-700">Laporan Tidak Ditemukan</h4>
            <p className="text-sm text-gray-400 max-w-xs leading-relaxed">
              Tidak ditemukan laporan di <span className="font-bold text-[#107C41]">{filterGedung}</span> dengan status <span className="font-bold text-[#107C41]">{filterStatus === "Inprogress" ? "In Progress" : filterStatus}</span>.
            </p>
          </div>
          <button onClick={() => { setFilterGedung("Semua"); setFilterStatus("Semua"); }} className="text-sm font-bold text-[#107C41] hover:underline transition-all">
            Reset Semua Filter
          </button>
        </div>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-[#107C41] text-white text-[10px] uppercase tracking-widest">
                <tr>
                  <th className="p-5">Tanggal</th>
                  <th className="p-5">Lokasi Singkat</th>
                  <th className="p-5">Jenis Masalah</th>
                  <th className="p-5">Status</th>
                  <th className="p-5"></th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {currentReports.map((r, index) => (
                  <tr key={index} className="border-b border-gray-50 hover:bg-gray-50 transition-colors animate-in fade-in duration-300">
                    <td className="p-5 text-gray-500">{r.tgl}</td>
                    <td className="p-5">
                      <p className="font-bold text-[#107C41]">{r.lokasi}</p>
                      <p className="text-[10px] text-gray-400">{r.ruang}</p>
                    </td>
                    <td className="p-5 font-medium text-gray-700">{r.masalah}</td>
                    <td className="p-5"><StatusBadge status={r.status} /></td>
                    <td className="p-5 text-right">
                      <button onClick={() => onViewDetail(r)} className="text-[#107C41] font-bold hover:underline">Lihat Detail</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="p-6 border-t border-gray-50 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-medium">
            <p className="text-gray-500">
              Menampilkan <span className="text-[#107C41] font-bold">{indexOfFirstItem + 1} - {Math.min(indexOfLastItem, filteredReports.length)}</span> dari <span className="text-[#107C41] font-bold">{filteredReports.length}</span> Laporan
            </p>
            <div className="flex items-center gap-2">
              <button onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} disabled={currentPage === 1} className="p-2 border rounded-lg hover:bg-gray-50 disabled:opacity-30 transition-all shadow-sm">
                <ChevronLeft size={16}/>
              </button>
              <div className="flex gap-1.5">
                {[...Array(totalPages)].map((_, i) => (
                  <button key={i + 1} onClick={() => setCurrentPage(i + 1)} className={`w-8 h-8 rounded-lg font-bold transition-all shadow-sm ${currentPage === i + 1 ? "bg-[#107C41] text-white" : "border text-gray-600 hover:bg-gray-50"}`}>
                    {i + 1}
                  </button>
                ))}
              </div>
              <button onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages || totalPages === 0} className="p-2 border rounded-lg hover:bg-gray-50 disabled:opacity-30 transition-all shadow-sm">
                <ChevronRight size={16}/>
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
