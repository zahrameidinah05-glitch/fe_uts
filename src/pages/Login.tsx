import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "./store/useAuthStore"; 
import Input from "../component/ui/Input";

// 1. Ubah tipe data menjadi nim
type FormData = {
  nim: string;
  password: string;
};

// 2. Update schema validasi
const schema = z.object({
  nim: z.string().min(1, "NIM harus diisi"),
  password: z.string().min(1, "Password harus diisi"),
});

export default function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate(); 
  const login = useAuthStore((state) => state.login);

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    
    // 3. Langsung panggil fungsi login dari zustand (ke backend)
    // Tidak perlu lagi if-else untuk email/password hardcoded!
    const success = await login(data.nim, data.password);
    
    setIsLoading(false);
    
    if (success) {
      alert("Login Berhasil!");
      navigate("/dashboard"); 
    } else {
      alert("NIM atau password salah! Silakan coba lagi.");
    }
  };

  return (
    <div className="w-full flex flex-col items-center">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-[#7B1D3F]">Selamat Datang!</h1>
        <p className="text-gray-400 mt-3 text-base">Silakan login menggunakan NIM</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-6" noValidate>
        {/* Pastikan name="nim" sesuai dengan register data */}
        <Input 
          label="NIM" 
          name="nim" 
          register={register} 
          error={errors.nim?.message}
          placeholder="Masukkan NIM Anda"
        />

        <Input 
          label="Password" 
          name="password" 
          type="password" 
          register={register} 
          error={errors.password?.message}
          placeholder="........"
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