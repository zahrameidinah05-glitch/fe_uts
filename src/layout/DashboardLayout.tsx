import { Outlet, Link, useNavigate, useLocation } from "react-router-dom";

export default function DashboardLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === '/dashboard') {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="flex min-h-screen bg-white">
      {/* SIDEBAR MERAH (UTAMA) */}
      <aside className="w-64 bg-[#7A1C3D] text-white fixed h-full flex flex-col p-8 z-20">
        <div className="mb-12">
          <h2 className="text-2xl font-bold tracking-tight">INVOFEST</h2>
        </div>

        <nav className="flex-1 space-y-6">
          <Link 
            to="/dashboard" 
            className={`block text-sm transition-all ${
              isActive('/dashboard') ? 'font-bold opacity-100 underline underline-offset-8' : 'opacity-60 hover:opacity-100'
            }`}
          >
            Dashboard
          </Link>
          <Link 
            to="/dashboard/kategori" 
            className={`block text-sm transition-all ${
              isActive('/dashboard/kategori') ? 'font-bold opacity-100 underline underline-offset-8' : 'opacity-60 hover:opacity-100'
            }`}
          >
            Category Event
          </Link>
          <Link 
            to="/dashboard/event" 
            className={`block text-sm transition-all ${
              isActive('/dashboard/event') ? 'font-bold opacity-100 underline underline-offset-8' : 'opacity-60 hover:opacity-100'
            }`}
          >
            Event
          </Link>
          <Link 
            to="/dashboard/pembicara" 
            className={`block text-sm transition-all ${
              isActive('/dashboard/pembicara') ? 'font-bold opacity-100 underline underline-offset-8' : 'opacity-60 hover:opacity-100'
            }`}
          >
            Pembicara
          </Link>
        </nav>

        <div className="pt-6 border-t border-rose-800/30">
          <button 
            onClick={() => navigate('/login')}
            className="flex items-center gap-2 text-sm opacity-60 hover:opacity-100 transition-all"
          >
            <span>🚪</span> Keluar
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 ml-64 bg-[#FDFDFD]">
        {/* TOP NAVBAR PUTIH */}
        <header className="h-20 bg-white/80 backdrop-blur-md flex items-center justify-between px-10 sticky top-0 z-10">
          <div className="text-[10px] font-medium text-gray-400">
            Dashboard / <span className="text-gray-900 font-bold uppercase tracking-wider">
              {location.pathname.split('/').filter(p => p !== 'dashboard' && p !== '').pop() || 'Overview'}
            </span>
          </div>
          
          {/* BAGIAN INFO AKUN SEKARANG BISA DIKLIK UNTUK MENUJU KE BIODATA */}
          <Link 
            to="/dashboard/biodata" 
            className="flex items-center gap-3 group cursor-pointer hover:opacity-80 transition-all"
            title="Lihat Biodata"
          >
            <div className="text-right">
              {/* Jika didekati mouse (hover), nama Zahra akan berubah warna merah maroon */}
              <p className="text-xs font-bold text-gray-800 leading-none group-hover:text-[#7A1C3D] transition-colors">
                Biodata Zahra
              </p>
              <p className="text-[9px] text-gray-400 mt-1">ZAHRA MEIDINAH TAHSYA</p>
            </div>
            <div className="w-9 h-9 rounded-full bg-[#7A1C3D] flex items-center justify-center text-white text-[11px] font-bold ring-2 ring-rose-50 group-hover:ring-[#7A1C3D]/30 transition-all">
              B
            </div>
          </Link>
        </header>

        {/* AREA KONTEN UTAMA */}
        <main className="p-10">
          <Outlet /> 
        </main>
      </div>
    </div>
  );
}