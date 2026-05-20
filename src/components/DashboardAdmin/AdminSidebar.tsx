import React, { useState } from "react";
import logo from "@/assets/LandingPage/logosilfak.png";
import { useNavigate, useLocation } from "react-router-dom";
import { LayoutDashboard, FileText, Settings2, UserCircle, ChevronRight, LogOut } from "lucide-react";
import type { ElementType } from "react";
import ConfirmationModal from "@/components/ConfirmationModal";

interface MenuItem {
  key: string;
  name: string;
  path: string;
  icon: ElementType;
  arrow?: boolean;
  exact?: boolean;
}

export default function AdminSidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const menuItems: MenuItem[] = [
    { key: "dashboard", name: "Dashboard", path: "/dashboard", icon: LayoutDashboard, exact: true },
    { key: "laporan",   name: "Laporan",   path: "/laporan", icon: FileText },
    { key: "manajemen", name: "Manajemen", path: "/manajemen", icon: Settings2, arrow: true },
    { key: "profile",   name: "Profile",   path: "/profile", icon: UserCircle },
  ];

  const isActive = (item: MenuItem) => {
    if (item.exact) return location.pathname === item.path;
    return location.pathname.startsWith(item.path);
  };

  const handleLogout = () => navigate("/");

  return (
    <div className="w-full md:w-64 bg-[#107C41] text-white md:fixed md:h-screen flex flex-col">
      <ConfirmationModal
        isOpen={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        onConfirm={handleLogout}
        title="Konfirmasi Logout"
        description="Apakah kamu yakin ingin keluar dari SILFAKADMIN?"
        confirmText="Ya, Logout"
        cancelText="Batal"
        icon={LogOut}
        variant="red"
      />

      <div>
        <div className="flex items-center mb-4 gap-1 p-4">
          <img src={logo} alt="logo" className="h-16 w-16 object-contain" />
          <div className="leading-tight">
            <h1 className="text-xl font-bold tracking-tighter">SILFAKADMIN</h1>
            <p className="text-[11px] text-white/70 mt-1">Institutional Management</p>
          </div>
        </div>

        <div className="p-3 space-y-2 mt-2">
          {menuItems.map((item) => (
            <button
              key={item.key}
              onClick={() => navigate(item.path)}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-sm font-semibold transition-all ${
                isActive(item)
                  ? "bg-white text-[#107C41]"
                  : "text-white/85 hover:bg-white/10"
              }`}
            >
              <div className="flex items-center gap-3">
                <item.icon size={16} />
                {item.name}
              </div>
              {item.arrow && <ChevronRight size={16} />}
            </button>
          ))}
        </div>
      </div>

      <div className="p-4 mt-auto">
        <button
          onClick={() => setShowLogoutModal(true)}
          className="flex items-center gap-3 text-sm font-semibold text-white/90 hover:text-white p-6"
        >
          <LogOut size={17} />
          Logout
        </button>
      </div>
    </div>
  );
}
