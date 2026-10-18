import { useMemo, useState } from 'react';
import {
  ChevronRight,
  ChevronLeft,
  CheckCircle2,
  Circle,
  FlagTriangleRight,
  GraduationCap,
  AlertTriangle,
} from 'lucide-react';
import { questions } from '../data/questions';
import { INSTITUTE, EXAM_TITLE, GRADE, TOTAL_QUESTIONS, TOTAL_MARK } from '../data/constants';

type Props = {
  studentName: string;
  answers: (number | null)[];
  onAnswer: (questionIndex: number, choiceIndex: number) => void;
  onSubmit: () => void;
};

export default function QuizScreen({ studentName, answers, onAnswer, onSubmit }: Props) {
  const [current, setCurrent] = useState(0);
  const [showConfirm, setShowConfirm] = useState(false);

  const answeredCount = useMemo(
    () => answers.filter((a) => a !== null).length,
    [answers]
  );
  const progressPct = Math.round((answeredCount / TOTAL_QUESTIONS) * 100);

  const q = questions[current];
  const isLast = current === TOTAL_QUESTIONS - 1;
  const unansweredTotal = TOTAL_QUESTIONS - answeredCount;

  function goNext() {
    if (current < TOTAL_QUESTIONS - 1) setCurrent((c) => c + 1);
  }
  function goPrev() {
    if (current > 0) setCurrent((c) => c - 1);
  }
  function jumpTo(i: number) {
    setCurrent(i);
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Top bar */}
      <header className="glass rounded-none sm:rounded-b-3xl px-4 sm:px-6 py-3 sm:py-4 sticky top-0 z-20">
        <div className="max-w-5xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <GraduationCap className="w-6 h-6 text-azhar-gold shrink-0" />
            <div className="leading-tight">
              <p className="font-cairo font-bold text-azhar-gold text-sm sm:text-base">
                {INSTITUTE}
              </p>
              <p className="font-cairo text-azhar-cream/70 text-xs sm:text-sm">{EXAM_TITLE}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-azhar-forest/50 rounded-full px-3 py-1.5 gold-border">
            <span className="font-cairo text-azhar-cream/80 text-xs sm:text-sm">الطالب:</span>
            <span className="font-cairo font-bold text-azhar-cream text-sm sm:text-base max-w-[160px] truncate">
              {studentName}
            </span>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 py-6">
        {/* Progress section */}
        <div className="glass rounded-2xl px-4 sm:px-6 py-4 mb-5 animate-fade-up">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
            <div className="flex items-center gap-3 font-cairo">
              <span className="text-azhar-cream/80 text-sm">السؤال</span>
              <span className="text-azhar-gold font-extrabold text-lg">
                {current + 1}
              </span>
              <span className="text-azhar-cream/60 text-sm">من {TOTAL_QUESTIONS}</span>
            </div>
            <div className="flex items-center gap-4 font-cairo text-sm">
              <span className="text-azhar-cream/80">
                تمت الإجابة:{' '}
                <span className="text-azhar-gold font-bold">{answeredCount}</span>
              </span>
              <span className="text-azhar-cream/80 hidden sm:inline">
                الدرجة الكلية:{' '}
                <span className="text-azhar-gold font-bold">{TOTAL_MARK}</span>
              </span>
            </div>
          </div>
          {/* Progress bar */}
          <div className="h-2.5 w-full bg-azhar-forest/70 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-l from-azhar-gold to-azhar-goldLight rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progressPct}%` }}
            />
          </div>
          <div className="mt-1.5 text-left">
            <span className="font-cairo text-xs text-azhar-cream/60">{progressPct}%</span>
          </div>
        </div>

        {/* Question navigator chips */}
        <div className="glass rounded-2xl px-3 sm:px-4 py-3 mb-5 animate-fade-up delay-1">
          <div className="flex flex-wrap gap-1.5">
            {questions.map((qq, i) => {
              const answered = answers[i] !== null;
              const isCurrent = i === current;
              return (
                <button
                  key={qq.id}
                  onClick={() => jumpTo(i)}
                  className={`w-8 h-8 sm:w-9 sm:h-9 rounded-lg font-cairo text-xs sm:text-sm font-bold transition-all flex items-center justify-center ${
                    isCurrent
                      ? 'bg-azhar-gold text-azhar-deep ring-2 ring-azhar-goldLight scale-110'
                      : answered
                      ? 'bg-azhar-green/70 text-azhar-cream hover:bg-azhar-green'
                      : 'bg-azhar-forest/60 text-azhar-cream/60 hover:bg-azhar-forest'
                  }`}
                  aria-label={`السؤال رقم ${i + 1}`}
                  title={`السؤال ${i + 1}${answered ? ' (تمت الإجابة)' : ''}`}
                >
                  {i + 1}
                </button>
              );
            })}
          </div>
          <div className="flex items-center gap-4 mt-2.5 font-cairo text-xs text-azhar-cream/60">
            <span className="flex items-center gap-1">
              <span className="w-3 h-3 rounded bg-azhar-gold inline-block" /> الحالي
            </span>
            <span className="flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3 text-azhar-green" /> تمت الإجابة
            </span>
            <span className="flex items-center gap-1">
              <Circle className="w-3 h-3 text-azhar-cream/40" /> لم تُجب
            </span>
          </div>
        </div>

        {/* Question card */}
        <div
          key={q.id}
          className="glass-strong rounded-3xl px-5 sm:px-8 py-6 sm:py-8 animate-slide-right"
        >
          <div className="flex items-start gap-3 mb-2">
            <span className="shrink-0 mt-1 w-9 h-9 rounded-xl bg-azhar-gold/20 text-azhar-gold font-cairo font-extrabold flex items-center justify-center text-sm">
              {current + 1}
            </span>
            <div>
              <span className="inline-block font-cairo text-xs text-azhar-gold/80 bg-azhar-gold/10 rounded-full px-3 py-1 mb-2">
                {q.topic}
              </span>
              <h2 className="font-cairo font-bold text-azhar-cream text-lg sm:text-2xl leading-relaxed">
                {q.question}
              </h2>
            </div>
          </div>

          {/* Choices */}
          <div className="mt-6 grid gap-3">
            {q.choices.map((choice, idx) => {
              const selected = answers[current] === idx;
              return (
                <button
                  key={idx}
                  onClick={() => onAnswer(current, idx)}
                  className={`group flex items-center gap-3 text-right rounded-2xl px-4 sm:px-5 py-4 font-cairo text-base sm:text-lg transition-all duration-200 border-2 ${
                    selected
                      ? 'bg-azhar-gold text-azhar-deep border-azhar-gold scale-[1.01] shadow-lg'
                      : 'bg-azhar-forest/50 text-azhar-cream border-azhar-gold/20 hover:border-azhar-gold/60 hover:bg-azhar-forest/70'
                  }`}
                >
                  <span
                    className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm border-2 ${
                      selected
                        ? 'bg-azhar-deep text-azhar-gold border-azhar-deep'
                        : 'border-azhar-gold/40 text-azhar-gold'
                    }`}
                  >
                    {['أ', 'ب', 'ج', 'د'][idx]}
                  </span>
                  <span className="flex-1">{choice}</span>
                  {selected && <CheckCircle2 className="w-5 h-5 shrink-0" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* Nav buttons */}
        <div className="mt-6 flex items-center justify-between gap-3 animate-fade-up delay-2">
          <button
            onClick={goPrev}
            disabled={current === 0}
            className="flex items-center gap-2 font-cairo font-bold text-azhar-cream bg-azhar-forest/60 hover:bg-azhar-forest border border-azhar-gold/30 rounded-xl px-5 py-3 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <ChevronRight className="w-5 h-5" />
            <span>السؤال السابق</span>
          </button>

          {isLast ? (
            <button
              onClick={() => setShowConfirm(true)}
              className="flex items-center gap-2 font-cairo font-extrabold text-azhar-deep bg-gradient-to-l from-azhar-gold to-azhar-goldLight hover:scale-[1.03] rounded-xl px-6 py-3 shadow-lg transition-all"
            >
              <FlagTriangleRight className="w-5 h-5" />
              <span>إنهاء الاختبار وتسليم الإجابات</span>
            </button>
          ) : (
            <button
              onClick={goNext}
              className="flex items-center gap-2 font-cairo font-bold text-azhar-cream bg-gradient-to-l from-azhar-green to-azhar-deep hover:from-azhar-gold hover:to-azhar-goldLight hover:text-azhar-deep rounded-xl px-6 py-3 transition-all"
            >
              <span>السؤال التالي</span>
              <ChevronLeft className="w-5 h-5" />
            </button>
          )}
        </div>
      </main>

      {/* Confirm modal */}
      {showConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="glass-strong rounded-3xl max-w-md w-full p-6 sm:p-8 text-center animate-scale-in">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 rounded-full bg-azhar-gold/20 flex items-center justify-center">
                <AlertTriangle className="w-8 h-8 text-azhar-gold" />
              </div>
            </div>
            <h3 className="font-cairo font-extrabold text-azhar-cream text-xl mb-3">
              تأكيد تسليم الاختبار
            </h3>
            <p className="font-cairo text-azhar-cream/85 leading-relaxed mb-4">
              هل أنت متأكد من رغبتك في إنهاء الاختبار وتسليم إجاباتك؟ لن تتمكن من تعديل الإجابات
              بعد ظهور النتيجة.
            </p>
            {unansweredTotal > 0 ? (
              <div className="mb-5 bg-red-900/30 border border-red-500/40 rounded-xl px-4 py-3 text-red-200 font-cairo text-sm">
                لديك <span className="font-bold">{unansweredTotal}</span> سؤالًا لم تُجب عنه بعد.
              </div>
            ) : (
              <div className="mb-5 bg-azhar-green/30 border border-azhar-green rounded-xl px-4 py-3 text-azhar-cream font-cairo text-sm">
                أحسنت! لقد أجبت عن جميع الأسئلة الـ{TOTAL_QUESTIONS}.
              </div>
            )}
            <div className="flex gap-3">
              <button
                onClick={() => setShowConfirm(false)}
                className="flex-1 font-cairo font-bold text-azhar-cream bg-azhar-forest/70 hover:bg-azhar-forest border border-azhar-gold/30 rounded-xl py-3 transition-all"
              >
                متابعة الحل
              </button>
              <button
                onClick={() => {
                  setShowConfirm(false);
                  onSubmit();
                }}
                className="flex-1 font-cairo font-extrabold text-azhar-deep bg-gradient-to-l from-azhar-gold to-azhar-goldLight hover:scale-[1.02] rounded-xl py-3 transition-all"
              >
                نعم، تسليم
              </button>
            </div>
          </div>
        </div>
      )}

      <footer className="text-center py-4 font-cairo text-azhar-cream/50 text-xs">
        {GRADE} • {INSTITUTE}
      </footer>
    </div>
  );
}
