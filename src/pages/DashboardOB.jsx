import React, { useState } from "react";
import SidebarOB from "@/components/DashboardOBPage/SidebarOB";
import Header from "@/components/DashboardOBPage/Header";
import Footer from "@/components/DashboardOBPage/Footer";

// views
import BerandaOB from "@/components/DashboardOBPage/Views/BerandaOB";
import ProfileOB from "@/components/DashboardOBPage/Views/ProfileOB";
import LaporanOB from "@/components/DashboardOBPage/Views/LaporanOB";
import DetailLaporanOB from "@/components/DashboardOBPage/Views/DetailLaporanOB";
import CreateReportModal from "@/components/DashboardOBPage/CreateReportModal";

export default function DashboardOB() {
  const [activeMenu, setActiveMenu] = useState("Beranda");
  const [isModalOpen, setIsModalOpen] = useState(false);
  // State untuk mengontrol apakah sedang melihat tabel (List) atau Detail Laporan
  const [viewState, setViewState] = useState("List"); 
  const [selectedReport, setSelectedReport] = useState(null);

  // 1. STATE DATA UTAMA (Mulai dari array kosong untuk simulasi OB)
  const [reports, setReports] = useState([]); 

  // 2. FUNGSI SIMULASI (Sama seperti dashboard mahasiswa)
  const handleSimulateSubmit = () => {
    const dummyData = [
      { tgl: "17 April 2026", lokasi: "Gedung Dewi Sartika", ruang: "Lantai 3, Ruang FIK-301", masalah: "Pemborosan AC", status: "Reported" },
      { tgl: "12 April 2026", lokasi: "Gedung Ki Hajar Dewantara", ruang: "Lantai 3, Toilet", masalah: "Toilet Rusak", status: "Reported" },
      { tgl: "15 Maret 2026", lokasi: "Gedung Dewi Sartika", ruang: "Lantai 2, Ruang FIK-202", masalah: "Pemborosan AC", status: "Reported" },
    ];
    setReports(dummyData);
    setIsModalOpen(false);
  };
  
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
      <SidebarOB activeMenu={activeMenu} setActiveMenu={changeMenu} />

      <div className="flex-1 flex flex-col overflow-y-auto">
        <div className="p-10 flex-1">
          {/* Tambahkan props reports & onViewDetail agar Header tahu kondisi data */}
          <Header 
            title={activeMenu} 
            onProfileClick={() => changeMenu("Profile")} 
            onViewDetail={showDetail}
            reports={reports}
          />

          <div className="mt-4">
            {/* --- BERANDA OB --- */}
            {activeMenu === "Beranda" && (
              viewState === "List" 
                ? <BerandaOB
                    reports={reports} // --- 3. KIRIM DATA KE VIEW ---
                    onOpenModal={() => setIsModalOpen(true)} 
                    onViewDetail={showDetail} 
                  />
                : <DetailLaporanOB
                    report={selectedReport} 
                    onBack={() => setViewState("List")} 
                  />
            )}

            {/* --- LAPORAN OB --- */}
            {activeMenu === "Laporan" && (
              viewState === "List" 
                ? <LaporanOB 
                    reports={reports} // --- 3. KIRIM DATA KE VIEW ---
                    onOpenModal={() => setIsModalOpen(true)} 
                    onViewDetail={showDetail} 
                  />
                : <DetailLaporanOB 
                    report={selectedReport} 
                    onBack={() => setViewState("List")} 
                  />
            )}

            {activeMenu === "Profile" && <ProfileOB />}
          </div>
        </div>
        <Footer />
      </div>

      {/* --- 4. KIRIM FUNGSI KE MODAL --- */}
      <CreateReportModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSimulateSubmit={handleSimulateSubmit} 
      />
    </div>
  );
}