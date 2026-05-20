import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, useParams, Navigate } from "react-router-dom";
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

// INTEGRASI
import api from "@/lib/axios";
import { useAuth } from "@/context/AuthContext";
import type { Report } from "@/types";

type ToastMessage = string | { title: string; desc: string } | "";

// Wrapper detail laporan mahasiswa
function DetailLaporanMahasiswaWrapper({ reports }: { reports: Report[] }) {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const navigate = useNavigate();

  const report = (location.state as any)?.report ?? reports.find((r) => String(r.id) === id);

  if (!report) return <Navigate to="/sfk" replace />;

  return (
    <DetailLaporanView 
      report={report} 
      onBack={() => navigate("/sfk")} 
    />
  );
}

export default function Dashboard() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const path = location.pathname;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmLogoutOpen, setIsConfirmLogoutOpen] = useState(false);
  const [isConfirmSubmitOpen, setIsConfirmSubmitOpen] = useState(false);
  const [toast, setToast] = useState<{ show: boolean; message: ToastMessage }>({ show: false, message: "" });
  const [reports, setReports] = useState<Report[]>([]);
  const [pendingReport, setPendingReport] = useState<any>(null);

  const mapBackendReports = (backendData: any[]): Report[] => {
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

  const fetchReportsData = async () => {
    try {
      const res = await api.get("/api/reports");
      const mappedData = mapBackendReports(res.data.data || []);
      setReports(mappedData);
    } catch (err) {
      console.error("Gagal menarik riwayat laporan dari database:", err);
    }
  };

  useEffect(() => {
    fetchReportsData();
  }, []);

  const getTitle = () => {
    if (path === "/profile") return "Profile";
    if (path.startsWith("/laporan")) return "Laporan";
    return "Beranda";
  };

  const showDetail = (report) => {
    navigate(`/laporan/${report.id}`, { state: { report } });
  };
 
  const handleActualSubmit = async () => {
    if (!pendingReport) return;

    try {
      // Simulasi menambahkan data ke state lokal seperti Dashboard OB
      const newReport = {
        id: "SFK-" + Date.now(),
        tgl: "Baru saja",
        lokasi: pendingReport.lokasiName || "Tidak Diketahui",
        ruang: pendingReport.ruangName || "Tidak Diketahui",
        masalah: pendingReport.title || "Masalah Fasilitas",
        deskripsi: pendingReport.description || "",
        status: "Reported" as const,
      };

      setReports((prev) => [newReport, ...prev]);

      setIsModalOpen(false);
      setIsConfirmSubmitOpen(false);
      setPendingReport(null);
      setToast({
        show: true,
        message: {
          title: "Laporan Berhasil Dikirim",
          desc: "Laporan kamu sudah masuk dan akan segera ditangani",
        }
      });
    } catch (err) {
      console.error("Gagal mensimulasikan pengiriman laporan:", err);
      alert("Terjadi kesalahan saat mengirim laporan.");
    }
  };

  const executeLogout = async () => {
    try {
      if (logout) await logout();
      navigate("/login");
    } catch (error) {
      console.error("Gagal logout:", error);
      navigate("/login");
    }
  };

  const handleOpenConfirmation = (data: Report) => {
    setPendingReport(data); 
    setIsConfirmSubmitOpen(true); 
  };

  const renderContent = () => {
    if (path.startsWith("/laporan/")) {
      return <DetailLaporanMahasiswaWrapper reports={reports} />;
    }
    if (path === "/laporan") {
      return (
        <LaporanView 
          reports={reports} 
          onOpenModal={() => setIsModalOpen(true)}
          onViewDetail={showDetail} 
        />
      );
    }
    if (path === "/profile") {
      return (
        <ProfileView 
          user={user} 
          onShowToast={(msg) => setToast({ show: true, message: msg })} 
        />
      );
    }
    return (
      <BerandaView 
        reports={reports} 
        onOpenModal={() => setIsModalOpen(true)} 
        onViewDetail={showDetail} 
      />
    );
  };

  return (
    <div className="flex h-screen bg-[#F9FBF9] overflow-hidden">
      <Sidebar 
        user={user}
        onLogoutClick={() => setIsConfirmLogoutOpen(true)} 
      />

      <div className="flex-1 flex flex-col overflow-y-auto">
        <div className="p-10 flex-1">
          <Header 
            title={getTitle()} 
            onProfileClick={() => navigate("/profile")} 
            onViewDetail={showDetail}
            reports={reports}
          />
          <div className="mt-4">
            {renderContent()}
          </div>
        </div>
        <Footer />
      </div>

      <CreateReportModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onConfirmClick={handleOpenConfirmation} 
      />

      <ConfirmationModal 
        isOpen={isConfirmSubmitOpen}
        onClose={() => setIsConfirmSubmitOpen(false)}
        onConfirm={handleActualSubmit}
        title="Kirim Laporan Ini?"
        description="Pastikan semua data laporan sudah benar. Laporan yang sudah dikirim tidak dapat diubah."
        confirmText="Ya, Kirim"
        cancelText="Batal"
        icon={Send}
        variant="green"
      />

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