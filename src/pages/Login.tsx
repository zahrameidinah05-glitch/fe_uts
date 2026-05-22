import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "./store/useAuthStore"; 
import Input from "../component/ui/Input";

const schema = z.object({
  email: z.string().email("Format email tidak valid").min(1, "Email wajib diisi"),
  password: z.string().min(8, "Password minimal 8 karakter"),
});

type FormData = z.infer<typeof schema>;

export default function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate(); 
  const login = useAuthStore((state) => state.login);

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);

    // Pengecekan Statis (Hardcoded)
    if (data.email === "zahrameidinah05@gmail.com" && data.password === "24090001") {
      const success = await login(data.email, data.password);
      setIsLoading(false);
      
      if (success) {
        alert("Login Berhasil!");
        navigate("/dashboard", { replace: true });
      } else {
        alert("Terjadi kesalahan pada server.");
      }
    } else {
      setIsLoading(false);
      alert("Email atau password salah!");
    }
  };

  return (
    <div className="w-full flex flex-col items-center">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-[#7B1D3F]">Selamat Datang!</h1>
        <p className="text-gray-400 mt-3 text-base">Silakan login untuk melanjutkan</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-6" noValidate>
        <Input 
          label="Email (Akun Institusi)" 
          name="email" 
          register={register} 
          error={errors.email?.message}
          placeholder="email@mhs.poltekharber.ac.id"
        />

        <Input 
          label="Password (Minimal 8 karakter)" 
          name="password" 
          type="password" 
          register={register} 
          error={errors.password?.message}
          placeholder="********"
        />

        <div className="pt-2 flex flex-col gap-4">
          <button 
            type="submit" 
            disabled={isLoading}
            className="w-full bg-[#7B1D3F] text-white py-4 rounded-xl font-bold hover:bg-[#5a1530] transition-all disabled:bg-gray-300"
          >
            {isLoading ? "Memproses..." : "Login"}
          </button>
        </div>
      </form>
    </div>
  );
}