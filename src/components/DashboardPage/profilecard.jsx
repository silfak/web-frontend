import logo from "../../assets/LandingPage/logosilfak.png";

export default function ProfileCard() {
  return (
    <div className="bg-white rounded-xl p-3 flex items-center gap-3 shadow-md">
      <img
        src={logo}
        alt="logo"
        className="w-12 h-12 rounded-full object-cover border-2 border-green-700"
      />

      <div>
        <h3 className="text-green-800 font-semibold">Rafi Fauzi</h3>
        <p className="text-xs text-gray-500">Mahasiswa</p>
      </div>
    </div>
  );
}