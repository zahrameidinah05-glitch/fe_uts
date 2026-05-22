import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore"; // Sesuaikan path-nya

export const EventEdit = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { events, categories, speakers, fetchCategories, fetchSpeakers, updateEvent } = useAuthStore();

  const [formData, setFormData] = useState({
    name: "",
    location: "",
    description: "",
    categoryId: "",
    speakerId: "",
    dateEvent: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  // 1. Ambil data event dari store berdasarkan ID
  const eventLama = events?.find((e) => String(e.id) === String(id));

  useEffect(() => {
    fetchCategories();
    fetchSpeakers();
    
    if (eventLama) {
      setFormData({
        name: eventLama.name,
        location: eventLama.location || "",
        description: eventLama.description || "",
        categoryId: eventLama.categoryId || "",
        speakerId: eventLama.speakerId || "",
        dateEvent: eventLama.dateEvent ? eventLama.dateEvent.split("T")[0] : "",
      });
    }
  }, [eventLama, fetchCategories, fetchSpeakers]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) return;
    
    setIsLoading(true);
    const sukses = await updateEvent(id, formData as any);
    setIsLoading(false);

    if (sukses) {
      alert("Event berhasil diupdate!");
      navigate("/dashboard/event"); // Sesuaikan route-mu
    } else {
      alert("Gagal mengupdate event. Cek koneksi backend.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
      <h2 className="text-2xl font-bold mb-6 text-[#7B1D3F]">Edit Event</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        
        {/* Input Nama */}
        <div>
          <label className="block text-sm font-medium">Nama Event</label>
          <input className="w-full p-2 border rounded" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} required />
        </div>

        {/* Dropdown Kategori (Dinamis) */}
        <div>
          <label className="block text-sm font-medium">Kategori</label>
          <select className="w-full p-2 border rounded" value={formData.categoryId} onChange={(e) => setFormData({...formData, categoryId: e.target.value})} required>
            <option value="">Pilih Kategori</option>
            {categories.map((cat) => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
          </select>
        </div>

        {/* Dropdown Pembicara (Dinamis) */}
        <div>
          <label className="block text-sm font-medium">Pembicara</label>
          <select className="w-full p-2 border rounded" value={formData.speakerId} onChange={(e) => setFormData({...formData, speakerId: e.target.value})} required>
            <option value="">Pilih Pembicara</option>
            {speakers.map((spk) => <option key={spk.id} value={spk.id}>{spk.name}</option>)}
          </select>
        </div>

        {/* Input Tanggal */}
        <div>
          <label className="block text-sm font-medium">Tanggal</label>
          <input type="date" className="w-full p-2 border rounded" value={formData.dateEvent} onChange={(e) => setFormData({...formData, dateEvent: e.target.value})} required />
        </div>

        <button type="submit" disabled={isLoading} className="w-full bg-[#7B1D3F] text-white py-2 rounded hover:bg-[#5a1530]">
          {isLoading ? "Menyimpan..." : "Simpan Perubahan"}
        </button>
      </form>
    </div>
  );
};