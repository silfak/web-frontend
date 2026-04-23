import ProfileCard from "./ProfileCard"
import MenuItem from "./MenuItem"
import logo from "../../assets/LandingPage/logosilfak.png";
import {LayoutDashboard, FileText, User, LogOut} from "lucide-react"

export default function Sidebar() {
  return (
  <div className="w-64 bg-green-800 text-white flex flex-col justify-between p-4">
    
    <div>
      <div className="flex items-center gap-3 mb-6">
        <img src={logo} alt="logo"
                className="w-12 h-20 mt-1.5 object-cover"/>
            
        <h1 className="text-xl font-bold">SILFAK</h1>
      </div>

      <ProfileCard />

      <div className="space-y-2 mt-6 font-bold">
        <MenuItem active text="Beranda" icon={LayoutDashboard} />
        <MenuItem text="Laporan" icon={FileText}/>
        <MenuItem text="Profile" icon={User}/>
      </div>
    </div>

    <button className="flex items-center gap-2 text-left hover:underline mt-6">
  <LogOut size={18} /> Logout</button>

  </div>
)
}