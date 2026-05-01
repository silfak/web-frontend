import React, { useState } from "react";
import Sidebar from "@/components/DashboardPage/Sidebar";
import Header from "@/components/DashboardPage/Header";
import Footer from "@/components/DashboardPage/Footer";

// Views
import BerandaView from "@/components/DashboardPage/Views/BerandaView";
import ProfileView from "@/components/DashboardPage/Views/ProfileView";
import LaporanView from "@/components/DashboardPage/Views/LaporanView";
import DetailLaporanView from "@/components/DashboardPage/Views/DetailLaporanView";
import CreateReportModal from "@/components/DashboardPage/CreateReportModal";

export default function Dashboard() {
  const [activeMenu, setActiveMenu] = useState("Beranda");
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // State untuk mengontrol apakah sedang melihat tabel (List) atau Detail Laporan
  const [viewState, setViewState] = useState("List"); 
  const [selectedReport, setSelectedReport] = useState(null);

  // Fungsi untuk pindah menu dari Sidebar
  const changeMenu = (menu) => {
    setActiveMenu(menu);
    setViewState("List"); // Setiap pindah menu, balikkan ke tampilan List
  };

  // Fungsi untuk melihat detail dari tabel
  const showDetail = (report) => {
    setSelectedReport(report);
    setViewState("Detail");
  };

  const [reports, setReports] = useState([]);

  // 2. FUNGSI SIMULASI (Untuk dipanggil saat klik "Kirim" di Modal)
  const handleSimulateSubmit = () => {
    const dummyData = [
      { tgl: "17 April 2026", lokasi: "Gedung Dewi Sartika", ruang: "Lantai 3, Ruang FIK-301", masalah: "Pemborosan AC", status: "Reported" },
      { tgl: "18 April 2026", lokasi: "Gedung Ki Hajar Dewantara", ruang: "Lantai 2, Ruang FIK-202", masalah: "Toilet Rusak", status: "Inprogress" },
      { tgl: "19 April 2026", lokasi: "Gedung Dewi Sartika", ruang: "Lantai 2, Ruang FIK-204", masalah: "Pemborosan AC", status: "Resolved" }
    ];
    setReports(dummyData); // Isi data laporan
    setIsModalOpen(false); // Tutup modal
  };

return (
    <div className="flex h-screen bg-[#F9FBF9] overflow-hidden">
      <Sidebar activeMenu={activeMenu} setActiveMenu={changeMenu} />

      <div className="flex-1 flex flex-col overflow-y-auto">
        <div className="p-10 flex-1">
          <Header 
            title={activeMenu} 
            onProfileClick={() => changeMenu("Profile")} 
            onViewDetail={showDetail}
            reports={reports}
          />

          <div className="mt-4">
            {/* --- BERANDA --- */}
            {activeMenu === "Beranda" && (
              viewState === "List" 
                ? <BerandaView 
                    reports={reports} // Kirim data ke Beranda
                    onOpenModal={() => setIsModalOpen(true)} 
                    onViewDetail={showDetail} 
                  />
                : <DetailLaporanView 
                    report={selectedReport} 
                    onBack={() => setViewState("List")} 
                  />
            )}

            {/* --- LAPORAN --- */}
            {activeMenu === "Laporan" && (
              viewState === "List" 
                ? <LaporanView 
                    reports={reports} // Kirim data ke Laporan
                    onOpenModal={() => setIsModalOpen(true)}
                    onViewDetail={showDetail} 
                  />
                : <DetailLaporanView 
                    report={selectedReport} 
                    onBack={() => setViewState("List")} 
                  />
            )}

            {activeMenu === "Profile" && <ProfileView />}
          </div>
        </div>
        <Footer />
      </div>

      <CreateReportModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSimulateSubmit={handleSimulateSubmit} // Kirim fungsi simulasi ke modal
      />
    </div>
  );
}