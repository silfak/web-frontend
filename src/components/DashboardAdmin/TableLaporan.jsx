import React from "react";
import { ClockFading, CheckCircle, Flag, ArrowRight } from "lucide-react";

export default function TableLaporan({ data = [], page = 1, setPage, onLihatDetail }) {
  const itemsPerPage = 7;
  const safeData = Array.isArray(data) ? data : [];
  const totalPages = Math.max(1, Math.ceil(safeData.length / itemsPerPage));
  const currentData = safeData.slice((page - 1) * itemsPerPage, page * itemsPerPage);
  const startIndex = (page - 1) * itemsPerPage + 1;
  const endIndex = Math.min(page * itemsPerPage, safeData.length);

  const getStatusStyle = (status) => {
    switch (status) {
      case "reported":
        return { text: "Reported", className: "bg-blue-100 text-blue-600", icon: <Flag size={14} /> };
      case "inprogress":
        return { text: "In Progress", className: "bg-yellow-100 text-yellow-600", icon: <ClockFading size={14} /> };
      case "resolved":
        return { text: "Resolved", className: "bg-green-100 text-green-600", icon: <CheckCircle size={14} /> };
      default:
        return { text: status || "-", className: "bg-gray-100 text-gray-600", icon: null };
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-4">

      {/* ================= MOBILE ================= */}
      <div className="md:hidden space-y-3">
        {currentData.length === 0 ? (
          <p className="text-center text-gray-400">Tidak ada data</p>
        ) : (
          currentData.map((item, i) => {
            const status = getStatusStyle(item?.status);
            return (
              <div key={i} className="border rounded-lg p-3 shadow-sm">
                <div className="flex justify-between items-center">
                  <p className="font-semibold text-sm">{item?.id || "-"}</p>
                  <span className={`flex items-center gap-1 px-2 py-1 text-xs rounded-full ${status.className}`}>
                    {status.icon}{status.text}
                  </span>
                </div>
                <p className="text-sm font-medium mt-1">{item?.nama || "-"}</p>
                <p className="text-xs text-gray-500">{item?.gedung || "-"} • {item?.ruang || "-"}</p>
                <p className="text-xs mt-1">{item?.jenis || "-"}</p>
                <p className="text-xs text-gray-400 mt-1">{item?.tanggal || "-"} • {item?.jam || "-"}</p>
                <button
                  onClick={() => onLihatDetail?.(item)}
                  className="text-green-700 text-sm font-semibold mt-2 flex items-center gap-1"
                >
                  Lihat Detail <ArrowRight size={14} />
                </button>
              </div>
            );
          })
        )}
      </div>

      {/* ================= DESKTOP ================= */}
      <div className="hidden md:block overflow-x-auto">
        <table className="min-w-[700px] w-full text-sm">
          <thead className="bg-green-700 text-white">
            <tr>
              <th className="p-3 text-left">ID Laporan</th>
              <th className="p-3 text-left">Pelapor</th>
              <th className="p-3 text-left">Lokasi</th>
              <th className="p-3 text-left">Jenis Masalah</th>
              <th className="p-3 text-left">Waktu</th>
              <th className="p-3 text-left">Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {currentData.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center p-6 text-gray-400">Tidak ada data</td>
              </tr>
            ) : (
              currentData.map((item, i) => {
                const status = getStatusStyle(item?.status);
                return (
                  <tr key={i} className="border-b hover:bg-gray-50">
                    <td className="p-3">{item?.id || "-"}</td>
                    <td className="p-3">{item?.nama || "-"}</td>
                    <td className="p-3">
                      <p className="text-green-700 font-medium">{item?.gedung || "-"}</p>
                      <p className="text-xs text-gray-500">{item?.ruang || "-"}</p>
                    </td>
                    <td className="p-3">{item?.jenis || "-"}</td>
                    <td className="p-3">
                      <p className="text-green-700 font-medium">{item?.tanggal || "-"}</p>
                      <p className="text-xs text-gray-500">{item?.jam || "-"} WIB</p>
                    </td>
                    <td className="p-3">
                      <span className={`flex items-center gap-1 px-3 py-1 text-xs rounded-full w-fit ${status.className}`}>
                        {status.icon}{status.text}
                      </span>
                    </td>
                    <td className="p-3">
                      <button
                        onClick={() => onLihatDetail?.(item)}
                        className="flex items-center gap-1 text-green-700 font-semibold text-sm hover:text-green-900 transition-colors"
                      >
                        Lihat Detail <ArrowRight size={14} />
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* ================= PAGINATION ================= */}
      <div className="flex flex-col sm:flex-row justify-between items-center mt-4 text-sm gap-2">
        <p>Menampilkan {safeData.length === 0 ? 0 : startIndex}–{endIndex} dari {safeData.length} Laporan</p>
        <div className="flex gap-2 flex-wrap">
          <button disabled={page === 1} onClick={() => setPage(page - 1)} className="px-3 py-1 border rounded disabled:opacity-50">
            Previous
          </button>
          {[...Array(totalPages)].map((_, i) => (
            <button key={i} onClick={() => setPage(i + 1)} className={`px-3 py-1 rounded ${page === i + 1 ? "bg-green-700 text-white" : "border"}`}>
              {i + 1}
            </button>
          ))}
          <button disabled={page === totalPages} onClick={() => setPage(page + 1)} className="px-3 py-1 border rounded disabled:opacity-50">
            Next
          </button>
        </div>
      </div>

    </div>
  );
}
