import axios from 'axios';
import { Question, QuizQuestion } from '../types/quiz.types';

export const fetchQuestions = async (): Promise<QuizQuestion[]> => {
    try {
        const { data } = await axios.get('https://opentdb.com/api.php?amount=10');
        return data.results.map((question: Question) => ({
            ...question,
            answers: [question.correct_answer, ...question.incorrect_answers].sort(() => Math.random() - 0.5),
        }));
    } catch (error) {
        console.error('Failed to fetch questions:', error);
        return [];
    }
};
