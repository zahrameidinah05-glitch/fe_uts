import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

// Langsung tentukan URL backend di sini agar tidak pusing
const BACKEND_URL = "https://be-lctq.vercel.app";

export const PembicaraEdit = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    job: "", // Pastikan nama field ini sama dengan di database/backend kamu
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);

  // 1. Ambil data langsung saat halaman dibuka
  useEffect(() => {
    if (!id) return;

    fetch(`${BACKEND_URL}/pembicara/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Gagal ambil data");
        return res.json();
      })
      .then((data) => {
        setFormData({
          name: data.name,
          job: data.job, // Sesuaikan dengan kolom database kamu
        });
        setIsFetching(false);
      })
      .catch((err) => {
        console.error(err);
        alert("Gagal memuat data.");
        navigate("/dashboard/pembicara");
      });
  }, [id, navigate]);

  // 2. Fungsi simpan perubahan
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch(`${BACKEND_URL}/pembicara/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Data berhasil diupdate!");
        navigate("/dashboard/pembicara");
      } else {
        throw new Error("Gagal menyimpan ke server");
      }
    } catch (error) {
      alert("Error: Pastikan backend https://be-lctq.vercel.app aktif.");
    } finally {
      setIsLoading(false);
    }
  };

  if (isFetching) return <div className="p-10 text-center">Memuat data...</div>;

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