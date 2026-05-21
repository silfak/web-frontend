import { useAuth } from "@/context/AuthContext";
import DashboardOBPage from "@/pages/DashboardOB";
import AdminDashboardPage from "@/pages/AdminDashboard";
import MahasiswaDashboard from "@/pages/Dashboard";

/**
 * RoleDashboard — entry point tunggal untuk semua dashboard.
 * Render dashboard berdasarkan role user yang sedang login.
 * Dipakai di semua route: /dashboard, /laporan, /laporan/:id, /profile, /manajemen
 */
export default function RoleDashboard() {
  const { user } = useAuth();

  if (user?.role === "admin") return <AdminDashboardPage />;
  if (user?.role === "ob") return <DashboardOBPage />;
  return <MahasiswaDashboard />; // mahasiswa
}
