import { IUserInfo } from "@/interfaces/UserInterfaces";
import { create } from "zustand";

interface UserState {
  users: { [key: number]: IUserInfo };
  setUser: (user: IUserInfo) => void;
}

export const useUserStore = create<UserState>()((set) => ({
  users: {},
  setUser: (user) =>
    set((state) => {
      return { ...state.users, [user.id]: user };
    }),
}));
