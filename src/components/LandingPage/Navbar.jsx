import logo from "@/assets/LandingPage/logosilfak.png"
import { Button } from "@/components/ui/button"
import { DoorOpen } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center px-4 py-2 bg-white">

      <div className="flex items-center gap-0">
        <img src={logo} className="h-20 mt-1.5"/>
        <span className="text-3xl font-bold text-[#166534]">SILFAK</span>
      </div>

      <div className="flex gap-3">
        <Button variant="outline" className="text-[#166534] border-[#166534] hover:bg-[#e5e7e5]">
          <DoorOpen color="#107C41" size={24} /> Login
        </Button>

        <Button className="text-white bg-[#166534] hover:bg-[#15803D]">
          Register
        </Button>
      </div>
    </nav>
  )
}