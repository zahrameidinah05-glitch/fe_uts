import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";

export default function ProtectedRoute() {
    const { isAuthenticated, _hasHydrated } = useAuthStore((state) => ({
        isAuthenticated: state.isAuthenticated,
        _hasHydrated: state._hasHydrated
    }));

    // JIKA MASIH LOADING, JANGAN DI-REDIRECT DULU
    if (!_hasHydrated) {
        return <div>Loading...</div>; 
    }

    // JIKA SUDAH SELESAI LOADING DAN TIDAK LOGIN, BARU KE LOGIN
    if (!isAuthenticated) {
        return <Navigate to="/dashboard" replace />;
    }

    // JIKA LOGIN, MASUK DASHBOARD
    return <Outlet />;
}