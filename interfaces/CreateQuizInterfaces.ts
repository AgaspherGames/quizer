import { QuestionTypes } from "./QuizInterfaces";

export interface IdResponse {
  id: number;
}

export interface IEditQuizRequest {
  title?: string;
  description?: string;
}

export interface ICreateQuestionRequest {}

export interface IEditQuestionRequest {
  title?: string;
  type?: QuestionTypes;
}
export interface ICreateAnswerRequest {}

export interface IEditAnswerRequest {
  text?: string;
  is_correct?: boolean;
}

export interface ICreateAnswerResponse {}

export interface IUpdateQuestionsOrder {
  orders: IUpdateQuestionOrderItem[];
}
export interface IUpdateAnswersOrder {
  orders: IUpdateAnswerOrderItem[];
}

interface IUpdateQuestionOrderItem {
  question_id: number;
  order_id: number;
}
interface IUpdateAnswerOrderItem {
  answer_id: number;
  order_id: number;
}
