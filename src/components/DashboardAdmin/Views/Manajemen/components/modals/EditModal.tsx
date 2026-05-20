import { X, Eye, EyeOff, User, Mail, Lock } from "lucide-react";
import { useState } from "react";
import type { GedungItem } from "@/types";

interface EditModalProps {
  show: boolean;
  editItem: any;
  editType: string;
  onClose: () => void;
  onChange: (field: string, value: any) => void;
  onConfirm: () => void;
  gedungList?: GedungItem[];
}

export default function EditModal({ show, editItem, editType, onClose, onChange, onConfirm, gedungList = [] }: EditModalProps) {
  if (!show) return null;

  const [showPassword, setShowPassword] = useState(false);

  const getTitle = (): string => {
    if (editType === "gedung") return "Edit Gedung";
    if (editType === "ruangan") return "Edit Ruangan";
    if (editType === "jenis") return "Edit Jenis Masalah";
    if (editType === "user") return "Edit Akun OB";
    if (editType === "admin") return "Edit Akun Admin";
    return "Edit Data";
  };

  const handleClose = () => {
    setShowPassword(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 w-[400px] shadow-xl">
        <div className="flex justify-between items-center mb-5">
          <h3 className="font-semibold text-base">{getTitle()}</h3>
          <button onClick={handleClose}><X size={18} className="text-gray-500 hover:text-gray-700" /></button>
        </div>

        <div className="space-y-4 text-sm">
          {editType === "gedung" && (
            <div>
              <label className="block text-gray-600 mb-1 font-medium">Nama Gedung</label>
              <input value={editItem?.nama || ""} onChange={(e) => onChange("nama", e.target.value)} className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" placeholder="Nama Gedung" />
            </div>
          )}

          {editType === "ruangan" && (
            <>
              <div>
                <label className="block text-gray-600 mb-1 font-medium">Pilih Gedung</label>
                <select value={editItem?.gedung || ""} onChange={(e) => onChange("gedung", e.target.value)} className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-700">
                  <option value="">Pilih Gedung</option>
                  {gedungList.map((g, i) => <option key={i} value={g.nama}>{g.nama}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-gray-600 mb-1 font-medium">Nama Ruangan</label>
                <input value={editItem?.nama || ""} onChange={(e) => onChange("nama", e.target.value)} className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" placeholder="Masukkan nama ruangan" />
              </div>
            </>
          )}

          {editType === "jenis" && (
            <div>
              <label className="block text-gray-600 mb-1 font-medium">Nama Masalah</label>
              <input value={editItem?.nama || ""} onChange={(e) => onChange("nama", e.target.value)} className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" placeholder="Nama Masalah" />
            </div>
          )}

          {(editType === "user" || editType === "admin") && (
            <>
              <div>
                <label className="block text-gray-600 mb-1 font-medium">Nama</label>
                <div className="relative">
                  <User size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input value={editItem?.nama || ""} onChange={(e) => onChange("nama", e.target.value)} className="w-full border border-gray-300 pl-9 pr-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" placeholder="Nama lengkap" />
                </div>
              </div>
              <div>
                <label className="block text-gray-600 mb-1 font-medium">Email</label>
                <div className="relative">
                  <Mail size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input type="email" value={editItem?.email || ""} onChange={(e) => onChange("email", e.target.value)} className="w-full border border-gray-300 pl-9 pr-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" placeholder="Email" />
                </div>
              </div>
              <div>
                <label className="block text-gray-600 mb-1 font-medium">Ganti Password</label>
                <div className="relative">
                  <Lock size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input type={showPassword ? "text" : "password"} value={editItem?.password || ""} onChange={(e) => onChange("password", e.target.value)} className="w-full border border-gray-300 pl-9 pr-10 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" placeholder="Masukkan password baru" />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                    {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>
                <p className="text-xs text-gray-400 mt-1 flex items-center gap-1">Isi field ini jika hanya ingin mengubah password {editType === "user" ? "OB" : "Admin"}</p>
              </div>
              <div>
                <label className="block text-gray-600 mb-2 font-medium">Status Akun</label>
                <div className="flex items-center gap-3">
                  <button type="button" onClick={() => onChange("status", !editItem?.status)} className={`w-10 h-5 flex items-center rounded-full p-1 transition-colors ${editItem?.status ? "bg-green-600" : "bg-gray-300"}`}>
                    <div className={`w-4 h-4 bg-white rounded-full transition-transform ${editItem?.status ? "translate-x-5" : ""}`} />
                  </button>
                  <span className={`text-xs font-medium px-2 py-1 rounded-full ${editItem?.status ? "bg-green-100 text-green-700" : "bg-red-100 text-red-600"}`}>
                    {editItem?.status ? "Aktif" : "Nonaktif"}
                  </span>
                </div>
              </div>
            </>
          )}
        </div>

        <div className="flex gap-3 mt-6">
          <button onClick={handleClose} className="flex-1 border border-gray-300 text-gray-600 py-2 rounded-lg hover:bg-gray-50 transition-all">Batal</button>
          <button onClick={onConfirm} className="flex-1 bg-green-700 text-white py-2 rounded-lg hover:bg-green-800 transition-all">Simpan Perubahan</button>
        </div>
      </div>
    </div>
  );
}
