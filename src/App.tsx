import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from "react";
import { useAuthStore } from "./pages/store/useAuthStore";

// Layouts
import MainLayout from "./layout/MainLayout";
import AuthLayout from "./layout/AuthLayout";
import DashboardLayout from "./layout/DashboardLayout";

// Pages
import Beranda from "./pages/Beranda";
import Seminar from "./pages/Seminar";
import Competition from "./pages/Competition";
import Talkshow from "./pages/Talkshow";
import Workshop from "./pages/Workshop";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard/Dashboard";
import Biodata from "./pages/biodata/biodata";

// Kategori
import CategoryIndex from "./pages/Kategori/CategoryIndex";
import CategoryCreate from "./pages/Kategori/CategoryCreate";
import CategoryEdit from "./pages/Kategori/CategoryEdit";

// Event
import EventIndex from "./pages/event/EventIndex";
import EventCreate from "./pages/event/EventCreate";
import { EventEdit } from "./pages/event/EventEdit";

// Pembicara
import PembicaraCreate from "./pages/pembicara/PembicaraCreate";
import PembicaraIndex from "./pages/pembicara/PembicaraIndex";
import { PembicaraEdit } from "./pages/pembicara/PembicaraEdit";

// Protected Route
import ProtectedRoute from "./pages/route/ProtectedRoute";

function App() {
  const { _hasHydrated, setHasHydrated } = useAuthStore();

  // Sinkronisasi status hidrasi saat aplikasi pertama kali dimuat
  useEffect(() => {
    setHasHydrated(true);
  }, [setHasHydrated]);

  // Mencegah rendering sampai data dari localStorage siap (solusi Error #185)
  if (!_hasHydrated) {
    return <div className="min-h-screen flex items-center justify-center">Loading sistem...</div>;
  }

  return (
    <BrowserRouter>
      <Routes>
        {/* ================= MAIN (Public) ================= */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Beranda />} />
          <Route path="/competition" element={<Competition />} />
          <Route path="/seminar" element={<Seminar />} />
          <Route path="/workshop" element={<Workshop />} />
          <Route path="/talkshow" element={<Talkshow />} />
          <Route path="/biodata" element={<Biodata />} />
        </Route>

        {/* ================= AUTH ================= */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        {/* ================= PROTECTED (Dashboard Area) ================= */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<Dashboard />} />
            
            <Route path="kategori" element={<CategoryIndex />} />
            <Route path="kategori/create" element={<CategoryCreate />} />
            <Route path="kategori/edit/:id" element={<CategoryEdit />} />

            <Route path="event" element={<EventIndex />} />
            <Route path="event/create" element={<EventCreate />} />
            <Route path="event/edit/:id" element={<EventEdit />} />

            <Route path="pembicara" element={<PembicaraIndex />} />
            <Route path="pembicara/create" element={<PembicaraCreate />} />
            <Route path="pembicara/edit/:id" element={<PembicaraEdit />} />

            <Route path="biodata" element={<Biodata />} />
          </Route>
        </Route>

        {/* Fallback 404 */}
        <Route path="*" element={<div className="p-10 text-center font-bold">Halaman Tidak Ditemukan</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;