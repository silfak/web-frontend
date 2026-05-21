import { FaInstagram, FaLinkedin } from "react-icons/fa";
import { MapPin, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-gray-100 bg-white px-10 py-6 flex flex-col sm:flex-row justify-between items-center gap-3">
      {/* KIRI */}
      <p className="text-[10px] text-gray-300">
        © 2026 Veteran Tech | All rights reserved
      </p>
      {/* KANAN */}
      <div className="flex gap-4 text-[10px] text-gray-400">
        <span className="hover:text-[#107C41] cursor-pointer">Privacy Policy</span>
        <span className="hover:text-[#107C41] cursor-pointer">Terms of Service</span>
      </div>
    </footer>
  );
}
