import React, { useState, useRef, useEffect } from "react";
import { X, Upload, Send, FileText } from "lucide-react";

import api from "@/lib/axios";
import { useAuth } from "@/context/AuthContext";

export default function CreateReportModal({ isOpen, onClose, onConfirmClick }) {
  const { user } = useAuth(); // Ambil data user login

  // --- STATE DATA MASTER DARI BE ---
  const [buildings, setBuildings] = useState<any[]>([]);
  const [allRooms, setAllRooms] = useState<any[]>([]);
  const [filteredRooms, setFilteredRooms] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);

  // --- STATE PILIHAN FORM USER ---
  const [selectedBuilding, setSelectedBuilding] = useState<string>("");
  const [selectedRoom, setSelectedRoom] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [deskripsi, setDeskripsi] = useState<string>("");

  const [selectedFile, setSelectedFile] = useState<any>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 2. INTEGRASI: Ambil data Gedung & Kategori 
  useEffect(() => {
    if (isOpen) {
      // Get All Buildings
      api.get("/api/buildings")
        .then(res => setBuildings(res.data.data || []))
        .catch(err => console.error("Gagal mengambil data gedung:", err));

      // Get All Rooms (Akan difilter di sisi client)
      api.get("/api/rooms")
        .then(res => setAllRooms(res.data.data || []))
        .catch(err => console.error("Gagal mengambil data ruangan:", err));

      // Get All Categories
      api.get("/api/categories")
        .then(res => setCategories(res.data.data || []))
        .catch(err => console.error("Gagal mengambil data kategori:", err));
    }
  }, [isOpen]);

  // 3. INTEGRASI: Filter Ruangan secara otomatis setiap user memilih 
  useEffect(() => {
    if (selectedBuilding) {
      const selectedBuildingStr = String(selectedBuilding);
      const filtered = allRooms.filter(room => {
        const bId1 = room.buildingId ? String(room.buildingId) : null;
        const bId2 = room.building_id ? String(room.building_id) : null;
        const bId3 = room.building?.id ? String(room.building?.id) : null;
        const bName = room.building?.name ? String(room.building?.name) : null;
        // In case selectedBuilding is actually the name, we also check bName
        return bId1 === selectedBuildingStr || bId2 === selectedBuildingStr || bId3 === selectedBuildingStr || bName === selectedBuildingStr;
      });
      setFilteredRooms(filtered);
    } else {
      setFilteredRooms([]);
    }
    setSelectedRoom(""); // Reset pilihan ruangan jika gedung diganti
  }, [selectedBuilding, allRooms]);

  // Cleanup memori preview foto
  useEffect(() => {
    return () => {
      if (selectedFile?.preview) {
        URL.revokeObjectURL(selectedFile.preview);
      }
    };
  }, [selectedFile]);

  if (!isOpen) return null;

  const handleFileChange = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert("File terlalu besar! Maksimal 5MB.");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        const fileData = {
          name: file.name,
          size: (file.size / (1024 * 1024)).toFixed(1) + " MB",
          preview: reader.result as string, // Base64 string
        };
        setSelectedFile(fileData);
      };
      reader.readAsDataURL(file);
    }
  };

  // INTEGRASI: Mengirim ID asli ke backend
  const handleKirimClick = () => {
    if (!selectedBuilding) {
      alert("Pilih gedung kampus terlebih dahulu.");
      return;
    }
    if (!selectedRoom) {
      alert("Pilih ruangan/lantai terlebih dahulu.");
      return;
    }
    if (!selectedCategory) {
      alert("Pilih jenis masalah terlebih dahulu.");
      return;
    }
    if (!deskripsi.trim()) {
      alert("Masukkan deskripsi masalah terlebih dahulu.");
      return;
    }

    const buildingName = buildings.find(b => b.id === selectedBuilding)?.name || "Gedung Unknown";
    const roomName = filteredRooms.find(r => r.id === selectedRoom)?.name || "Ruang Unknown";
    const categoryName = categories.find(c => c.id === selectedCategory)?.name || "Kategori Unknown";

    const originalLocationTag = `[Lokasi: ${buildingName} - ${roomName} | Masalah: ${categoryName}]`;

    const newReportData = {
      roomId: selectedRoom, // Mapped to UUID
      categoryId: selectedCategory, // Mapped to UUID
      description: `${deskripsi.trim()} ${originalLocationTag}`,
      title: categoryName, 
      priority: "medium",
      
      // Properti tambahan untuk manipulasi tampilan lokal UI tabel sebelum refresh
      lokasiName: buildingName,
      ruangName: roomName,
      foto: selectedFile ? selectedFile.preview : null
    };
    
    onConfirmClick(newReportData);
  };
 
  const handleRemoveFile = (e) => {
    e.stopPropagation();
    if (selectedFile?.preview) URL.revokeObjectURL(selectedFile.preview);
    setSelectedFile(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };
 
 
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
                <select 
                value={selectedBuilding} 
                onChange={(e) => setSelectedBuilding(e.target.value)}
                className="w-full border border-gray-200 rounded-xl p-3 focus:ring-2 focus:ring-[#107C41]/20 outline-none">
                  <option value="">Pilih Gedung Kampus</option>
                  {buildings.map((b) => (
                    <option key={b.id} value={b.id}>{b.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-gray-600 font-bold mb-2">Pilih Ruangan/Lantai</label>
                <select
                value={selectedRoom} 
                onChange={(e) => setSelectedRoom(e.target.value)}
                disabled={!selectedBuilding}
                className="w-full border border-gray-200 rounded-xl p-3 focus:ring-2 focus:ring-[#107C41]/20 outline-none disabled:bg-gray-100 disabled:text-gray-400">
                  <option value="">Pilih Ruangan/Lantai</option>
                  {filteredRooms.map((r) => (
                    <option key={r.id} value={r.id}>{r.name}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
 
          {/* Section 2: Detail Masalah */}
          <div className="space-y-4">
            <h4 className="font-bold text-[#107C41] border-l-4 border-[#107C41] pl-3 uppercase tracking-widest text-xs">Detail Masalah</h4>
            <div>
              <label className="block text-gray-600 font-bold mb-2">Jenis Masalah</label>
              <select
              value={selectedCategory} 
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full border border-gray-200 rounded-xl p-3 focus:ring-2 focus:ring-[#107C41]/20 outline-none">
                <option value="">Tentukan Jenis Masalah</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-gray-600 font-bold mb-2">Deskripsi Masalah</label>
              <textarea 
                rows={4}
                placeholder="Jelaskan Masalah yang ditemukan"
                value={deskripsi}
                onChange={(e) => setDeskripsi(e.target.value)}
                className="w-full border border-gray-200 rounded-xl p-4 focus:ring-2 focus:ring-[#107C41]/20 outline-none resize-none"
              ></textarea>
            </div>
          </div>

          {/* Section 3: Upload Foto */}
          <div className="space-y-4">
            <h4 className="font-bold text-[#107C41] border-l-4 border-[#107C41] pl-3 uppercase tracking-widest text-xs">Foto Bukti (Opsional)</h4>
            
            {/* Input File Tersembunyi */}
            <input 
              type="file" 
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*"
              className="hidden"
            />

            {!selectedFile ? (
              // Tampilan Awal: Kotak Dash (Click to Upload)
              <div 
                onClick={() => fileInputRef.current.click()}
                className="border-2 border-dashed border-gray-200 rounded-3xl p-10 flex flex-col items-center justify-center text-center hover:border-[#107C41]/40 hover:bg-green-50/30 transition-all cursor-pointer group"
              >
                <div className="w-12 h-12 bg-green-50 text-[#107C41] rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                  <Upload size={24} />
                </div>
                <p className="font-bold text-gray-700">Upload Foto Bukti</p>
                <p className="text-[10px] text-gray-400 mt-1">Klik untuk memilih file gambar (Max 5MB)</p>
              </div>
            ) : (
              // Tampilan SETELAH UPLOAD
              <div className="bg-[#E8F5EE] border border-green-100 rounded-2xl p-4 flex items-center gap-4 animate-in slide-in-from-top-2 duration-300 relative group">
                <div className="w-16 h-16 rounded-xl overflow-hidden shadow-sm border border-white shrink-0">
                  <img src={selectedFile.preview} alt="Preview" className="w-full h-full object-cover" />
                </div>
                
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-gray-800 text-sm truncate">{selectedFile.name}</p>
                  <p className="text-xs text-gray-500 font-medium">{selectedFile.size}</p>
                </div>

                <button 
                  onClick={handleRemoveFile}
                  className="p-2 hover:bg-white/50 rounded-full text-gray-400 hover:text-red-500 transition-all"
                >
                  <X size={20} />
                </button>
              </div>
            )}
          </div>

          <button onClick={handleKirimClick} className="w-full bg-[#107C41] text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-[#0d6334] transition-all shadow-lg active:scale-[0.98]">
            <Send size={18} /> Kirim Laporan
          </button>
          <p className="text-center text-[10px] text-gray-400 italic">Laporan akan diverifikasi oleh admin fasilitas dalam waktu 1x24 jam.</p>
        </div>
      </div>
    </div>
  );
}