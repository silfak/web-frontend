import React, { useState } from "react";
import { ArrowLeft, MapPin, Save, RefreshCw, MessageSquare } from "lucide-react";
import { StatusBadge } from "@/components/DashboardOBPage/StatusBadge";
import ConfirmationModal from "@/components/ConfirmationModal";
import type { Report, ReportStatus } from "@/types";

interface DetailLaporanOBProps {
  report: Report;
  onBack: () => void;
  onUpdateStatus: (statusBaru: ReportStatus, catatanBaru: string, fotoBase64?: string | null) => void;
}

export default function DetailLaporanOB({ report, onBack, onUpdateStatus }: DetailLaporanOBProps) {
  const [newStatus, setNewStatus] = useState<ReportStatus>(report.status);
  const [noteText, setNoteText] = useState(report.catatan || "");
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [fotoBase64, setFotoBase64] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert("File terlalu besar! Maksimal 5MB.");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setFotoBase64(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // warna Select
  const getStatusStyles = (status: ReportStatus): string => {
    switch (status) {
      case "Reported": return "bg-blue-50 text-blue-600 border-blue-200";
      case "Inprogress": return "bg-orange-50 text-orange-600 border-orange-200";
      case "Resolved": return "bg-green-50 text-green-600 border-green-200";
      default: return "bg-white text-gray-600 border-gray-200";
    }
  };

  //  warna teks status di dalam Modal
  const getStatusTextColor = (status: ReportStatus): string => {
    switch (status) {
      case "Reported": return "text-blue-600";
      case "Inprogress": return "text-orange-600";
      case "Resolved": return "text-green-600";
      default: return "text-gray-800";
    }
  };

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
                src={fotoBase64 || report.foto || "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?q=80&w=2070"}
                alt="Bukti"
                className="w-full h-auto object-cover"
              />
            </div>
          </div>

          {/* --- KOMPONEN BARU: TAMPILAN CATATAN OB --- */}
          {report.catatan && (
            <div className="bg-amber-50 border-l-4 border-amber-500 p-5 rounded-2xl flex gap-4 animate-in fade-in zoom-in duration-300">
              <div className="text-amber-600 shrink-0 mt-1">
                <MessageSquare size={20} />
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

        {/* KOLOM KANAN: Update Status */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
            <h3 className="text-xl font-black text-gray-800 mb-6 border-b border-gray-50 pb-4 tracking-tight">Update Status</h3>
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-600 uppercase tracking-widest">Pilih Status Baru</label>
                <select
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value as ReportStatus)}
                  className={`w-full p-4 border rounded-xl text-sm font-bold outline-none focus:ring-4 focus:ring-[#107C41]/5 transition-all cursor-pointer ${getStatusStyles(newStatus)}`}
                >
                  <option value="Reported">Reported</option>
                  <option value="Inprogress">In Progress</option>
                  <option value="Resolved">Resolved</option>
                </select>
              </div>
              {/* PERBAIKAN 1: Hubungkan textarea ke state noteText */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-600 uppercase tracking-widest">Catatan (Opsional)</label>
                <textarea
                  value={noteText} // Tambahkan ini
                  onChange={(e) => setNoteText(e.target.value)} // Tambahkan ini
                  placeholder="Tambahkan catatan progres..."
                  rows={6}
                  className="w-full p-4 bg-gray-50/50 border border-gray-100 rounded-xl text-sm outline-none focus:bg-white focus:ring-2 focus:ring-[#107C41]/10 transition-all resize-none"
                ></textarea>
              </div>

              {/* TAMPILAN UPLOAD FOTO BUKTI OB */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-600 uppercase tracking-widest">Foto Bukti (Opsional)</label>
                <input type="file" accept="image/*" onChange={handleFileChange} className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-bold file:bg-green-50 file:text-green-700 hover:file:bg-green-100 cursor-pointer" />
                {fotoBase64 && (
                  <div className="mt-2 w-20 h-20 rounded-lg overflow-hidden border border-gray-200">
                    <img src={fotoBase64} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                )}
              </div>
              <button
                onClick={() => setIsConfirmOpen(true)}
                className="w-full py-4 bg-[#107C41] text-white rounded-xl font-bold hover:bg-[#0d6334] shadow-lg shadow-green-900/10 transition-all flex items-center justify-center gap-3 active:scale-[0.98]"
              >
                <Save size={20} /> Simpan Status
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* MODAL KONFIRMASI UPDATE STATUS */}
      <ConfirmationModal
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={() => {
          onUpdateStatus(newStatus, noteText, fotoBase64); // Kirim status baru ke Dashboard
          setIsConfirmOpen(false);
        }}
        title="Ubah Status Laporan?"
        description={
          <span>
            Status laporan akan diubah menjadi{" "}
            <span className={`font-bold ${getStatusTextColor(newStatus)}`}>
              {newStatus === "Inprogress" ? "In Progress" : newStatus}
            </span>.
          </span>
        }
        confirmText="Ya, Ubah Status"
        cancelText="Batal"
        icon={RefreshCw}
        variant="green"
        warningText="Perubahan status tidak dapat dikembalikan"
      />
    </div>
  );
}
