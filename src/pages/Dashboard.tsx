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
import type { Report, ReportStatus } from "@/types";

type ToastMessage = string | { title: string; desc: string } | "";

// Wrapper detail laporan mahasiswa
function DetailLaporanMahasiswaWrapper({ reports }: { reports: Report[] }) {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const navigate = useNavigate();

  const report = (location.state as any)?.report ?? reports.find((r) => String(r.id) === id);

  if (!report) return <Navigate to="/laporan" replace />;

  return (
    <DetailLaporanView
      report={report}
      onBack={() => navigate("/laporan")}
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

  const mapBackendStatus = (status: string): ReportStatus => {
    if (status === "IN_PROGRESS") return "Inprogress";
    if (status === "RESOLVED") return "Resolved";
    return "Reported";
  };

  const mapBackendReports = (backendData: any[], roomsList: any[], categoriesList: any[]): Report[] => {
    return backendData.map((item) => {
      // Coba ekstrak lokasi & masalah asli yang dipilih user jika di-embed di deskripsi
      let gedungName = "Gedung Dewi Sartika";
      let ruangName = "Lantai 1";
      let masalahName = "Kerusakan Fasilitas";

      const locAndProblemMatch = item.description?.match(/\[Lokasi:\s*(.*?)\s*-\s*(.*?)\s*\|\s*Masalah:\s*(.*?)\]/);
      if (locAndProblemMatch) {
        gedungName = locAndProblemMatch[1];
        ruangName = locAndProblemMatch[2];
        masalahName = locAndProblemMatch[3];
      } else {
        const locMatch = item.description?.match(/\[Lokasi:\s*(.*?)\s*-\s*(.*?)\]/);
        if (locMatch) {
          gedungName = locMatch[1];
          ruangName = locMatch[2];
        } else {
          // Fallback ke pemetaan room di database
          const room = roomsList.find(r => r.id === item.roomId);
          if (room?.building?.name === "Gedung B" || room?.building?.name === "Gedung C") {
            gedungName = "Gedung Ki Hajar Dewantara";
          }
          if (room) {
            ruangName = `Lantai ${room.floor}`;
          }
        }
        const category = categoriesList.find(c => c.id === item.categoryId);
        masalahName = category?.name || item.title || "Kerusakan Fasilitas";
      }

      const cleanDescription = item.description?.replace(/\[Lokasi:\s*.*?\]/, "").trim() || "";

      return {
        id: item.id,
        tgl: item.createdAt
          ? new Date(item.createdAt).toLocaleDateString("id-ID", { day: 'numeric', month: 'long', year: 'numeric' })
          : "Baru saja",
        lokasi: gedungName,
        ruang: ruangName,
        masalah: masalahName,
        deskripsi: cleanDescription,
        status: mapBackendStatus(item.status),
      };
    });
  };

  const fetchReportsData = async () => {
    try {
      const [reportsRes, roomsRes, categoriesRes] = await Promise.all([
        api.get("/api/reports"),
        api.get("/api/rooms"),
        api.get("/api/categories")
      ]);
      const mappedData = mapBackendReports(
        reportsRes.data.data || [],
        roomsRes.data.data || [],
        categoriesRes.data.data || []
      );
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
      // Kirim data laporan ke backend dengan camelCase field sesuai spec BE
      await api.post("/api/reports", {
        roomId: pendingReport.roomId,
        reporterId: pendingReport.reporterId,
        categoryId: pendingReport.categoryId,
        description: pendingReport.description,
      });

      // Ambil data terbaru dari backend
      await fetchReportsData();

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
    } catch (err: any) {
      console.error("Gagal mengirim laporan ke backend:", err);
      if (err.response?.data) {
        console.error("Detail error dari server:", err.response.data);
        alert(`Gagal mengirim laporan: ${JSON.stringify(err.response.data.errors || err.response.data.message)}`);
      } else {
        alert("Terjadi kesalahan saat mengirim laporan.");
      }
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