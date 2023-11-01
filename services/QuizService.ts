import { http } from "@/utils/http";

class QuizService {
  async fetchQuestions(quizId: string) {
    return http.get("/");
  }
  async fetchQuiz(quizId: string) {
    return http.get("/");
  }
}

export default new QuizService();
