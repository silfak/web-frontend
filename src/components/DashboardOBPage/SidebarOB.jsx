import React from "react";
import logo from "@/assets/LandingPage/logosilfak.png";
import profile from "@/assets/profile.png";
import { useNavigate } from "react-router-dom";
import { LayoutDashboard, FilePlus, UserCircle, LogOut } from "lucide-react";

export default function SidebarOB({ activeMenu, setActiveMenu }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    // logika hapus token/session n
    navigate("/");
  };

  const menuItems = [
    { name: "Beranda", icon: LayoutDashboard },
    { name: "Laporan", icon: FilePlus },
    { name: "Profile", icon: UserCircle },
  ];

  return (
    <div className="w-64 bg-[#107C41] text-white flex flex-col justify-between p-6 h-screen">
      <div className="space-y-8">
        {/* Logo SILFAK */}
        <div className="flex items-center mb-4">
              <img src={logo} className="h-17 max-w-full mt-1.5"/>
              <h1 className="text-3xl font-bold tracking-tighter">SILFAK</h1>
        </div>

        {/* KARTU PROFIL (Gaya Figma) */}
        <div className="bg-white rounded-2xl p-4 mb-8 flex items-center gap-3 shadow-md">
            <div className="w-12 h-12 rounded-full overflow-hidden shrink-0 border border-gray-100">
              <img 
                src={profile}
                alt="Profile" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="overflow-hidden">
              <h3 className="text-[#107C41] font-bold text-lg truncate">Rafi Fauzi</h3>
              <span className="inline-block bg-[#F3E8DD] text-[#7C4110] text-[10px] px-2 py-0.5 mt-2 rounded-md font-bold uppercase">
              OB
              </span>
             </div>
          </div>

        {/* NAVIGASI MENU */}
        <nav className="space-y-3">
          {menuItems.map((item) => (
            <button
              key={item.name}
              onClick={() => setActiveMenu(item.name)}
              className={`w-full flex items-center gap-4 px-5 py-4 rounded-xl text-sm font-bold transition-all ${
                activeMenu === item.name 
                ? "bg-[#E8F5EE] text-[#107C41]" 
                : "text-white hover:bg-white/10"
              }`}
            >
              <item.icon size={22} />
              {item.name}
            </button>
          ))}
        </nav>
      </div>

      <button onClick={() => navigate("/")} className="flex items-center gap-3 px-5 py-3 text-sm font-bold opacity-80 hover:opacity-100">
        <LogOut size={20} /> Logout
      </button>
      
    </div>
  );
}