import {
  IEditAnswerRequest,
  IEditQuestionRequest,
  IEditQuizRequest,
  IUpdateAnswersOrder,
  IUpdateQuestionsOrder,
  IdResponse,
} from "@/interfaces/CreateQuizInterfaces";
import { IUserInfo } from "@/interfaces/UserInterfaces";
import useCreateStore, { ICreateStore } from "@/stores/CreateStore";
import { http } from "@/utils/http";
import { number } from "yup";

class CreateQuizService {
  store = new Proxy({} as ICreateStore, {
    get(target, prop) {
      const store = useCreateStore.getState();
      // @ts-ignore
      return store[prop];
    },
  });

  async createQuiz(title: string) {
    return http.post<IdResponse>(`quiz`, { title });
  }
  async createQuestion(order: number) {
    return http.post<IdResponse>(`quiz/${this.store.quizId}/questions`, {
      order_id: order + 1,
    });
  }
  async createAnswer(question_id: number, pos: number) {
    return http.post<IdResponse>(
      `quiz/${this.store.quizId}/questions/${question_id}/answers`
    );
  }

  async editQuiz(data: IEditQuizRequest) {
    const requestData: IEditQuizRequest = {
      title: this.store.title,
      ...data,
    };
    return http.put(`quiz/${this.store.quizId}`, requestData);
  }
  async editQuestion(questionId: number, data: IEditQuestionRequest) {
    return http.put(
      `quiz/${this.store.quizId}/questions/${questionId}`,
      data
    );
  }
  async editAnswer(
    questionId: number,
    answerId: number,
    data: IEditAnswerRequest
  ) {
    const answer = this.store.questions
      .find((x) => x.id == questionId)
      ?.answers.find((x) => x.id == answerId);

    const requestData: IEditAnswerRequest = {
      is_correct: !!answer?.is_correct,
      text: answer?.text || "",
      ...data,
    };
    return http.put(
      `quiz/${this.store.quizId}/questions/${questionId}/answers/${answerId}`,
      requestData
    );
  }

  async removeQuestion(questionId: number) {
    return http.delete(`quiz/${this.store.quizId}/questions/${questionId}`);
  }
  async removeAnswer(questionId: number, answerId: number) {
    return http.delete(
      `quiz/${this.store.quizId}/questions/${questionId}/answers/${answerId}`
    );
  }

  async uploadQuizImage(data: FormData) {
    return http.post(`quiz/${this.store.quizId}/image`, data);
  }
  async removeQuizImage() {
    return http.delete(`quiz/${this.store.quizId}/image`);
  }

  async uploadQuestionImage(questionId: number, data: FormData) {
    return http.post(
      `quiz/${this.store.quizId}/questions/${questionId}/image`,
      data
    );
  }
  async removeQuestionImage(questionId: number) {
    return http.delete(
      `quiz/${this.store.quizId}/questions/${questionId}/image`
    );
  }

  async updateQuestionsOrder(order: IUpdateQuestionsOrder) {
    return http.put(`quiz/${this.store.quizId}/questions/order`, order);
  }
  async updateAnswersOrder(questionId: number, order: IUpdateAnswersOrder) {
    return http.put(
      `quiz/${this.store.quizId}/questions/${questionId}/answers/order`,
      order
    );
  }
}

export default new CreateQuizService();
