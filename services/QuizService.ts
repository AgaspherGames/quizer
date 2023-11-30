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
    return httpAuth.post<{ correct_answers: number }>(
      `quiz/${quiz_id}/save`,
      data
    );
  }
  async startQuiz(quiz_id: string) {
    return httpAuth.post<{ id: number }>(`quiz/${quiz_id}/start`);
  }
  async saveResult(quiz_id: string, data: SaveResultRequest) {
    return httpAuth.post(`quiz/${quiz_id}/save`, data);
  }
}

export default new QuizService();
