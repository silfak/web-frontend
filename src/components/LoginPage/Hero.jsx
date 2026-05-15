import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

import logo from "@/assets/LandingPage/logosilfak.png";
import UPNVJ from "@/assets/LandingPage/landingpage.png";
import { Button } from "@/components/ui/button";
import { Mail, Lock, Eye, EyeOff, DoorOpen } from "lucide-react";

const Hero = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) setErrors({ ...errors, [name]: "" });
  };

  const validateForm = () => {
    let newErrors = {};
    if (!formData.email) newErrors.email = "Email tidak boleh kosong!";
    if (!formData.password) newErrors.password = "Password tidak boleh kosong!";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    setApiError("");

    try {
      const data = await login(formData.email, formData.password);
      const role = data.user.role;

      if (role === "admin") navigate("/admin");
      else if (role === "ob") navigate("/dashboardOB");
      else navigate("/dashboardMahasiswa");

    } catch (err) {
      setApiError(err.response?.data?.message || "Email atau password salah!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative flex-1 flex items-center justify-center p-4 md:p-10 min-h-175 overflow-hidden">
      
      <div className="absolute inset-0 z-0 hidden md:block">
        <img src={UPNVJ} alt="Campus Background" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-[#107C41]/10 backdrop-blur-[1.5px]"></div>
      </div>

      <div className="absolute inset-0 z-0 md:hidden bg-gray-50">
        <div className="absolute inset-0 bg-[#107C41]/5 opacity-40"></div>
      </div>

      <div className="relative z-10 w-full max-w-140 bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-8 md:p-10 text-center border border-gray-100">
        <div className="mb-8 flex flex-col items-center">
          <img src={logo} className="h-24 mb-2" />
          <h1 className="text-2xl font-bold text-[#107C41]">SILFAK</h1>
          <p className="text-gray-500 text-sm mt-1 font-semibold leading-tight">
            Masuk ke Portal Silfak
          </p>
        </div>

        {apiError && (
          <div className="bg-red-50 border border-red-200 text-red-600 text-sm font-medium rounded-xl px-4 py-3 mb-4">
            {apiError}
          </div>
        )}

        <form className="space-y-5 text-left" onSubmit={handleSubmit}>
          <div>
            <label className="block text-xs font-bold text-gray-600 mb-1.5 uppercase tracking-wide">
              Email
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center opacity-50">
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
            {errors.email && <p className="text-red-500 text-[10px] mt-1 font-bold tracking-tight">{errors.email}</p>}
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-600 mb-1.5 uppercase tracking-wide">
              Password
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center opacity-50">
                <Lock color="#107C41" size={20} />
              </span>
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={handleChange}
                placeholder="Masukkan password!"
                className={`w-full bg-white border ${errors.password ? 'border-red-500' : 'border-gray-200'} rounded-xl py-2.5 pl-10 pr-12 text-sm focus:outline-none transition-all`}
              />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 pr-3 flex items-center">
                {showPassword ? <Eye color="#107C41" size={20} /> : <EyeOff color="#107C41" size={20} />}
              </button>
            </div>
            {errors.password && <p className="text-red-500 text-[10px] mt-1 font-bold tracking-tight">{errors.password}</p>}
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-[#107C41] hover:bg-[#0d6334] text-white font-bold py-5.5 rounded-xl flex shadow-lg transition-all active:scale-[0.98] mt-4 text-lg tracking-widest disabled:opacity-70"
          >
            {loading ? "Memuat..." : <>Login <DoorOpen color="white" size={22} className="ml-2" /></>}
          </Button>
        </form>

        <p className="mt-8 text-sm text-gray-500 font-medium">
          Belum mempunyai akun?{" "}
          <Link to="/register" className="font-bold text-blue-500 hover:text-blue-600 transition-colors">
            Sign Up
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Hero;