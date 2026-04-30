import React, { useState } from "react";
import SidebarOB from "@/components/DashboardOBPage/SidebarOB";
import Header from "../components/DashboardPage/Header"; // Re-use header
import Footer from "../components/DashboardPage/Footer"; // Re-use footer

// views
import BerandaOB from "@/components/DashboardOBPage/Views/BerandaOB";
import ProfileOB from "@/components/DashboardOBPage/Views/ProfileOB";
import LaporanOB from "../components/DashboardOBPage/Views/LaporanOB";
import DetailLaporanOB from "../components/DashboardOBPage/Views/DetailLaporanOB";
import CreateReportModal from "@/components/DashboardOBPage/CreateReportModal";

export default function DashboardOB() {
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

  return (
    <div className="flex h-screen bg-[#F9FBF9] overflow-hidden">
      {/* Sidebar menggunakan fungsi changeMenu */}
      <SidebarOB activeMenu={activeMenu} setActiveMenu={changeMenu} />

      <div className="flex-1 flex flex-col overflow-y-auto">
        <div className="p-10 flex-1">
          {/* Header menerima fungsi untuk pindah ke Profile */}
          <Header 
            title={activeMenu} 
            onProfileClick={() => changeMenu("Profile")} 
          />

          <div className="mt-4">
            {/* --- LOGIKA NAVIGASI BERANDA --- */}
            {activeMenu === "Beranda" && (
              viewState === "List" 
                ? <BerandaOB
                    onOpenModal={() => setIsModalOpen(true)} 
                    onViewDetail={showDetail} 
                  />
                : <DetailLaporanOB
                    report={selectedReport} 
                    onBack={() => setViewState("List")} 
                  />
            )}

            {/* --- LOGIKA NAVIGASI LAPORAN --- */}
            {activeMenu === "Laporan" && (
              viewState === "List" 
                ? <LaporanOB onViewDetail={showDetail} />
                : <DetailLaporanOB 
                    report={selectedReport} 
                    onBack={() => setViewState("List")} 
                  />
            )}

            {/* --- LOGIKA NAVIGASI PROFILE --- */}
            {activeMenu === "Profile" && <ProfileOB />}
          </div>
        </div>
        <Footer />
      </div>

      {/* Modal untuk buat laporan baru */}
      <CreateReportModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </div>
  );
}