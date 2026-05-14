import React, { useState} from "react";
import { useNavigate } from "react-router-dom";
import SidebarOB from "@/components/DashboardOBPage/SidebarOB";
import Header from "@/components/DashboardOBPage/Header";
import Footer from "@/components/DashboardOBPage/Footer";
import { Send, LogOut } from "lucide-react";

// views
import BerandaOB from "@/components/DashboardOBPage/Views/BerandaOB";
import ProfileOB from "@/components/DashboardOBPage/Views/ProfileOB";
import LaporanOB from "@/components/DashboardOBPage/Views/LaporanOB";
import DetailLaporanOB from "@/components/DashboardOBPage/Views/DetailLaporanOB";
import CreateReportModal from "@/components/DashboardOBPage/CreateReportModal";
import ConfirmationModal from "@/components/ConfirmationModal";
import Toast from "@/components/DashboardOBPage/Toast";

export default function DashboardOB() {
  const [activeMenu, setActiveMenu] = useState("Beranda");
  const [isModalOpen, setIsModalOpen] = useState(false);
  // State untuk mengontrol apakah sedang melihat tabel (List) atau Detail Laporan
  const [viewState, setViewState] = useState("List"); 
  const [selectedReport, setSelectedReport] = useState(null);

  const [isConfirmLogoutOpen, setIsConfirmLogoutOpen] = useState(false);
  const [isConfirmSubmitOpen, setIsConfirmSubmitOpen] = useState(false);
  
  const navigate = useNavigate(); 
  
  // Update fungsi handleLogout
  const executeLogout = () => {
      navigate("/"); // Navigasi sebenarnya
    };

  // 1. STATE DATA UTAMA (Mulai dari array kosong untuk simulasi OB)
  const [reports, setReports] = useState([]); 

  // 2. FUNGSI SIMULASI (Sama seperti dashboard mahasiswa)
  const handleSimulateSubmit = () => {

    if (pendingReport) {
    const dummyData = [
      { tgl: "17 April 2026", lokasi: "Gedung Dewi Sartika", ruang: "Lantai 3, Ruang FIK-301", masalah: "Pemborosan AC", status: "Reported" },
      { tgl: "12 April 2026", lokasi: "Gedung Ki Hajar Dewantara", ruang: "Lantai 3, Toilet", masalah: "Toilet Rusak", status: "Reported" },
      { tgl: "15 Maret 2026", lokasi: "Gedung Dewi Sartika", ruang: "Lantai 2, Ruang FIK-202", masalah: "Pemborosan AC", status: "Reported" },
    ];
    setReports(dummyData);

    setReports([pendingReport, ...reports]);
    setPendingReport(null); 
  }

    setIsModalOpen(false);

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

  const [toast, setToast] = useState({ show: false, message: "" });

  // --- FUNGSI UPDATE STATUS  ---
  const handleUpdateStatus = (idLaporan, statusBaru, catatanBaru) => {
  // 1. Update array utama agar di tabel berubah
  const updatedData = reports.map((r) => 
    r.id === idLaporan ? { ...r, status: statusBaru, catatan: catatanBaru } : r
  );
  setReports(updatedData);

  // 2. Update state report agar tampilan detail berubah
  if (selectedReport && selectedReport.id === idLaporan) {
    setSelectedReport({ ...selectedReport, status: statusBaru, catatan: catatanBaru });
  }

  // --- AKTIFKAN TOAST ---
  const statusLabel = statusBaru === "Inprogress" ? "In Progress" : statusBaru;

  setToast({
    show: true,
    message: `Status laporan berhasil diperbarui menjadi ${statusLabel}`
  });
};

  const [pendingReport, setPendingReport] = useState(null);

  // Fungsi yang dipanggil saat klik "Kirim Laporan" di Modal
  const handleOpenConfirmation = (data) => {
    setPendingReport(data); // Simpan data dari modal
    setIsConfirmSubmitOpen(true); // Buka modal konfirmasi
  };


  return (
    <div className="flex h-screen bg-[#F9FBF9] overflow-hidden">
      <SidebarOB 
        activeMenu={activeMenu} 
        setActiveMenu={changeMenu} 
        onLogoutClick={() => setIsConfirmLogoutOpen(true)} 
      />

      <div className="flex-1 flex flex-col overflow-y-auto">
        <div className="p-10 flex-1">
          {/* Tambahkan props reports & onViewDetail agar Header tahu kondisi data */}
          <Header 
            title={activeMenu} 
            onProfileClick={() => changeMenu("Profile")} 
            onViewDetail={showDetail}
            reports={reports}
          />

          {/* bagian view */}
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
                    onUpdateStatus={(statusBaru, catatanBaru) => handleUpdateStatus(selectedReport.id, statusBaru, catatanBaru)}
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
                    onUpdateStatus={(statusBaru, catatanBaru) => handleUpdateStatus(selectedReport.id, statusBaru, catatanBaru)}
                  />
            )}

            {activeMenu === "Profile" && (
              <ProfileOB 
                onShowToast={(msg) => setToast({ show: true, message: msg })} 
              />
            )}
          </div>
        </div>
        <Footer />
      </div>

      {/* --- 4. FUNGSI MODAL --- */}
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

      {/* Komponen Toast paling luar */}
      <Toast 
        isOpen={toast.show} 
        message={toast.message} 
        onClose={() => setToast({ show: false, message: "" })} 
      /> 
    </div>
  );
}