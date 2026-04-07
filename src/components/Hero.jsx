import bg from "./gambar/landingpage.png"

export default function Hero() {
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

        <p className="mt-4 text-gray-600 max-w-lg">
          Sinergi mahasiswa dan petugas FIK untuk menjaga kenyamanan fasilitas
          bersama. Laporkan kerusakan secara transparan dan pantau pemborosan energi.
        </p>

       <button className="mt-6 bg-[#166534] text-white px-6 py-3 rounded-lg hover:bg-[#15803D] transition">
  Mulai Melapor
</button>

      </div>
    </section>
  )
}