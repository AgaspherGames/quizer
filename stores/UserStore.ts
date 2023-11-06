import { IUserInfo } from "@/interfaces/UserInterfaces";
import { create } from "zustand";

interface UserState {
  currentId: number;
  users: { [key: number]: IUserInfo };
  setUser: (user: IUserInfo) => void;
  setCurrentId: (user: number) => void;
}

export const useUserStore = create<UserState>()((set) => ({
  users: {},
  currentId: 0,
  setUser: (user) =>
    set((state) => {
      return { users: { ...state.users, [user.id]: user } };
    }),
  setCurrentId: (currentId) =>
    set(() => ({
      currentId,
    })),
}));
