import { FaInstagram, FaLinkedin } from "react-icons/fa"
import { MapPin } from "lucide-react";
import { Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-[#f5f5f5] py-16">

      <div className="max-w-7xl mx-auto px-6 grid gap-20 md:grid-cols-4">

        {/* Silfak */}
        <div>
          <h2 className="font-bold text-[#166534]">Silfak</h2>
          <p className="text-sm text-gray-600 mt-2">
            Platform manajemen fasilitas untuk mendukung inisiatif Green Campus
            di Fakultas Ilmu Komputer.
          </p>
        </div>

        {/* Navigasi */}
        <div>
          <h3 className="font-bold text-[#166534]">Navigasi</h3>
          <ul className="text-sm text-gray-600 space-y-1 mt-2">
            <li>Tentang Fakultas Ilmu Komputer</li>
            <li>Panduan Pelaporan</li>
            <li>Pusat Bantuan</li>
          </ul>
        </div>

        {/* Hubungi Kami */}
        <div>
          <h3 className="font-bold text-[#166534]">Hubungi Kami</h3>
          <MapPin color="gray" size={18} className="mt-2" />
          <p className="text-sm text-gray-600 mt-2">
            Jl. Rs. Fatmawati, Pondok Labu
          </p>

          <p className="text-sm text-gray-600">
            Jakarta Selatan, DKI Jakarta 12450
          </p>

          <Mail color="gray" size={18} className="mt-2" />
          <p className="text-sm text-gray-600 mt-2">
            upnvj@upnvj.ac.id
          </p>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="font-bold text-[#166534]">Social Media</h3>
          <div className="flex gap-4 items-center">

          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-gray-600 hover:text-pink-500 transition mt-2"
          >
            <FaInstagram size={18} />
            <span className="text-sm">Instagram</span>
          </a>

          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition mt-2"
          >
            <FaLinkedin size={18} />
            <span className="text-sm">LinkedIn</span>
          </a>
        </div>
      </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t mt-10 pt-6 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500 px-6 max-w-7xl mx-auto">
        <p>© 2026 Silfak | All rights reserved</p>

        <div className="flex gap-4 mt-2 md:mt-0">
          <span className="hover:underline cursor-pointer">Terms of Service</span>
          <span className="hover:underline cursor-pointer">Privacy Policy</span>
        </div>
      </div>
    </footer>
  )
}

export default Footer;