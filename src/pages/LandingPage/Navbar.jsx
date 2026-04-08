import logo from "@/assets/LandingPage/logosilfak.png"
import { Button } from "@/components/ui/button"

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center px-6 py-4 bg-white">

      <div className="flex items-center gap-2">
        <img src={logo} className="h-10"/>
        <span className="font-bold text-[#166534]">SILFAK</span>
      </div>

      <div className="flex gap-3">
      <Button variant="outline" className="text-[#166534] border-[#166534]">
  Login
</Button>
<Button className="bg-[#166534] hover:bg-[#15803D]">
  Register
</Button>
      </div>

    </nav>
  )
}