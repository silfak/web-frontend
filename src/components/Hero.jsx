import bg from "./gambar/landingpage.png"

export default function Hero() {
  return (
    <section
      className="relative h-[80vh] bg-cover bg-center flex items-center"
      style={{ backgroundImage: `url(${bg})` }}
    >

      <div className="absolute inset-0 bg-white/70"></div>

      <div className="relative max-w-5xl px-6">

        <h1 className="text-4xl md:text-5xl font-bold">
          Wujudkan <span className="text-sky-500">Fakultas Lestari</span>
          <br />
          Melalui Genggaman Tangan.
        </h1>

        <p className="mt-4 text-gray-600 max-w-lg">
          Sinergi mahasiswa dan petugas FIK untuk menjaga kenyamanan fasilitas
          bersama. Laporkan kerusakan secara transparan dan pantau pemborosan energi.
        </p>

        <button className="mt-6 bg-sky-500 text-white px-6 py-3 rounded-lg hover:bg-sky-600">
          Mulai Melapor
        </button>

      </div>
    </section>
  )
}