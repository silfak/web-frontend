import { Inbox } from "lucide-react";
import type { ElementType } from "react";

interface EmptyStateProps {
  icon?: ElementType;
  title?: string;
  desc?: string;
}

export default function EmptyState({
  icon: Icon = Inbox,
  title = "Belum ada data",
  desc = "Data akan muncul setelah tersedia",
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-10 text-gray-400">
      <div className="bg-gray-100 p-3 rounded-lg mb-3">
        <Icon size={22} />
      </div>
      <p className="text-sm font-medium text-gray-600">{title}</p>
      <p className="text-xs mt-1 max-w-[220px]">{desc}</p>
    </div>
  );
}
