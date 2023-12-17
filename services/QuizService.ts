import {
  IAllQuizes,
  IAnswer,
  IQuestion,
  IQuiz,
  SaveResultRequest,
} from "@/interfaces/QuizInterfaces";
import { http, httpAuth } from "@/utils/http";
import LocalStorageService from "./LocalStorageService";

class QuizService {
  async fetchQuestions(quizId: string) {
    return httpAuth.get<IQuestion[]>(`quiz/${quizId}/questions`);
  }
  async fetchAnswers(quizId: string, questionId: string) {
    return httpAuth.get<IAnswer[]>(
      `quiz/${quizId}/questions/${questionId}/answers`
    );
  }
  async fetchQuizes(query?: string) {
    return http.get<IAllQuizes>(`quiz`, {
      params: {
        title: query,
      },
    });
  }
  async searchQuizes(title: string) {
    return http.get<IQuiz[]>(`quiz/search`, { params: { title } });
  }
  async fetchQuiz(quizId: string) {
    return http.get<IQuiz>(`quiz/${quizId}`);
  }
  async saveResults(quiz_id: string) {
    return httpAuth.post<{ score: number }>(`quiz/${quiz_id}/submit`, {
      attempt_id: LocalStorageService.getItem<string>(`quizAttempt_${quiz_id}`),
    });
  }
  async startQuiz(quiz_id: string) {
    return httpAuth.post<{ id: number }>(`quiz/${quiz_id}/start`);
  }
  async saveResult(quiz_id: string, data: SaveResultRequest) {
    return httpAuth.post(`quiz/${quiz_id}/save`, data);
  }
}

export default new QuizService();
