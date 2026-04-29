import React from "react";
import logo from "@/assets/LandingPage/logosilfak.png";
import profile from "@/assets/profile.png";
import { useNavigate } from "react-router-dom";
import { LayoutDashboard, FileText, User, LogOut } from "lucide-react";

export default function Sidebar({ activeMenu, setActiveMenu }) {
  const menuItems = [
    { name: "Beranda", icon: LayoutDashboard },
    { name: "Laporan", icon: FileText },
    { name: "Profile", icon: User },
  ];

  const navigate = useNavigate(); 

  const handleLogout = () => {
    // logika hapus token/session n
    navigate("/");
  };

  return (
    <div className="w-64 bg-[#107C41] text-white flex flex-col justify-between p-6 h-screen">
      <div>
        {/* Logo SILFAK */}
        <div className="flex items-center mb-4">
            <img src={logo} className="h-17 max-w-full mt-1.5"/>
          <h1 className="text-3xl font-bold tracking-tighter">SILFAK</h1>
        </div>

        {/* Profile Card Kecil */}
        <div className="bg-white rounded-2xl p-4 mb-8 flex items-center gap-3 border">
          <img 
            src={profile}
            alt="Avatar" 
            className="w-12 h-12 rounded-full object-cover border border-white/20"
          />
          <div className="overflow-hidden">
            <p className="font-bold text-sm text-black truncate">Rafi Fauzi</p>
            <p className="bg-[#E7F3ED] text-[#107C41] px-5 py-1.5 rounded-full text-[10px] font-bold w-fit mt-2 uppercase tracking-wider">Mahasiswa</p>
          </div>
        </div>

        {/* Menu Navigasi */}
        <nav className="space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.name}
              onClick={() => setActiveMenu(item.name)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${
                activeMenu === item.name 
                ? "bg-white text-[#107C41] shadow-lg shadow-black/10" 
                : "hover:bg-white/10 text-white/80 hover:text-white"
              }`}
            >
              <item.icon size={18} />
              {item.name}
            </button>
          ))}
        </nav>
      </div>

      {/* Logout di Bawah */}
      <button 
        onClick={handleLogout}
        className="flex items-center gap-3 px-4 py-3 text-sm font-bold opacity-70 hover:opacity-100 hover:underline transition-all"
      >
        <LogOut size={18} />
        Logout
      </button>
    </div>
  );
}