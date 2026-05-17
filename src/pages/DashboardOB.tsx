import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SidebarOB from "@/components/DashboardOBPage/SidebarOB";
import Header from "@/components/DashboardOBPage/Header";
import Footer from "@/components/DashboardOBPage/Footer";
import { Send, LogOut } from "lucide-react";
import BerandaOB from "@/components/DashboardOBPage/Views/BerandaOB";
import ProfileOB from "@/components/DashboardOBPage/Views/ProfileOB";
import LaporanOB from "@/components/DashboardOBPage/Views/LaporanOB";
import DetailLaporanOB from "@/components/DashboardOBPage/Views/DetailLaporanOB";
import CreateReportModal from "@/components/DashboardOBPage/CreateReportModal";
import ConfirmationModal from "@/components/ConfirmationModal";
import Toast from "@/components/DashboardOBPage/Toast";
import type { Report, ReportStatus } from "@/types";

type ToastMessage = string | { title: string; desc: string } | "";

export default function DashboardOB() {
  const [activeMenu, setActiveMenu] = useState("Beranda");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [viewState, setViewState] = useState("List");
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [isConfirmLogoutOpen, setIsConfirmLogoutOpen] = useState(false);
  const [isConfirmSubmitOpen, setIsConfirmSubmitOpen] = useState(false);
  const navigate = useNavigate();

  const executeLogout = () => { navigate("/"); };

  const [reports, setReports] = useState<Report[]>([]);

  const handleSimulateSubmit = () => {
    if (pendingReport) {
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

  const changeMenu = (menu: string) => {
    setActiveMenu(menu);
    setViewState("List");
  };

  const showDetail = (report: Report) => {
    setSelectedReport(report);
    setViewState("Detail");
  };

  const [toast, setToast] = useState<{ show: boolean; message: ToastMessage }>({ show: false, message: "" });

  const handleUpdateStatus = (idLaporan: string | undefined, statusBaru: ReportStatus, catatanBaru: string) => {
    const updatedData = reports.map((r) =>
      r.id === idLaporan ? { ...r, status: statusBaru, catatan: catatanBaru } : r
    );
    setReports(updatedData);
    if (selectedReport && selectedReport.id === idLaporan) {
      setSelectedReport({ ...selectedReport, status: statusBaru, catatan: catatanBaru });
    }
    const statusLabel = statusBaru === "Inprogress" ? "In Progress" : statusBaru;
    setToast({ show: true, message: `Status laporan berhasil diperbarui menjadi ${statusLabel}` });
  };

  const [pendingReport, setPendingReport] = useState<Report | null>(null);

  const handleOpenConfirmation = (data: Report) => {
    setPendingReport(data);
    setIsConfirmSubmitOpen(true);
  };

  return (
    <div className="flex h-screen bg-[#F9FBF9] overflow-hidden">
      <SidebarOB activeMenu={activeMenu} setActiveMenu={changeMenu} onLogoutClick={() => setIsConfirmLogoutOpen(true)} />

      <div className="flex-1 flex flex-col overflow-y-auto">
        <div className="p-10 flex-1">
          <Header title={activeMenu} onProfileClick={() => changeMenu("Profile")} onViewDetail={showDetail} reports={reports} />

          <div className="mt-4">
            {activeMenu === "Beranda" && (
              viewState === "List"
                ? <BerandaOB reports={reports} onOpenModal={() => setIsModalOpen(true)} onViewDetail={showDetail} />
                : <DetailLaporanOB
                    report={selectedReport!}
                    onBack={() => setViewState("List")}
                    onUpdateStatus={(statusBaru, catatanBaru) => handleUpdateStatus(selectedReport?.id, statusBaru, catatanBaru)}
                  />
            )}
            {activeMenu === "Laporan" && (
              viewState === "List"
                ? <LaporanOB reports={reports} onOpenModal={() => setIsModalOpen(true)} onViewDetail={showDetail} />
                : <DetailLaporanOB
                    report={selectedReport!}
                    onBack={() => setViewState("List")}
                    onUpdateStatus={(statusBaru, catatanBaru) => handleUpdateStatus(selectedReport?.id, statusBaru, catatanBaru)}
                  />
            )}
            {activeMenu === "Profile" && (
              <ProfileOB onShowToast={(msg) => setToast({ show: true, message: msg })} />
            )}
          </div>
        </div>
        <Footer />
      </div>

      <CreateReportModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onConfirmClick={handleOpenConfirmation} />

      <ConfirmationModal
        isOpen={isConfirmSubmitOpen} onClose={() => setIsConfirmSubmitOpen(false)} onConfirm={handleSimulateSubmit}
        title="Kirim Laporan Ini?" description="Pastikan semua data laporan sudah benar. Laporan yang sudah dikirim tidak dapat diubah."
        confirmText="Ya, Kirim" cancelText="Batal" icon={Send} variant="green"
      />

      <ConfirmationModal
        isOpen={isConfirmLogoutOpen} onClose={() => setIsConfirmLogoutOpen(false)} onConfirm={executeLogout}
        title="Keluar dari Sistem?" description="Kamu akan keluar dari sistem. Pastikan semua pekerjaanmu sudah tersimpan."
        confirmText="Ya, Keluar" cancelText="Batal" icon={LogOut} variant="red"
      />

      <Toast isOpen={toast.show} message={toast.message} onClose={() => setToast({ show: false, message: "" })} />
    </div>
  );
}
