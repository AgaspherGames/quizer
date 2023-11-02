import { QuizPage } from '@/components/component/quiz-page'
import React from 'react'

type Props = {
    params: { id: string }
}

export default function page({ params }: Props) {
    return (
        <QuizPage params={params}/>
    )
}