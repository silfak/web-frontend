import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";

import LandingPage from "@/pages/LandingPage";
import LoginPage from "@/pages/LoginPage";
import RegistPage from "@/pages/RegistPage";
import Dashboard from "@/pages/Dashboard";
import DashboardOB from "@/pages/DashboardOB";
import AdminDashboard from "@/pages/AdminDashboard";

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Public */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegistPage />} />

          {/* Protected - Mahasiswa */}
          <Route path="/dashboard/mahasiswa" element={
            <ProtectedRoute allowedRoles={["mahasiswa"]}>
              <Dashboard />
            </ProtectedRoute>
          } />

          {/* Protected - OB */}
          <Route path="/dashboard/ob" element={
            <ProtectedRoute allowedRoles={["ob"]}>
              <DashboardOB />
            </ProtectedRoute>
          } />

          {/* Protected - Admin */}
          <Route path="/dashboard/admin" element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminDashboard />
            </ProtectedRoute>
          } />

          {/* 404 */}
          <Route path="*" element={<h1 className="text-center mt-20 font-bold">Halaman Tidak Ditemukan! (404)</h1>} />

          {/* ===== DEV ONLY — Hapus sebelum production ===== */}
          <Route path="/dashboardOB" element={<DashboardOB />} />
          <Route path="/dashboardAdmin" element={<AdminDashboard />} />
          {/* ===== END DEV ONLY ===== */}
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;