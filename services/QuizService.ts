import { IQuestion, SaveResultRequest } from "@/interfaces/QuizInterfaces";
import { http, httpAuth } from "@/utils/http";

class QuizService {
  async fetchQuestions(quizId: string) {
    return http.get<IQuestion[]>(`quiz/${quizId}/questions`);
  }
  async saveResults(data: SaveResultRequest) {
    return httpAuth.post<{ correct_answers: number }>("quiz/save", data);
  }
}

export default new QuizService();
