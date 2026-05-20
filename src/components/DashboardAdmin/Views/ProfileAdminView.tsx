import { useState } from "react";
import { useToast } from "../../../hooks/useToast";
import Toast from "./Manajemen/components/Toast";

export default function ProfileView() {
  const { toasts, showToast, removeToast } = useToast();

  const [passwordLama, setPasswordLama] = useState("");
  const [passwordBaru, setPasswordBaru] = useState("");
  const [konfirmasi, setKonfirmasi] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!passwordLama || !passwordBaru || !konfirmasi) return;
    if (passwordBaru !== konfirmasi) {
      showToast("Konfirmasi password tidak cocok", "error");
      return;
    }
    console.log("ganti password");
    showToast("Profil berhasil diperbarui");
    setPasswordLama("");
    setPasswordBaru("");
    setKonfirmasi("");
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Toast toasts={toasts} removeToast={removeToast} />

      <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">Profile</h3>
        <div className="space-y-4">
          <div>
            <label className="text-sm text-gray-600">Nama</label>
            <div className="bg-gray-100 p-3 rounded-md text-sm font-medium text-gray-700 mt-1">Administrator</div>
          </div>
          <div>
            <label className="text-sm text-gray-600">Email</label>
            <div className="bg-gray-100 p-3 rounded-md text-sm font-medium text-gray-700 mt-1">admin@silfak.com</div>
          </div>
          <div>
            <label className="text-sm text-gray-600">Role</label>
            <div className="mt-2">
              <span className="bg-purple-100 text-purple-600 px-3 py-1 rounded-full text-xs font-semibold">admin</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">Ganti Password</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm text-gray-600">Password Lama</label>
            <input type="password" value={passwordLama} onChange={(e) => setPasswordLama(e.target.value)} placeholder="Masukkan Password Lama" className="w-full mt-1 p-3 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-green-200" />
          </div>
          <div>
            <label className="text-sm text-gray-600">Password Baru</label>
            <input type="password" value={passwordBaru} onChange={(e) => setPasswordBaru(e.target.value)} placeholder="Masukkan Password Baru" className="w-full mt-1 p-3 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-green-200" />
          </div>
          <div>
            <label className="text-sm text-gray-600">Konfirmasi Password Baru</label>
            <input type="password" value={konfirmasi} onChange={(e) => setKonfirmasi(e.target.value)} placeholder="Konfirmasi Password Baru" className="w-full mt-1 p-3 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-green-200" />
          </div>
          <button type="submit" className="w-full bg-green-700 text-white py-3 rounded-md text-sm font-semibold hover:bg-green-800 transition">Simpan</button>
        </form>
      </div>
    </div>
  );
}
