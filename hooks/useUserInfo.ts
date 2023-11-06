import { IUserInfo } from "@/interfaces/UserInterfaces";
import UserService from "@/services/UserService";
import { useUserStore } from "@/stores/UserStore";
import { useEffect, useMemo } from "react";

export const useUserMe = () => {
  const { currentUser, setCurrentUser } = useUserStore((state) => state);

  async function update() {
    const user = (await UserService.fetchMe()).data;
    setCurrentUser(user);
  }

  useEffect(() => {
    if (!currentUser) {
      update();
    }
  }, []);

  return { user: currentUser, update };
};
