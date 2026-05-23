import React from "react";
import { ArrowLeft, MapPin } from "lucide-react";
import { StatusBadge } from "../StatusBadge";

export default function DetailLaporanView({ report, onBack }: { report: any; onBack: () => void }) {
  return (
    <div className="animate-in slide-in-from-bottom-4 duration-500 space-y-6">
      <button onClick={onBack} className="flex items-center gap-2 text-gray-500 font-bold text-sm hover:text-[#107C41]">
        <ArrowLeft size={18} /> Kembali
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Kolom Kiri: Detail Teks */}
        <div className="lg:col-span-8 bg-white rounded-3xl shadow-sm border border-gray-100 p-6 md:p-8">
          <div className="flex justify-between items-start mb-6">
            <div>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">ID Laporan</p>
              <h3 className="text-2xl font-black text-gray-800">{report.friendlyId || report.id}</h3>
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
              {report.deskripsi || "Tidak ada deskripsi"}
            </div>
          </div>

          {/* TAMPILAN CATATAN OB */}
          {report.catatan && (
            <div className="bg-amber-50 border-l-4 border-amber-500 p-5 rounded-2xl flex gap-4 animate-in fade-in zoom-in duration-300">
              <div className="text-amber-600 shrink-0 mt-1">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/></svg>
              </div>
              <div className="space-y-1">
                <p className="text-xs font-black text-amber-700 uppercase tracking-wider">Catatan OB</p>
                <p className="text-xs text-amber-800 font-medium leading-relaxed">
                  {report.catatan}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Kolom Kanan: Foto Bukti */}
        <div className="lg:col-span-4 bg-white rounded-3xl shadow-sm border border-gray-100 p-6">
          <h4 className="font-bold text-gray-800 mb-4">Foto Bukti</h4>
          <div className="rounded-2xl overflow-hidden shadow-inner bg-gray-100">
            <img 
              src={report.foto || "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?q=80&w=2070&auto=format&fit=crop"} 
              alt="Bukti" 
              className="w-full h-auto object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
}