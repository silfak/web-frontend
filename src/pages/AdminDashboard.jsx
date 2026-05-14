import { useState } from "react";
import AdminSidebar from "@/components/DashboardAdmin/AdminSidebar";
import AdminHeader from "@/components/DashboardAdmin/AdminHeader";
import Footer from "@/components/DashboardAdmin/Footer";

import DashboardView from "@/components/DashboardAdmin/Views/DashboardView";
import LaporanView from "@/components/DashboardAdmin/Views/LaporanView";
import ManajemenView from "@/components/DashboardAdmin/Views/Manajemen/ManajemenView";
import ProfileAdminView from "@/components/DashboardAdmin/Views/ProfileAdminView";




export default function AdminDashboard() {
  const [activeMenu, setActiveMenu] = useState("dashboard");

  // 🔥 DATA PUSAT (DUMMY REALISTIS)
  const statuses = ["reported", "inprogress", "resolved"];

  const gedungList = [
    {
      nama: "Gedung Dewi Sartika",
      ruang: ["FIK-101", "FIK-201", "FIK-301"],
    },
    {
      nama: "Gedung Ki Hajar Dewantara",
      ruang: ["FKLAB-101", "FKLAB-203", "FKLAB-303"],
    },
  ];

  const jenisMasalah = [
    "Pemborosan Listrik",
    "AC Rusak",
    "Lampu Mati",
    "Kebocoran Air",
  ];

  const dummyData = Array.from({ length: 20 }, (_, i) => {
    const gedungRandom =
      gedungList[Math.floor(Math.random() * gedungList.length)];

    const ruangRandom =
      gedungRandom.ruang[
        Math.floor(Math.random() * gedungRandom.ruang.length)
      ];

    return {
      id: `SFK-00${i + 1}`,
      nama: `User ${i + 1}`,
      gedung: gedungRandom.nama,
      ruang: `Lantai ${Math.ceil(Math.random() * 3)}, ${ruangRandom}`,
      jenis:
        jenisMasalah[
          Math.floor(Math.random() * jenisMasalah.length)
        ],
      tanggal: new Date(
        2026,
        3,
        Math.floor(Math.random() * 28) + 1
      ).toLocaleDateString("id-ID"),
      jam: `${14 + Math.floor(Math.random() * 5)}:${Math.floor(
        Math.random() * 60
      )
        .toString()
        .padStart(2, "0")}`,
      status:
        statuses[Math.floor(Math.random() * statuses.length)],
    };
  });

  //  INI DATA YANG DIPAKAI SEMUA HALAMAN
  const laporanData = dummyData; //Ubah []supaya empty state nya berjalan -- ada data dummyData
  const renderContent = () => {
    switch (activeMenu) {
      case "dashboard":
        return <DashboardView laporanData={laporanData} />;

      case "laporan":
        return <LaporanView laporanData={laporanData} />;

      case "manajemen":
        return <ManajemenView />;

      case "profile":
        return <ProfileAdminView />;

      default:
        return <DashboardView laporanData={laporanData} />;
    }
  };

  return (
    <div className="flex min-h-screen">

      {/* SIDEBAR */}
      <AdminSidebar
        activeMenu={activeMenu}
        setActiveMenu={setActiveMenu}
      />

      {/* CONTENT */}
      <div className="flex-1 flex flex-col md:ml-64">

        <div className="p-4 flex-1">
          <AdminHeader title={activeMenu} />
          {renderContent()}
        </div>

        <Footer />
      </div>
    </div>
  );
}