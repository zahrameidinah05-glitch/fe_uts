import { BrowserRouter, Routes, Route } from "react-router-dom";

import Beranda from "./pages/Beranda"; 
import Seminar from "./pages/Seminar";
import Competition from "./pages/Competition";
import Talkshow from "./pages/Talkshow";
import Workshop from "./pages/Workshop";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard/Dashboard";
import Biodata from "./pages/biodata/biodata";

import CategoryIndex from "./pages/Kategori/CategoryIndex";
import CategoryCreate from "./pages/Kategori/CategoryCreate";
import CategoryEdit from "./pages/Kategori/CategoryEdit"; // Selesai di-import!

import EventIndex from "./pages/event/EventIndex";
import EventCreate from "./pages/event/EventCreate";

import PembicaraCreate from "./pages/pembicara/PembicaraCreate"; 
import PembicaraIndex from "./pages/pembicara/PembicaraIndex";

import MainLayout from "./layout/MainLayout";
import AuthLayout from "./layout/AuthLayout";
import DashboardLayout from "./layout/DashboardLayout";

import ProtectedRoute from "./pages/route/ProtectedRoute";
import { EventEdit } from "./pages/event/EventEdit";
import { PembicaraEdit } from "./pages/pembicara/PembicaraEdit";

function App() {
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

            {/* URL: /dashboard */}
            <Route index element={<Dashboard />} />

            {/* Category - URL: /dashboard/kategori */}
            <Route path="kategori" element={<CategoryIndex />} />
            <Route path="kategori/create" element={<CategoryCreate />} />
            <Route path="kategori/edit/:id" element={<CategoryEdit />} /> {/* Selesai di-sinkron! */}

            {/* URL: /dashboard/event */}
            <Route path="event" element={<EventIndex />} />
            <Route path="event/create" element={<EventCreate />} />
            <Route path="event/edit/:id" element={<EventEdit />} />
            

            {/* URL: /dashboard/pembicara */}
            <Route path="pembicara" element={<PembicaraIndex />} />
            <Route path="pembicara/create" element={<PembicaraCreate />} />
            <Route path="pembicara/edit/:id" element={<PembicaraEdit />} />

            {/* OPSI 2: Menu Biodata di dalam Dashboard - URL: /dashboard/biodata */}
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