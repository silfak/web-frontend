import { useState } from "react";
import { Inbox, Clock, CheckCircle, Download, FileDown, BarChart3, MapPin, CheckCircle2, X } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import EmptyState from "@/components/DashboardAdmin/EmptyState";
import type { LaporanAdmin } from "@/types";

interface ChartData {
  name: string;
  total: number;
}

interface TopRuangan {
  gedung: string;
  ruang: string;
  total: number;
}

interface DashboardViewProps {
  laporanData?: LaporanAdmin[];
}

export default function DashboardView({ laporanData = [] }: DashboardViewProps) {
  const [showToast, setShowToast] = useState(false);

  const triggerToast = () => {
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const totalMasuk = laporanData.length;
  const totalSelesai = laporanData.filter((item) => item.status === "resolved").length;
  const totalMenunggu = laporanData.filter((item) => item.status === "reported" || item.status === "inprogress").length;

  const data: ChartData[] = Object.values(
    laporanData.reduce<Record<string, ChartData>>((acc, item) => {
      if (!acc[item.jenis]) acc[item.jenis] = { name: item.jenis, total: 0 };
      acc[item.jenis].total++;
      return acc;
    }, {})
  );

  const ruanganCount: Record<string, number> = {};
  laporanData.forEach((item) => {
    const key = `${item.gedung} - ${item.ruang}`;
    ruanganCount[key] = (ruanganCount[key] || 0) + 1;
  });

  const topRuangan: TopRuangan[] = Object.entries(ruanganCount)
    .map(([key, total]) => {
      const [gedung, ruang] = key.split(" - ");
      return { gedung, ruang, total };
    })
    .sort((a, b) => b.total - a.total)
    .slice(0, 3);

  return (
    <div className="space-y-6">
      {showToast && (
        <div className="fixed top-5 right-5 z-50 flex items-center gap-3 bg-white border border-gray-200 shadow-lg rounded-xl px-4 py-3">
          <CheckCircle2 size={20} className="text-green-600" />
          <p className="text-sm font-medium text-gray-700">Data laporan berhasil diexport</p>
          <button onClick={() => setShowToast(false)}><X size={16} className="text-gray-400 hover:text-gray-600" /></button>
        </div>
      )}

      <div>
        <h2 className="text-lg md:text-xl font-bold text-green-700">Analytics Overview</h2>
        <p className="text-gray-500 text-sm">Real-time facility management metrics</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-xl shadow-lg">
          <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-green-100 mb-3"><Inbox className="text-green-600" /></div>
          <p className="text-sm text-gray-500">Total Laporan Masuk</p>
          <h1 className="text-xl md:text-2xl font-bold">{totalMasuk}</h1>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-lg">
          <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-yellow-100 mb-3"><Clock className="text-yellow-600" /></div>
          <p className="text-sm text-gray-500">Laporan Menunggu</p>
          <h1 className="text-xl md:text-2xl font-bold">{totalMenunggu}</h1>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-lg">
          <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-green-100 mb-3"><CheckCircle className="text-green-600" /></div>
          <p className="text-sm text-gray-500">Laporan Selesai</p>
          <h1 className="text-xl md:text-2xl font-bold">{totalSelesai}</h1>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded-xl shadow-lg">
          <h3 className="font-semibold mb-4 text-sm md:text-base text-green-700">Tren Kategori Masalah</h3>
          {data.length === 0 ? (
            <EmptyState icon={BarChart3} title="Belum ada data untuk ditampilkan" desc="Belum ada data laporan. Tren kategori masalah akan muncul setelah ada laporan masuk" />
          ) : (
            <div className="w-full h-64 relative z-0">
              <ResponsiveContainer>
                <BarChart data={data}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="total" fill="#107C41" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>

        <div className="bg-white p-4 rounded-xl shadow-lg">
          <h3 className="font-semibold mb-4 text-sm md:text-base text-green-700">Top 3 Ruangan Boros</h3>
          {topRuangan.length === 0 ? (
            <EmptyState icon={MapPin} title="Belum ada data laporan" desc="Belum ada data laporan. Data ruangan boros akan muncul setelah ada laporan masuk" />
          ) : (
            <div className="space-y-3">
              {topRuangan.map((item, index) => (
                <div key={index} className="flex justify-between items-center bg-gray-50 p-3 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className={`w-7 h-7 flex items-center justify-center rounded-lg text-xs font-bold transition-all cursor-default ${index === 0 ? " text-black hover:bg-pink-200 hover:text-pink-600" : index === 1 ? "text-black hover:bg-pink-200 hover:text-pink-600" : "text-black hover:bg-pink-100 hover:text-pink-500"}`}>
                      {index + 1}
                    </div>
                    <div>
                      <p className="text-sm font-medium">{item.gedung}</p>
                      <p className="text-xs text-gray-500">{item.ruang}</p>
                    </div>
                  </div>
                  <span className="text-sm">{item.total} laporan</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {data.length > 0 && (
        <div className="bg-white p-4 rounded-xl shadow-lg flex flex-col sm:flex-row justify-between gap-4 sm:items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-green-100"><FileDown className="text-green-700" size={18} /></div>
            <div>
              <p className="font-medium text-sm md:text-base">Quick Export</p>
              <p className="text-xs text-gray-500">Unduh laporan dalam format CSV</p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
            <select className="border rounded-md px-3 py-2 text-sm w-full sm:w-auto">
              {["Januari","Februari","Maret","April","Mei","Juni","Juli","Agustus","September","Oktober","November","Desember"].map((bulan) => (
                <option key={bulan}>{bulan}</option>
              ))}
            </select>
            <select className="border rounded-md px-3 py-2 text-sm w-full sm:w-auto">
              {Array.from({ length: new Date().getFullYear() - 2023 }, (_, i) => 2024 + i).map((tahun) => (
                <option key={tahun}>{tahun}</option>
              ))}
            </select>
            <button onClick={triggerToast} className="bg-green-700 text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2 text-sm hover:bg-green-800 transition-all">
              <Download size={16} />Export Data
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
