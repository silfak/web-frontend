import React from "react";
import { X, Upload, Send } from "lucide-react";

export default function CreateReportModal({ isOpen, onClose }) {
  if (!isOpen) return null; // Modal tidak akan muncul jika isOpen false

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-white w-full max-w-2xl rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
        
        {/* Header Modal */}
        <div className="bg-[#107C41] p-6 flex justify-between items-center text-white">
          <h3 className="text-xl font-bold">Buat Laporan Baru</h3>
          <button onClick={onClose} className="hover:rotate-90 transition-all">
            <X size={24} />
          </button>
        </div>

        {/* Form Content */}
        <div className="p-8 space-y-8 max-h-[80vh] overflow-y-auto text-sm">
          
          {/* Section 1: Lokasi */}
          <div className="space-y-4">
            <h4 className="font-bold text-[#107C41] border-l-4 border-[#107C41] pl-3 uppercase tracking-widest text-xs">Lokasi</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-600 font-bold mb-2">Pilih Gedung</label>
                <select className="w-full border border-gray-200 rounded-xl p-3 focus:ring-2 focus:ring-[#107C41]/20 outline-none appearance-none bg-no-repeat bg-position-[right_1rem_center]">
                  <option>Pilih Gedung</option>
                  <option>Gedung Dewi Sartika</option>
                  <option>Gedung Ki Hajar Dewantara</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-600 font-bold mb-2">Pilih Ruangan/Lantai</label>
                <select className="w-full border border-gray-200 rounded-xl p-3 focus:ring-2 focus:ring-[#107C41]/20 outline-none">
                  <option>Pilih Ruangan/Lantai</option>
                  <option>Lantai 1</option>
                  <option>Lantai 2</option>
                  <option>Lantai 3</option>
                </select>
              </div>
            </div>
          </div>

          {/* Section 2: Detail Masalah */}
          <div className="space-y-4">
            <h4 className="font-bold text-[#107C41] border-l-4 border-[#107C41] pl-3 uppercase tracking-widest text-xs">Detail Masalah</h4>
            <div>
              <label className="block text-gray-600 font-bold mb-2">Jenis Masalah</label>
              <select className="w-full border border-gray-200 rounded-xl p-3 focus:ring-2 focus:ring-[#107C41]/20 outline-none">
                <option>Tentukan Jenis Masalah</option>
                <option>Pemborosan AC</option>
                <option>Toilet Rusak</option>
                <option>Lampu Padam</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-600 font-bold mb-2">Deskripsi Masalah</label>
              <textarea 
                rows="4" 
                placeholder="Jelaskan Masalah yang ditemukan"
                className="w-full border border-gray-200 rounded-xl p-4 focus:ring-2 focus:ring-[#107C41]/20 outline-none resize-none"
              ></textarea>
            </div>
          </div>

          {/* Section 3: Upload Foto */}
          <div className="space-y-4">
            <h4 className="font-bold text-[#107C41] border-l-4 border-[#107C41] pl-3 uppercase tracking-widest text-xs">Foto Bukti (Opsional)</h4>
            <div className="border-2 border-dashed border-gray-200 rounded-3xl p-10 flex flex-col items-center justify-center text-center hover:border-[#107C41]/40 transition-colors cursor-pointer">
              <div className="w-12 h-12 bg-green-50 text-[#107C41] rounded-full flex items-center justify-center mb-3">
                <Upload size={24} />
              </div>
              <p className="font-bold text-gray-700">Upload Foto Bukti</p>
              <p className="text-[10px] text-gray-400 mt-1">Klik atau tarik file gambar ke sini (Max 5MB)</p>
            </div>
          </div>

          {/* Action Button */}
          <button className="w-full bg-[#107C41] text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-[#0d6334] transition-all shadow-lg shadow-green-900/10">
            <Send size={18} /> Kirim Laporan
          </button>
          <p className="text-center text-[10px] text-gray-400">Laporan akan diverifikasi oleh admin fasilitas dalam waktu 1x24 jam.</p>
        </div>
      </div>
    </div>
  );
}