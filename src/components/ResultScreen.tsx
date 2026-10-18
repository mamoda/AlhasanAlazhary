import { useMemo, useState, useEffect } from 'react';
import {
  Printer,
  Eye,
  CheckCircle2,
  XCircle,
  MinusCircle,
  RotateCcw,
  Award,
  GraduationCap,
  BookOpenCheck,
} from 'lucide-react';
import { questions } from '../data/questions';
import { INSTITUTE, EXAM_TITLE, GRADE, TEACHER, TOTAL_MARK, TOTAL_QUESTIONS } from '../data/constants';
import { computeScore, getMessage, printResult, type ResultSummary } from '../utils/result';

type Props = {
  studentName: string;
  answers: (number | null)[];
  onRestart: () => void;
};

export default function ResultScreen({ studentName, answers, onRestart }: Props) {
  const [showReview, setShowReview] = useState(false);
  const [animatedScore, setAnimatedScore] = useState(0);

  const stats = useMemo(() => {
    const correctKeys = questions.map((q) => q.correctIndex);
    const { correct, wrong, unanswered, score } = computeScore(answers, correctKeys);
    const percentage = (score / TOTAL_MARK) * 100;
    const message = getMessage(percentage);
    const date = new Date().toLocaleDateString('ar-EG', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
    return { correct, wrong, unanswered, score, percentage, message, date };
  }, [answers]);

  const summary: ResultSummary = {
    studentName,
    score: stats.score,
    total: TOTAL_MARK,
    percentage: stats.percentage,
    correct: stats.correct,
    wrong: stats.wrong,
    unanswered: stats.unanswered,
    message: stats.message,
    date: stats.date,
  };

  // Animate the score number
  useEffect(() => {
    let raf = 0;
    const start = performance.now();
    const duration = 1100;
    function tick(now: number) {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setAnimatedScore(Math.round(stats.score * eased));
      if (t < 1) raf = requestAnimationFrame(tick);
    }
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [stats.score]);

  // Circle progress
  const radius = 78;
  const circ = 2 * Math.PI * radius;
  const dashOffset = circ - (stats.percentage / 100) * circ;

  return (
    <div className="min-h-screen flex flex-col">
      <header className="glass rounded-none sm:rounded-b-3xl px-4 sm:px-6 py-3 sm:py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-center gap-2">
          <GraduationCap className="w-6 h-6 text-azhar-gold" />
          <span className="font-cairo font-bold text-azhar-gold text-sm sm:text-base">
            {INSTITUTE}
          </span>
        </div>
      </header>

      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 py-8">
        <h1 className="text-center font-cairo font-extrabold text-2xl sm:text-3xl gold-text mb-2 animate-fade-up">
          نتيجة {EXAM_TITLE}
        </h1>
        <p className="text-center font-cairo text-azhar-cream/70 text-sm sm:text-base mb-7 animate-fade-up delay-1">
          {GRADE}
        </p>

        {/* Result card */}
        <div className="glass-strong rounded-3xl px-5 sm:px-10 py-8 animate-scale-in">
          {/* Student info */}
          <div className="flex flex-col items-center text-center mb-6">
            <div className="w-14 h-14 rounded-full bg-azhar-gold/20 flex items-center justify-center mb-3">
              <Award className="w-7 h-7 text-azhar-gold" />
            </div>
            <p className="font-cairo text-azhar-cream/70 text-sm">اسم الطالب</p>
            <h2 className="font-cairo font-extrabold text-azhar-cream text-xl sm:text-2xl">
              {studentName}
            </h2>
          </div>

          {/* Score circle */}
          <div className="flex flex-col items-center my-6">
            <div className="relative w-[200px] h-[200px]">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 200 200">
                <circle
                  cx="100"
                  cy="100"
                  r={radius}
                  fill="none"
                  stroke="rgba(6,40,29,0.6)"
                  strokeWidth="14"
                />
                <circle
                  cx="100"
                  cy="100"
                  r={radius}
                  fill="none"
                  stroke="url(#goldGrad)"
                  strokeWidth="14"
                  strokeLinecap="round"
                  strokeDasharray={circ}
                  strokeDashoffset={dashOffset}
                  style={{ transition: 'stroke-dashoffset 1.1s ease-out' }}
                />
                <defs>
                  <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#e6c659" />
                    <stop offset="100%" stopColor="#c9a227" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="font-cairo font-extrabold text-4xl sm:text-5xl gold-text">
                  {animatedScore}
                </span>
                <span className="font-cairo text-azhar-cream/60 text-lg">/ {TOTAL_MARK}</span>
              </div>
            </div>
            <p className="mt-3 font-cairo font-bold text-azhar-gold text-xl">
              النسبة المئوية: {stats.percentage.toFixed(2)}%
            </p>
          </div>

          {/* Encouragement message */}
          <div className="text-center bg-azhar-gold/10 border border-azhar-gold/30 rounded-2xl py-4 px-5 mb-6">
            <p className="font-amiri text-xl sm:text-2xl text-azhar-cream leading-relaxed">
              {stats.message}
            </p>
          </div>

          {/* Stats grid */}
          <div className="grid grid-cols-3 gap-3 mb-6">
            <StatCard
              icon={<CheckCircle2 className="w-5 h-5" />}
              label="صحيحة"
              value={stats.correct}
              color="text-emerald-300"
              ring="border-emerald-500/40 bg-emerald-900/20"
            />
            <StatCard
              icon={<XCircle className="w-5 h-5" />}
              label="خاطئة"
              value={stats.wrong}
              color="text-red-300"
              ring="border-red-500/40 bg-red-900/20"
            />
            <StatCard
              icon={<MinusCircle className="w-5 h-5" />}
              label="لم تُجب"
              value={stats.unanswered}
              color="text-amber-200"
              ring="border-amber-500/40 bg-amber-900/20"
            />
          </div>

          {/* Institute / grade info */}
          <div className="grid sm:grid-cols-2 gap-3 mb-6 font-cairo text-sm">
            <InfoRow label="المعهد" value={INSTITUTE} />
            <InfoRow label="الصف الدراسي" value={GRADE} />
          </div>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => setShowReview((v) => !v)}
              className="flex-1 flex items-center justify-center gap-2 font-cairo font-bold text-azhar-cream bg-azhar-forest/60 hover:bg-azhar-forest border border-azhar-gold/30 rounded-xl py-3.5 transition-all"
            >
              <Eye className="w-5 h-5" />
              <span>{showReview ? 'إخفاء المراجعة' : 'مراجعة الإجابات'}</span>
            </button>
            <button
              onClick={() => printResult(summary)}
              className="flex-1 flex items-center justify-center gap-2 font-cairo font-extrabold text-azhar-deep bg-gradient-to-l from-azhar-gold to-azhar-goldLight hover:scale-[1.02] rounded-xl py-3.5 transition-all"
            >
              <Printer className="w-5 h-5" />
              <span>طباعة النتيجة</span>
            </button>
            <button
              onClick={onRestart}
              className="flex-1 flex items-center justify-center gap-2 font-cairo font-bold text-azhar-cream bg-azhar-green/40 hover:bg-azhar-green/60 border border-azhar-green rounded-xl py-3.5 transition-all"
            >
              <RotateCcw className="w-5 h-5" />
              <span>اختبار جديد</span>
            </button>
          </div>
        </div>

        {/* Review section */}
        {showReview && (
          <div className="mt-7 animate-fade-up">
            <div className="flex items-center gap-2 mb-4">
              <BookOpenCheck className="w-6 h-6 text-azhar-gold" />
              <h3 className="font-cairo font-extrabold text-azhar-cream text-xl">
                مراجعة الإجابات
              </h3>
            </div>
            <div className="grid gap-3">
              {questions.map((q, i) => {
                const studentAns = answers[i];
                const isAnswered = studentAns !== null;
                const isCorrect = studentAns === q.correctIndex;
                return (
                  <div
                    key={q.id}
                    className={`glass rounded-2xl p-5 border-l-4 ${
                      !isAnswered
                        ? 'border-l-amber-400'
                        : isCorrect
                        ? 'border-l-emerald-400'
                        : 'border-l-red-400'
                    }`}
                  >
                    <div className="flex items-start gap-3 mb-3">
                      <span className="shrink-0 w-8 h-8 rounded-lg bg-azhar-gold/20 text-azhar-gold font-cairo font-bold flex items-center justify-center text-sm">
                        {i + 1}
                      </span>
                      <div className="flex-1">
                        <span className="font-cairo text-xs text-azhar-gold/70 bg-azhar-gold/10 rounded-full px-2.5 py-0.5">
                          {q.topic}
                        </span>
                        <p className="font-cairo font-bold text-azhar-cream mt-1.5 leading-relaxed">
                          {q.question}
                        </p>
                      </div>
                      <span className="shrink-0">
                        {!isAnswered ? (
                          <MinusCircle className="w-5 h-5 text-amber-300" />
                        ) : isCorrect ? (
                          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                        ) : (
                          <XCircle className="w-5 h-5 text-red-400" />
                        )}
                      </span>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-2 font-cairo text-sm mb-3">
                      <div className="bg-azhar-forest/40 rounded-lg px-3 py-2">
                        <span className="text-azhar-cream/60 block text-xs mb-0.5">إجابتك:</span>
                        <span
                          className={
                            !isAnswered
                              ? 'text-amber-200'
                              : isCorrect
                              ? 'text-emerald-300'
                              : 'text-red-300'
                          }
                        >
                          {isAnswered ? q.choices[studentAns] : 'لم تتم الإجابة'}
                        </span>
                      </div>
                      <div className="bg-emerald-900/20 border border-emerald-600/30 rounded-lg px-3 py-2">
                        <span className="text-azhar-cream/60 block text-xs mb-0.5">
                          الإجابة الصحيحة:
                        </span>
                        <span className="text-emerald-300">{q.choices[q.correctIndex]}</span>
                      </div>
                    </div>

                    <div className="bg-azhar-gold/10 border border-azhar-gold/20 rounded-lg px-3 py-2 font-cairo text-sm text-azhar-cream/90 leading-relaxed">
                      <span className="text-azhar-gold font-bold">القاعدة: </span>
                      {q.explanation}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </main>

      <footer className="text-center py-5 font-cairo text-azhar-cream/60 text-sm">
        إعداد وتصميم:{' '}
        <span className="text-azhar-gold font-bold">{TEACHER}</span>
        <span className="mx-2 text-azhar-cream/30">|</span>
        {INSTITUTE}
      </footer>
    </div>
  );
}

function StatCard({
  icon,
  label,
  value,
  color,
  ring,
}: {
  icon: React.ReactNode;
  label: string;
  value: number;
  color: string;
  ring: string;
}) {
  return (
    <div className={`rounded-2xl border ${ring} px-3 py-4 text-center`}>
      <div className={`flex justify-center mb-1.5 ${color}`}>{icon}</div>
      <p className="font-cairo font-extrabold text-2xl text-azhar-cream">{value}</p>
      <p className="font-cairo text-azhar-cream/70 text-xs sm:text-sm">{label}</p>
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between bg-azhar-forest/40 rounded-xl px-4 py-2.5 border border-azhar-gold/15">
      <span className="text-azhar-cream/60">{label}</span>
      <span className="text-azhar-cream font-bold">{value}</span>
    </div>
  );
}
