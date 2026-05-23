import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const BACKEND_URL = "https://be-lctq.vercel.app";

export const EventEdit = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    location: "",
    description: "",
    categoryId: "",
    speakerId: "",
    dateEvent: "",
  });
  const [categories, setCategories] = useState<any[]>([]);
  const [speakers, setSpeakers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // 1. Ambil data awal (Event, Kategori, Pembicara)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [evRes, catRes, spkRes] = await Promise.all([
          fetch(`${BACKEND_URL}/events/${id}`),
          fetch(`${BACKEND_URL}/categories`),
          fetch(`${BACKEND_URL}/speakers`),
        ]);
        
        const eventData = await evRes.json();
        setCategories(await catRes.json());
        setSpeakers(await spkRes.json());

        setFormData({
          name: eventData.name,
          location: eventData.location || "",
          description: eventData.description || "",
          categoryId: eventData.categoryId || "",
          speakerId: eventData.speakerId || "",
          dateEvent: eventData.dateEvent ? eventData.dateEvent.split("T")[0] : "",
        });
      } catch (err) {
        console.error("Gagal memuat data", err);
      }
    };
    if (id) fetchData();
  }, [id]);

  // 2. Fungsi simpan perubahan
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch(`${BACKEND_URL}/events/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Event berhasil diupdate!");
        navigate("/dashboard/event");
      } else {
        alert("Gagal mengupdate event.");
      }
    } catch (err) {
      alert("Error koneksi backend.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
      <h2 className="text-2xl font-bold mb-6 text-[#7B1D3F]">Edit Event</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Nama Event</label>
          <input className="w-full p-2 border rounded" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} required />
        </div>
        
        {/* Dropdown Kategori */}
        <div>
          <label className="block text-sm font-medium">Kategori</label>
          <select className="w-full p-2 border rounded" value={formData.categoryId} onChange={(e) => setFormData({...formData, categoryId: e.target.value})} required>
            <option value="">Pilih Kategori</option>
            {categories.map((cat) => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
          </select>
        </div>

        {/* Dropdown Pembicara */}
        <div>
          <label className="block text-sm font-medium">Pembicara</label>
          <select className="w-full p-2 border rounded" value={formData.speakerId} onChange={(e) => setFormData({...formData, speakerId: e.target.value})} required>
            <option value="">Pilih Pembicara</option>
            {speakers.map((spk) => <option key={spk.id} value={spk.id}>{spk.name}</option>)}
          </select>
        </div>

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