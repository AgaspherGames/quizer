export interface IQuestion {
  id: number;
  title: string;
  image: string;
  quiz_id: number;
  type: QuestionTypes;
}

export interface IAnswer {
  id: number;
  text: string;
  question_id: number;
}

// export interface SaveResultRequest {
//   answers: ISelectedAnswer;
// }
export interface SaveResultRequest {
  attempt_id: number;
  question_id: number;
  answer_id: number;
}
export interface IResultItem {
  created_at: string;
  id: number;
  score: number;
  username: string;
  avatar: string;
  user_id: number;
}

export interface ISelectedAnswer {
  [key: string]: number[];
}

export interface IAllQuizes {
  total: number;
  total_pages: number;
  page: number;
  size: number;
  quizzes: IQuiz[];
}
export interface IQuiz {
  id: number;
  title: string;
  description: string;
  image: string;
  user_id: number;
  created_at: string;
}

export interface ICreateQuestion extends ICreateQuestionItem {
  id: number;
}
export interface ICreateQuestionItem {
  title: string;
  image?: File;
  answers: CreateAnswer[];
  type: QuestionTypes;
}

export type QuestionTypes = "input" | "choice";

export interface CreateAnswer {
  text: string;
  is_correct: boolean;
  id: number;
}
