import { Trash2 } from "lucide-react";

interface DeleteModalProps {
  show: boolean;
  deleteItem: { nama: string } | null;
  deleteType: string;
  onClose: () => void;
  onConfirm: () => void;
}

export default function DeleteModal({ show, deleteItem, deleteType, onClose, onConfirm }: DeleteModalProps) {
  if (!show) return null;

  const getTitle = (): string => {
    if (deleteType === "gedung") return "Hapus Gedung Ini?";
    if (deleteType === "ruangan") return "Hapus Ruangan Ini?";
    if (deleteType === "jenis") return "Hapus Jenis Masalah Ini?";
    return "Hapus Data?";
  };

  const getDesc = (): string => {
    if (deleteType === "gedung") return "Menghapus gedung akan menghapus semua ruangan di dalamnya. Data yang dihapus tidak dapat dipulihkan.";
    if (deleteType === "ruangan") return "Ruangan ini akan dihapus dari sistem. Data yang dihapus tidak dapat dipulihkan.";
    if (deleteType === "jenis") return "Jenis masalah ini akan dihapus dari sistem. Data yang dihapus tidak dapat dipulihkan.";
    return "Data yang dihapus tidak dapat dipulihkan.";
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 w-[360px] text-center shadow-xl">
        <div className="bg-red-100 w-14 h-14 flex items-center justify-center rounded-xl mx-auto mb-4">
          <Trash2 className="text-red-600" />
        </div>
        <h3 className="font-semibold text-lg mb-2">{getTitle()}</h3>
        {deleteItem && <p className="text-sm text-gray-700 mb-2 font-medium">{deleteItem.nama}</p>}
        <p className="text-sm text-gray-500 mb-6">{getDesc()}</p>
        <div className="flex gap-3">
          <button onClick={onClose} className="flex-1 border border-red-500 text-red-500 py-2 rounded-lg">Batal</button>
          <button onClick={onConfirm} className="flex-1 bg-red-500 text-white py-2 rounded-lg">Ya, Hapus</button>
        </div>
      </div>
    </div>
  );
}
