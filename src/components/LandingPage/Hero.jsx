import { useNavigate } from "react-router-dom";
import { ClipboardPlus } from "lucide-react";
import bg from "@/assets/LandingPage/landingpage.png";

const Hero = () => {

  const navigate = useNavigate(); 

  const handleLaporClick = () => {
    navigate("/dashboardMahasiswa");
  };

  return (
    <section
      className="relative min-h-[90vh] flex items-center bg-cover bg-top md:bg-center"
      style={{
        backgroundImage: `url(${bg})`,
      }}
    >
      <div className="absolute inset-0 bg-white/30 backdrop-blur-[1px]"></div>

      <div className="relative max-w-5xl px-6">
        <h1 className="text-3xl md:text-5xl font-bold leading-tight text-gray-800">
          Wujudkan <span className="text-[#166534]">Fakultas Lestari</span>
          <br />
          Melalui Genggaman Tangan.
        </h1>

        <p className="mt-4 text-gray-600 max-w-lg text-justify">
          Sinergi mahasiswa dan petugas FIK untuk menjaga kenyamanan fasilitas
          bersama. Laporkan kerusakan secara transparan dan pantau pemborosan
          energi.
        </p>

        <div className="flex">
          <div className="flex">
            <button 
              onClick={handleLaporClick}
              className="mt-6 bg-[#166534] text-white px-3 py-2 rounded-lg hover:bg-[#15803D] transition flex items-center gap-2"
            >
              <ClipboardPlus color="white" size={18} /> Melapor
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

