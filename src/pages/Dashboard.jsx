import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "@/components/DashboardPage/sidebar";
import Header from "@/components/DashboardPage/header";
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

// 1. INTEGRASI
import api from "@/lib/axios";
import { useAuth } from "@/context/AuthContext";

export default function Dashboard() {
  // 2. INTEGRATION
  const { user, logout } = useAuth();

  const [activeMenu, setActiveMenu] = useState("Beranda");
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // State untuk mengontrol apakah sedang melihat tabel (List) atau Detail Laporan
  const [viewState, setViewState] = useState("List"); 
  const [selectedReport, setSelectedReport] = useState(null);

  const [isConfirmLogoutOpen, setIsConfirmLogoutOpen] = useState(false);
  const [isConfirmSubmitOpen, setIsConfirmSubmitOpen] = useState(false);

  const [toast, setToast] = useState({ show: false, message: "" });
  const [reports, setReports] = useState([]);
  const [pendingReport, setPendingReport] = useState(null);

  const navigate = useNavigate();

  // --- DATA MAPPING ---
  const mapBackendReports = (backendData) => {
    return backendData.map((item) => ({
      id: item.id,
      tgl: item.created_at 
        ? new Date(item.created_at).toLocaleDateString("id-ID", { day: 'numeric', month: 'long', year: 'numeric' }) 
        : "Baru saja",
      lokasi: item.room?.building?.name || "Tidak Diketahui",
      ruang: item.room ? `${item.room.name} (Lantai ${item.room.floor})` : "Tidak Diketahui",
      masalah: item.category?.name || item.title || "Masalah Fasilitas",
      deskripsi: item.description || "",
      status: item.status || "Reported",
    }));
  };

  // 3. INTEGRASI: Fetch data riwayat laporan asli dari server saat halaman dimuat
  const fetchReportsData = async () => {
    try {
      const res = await api.get("/api/reports");
      // Kirim data mentah BE ke fungsi mapper sebelum disimpan ke state
      const mappedData = mapBackendReports(res.data.data || []);
      setReports(mappedData);
    } catch (err) {
      console.error("Gagal menarik riwayat laporan dari database:", err);
    }
  };

  useEffect(() => {
    fetchReportsData();
  }, []);

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
 
  // 4. INTEGRASI: Eksekusi Kirim Data Riil ke POST /api/reports Backend
  const handleActualSubmit = async () => {
    if (!pendingReport) return;

    try {
      // Ambil kerangka payload murni yang diminta oleh dokumentasi Postman BE
      const payload = {
        room_id: pendingReport.room_id,
        title: pendingReport.title,
        description: pendingReport.description,
        priority: pendingReport.priority,
        reporter_id: pendingReport.reporter_id
      };

      // Tembak data ke database
      await api.post("/api/reports", payload);

      // Tarik ulang data terbaru dari server agar tabel riwayat langsung ter-update otomatis
      await fetchReportsData();

      // Reset State & Tutup Modal
      setIsConfirmSubmitOpen(false);
      setPendingReport(null);

      setToast({
        show: true,
        message: {
          title: "Laporan Berhasil Dikirim",
          desc: "Laporan fasilitas kamu sudah tercatat di sistem database kampus."
        }
      });
    } catch (err) {
      console.error("Gagal mengirim laporan baru ke backend:", err);
      alert("Terjadi kesalahan jaringan saat mengirim laporan.");
    }
  };

  // 5. INTEGRASI: Sinkronisasi fungsi logout database
  const executeLogout = async () => {
    try {
      if (logout) await logout();
      navigate("/login");
    } catch (error) {
      console.error("Gagal logout:", error);
      navigate("/login");
    }
  };

  // Fungsi yang dipanggil saat klik "Kirim Laporan" di Modal
  const handleOpenConfirmation = (data) => {
    setPendingReport(data); 
    setIsModalOpen(false); // Tutup modal utama pelaporan
    setIsConfirmSubmitOpen(true); 
  };


  return (
    <div className="flex h-screen bg-[#F9FBF9] overflow-hidden">
      {/* 6. INTEGRASI: Salurkan data user riil ke Sidebar */}
      <Sidebar 
        user={user}
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
                    reports={reports} 
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
                    reports={reports} 
                    onOpenModal={() => setIsModalOpen(true)}
                    onViewDetail={showDetail} 
                  />
                : <DetailLaporanView 
                    report={selectedReport} 
                    onBack={() => setViewState("List")} 
                  />
            )}

            {/* --- PROFILE --- */}
            {activeMenu === "Profile" && (
              <ProfileView 
                user={user} // 7. INTEGRASI: Salurkan data user riil ke ProfileView
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
        onConfirm={handleActualSubmit} // Ganti fungsi simulasi dengan fungsi riil database
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