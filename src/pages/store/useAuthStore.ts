import { create } from "zustand";
import { persist } from "zustand/middleware";

// ================= INTERFACE TYPES =================
interface CategoryItem {
  id: string;
  name: string;
}

interface SpeakerItem {
  id: string;
  name: string;
  role: string; 
}

interface EventItem {
  id: string;
  name: string;
  dateEvent: string; 
  location?: string;   
  description?: string; 
  categoryId: string;
  speakerId: string;
  category?: { name: string };
  speaker?: { name: string };
}

interface AuthState {
  isAuthenticated: boolean;
  user: string | null;
  _hasHydrated: boolean; // PENTING: Untuk sinkronisasi storage
  setHasHydrated: (state: boolean) => void;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;

  categories: CategoryItem[];
  speakers: SpeakerItem[];
  events: EventItem[];
  isLoading: boolean;

  fetchCategories: () => Promise<void>;
  createCategory: (name: string) => Promise<boolean>;
  updateCategory: (id: string, name: string) => Promise<boolean>;
  deleteCategory: (id: string) => Promise<boolean>;

  fetchSpeakers: () => Promise<void>;
  createSpeaker: (data: Omit<SpeakerItem, "id">) => Promise<boolean>;
  updateSpeaker: (id: string, data: Omit<SpeakerItem, "id">) => Promise<boolean>;
  deleteSpeaker: (id: string) => Promise<boolean>;

  fetchEvents: () => Promise<void>;
  createEvent: (data: Omit<EventItem, "id">) => Promise<boolean>;
  updateEvent: (id: string, data: Omit<EventItem, "id">) => Promise<boolean>;
  deleteEvent: (id: string) => Promise<boolean>;
}

const API_URL = "https://be-lctq.vercel.app";

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      isAuthenticated: false,
      user: null,
      _hasHydrated: false,
      setHasHydrated: (state) => set({ _hasHydrated: state }),
      
      categories: [],
      speakers: [],
      events: [],
      isLoading: false,

      // ================= FUNGSI LOGIN & LOGOUT =================
      login: async (email, password) => {
        try {
          const response = await fetch(`${API_URL}/api/auth/Login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ nim: email, password }),
          });

          if (response.ok) {
            const data = await response.json();
            set({ isAuthenticated: true, user: data.name || email });
            return true;
          }
          return false;
        } catch (error) {
          console.error("Error login:", error);
          return false;
        }
      },

      logout: () => set({ isAuthenticated: false, user: null }),

      // ================= MODUL CATEGORY =================
      fetchCategories: async () => {
        try {
          const response = await fetch(`${API_URL}/categories`);
          if (response.ok) {
            const data = await response.json();
            set({ categories: data });
          }
        } catch (error) { console.error(error); }
      },

      createCategory: async (name) => {
        try {
          const response = await fetch(`${API_URL}/categories`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name }),
          });
          if (response.ok) { await get().fetchCategories(); return true; }
          return false;
        } catch { return false; }
      },

      updateCategory: async (id, name) => {
        try {
          const response = await fetch(`${API_URL}/categories/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name }),
          });
          if (response.ok) { await get().fetchCategories(); return true; }
          return false;
        } catch { return false; }
      },

      deleteCategory: async (id) => {
        try {
          const response = await fetch(`${API_URL}/categories/${id}`, { method: "DELETE" });
          if (response.ok) { await get().fetchCategories(); return true; }
          return false;
        } catch { return false; }
      },

      // ================= MODUL PEMBICARA =================
      fetchSpeakers: async () => {
        try {
          const response = await fetch(`${API_URL}/pembicara`);
          if (response.ok) {
            const data = await response.json();
            set({ speakers: data });
          }
        } catch (error) { console.error(error); }
      },

      createSpeaker: async (data) => {
        try {
          const response = await fetch(`${API_URL}/pembicara`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
          });
          if (response.ok) { await get().fetchSpeakers(); return true; }
          return false;
        } catch { return false; }
      },

      updateSpeaker: async (id, data) => {
        try {
          const response = await fetch(`${API_URL}/pembicara/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
          });
          if (response.ok) { await get().fetchSpeakers(); return true; }
          return false;
        } catch { return false; }
      },

      deleteSpeaker: async (id) => {
        try {
          const response = await fetch(`${API_URL}/pembicara/${id}`, { method: "DELETE" });
          if (response.ok) { await get().fetchSpeakers(); return true; }
          return false;
        } catch { return false; }
      },

      // ================= MODUL EVENT =================
      fetchEvents: async () => {
        set({ isLoading: true });
        try {
          const response = await fetch(`${API_URL}/events`);
          if (response.ok) {
            const data = await response.json();
            set({ events: data, isLoading: false });
          } else { set({ isLoading: false }); }
        } catch (error) { set({ isLoading: false }); }
      },

      createEvent: async (data) => {
        try {
          const response = await fetch(`${API_URL}/events`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
          });
          if (response.ok) { await get().fetchEvents(); return true; }
          return false;
        } catch { return false; }
      },

      updateEvent: async (id, data) => {
        try {
          const response = await fetch(`${API_URL}/events/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
          });
          if (response.ok) { await get().fetchEvents(); return true; }
          return false;
        } catch { return false; }
      },

      deleteEvent: async (id) => {
        try {
          const response = await fetch(`${API_URL}/events/${id}`, { method: "DELETE" });
          if (response.ok) { await get().fetchEvents(); return true; }
          return false;
        } catch { return false; }
      },
    }),
    {
      name: "auth-storage",
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
      partialize: (state) => ({
        isAuthenticated: state.isAuthenticated,
        user: state.user,
      }),
    }
  )
);