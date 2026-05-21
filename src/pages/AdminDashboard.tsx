import { useNavigate, useLocation, useParams, Navigate } from "react-router-dom";
import AdminSidebar from "@/components/DashboardAdmin/AdminSidebar";
import AdminHeader from "@/components/DashboardAdmin/AdminHeader";
import Footer from "@/components/DashboardAdmin/Footer";
import DashboardView from "@/components/DashboardAdmin/Views/DashboardView";
import LaporanView from "@/components/DashboardAdmin/Views/LaporanView";
import DetailLaporan from "@/components/DashboardAdmin/Views/DetailLaporan";
import ManajemenView from "@/components/DashboardAdmin/Views/Manajemen/ManajemenView";
import ProfileAdminView from "@/components/DashboardAdmin/Views/ProfileAdminView";
import type { LaporanAdmin, LaporanAdminStatus } from "@/types";

const statuses: LaporanAdminStatus[] = ["reported", "inprogress", "resolved"];
const gedungList = [
  { nama: "Gedung Dewi Sartika", ruang: ["FIK-101", "FIK-201", "FIK-301"] },
  { nama: "Gedung Ki Hajar Dewantara", ruang: ["FKLAB-101", "FKLAB-203", "FKLAB-303"] },
];
const jenisMasalah = ["Pemborosan Listrik", "AC Rusak", "Lampu Mati", "Kebocoran Air"];
const dummyData: LaporanAdmin[] = Array.from({ length: 20 }, (_, i) => {
  const gedung = gedungList[i % 2];
  const ruang = gedung.ruang[i % gedung.ruang.length];
  return {
    id: `SFK-2026-${String(i + 1).padStart(3, "0")}`,
    nama: `Jhon Doe`,
    gedung: gedung.nama,
    ruang: `Lantai ${(i % 3) + 1}, Ruang ${ruang}`,
    jenis: jenisMasalah[i % jenisMasalah.length],
    tanggal: new Date(2026, 3, (i % 28) + 1).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" }),
    jam: `${14 + (i % 5)}:${String(i * 3 % 60).padStart(2, "0")}`,
    status: statuses[i % statuses.length],
    deskripsi: "AC diruangan menyala terus ketika sore hari dan tiap hari kamis.",
  };
});

function DetailLaporanWrapper() {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const laporan: LaporanAdmin | undefined =
    (location.state as any)?.laporan ?? dummyData.find((l) => l.id === id);
  
  if (!laporan) return <Navigate to="/laporan" replace />;
  
  return <DetailLaporan laporan={laporan} onKembali={() => navigate("/laporan")} />;
}

export default function AdminDashboard() {
  const location = useLocation();
  const path = location.pathname;

  const getTitle = (): string => {
    if (path === "/laporan" || path.startsWith("/laporan/")) return "Laporan";
    if (path === "/manajemen") return "Manajemen";
    if (path === "/profile") return "Profile";
    return "Dashboard";
  };

  const renderContent = () => {
    if (path.startsWith("/laporan/")) return <DetailLaporanWrapper />;
    if (path === "/laporan") return <LaporanView />;
    if (path === "/manajemen") return <ManajemenView />;
    if (path === "/profile") return <ProfileAdminView />;
    return <DashboardView laporanData={dummyData} />;
  };

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <div className="flex-1 flex flex-col md:ml-64">
        <div className="p-4 flex-1">
          <AdminHeader title={getTitle()} />
          {renderContent()}
        </div>
        <Footer />
      </div>
    </div>
  );
}
