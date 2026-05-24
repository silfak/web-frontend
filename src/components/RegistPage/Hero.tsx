import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/useToast";
import Toast from "@/components/Toast";
import { register as registerService } from "@/services/authService";

import UPNVJ from "@/assets/LandingPage/landingpage.png";
import { Button } from "@/components/ui/button";
import logo from "@/assets/LandingPage/logosilfak.png";
import { Eye, EyeOff, Mail, Lock, User, Hash } from "lucide-react";

const Hero = () => {
  const navigate = useNavigate();
  const { toasts, showToast, removeToast } = useToast();
  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    nim: "",
    password: "",
    passwordConfirmation: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) setErrors({ ...errors, [name]: "" });
  };

  const validateForm = () => {
    let newErrors: Record<string, string> = {};
    if (!formData.name) newErrors.name = "Nama tidak boleh kosong!";
    if (!formData.email) {
      newErrors.email = "Email tidak boleh kosong!";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Format email salah!";
    }
    if (!formData.nim) newErrors.nim = "NIM tidak boleh kosong!";
    if (!formData.password) {
      newErrors.password = "Password tidak boleh kosong!";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password minimal 8 karakter!";
    }
    if (formData.passwordConfirmation !== formData.password) {
      newErrors.passwordConfirmation = "Password tidak cocok!";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    setApiError("");

    try {
      await registerService(formData);
      showToast("Registrasi berhasil! Silakan login.", "success");
      setTimeout(() => navigate("/login"), 1500);
    } catch (err: any) {
      setApiError(err.response?.data?.message || "Registrasi gagal, coba lagi!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Toast toasts={toasts} removeToast={removeToast} />
      <section className="relative flex-1 flex items-center justify-center p-4 md:p-10 min-h-175">

        <div className="absolute inset-0 z-0 hidden md:block">
          <img src={UPNVJ} alt="Campus Background" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-[#107C41]/10 backdrop-blur-[1.5px]"></div>
        </div>

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

          {apiError && (
            <div className="bg-red-50 border border-red-200 text-red-600 text-sm font-medium rounded-xl px-4 py-3 mb-4">
              {apiError}
            </div>
          )}

          <form className="space-y-4 text-left" onSubmit={handleSubmit}>

            {/* Nama */}
            <div>
              <label className="block text-xs font-bold text-gray-600 mb-1.5 uppercase tracking-wide">Nama</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center opacity-50">
                  <User color="#107C41" size={22} />
                </span>
                <input
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Masukkan nama lengkap!"
                  className={`w-full bg-white border ${errors.name ? 'border-red-500' : 'border-gray-200'} rounded-xl py-2.5 pl-10 pr-4 text-sm focus:outline-none transition-all`}
                />
              </div>
              {errors.name && <p className="text-red-500 text-[10px] mt-1 font-bold">{errors.name}</p>}
            </div>

            {/* Email */}
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

            {/* NIM */}
            <div>
              <label className="block text-xs font-bold text-gray-600 mb-1.5 uppercase tracking-wide">NIM</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center opacity-50">
                  <Hash color="#107C41" size={20} />
                </span>
                <input
                  name="nim"
                  type="text"
                  value={formData.nim}
                  onChange={handleChange}
                  placeholder="Masukkan NIM!"
                  className={`w-full bg-white border ${errors.nim ? 'border-red-500' : 'border-gray-200'} rounded-xl py-2.5 pl-10 pr-4 text-sm focus:outline-none transition-all`}
                />
              </div>
              {errors.nim && <p className="text-red-500 text-[10px] mt-1 font-bold">{errors.nim}</p>}
            </div>

            {/* Password */}
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

            {/* Confirm Password */}
            <div>
              <label className="block text-xs font-bold text-gray-600 mb-1.5 uppercase tracking-wide">Confirm Password</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center opacity-50">
                  <Lock color="#107C41" size={20} />
                </span>
                <input
                  name="passwordConfirmation"
                  type={showConfirmPass ? "text" : "password"}
                  value={formData.passwordConfirmation}
                  onChange={handleChange}
                  placeholder="Cocokkan password!"
                  className={`w-full bg-white border ${errors.passwordConfirmation ? 'border-red-500' : 'border-gray-200'} rounded-xl py-2.5 pl-10 pr-12 text-sm focus:outline-none transition-all`}
                />
                <button type="button" onClick={() => setShowConfirmPass(!showConfirmPass)} className="absolute inset-y-0 right-0 pr-3 flex items-center">
                  {showConfirmPass ? <Eye color="#107C41" size={20} /> : <EyeOff color="#107C41" size={20} />}
                </button>
              </div>
              {errors.passwordConfirmation && <p className="text-red-500 text-[10px] mt-1 font-bold">{errors.passwordConfirmation}</p>}
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-[#107C41] hover:bg-[#0d6334] text-white font-bold py-5.5 rounded-xl shadow-lg transition-all active:scale-[0.98] mt-4 tracking-widest text-lg disabled:opacity-70"
            >
              {loading ? "Memuat..." : "Register"}
            </Button>
          </form>

          <p className="mt-6 text-sm text-gray-500 font-medium">
            Sudah mempunyai akun? <Link to="/login" className="font-bold text-blue-500 hover:text-blue-600">Login</Link>
          </p>
        </div>
      </section>
    </>
  );
};

export default Hero;