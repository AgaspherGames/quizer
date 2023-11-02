export interface IQuiz { }

export interface IQuestion {
  id: number;
  title: string;
  image: string;
  answers: IAnswer[];
  quiz_id: number;
}

export interface IAnswer {
  id: number;
  text: string;
  question_id: number;
}

export interface SaveResultRequest {
  quiz_id: number;
  answers: ISelectedAnswer;
}

export interface ISelectedAnswer {
  [key: string]: number[];
}

export interface IQuiz {
  id: number
  title: string
  description: string
  image: string
  user_id: number
  created_at: string
}
