import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

// URL Backend Vercel kamu
const BACKEND_URL = "https://be-lctq.vercel.app";

export default function CategoryEdit() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);

  // 1. AMBIL DATA DARI BACKEND
  useEffect(() => {
    const fetchCategoryData = async () => {
      try {
        const response = await fetch(`${BACKEND_URL}/categories/${id}`);
        if (!response.ok) throw new Error("Gagal mengambil data");
        
        const data = await response.json();
        setName(data.name);
      } catch (error) {
        console.error(error);
        alert("Gagal memuat data. Pastikan backend aktif.");
        navigate("/dashboard/kategori");
      } finally {
        setIsFetching(false);
      }
    };

    if (id) fetchCategoryData();
  }, [id, navigate]);

  // 2. KIRIM PERUBAHAN KE BACKEND
  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return alert("Nama kategori tidak boleh kosong!");

    setIsLoading(true);
    try {
      const response = await fetch(`${BACKEND_URL}/categories/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      });

      if (!response.ok) throw new Error("Gagal mengupdate database");

      alert("Kategori berhasil diperbarui!");
      navigate("/dashboard/kategori");
    } catch (error) {
      alert("Gagal memperbarui kategori, silakan coba lagi.");
    } finally {
      setIsLoading(false);
    }
  };

  if (isFetching) {
    return <div className="flex justify-center items-center h-48 text-gray-500">Memuat data...</div>;
  }

  return (
    <div className="w-full max-w-xl mx-auto bg-white p-8 rounded-xl shadow-md border border-slate-100 mt-10">
      <h1 className="text-2xl font-bold text-[#7B1D3F] mb-6">Edit Kategori</h1>
      
      <form onSubmit={handleUpdate} className="space-y-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Nama Kategori</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#7B1D3F] outline-none transition-all"
            required
          />
        </div>

        <div className="flex gap-4 pt-2">
          <button
            type="submit"
            disabled={isLoading}
            className="flex-1 bg-[#7B1D3F] text-white py-3 rounded-lg font-bold hover:bg-[#5a1530] transition-all disabled:bg-gray-300"
          >
            {isLoading ? "Menyimpan..." : "Simpan Perubahan"}
          </button>
          <button
            type="button"
            onClick={() => navigate("/dashboard/kategori")}
            className="flex-1 bg-white text-gray-700 py-3 rounded-lg font-semibold border border-gray-300 hover:bg-gray-50 transition-all"
          >
            Batal
          </button>
        </div>
      </form>
    </div>
  );
}