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
  setUser: (userInfo) =>
    set((state) => {
      return { users: { ...state.users, [userInfo.user.id]: userInfo } };
    }),
  setCurrentUser: (currentUser) =>
    set(() => ({
      currentUser,
    })),
}));
