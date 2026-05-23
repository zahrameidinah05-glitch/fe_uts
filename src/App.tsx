import { BrowserRouter, Routes, Route } from "react-router-dom";

// ================= PUBLIC PAGES =================
import Beranda from "./pages/Beranda";
import Seminar from "./pages/Seminar";
import Competition from "./pages/Competition";
import Talkshow from "./pages/Talkshow";
import Workshop from "./pages/Workshop";
import Biodata from "./pages/biodata/biodata";

// ================= AUTH PAGES =================
import Login from "./pages/Login";
import Register from "./pages/Register";

// ================= DASHBOARD PAGES =================
import Dashboard from "./pages/Dashboard/Dashboard";

// CATEGORY
import CategoryIndex from "./pages/Kategori/CategoryIndex";
import CategoryCreate from "./pages/Kategori/CategoryCreate";
import CategoryEdit from "./pages/Kategori/CategoryEdit";

// EVENT
import EventIndex from "./pages/event/EventIndex";
import EventCreate from "./pages/event/EventCreate";
import { EventEdit } from "./pages/event/EventEdit";

// PEMBICARA
import PembicaraIndex from "./pages/pembicara/PembicaraIndex";
import PembicaraCreate from "./pages/pembicara/PembicaraCreate";
import { PembicaraEdit } from "./pages/pembicara/PembicaraEdit";

// ================= LAYOUT =================
import MainLayout from "./layout/MainLayout";
import AuthLayout from "./layout/AuthLayout";
import DashboardLayout from "./layout/DashboardLayout";

// ================= PROTECTED =================
import ProtectedRoute from "./pages/route/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* ================= PUBLIC ROUTES ================= */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Beranda />} />
          <Route path="/competition" element={<Competition />} />
          <Route path="/seminar" element={<Seminar />} />
          <Route path="/workshop" element={<Workshop />} />
          <Route path="/talkshow" element={<Talkshow />} />
          <Route path="/biodata" element={<Biodata />} />
        </Route>

        {/* ================= AUTH ROUTES ================= */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        {/* ================= PROTECTED ROUTES ================= */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<DashboardLayout />}>

            {/* DASHBOARD HOME */}
            <Route index element={<Dashboard />} />

            {/* ================= CATEGORY ================= */}
            <Route path="kategori" element={<CategoryIndex />} />
            <Route path="kategori/create" element={<CategoryCreate />} />
            <Route path="kategori/edit/:id" element={<CategoryEdit />} />

            {/* ================= EVENT ================= */}
            <Route path="event" element={<EventIndex />} />
            <Route path="event/create" element={<EventCreate />} />
            <Route path="event/edit/:id" element={<EventEdit />} />

            {/* ================= PEMBICARA ================= */}
            <Route path="pembicara" element={<PembicaraIndex />} />
            <Route path="pembicara/create" element={<PembicaraCreate />} />
            <Route path="pembicara/edit/:id" element={<PembicaraEdit />} />

            {/* ================= BIODATA ================= */}
            <Route path="biodata" element={<Biodata />} />

          </Route>
        </Route>

        {/* ================= 404 ================= */}
        <Route
          path="*"
          element={
            <div className="flex items-center justify-center min-h-screen text-2xl font-bold">
              404 | Halaman Tidak Ditemukan
            </div>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;