import { useState } from "react";
import { ArrowLeft, MapPin, Flag, ClockFading, CheckCircle, Save } from "lucide-react";
import Toast from "@/components/DashboardAdmin/Views/Manajemen/components/Toast";
import { useToast } from "@/hooks/useToast";
import type { LaporanAdmin, LaporanAdminStatus } from "@/types";
import type { ReactNode } from "react";

interface StatusOption {
  value: LaporanAdminStatus;
  label: string;
  icon: ReactNode;
  className: string;
}

interface DetailLaporanProps {
  laporan: LaporanAdmin;
  onKembali: () => void;
  onUpdate?: () => void;
}

import api from "@/lib/axios";

export default function DetailLaporan({ laporan, onKembali, onUpdate }: DetailLaporanProps) {
  const { toasts, showToast, removeToast } = useToast();
  const [selectedStatus, setSelectedStatus] = useState<LaporanAdminStatus>(laporan?.status || "reported");
  const [catatan, setCatatan] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const statusOptions: StatusOption[] = [
    { value: "reported", label: "Reported", icon: <Flag size={14} />, className: "bg-blue-100 text-blue-600" },
    { value: "inprogress", label: "In Progress", icon: <ClockFading size={14} />, className: "bg-yellow-100 text-yellow-600" },
    { value: "resolved", label: "Resolved", icon: <CheckCircle size={14} />, className: "bg-green-100 text-green-600" },
  ];

  const currentStatus = statusOptions.find((s) => s.value === selectedStatus);

  const mapFrontendStatus = (s: LaporanAdminStatus) => {
    if (s === "inprogress") return "IN_PROGRESS";
    if (s === "resolved") return "RESOLVED";
    return "REPORTED";
  };

  const handleSimpan = async () => {
    if (!laporan.originalId) {
      showToast("Gagal: ID Asli tidak ditemukan");
      return;
    }

    setIsLoading(true);
    try {
      const res = await api.patch(`/api/reports/${laporan.originalId}`, {
        status: mapFrontendStatus(selectedStatus),
        note: catatan,
      });

      if (res.data && res.data.success === false) {
        throw new Error(res.data.message || "Gagal menyimpan status");
      }

      showToast("Status laporan berhasil disimpan");
      setCatatan("");
      if (onUpdate) onUpdate(); // Refresh the list
    } catch (error: any) {
      showToast(error.message || "Terjadi kesalahan sistem saat menyimpan");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <Toast toasts={toasts} removeToast={removeToast} />
      <button onClick={onKembali} className="flex items-center gap-2 text-gray-600 hover:text-gray-800 text-sm">
        <ArrowLeft size={16} />Kembali
      </button>
      <h2 className="text-lg font-bold text-green-700">Detail Laporan</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm space-y-5">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-wide">ID Laporan</p>
              <p className="text-2xl font-bold text-gray-800 mt-1">{laporan?.id || "-"}</p>
            </div>
            <span className={`flex items-center gap-1 px-3 py-1 text-xs rounded-full font-medium ${currentStatus?.className}`}>
              {currentStatus?.icon}{currentStatus?.label}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-gray-400 mb-1">Tanggal</p>
              <p className="text-sm font-medium text-gray-700">{laporan?.tanggal || "-"}</p>
            </div>
            <div>
              <p className="text-xs text-gray-400 mb-1">Jenis Masalah</p>
              <p className="text-sm font-medium text-gray-700">{laporan?.jenis || "-"}</p>
            </div>
          </div>

          <div>
            <p className="text-xs text-gray-400 mb-1">Lokasi</p>
            <div className="flex items-start gap-2 text-sm text-gray-700">
              <MapPin size={15} className="text-gray-400 mt-0.5 shrink-0" />
              <span>{laporan?.gedung || "-"}, {laporan?.ruang || "-"}</span>
            </div>
          </div>

          <div>
            <p className="text-xs text-gray-400 mb-1">Deskripsi</p>
            <div className="bg-gray-50 rounded-lg p-3 text-sm text-gray-700 border border-gray-100">
              {laporan?.deskripsi || "AC diruangan menyala terus ketika sore hari dan tiap hari kamis."}
            </div>
          </div>

          <div>
            <p className="text-xs text-gray-400 mb-2">Foto Bukti</p>
            <div className="w-full h-48 bg-gray-100 rounded-lg overflow-hidden border border-gray-200 flex items-center justify-center">
              {laporan?.foto ? (
                <img src={laporan.foto} alt="Foto Bukti" className="w-full h-full object-cover" />
              ) : (
                <p className="text-sm text-gray-400">Tidak ada foto</p>
              )}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <h3 className="text-base font-semibold text-gray-700 mb-5">Update Status</h3>
          <div className="space-y-4">
            <div>
              <label className="text-sm text-gray-600 mb-1 block">Pilih Status Baru</label>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value as LaporanAdminStatus)}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                {statusOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-sm text-gray-600 mb-1 block">Catatan (Opsional)</label>
              <textarea
                value={catatan}
                onChange={(e) => setCatatan(e.target.value)}
                rows={5}
                placeholder="Tambahkan catatan di sini..."
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
              />
            </div>
            <button onClick={handleSimpan} disabled={isLoading} className="w-full bg-green-700 text-white py-3 rounded-lg text-sm font-semibold hover:bg-green-800 transition flex items-center justify-center gap-2 disabled:opacity-50">
              <Save size={16} />{isLoading ? "Menyimpan..." : "Simpan Status"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
