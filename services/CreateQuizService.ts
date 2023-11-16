import {
  ICreateQuestionResponse,
  ICreateQuizResponse,
} from "@/interfaces/CreateQuizInterfaces";
import { IUserInfo } from "@/interfaces/UserInterfaces";
import { httpAuth } from "@/utils/http";
import { number } from "yup";

class CreateQuizService {
  async createQuiz(title: string) {
    return httpAuth.post<ICreateQuizResponse>(`quiz`, { title });
  }
  async createQuestion(quizId: number) {
    return httpAuth.post<ICreateQuestionResponse>(`quiz/${quizId}/questions`);
  }
}

export default new CreateQuizService();
