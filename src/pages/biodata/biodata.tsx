import React from "react";
import {
  User,
  Mail,
  Phone,
  MapPin,
  GraduationCap,
  BookUser,
  School,
  Globe,
} from "lucide-react";

interface StudentBiodata {
  nama: string;
  status: string;
  nim: string;
  alamat: string;
  email: string;
  universitas: string;
  telepon: string;
  prodi: string;
  github: string;
  vercel: string;
}

export default function Biodata() {
  const dataMahasiswa: StudentBiodata = {
    nama: "Zahra Meidinah Tahsya",
    status: "Mahasiswa TI Semester 4",
    nim: "24090001",
    alamat: "Kaligangsa Kulon, Brebes, Jawa Tengah",
    email: "zahrameidinah05@gmail.com",
    universitas: "Universitas Harkat Negeri",
    telepon: "0896-7316-9299",
    prodi: "D4 Teknik Informatika",
    github: "https://github.com/zahrameidinah05-glitch",
    vercel: "https://vercel.com/zahrameidinah05-7409s-projects",
  };

  return (
    <div className="min-h-[80vh] bg-gray-50 p-6 flex justify-center items-start">
      {/* CARD UTAMA */}
      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
        
        {/* TOP SECTION (BANNER MAROON) */}
        <div className="bg-gradient-to-r from-[#7A1C3D] to-[#A52A5A] px-10 py-10 flex flex-col md:flex-row items-center gap-6">
          {/* PHOTO BOX / AVATAR */}
          <div className="w-28 h-28 rounded-full bg-white flex items-center justify-center shadow-lg shrink-0">
            <User size={55} className="text-[#7A1C3D]" />
          </div>

          {/* NAME & STATUS */}
          <div className="text-white text-center md:text-left">
            <h1 className="text-3xl font-bold tracking-tight">
              {dataMahasiswa.nama}
            </h1>
            <p className="text-rose-100/90 text-lg mt-1 font-medium">
              {dataMahasiswa.status}
            </p>
          </div>
        </div>

        {/* CONTENT SECTION (BIODATA GRID) */}
        <div className="p-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-8">
            
            {/* NIM */}
            <div className="flex items-start gap-4 border-b border-gray-200 pb-5">
              <div className="p-2.5 bg-rose-50 rounded-xl text-[#7A1C3D] shrink-0">
                <BookUser size={22} />
              </div>
              <div>
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">NIM</h3>
                <p className="text-gray-800 font-semibold text-base mt-0.5">{dataMahasiswa.nim}</p>
              </div>
            </div>

            {/* ALAMAT */}
            <div className="flex items-start gap-4 border-b border-gray-200 pb-5">
              <div className="p-2.5 bg-rose-50 rounded-xl text-[#7A1C3D] shrink-0">
                <MapPin size={22} />
              </div>
              <div>
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Alamat</h3>
                <p className="text-gray-800 font-semibold text-base mt-0.5">{dataMahasiswa.alamat}</p>
              </div>
            </div>

            {/* EMAIL */}
            <div className="flex items-start gap-4 border-b border-gray-200 pb-5">
              <div className="p-2.5 bg-rose-50 rounded-xl text-[#7A1C3D] shrink-0">
                <Mail size={22} />
              </div>
              <div>
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Email</h3>
                <p className="text-gray-800 font-semibold text-base mt-0.5">{dataMahasiswa.email}</p>
              </div>
            </div>

            {/* UNIVERSITAS */}
            <div className="flex items-start gap-4 border-b border-gray-200 pb-5">
              <div className="p-2.5 bg-rose-50 rounded-xl text-[#7A1C3D] shrink-0">
                <School size={22} />
              </div>
              <div>
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Universitas</h3>
                <p className="text-gray-800 font-semibold text-base mt-0.5">{dataMahasiswa.universitas}</p>
              </div>
            </div>

            {/* NOMOR TELEPON */}
            <div className="flex items-start gap-4 border-b border-gray-200 pb-5">
              <div className="p-2.5 bg-rose-50 rounded-xl text-[#7A1C3D] shrink-0">
                <Phone size={22} />
              </div>
              <div>
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Nomor Telepon</h3>
                <p className="text-gray-800 font-semibold text-base mt-0.5">{dataMahasiswa.telepon}</p>
              </div>
            </div>

            {/* PROGRAM STUDI */}
            <div className="flex items-start gap-4 border-b border-gray-200 pb-5">
              <div className="p-2.5 bg-rose-50 rounded-xl text-[#7A1C3D] shrink-0">
                <GraduationCap size={22} />
              </div>
              <div>
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Program Studi</h3>
                <p className="text-gray-800 font-semibold text-base mt-0.5">{dataMahasiswa.prodi}</p>
              </div>
            </div>

            {/* GITHUB LINK */}
            <div className="flex items-start gap-4 border-b border-gray-200 pb-5">
              <div className="p-2.5 bg-rose-50 rounded-xl text-[#7A1C3D] shrink-0">
                <Globe size={22} strokeWidth={2} />
              </div>
              <div>
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">GitHub Repository</h3>
                <a 
                  href={dataMahasiswa.github} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="text-[#7A1C3D] font-bold text-base mt-0.5 block hover:underline"
                >
                  Lihat GitHub
                </a>
              </div>
            </div>

            {/* VERCEL LINK */}
            <div className="flex items-start gap-4 border-b border-gray-200 pb-5">
              <div className="p-2.5 bg-rose-50 rounded-xl text-[#7A1C3D] shrink-0">
                <Globe size={22} strokeWidth={2} />
              </div>
              <div>
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Live Demo Vercel</h3>
                <a 
                  href={dataMahasiswa.vercel} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="text-[#7A1C3D] font-bold text-base mt-0.5 block hover:underline"
                >
                  Buka Website Online
                </a>
              </div>
            </div>

          </div>

          {/* FOOTER KECIL */}
          <div className="mt-12 text-center text-[11px] text-gray-400">
            Aplikasi ini dibuat sebagai syarat pemenuhan Ujian Akhir Semester Genap TA 2025/2026.
          </div>
        </div>

      </div>
    </div>
  );
}