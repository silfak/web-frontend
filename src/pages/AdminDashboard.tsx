import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, useParams, Navigate } from "react-router-dom";
import AdminSidebar from "@/components/DashboardAdmin/AdminSidebar";
import AdminHeader from "@/components/DashboardAdmin/AdminHeader";
import Footer from "@/components/DashboardAdmin/Footer";
import DashboardView from "@/components/DashboardAdmin/Views/DashboardView";
import LaporanView from "@/components/DashboardAdmin/Views/LaporanView";
import DetailLaporan from "@/components/DashboardAdmin/Views/DetailLaporan";
import ManajemenView from "@/components/DashboardAdmin/Views/Manajemen/ManajemenView";
import ProfileAdminView from "@/components/DashboardAdmin/Views/ProfileAdminView";
import type { LaporanAdmin, LaporanAdminStatus } from "@/types";
import api from "@/lib/axios";

function DetailLaporanWrapper({ laporanData, onUpdate }: { laporanData: LaporanAdmin[], onUpdate: () => void }) {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const laporan: LaporanAdmin | undefined =
    (location.state as any)?.laporan ?? laporanData.find((l) => l.id === id);
  
  if (!laporan) return <Navigate to="/laporan" replace />;
  
  return <DetailLaporan laporan={laporan} onKembali={() => navigate("/laporan")} onUpdate={onUpdate} />;
}

export default function AdminDashboard() {
  const location = useLocation();
  const path = location.pathname;

  const [reports, setReports] = useState<LaporanAdmin[]>([]);

  const mapBackendStatus = (status: string): LaporanAdminStatus => {
    if (status === "IN_PROGRESS") return "inprogress";
    if (status === "RESOLVED") return "resolved";
    return "reported";
  };

  const mapBackendReports = (backendData: any[], roomsList: any[], categoriesList: any[], usersList: any[]): LaporanAdmin[] => {
    return backendData.map((item) => {
      let gedungName = "Gedung Dewi Sartika";
      let ruangName = "Lantai 1";
      let masalahName = "Masalah Fasilitas";
      
      const locAndProblemMatch = item.description?.match(/\[Lokasi:\s*(.*?)\s*-\s*(.*?)\s*\|\s*Masalah:\s*(.*?)\]/);
      if (locAndProblemMatch) {
        gedungName = locAndProblemMatch[1];
        ruangName = locAndProblemMatch[2];
        masalahName = locAndProblemMatch[3];
      } else {
        const rId = item.roomId || item.room_id;
        const room = roomsList.find((r: any) => r.id === rId);
        if (room?.building?.name) {
          gedungName = room.building.name;
        }
        if (room) {
          ruangName = room.name || `Lantai ${room.floor}`;
        }
        const cId = item.categoryId || item.category_id;
        const category = categoriesList.find((c: any) => c.id === cId);
        masalahName = category?.name || item.title || "Masalah Fasilitas";
      }

      const cleanDescription = item.description?.replace(/\[Lokasi:\s*.*?\]/, "").trim() || "";
      const repId = item.reporterId || item.reporter_id;
      const reporter = usersList.find((u: any) => u.id === repId);

      const createdTime = item.createdAt || item.created_at;
      const d = createdTime ? new Date(createdTime) : new Date();

      return {
        id: `SFK-${item.id?.substring(0, 6).toUpperCase()}`,
        originalId: item.id,
        rawDate: d,
        nama: reporter?.name || item.reporter?.name || "Anonim",
        gedung: gedungName,
        ruang: ruangName,
        jenis: masalahName,
        tanggal: d.toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" }),
        jam: d.toLocaleTimeString("id-ID", { hour: '2-digit', minute: '2-digit' }),
        status: mapBackendStatus(item.status),
        deskripsi: cleanDescription,
        foto: item.imageUrl || item.image_url || null,
        catatan: extractedCatatan || item.note || "",
        rawDescription: item.description || "",
      };
    });
  };

  const fetchReportsData = async () => {
    try {
      const [reportsRes, roomsRes, categoriesRes, usersRes] = await Promise.all([
        api.get("/api/reports"),
        api.get("/api/rooms"),
        api.get("/api/categories"),
        api.get("/api/users").catch(() => ({ data: { data: [] } }))
      ]);
      setReports(mapBackendReports(
        reportsRes.data.data || [],
        roomsRes.data.data || [],
        categoriesRes.data.data || [],
        usersRes.data.data || []
      ));
    } catch (err) {
      console.error("Gagal menarik data laporan admin:", err);
    }
  };

  useEffect(() => {
    fetchReportsData();
  }, []);

  const getTitle = (): string => {
    if (path === "/laporan" || path.startsWith("/laporan/")) return "Laporan";
    if (path === "/manajemen") return "Manajemen";
    if (path === "/profile") return "Profile";
    return "Dashboard";
  };

  const renderContent = () => {
    if (path.startsWith("/laporan/")) return <DetailLaporanWrapper laporanData={reports} onUpdate={fetchReportsData} />;
    if (path === "/laporan") return <LaporanView laporanData={reports} />;
    if (path === "/manajemen") return <ManajemenView />;
    if (path === "/profile") return <ProfileAdminView />;
    return <DashboardView laporanData={reports} />;
  };

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <div className="flex-1 flex flex-col md:ml-64">
        <div className="p-4 flex-1">
          <AdminHeader title={getTitle()} />
          {renderContent()}
        </div>
        <Footer />
      </div>
    </div>
  );
}
