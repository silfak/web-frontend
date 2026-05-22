import React, { useState, useEffect, useMemo } from "react";
import { Bell, CircleUser, X, ClipboardList, BellOff, RefreshCw, CheckCircle, Menu } from "lucide-react";
import type { Report } from "@/types";

interface HeaderProps {
  title: string;
  onProfileClick?: () => void;
  onViewDetail?: (report: Report) => void;
  onOpenSidebar?: () => void;
  reports?: Report[];
}

export default function Header({ title, onProfileClick, onViewDetail, onOpenSidebar, reports = [] }: HeaderProps) {
  const [showNotif, setShowNotif] = useState(false);
  const [lastReadTime, setLastReadTime] = useState(0);

  useEffect(() => {
    const stored = localStorage.getItem("silfak_last_notif_ob");
    if (stored) setLastReadTime(parseInt(stored, 10));
  }, []);

  const handleToggleNotif = () => {
    const newState = !showNotif;
    setShowNotif(newState);
    if (newState) {
      const now = Date.now();
      setLastReadTime(now);
      localStorage.setItem("silfak_last_notif_ob", now.toString());
    }
  };

  const recentReports = useMemo(() => {
    return [...(reports || [])]
      .sort((a, b) => (b.rawDate?.getTime() || 0) - (a.rawDate?.getTime() || 0))
      .slice(0, 4);
  }, [reports]);

  const hasUnread = recentReports.some(r => (r.rawDate?.getTime() || 0) > lastReadTime);

  const getNotifConfig = (report: any) => {
    if (report.status === "Reported") {
      return {
        text: `Laporan baru masuk: ${report.masalah} di ${report.ruang}, ${report.lokasi}.`,
        icon: <ClipboardList size={20} />,
        color: "text-blue-600",
        bg: "bg-blue-100"
      };
    } else if (report.status === "Inprogress") {
      return {
        text: `Update status: ${report.masalah} di ${report.lokasi} sedang dikerjakan.`,
        icon: <RefreshCw size={20} />,
        color: "text-yellow-600",
        bg: "bg-yellow-100"
      };
    } else {
      return {
        text: `Selesai: Laporan ${report.masalah} di ${report.lokasi} telah diselesaikan.`,
        icon: <CheckCircle size={20} />,
        color: "text-[#107C41]",
        bg: "bg-[#E8F5EE]"
      };
    }
  };

  return (
    <div className="flex justify-between items-center mb-6 md:mb-8 pb-4 border-b border-gray-200 relative">
      <div className="flex items-center gap-3">
        <button onClick={onOpenSidebar} className="md:hidden text-gray-500 hover:text-[#107C41] transition-colors">
          <Menu size={24} />
        </button>
        <h2 className="text-xl md:text-2xl font-bold text-[#107C41]">{title}</h2>
      </div>
      
      <div className="flex gap-4 md:gap-6 items-center text-gray-400">
        <div className="relative flex items-center">
          <button 
            onClick={handleToggleNotif}
            className={`hover:text-[#107C41] transition-all relative ${showNotif ? 'text-[#107C41]' : ''}`}
          >
            <Bell size={22} />
            {hasUnread && (
              <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-red-500 border-2 border-white rounded-full"></span>
            )}
          </button>

          {showNotif && (
            <div className="absolute top-full right-0 mt-4 w-96 bg-white shadow-2xl rounded-3xl border border-gray-50 z-50 animate-in slide-in-from-top-2 duration-300 max-h-[500px] flex flex-col overflow-hidden">
              <div className="absolute -top-2 right-2 w-4 h-4 bg-white rotate-45 border-t border-l border-gray-50"></div>

              <div className="p-6 pb-2 relative border-b border-gray-50 shrink-0">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-bold text-gray-800">Notifikasi</h3>
                  <button onClick={() => setShowNotif(false)} className="text-gray-400 hover:text-gray-600">
                    <X size={20} />
                  </button>
                </div>
              </div>

              <div className="overflow-y-auto p-4 space-y-4">
                {recentReports.length === 0 ? (
                  <div className="py-10 flex flex-col items-center justify-center text-center">
                    <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mb-4 text-gray-400">
                      <BellOff size={32} />
                    </div>
                    <p className="text-sm font-bold text-gray-700 mb-1">Belum Ada Notifikasi</p>
                    <p className="text-[11px] text-gray-400 px-6 leading-relaxed">
                      Notifikasi akan muncul saat ada laporan baru dari mahasiswa atau staf.
                    </p>
                  </div>
                ) : (
                  recentReports.map(report => {
                    const cfg = getNotifConfig(report);
                    return (
                      <div key={report.id} className="flex gap-4 items-start pb-4 border-b border-gray-50 last:border-0 last:pb-0">
                        <div className={`w-10 h-10 ${cfg.bg} ${cfg.color} rounded-xl flex items-center justify-center shrink-0`}>
                          {cfg.icon}
                        </div>
                        <div className="flex-1 space-y-1">
                          <p className="text-[12px] text-gray-700 leading-relaxed">
                            {cfg.text}
                          </p>
                          <div className="flex justify-between items-center mt-2">
                            <span className="text-[10px] text-gray-400 font-medium">
                              {report.tgl}
                            </span>
                            <button 
                              onClick={() => { onViewDetail(report); setShowNotif(false); }}
                              className="text-[11px] font-bold text-[#107C41] hover:underline"
                            >
                              Lihat
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          )}
        </div>

        <button onClick={onProfileClick} className="hover:text-[#107C41] transition-all flex items-center">
          <CircleUser size={24} />
        </button>
      </div>
    </div>
  );
}
