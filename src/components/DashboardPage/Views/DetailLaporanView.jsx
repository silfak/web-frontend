import React from "react";
import { ArrowLeft, MessageSquare } from "lucide-react";
import { StatusBadge } from "../StatusBadge";
import { MapPin } from "lucide-react";

export default function DetailLaporanView({ onBack }) {
  return (
    <div className="animate-in slide-in-from-right-4 duration-500 space-y-6">
      {/* Tombol Kembali */}
      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-gray-500 font-bold text-sm hover:text-[#107C41] transition-all"
      >
        <ArrowLeft size={18} /> Kembali
      </button>

      <h3 className="text-xl font-bold text-gray-800">Detail Laporan</h3>

      <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 p-10">
        {/* Baris ID Laporan & Status */}
        <div className="flex justify-between items-center mb-8 pb-6 border-b border-gray-50">
          <div>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">ID Laporan</p>
            <h4 className="text-2xl font-black text-gray-800">SFK-2026-001</h4>
          </div>
          <StatusBadge status="Inprogress" />
        </div>

        {/* Konten Detail: Grid 2 Kolom */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Sisi Kiri: Informasi Teks */}
          <div className="space-y-6 text-sm">
            <div>
              <label className="font-bold text-gray-800 block mb-1">Tanggal</label>
              <p className="text-black">12 Oktober 2026</p>
            </div>
            <div>
              <label className="font-bold text-gray-800 block mb-1">Jenis Masalah</label>
              <p className="text-black">Toilet Rusak</p>
            </div>
            <div>
              <label className="font-bold text-gray-800 block mb-1">Lokasi</label>
              <div className="flex gap-2 text-black">
                <MapPin color="gray" size={18} className=" " />
                Gedung Ki Hajar Dewantara, Toilet Lantai 3
              </div>
            </div>
            <div>
              <label className="font-bold text-gray-800 block mb-1">Deskripsi</label>
              <div className="bg-gray-200 p-4 rounded-xl text-black leading-relaxed">
                Pemborosan AC terjadi setiap hari kamis di jam akhir sore
              </div>
            </div>
          </div>

          {/* Sisi Kanan: Foto Bukti */}
          <div>
            <label className="font-bold text-gray-800 block mb-3 text-sm">Foto Bukti</label>
            <div className="rounded-3xl overflow-hidden border border-gray-100 shadow-sm">
              <img 
                src="https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=800" 
                alt="Bukti Kerusakan" 
                className="w-full h-64 object-cover"
              />
            </div>
          </div>
        </div>

        {/* Kotak Catatan OB (Warna Kuning) */}
        <div className="mt-10 bg-orange-50 border border-orange-100 rounded-2xl p-6 flex gap-4">
          <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center text-orange-600 shrink-0">
            <MessageSquare size={20} />
          </div>
          <div>
            <h5 className="font-bold text-orange-800 text-sm">Catatan OB</h5>
            <p className="text-orange-700/70 text-xs mt-1">Perbaikan mungkin menunggu 1 sampai 2 hari</p>
          </div>
        </div>
      </div>
    </div>
  );
}