import React, { useState } from "react";
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

  const path = location.pathname;

  const getTitle = (): string => {
    if (path === "/profile") return "Profile";
    if (path.startsWith("/laporan")) return "Laporan";
    return "Beranda";
  };

  const showDetail = (report: Report) => {
    navigate(`/laporan/${report.id}`, { state: { report } });
  };

  const handleUpdateStatus = (
    idLaporan: string | undefined,
    statusBaru: ReportStatus,
    catatanBaru: string
  ) => {
    setReports((prev) =>
      prev.map((r) =>
        r.id === idLaporan ? { ...r, status: statusBaru, catatan: catatanBaru } : r
      )
    );
    const statusLabel = statusBaru === "Inprogress" ? "In Progress" : statusBaru;
    setToast({
      show: true,
      message: `Status laporan berhasil diperbarui menjadi ${statusLabel}`,
    });
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
        onConfirm={() => navigate("/")}
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
