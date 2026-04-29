import { Bell, CircleUser } from "lucide-react";



export default function Header({ title, onProfileClick}) {
  return (
    <div className="flex justify-between items-center mb-8 pb-4 border-b border-gray-200">
      <h2 className="text-2xl font-bold text-[#107C41]">{title}</h2>
      <div className="flex gap-6 items-center text-gray-400">
        <button className="hover:text-[#107C41] transition-all"><Bell size={22} /></button>
        <button onClick={onProfileClick} className="hover:text-[#107C41] transition-all"><CircleUser size={24} /></button>
      </div>
    </div>
  );
}