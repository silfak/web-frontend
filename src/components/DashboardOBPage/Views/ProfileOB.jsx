import profile from "@/assets/profile.png";

export default function ProfileOB() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 animate-in slide-in-from-bottom-4 duration-500">
      {/* Kiri: Info Profil */}
      <div className="lg:col-span-4 bg-white rounded-[2.5rem] shadow-sm border border-gray-100 p-10 flex flex-col items-center">
        <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg mb-4">
          <img src={profile} alt="Avatar" className="w-full h-full object-cover" />
        </div>
        <button className="text-xs font-bold text-gray-400 hover:text-[#107C41] mb-10">Edit Foto</button>
        
        <div className="w-full space-y-6">
          <div>
            <label className="text-[10px] uppercase font-bold text-gray-400 tracking-widest">Nama</label>
            <div className="bg-gray-50 p-4 rounded-2xl font-bold text-gray-700 mt-1.5">Rafi Fauzi</div>
          </div>
          <div>
            <label className="text-[10px] uppercase font-bold text-gray-400 tracking-widest">Email</label>
            <div className="bg-gray-50 p-4 rounded-2xl font-bold text-gray-700 mt-1.5 text-xs truncate">2410512015@mahasiswa.upnvj.ac.id</div>
          </div>
          <div>
            <label className="text-[10px] uppercase font-bold text-gray-400 tracking-widest">Role</label>
            <div className="bg-[#FDF2E9] text-[#7C4110] px-5 py-1.5 rounded-full text-[10px] font-bold w-fit mt-2 uppercase tracking-wider">OB</div>
          </div>
        </div>
      </div>

      {/* Kanan: Ganti Password */}
      <div className="lg:col-span-8 bg-white rounded-[2.5rem] shadow-sm border border-gray-100 p-10">
        <h3 className="text-xl font-bold text-gray-700 mb-8 pb-4 border-b border-gray-50">Ganti Password</h3>
        <form className="space-y-6">
          {["Password Lama", "Password Baru", "Konfirmasi Password Baru"].map((label) => (
            <div key={label}>
              <label className="text-xs font-bold text-gray-600 block mb-2">{label}</label>
              <input type="password" placeholder={`Masukkan ${label}`} className="w-full bg-white border border-gray-200 rounded-xl p-4 text-sm focus:ring-2 focus:ring-[#107C41]/20 outline-none transition-all" />
            </div>
          ))}
          <button className="w-full bg-[#107C41] text-white py-4 rounded-xl font-bold hover:bg-[#0d6334] transition-all mt-4">Simpan Perubahan</button>
        </form>
      </div>
    </div>
  );
}