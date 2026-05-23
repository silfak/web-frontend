import { useState } from "react";
import { useNavigate } from "react-router-dom";
import FilterSection from "@/components/DashboardAdmin/FilterSection";
import TableLaporan from "@/components/DashboardAdmin/TableLaporan";
import EmptyState from "@/components/DashboardAdmin/EmptyState";
import { ClipboardList } from "lucide-react";
import type { FiltersState, LaporanAdmin, LaporanAdminStatus } from "@/types";

export default function LaporanView({ laporanData = [] }: { laporanData?: LaporanAdmin[] }) {
  const navigate = useNavigate();
  const [filters, setFilters] = useState<FiltersState>({
    search: "",
    status: "",
    startDate: "",
    endDate: "",
    page: 1,
  });

  const statuses: LaporanAdminStatus[] = ["reported", "inprogress", "resolved"];

  const filteredData = laporanData.filter((item) => {
    return (
      item.nama.toLowerCase().includes(filters.search.toLowerCase()) &&
      (filters.status ? item.status === filters.status : true)
    );
  });


  return (
    <div className="space-y-4">
      <h2 className="text-lg md:text-xl font-bold text-green-700">Daftar Laporan</h2>
      <FilterSection
        filters={filters}
        setFilters={(val) => setFilters((prev) => ({ ...prev, ...val, page: 1 }))}
      />
      {filteredData.length === 0 ? (
        <div className="bg-white rounded-xl shadow-lg py-16">
          <EmptyState
            icon={ClipboardList}
            title={filters.search || filters.status ? "Data tidak ditemukan" : "Belum ada Riwayat Laporan"}
            desc={
              filters.search || filters.status
                ? "Coba ubah kata kunci pencarian atau filter yang digunakan."
                : "Anda belum memiliki catatan laporan fasilitas."
            }
          />
        </div>
      ) : (
        <TableLaporan
          data={filteredData}
          page={filters.page}
          setPage={(p) => setFilters((prev) => ({ ...prev, page: p }))}
          onLihatDetail={(laporan) => navigate(`/laporan/${laporan.id}`, { state: { laporan } })}
        />
      )}
    </div>
  );
}
