import { useState } from "react";
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

export default function ManajemenView() {

  // ================= TOAST =================
  const { toasts, showToast, removeToast } = useToast();

  // ================= TAB =================
  const [mainTab, setMainTab] = useState("fasilitas");
  const [mode, setMode] = useState("gedung");
  const [userTab, setUserTab] = useState("mahasiswa");

  // ================= MODAL TAMBAH =================
  const [showTambahModal, setShowTambahModal] = useState(false);
  const [tambahType, setTambahType] = useState("");

  const openTambah = (type) => {
    setTambahType(type);
    setShowTambahModal(true);
  };

  const closeTambah = () => {
    setShowTambahModal(false);
    setTambahType("");
  };

  const confirmTambah = (data) => {
    console.log("tambah:", tambahType, data);

    if (tambahType === "gedung") showToast("Gedung berhasil ditambahkan");
    else if (tambahType === "ruangan") showToast("Ruangan berhasil ditambahkan");
    else if (tambahType === "jenis") showToast("Jenis masalah berhasil ditambahkan");
    else if (tambahType === "ob") showToast("Akun OB berhasil dibuat");
    else if (tambahType === "admin") showToast("Akun Admin berhasil dibuat");

    closeTambah();
  };

  // ================= MODAL DELETE =================
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteItem, setDeleteItem] = useState(null);
  const [deleteType, setDeleteType] = useState("");

  const openDelete = (item, type) => {
    setDeleteItem(item);
    setDeleteType(type);
    setShowDeleteModal(true);
  };

  const closeDelete = () => {
    setShowDeleteModal(false);
    setDeleteItem(null);
    setDeleteType("");
  };

  const confirmDelete = () => {
    console.log("hapus:", deleteItem);

    if (deleteType === "gedung") showToast("Gedung berhasil dihapus");
    else if (deleteType === "ruangan") showToast("Ruangan berhasil dihapus");
    else if (deleteType === "jenis") showToast("Jenis masalah berhasil dihapus");

    closeDelete();
  };

  // ================= MODAL TOGGLE USER =================
  const [showToggleModal, setShowToggleModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const openToggleModal = (user) => {
    setSelectedUser(user);
    setShowToggleModal(true);
  };

  const closeToggleModal = () => {
    setShowToggleModal(false);
    setSelectedUser(null);
  };

  const confirmToggle = () => {
    const allUsers = [...users];
    const realIndex = allUsers.findIndex(
      (u) => u.nim === selectedUser.nim || u.email === selectedUser.email
    );

    if (realIndex !== -1) {
      const wasActive = allUsers[realIndex].status;
      allUsers[realIndex].status = !wasActive;
      setUsers(allUsers);

      const role = allUsers[realIndex].role;
      const roleLabel = role === "ob" ? "OB" : role === "admin" ? "Admin" : "Mahasiswa";

      if (wasActive) {
        showToast(`Akun ${roleLabel} berhasil dinonaktifkan`);
      } else {
        showToast(`Akun ${roleLabel} berhasil diaktifkan`);
      }
    }

    closeToggleModal();
  };

  // ================= MODAL EDIT =================
  const [showEditModal, setShowEditModal] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [editType, setEditType] = useState("");

  const openEdit = (item, type) => {
    setEditItem(item);
    setEditType(type);
    setShowEditModal(true);
  };

  const closeEdit = () => {
    setShowEditModal(false);
    setEditItem(null);
    setEditType("");
  };

  const handleEditChange = (field, value) => {
    setEditItem((prev) => ({ ...prev, [field]: value }));
  };

  const confirmEdit = () => {
    console.log("update:", editItem);

    if (editType === "gedung") showToast("Gedung berhasil diperbarui");
    else if (editType === "ruangan") showToast("Ruangan berhasil diperbarui");
    else if (editType === "jenis") showToast("Jenis masalah berhasil diperbarui");
    else if (editType === "user") {
      // cek role dari editItem
      const role = editItem?.role;
      if (role === "ob") showToast("Akun OB berhasil diperbarui");
      else if (role === "admin") showToast("Akun Admin berhasil diperbarui");
      else showToast("Data pengguna berhasil diperbarui");
    } else if (editType === "admin") showToast("Akun Admin berhasil diperbarui");

    closeEdit();
  };

  // ================= DATA =================
  const gedung = [
    { nama: "Gedung Ki Hajar Dewantara", ruang: 18 },
    { nama: "Gedung Dewi Sartika", ruang: 12 }, //hapus jika empty
  ];

  const ruangan = Array.from({ length: 20 }, (_, i) => ({
    nama: `FIKLAB-${200 + i}`,
    gedung: i % 2 === 0 ? "Gedung Ki Hajar Dewantara" : "Gedung Dewi Sartika",
  }));

  const jenisMasalah = Array.from({ length: 20 }, (_, i) => ({
    nama: `Masalah ${i + 1}`,
  }));

  const [users, setUsers] = useState(
    Array.from({ length: 20 }, (_, i) => ({
      nama: "John Doe",
      email: `24105120${i}@mahasiswa.upnvj.ac.id`,
      nim: `24105120${i}`,
      role: i % 2 === 0 ? "mahasiswa" : "ob",
      status: i === 6 ? false : true,
    }))
  );

  // Data Admin terpisah
  const [admins, setAdmins] = useState(
    Array.from({ length: 8 }, (_, i) => ({
      nama: "admin",
      email: `admin@upnvj.ac.id`,
      role: "admin",
      status: i === 6 ? false : true,
    }))
  );

  // ================= PAGINATION =================
  const itemsPerPage = 7;
  const [page, setPage] = useState(1);
  const startIndex = (page - 1) * itemsPerPage;

  const filteredUsers = userTab === "admin"
    ? admins
    : users.filter((u) => u.role === userTab);

  const currentRuangan = ruangan.slice(startIndex, startIndex + itemsPerPage);
  const currentMasalah = jenisMasalah.slice(startIndex, startIndex + itemsPerPage);
  const currentUsers = filteredUsers.slice(startIndex, startIndex + itemsPerPage);

  const totalPages = 3;
  const goPrev = () => page > 1 && setPage(page - 1);
  const goNext = () => page < totalPages && setPage(page + 1);

  // ================= TOGGLE USER =================
  const toggleStatus = (index) => {
    openToggleModal(currentUsers[index]);
  };

  return (
    <div className="space-y-6">

      {/* TOAST */}
      <Toast toasts={toasts} removeToast={removeToast} />

      <Header />

      {/* MAIN TAB */}
      <MainTab mainTab={mainTab} setMainTab={setMainTab} setPage={setPage} />

      {/* CARD */}
      <div className="bg-white p-4 rounded-xl shadow-lg">

        {/* SUB TAB FASILITAS */}
        {mainTab === "fasilitas" && (
          <SubTabFasilitas
            mode={mode}
            setMode={setMode}
            setPage={setPage}
            onTambah={openTambah}
          />
        )}

        {/* SUB TAB JENIS MASALAH - tombol tambah */}
        {mainTab === "jenis" && (
          <div className="flex justify-end mb-4">
            <button
              onClick={() => openTambah("jenis")}
              className="bg-green-700 text-white px-4 py-2 rounded flex gap-2 text-sm hover:bg-green-800 transition-all"
            >
              <Plus size={16} />
              Tambah Jenis Masalah
            </button>
          </div>
        )}

        {/* SUB TAB PENGGUNA */}
        {mainTab === "pengguna" && (
          <SubTabUser
            userTab={userTab}
            setUserTab={setUserTab}
            setPage={setPage}
            onTambah={openTambah}
          />
        )}

        {/* TABLE */}
        <TableManajemen
          mainTab={mainTab}
          mode={mode}
          gedung={gedung}
          currentRuangan={currentRuangan}
          currentMasalah={currentMasalah}
          currentUsers={currentUsers}
          startIndex={startIndex}
          openEdit={openEdit}
          openDelete={openDelete}
          toggleStatus={toggleStatus}
          onTambah={openTambah}
          userTab={userTab}
        />

        {/* PAGINATION */}
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
          />
        )}
      </div>

      {/* MODALS */}
      <DeleteModal
        show={showDeleteModal}
        deleteItem={deleteItem}
        deleteType={deleteType}
        onClose={closeDelete}
        onConfirm={confirmDelete}
      />
      <ToggleUserModal
        show={showToggleModal}
        user={selectedUser}
        onClose={closeToggleModal}
        onConfirm={confirmToggle}
      />
      <EditModal
        show={showEditModal}
        editItem={editItem}
        editType={editType}
        onClose={closeEdit}
        onChange={handleEditChange}
        onConfirm={confirmEdit}
        gedungList={gedung}
      />
      <TambahModal
        show={showTambahModal}
        type={tambahType}
        onClose={closeTambah}
        onConfirm={confirmTambah}
        gedungList={gedung}
      />
    </div>
  );
}
