import { IUserInfo } from "@/interfaces/UserInterfaces";
import { httpAuth } from "@/utils/http";

class UserService {
  async uploadAvatar(data: FormData) {
    return httpAuth.post("api/user/avatar", data);
  }
  async fetchMe() {
    return httpAuth.get<IUserInfo>("api/user/me");
  }
  async fetchUser() {
    return httpAuth.get("api/user/me");
  }
}

export default new UserService();
