import { PencilLine, Trash2, Building2, DoorOpen, AlertCircle, Users, GraduationCap, Briefcase, ShieldCheck } from "lucide-react";
import type { ElementType } from "react";
import type { GedungItem, RuanganItem, JenisMasalahItem, UserItem } from "@/types";

interface EmptyStateInnerProps {
  icon: ElementType;
  title: string;
  desc: string;
  label?: string;
  onClick?: () => void;
}

interface TableManajemenProps {
  mainTab: string;
  mode: string;
  gedung: GedungItem[];
  currentRuangan: RuanganItem[];
  currentMasalah: JenisMasalahItem[];
  currentUsers: UserItem[];
  startIndex: number;
  openEdit: (item: any, type: string) => void;
  openDelete: (item: any, type: string) => void;
  toggleStatus: (index: number) => void;
  onTambah?: (type: string) => void;
  userTab: string;
}

export default function TableManajemen({
  mainTab, mode, gedung, currentRuangan, currentMasalah, currentUsers,
  startIndex, openEdit, openDelete, toggleStatus, onTambah, userTab,
}: TableManajemenProps) {

  const EmptyStateInner = ({ icon: Icon, title, desc, label, onClick }: EmptyStateInnerProps) => (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="w-20 h-20 flex items-center justify-center rounded-full bg-green-50 mb-4">
        <Icon size={36} className="text-green-700" />
      </div>
      <p className="font-semibold text-gray-700 text-base mb-1">{title}</p>
      <p className="text-sm text-gray-400 max-w-[260px] mb-5">{desc}</p>
      {onClick && (
        <button onClick={onClick} className="bg-green-700 text-white px-4 py-2 rounded-lg text-sm flex items-center gap-2 hover:bg-green-800 transition-all">
          + {label}
        </button>
      )}
    </div>
  );

  const isGedungEmpty = mainTab === "fasilitas" && mode === "gedung" && gedung.length === 0;
  const isRuanganEmpty = mainTab === "fasilitas" && mode === "ruangan" && currentRuangan.length === 0;
  const isJenisEmpty = mainTab === "jenis" && currentMasalah.length === 0;
  const isUserEmpty = mainTab === "pengguna" && currentUsers.length === 0;

  if (isGedungEmpty) return <EmptyStateInner icon={Building2} title="Belum ada gedung yang ditambahkan" desc="Tambahkan gedung kampus agar mahasiswa dapat memilih lokasi saat melapor" label="Tambah Gedung" onClick={() => onTambah?.("gedung")} />;
  if (isRuanganEmpty) return <EmptyStateInner icon={DoorOpen} title="Belum ada ruangan yang ditambahkan" desc="Tambahkan ruangan agar mahasiswa dapat memilih lokasi saat melapor" label="Tambah Ruangan" onClick={() => onTambah?.("ruangan")} />;
  if (isJenisEmpty) return <EmptyStateInner icon={AlertCircle} title="Belum ada jenis masalah" desc="Tambahkan jenis masalah agar mahasiswa dapat mengkategorikan laporan mereka" label="Tambah Jenis Masalah" onClick={() => onTambah?.("jenis")} />;
  if (isUserEmpty) return (
    <EmptyStateInner
      icon={userTab === "mahasiswa" ? GraduationCap : userTab === "ob" ? Briefcase : ShieldCheck}
      title={userTab === "mahasiswa" ? "Belum ada mahasiswa terdaftar" : userTab === "ob" ? "Belum ada OB terdaftar" : "Belum ada admin terdaftar"}
      desc={userTab === "mahasiswa" ? "Mahasiswa yang telah melakukan registrasi akan muncul di sini secara otomatis" : userTab === "ob" ? "Data OB yang terdaftar akan muncul di sini" : "Tambahkan akun admin untuk mengelola sistem"}
      label={userTab === "admin" ? "Tambah Akun Admin" : undefined}
      onClick={userTab === "admin" ? () => onTambah?.("admin") : undefined}
    />
  );

  return (
    <div className="overflow-x-auto w-full border rounded-lg overflow-hidden">
      <table className="w-full min-w-[700px] text-sm">
        <thead className="bg-green-700 text-white">
        <tr>
          <th className="p-3 text-left">No</th>
          {mainTab === "jenis" && <th className="p-3 text-left">Nama Masalah</th>}
          {mainTab === "fasilitas" && (
            <>
              <th className="p-3 text-left">{mode === "gedung" ? "Nama Gedung" : "Nama Ruangan"}</th>
              <th className="p-3 text-left">{mode === "gedung" ? "Jumlah Ruangan" : "Nama Gedung"}</th>
            </>
          )}
          {mainTab === "pengguna" && userTab !== "admin" && (
            <>
              <th className="p-3 text-left">Nama</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">NIM</th>
              <th className="p-3 text-left">Status</th>
            </>
          )}
          {mainTab === "pengguna" && userTab === "admin" && (
            <>
              <th className="p-3 text-left">Nama</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Status Akun</th>
            </>
          )}
          <th className="p-3 text-left">Aksi</th>
        </tr>
      </thead>
      <tbody>
        {/* FASILITAS */}
        {mainTab === "fasilitas" &&
          (mode === "gedung" ? gedung : currentRuangan).map((item, i) => (
            <tr key={i} className="border-b hover:bg-gray-50">
              <td className="p-3">{mode === "gedung" ? i + 1 : startIndex + i + 1}</td>
              <td className="p-3">{item.nama}</td>
              <td className="p-3">{mode === "gedung" ? (item as GedungItem).ruang : (item as RuanganItem).gedung}</td>
              <td className="p-3 flex gap-3">
                <button onClick={() => openEdit(item, mode === "gedung" ? "gedung" : "ruangan")}><PencilLine size={16} className="text-green-600" /></button>
                <button onClick={() => openDelete(item, mode === "gedung" ? "gedung" : "ruangan")}><Trash2 size={16} className="text-red-600" /></button>
              </td>
            </tr>
          ))}

        {/* JENIS */}
        {mainTab === "jenis" && currentMasalah.map((item, i) => (
          <tr key={i} className="border-b hover:bg-gray-50">
            <td className="p-3">{startIndex + i + 1}</td>
            <td className="p-3">{item.nama}</td>
            <td className="p-3 flex gap-3">
              <button onClick={() => openEdit(item, "jenis")}><PencilLine size={16} className="text-green-600" /></button>
              <button onClick={() => openDelete(item, "jenis")}><Trash2 size={16} className="text-red-600" /></button>
            </td>
          </tr>
        ))}

        {/* USER - MAHASISWA & OB */}
        {mainTab === "pengguna" && userTab !== "admin" && currentUsers.map((user, i) => (
          <tr key={i} className="border-b hover:bg-gray-50">
            <td className="p-3">{startIndex + i + 1}</td>
            <td className="p-3">{user.nama}</td>
            <td className="p-3 text-xs">{user.email}</td>
            <td className="p-3">{user.nim}</td>
            <td className="p-3">
              <span className={`px-2 py-1 text-xs rounded-full ${user.status ? "bg-green-100 text-green-700" : "bg-red-100 text-red-600"}`}>
                {user.status ? "Aktif" : "Nonaktif"}
              </span>
            </td>
            <td className="p-3 flex gap-3 items-center">
              <button onClick={() => openEdit(user, "user")}><PencilLine size={16} className="text-green-600" /></button>

              <button onClick={() => toggleStatus(startIndex + i)} className={`w-10 h-5 flex items-center rounded-full p-1 transition-colors ${user.status ? "bg-green-600" : "bg-gray-300"}`}>
                <div className={`w-4 h-4 bg-white rounded-full transition-transform ${user.status ? "translate-x-5" : ""}`} />
              </button>
            </td>
          </tr>
        ))}

        {/* USER - ADMIN */}
        {mainTab === "pengguna" && userTab === "admin" &&
          currentUsers.map((item, i) => (
            <tr key={i} className="border-b hover:bg-gray-50">
              <td className="p-3">{startIndex + i + 1}</td>
              <td className="p-3">{item.nama}</td>
              <td className="p-3">{item.email}</td>
              <td className="p-3">
                <span className={`px-2 py-1 text-xs rounded-full ${item.status ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                  {item.status ? "Aktif" : "Non-Aktif"}
                </span>
              </td>
              <td className="p-3 flex gap-2">
                <button onClick={() => openEdit(item, "admin")} className="p-1.5 text-blue-600 bg-blue-50 rounded hover:bg-blue-100"><PencilLine size={16} /></button>
                <button onClick={() => toggleStatus(startIndex + i)} className={`p-1.5 rounded text-sm font-medium ${item.status ? "text-red-600 bg-red-50 hover:bg-red-100" : "text-green-600 bg-green-50 hover:bg-green-100"}`}>
                  {item.status ? "Nonaktifkan" : "Aktifkan"}
                </button>
              </td>
            </tr>
          ))}
      </tbody>
      </table>
    </div>
  );
}