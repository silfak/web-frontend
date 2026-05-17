import { FaInstagram, FaLinkedin } from "react-icons/fa";
import { MapPin, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-gray-100 bg-white px-10 py-12">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
        <div className="space-y-4">
          <h3 className="text-[#107C41] font-bold text-2xl">SILFAK</h3>
          <p className="text-gray-400 text-xs leading-relaxed">Platform manajemen fasilitas untuk mendukung inisiatif GreenCampus di Fakultas Ilmu Komputer.</p>
        </div>
        <div className="space-y-4">
          <h4 className="font-bold text-gray-700 text-sm">Navigasi</h4>
          <ul className="text-gray-400 text-xs space-y-3">
            <li className="hover:text-[#107C41] cursor-pointer">Tentang Fakultas Ilmu Komputer</li>
            <li className="hover:text-[#107C41] cursor-pointer">Panduan Pelaporan</li>
            <li className="hover:text-[#107C41] cursor-pointer">Pusat Bantuan</li>
          </ul>
        </div>
        <div className="space-y-4">
          <h4 className="font-bold text-gray-700 text-sm">Hubungi Kami</h4>
          <div className="text-gray-400 text-xs space-y-4">
            <div className="flex gap-3"><MapPin size={16} className="text-[#107C41] shrink-0" /><span>Jl. Rs. Fatmawati, Pondok Labu, Jakarta Selatan, 12450</span></div>
            <div className="flex gap-3"><Mail size={16} className="text-[#107C41] shrink-0" /><span>upnvj@upnvj.ac.id</span></div>
          </div>
        </div>
        <div className="space-y-4 text-gray-400">
          <h4 className="font-bold text-gray-700 text-sm">Social Media</h4>
          <div className="flex gap-5"><FaInstagram size={20} /><FaLinkedin size={20} /></div>
        </div>
      </div>
      <p className="text-[10px] text-gray-300">© 2026 Veteran Tech | All rights reserved</p>
    </footer>
  );
}
