import { FilePlus } from "lucide-react"

export default function ReportButton() {
  return (
    <button className="flex items-center gap-2 bg-green-700 text-white px-5 py-3 rounded-lg shadow hover:bg-green-800 transition">
      <FilePlus />
      Buat Laporan Baru
    </button>
  )
}