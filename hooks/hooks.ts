import QuizService from "@/services/QuizService";
import { useEffect, useState } from "react";

export const useQuiz = (quizId: string) => {
    const [data, setData] = useState(null)
    useEffect(() => {
        QuizService.fetchQuiz(quizId).then(resp=>setData(resp.data))
    }, [])
    
    return data
};
