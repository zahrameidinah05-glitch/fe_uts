import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore"; // Jalur folder diperbaiki
import Input from "../../component/ui/Input"; // Jalur folder diperbaiki

// Skema Zod disesuaikan dengan tabel Event di Supabase + Backend Express
const eventSchema = z.object({
  name: z.string().min(3, "Nama event minimal 3 karakter"),
  location: z.string().min(3, "Lokasi minimal 3 karakter"),
  dateEvent: z.string().min(1, "Tanggal event wajib diisi"),
  description: z.string().min(5, "Deskripsi minimal 5 karakter"),
  categoryId: z.string().min(1, "Kategori wajib dipilih"),
});

type EventFormData = z.infer<typeof eventSchema>;

// Menentukan tipe data objek kategori agar tidak terkena eror implicit 'any'
interface CategoryItem {
  id: string;
  name: string;
}

export default function EventCreate() {
  const navigate = useNavigate();

  // Mengambil fungsi buat event dan list kategori dari Zustand store
  const createEvent = useAuthStore((s: any) => s.createEvent);
  const categories = useAuthStore((s: any) => s.categories);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<EventFormData>({
    resolver: zodResolver(eventSchema),
  });

  const onSubmit = async (data: EventFormData) => {
    // Menyisipkan speakerId kosong/default agar useAuthStore memenuhi kriteria type
    const payload = {
      ...data,
      speakerId: "",
    };

    const sukses = await createEvent(payload);

    if (sukses) {
      alert("Event berhasil ditambahkan!");
      navigate("/dashboard/event"); // Redirect otomatis kembali ke tabel list event
    } else {
      alert("Gagal menambahkan event, silakan coba lagi.");
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 border border-gray-100 rounded-xl shadow-sm bg-white">
      {/* Header Form */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#1a0a10]">Tambah Event</h1>
        <p className="text-sm text-gray-500 mt-1">Masukkan informasi lengkap mengenai event Invofest baru.</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">

        {/* Input Nama Event */}
        <Input
          label="Nama Event"
          name="name"
          register={register}
          error={errors.name?.message}
          placeholder="Contoh: Web Development Competition / Seminar Nasional"
        />

        {/* Input Pilihan Kategori (Dropdown/Select) */}
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-semibold text-gray-700">Kategori Event</label>
          <select
            {...register("categoryId")}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7B1D3F] text-sm"
          >
            <option value="">-- Pilih Kategori --</option>
            {categories.map((cat: CategoryItem) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
          {errors.categoryId && (
            <p className="text-xs text-red-500 mt-0.5">{errors.categoryId.message}</p>
          )}
        </div>

        {/* Input Lokasi */}
        <Input
          label="Lokasi Tempat"
          name="location"
          register={register}
          error={errors.location?.message}
          placeholder="Contoh: Aula Gedung C Kampus Poltek Harber"
        />

        {/* Input Tanggal Event */}
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-semibold text-gray-700">Tanggal Pelaksanaan</label>
          <input
            type="date"
            {...register("dateEvent")}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7B1D3F] text-sm"
          />
          {errors.dateEvent && (
            <p className="text-xs text-red-500 mt-0.5">{errors.dateEvent.message}</p>
          )}
        </div>

        {/* Input Deskripsi Event */}
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-semibold text-gray-700">Deskripsi Event</label>
          <textarea
            {...register("description")}
            rows={4}
            placeholder="Jelaskan detail jalannya acara di sini..."
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7B1D3F] text-sm resize-none"
          />
          {errors.description && (
            <p className="text-xs text-red-500 mt-0.5">{errors.description.message}</p>
          )}
        </div>

        {/* Tombol Simpan warna Maroon khas tema INVOFEST */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-[#7B1D3F] text-white py-2.5 rounded-lg hover:bg-[#9e2550] transition font-semibold mt-2 shadow-sm disabled:opacity-50 cursor-pointer text-sm"
        >
          {isSubmitting ? "Menyimpan..." : "Simpan Event Baru"}
        </button>
      </form>
    </div>
  );
}