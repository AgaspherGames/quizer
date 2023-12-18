import {
  IAllQuizes,
  IAnswer,
  ICreateQuestion,
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
  async fetchAnswers(quizId: string, questionId: string) {
    return http.get<IAnswer[]>(
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
    const questions = (await this.fetchQuestions(quiz_id)).data;
    const results = await Promise.all(
      questions.map(async (el) => ({
        ...el,
        answers: (await this.fetchAnswers(quiz_id, el.id + "")).data,
      }))
    );

    const createQuestions: ICreateQuestion[] = questions.map((el) => ({
      id: el.id,
      answers: [],
      title: el.title,
      type: el.type,
      // image: el.image,
    }));

    console.log(quiz);
    console.log(questions);
    console.log(results);
  }
}

export default new QuizService();
