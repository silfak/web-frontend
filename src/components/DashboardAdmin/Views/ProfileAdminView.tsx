import { useState } from "react";
import { useToast } from "../../../hooks/useToast";
import Toast from "./Manajemen/components/Toast";
import api from "@/lib/axios";
import { useAuth } from "@/context/AuthContext";

export default function ProfileView() {
  const { toasts, showToast, removeToast } = useToast();
  const { user } = useAuth();

  const [passwordLama, setPasswordLama] = useState("");
  const [passwordBaru, setPasswordBaru] = useState("");
  const [konfirmasi, setKonfirmasi] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!passwordLama || !passwordBaru || !konfirmasi) return;

    if (passwordBaru !== konfirmasi) {
      showToast("Konfirmasi password tidak cocok", "error");
      return;
    }
    if (passwordBaru.length < 8) {
      showToast("Password baru harus minimal 8 karakter", "error");
      return;
    }

    setLoading(true);

    try {
      await api.put("/api/auth/change-password", {
        oldPassword: passwordLama,
        newPassword: passwordBaru,
        passwordConfirmation: konfirmasi,
      });

      showToast("Password berhasil diganti!");
      setPasswordLama("");
      setPasswordBaru("");
      setKonfirmasi("");
    } catch (err: any) {
      showToast(err.response?.data?.message || "Gagal mengganti password", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 text-sm">
      <Toast toasts={toasts} removeToast={removeToast} />

      <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">Profile</h3>
        <div className="space-y-4">
          <div>
            <label className="text-sm text-gray-600">Nama</label>
            <div className="bg-gray-100 p-3 rounded-md text-sm font-medium text-gray-700 mt-1">
              {user?.name || user?.nama || "Memuat nama..."}
            </div>
          </div>
          <div>
            <label className="text-sm text-gray-600">Email</label>
            <div className="bg-gray-100 p-3 rounded-md text-sm font-medium text-gray-700 mt-1">
              {user?.email || "Memuat email..."}
            </div>
          </div>
          <div>
            <label className="text-sm text-gray-600">Role</label>
            <div className="mt-2">
              <span className="bg-purple-100 text-purple-600 px-3 py-1 rounded-full text-xs font-semibold uppercase">
                {user?.role || "admin"}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">Ganti Password</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm text-gray-600">Password Lama</label>
            <input 
              type="password" 
              required
              value={passwordLama} 
              onChange={(e) => setPasswordLama(e.target.value)} 
              placeholder="Masukkan Password Lama" 
              className="w-full mt-1 p-3 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-green-200" 
            />
          </div>
          <div>
            <label className="text-sm text-gray-600">Password Baru</label>
            <input 
              type="password" 
              required
              value={passwordBaru} 
              onChange={(e) => setPasswordBaru(e.target.value)} 
              placeholder="Masukkan Password Baru" 
              className="w-full mt-1 p-3 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-green-200" 
            />
          </div>
          <div>
            <label className="text-sm text-gray-600">Konfirmasi Password Baru</label>
            <input 
              type="password" 
              required
              value={konfirmasi} 
              onChange={(e) => setKonfirmasi(e.target.value)} 
              placeholder="Konfirmasi Password Baru" 
              className="w-full mt-1 p-3 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-green-200" 
            />
          </div>
          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-green-700 text-white py-3 rounded-md text-sm font-semibold hover:bg-green-800 transition disabled:opacity-75"
          >
            {loading ? "Memproses..." : "Simpan"}
          </button>
        </form>
      </div>
    </div>
  );
}
