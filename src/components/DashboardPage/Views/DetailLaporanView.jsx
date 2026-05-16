import React from "react";
import { ArrowLeft, MapPin } from "lucide-react";
import { StatusBadge } from "../StatusBadge";

export default function DetailLaporanView({ report, onBack }) {
  return (
    <div className="animate-in slide-in-from-bottom-4 duration-500 space-y-6">
      <button onClick={onBack} className="flex items-center gap-2 text-gray-500 font-bold text-sm hover:text-[#107C41]">
        <ArrowLeft size={18} /> Kembali
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Kolom Kiri: Detail Teks */}
        <div className="lg:col-span-8 bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
          <div className="flex justify-between items-start mb-6">
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

          <div className="py-6">
            <p className="font-bold text-gray-800 mb-3">Lokasi</p>
            <div className="flex gap-2 text-sm text-gray-500 items-start">
              <MapPin size={16} className="text-[#107C41] mt-0.5 shrink-0" />
              <span>{report.lokasi}, {report.ruang}</span>
            </div>
          </div>

          <div className="py-6">
            <p className="font-bold text-gray-800 mb-2">Deskripsi</p>
            <div className="bg-gray-50 p-5 rounded-2xl text-xs text-gray-500 leading-relaxed italic border border-gray-100">
              AC diruangan FIKLAB 201 Sering masih menyala ketika sore hari , dan tiap hari kamis
            </div>
          </div>
        </div>

        {/* Kolom Kanan: Foto Bukti */}
        <div className="lg:col-span-4 bg-white rounded-3xl shadow-sm border border-gray-100 p-6">
          <h4 className="font-bold text-gray-800 mb-4">Foto Bukti</h4>
          <div className="rounded-2xl overflow-hidden shadow-inner bg-gray-100">
            <img 
              src="https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?q=80&w=2070&auto=format&fit=crop" 
              alt="Bukti" 
              className="w-full h-auto object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
}