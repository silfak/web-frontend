import ReportTable from "@/components/DashboardPage/Views/ReportTable";

export default function LaporanView({ onViewDetail }) {
  const myReports = [
    { tgl: "17 April 2026", lokasi: "Gedung Dewi Sartika", ruang: "Lantai 3, Ruang FIK-301", masalah: "Pemborosan AC", status: "Reported" },
    { tgl: "12 April 2026", lokasi: "Gedung Ki Hajar Dewantara", ruang: "Lantai 2, Ruang FIKLAB-201", masalah: "Pemborosan Listrik", status: "Inprogress" },
  ];

  return (
    <div className="animate-in fade-in duration-500">
      <ReportTable reports={myReports} onViewDetail={onViewDetail} />
    </div>
  );
}