import { UserX } from "lucide-react";
import type { UserItem } from "@/types";

interface ToggleUserModalProps {
  show: boolean;
  user: UserItem | null;
  onClose: () => void;
  onConfirm: () => void;
}

export default function ToggleUserModal({ show, user, onClose, onConfirm }: ToggleUserModalProps) {
  if (!show) return null;

  const getRoleLabel = (): string => {
    if (user?.role === "ob") return "OB";
    if (user?.role === "admin") return "Admin";
    return "Mahasiswa";
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 w-[360px] text-center shadow-xl">
        <div className={`w-14 h-14 flex items-center justify-center rounded-xl mx-auto mb-4 ${user?.status ? "bg-red-100" : "bg-green-100"}`}>
          <UserX className={user?.status ? "text-red-600" : "text-green-600"} />
        </div>
        <h3 className="font-semibold text-base mb-2">
          {user?.status ? `Nonaktifkan Akun ${getRoleLabel()} Ini?` : `Aktifkan Akun ${getRoleLabel()} Ini?`}
        </h3>
        <p className="text-sm text-gray-500 mb-6">
          {user?.status
            ? "Akun ini akan dinonaktifkan. User tidak akan bisa login sampai akun diaktifkan kembali."
            : "Akun ini akan diaktifkan kembali. User akan bisa login ke sistem."}
        </p>
        <div className="flex gap-3">
          <button onClick={onClose} className="flex-1 border border-gray-300 text-gray-600 py-2 rounded-lg">Batal</button>
          <button onClick={onConfirm} className={`flex-1 text-white py-2 rounded-lg ${user?.status ? "bg-red-500 hover:bg-red-600" : "bg-green-600 hover:bg-green-700"}`}>
            {user?.status ? "Ya, Nonaktifkan" : "Ya, Aktifkan"}
          </button>
        </div>
      </div>
    </div>
  );
}
