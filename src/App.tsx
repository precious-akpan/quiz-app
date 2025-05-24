
import React, { useState, useEffect, useRef } from 'react';
import { fetchQuestions } from './utils/api';
import Question from './components/Question';
import styles from './App.module.css';
import { QuizQuestion } from './types/quiz.types';

// Helper to get leaderboard from localStorage
const getLeaderboard = () => {
    try {
        const data = localStorage.getItem('quiz_leaderboard');
        return data ? JSON.parse(data) : [];
    } catch {
        return [];
    }
};

// Helper to save leaderboard to localStorage
const saveLeaderboard = (leaderboard: { name: string; score: number }[]) => {
    localStorage.setItem('quiz_leaderboard', JSON.stringify(leaderboard));
};

const QUESTION_TIME = 15; // seconds

const App: React.FC = () => {
    const [questions, setQuestions] = useState<QuizQuestion[]>([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [timer, setTimer] = useState(QUESTION_TIME);
    const [showFeedback, setShowFeedback] = useState(false);
    const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);
    const [gameOver, setGameOver] = useState(false);
    const [leaderboard, setLeaderboard] = useState<{ name: string; score: number }[]>([]);
    const [playerName, setPlayerName] = useState('');
    const [error, setError] = useState<string | null>(null);

    const timerRef = useRef<number | null>(null);

    // Load questions on mount
    useEffect(() => {
        const loadQuestions = async () => {
            try {
                const qs = await fetchQuestions();
                if (!Array.isArray(qs) || qs.length === 0) {
                    throw new Error('No questions available.');
                }
                setQuestions(qs);
            } catch (err: any) {
                setError(err.message ?? 'Failed to load questions.');
            }
        };
        loadQuestions();
        setLeaderboard(getLeaderboard());
    }, []);

    // Timer logic
    useEffect(() => {
        if (gameOver || showFeedback || questions.length === 0) return;
        setTimer(QUESTION_TIME);
        timerRef.current = setInterval(() => {
            setTimer((prev) => {
                if (prev <= 1) {
                    clearInterval(timerRef.current!);
                    handleTimeout();
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
        return () => clearInterval(timerRef.current!);
        // eslint-disable-next-line
    }, [currentQuestionIndex, showFeedback, gameOver, questions.length]);

    const handleTimeout = () => {
        setFeedback('incorrect');
        setShowFeedback(true);
        setTimeout(() => {
            nextQuestion();
        }, 1200);
    };

    const handleAnswer = (answer: string) => {
        if (showFeedback) return;
        clearInterval(timerRef.current!);
        const currentQuestion = questions[currentQuestionIndex];
        if (answer === currentQuestion.correct_answer) {
            setScore((s) => s + 1);
            setFeedback('correct');
        } else {
            setFeedback('incorrect');
        }
        setShowFeedback(true);
        setTimeout(() => {
            nextQuestion();
        }, 1200);
    };

    const nextQuestion = () => {
        setShowFeedback(false);
        setFeedback(null);
        if (currentQuestionIndex + 1 < questions.length) {
            setCurrentQuestionIndex((i) => i + 1);
        } else {
            setGameOver(true);
        }
    };

    const handleRestart = () => {
        setScore(0);
        setCurrentQuestionIndex(0);
        setGameOver(false);
        setShowFeedback(false);
        setFeedback(null);
        setTimer(QUESTION_TIME);
    };

    const handleSaveScore = () => {
        if (!playerName.trim()) return;
        const newLeaderboard = [
            ...leaderboard,
            { name: playerName.trim(), score },
        ]
            .sort((a, b) => b.score - a.score)
            .slice(0, 5); // Top 5
        setLeaderboard(newLeaderboard);
        saveLeaderboard(newLeaderboard);
        setPlayerName('');
    };

    if (error) {
        return (
            <div className={styles.container}>
                <div className={styles.header}>Quiz Game</div>
                <div className={styles.error}>Error: {error}</div>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <div className={styles.header}>Quiz Game</div>
            {gameOver ? (
                <div className={styles.endScreen}>
                    <h2>Game Over!</h2>
                    <p>Your score: <strong>{score}</strong></p>
                    <div className={styles.leaderboardSection}>
                        <h3>Leaderboard</h3>
                        <ol className={styles.leaderboard}>
                            {leaderboard.map((entry, idx) => (
                                <li key={idx}>
                                    {entry.name}: {entry.score}
                                </li>
                            ))}
                        </ol>
                        <div className={styles.saveScore}>
                            <input
                                type="text"
                                placeholder="Your name"
                                value={playerName}
                                onChange={(e) => setPlayerName(e.target.value)}
                                maxLength={16}
                                className={styles.nameInput}
                                disabled={leaderboard.some(e => e.name === playerName && e.score === score)}
                            />
                            <button
                                onClick={handleSaveScore}
                                disabled={!playerName.trim() || leaderboard.some(e => e.name === playerName && e.score === score)}
                                className={styles.saveButton}
                            >
                                Save Score
                            </button>
                        </div>
                    </div>
                    <button className={styles.restartButton} onClick={handleRestart}>
                        Play Again
                    </button>
                </div>
            ) : questions.length > 0 ? (
                <div className={styles.questionContainer}>
                    <div className={styles.statusBar}>
                        <span>Question {currentQuestionIndex + 1}/{questions.length}</span>
                        <span>Score: {score}</span>
                        <span className={timer <= 5 ? styles.timerWarning : styles.timer}>
                            ⏰ {timer}s
                        </span>
                    </div>
                    <Question
                        question={questions[currentQuestionIndex]}
                        onAnswer={handleAnswer}
                        disabled={showFeedback}
                        feedback={feedback}
                    />
                    {showFeedback && (
                        <div className={feedback === 'correct' ? styles.correct : styles.incorrect}>
                            {feedback === 'correct' ? 'Correct!' : 'Incorrect!'}
                        </div>
                    )}
                </div>
            ) : (
                <p className={styles.loading}>Loading questions...</p>
            )}
        </div>
    );
};

export default App;
