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
import CreateReportModal from "@/components/DashboardPage/CreateReportModal";
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
  onUpdateStatus: (id: string | undefined, status: ReportStatus, catatan: string, fotoBase64?: string | null) => void;
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
      onUpdateStatus={(statusBaru, catatanBaru, fotoBaru) =>
        onUpdateStatus(report.id, statusBaru, catatanBaru, fotoBaru)
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

  const { user, logout } = useAuth();
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
          const rId = item.roomId || item.room_id;
          const room = roomsList.find(r => r.id === rId);
          if (room) {
            gedungName = room.building?.name || "Gedung Dewi Sartika";
            ruangName = room.name || `Lantai ${room.floor}`;
          }
          const cId = item.categoryId || item.category_id;
          const category = categoriesList.find(c => c.id === cId);
          masalahName = category?.name || item.title || "Masalah Fasilitas";
        }
      }

      const cleanDescription = item.description?.replace(/\[Lokasi:\s*.*?\]/, "").trim() || "";
      const createdAt = item.createdAt || item.created_at;
      const fotoUrl = item.imageUrl || item.image_url;

      return {
        id: item.id,
        friendlyId: `SFK-${item.id?.substring(0, 6).toUpperCase()}`,
        tgl: createdAt
          ? new Date(createdAt).toLocaleDateString("id-ID", { day: 'numeric', month: 'long', year: 'numeric' })
          : "Baru saja",
        lokasi: gedungName,
        ruang: ruangName,
        masalah: masalahName,
        deskripsi: cleanDescription,
        status: mapBackendStatus(item.status),
        catatan: item.note || "",
        foto: fotoUrl || null,
        rawDate: createdAt ? new Date(createdAt) : new Date(0),
      };
    });
  };

  const fetchReportsData = async () => {
    try {
      const timestamp = new Date().getTime();
      const [reportsRes, roomsRes, categoriesRes] = await Promise.all([
        api.get(`/api/reports?_t=${timestamp}`),
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
    catatanBaru: string,
    fotoBase64?: string | null
  ) => {
    try {
      let res;

      if (fotoBase64) {
        const formData = new FormData();
        formData.append("status", mapFrontendStatus(statusBaru));
        formData.append("note", catatanBaru);

        const arr = fotoBase64.split(",");
        const mime = arr[0].match(/:(.*?);/)?.[1] || "image/jpeg";
        const bstr = atob(arr[1]);
        let n = bstr.length;
        const u8arr = new Uint8Array(n);
        while (n--) u8arr[n] = bstr.charCodeAt(n);
        const file = new File([u8arr], "foto.jpg", { type: mime });
        formData.append("image", file);

        res = await api.patch(`/api/reports/${idLaporan}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        res = await api.patch(`/api/reports/${idLaporan}`, {
          status: mapFrontendStatus(statusBaru),
          note: catatanBaru,
        });
      }

      if (res.data && res.data.success === false) {
        throw new Error(res.data.message || JSON.stringify(res.data));
      }

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

  const handleActualSubmit = async () => {
    if (!pendingReport) return;

    try {
      let res;

      if ((pendingReport as any).foto) {
        // ✅ Kirim pakai FormData kalau ada foto
        const formData = new FormData();
        formData.append("reporterId", user?.id || "");
        formData.append("roomId", (pendingReport as any).roomId);
        formData.append("categoryId", (pendingReport as any).categoryId || "");
        formData.append("description", (pendingReport as any).description);
        formData.append("isUrgent", String((pendingReport as any).priority === "high"));

        // Convert base64 → File object
        const base64 = (pendingReport as any).foto;
        const arr = base64.split(",");
        const mime = arr[0].match(/:(.*?);/)?.[1] || "image/jpeg";
        const bstr = atob(arr[1]);
        let n = bstr.length;
        const u8arr = new Uint8Array(n);
        while (n--) u8arr[n] = bstr.charCodeAt(n);
        const file = new File([u8arr], "foto.jpg", { type: mime });

        formData.append("image", file);

        res = await api.post("/api/reports", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        // ✅ Kirim pakai JSON kalau tidak ada foto
        res = await api.post("/api/reports", {
          reporterId: user?.id,
          roomId: (pendingReport as any).roomId,
          categoryId: (pendingReport as any).categoryId,
          description: (pendingReport as any).description,
          isUrgent: (pendingReport as any).priority === "high",
        });
      }

      if (res.data && res.data.success === false) {
        throw new Error(res.data.message || JSON.stringify(res.data));
      }

      await fetchReportsData();
      setIsModalOpen(false);
      setIsConfirmSubmitOpen(false);
      setPendingReport(null);
      setToast({
        show: true,
        message: {
          title: "Laporan Berhasil Dikirim",
          desc: "Laporan kamu sudah masuk dan akan segera ditangani",
        },
      });
    } catch (err: any) {
      console.error("Gagal mengirim laporan:", err);
      const serverMsg = err.response?.data?.message || JSON.stringify(err.response?.data) || err.message;
      alert(`Terjadi kesalahan saat mengirim laporan ke server: ${serverMsg}`);
    }
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
