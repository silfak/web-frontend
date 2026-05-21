interface MainTabProps {
  mainTab: string;
  setMainTab: (tab: string) => void;
  setPage: (page: number) => void;
}

export default function MainTab({ mainTab, setMainTab, setPage }: MainTabProps) {
  return (
    <div className="flex gap-6 border-b border-gray-100 text-sm">
      {["fasilitas", "jenis", "pengguna"].map((tab) => (
        <button
          key={tab}
          onClick={() => { setMainTab(tab); setPage(1); }}
          className={`pb-2 ${mainTab === tab ? "border-b-2 border-green-700 text-green-700 font-semibold" : "text-gray-500"}`}
        >
          {tab === "fasilitas" ? "Fasilitas" : tab === "jenis" ? "Jenis Masalah" : "Pengguna"}
        </button>
      ))}
    </div>
  );
}
