import React, { useState } from "react";

const Hero = () => {
  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);

  return (
    <section className="relative flex-1 flex items-center justify-center p-4 md:p-10 min-h-175">
      {/* Background Overlay */}
      <div className="absolute inset-0 z-0 bg-gray-50">
        <div className="absolute inset-0 bg-[#107C41]/5 opacity-40"></div>
      </div>

      {/* Register Card */}
      <div className="relative z-10 w-full max-w-175 bg-white rounded-3xl shadow-2xl p-8 md:p-10 text-center border border-gray-100">
        
        {/* Header Card */}
        <div className="mb-6 flex flex-col items-center">
          <div className="w-14 h-14 bg-gray-50 rounded-full flex items-center justify-center mb-3 border border-gray-100 text-2xl">
            🌱
          </div>
          <h1 className="text-2xl font-bold text-[#107C41]">SILFAK</h1>
          <p className="text-gray-600 text-sm mt-1 font-semibold leading-tight">
            Membangun Kampus Lestari <br /> Bersama.
          </p>
        </div>

        {/* Form Register */}
        <form className="space-y-4 text-left" onSubmit={(e) => e.preventDefault()}>
          
          {/* Input Email */}
          <div>
            <label className="block text-xs font-bold text-gray-600 mb-1.5 uppercase tracking-wide">Email:</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-xs opacity-50">✉️</span>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full bg-white border border-gray-200 rounded-xl py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#107C41]/20 focus:border-[#107C41] transition-all"
              />
            </div>
          </div>

          {/* Input Password */}
          <div>
            <label className="block text-xs font-bold text-gray-600 mb-1.5 uppercase tracking-wide">Password:</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-xs opacity-50">🔒</span>
              <input
                type={showPass ? "text" : "password"}
                placeholder="Enter your password"
                className="w-full bg-white border border-gray-200 rounded-xl py-2.5 pl-10 pr-12 text-sm focus:outline-none focus:ring-2 focus:ring-[#107C41]/20 focus:border-[#107C41] transition-all"
              />
              <button 
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-[10px] font-bold text-gray-400 hover:text-[#107C41]"
              >
                {showPass ? "HIDE" : "SHOW"}
              </button>
            </div>
          </div>

          {/* Input Confirm Password */}
          <div>
            <label className="block text-xs font-bold text-gray-600 mb-1.5 uppercase tracking-wide">Confirm Password:</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-xs opacity-50">🔒</span>
              <input
                type={showConfirmPass ? "text" : "password"}
                placeholder="Confirm your password"
                className="w-full bg-white border border-gray-200 rounded-xl py-2.5 pl-10 pr-12 text-sm focus:outline-none focus:ring-2 focus:ring-[#107C41]/20 focus:border-[#107C41] transition-all"
              />
              <button 
                type="button"
                onClick={() => setShowConfirmPass(!showConfirmPass)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-[10px] font-bold text-gray-400 hover:text-[#107C41]"
              >
                {showConfirmPass ? "HIDE" : "SHOW"}
              </button>
            </div>
          </div>

          {/* Tombol Register - Warna disesuaikan dengan gambar (hijau agak pudar/sage) */}
          <button className="w-full bg-[#8DB3A1] hover:bg-[#7a9c8b] text-white font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-gray-200 transition-all active:scale-[0.98] mt-4 uppercase text-xs tracking-widest">
             Register
          </button>
        </form>

        {/* Footer Card */}
        <p className="mt-6 text-sm text-gray-500 font-medium">
          Already have an account? <a href="#" className="text-blue-500 font-bold hover:underline">Sign Up</a>
        </p>
      </div>
    </section>
  );
};

export default Hero;