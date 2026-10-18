import { useState, type FormEvent } from 'react';
import { BookOpen, User, Sparkles, ArrowLeft, AlertCircle, GraduationCap } from 'lucide-react';
import { INSTITUTE, EXAM_TITLE, GRADE, TEACHER, TOTAL_QUESTIONS } from '../data/constants';

type Props = {
  onStart: (name: string) => void;
};

export default function WelcomeScreen({ onStart }: Props) {
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) {
      setError('الرجاء كتابة اسمك بالكامل قبل بدء الاختبار.');
      return;
    }
    if (trimmed.length < 3) {
      setError('يرجى كتابة الاسم بالكامل (ثلاثة أحرف على الأقل).');
      return;
    }
    setError('');
    onStart(trimmed);
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-10">
      <div className="w-full max-w-2xl">
        {/* Top brand bar */}
        <div className="glass rounded-2xl px-6 py-5 mb-6 flex items-center justify-center gap-3 animate-fade-up">
          <GraduationCap className="w-7 h-7 text-azhar-gold" />
          <div className="text-center">
            <p className="text-azhar-gold font-cairo font-bold text-lg sm:text-xl tracking-wide">
              {INSTITUTE}
            </p>
          </div>
        </div>

        {/* Hero card */}
        <div className="glass-strong rounded-3xl px-6 sm:px-10 py-8 sm:py-10 text-center animate-fade-up delay-1">
          <div className="flex justify-center mb-5">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-azhar-gold to-azhar-goldLight flex items-center justify-center shadow-lg">
              <BookOpen className="w-10 h-10 text-azhar-deep" />
            </div>
          </div>

          <h1 className="font-cairo font-extrabold text-3xl sm:text-4xl gold-text mb-2">
            {EXAM_TITLE}
          </h1>
          <p className="font-cairo text-base sm:text-lg text-azhar-cream/90 mb-1">{GRADE}</p>

          <div className="my-6 h-px w-24 mx-auto bg-gradient-to-r from-transparent via-azhar-gold to-transparent" />

          <p className="font-amiri text-lg sm:text-xl text-azhar-cream/95 leading-relaxed max-w-xl mx-auto">
            مرحبًا بكم طلاب المعهد الحسن الأزهري. هذا اختبارٌ في النحو والصرف يتكوّن من{' '}
            <span className="text-azhar-gold font-bold">{TOTAL_QUESTIONS} سؤالًا</span>،
            اقرأ كل سؤالٍ بعنايةٍ واختر الإجابة الصحيحة. نسأل الله لك التوفيق والسداد.
          </p>

          <div className="mt-4 inline-flex items-center gap-2 text-azhar-cream/70 text-sm font-cairo">
            <Sparkles className="w-4 h-4 text-azhar-gold" />
            <span>الدرجة الكلية: {TOTAL_QUESTIONS} درجة</span>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="mt-8 text-right">
            <label
              htmlFor="studentName"
              className="block font-cairo font-bold text-azhar-cream mb-3 text-lg"
            >
              اكتب اسمك بالكامل لبدء الاختبار
            </label>

            <div className="relative">
              <User className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-azhar-gold/80 pointer-events-none" />
              <input
                id="studentName"
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (error) setError('');
                }}
                placeholder="مثال: أحمد محمد عبد الله"
                className="w-full bg-azhar-forest/60 border-2 border-azhar-gold/40 focus:border-azhar-gold rounded-xl py-4 pr-12 pl-4 text-azhar-cream font-cairo text-lg placeholder:text-azhar-cream/40 outline-none transition-all focus:ring-4 focus:ring-azhar-gold/20"
                autoComplete="off"
                autoFocus
              />
            </div>

            {error && (
              <div className="mt-3 flex items-center gap-2 text-red-300 bg-red-900/30 border border-red-500/40 rounded-lg px-4 py-3 font-cairo text-sm animate-fade-in">
                <AlertCircle className="w-5 h-5 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <button
              type="submit"
              className="mt-6 w-full sm:w-auto sm:mx-auto flex items-center justify-center gap-3 bg-gradient-to-l from-azhar-green to-azhar-deep hover:from-azhar-gold hover:to-azhar-goldLight hover:text-azhar-deep text-azhar-cream font-cairo font-extrabold text-lg px-10 py-4 rounded-xl shadow-lg transition-all duration-300 hover:scale-[1.02] active:scale-95"
            >
              <span>ابدأ الاختبار</span>
              <ArrowLeft className="w-5 h-5" />
            </button>
          </form>
        </div>

        {/* Footer credit */}
        <p className="text-center mt-6 font-cairo text-azhar-cream/70 text-sm animate-fade-up delay-2">
          إعداد وتصميم:{' '}
          <span className="text-azhar-gold font-bold">{TEACHER}</span>
        </p>
      </div>
    </div>
  );
}
