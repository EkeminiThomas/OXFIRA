

// the zustand store// store/useAuthStore.ts
import { create } from "zustand";

// interface User {
//   id: number;
//   email: string;
//   role: "admin" | "manager" | "user";
// }


type User = {
  id: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
  role: "admin" | "manager" | "user";
} | null;

type AuthState = {
  user: User;
  isAuthenticated: boolean;
  setUser: (user: User) => void;
  clearUser: () => void;
};

interface AuthStore {
  user: User | null;
  setUser: (user: User | null) => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  isAuthenticated: false,
  setUser: (user) => set({ user }),
  // clearUser: () => set({ user: null, isAuthenticated: false }),
}));