import { ClipboardList } from "lucide-react"
import EmptyState from "./EmptyState"

export default function ReportHistory() {
  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold text-green-700 mb-3 flex items-center gap-2">
        <ClipboardList />
        Riwayat Laporan
      </h3>
<div className="bg-white rounded-2xl shadow mt-4 py-16 px-6 min-h-[450px] flex items-center justify-center">
      <EmptyState />
      </div>
    </div>
  )
}