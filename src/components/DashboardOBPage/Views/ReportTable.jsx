import React, { useState } from "react";
import { ClipboardList, ChevronLeft, ChevronRight } from "lucide-react";
import { StatusBadge } from "@/components/DashboardPage/StatusBadge";


export default function ReportTable({ reports, onViewDetail }) {
 

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  
  const currentReports = reports ? reports.slice(indexOfFirstItem, indexOfLastItem) : [];
  const totalPages = reports ? Math.ceil(reports.length / itemsPerPage) : 0;
  
    return (
    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-50 flex items-center gap-3 font-bold text-[#107C41] text-lg">
            <ClipboardList size={24} /> Riwayat Laporan
        </div>

      {/* Fitur Filter */}
      <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6 bg-gray-50/50">
        <div className="space-y-2">
          <label className="text-xs font-bold text-gray-600">Pilih Gedung</label>
          <select className="w-full p-3 bg-white border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#107C41]/10">
            <option>Semua</option>
            <option>Gedung Dewi Sartika</option>
            <option>Gedung Ki Hajar Dewantara</option>
          </select>
        </div>
        <div className="space-y-2">
          <label className="text-xs font-bold text-gray-600">Pilih Status</label>
          <select className="w-full p-3 bg-white border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#107C41]/10">
            <option>Semua</option>
            <option>Reported</option>
            <option>Inprogress</option>
            <option>Resolved</option>
          </select>
        </div>
      </div>

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
              <tr key={index} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                <td className="p-5 text-gray-500">{r.tgl}</td>
                <td className="p-5">
                  <p className="font-bold text-[#107C41]">{r.lokasi}</p>
                  <p className="text-[10px] text-gray-400">{r.ruang}</p>
                </td>
                <td className="p-5 font-medium text-gray-700">{r.masalah}</td>
                <td className="p-5"><StatusBadge status={r.status} /></td>
                <td className="p-5 text-right">
                  <button 
                    onClick={() => onViewDetail(r)}
                    className="text-[#107C41] font-bold hover:underline"
                  >
                    Lihat Detail
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

        {/* Footer Tabel: Pagination */}
        <div className="p-6 border-t border-gray-50 flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
            <p className="text-gray-500 font-medium">
            Menampilkan <span className="text-[#107C41] font-bold">
            {indexOfFirstItem + 1} - {Math.min(indexOfLastItem, reports?.length || 0)}
                </span> dari <span className="text-[#107C41] font-bold">
            {reports?.length || 0}
                </span> Laporan
            </p>

        <div className="flex items-center gap-2">
            {/* Tombol Previous */}
            <button 
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="p-2 border rounded-lg hover:bg-gray-50 disabled:opacity-30 transition-all"
            >
            <ChevronLeft size={16}/>
            </button>

                {/* Render Nomor Halaman Secara Dinamis */}
                {[...Array(totalPages)].map((_, i) => {
                const pageNumber = i + 1;
                return (
                    <button
                    key={pageNumber}
                    onClick={() => setCurrentPage(pageNumber)}
                    className={`w-8 h-8 rounded-lg font-bold transition-all ${
                        currentPage === pageNumber 
                        ? "bg-[#107C41] text-white shadow-md" // Gaya saat aktif
                        : "border text-gray-600 hover:bg-gray-50" // Gaya saat tidak aktif
                    }`}
                    >
                    {pageNumber}
                    </button>
                );
                })}

                {/* Tombol Next */}
                <button 
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages || totalPages === 0}
                className="p-2 border rounded-lg hover:bg-gray-50 disabled:opacity-30 transition-all"
                >
                    <ChevronRight size={16}/>
                </button>
            </div>
        </div>
    </div>
  );
}