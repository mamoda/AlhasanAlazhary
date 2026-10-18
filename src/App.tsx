import { useState } from 'react';
import WelcomeScreen from './components/WelcomeScreen';
import QuizScreen from './components/QuizScreen';
import ResultScreen from './components/ResultScreen';
import { TOTAL_QUESTIONS, INSTITUTE, EXAM_TITLE, TEACHER } from './data/constants';

type Stage = 'welcome' | 'quiz' | 'result';

function emptyAnswers(): (number | null)[] {
  return Array(TOTAL_QUESTIONS).fill(null);
}

export default function App() {
  const [stage, setStage] = useState<Stage>('welcome');
  const [studentName, setStudentName] = useState('');
  const [answers, setAnswers] = useState<(number | null)[]>(emptyAnswers);

  function handleStart(name: string) {
    setStudentName(name);
    setAnswers(emptyAnswers());
    setStage('quiz');
  }

  function handleAnswer(qIndex: number, choiceIndex: number) {
    setAnswers((prev) => {
      const next = [...prev];
      next[qIndex] = choiceIndex;
      return next;
    });
  }

  function handleSubmit() {
    setStage('result');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function handleRestart() {
    setStudentName('');
    setAnswers(emptyAnswers());
    setStage('welcome');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  return (
    <>
      {stage === 'welcome' && <WelcomeScreen onStart={handleStart} />}

      {stage === 'quiz' && (
        <QuizScreen
          studentName={studentName}
          answers={answers}
          onAnswer={handleAnswer}
          onSubmit={handleSubmit}
        />
      )}

      {stage === 'result' && (
        <ResultScreen
          studentName={studentName}
          answers={answers}
          onRestart={handleRestart}
        />
      )}

      {/* Hidden metadata for SEO/accessibility */}
      <span className="sr-only">
        {INSTITUTE} - {EXAM_TITLE} - {TEACHER}
      </span>
    </>
  );
}
