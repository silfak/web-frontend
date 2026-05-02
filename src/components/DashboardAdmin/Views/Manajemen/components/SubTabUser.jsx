import { Plus } from "lucide-react";

export default function SubTabUser({ userTab, setUserTab, setPage, onTambah }) {
  return (
    <div className="flex justify-between items-center mb-4">
      <div className="flex bg-gray-100 rounded-lg p-1">
        <button
          onClick={() => { setUserTab("mahasiswa"); setPage(1); }}
          className={`px-4 py-2 rounded-md text-sm transition-all ${
            userTab === "mahasiswa" ? "bg-green-700 text-white" : "text-gray-500"
          }`}
        >
          Mahasiswa
        </button>

        <button
          onClick={() => { setUserTab("ob"); setPage(1); }}
          className={`px-4 py-2 rounded-md text-sm transition-all ${
            userTab === "ob" ? "bg-green-700 text-white" : "text-gray-500"
          }`}
        >
          OB
        </button>

        <button
          onClick={() => { setUserTab("admin"); setPage(1); }}
          className={`px-4 py-2 rounded-md text-sm transition-all ${
            userTab === "admin" ? "bg-green-700 text-white" : "text-gray-500"
          }`}
        >
          Admin
        </button>
      </div>

      {/* Tombol tambah OB dan Admin */}
      {userTab === "ob" && (
        <button
          onClick={() => onTambah("ob")}
          className="bg-green-700 text-white px-4 py-2 rounded flex gap-2 text-sm hover:bg-green-800 transition-all"
        >
          <Plus size={16} />
          Tambah Akun OB
        </button>
      )}

      {userTab === "admin" && (
        <button
          onClick={() => onTambah("admin")}
          className="bg-green-700 text-white px-4 py-2 rounded flex gap-2 text-sm hover:bg-green-800 transition-all"
        >
          <Plus size={16} />
          Tambah Akun Admin
        </button>
      )}
    </div>
  );
}
