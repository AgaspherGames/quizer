import { IUserInfo } from "@/interfaces/UserInterfaces";
import { create } from "zustand";

interface UserState {
  currentUser: IUserInfo | undefined;
  users: { [key: number]: IUserInfo };
  setUser: (user: IUserInfo) => void;
  setCurrentUser: (user?: IUserInfo) => void;
}

export const useUserStore = create<UserState>()((set) => ({
  users: {},
  currentUser: undefined,
  setUser: (user) =>
    set((state) => {
      return { users: { ...state.users, [user.id]: user } };
    }),
  setCurrentUser: (currentUser) =>
    set(() => ({
      currentUser,
    })),
}));
