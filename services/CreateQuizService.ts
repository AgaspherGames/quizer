import {
  IEditAnswerRequest,
  IEditQuestionRequest,
  IEditQuizRequest,
  IdResponse,
} from "@/interfaces/CreateQuizInterfaces";
import { IUserInfo } from "@/interfaces/UserInterfaces";
import useCreateStore, { ICreateStore } from "@/stores/CreateStore";
import { httpAuth } from "@/utils/http";
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
    return httpAuth.post<IdResponse>(`quiz`, { title });
  }
  async createQuestion() {
    return httpAuth.post<IdResponse>(`quiz/${this.store.quizId}/questions`);
  }
  async createAnswer(question_id: number, pos: number) {
    return httpAuth.post<IdResponse>(
      `quiz/${this.store.quizId}/questions/${question_id}/answers`
    );
  }

  async editQuiz(data: IEditQuizRequest) {
    const requestData: IEditQuizRequest = {
      title: this.store.title,
      ...data,
    };
    return httpAuth.put(`quiz/${this.store.quizId}`, requestData);
  }
  async editQuestion(questionId: number, data: IEditQuestionRequest) {
    return httpAuth.put(
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
    console.log(answer);

    const requestData: IEditAnswerRequest = {
      is_correct: !!answer?.is_correct,
      text: answer?.text || "",
      ...data,
    };
    return httpAuth.put(
      `quiz/${this.store.quizId}/questions/${questionId}/answers/${answerId}`,
      requestData
    );
  }
}

export default new CreateQuizService();
