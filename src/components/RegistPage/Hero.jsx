import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";

import UPNVJ from "@/assets/LandingPage/landingpage.png";
import { Button } from "@/components/ui/button";
import logo from "@/assets/LandingPage/logosilfak.png";
import { Eye, EyeOff, Mail, Lock, User } from "lucide-react";

const Hero = () => {
  const navigate = useNavigate();
  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);

  // State untuk data input
  const [formData, setFormData] = useState({
    nama: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // State untuk menyimpan pesan error
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Hapus error saat user mulai mengetik lagi
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const validateForm = () => {
    let newErrors = {};
    if (!formData.nama) newErrors.nama = "Nama tidak boleh kosong!";
    if (!formData.email) {
      newErrors.email = "Email tidak boleh kosong!";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Format email salah!";
    }
    if (!formData.password) {
      newErrors.password = "Password tidak boleh kosong!";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password minimal 6 karakter!";
    }
    if (formData.confirmPassword !== formData.password) {
      newErrors.confirmPassword = "Password tidak cocok!";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Registrasi Berhasil", formData);
      navigate("/login"); // Pindah ke login jika berhasil
    }
  };

  return (
    <section className="relative flex-1 flex items-center justify-center p-4 md:p-10 min-h-175">

      {/* Background - MUNCUL DI DESKTOP */}
      <div className="absolute inset-0 z-0 hidden md:block">
        <img 
          src={UPNVJ} 
          alt="Campus Background" 
          className="w-full h-full object-cover"
        />
        {/* Overlay hijau */}
        <div className="absolute inset-0 bg-[#107C41]/10 backdrop-blur-[1.5px]"></div>
      </div>

      {/* Background Solid - MUNCUL DI MOBILE */}
      <div className="absolute inset-0 z-0 md:hidden bg-gray-50">
        <div className="absolute inset-0 bg-[#107C41]/5 opacity-40"></div>
      </div>

      <div className="relative z-10 w-full max-w-140 bg-white rounded-3xl shadow-2xl p-8 md:p-10 text-center border border-gray-100">
        <div className="mb-6 flex flex-col items-center">
          <img src={logo} className="h-30" />
          <h1 className="text-2xl font-bold text-[#107C41]">SILFAK</h1>
          <p className="text-gray-600 text-sm mt-1 font-semibold leading-tight">
            Membangun Kampus Lestari Bersama.
          </p>
        </div>

        <form className="space-y-4 text-left" onSubmit={handleSubmit}>
          {/* Input Nama */}
          <div>
            <label className="block text-xs font-bold text-gray-600 mb-1.5 uppercase tracking-wide">Nama</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center opacity-50">
                <User color="#107C41" size={22} />
              </span>
              <input
                name="nama"
                type="text"
                value={formData.nama}
                onChange={handleChange}
                placeholder="Masukkan nama lengkap!"
                className={`w-full bg-white border ${errors.nama ? 'border-red-500' : 'border-gray-200'} rounded-xl py-2.5 pl-10 pr-4 text-sm focus:outline-none transition-all`}
              />
            </div>
            {errors.nama && <p className="text-red-500 text-[10px] mt-1 font-bold">{errors.nama}</p>}
          </div>

          {/* Input Email */}
          <div>
            <label className="block text-xs font-bold text-gray-600 mb-1.5 uppercase tracking-wide">Email</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center opacity-50">
                <Mail color="#107C41" size={20} />
              </span>
              <input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Masukkan email!"
                className={`w-full bg-white border ${errors.email ? 'border-red-500' : 'border-gray-200'} rounded-xl py-2.5 pl-10 pr-4 text-sm focus:outline-none transition-all`}
              />
            </div>
            {errors.email && <p className="text-red-500 text-[10px] mt-1 font-bold">{errors.email}</p>}
          </div>

          {/* Input Password */}
          <div>
            <label className="block text-xs font-bold text-gray-600 mb-1.5 uppercase tracking-wide">Password</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center opacity-50">
                <Lock color="#107C41" size={20} />
              </span>
              <input
                name="password"
                type={showPass ? "text" : "password"}
                value={formData.password}
                onChange={handleChange}
                placeholder="Masukan password!"
                className={`w-full bg-white border ${errors.password ? 'border-red-500' : 'border-gray-200'} rounded-xl py-2.5 pl-10 pr-12 text-sm focus:outline-none transition-all`}
              />
              <button type="button" onClick={() => setShowPass(!showPass)} className="absolute inset-y-0 right-0 pr-3 flex items-center">
                {showPass ? <Eye color="#107C41" size={20} /> : <EyeOff color="#107C41" size={20} />}
              </button>
            </div>
            {errors.password && <p className="text-red-500 text-[10px] mt-1 font-bold">{errors.password}</p>}
          </div>

          {/* Input Confirm Password */}
          <div>
            <label className="block text-xs font-bold text-gray-600 mb-1.5 uppercase tracking-wide">Confirm Password</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center opacity-50">
                <Lock color="#107C41" size={20} />
              </span>
              <input
                name="confirmPassword"
                type={showConfirmPass ? "text" : "password"}
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Cocokkan password!"
                className={`w-full bg-white border ${errors.confirmPassword ? 'border-red-500' : 'border-gray-200'} rounded-xl py-2.5 pl-10 pr-12 text-sm focus:outline-none transition-all`}
              />
              <button type="button" onClick={() => setShowConfirmPass(!showConfirmPass)} className="absolute inset-y-0 right-0 pr-3 flex items-center">
                {showConfirmPass ? <Eye color="#107C41" size={20} /> : <EyeOff color="#107C41" size={20} />}
              </button>
            </div>
            {errors.confirmPassword && <p className="text-red-500 text-[10px] mt-1 font-bold">{errors.confirmPassword}</p>}
          </div>

          <Button type="submit" className="w-full bg-[#107C41] hover:bg-[#0d6334] text-white font-bold py-5.5 rounded-xl shadow-lg transition-all active:scale-[0.98] mt-4 tracking-widest text-lg">
            Register
          </Button>
        </form>

        <p className="mt-6 text-sm text-gray-500 font-medium">
          Sudah mempunyai akun? <Link to="/login" className="font-bold text-blue-500 hover:text-blue-600">Login</Link>
        </p>
      </div>
    </section>
  );
};

export default Hero;
