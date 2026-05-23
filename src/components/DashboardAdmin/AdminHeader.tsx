import { Bell, CircleUser, Menu } from "lucide-react";

interface AdminHeaderProps {
  title: string;
  onOpenSidebar?: () => void;
}

export default function AdminHeader({ title, onOpenSidebar }: AdminHeaderProps) {
  return (
    <div className="flex justify-between items-center mb-6 md:mb-8 pb-4 border-b border-gray-200">
      <div className="flex items-center gap-3">
        <button onClick={onOpenSidebar} className="md:hidden text-gray-500 hover:text-[#107C41] transition-colors">
          <Menu size={24} />
        </button>
        <h2 className="text-xl md:text-2xl font-bold text-[#107C41]">{title}</h2>
      </div>
      <div className="flex gap-6 items-center text-gray-500">
        <button className="hover:text-[#107C41] transition-all">
          <Bell size={22} />
        </button>
        <button className="hover:text-[#107C41] transition-all">
          <CircleUser size={24} />
        </button>
      </div>
    </div>
  );
}
