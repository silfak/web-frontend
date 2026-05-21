import { X, User, Mail, Lock, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import type { GedungItem } from "@/types";

interface TambahFormData {
  nama: string;
  email: string;
  password: string;
  gedung: string;
  floor?: string;
}

interface TambahModalProps {
  show: boolean;
  type: string;
  onClose: () => void;
  onConfirm: (data: TambahFormData) => void;
  gedungList?: GedungItem[];
}

export default function TambahModal({ show, type, onClose, onConfirm, gedungList = [] }: TambahModalProps) {
  if (!show) return null;

  const [nama, setNama] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [konfirmasi, setKonfirmasi] = useState("");
  const [selectedGedung, setSelectedGedung] = useState("");
  const [floor, setFloor] = useState("1");
  const [showPassword, setShowPassword] = useState(false);
  const [showKonfirmasi, setShowKonfirmasi] = useState(false);

  const getTitle = (): string => {
    if (type === "gedung") return "Tambah Gedung";
    if (type === "ruangan") return "Tambah Ruangan";
    if (type === "jenis") return "Tambah Jenis Masalah";
    if (type === "ob") return "Tambah Akun OB";
    if (type === "admin") return "Tambah Akun Admin";
    return "Tambah Data";
  };

  const handleConfirm = () => {
    if (!nama.trim()) return;
    if (type === "ruangan" && !selectedGedung) return;
    if ((type === "ob" || type === "admin") && (!email.trim() || !password.trim() || !konfirmasi.trim())) return;
    if ((type === "ob" || type === "admin") && password !== konfirmasi) return;
    onConfirm({ nama, email, password, gedung: selectedGedung, floor });
    resetForm();
  };

  const resetForm = () => {
    setNama(""); setEmail(""); setPassword(""); setKonfirmasi("");
    setSelectedGedung(""); setFloor("1");
    setShowPassword(false); setShowKonfirmasi(false);
  };

  const handleClose = () => { resetForm(); onClose(); };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 w-[420px] shadow-xl">
        <div className="flex justify-between items-center mb-5">
          <h3 className="font-semibold text-base">{getTitle()}</h3>
          <button onClick={handleClose}><X size={18} className="text-gray-500 hover:text-gray-700" /></button>
        </div>

        <div className="space-y-4 text-sm">
          {type === "ruangan" && (
            <div>
              <label className="block text-gray-600 mb-1 font-medium">Pilih Gedung</label>
              <select
                value={selectedGedung}
                onChange={(e) => setSelectedGedung(e.target.value)}
                className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-500"
              >
                <option value="">Pilih Gedung</option>
                {gedungList.map((g, i) => (
                  // ✅ Fix: value pakai g.id (UUID), bukan g.nama
                  <option key={i} value={g.id}>{g.nama}</option>
                ))}
              </select>
            </div>
          )}

          <div>
            <label className="block text-gray-600 mb-1 font-medium">
              {type === "gedung" && "Nama Gedung"}
              {type === "ruangan" && "Nama Ruangan"}
              {type === "jenis" && "Nama Masalah"}
              {(type === "ob" || type === "admin") && "Nama"}
            </label>
            <div className="relative">
              {(type === "ob" || type === "admin") && (
                <User size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              )}
              <input
                value={nama}
                onChange={(e) => setNama(e.target.value)}
                className={`w-full border border-gray-300 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 ${(type === "ob" || type === "admin") ? "pl-9 pr-3" : "px-3"}`}
                placeholder={
                  type === "gedung" ? "Contoh: Gedung Ki Hajar Dewantara" :
                    type === "ruangan" ? "Masukkan nama ruangan" :
                      type === "jenis" ? "Contoh: Kerusakan Listrik" :
                        type === "ob" ? "Masukkan nama OB" : "Masukkan nama Admin"
                }
              />
            </div>
          </div>


          {(type === "ob" || type === "admin") && (
            <div>
              <label className="block text-gray-600 mb-1 font-medium">Email</label>
              <div className="relative">
                <Mail size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border border-gray-300 pl-9 pr-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder={type === "ob" ? "rara@upnvj.ac.id" : "admin@upnvj.ac.id"}
                />
              </div>
            </div>
          )}

          {(type === "ob" || type === "admin") && (
            <div>
              <label className="block text-gray-600 mb-1 font-medium">Buat Password</label>
              <div className="relative">
                <Lock size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full border border-gray-300 pl-9 pr-10 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Masukkan password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>
          )}

          {(type === "ob" || type === "admin") && (
            <div>
              <label className="block text-gray-600 mb-1 font-medium">Konfirmasi Password</label>
              <div className="relative">
                <Lock size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type={showKonfirmasi ? "text" : "password"}
                  value={konfirmasi}
                  onChange={(e) => setKonfirmasi(e.target.value)}
                  className="w-full border border-gray-300 pl-9 pr-10 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Konfirmasi Password"
                />
                <button
                  type="button"
                  onClick={() => setShowKonfirmasi(!showKonfirmasi)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showKonfirmasi ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
              {type === "ob" && (
                <p className="text-xs text-gray-400 mt-1">Password ini akan digunakan OB untuk login pertama kali</p>
              )}
            </div>
          )}
        </div>

        <div className="flex gap-3 mt-6">
          <button
            onClick={handleClose}
            className="flex-1 border border-gray-300 text-gray-600 py-2 rounded-lg hover:bg-gray-50 transition-all"
          >
            Batal
          </button>
          <button
            onClick={handleConfirm}
            className="flex-1 bg-green-700 text-white py-2 rounded-lg hover:bg-green-800 transition-all"
          >
            {(type === "ob" || type === "admin") ? "Buat Akun" : "Simpan"}
          </button>
        </div>
      </div>
    </div>
  );
}
