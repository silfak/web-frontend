import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, useParams, Navigate } from "react-router-dom";
import { Send, LogOut } from "lucide-react";
import SidebarOB from "@/components/DashboardOBPage/SidebarOB";
import Header from "@/components/DashboardOBPage/Header";
import Footer from "@/components/DashboardOBPage/Footer";
import BerandaOB from "@/components/DashboardOBPage/Views/BerandaOB";
import ProfileOB from "@/components/DashboardOBPage/Views/ProfileOB";
import LaporanOB from "@/components/DashboardOBPage/Views/LaporanOB";
import DetailLaporanOB from "@/components/DashboardOBPage/Views/DetailLaporanOB";
import CreateReportModal from "@/components/DashboardOBPage/CreateReportModal";
import ConfirmationModal from "@/components/ConfirmationModal";
import Toast from "@/components/DashboardOBPage/Toast";
import type { Report, ReportStatus } from "@/types";
import api from "@/lib/axios";
import { useAuth } from "@/context/AuthContext";

type ToastMessage = string | { title: string; desc: string } | "";

function DetailLaporanOBWrapper({
  reports,
  onUpdateStatus,
}: {
  reports: Report[];
  onUpdateStatus: (id: string | undefined, status: ReportStatus, catatan: string) => void;
}) {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const navigate = useNavigate();

  const report: Report | undefined =
    (location.state as any)?.report ?? reports.find((r) => r.id === id);

  if (!report) return <Navigate to="/laporan" replace />;

  return (
    <DetailLaporanOB
      report={report}
      onBack={() => navigate("/laporan")}
      onUpdateStatus={(statusBaru, catatanBaru) =>
        onUpdateStatus(report.id, statusBaru, catatanBaru)
      }
    />
  );
}

export default function DashboardOB() {
  const navigate = useNavigate();
  const location = useLocation();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmLogoutOpen, setIsConfirmLogoutOpen] = useState(false);
  const [isConfirmSubmitOpen, setIsConfirmSubmitOpen] = useState(false);
  const [pendingReport, setPendingReport] = useState<Report | null>(null);
  const [reports, setReports] = useState<Report[]>([]);
  const [toast, setToast] = useState<{ show: boolean; message: ToastMessage }>({
    show: false,
    message: "",
  });

  const { logout } = useAuth();
  const path = location.pathname;

  const mapBackendStatus = (status: string): ReportStatus => {
    if (status === "IN_PROGRESS") return "Inprogress";
    if (status === "RESOLVED") return "Resolved";
    return "Reported";
  };

  const mapFrontendStatus = (status: ReportStatus): string => {
    if (status === "Inprogress") return "IN_PROGRESS";
    if (status === "Resolved") return "RESOLVED";
    return "REPORTED";
  };

  const mapBackendReports = (backendData: any[], roomsList: any[], categoriesList: any[]): Report[] => {
    return backendData.map((item) => {
      // Coba ekstrak lokasi & masalah asli yang dipilih user jika di-embed di deskripsi
      let gedungName = "Gedung Dewi Sartika";
      let ruangName = "Lantai 1";
      let masalahName = "Masalah Fasilitas";
      
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
        masalahName = category?.name || item.title || "Masalah Fasilitas";
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
        catatan: item.note || "",
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
      setReports(mapBackendReports(
        reportsRes.data.data || [],
        roomsRes.data.data || [],
        categoriesRes.data.data || []
      ));
    } catch (err) {
      console.error("Gagal menarik data laporan:", err);
    }
  };

  useEffect(() => {
    fetchReportsData();
  }, []);

  const executeLogout = async () => {
    try {
      if (logout) await logout();
      navigate("/login");
    } catch (err) {
      console.error("Gagal logout:", err);
      navigate("/login");
    }
  };

  const getTitle = (): string => {
    if (path === "/profile") return "Profile";
    if (path.startsWith("/laporan")) return "Laporan";
    return "Beranda";
  };

  const showDetail = (report: Report) => {
    navigate(`/laporan/${report.id}`, { state: { report } });
  };

  const handleUpdateStatus = async (
    idLaporan: string | undefined,
    statusBaru: ReportStatus,
    catatanBaru: string
  ) => {
    try {
      await api.patch(`/api/reports/${idLaporan}`, {
        status: mapFrontendStatus(statusBaru),
        note: catatanBaru,
      });

      await fetchReportsData();

      const statusLabel = statusBaru === "Inprogress" ? "In Progress" : statusBaru;
      setToast({
        show: true,
        message: `Status laporan berhasil diperbarui menjadi ${statusLabel}`,
      });
    } catch (err) {
      console.error("Gagal memperbarui status laporan:", err);
      alert("Gagal memperbarui status laporan.");
    }
  };

  const handleOpenConfirmation = (data: Report) => {
    setPendingReport(data);
    setIsConfirmSubmitOpen(true);
  };

  const handleSimulateSubmit = () => {
    if (pendingReport) {
      setReports((prev) => [pendingReport, ...prev]);
      setPendingReport(null);
    }
    setIsModalOpen(false);
    setToast({
      show: true,
      message: {
        title: "Laporan Berhasil Dikirim",
        desc: "Laporan kamu sudah masuk dan akan segera ditangani",
      },
    });
  };

  const renderContent = () => {
    if (path.startsWith("/laporan/")) {
      return (
        <DetailLaporanOBWrapper
          reports={reports}
          onUpdateStatus={handleUpdateStatus}
        />
      );
    }
    if (path === "/laporan") {
      return (
        <LaporanOB
          reports={reports}
          onOpenModal={() => setIsModalOpen(true)}
          onViewDetail={showDetail}
        />
      );
    }
    if (path === "/profile") {
      return (
        <ProfileOB
          onShowToast={(msg) => setToast({ show: true, message: msg })}
        />
      );
    }
    return (
      <BerandaOB
        reports={reports}
        onOpenModal={() => setIsModalOpen(true)}
        onViewDetail={showDetail}
      />
    );
  };

  return (
    <div className="flex h-screen bg-[#F9FBF9] overflow-hidden">
      <SidebarOB onLogoutClick={() => setIsConfirmLogoutOpen(true)} />

      <div className="flex-1 flex flex-col overflow-y-auto">
        <div className="p-10 flex-1">
          <Header
            title={getTitle()}
            onProfileClick={() => navigate("/profile")}
            onViewDetail={showDetail}
            reports={reports}
          />
          <div className="mt-4">{renderContent()}</div>
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
        onConfirm={handleSimulateSubmit}
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
