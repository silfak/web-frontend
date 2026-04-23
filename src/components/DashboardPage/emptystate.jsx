import { ClipboardList } from "lucide-react";

export default function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center text-center">
      
      <div className="bg-gray-100 p-5 rounded-full mb-5">
        <ClipboardList size={40} className="text-gray-500" />
      </div>

      <h4 className="text-green-700 font-semibold text-lg mb-2">
        Belum ada Riwayat Laporan
      </h4>

      <p className="text-gray-500 text-sm max-w-md">
        Anda belum memiliki catatan laporan fasilitas. Gunakan tombol
        Buat laporan baru di atas untuk melaporkan kendala yang Anda temui di kampus.
      </p>

    </div>
  );
}