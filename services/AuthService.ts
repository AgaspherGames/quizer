import {
  LoginRequest,
  RegisterRequest,
  ResetPasswordRequest,
} from "@/interfaces/AuthInterfaces";
import { http } from "@/utils/http";
import CookieService from "./CookieService";

class QuizService {
  async register(data: RegisterRequest) {
    return http.post(`auth/signup`, data);
  }
  async login(data: LoginRequest) {
    try {
      const resp = await http.post<{ token: string }>(`auth/signin`, data);
      CookieService.setAuthCookie();
      return resp;
    } catch (error) {
      throw error;
    }
  }
  async logout() {
    http.post(`auth/signout`);
    CookieService.deleteAuthCookie();
  }
  async resetPassword(data: ResetPasswordRequest) {
    return http.put(`auth/reset-password`, data);
  }
  async sendResetPasswordEmail(email: string) {
    return http.post(`auth/send-password-code`, { email });
  }
}

export default new QuizService();
