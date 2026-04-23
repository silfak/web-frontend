import { CircleUser, Bell } from "lucide-react"

export default function Header() {
  return (
    <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-400 ">
      <h2 className="text-2xl font-bold text-green-700">Beranda</h2>

      <div className="flex gap-7">
        <Bell />
        <CircleUser />
      </div>
    </div>
  )
}