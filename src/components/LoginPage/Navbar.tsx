import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

import logo from "@/assets/LandingPage/logosilfak.png";

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center px-4 py-2 bg-white">
      <div className="flex items-center gap-0">
        <Link to="/">
          <img src={logo} className="h-20 mt-1.5" />
        </Link>
        <Link to="/">
          <Button
            variant="ghost"
            className="p-0 h-auto font-bold text-blue-500 hover:bg-transparent hover:text-blue-600"
          >
            <span className="text-3xl font-bold text-[#166534]">SILFAK</span>
          </Button>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
