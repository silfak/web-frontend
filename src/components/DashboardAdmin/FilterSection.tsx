import React from "react";
import { Search, Clock, CheckCircle, AlertCircle } from "lucide-react";
import type { FiltersState } from "@/types";

interface StatusOption {
  value: string;
  label: string;
  icon: React.ReactNode | null;
  className?: string;
}

interface FilterSectionProps {
  filters: FiltersState;
  setFilters: (val: Partial<FiltersState>) => void;
}

export default function FilterSection({ filters, setFilters }: FilterSectionProps) {
  const statusOptions: StatusOption[] = [
    { value: "", label: "Semua", icon: null },
    { value: "reported", label: "Reported", icon: <AlertCircle size={14} />, className: "text-blue-600" },
    { value: "inprogress", label: "In Progress", icon: <Clock size={14} />, className: "text-yellow-600" },
    { value: "resolved", label: "Resolved", icon: <CheckCircle size={14} />, className: "text-green-600" },
  ];

  return (
    <div className="bg-white p-4 rounded-xl shadow-lg">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* SEARCH */}
        <div className="md:col-span-2">
          <label className="text-xs text-gray-500 mb-1 block">Pencarian</label>
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Cari berdasarkan nama atau NIM pelapor"
              className="w-full border rounded-lg pl-9 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-600"
              value={filters.search}
              onChange={(e) => setFilters({ search: e.target.value })}
            />
          </div>
        </div>

        {/* STATUS */}
        <div>
          <label className="text-xs text-gray-500 mb-1 block">Status</label>
          <select
            className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-600"
            value={filters.status}
            onChange={(e) => setFilters({ status: e.target.value })}
          >
            {statusOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
          {filters.status && (
            <div className="mt-2">
              {statusOptions
                .filter((s) => s.value === filters.status)
                .map((s) => (
                  <span key={s.value} className={`flex items-center gap-1 px-3 py-1 text-xs rounded-full w-fit bg-gray-100 ${s.className}`}>
                    {s.icon}{s.label}
                  </span>
                ))}
            </div>
          )}
        </div>

        {/* DATE RANGE */}
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="text-xs text-gray-500 mb-1 block">Dari Tanggal</label>
            <input type="date" className="w-full border rounded-lg px-2 py-2 text-sm" value={filters.startDate} onChange={(e) => setFilters({ startDate: e.target.value })} />
          </div>
          <div>
            <label className="text-xs text-gray-500 mb-1 block">Sampai Tanggal</label>
            <input type="date" className="w-full border rounded-lg px-2 py-2 text-sm" value={filters.endDate} onChange={(e) => setFilters({ endDate: e.target.value })} />
          </div>
        </div>
      </div>
    </div>
  );
}
