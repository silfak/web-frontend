import logo from "@/assets/LandingPage/logosilfak.png"

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center px-6 py-4 bg-white">

      <div className="flex items-center gap-2">
        <img src={logo} className="h-10"/>
        <span className="font-bold text-[#166534]">SILFAK</span>
      </div>

    </nav>
  )
}