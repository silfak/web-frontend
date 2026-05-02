import { Plus } from "lucide-react";

export default function SubTabFasilitas({ mode, setMode, setPage, onTambah, mainTab }) {
  return (
    <div className="flex justify-between mb-4">
      <div className="flex bg-gray-100 rounded-lg p-1">
        <button
          onClick={() => setMode("gedung")}
          className={`px-4 py-2 rounded-md text-sm transition-all ${
            mode === "gedung" ? "bg-green-700 text-white" : "text-gray-500"
          }`}
        >
          Gedung
        </button>

        <button
          onClick={() => { setMode("ruangan"); setPage(1); }}
          className={`px-4 py-2 rounded-md text-sm transition-all ${
            mode === "ruangan" ? "bg-green-700 text-white" : "text-gray-500"
          }`}
        >
          Ruangan
        </button>
      </div>

      <button
        onClick={() => onTambah(mode)}
        className="bg-green-700 text-white px-4 py-2 rounded flex gap-2 text-sm hover:bg-green-800 transition-all"
      >
        <Plus size={16} />
        Tambah {mode === "gedung" ? "Gedung" : "Ruangan"}
      </button>
    </div>
  );
}
