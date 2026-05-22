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
          const rId = item.roomId || item.room_id;
          const room = roomsList.find(r => r.id === rId);
          if (room) {
            gedungName = room.building?.name || "Gedung Dewi Sartika";
            ruangName = room.name || `Lantai ${room.floor}`;
          }
          const cId = item.categoryId || item.category_id;
          const category = categoriesList.find(c => c.id === cId);
          masalahName = category?.name || item.title || "Kerusakan Fasilitas";
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
      let res;

      if (pendingReport.foto) {
        // ✅ Kirim pakai FormData kalau ada foto
        const formData = new FormData();
        formData.append("reporterId", user?.id || "");
        formData.append("roomId", pendingReport.roomId);
        formData.append("categoryId", pendingReport.categoryId || "");
        formData.append("description", pendingReport.description);
        formData.append("isUrgent", String(pendingReport.priority === "high"));

        // Convert base64 → File object
        const base64 = pendingReport.foto;
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
          roomId: pendingReport.roomId,
          categoryId: pendingReport.categoryId,
          description: pendingReport.description,
          isUrgent: pendingReport.priority === "high",
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
      console.error("Gagal mengirim laporan ke backend:", err);
      const serverMsg = err.response?.data?.message || JSON.stringify(err.response?.data) || err.message;
      alert(`Terjadi kesalahan saat mengirim laporan: ${serverMsg}`);
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
