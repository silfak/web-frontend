import logo from "./gambar/logosilfak.jpeg"
import { Button } from "@/components/ui/button"

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center px-6 py-4 bg-white border-b">

      <div className="flex items-center gap-2">
        <img src={logo} className="h-8"/>
        <span className="font-semibold text-sky-600">SILFAK</span>
      </div>

      <div className="flex gap-3">
        <Button variant="outline">Login</Button>
        <Button className="bg-sky-500 hover:bg-sky-600">
          Register
        </Button>
      </div>

    </nav>
  )
}