import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore"; 
import Input from "../../component/ui/Input"; 

const categorySchema = z.object({
  name: z.string().min(3, "Nama kategori minimal 3 karakter"),
});

type CategoryFormData = z.infer<typeof categorySchema>;

export default function CategoryCreate() {
  const navigate = useNavigate();
  const createCategory = useAuthStore((s) => s.createCategory);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CategoryFormData>({
    resolver: zodResolver(categorySchema),
  });

  const onSubmit = async (data: CategoryFormData) => {
    const sukses = await createCategory(data.name);

    if (sukses) {
      alert("Kategori berhasil dibuat!");
      navigate("/dashboard/kategori"); 
    } else {
      alert("Gagal membuat kategori, silakan coba lagi.");
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 border border-gray-100 rounded-xl shadow-sm bg-white">
      <h1 className="text-2xl font-bold mb-2 text-[#1a0a10]">Tambah Kategori Event</h1>
      <p className="text-sm text-gray-500 mb-6">
        Digunakan untuk mengelompokkan event seperti Seminar, Workshop, dll.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
        <Input
          label="Nama Kategori"
          name="name"
          register={register}
          error={errors.name?.message}
          placeholder="Contoh: Seminar"
        />

        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-[#7B1D3F] text-white py-2.5 rounded-lg hover:bg-[#9e2550] transition font-semibold mt-4 shadow-sm disabled:opacity-50 cursor-pointer text-sm"
        >
          {isSubmitting ? "Menyimpan..." : "Simpan Kategori"}
        </button>
      </form>
    </div>
  );
}