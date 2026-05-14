import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// macam - macam halaman
import LandingPage from "@/pages/LandingPage";
import LoginPage from "@/pages/LoginPage";
import RegistPage from "@/pages/RegistPage";

import Dashboard from "./pages/Dashboard";
import DashboardOB from "@/pages/DashboardOB";
import AdminDashboard from "@/pages/AdminDashboard";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegistPage />} />

        <Route path="/dashboardMahasiswa" element={<Dashboard />} />
        <Route path="/dashboardOB" element={<DashboardOB />} />
        <Route path="/admin" element={<AdminDashboard />} />

        {/* error 404 */}
        <Route path="*" element={<h1 className="text-center mt-20 font-bold">Halaman Tidak Ditemukan! (404)</h1>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
