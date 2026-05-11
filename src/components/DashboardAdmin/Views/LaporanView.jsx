import { useState } from "react";
import FilterSection from "@/components/DashboardAdmin/FilterSection";
import TableLaporan from "@/components/DashboardAdmin/TableLaporan";
import EmptyState from "@/components/DashboardAdmin/EmptyState";
import DetailLaporan from "@/components/DashboardAdmin/Views/DetailLaporan";
import { ClipboardList } from "lucide-react";

export default function LaporanView() {
  const [filters, setFilters] = useState({
    search: "",
    status: "",
    startDate: "",
    endDate: "",
    page: 1,
  });

  const [selectedLaporan, setSelectedLaporan] = useState(null);

  const statuses = ["reported", "inprogress", "resolved"];

  const gedungList = [
    { nama: "Gedung Dewi Sartika", ruang: ["FIK-101", "FIK-201", "FIK-301"] },
    { nama: "Gedung Ki Hajar Dewantara", ruang: ["FKLAB-101", "FKLAB-203", "FKLAB-303"] },
  ];

  const jenisMasalah = ["Pemborosan Listrik", "AC Rusak", "Lampu Mati", "Kebocoran Air"];

  const namaDepan = ["Jhon", "Jhon", "Jhon", "Jhon", "Jhon", "Jhon", "Jhon", "Jhon", "Jhon", "Jhon"];
  const namaBelakang = ["Doe", "Doe", "Doe", "Doe", "Doe", "Doe", "Doe", "Doe", "Doe", "Doe"];

  const isEmpty = false; // ubah true untuk empty

  const dummyData = isEmpty
    ? []
    : Array.from({ length: 20 }, (_, i) => {
        const gedungRandom = gedungList[Math.floor(Math.random() * gedungList.length)];
        const ruangRandom = gedungRandom.ruang[Math.floor(Math.random() * gedungRandom.ruang.length)];
        return {
          id: `SFK-2026-00${i + 1}`,
          nama: `${namaDepan[Math.floor(Math.random() * namaDepan.length)]} ${namaBelakang[Math.floor(Math.random() * namaBelakang.length)]}`,
          gedung: gedungRandom.nama,
          ruang: `Lantai ${Math.ceil(Math.random() * 3)}, Ruang ${ruangRandom}`,
          jenis: jenisMasalah[Math.floor(Math.random() * jenisMasalah.length)],
          tanggal: new Date(2026, 3, Math.floor(Math.random() * 28) + 1).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" }),
          jam: `${14 + Math.floor(Math.random() * 5)}:${Math.floor(Math.random() * 60).toString().padStart(2, "0")}`,
          status: statuses[Math.floor(Math.random() * statuses.length)],
          deskripsi: "AC diruangan menyala terus ketika sore hari dan tiap hari kamis.",
        };
      });

  const filteredData = dummyData.filter((item) => {
    return (
      item.nama.toLowerCase().includes(filters.search.toLowerCase()) &&
      (filters.status ? item.status === filters.status : true)
    );
  });

  // Jika ada laporan yang dipilih, tampilkan detail
  if (selectedLaporan) {
    return (
      <DetailLaporan
        laporan={selectedLaporan}
        onKembali={() => setSelectedLaporan(null)}
      />
    );
  }

  return (
    <div className="space-y-4">

      {/* HEADING */}
      <h2 className="text-lg md:text-xl font-bold text-green-700">
        Daftar Laporan
      </h2>

      {/* FILTER */}
      <FilterSection
        filters={filters}
        setFilters={(val) => setFilters((prev) => ({ ...prev, ...val, page: 1 }))}
      />

      {/* EMPTY / TABLE */}
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
          onLihatDetail={(laporan) => setSelectedLaporan(laporan)}
        />
      )}

    </div>
  );
}
