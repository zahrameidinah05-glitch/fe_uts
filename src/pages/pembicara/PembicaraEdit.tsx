import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore"; // Sesuaikan path ini

export const PembicaraEdit = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { speakers, updateSpeaker, fetchSpeakers } = useAuthStore();

  const [formData, setFormData] = useState({
    name: "",
    job: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  // 1. Cari data pembicara yang mau diedit berdasarkan ID dari URL
  const pembicaraLama = speakers?.find((s) => String(s.id) === String(id));

  useEffect(() => {
    fetchSpeakers(); // Memastikan data pembicara terbaru ada di store
    if (pembicaraLama) {
      setFormData({
        name: pembicaraLama.name,
        job: pembicaraLama.job,
      });
    }
  }, [pembicaraLama, fetchSpeakers]);

  // 2. Fungsi simpan perubahan
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) return;
    
    setIsLoading(true);
    const sukses = await updateSpeaker(id, formData);
    setIsLoading(false);

    if (sukses) {
      alert("Data pembicara berhasil diupdate!");
      navigate("/dashboard/pembicara"); // Pastikan path ini benar
    } else {
      alert("Gagal update data pembicara. Cek koneksi backend.");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
      <h2 className="text-2xl font-bold mb-6 text-[#7B1D3F]">Edit Pembicara</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Nama Pembicara</label>
          <input 
            type="text"
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#7B1D3F] outline-none" 
            value={formData.name} 
            onChange={(e) => setFormData({...formData, name: e.target.value})} 
            required 
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Pekerjaan / Jabatan</label>
          <input 
            type="text"
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#7B1D3F] outline-none" 
            value={formData.job} 
            onChange={(e) => setFormData({...formData, job: e.target.value})} 
            required 
          />
        </div>
        <button 
          type="submit" 
          disabled={isLoading} 
          className="w-full bg-[#7B1D3F] text-white py-3 rounded-lg font-bold hover:bg-[#5a1530] transition-all disabled:bg-gray-400"
        >
          {isLoading ? "Menyimpan..." : "Simpan Perubahan"}
        </button>
      </form>
    </div>
  );
};