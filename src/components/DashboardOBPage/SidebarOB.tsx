import React from "react";
import logo from "@/assets/LandingPage/logosilfak.png";
import profile from "@/assets/profile.png";
import { useNavigate, useLocation } from "react-router-dom";
import { LayoutDashboard, FilePlus, UserCircle, LogOut, X } from "lucide-react";
import type { ElementType } from "react";
import { useAuth } from "@/context/AuthContext";

interface MenuItem {
  name: string;
  path: string;
  icon: ElementType;
  exact?: boolean;
}

interface SidebarOBProps {
  onLogoutClick: () => void;
  isOpen: boolean;
  onClose: () => void;
}

export default function SidebarOB({ onLogoutClick, isOpen, onClose }: SidebarOBProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const userName = user?.name || user?.nama || "Pengguna";

  const menuItems: MenuItem[] = [
    { name: "Beranda", path: "/dashboard", icon: LayoutDashboard, exact: true },
    { name: "Laporan", path: "/laporan", icon: FilePlus },
    { name: "Profile", path: "/profile", icon: UserCircle },
  ];

  const isActive = (item: MenuItem) => {
    if (item.exact) return location.pathname === item.path;
    return location.pathname.startsWith(item.path);
  };

  return (
    <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-[#107C41] text-white flex flex-col justify-between p-6 h-screen transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0 ${isOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full"}`}>
      <div className="space-y-8">
        {/* Header Sidebar (Logo + Tombol Tutup) */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <img src={logo} className="h-17 max-w-full mt-1.5" />
            <h1 className="text-3xl font-bold tracking-tighter">SILFAK</h1>
          </div>
          <button onClick={onClose} className="md:hidden text-white/80 hover:text-white transition-colors">
            <X size={24} />
          </button>
        </div>

        {/* KARTU PROFIL */}
        <div className="bg-white rounded-2xl p-4 mb-8 flex items-center gap-3 shadow-md">
          <div className="w-12 h-12 rounded-full overflow-hidden shrink-0 border border-gray-100">
            <img src={profile} alt="Profile" className="w-full h-full object-cover" />
          </div>
          <div className="overflow-hidden">
            <h3 className="text-[#107C41] font-bold text-lg break-words whitespace-normal leading-tight">{userName}</h3>
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
              onClick={() => navigate(item.path)}
              className={`w-full flex items-center gap-4 px-5 py-4 rounded-xl text-sm font-bold transition-all ${
                isActive(item)
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

      <button onClick={onLogoutClick} className="flex items-center gap-3 px-5 py-3 text-sm font-bold opacity-80 hover:opacity-100">
        <LogOut size={20} /> Logout
      </button>
    </div>
  );
}
