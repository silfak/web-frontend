import logo from "@/assets/LandingPage/logosilfak.png"

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center px-4 py-2 bg-white">

      <div className="flex items-center gap-2">
        <img src={logo} className="h-20 mt-1.5"/>
        <span className="text-3xl font-bold text-[#166534]">SILFAK</span>
      </div>

    </nav>
  )
}