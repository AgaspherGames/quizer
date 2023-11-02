import { LoginRequest, RegisterRequest } from "@/interfaces/AuthInterfaces";
import { IQuestion } from "@/interfaces/QuizInterfaces";
import { useAuthStore } from "@/stores/AuthStore";
import { http } from "@/utils/http";

class QuizService {
  async register(data: RegisterRequest) {
    return http.post(`auth/signup`, data);
  }
  async login(data: LoginRequest) {
    try {
      const resp = await http.post<{ token: string }>(`auth/signin`, data);
      useAuthStore.getState().setToken(resp.data.token);
      return resp;
    } catch (error) {
      return error;
    }
  }
}

export default new QuizService();
