import React, { useState } from "react";
import { Link } from "react-router-dom";

import logo from "@/assets/LandingPage/logosilfak.png"
import { Button } from "@/components/ui/button"
import { Mail } from "lucide-react";
import { Lock } from "lucide-react";
import { Eye } from "lucide-react";
import { EyeOff } from "lucide-react";
import { DoorOpen } from "lucide-react";

const Hero = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <section className="relative flex-1 flex items-center justify-center p-4 md:p-8 min-h-150">
      {/* Background Overlay */}
      <div className="absolute inset-0 z-0 bg-gray-50">
        <div className="absolute inset-0 bg-[#107C41]/5 opacity-40"></div>
      </div>

      {/* Login Card */}
      <div className="relative z-10 w-full max-w-140 bg-white rounded-3xl shadow-2xl p-8 md:p-10 text-center border border-gray-100">
        <div className="mb-6 flex flex-col items-center">
          <img src={logo} className="h-30"/>
          <h1 className="text-2xl font-bold text-[#107C41]">SILFAK</h1>
          <p className="text-gray-500 text-sm mt-1 font-medium">Masuk ke Portal Silfak</p>
        </div>

        <form className="space-y-5 text-left" onSubmit={(e) => e.preventDefault()}>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Email</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-2.5 flex items-center">
                <Mail color="#107C41" size={20} />
              </span>

              <input
                type="email"
                placeholder="Masukkan email!"
                className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#107C41]/20 focus:border-[#107C41] transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Password</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-2.5 flex items-center">
                <Lock color="#107C41" size={20} />
              </span>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Masukkan password!"
                className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2.5 pl-10 pr-12 text-sm focus:outline-none focus:ring-2 focus:ring-[#107C41]/20 focus:border-[#107C41] transition-all"
              />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-[10px] font-bold text-gray-400 hover:text-[#107C41]"
              >
                {showPassword ? <Eye color="#107C41" size={20} /> : <EyeOff color="#107C41" size={20} /> }
              </button>
            </div>
          </div>

          <Link to="/">
            <Button className="w-full bg-[#107C41] hover:bg-[#0d6334] text-white font-bold py-5.5 rounded-xl flex shadow-lg shadow-gray-200 transition-all active:scale-[0.98] mt-2"> 
                Login <span>
                  <DoorOpen color="white" size={24} />
                  </span>
            </Button>
          </Link>
        </form>

        <p className="mt-8 text-sm text-gray-500">
          Belum mempunyai akun? <Link to="/register" className="no-underline!">
            <Button variant="ghost" className="p-0 h-auto font-bold text-blue-500 hover:bg-transparent hover:text-blue-600">
                Sign Up
            </Button>
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Hero;