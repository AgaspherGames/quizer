import { useUserStore } from "@/stores/UserStore";
import { useEffect, useMemo } from "react";

export const useUserInfo = (id: number) => {
  const { users, setUser } = useUserStore((state) => state);
  const user = useMemo(() => {
    return users[id];
  }, [users]);

  async function update(id: number) {
    
  }

  useEffect(() => {

  }, [id]);
};
