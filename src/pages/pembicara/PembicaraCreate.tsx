import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore"; // Impor store milikmu
import Input from "../../component/ui/Input"; // Komponen UI bawaan tetap aman

// Skema Zod disamakan dengan struktur tabel Supabase (hanya butuh name dan job)
const pembicaraSchema = z.object({
  name: z.string().min(3, "Nama minimal 3 karakter"),
  job: z.string().min(3, "Pekerjaan minimal 3 karakter"),
});

type PembicaraFormData = z.infer<typeof pembicaraSchema>;

export default function PembicaraCreate() {
  const navigate = useNavigate();
  const createSpeaker = useAuthStore((s) => s.createSpeaker);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<PembicaraFormData>({
    resolver: zodResolver(pembicaraSchema),
  });

  const onSubmit = async (data: PembicaraFormData) => {
    // Mengirim objek data { name, job } langsung ke backend Express -> Supabase via Zustand
    const sukses = await createSpeaker(data);

    if (sukses) {
      alert("Pembicara berhasil ditambahkan!");
      navigate("/dashboard/pembicara"); // Redirect otomatis kembali ke tabel list pembicara
    } else {
      alert("Gagal menambahkan pembicara, silakan coba lagi.");
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 border border-gray-100 rounded-xl shadow-sm bg-white">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#1a0a10]">Tambah Pembicara</h1>
        <p className="text-sm text-gray-500 mt-1">Masukkan informasi lengkap pembicara event.</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        
        {/* Input Nama Lengkap */}
        <Input
          label="Nama Lengkap"
          name="name"
          register={register}
          error={errors.name?.message}
          placeholder="Contoh: Zahra"
        />

        {/* Input Pekerjaan / Instansi */}
        <Input
          label="Pekerjaan / Instansi"
          name="job"
          register={register}
          error={errors.job?.message}
          placeholder="Contoh: Senior Developer"
        />

        {/* Tombol Simpan warna Maroon khas tema INVOFEST */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-[#7B1D3F] text-white py-2.5 rounded-lg hover:bg-[#9e2550] transition font-semibold mt-2 shadow-sm disabled:opacity-50 cursor-pointer"
        >
          {isSubmitting ? "Menyimpan..." : "Simpan Pembicara"}
        </button>
      </form>
    </div>
  );
}