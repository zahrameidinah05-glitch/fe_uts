import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore"; // 1. Impor store tunggalmu

function Avatar({ name }: { name: string }) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#7B1D3F] to-[#c9395e] text-white text-xs font-bold flex items-center justify-center">
      {initials}
    </div>
  );
}

export default function PembicaraIndex() {
  const navigate = useNavigate();

  // 2. Ambil data global speakers dan fungsi hapus dari Zustand store
  const speakers = useAuthStore((s) => s.speakers);
  const deleteSpeaker = useAuthStore((s) => s.deleteSpeaker);

  // 3. Tarik data murni pembicara dari database Supabase saat halaman dibuka
  useEffect(() => {
    useAuthStore.getState().fetchSpeakers();
  }, []);

  const handleDelete = async (id: string, name: string) => {
    if (confirm(`Apakah kamu yakin ingin menghapus pembicara "${name}"?`)) {
      const sukses = await deleteSpeaker(id);
      if (!sukses) {
        alert("Gagal menghapus data pembicara!");
      }
    }
  };

  return (
    <div className="px-7 py-8 max-w-5xl mx-auto">

      {/* HEADER */}
      <div className="flex justify-between items-start mb-7">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-4 h-0.5 bg-[#7B1D3F] rounded-full inline-block" />
            <span className="text-[10px] font-semibold text-[#7B1D3F] tracking-widest uppercase">
              Manajemen
            </span>
          </div>
          <h1 className="text-2xl font-bold text-[#1a0a10] tracking-tight">Pembicara</h1>
          <p className="text-sm text-gray-400 mt-1">Kelola pembicara event Invofest</p>
        </div>

        <Link
          to="/dashboard/pembicara/create"
          className="flex items-center gap-1.5 bg-[#7B1D3F] hover:bg-[#9e2550] text-white text-sm font-semibold px-4 py-2.5 rounded-lg transition-colors shadow-sm"
        >
          <span className="text-base leading-none">+</span>
          Tambah Pembicara
        </Link>
      </div>

      {/* TABLE CARD */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100">
              {["No", "Pembicara", "Pekerjaan / Instansi", "Aksi"].map((h) => (
                <th
                  key={h}
                  className="text-[10px] font-semibold uppercase tracking-wider text-gray-400 px-4 py-2.5 text-left whitespace-nowrap"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {speakers.map((item: any, index) => (
              <tr
                key={item.id}
                className="border-b border-gray-50 hover:bg-rose-50/40 transition-colors"
              >
                <td className="px-4 py-3.5 text-sm text-gray-300 w-10">{index + 1}</td>

                <td className="px-4 py-3.5">
                  <div className="flex items-center gap-2.5">
                    <Avatar name={item.name} />
                    <span className="text-sm font-semibold text-[#1a0a10]">{item.name}</span>
                  </div>
                </td>

                <td className="px-4 py-3.5">
                  <span className="text-xs font-medium bg-rose-50 text-[#7B1D3F] px-2.5 py-1 rounded-full">
                    {/* FIX UTAMA: Memanggil properti item.role atau item.job sebagai cadangan data lama */}
                    {item.role || item.job || "-"}
                  </span>
                </td>

                <td className="px-4 py-3.5">
                  <div className="flex gap-2">
                    <button 
                      onClick={() => navigate(`/dashboard/pembicara/edit/${item.id}`)}
                      className="text-xs font-semibold px-3 py-1.5 rounded-md border border-yellow-300 bg-yellow-50 text-yellow-700 hover:bg-yellow-100 transition-colors cursor-pointer"
                    >
                      Edit
                    </button>
                    <button 
                      onClick={() => handleDelete(item.id, item.name)}
                      className="text-xs font-semibold px-3 py-1.5 rounded-md border border-red-200 bg-red-50 text-red-700 hover:bg-red-100 transition-colors cursor-pointer"
                    >
                      Hapus
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Empty state jika database Supabase kosong */}
        {speakers.length === 0 && (
          <div className="flex flex-col items-center justify-center py-14 gap-2 bg-white">
            <span className="text-3xl">🎤</span>
            <p className="text-sm text-gray-400 font-medium">Belum ada data pembicara</p>
            <p className="text-xs text-gray-300">Tambahkan pembicara pertama kamu</p>
          </div>
        )}

        <div className="px-4 py-3 border-t border-gray-50 bg-gray-50/30">
          <span className="text-xs text-gray-400">
            Menampilkan <b>{speakers.length}</b> pembicara terdaftar
          </span>
        </div>
      </div>
    </div>
  );
}