import { IUserInfo } from "@/interfaces/UserInterfaces";
import UserService from "@/services/UserService";
import { useUserStore } from "@/stores/UserStore";
import { useEffect, useMemo } from "react";

export const useUserMe = (): undefined | IUserInfo => {
  const { users, setUser, currentId, setCurrentId } = useUserStore(
    (state) => state
  );
  const user = useMemo(() => {
    return users[currentId];
  }, [users, currentId]);

  async function update() {
    const user = (await UserService.fetchMe()).data;
    setUser(user);
    setCurrentId(user.id);
  }

  useEffect(() => {
    if (!user) {
      update();
    }
  }, []);

  return user;
};
