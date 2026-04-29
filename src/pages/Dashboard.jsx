import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import Sidebar from "../components/DashboardPage/Sidebar";
import Header from "../components/DashboardPage/Header";
import Footer from "@/components/DashboardPage/Footer";

// Views
import BerandaView from "../components/DashboardPage/Views/BerandaView";
import ProfileView from "../components/DashboardPage/Views/ProfileView";
import DetailLaporanView from "../components/DashboardPage/Views/DetailLaporanView";
import CreateReportModal from "../components/DashboardPage/CreateReportModal";

export default function Dashboard() {
  const [activeMenu, setActiveMenu] = useState("Beranda");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const location = useLocation();

  return (
    <div className="flex h-screen bg-[#F9FBF9] overflow-hidden">
      <Sidebar activeMenu={activeMenu} setActiveMenu={setActiveMenu} />

      <div className="flex-1 flex flex-col overflow-y-auto">
        <div className="p-10 flex-1">
          <Header title={activeMenu} onProfileClick={() => setActiveMenu("Profile")}/>

          <div className="mt-4">
            {activeMenu === "Beranda" && (
              <BerandaView 
                onViewDetail={() => setActiveMenu("Laporan")} 
                onOpenModal={() => setIsModalOpen(true)}
              />
            )}
            {activeMenu === "Profile" && <ProfileView />}
            {activeMenu === "Laporan" && (
              <DetailLaporanView onBack={() => setActiveMenu("Beranda")} />
            )}
          </div>
        </div>
        <Footer />
      </div>

      {/* Tampilkan Modal di sini */}
      <CreateReportModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </div>
  );
}