export default function Footer() {
  return (
    <footer className="bg-gray-100 py-10 mt-10">

      <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-6 px-6">

        <div>
          <h2 className="font-semibold text-sky-600">Silfak</h2>
          <p className="text-sm text-gray-600 mt-2">
            Platform manajemen fasilitas cerdas untuk mendukung Green Campus.
          </p>
        </div>

        <div>
          <h3 className="font-semibold mb-2">Navigasi</h3>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>Tentang Silfak</li>
            <li>Statistik Fasilitas</li>
            <li>Pusat Bantuan</li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold mb-2">Hubungi Kami</h3>
          <p className="text-sm text-gray-600">
            Fakultas Ilmu Komputer UPN Veteran Jakarta
          </p>
        </div>

        <div>
          <h3 className="font-semibold mb-2">Sosial Media</h3>
          <p className="text-sm text-gray-600">Instagram • LinkedIn</p>
        </div>

      </div>

    </footer>
  )
}