import { IQuestion } from "@/interfaces/QuizInterfaces";
import { http } from "@/utils/http";

class QuizService {
  async fetchQuestions(quizId: string) {
    return http.get<IQuestion[]>(`quiz/${quizId}/questions`);
  }
  async fetchQuiz(quizId: string) {
    // return http.get("/");
  }
}

export default new QuizService();
