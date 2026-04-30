import React, { useState } from "react";
import { ArrowLeft, MapPin, Save} from "lucide-react";
import { StatusBadge } from "../StatusBadge";

export default function DetailLaporanOB({ report, onBack }) {
  const [newStatus, setNewStatus] = useState(report.status);

  return (
    <div className="animate-in slide-in-from-bottom-4 duration-500 space-y-6">
      {/* Tombol Kembali */}
      <button 
        onClick={onBack} 
        className="flex items-center gap-2 text-gray-500 font-bold text-sm hover:text-[#107C41] transition-colors"
      >
        <ArrowLeft size={18} /> Kembali
      </button>

      <h2 className="text-2xl font-black text-[#107C41]">Detail Laporan</h2>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* KOLOM KIRI: Informasi Laporan (Sesuai Gambar 1) */}
        <div className="lg:col-span-5 bg-white rounded-3xl shadow-sm border border-gray-100 p-8 space-y-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">ID Laporan</p>
              <h3 className="text-2xl font-black text-gray-800">SFK-2026-001</h3>
            </div>
            <StatusBadge status={report.status} />
          </div>

          <div className="grid grid-cols-2 gap-8 py-6 border-y border-gray-50">
            <div>
              <p className="font-bold text-gray-800 mb-1">Tanggal</p>
              <p className="text-sm text-gray-500">{report.tgl}</p>
            </div>
            <div>
              <p className="font-bold text-gray-800 mb-1">Jenis Masalah</p>
              <p className="text-sm text-gray-500">{report.masalah}</p>
            </div>
          </div>

          <div>
            <p className="font-bold text-gray-800 mb-3">Lokasi</p>
            <div className="flex gap-2 text-sm text-gray-500 items-start">
              <MapPin size={16} className="text-[#107C41] mt-0.5 shrink-0" />
              <span>{report.lokasi}, {report.ruang}</span>
            </div>
          </div>

          <div>
            <p className="font-bold text-gray-800 mb-2">Deskripsi</p>
            <div className="bg-gray-50 p-5 rounded-2xl text-xs text-gray-500 leading-relaxed border border-gray-100 italic">
              {report.deskripsi || "AC diruangan FIKLAB 201 Sering masih menyala ketika sore hari , dan tiap hari kamis"}
            </div>
          </div>

          <div>
            <p className="font-bold text-gray-800 mb-3">Foto Bukti</p>
            <div className="rounded-2xl overflow-hidden shadow-inner bg-gray-100 border border-gray-50">
              <img 
                src="https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?q=80&w=2070" 
                alt="Bukti" 
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>

        {/* KOLOM KANAN: Fitur Update Status (Sesuai Gambar 1) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
            <h3 className="text-xl font-black text-gray-800 mb-6 tracking-tight border-b border-gray-50 pb-4">
              Update Status
            </h3>

            <div className="space-y-6">
              {/* Pilih Status Baru */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-600">Pilih Status Baru</label>
                <select 
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value)}
                  className="w-full p-4 bg-white border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#107C41]/10 transition-all cursor-pointer"
                >
                  <option value="Reported">Reported</option>
                  <option value="Inprogress">In Progress</option>
                  <option value="Resolved">Resolved</option>
                </select>
              </div>

              {/* Catatan Opsional */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-600">Catatan (Opsional)</label>
                <textarea 
                  placeholder="Tambahkan catatan di sini..."
                  rows="6"
                  className="w-full p-4 bg-white border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#107C41]/10 transition-all resize-none"
                ></textarea>
              </div>

              {/* Tombol Simpan Status */}
              <button 
                type="button"
                className="w-full py-4 bg-[#166534] text-white rounded-xl font-bold hover:bg-[#114d28] shadow-lg shadow-green-900/10 transition-all flex items-center justify-center gap-3"
              >
                <Save size={20} />
                <span>Simpan Status</span>
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}