
import React from 'react';
import { QuizQuestion } from '../types/quiz.types';
import styles from './Question.module.css';

interface QuestionProps {
    question: QuizQuestion;
    onAnswer: (answer: string) => void;
    disabled?: boolean;
    feedback?: 'correct' | 'incorrect' | null;
}

const Question: React.FC<QuestionProps> = ({
                                               question,
                                               onAnswer,
                                               disabled = false,
                                               feedback = null,
                                           }) => {
    return (
        <div className={styles.questionBox}>
            <h2
                className={styles.questionText}
                dangerouslySetInnerHTML={{ __html: question.question }}
            />
            <ul className={styles.answerList}>
                {question.answers.map((answer, index) => {
                    // Determine if this answer is the correct one
                    const isCorrect = feedback && answer === question.correct_answer;
                    // For incorrect feedback, highlight the correct answer
                    const answerClass =
                        feedback === 'correct'
                            ? (answer === question.correct_answer ? styles.correctAnswer : '')
                            : feedback === 'incorrect'
                                ? (answer === question.correct_answer
                                    ? styles.correctAnswer
                                    : styles.incorrectAnswer)
                                : '';

                    return (
                        <li
                            key={index}
                            className={`${styles.answerItem} ${answerClass} ${disabled ? styles.disabled : ''}`}
                            onClick={() => !disabled && onAnswer(answer)}
                            tabIndex={disabled ? -1 : 0}
                            aria-disabled={disabled}
                        >
                            {answer}
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default Question;
