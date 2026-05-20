import React, { useState } from "react";
import profile from "@/assets/profile.png";
import api from "@/lib/axios";
import { useAuth } from "@/context/AuthContext";

interface ProfileOBProps {
  onShowToast: (msg: string) => void;
}

export default function ProfileOB({ onShowToast }: ProfileOBProps) {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    passwordConfirmation: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (formData.newPassword !== formData.passwordConfirmation) {
      setError("Konfirmasi password baru tidak cocok.");
      return;
    }
    if (formData.newPassword.length < 8) {
      setError("Password baru harus minimal 8 karakter.");
      return;
    }

    setLoading(true);

    try {
      await api.put("/api/auth/change-password", {
        oldPassword: formData.oldPassword,
        newPassword: formData.newPassword,
        passwordConfirmation: formData.passwordConfirmation,
      });

      if (onShowToast) {
        onShowToast("Password berhasil diganti!");
      }
      setFormData({
        oldPassword: "",
        newPassword: "",
        passwordConfirmation: "",
      });
    } catch (err: any) {
      setError(err.response?.data?.message || "Gagal mengganti password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 animate-in slide-in-from-bottom-4 duration-500 text-sm">
      {/* Kiri: Info Profil */}
      <div className="lg:col-span-4 bg-white rounded-[2.5rem] shadow-sm border border-gray-100 p-10 flex flex-col items-center">
        <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg mb-4">
          <img src={profile} alt="Avatar" className="w-full h-full object-cover" />
        </div>
        <button className="text-xs font-bold text-gray-400 hover:text-[#107C41] mb-10">Edit Foto</button>
        
        <div className="w-full space-y-6">
          <div>
            <label className="text-[10px] uppercase font-bold text-gray-400 tracking-widest">Nama</label>
            <div className="bg-gray-50 p-4 rounded-2xl font-bold text-gray-700 mt-1.5">
              {user?.name || user?.nama || "Memuat nama..."}
            </div>
          </div>
          <div>
            <label className="text-[10px] uppercase font-bold text-gray-400 tracking-widest">Email</label>
            <div className="bg-gray-50 p-4 rounded-2xl font-bold text-gray-700 mt-1.5 text-xs truncate">
              {user?.email || "Memuat email..."}
            </div>
          </div>
          <div>
            <label className="text-[10px] uppercase font-bold text-gray-400 tracking-widest">Role</label>
            <div className="bg-[#FDF2E9] text-[#7C4110] px-5 py-1.5 rounded-full text-[10px] font-bold w-fit mt-2 uppercase tracking-wider">
              {user?.role || "OB"}
            </div>
          </div>
        </div>
      </div>

      {/* Kanan: Ganti Password */}
      <div className="lg:col-span-8 bg-white rounded-[2.5rem] shadow-sm border border-gray-100 p-10">
        <h3 className="text-xl font-bold text-gray-700 mb-8 pb-4 border-b border-gray-50">Ganti Password</h3>
        
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 text-xs font-semibold rounded-xl px-4 py-3 mb-6">
            {error}
          </div>
        )}

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="text-xs font-bold text-gray-600 block mb-2">Password Lama</label>
            <input 
              required
              type="password" 
              name="oldPassword"
              value={formData.oldPassword}
              onChange={handleChange}
              placeholder="Masukkan Password Lama" 
              className="w-full bg-white border border-gray-200 rounded-xl p-4 text-sm focus:ring-2 focus:ring-[#107C41]/20 outline-none transition-all" 
            />
          </div>

          <div>
            <label className="text-xs font-bold text-gray-600 block mb-2">Password Baru</label>
            <input 
              required
              type="password" 
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              placeholder="Masukkan Password Baru" 
              className="w-full bg-white border border-gray-200 rounded-xl p-4 text-sm focus:ring-2 focus:ring-[#107C41]/20 outline-none transition-all" 
            />
          </div>

          <div>
            <label className="text-xs font-bold text-gray-600 block mb-2">Konfirmasi Password Baru</label>
            <input 
              required
              type="password" 
              name="passwordConfirmation"
              value={formData.passwordConfirmation}
              onChange={handleChange}
              placeholder="Konfirmasi Password Baru" 
              className="w-full bg-white border border-gray-200 rounded-xl p-4 text-sm focus:ring-2 focus:ring-[#107C41]/20 outline-none transition-all" 
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-[#107C41] text-white py-4 rounded-xl font-bold hover:bg-[#0d6334] transition-all mt-4 active:scale-[0.98] disabled:opacity-75"
          >
            {loading ? "Memproses..." : "Simpan Perubahan"}
          </button>
        </form>
      </div>
    </div>
  );
}
