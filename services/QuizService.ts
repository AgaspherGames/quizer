import {
  IQuestion,
  IQuiz,
  SaveResultRequest,
} from "@/interfaces/QuizInterfaces";
import { http, httpAuth } from "@/utils/http";

class QuizService {
  async fetchQuestions(quizId: string) {
    return httpAuth.get<IQuestion[]>(`quiz/${quizId}/questions`);
  }
  async fetchQuizes() {
    return http.get<IQuiz[]>(`quiz`);
  }
  async fetchQuiz(quizId: string) {
    return http.get<IQuiz>(`quiz/${quizId}`);
  }
  async saveResults(data: SaveResultRequest, quiz_id: string) {
    return httpAuth.post<{ correct_answers: number }>(`quiz/${quiz_id}/save`, data);
  }
  async createQuiz(data: any) {
    return httpAuth.post(`quiz`, data);
  }
}

export default new QuizService();
