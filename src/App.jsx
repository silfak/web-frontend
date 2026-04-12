import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// macam - macam halaman
import LandingPage from "@/pages/LandingPage";
import LoginPage from "@/pages/LoginPage";
import RegistPage from "@/pages/RegistPage";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegistPage />} />
        <Route path="*" element={<h1>Halaman Tidak Ditemukan! (404)</h1>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
