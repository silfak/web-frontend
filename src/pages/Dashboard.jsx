import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "@/components/DashboardPage/Sidebar";
import Header from "@/components/DashboardPage/Header";
import Footer from "@/components/DashboardPage/Footer";
import { Send, LogOut } from "lucide-react";

// Views
import BerandaView from "@/components/DashboardPage/Views/BerandaView";
import ProfileView from "@/components/DashboardPage/Views/ProfileView";
import LaporanView from "@/components/DashboardPage/Views/LaporanView";
import DetailLaporanView from "@/components/DashboardPage/Views/DetailLaporanView";
import CreateReportModal from "@/components/DashboardPage/CreateReportModal";
import ConfirmationModal from "@/components/ConfirmationModal";
import Toast from "@/components/DashboardOBPage/Toast";

export default function Dashboard() {
  const [activeMenu, setActiveMenu] = useState("Beranda");
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // State untuk mengontrol apakah sedang melihat tabel (List) atau Detail Laporan
  const [viewState, setViewState] = useState("List"); 
  const [selectedReport, setSelectedReport] = useState(null);

  const [isConfirmLogoutOpen, setIsConfirmLogoutOpen] = useState(false);
  const [isConfirmSubmitOpen, setIsConfirmSubmitOpen] = useState(false);

  const [toast, setToast] = useState({ show: false, message: "" });

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
 
  // FUNGSI SIMULASI (Untuk dipanggil saat klik "Kirim" di Modal)
  const handleSimulateSubmit = () => {

    if (pendingReport) {
    const dummyData = [
      { tgl: "17 April 2026", lokasi: "Gedung Dewi Sartika", ruang: "Lantai 3, Ruang FIK-301", masalah: "Pemborosan AC", status: "Reported" },
      { tgl: "18 April 2026", lokasi: "Gedung Ki Hajar Dewantara", ruang: "Lantai 2, Ruang FIK-202", masalah: "Toilet Rusak", status: "Inprogress" },
      { tgl: "19 April 2026", lokasi: "Gedung Dewi Sartika", ruang: "Lantai 2, Ruang FIK-204", masalah: "Pemborosan AC", status: "Resolved" }
    ];
    setReports(dummyData); // Isi data laporan

    setReports([pendingReport, ...reports]);
    setPendingReport(null); 
  }

    setIsModalOpen(false); // Tutup modal

     // --- TOAST ---
    setToast({
      show: true,
      message: {
      title: "Laporan Berhasil Dikirim",
      desc: activeMenu === "Beranda" || activeMenu === "Laporan" 
        ? "Laporan kamu sudah masuk dan akan segera ditangani"
        : "Laporan fasilitas kamu sudah tercatat di sistem"
    }
    });
  };

  const navigate = useNavigate(); 

  // Update fungsi handleLogout
  const executeLogout = () => {
    navigate("/"); // Navigasi sebenarnya
  };

  const [pendingReport, setPendingReport] = useState(null);

  // Fungsi yang dipanggil saat klik "Kirim Laporan" di Modal
  const handleOpenConfirmation = (data) => {
    setPendingReport(data); // Simpan data dari modal
    setIsConfirmSubmitOpen(true); // Buka modal konfirmasi
  };


  return (
    <div className="flex h-screen bg-[#F9FBF9] overflow-hidden">
      <Sidebar 
        activeMenu={activeMenu} 
        setActiveMenu={changeMenu} 
        onLogoutClick={() => setIsConfirmLogoutOpen(true)} 
      />

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

            {activeMenu === "Profile" && (
              <ProfileView 
                onShowToast={(msg) => setToast({ show: true, message: msg })} 
              />
            )}
          </div>
        </div>
        <Footer />
      </div>

      <CreateReportModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onConfirmClick={handleOpenConfirmation} 
      />

      {/* --- MODAL KONFIRMASI KIRIM LAPORAN --- */}
      <ConfirmationModal 
        isOpen={isConfirmSubmitOpen}
        onClose={() => setIsConfirmSubmitOpen(false)}
        onConfirm={handleSimulateSubmit}
        title="Kirim Laporan Ini?"
        description="Pastikan semua data laporan sudah benar. Laporan yang sudah dikirim tidak dapat diubah."
        confirmText="Ya, Kirim"
        cancelText="Batal"
        icon={Send}
        variant="green"
      />

      {/* --- MODAL KONFIRMASI LOGOUT --- */}
      <ConfirmationModal 
        isOpen={isConfirmLogoutOpen}
        onClose={() => setIsConfirmLogoutOpen(false)}
        onConfirm={executeLogout}
        title="Keluar dari Sistem?"
        description="Kamu akan keluar dari sistem. Pastikan semua pekerjaanmu sudah tersimpan."
        confirmText="Ya, Keluar"
        cancelText="Batal"
        icon={LogOut}
        variant="red"
      /> 

      <Toast 
        isOpen={toast.show} 
        message={toast.message} 
        onClose={() => setToast({ show: false, message: "" })} 
      />

    </div>
  );
}