import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore"; // 1. Impor store tunggalmu

export default function EventIndex() {
  const navigate = useNavigate();

  // 2. Ambil data global events, categories, status loading, dan aksi dari store
  const events = useAuthStore((s) => s.events);
  const categories = useAuthStore((s) => s.categories); // Ditambahkan untuk pencocokan kategori
  const isLoading = useAuthStore((s) => s.isLoading);
  const deleteEvent = useAuthStore((s) => s.deleteEvent);

  // 3. Otomatis tarik data event dan kategori dari database cloud Supabase setiap halaman dibuka
  useEffect(() => {
    useAuthStore.getState().fetchEvents();
    useAuthStore.getState().fetchCategories(); // Pastikan list kategori ikut ditarik ke frontend
  }, []);

  const handleDelete = async (id: string, name: string) => {
    if (confirm(`Apakah kamu yakin ingin menghapus event "${name}"?`)) {
      const sukses = await deleteEvent(id);
      if (!sukses) {
        alert("Gagal menghapus data event!");
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
          <h1 className="text-2xl font-bold text-[#1a0a10] tracking-tight">Event</h1>
          <p className="text-sm text-gray-400 mt-1">Kelola semua event Invofest</p>
        </div>

        <Link
          to="/dashboard/event/create"
          className="flex items-center gap-1.5 bg-[#7B1D3F] hover:bg-[#9e2550] text-white text-sm font-semibold px-4 py-2.5 rounded-lg transition-colors shadow-sm"
        >
          <span className="text-base leading-none">+</span>
          Tambah Event
        </Link>
      </div>

      {/* TABLE CARD */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                {["No", "Nama Event", "Kategori", "Tanggal", "Aksi"].map((h) => (
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
              {events.map((item, index) => (
                <tr
                  key={item.id}
                  className="border-b border-gray-50 hover:bg-rose-50/40 transition-colors"
                >
                  <td className="px-4 py-3.5 text-sm text-gray-300 w-10">{index + 1}</td>

                  <td className="px-4 py-3.5 text-sm font-semibold text-[#1a0a10]">
                    {item.name}
                  </td>

                  <td className="px-4 py-3.5">
                    <span className="text-xs font-medium bg-rose-50 text-[#7B1D3F] px-2.5 py-1 rounded-full">
                      {/* FIX UTAMA: Mencari nama kategori berdasarkan id yang cocok antara tabel kategori dan event */}
                      {
                        categories.find((cat: any) => String(cat.id) === String(item.categoryId))?.name || "Belum Dikategorikan"
                      }
                    </span>
                  </td>

                  <td className="px-4 py-3.5 text-sm text-gray-500">
                    {item.dateEvent ? new Date(item.dateEvent).toLocaleDateString("id-ID", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    }) : "-"}
                  </td>

                  <td className="px-4 py-3.5">
                    <div className="flex gap-2">
                      <button 
                        onClick={() => navigate(`/dashboard/event/edit/${item.id}`)}
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
        </div>

        {/* Empty state & Loading State handler */}
        {isLoading ? (
          <div className="text-center py-10 text-xs text-gray-400 font-medium">
            Sinkronisasi database Supabase...
          </div>
        ) : events.length === 0 && (
          <div className="flex flex-col items-center justify-center py-14 gap-2 bg-white">
            <span className="text-3xl">📅</span>
            <p className="text-sm text-gray-400 font-medium">Belum ada data event</p>
            <p className="text-xs text-gray-300">Buat event pertama kamu sekarang</p>
          </div>
        )}

        {/* Footer Info */}
        <div className="px-4 py-3 border-t border-gray-50 bg-gray-50/30">
          <span className="text-xs text-gray-400">
            Menampilkan <b>{events.length}</b> event terdaftar
          </span>
        </div>
      </div>
    </div>
  );
}