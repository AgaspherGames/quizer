import { IUser } from "@/interfaces/AuthInterfaces";
import LocalStorageService from "@/services/LocalStorageService";
import { create } from "zustand";

interface AuthState {
  token: string;
  user?: IUser;
  setToken: (token: string) => void;
  setUser: (user: IUser) => void;
}

export const useAuthStore = create<AuthState>()((set) => ({
  token: "",
  user: undefined,
  setToken: (token) => set(() => {
    LocalStorageService.setItem("TOKEN", token)
    return { token }
  }),
  setUser: (user) => set((state) => ({ user })),
}));
