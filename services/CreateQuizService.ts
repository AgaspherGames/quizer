import { IUserInfo } from "@/interfaces/UserInterfaces";
import { httpAuth } from "@/utils/http";

class CreateQuizService {
  async createQuiz() {
    return httpAuth.post(`quiz`);
  }
}

export default new CreateQuizService();
