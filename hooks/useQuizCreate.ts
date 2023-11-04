import { CreateAnswer, ICreateQuestion } from "@/interfaces/QuizInterfaces";
import { useState } from "react";

export const useQuizCreate = () => {
  const [questions, setQuestions] = useState<ICreateQuestion[]>([]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [idCount, setIdCount] = useState<number>(0);
  const [quizImage, setQuizImage] = useState<File>();

  function generateId() {
    setIdCount((p) => p + 1);
    return idCount;
  }

  function addQuestion(ind: number) {
    const id = generateId();
    setQuestions((prev) =>
      prev.toSpliced(ind, 0, { answers: [], title: "", id })
    );
  }
  function addAnswer(question_id: number, pos: number) {
    const id = generateId();
    const newQuestions = questions.map((x, ind) => {
      if (x.id == question_id) {
        x.answers = x.answers.toSpliced(pos, 0, {
          is_correct: false,
          text: "",
          id,
        });
      }
      return x;
    });
    setQuestions(newQuestions);
  }
  function removeAnswer(question_id: number, pos: number) {
    const newQuestions = questions.map((x) => {
      if (x.id == question_id) {
        x.answers = x.answers.toSpliced(pos, 1);
      }
      return x;
    });
    setQuestions(newQuestions);
  }
  function removeQuestion(question_id: number) {
    const newQuestions = questions.filter((x) => x.id != question_id);
    setQuestions(newQuestions);
  }
  function toggleAnswer(question_id: number, pos: number) {
    const newQuestions = questions.map((x) => {
      if (x.id == question_id) {
        x.answers[pos].is_correct = !x.answers[pos].is_correct;
      }
      return x;
    });
    setQuestions(newQuestions);
  }
  function setQuestionTitle(question_id: number, text: string) {
    const newQuestions = questions.map((x) => {
      if (x.id == question_id) {
        x.title = text;
      }
      return x;
    });
    setQuestions(newQuestions);
  }
  function setQuestionImage(question_id: number, image?: File) {
    const newQuestions = questions.map((x) => {
      if (x.id == question_id) {
        x.image = image;
      }
      return x;
    });
    setQuestions(newQuestions);
  }
  function setAnswerTitle(question_id: number, pos: number, text: string) {
    const newQuestions = questions.map((x) => {
      if (x.id == question_id) {
        x.answers[pos].text = text;
      }
      return x;
    });
    setQuestions(newQuestions);
  }
  function setAnswers(question_id: number, answers: CreateAnswer[]) {
    const newQuestions = questions.map((x) => {
      if (x.id == question_id) {
        x.answers = [...answers];
      }
      return x;
    });
    setQuestions(newQuestions);
  }

  return {
    questions,
    title,
    description,
    quizImage,
    setQuestions,
    setTitle,
    setDescription,
    setQuizImage,
    addQuestion,
    addAnswer,
    removeAnswer,
    removeQuestion,
    toggleAnswer,
    setQuestionTitle,
    setQuestionImage,
    setAnswerTitle,
    setAnswers,
  };
};
