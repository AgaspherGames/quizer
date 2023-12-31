import {
  IAllQuizes,
  IAnswer,
  ICreateQuestion,
  IFullAnswer,
  IQuestion,
  IQuiz,
  SaveResultRequest,
} from "@/interfaces/QuizInterfaces";
import { http } from "@/utils/http";
import LocalStorageService from "./LocalStorageService";

class QuizService {
  async fetchQuestions(quizId: string) {
    return http.get<IQuestion[]>(`quiz/${quizId}/questions`);
  }
  async fetchAuthorQuestions(quizId: string) {
    return http.get<ICreateQuestion[]>(`quiz/${quizId}/questions/author`);
  }
  async fetchAnswers(quizId: string, questionId: string) {
    return http.get<IAnswer[]>(
      `quiz/${quizId}/questions/${questionId}/answers`
    );
  }
  async fetchCorrectAnswers(quizId: string, questionId: string) {
    return http.get<IFullAnswer[]>(
      `quiz/${quizId}/questions/${questionId}/answers/correct`
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
    return http.post<{ score: number }>(`quiz/${quiz_id}/submit`, {
      attempt_id: LocalStorageService.getItem<string>(`quizAttempt_${quiz_id}`),
    });
  }
  async startQuiz(quiz_id: string) {
    return http.post<{ id: number }>(`quiz/${quiz_id}/start`);
  }
  async saveResult(quiz_id: string, data: SaveResultRequest) {
    return http.post(`quiz/${quiz_id}/save`, data);
  }
  async fetchEditQuizInfo(quiz_id: string) {
    const quiz = (await this.fetchQuiz(quiz_id)).data;
    const questions = (await this.fetchAuthorQuestions(quiz_id)).data;
    return { quiz, questions };
  }
}

export default new QuizService();
