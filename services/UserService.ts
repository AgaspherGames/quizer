import { IUserInfo } from "@/interfaces/UserInterfaces";
import { http } from "@/utils/http";

class UserService {
  async uploadAvatar(data: FormData) {
    return http.post("api/user/avatar", data);
  }
  async fetchMe() {
    return http.get<IUserInfo>("api/user/me");
  }
  async fetchUser(userId: string) {
    return http.get<IUserInfo>("api/user/" + userId);
  }
}

export default new UserService();
