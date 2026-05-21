import { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import Header from "./components/Header";
import MainTab from "./components/MainTab";
import SubTabFasilitas from "./components/SubTabFasilitas";
import SubTabUser from "./components/SubTabUser";
import TableManajemen from "./components/TableManajemen";
import PaginationManajemen from "./components/PaginationManajemen";
import Toast from "./components/Toast";
import { useToast } from "../../../../hooks/useToast";
import DeleteModal from "./components/modals/DeleteModal";
import ToggleUserModal from "./components/modals/ToggleUserModal";
import EditModal from "./components/modals/EditModal";
import TambahModal from "./components/modals/TambahModal";
import type { GedungItem, RuanganItem, JenisMasalahItem, UserItem, AnyItem } from "@/types";
import api from "@/lib/axios";

export default function ManajemenView() {
  const { toasts, showToast, removeToast } = useToast();

  const [mainTab, setMainTab] = useState("fasilitas");
  const [mode, setMode] = useState("gedung");
  const [userTab, setUserTab] = useState("mahasiswa");

  const [gedung, setGedung] = useState<GedungItem[]>([]);
  const [ruangan, setRuangan] = useState<RuanganItem[]>([]);
  const [jenisMasalah, setJenisMasalah] = useState<JenisMasalahItem[]>([]);
  const [users, setUsers] = useState<UserItem[]>([]);
  const [admins, setAdmins] = useState<UserItem[]>([]);

  const fetchData = async () => {
    try {
      const [bRes, rRes, cRes, uRes] = await Promise.all([
        api.get("/api/buildings").catch(() => ({ data: { data: [] } })),
        api.get("/api/rooms").catch(() => ({ data: { data: [] } })),
        api.get("/api/categories").catch(() => ({ data: { data: [] } })),
        api.get("/api/users").catch(() => ({ data: { data: [] } }))
      ]);

      const gedungData = (bRes.data?.data || []).map((b: any) => ({ 
        id: b.id, nama: b.name, ruang: b.roomsCount ?? b.rooms?.length ?? 0
      }));
      setGedung(gedungData);

      const roomsData = (rRes.data?.data || []).map((r: any) => ({ 
        id: r.id, 
        nama: r.name, 
        gedung: r.building?.name || "", 
        buildingId: r.building?.id || r.buildingId,
      }));
      setRuangan(roomsData);

      const jenisData = (cRes.data?.data || []).map((c: any) => ({ 
        id: c.id, nama: c.name
      }));
      setJenisMasalah(jenisData);

      const allUsers = (uRes.data?.data || []).map((u: any) => ({
        id: u.id, nama: u.name, email: u.email, nim: u.nim, role: u.role, status: u.status === "ACTIVE"
      }));
      setUsers(allUsers.filter((u: any) => u.role !== "ADMIN"));
      setAdmins(allUsers.filter((u: any) => u.role === "ADMIN"));
    } catch (error) {
      console.error("Gagal menarik data manajemen:", error);
    }
  };

  useEffect(() => { fetchData(); }, []);

  // MODAL TAMBAH
  const [showTambahModal, setShowTambahModal] = useState(false);
  const [tambahType, setTambahType] = useState("");

  const openTambah = (type: string) => { setTambahType(type); setShowTambahModal(true); };
  const closeTambah = () => { setShowTambahModal(false); setTambahType(""); };
  const confirmTambah = async (data: any) => {
    try {
      if (tambahType === "gedung") {
        await api.post("/api/buildings", { name: data.nama });
        showToast("Gedung berhasil ditambahkan");
      } else if (tambahType === "ruangan") {
        await api.post("/api/rooms", { name: data.nama, buildingId: data.buildingId || data.gedung, floor: Number(data.floor || 1) });
        showToast("Ruangan berhasil ditambahkan");
      } else if (tambahType === "jenis") {
        await api.post("/api/categories", { name: data.nama });
        showToast("Jenis masalah berhasil ditambahkan");
      } else if (tambahType === "ob" || tambahType === "admin") {
        if (tambahType === "ob") {
          await api.post("/api/users/OB", { email: data.email, password: data.password, name: data.nama });
        } else {
          await api.post("/api/users", { ...data, role: "ADMIN", name: data.nama });
        }
        showToast(`Akun ${tambahType.toUpperCase()} berhasil dibuat`);
      }
      closeTambah();
      fetchData();
    } catch (err: any) {
      showToast(err.response?.data?.message || err.message || "Gagal menambahkan data");
    }
  };

  // MODAL DELETE
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteItem, setDeleteItem] = useState<{ nama: string, id?: string } | null>(null);
  const [deleteType, setDeleteType] = useState("");

  const openDelete = (item: { nama: string, id?: string }, type: string) => { setDeleteItem(item); setDeleteType(type); setShowDeleteModal(true); };
  const closeDelete = () => { setShowDeleteModal(false); setDeleteItem(null); setDeleteType(""); };
  const confirmDelete = async () => {
    try {
      if (!deleteItem?.id) throw new Error("ID tidak ditemukan");
      if (deleteType === "gedung") {
        await api.delete(`/api/buildings/${deleteItem.id}`);
        showToast("Gedung berhasil dihapus");
      } else if (deleteType === "ruangan") {
        await api.delete(`/api/rooms/${deleteItem.id}`);
        showToast("Ruangan berhasil dihapus");
      } else if (deleteType === "jenis") {
        await api.delete(`/api/categories/${deleteItem.id}`);
        showToast("Jenis masalah berhasil dihapus");
      }
      closeDelete();
      fetchData();
    } catch (err: any) {
      showToast(err.response?.data?.message || err.message || "Gagal menghapus data");
    }
  };

  // MODAL TOGGLE USER
  const [showToggleModal, setShowToggleModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserItem | null>(null);

  const openToggleModal = (user: UserItem) => { setSelectedUser(user); setShowToggleModal(true); };
  const closeToggleModal = () => { setShowToggleModal(false); setSelectedUser(null); };
  const confirmToggle = async () => {
    if (!selectedUser?.id) return;
    try {
      await api.patch(`/api/users/${selectedUser.id}/status`);
      showToast(`Status akun berhasil diubah`);
      closeToggleModal();
      fetchData();
    } catch (err: any) {
      showToast(err.response?.data?.message || err.message || "Gagal mengubah status pengguna");
    }
  };

  // MODAL EDIT
  const [showEditModal, setShowEditModal] = useState(false);
  const [editItem, setEditItem] = useState<any>(null);
  const [editType, setEditType] = useState("");

  const openEdit = (item: any, type: string) => { setEditItem(item); setEditType(type); setShowEditModal(true); };
  const closeEdit = () => { setShowEditModal(false); setEditItem(null); setEditType(""); };
  const handleEditChange = (field: string, value: any) => { setEditItem((prev: any) => ({ ...prev, [field]: value })); };
  const confirmEdit = async () => {
    try {
      if (!editItem?.id) throw new Error("ID tidak ditemukan");
      if (editType === "gedung") {
        await api.put(`/api/buildings/${editItem.id}`, { name: editItem.nama });
        showToast("Gedung berhasil diperbarui");
      } else if (editType === "ruangan") {
        await api.put(`/api/rooms/${editItem.id}`, { name: editItem.nama, buildingId: editItem.buildingId || editItem.gedung, floor: editItem.floor || 1 });
        showToast("Ruangan berhasil diperbarui");
      } else if (editType === "jenis") {
        await api.put(`/api/categories/${editItem.id}`, { name: editItem.nama });
        showToast("Jenis masalah berhasil diperbarui");
      } else if (editType === "user" || editType === "admin") {
        await api.put(`/api/users/${editItem.id}`, { name: editItem.nama, email: editItem.email });
        showToast("Data pengguna berhasil diperbarui");
      }
      closeEdit();
      fetchData();
    } catch (err: any) {
      showToast(err.response?.data?.message || err.message || "Gagal memperbarui data");
    }
  };

  // PAGINATION
  const itemsPerPage = 7;
  const [page, setPage] = useState(1);
  const startIndex = (page - 1) * itemsPerPage;

  const filteredUsers = userTab === "admin"
    ? admins
    : users.filter((u) => String(u.role || "").toLowerCase() === String(userTab || "").toLowerCase());

  const currentRuangan = ruangan.slice(startIndex, startIndex + itemsPerPage);
  const currentMasalah = jenisMasalah.slice(startIndex, startIndex + itemsPerPage);
  const currentUsers = filteredUsers.slice(startIndex, startIndex + itemsPerPage);

  // ✅ totalPages dan totalItems dihitung berdasarkan tab yang aktif
  const totalItems =
    mainTab === "pengguna" ? filteredUsers.length :
      mainTab === "jenis" ? jenisMasalah.length :
        mode === "ruangan" ? ruangan.length : 0;

  const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;

  const goPrev = () => page > 1 && setPage(page - 1);
  const goNext = () => page < totalPages && setPage(page + 1);

  const toggleStatus = (index: number) => { openToggleModal(currentUsers[index]); };

  return (
    <div className="space-y-6">
      <Toast toasts={toasts} removeToast={removeToast} />
      <Header />
      <MainTab mainTab={mainTab} setMainTab={setMainTab} setPage={setPage} />

      <div className="bg-white p-4 rounded-xl shadow-lg">
        {mainTab === "fasilitas" && <SubTabFasilitas mode={mode} setMode={setMode} setPage={setPage} onTambah={openTambah} />}
        {mainTab === "jenis" && (
          <div className="flex justify-end mb-4">
            <button onClick={() => openTambah("jenis")} className="bg-green-700 text-white px-4 py-2 rounded flex gap-2 text-sm hover:bg-green-800 transition-all">
              <Plus size={16} />Tambah Jenis Masalah
            </button>
          </div>
        )}
        {mainTab === "pengguna" && <SubTabUser userTab={userTab} setUserTab={setUserTab} setPage={setPage} onTambah={openTambah} />}

        <TableManajemen
          mainTab={mainTab} mode={mode} gedung={gedung}
          currentRuangan={currentRuangan} currentMasalah={currentMasalah}
          currentUsers={currentUsers} startIndex={startIndex}
          openEdit={openEdit} openDelete={openDelete}
          toggleStatus={toggleStatus} onTambah={openTambah} userTab={userTab}
        />

        {(mainTab !== "fasilitas" || mode === "ruangan") && (
          <PaginationManajemen
            mainTab={mainTab}
            mode={mode}
            startIndex={startIndex}
            itemsPerPage={itemsPerPage}
            page={page}
            setPage={setPage}
            goPrev={goPrev}
            goNext={goNext}
            totalPages={totalPages}
            totalItems={totalItems}
          />
        )}
      </div>

      <DeleteModal show={showDeleteModal} deleteItem={deleteItem} deleteType={deleteType} onClose={closeDelete} onConfirm={confirmDelete} />
      <ToggleUserModal show={showToggleModal} user={selectedUser} onClose={closeToggleModal} onConfirm={confirmToggle} />
      <EditModal show={showEditModal} editItem={editItem} editType={editType} onClose={closeEdit} onChange={handleEditChange} onConfirm={confirmEdit} gedungList={gedung} />
      <TambahModal show={showTambahModal} type={tambahType} onClose={closeTambah} onConfirm={confirmTambah} gedungList={gedung} />
    </div>
  );
}
