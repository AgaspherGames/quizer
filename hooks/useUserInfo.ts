import { IUserInfo } from "@/interfaces/UserInterfaces";
import UserService from "@/services/UserService";
import { useUserStore } from "@/stores/UserStore";
import { useEffect, useMemo } from "react";
import { useAuthState } from "./hooks";

export const useUserMe = () => {
  const { currentUser, setCurrentUser } = useUserStore((state) => state);
  const { isAuth } = useAuthState();

  async function update() {
    if (isAuth) {
      const user = (await UserService.fetchMe()).data;
      setCurrentUser(user);
    }
  }

  useEffect(() => {
    if (!currentUser) {
      update();
    }
  }, []);

  return { userInfo: currentUser, update };
};
export const useUserInfo = (userId: string) => {
  const { users, setUser } = useUserStore((state) => state);
  const currentUser = useMemo(() => {
    return users[+userId];
  }, [userId, users]);

  async function update() {
    const user = (await UserService.fetchUser(userId)).data;
    setUser(user);
  }

  useEffect(() => {
    if (!currentUser) {
      update();
    }
  }, []);

  return { userInfo: currentUser, update };
};
