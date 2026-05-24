import { Plus } from "lucide-react";

interface SubTabUserProps {
  userTab: string;
  setUserTab: (tab: string) => void;
  setPage: (page: number) => void;
  onTambah: (type: string) => void;
  isSuperAdmin: boolean;
}

export default function SubTabUser({ userTab, setUserTab, setPage, onTambah, isSuperAdmin }: SubTabUserProps) {
  return (
    <div className="flex justify-between items-center mb-4">
      <div className="flex bg-gray-100 rounded-lg p-1">
        <button onClick={() => { setUserTab("mahasiswa"); setPage(1); }} className={`px-4 py-2 rounded-md text-sm transition-all ${userTab === "mahasiswa" ? "bg-green-700 text-white" : "text-gray-500"}`}>Mahasiswa</button>
        <button onClick={() => { setUserTab("ob"); setPage(1); }} className={`px-4 py-2 rounded-md text-sm transition-all ${userTab === "ob" ? "bg-green-700 text-white" : "text-gray-500"}`}>OB</button>
        {isSuperAdmin && (
          <button onClick={() => { setUserTab("admin"); setPage(1); }} className={`px-4 py-2 rounded-md text-sm transition-all ${userTab === "admin" ? "bg-green-700 text-white" : "text-gray-500"}`}>Admin</button>
        )}
      </div>
      {userTab === "ob" && (
        <button onClick={() => onTambah("ob")} className="bg-green-700 text-white px-4 py-2 rounded flex gap-2 text-sm hover:bg-green-800 transition-all">
          <Plus size={16} />Tambah Akun OB
        </button>
      )}
      {userTab === "admin" && isSuperAdmin && (
        <button onClick={() => onTambah("admin")} className="bg-green-700 text-white px-4 py-2 rounded flex gap-2 text-sm hover:bg-green-800 transition-all">
          <Plus size={16} />Tambah Akun Admin
        </button>
      )}
    </div>
  );
}
