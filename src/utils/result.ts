import { INSTITUTE, EXAM_TITLE, GRADE, TEACHER, TOTAL_MARK } from '../data/constants';

export type ResultSummary = {
  studentName: string;
  score: number;
  total: number;
  percentage: number;
  correct: number;
  wrong: number;
  unanswered: number;
  message: string;
  date: string;
};

export function computeScore(
  answers: (number | null)[],
  correctKeys: number[]
): { correct: number; wrong: number; unanswered: number; score: number } {
  let correct = 0;
  let wrong = 0;
  let unanswered = 0;
  answers.forEach((ans, i) => {
    if (ans === null || ans === undefined) {
      unanswered++;
    } else if (ans === correctKeys[i]) {
      correct++;
    } else {
      wrong++;
    }
  });
  return { correct, wrong, unanswered, score: correct };
}

export function getMessage(percentage: number): string {
  if (percentage >= 90) return 'ممتاز! أحسنت، واصل تفوقك';
  if (percentage >= 80) return 'جيد جدًا! أداء مميز';
  if (percentage >= 65) return 'جيد! استمر في المراجعة والتدريب';
  if (percentage >= 50) return 'أنت على الطريق الصحيح، واصل الاجتهاد';
  return 'لا تيأس، راجع القواعد وحاول تحسين نتيجتك';
}

export function formatDate(arLocaleDate: string): string {
  return arLocaleDate;
}

/**
 * Opens a clean print-friendly window with the result summary in RTL Arabic.
 */
export function printResult(summary: ResultSummary) {
  const win = window.open('', '_blank', 'width=820,height=900');
  if (!win) {
    alert('تعذّر فتح نافذة الطباعة. يرجى السماح بالنوافذ المنبثقة ثم المحاولة مرة أخرى.');
    return;
  }
  const html = `<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="UTF-8" />
<title>نتيجة ${EXAM_TITLE}</title>
<link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;800&family=Amiri:wght@400;700&display=swap" rel="stylesheet" />
<style>
  * { box-sizing: border-box; }
  body { font-family: 'Cairo', sans-serif; color: #1c2422; margin: 0; padding: 28px; background: #fff; }
  .header { text-align: center; border-bottom: 3px double #0b6e4f; padding-bottom: 16px; margin-bottom: 22px; }
  .institute { font-size: 22px; font-weight: 800; color: #0b6e4f; margin: 0 0 4px; }
  .exam { font-size: 26px; font-weight: 800; color: #064e3b; margin: 0 0 4px; }
  .grade { font-size: 16px; color: #555; margin: 0; }
  .card { border: 1px solid #c9a227; border-radius: 12px; padding: 22px; max-width: 620px; margin: 0 auto; }
  .row { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px dashed #d6cfa0; font-size: 17px; }
  .row:last-child { border-bottom: none; }
  .label { font-weight: 700; color: #064e3b; }
  .value { font-weight: 600; }
  .score-box { text-align: center; margin: 18px 0; }
  .score-num { font-size: 52px; font-weight: 800; color: #0b6e4f; }
  .percent { font-size: 22px; color: #c9a227; font-weight: 700; margin-top: 4px; }
  .msg { text-align: center; font-family: 'Amiri', serif; font-size: 20px; color: #064e3b; background: #f5f3e8; padding: 12px; border-radius: 8px; margin-top: 16px; }
  .footer { text-align: center; margin-top: 24px; font-size: 15px; color: #333; border-top: 1px solid #ccc; padding-top: 12px; }
  .teacher { font-weight: 700; color: #0b6e4f; }
  .actions { text-align: center; margin-top: 20px; }
  button { display: none; }
  @media print { .actions { display: none; } .no-print { display: none; } }
</style>
</head>
<body>
  <div class="header">
    <p class="institute">${INSTITUTE}</p>
    <h1 class="exam">${EXAM_TITLE}</h1>
    <p class="grade">${GRADE}</p>
  </div>
  <div class="card">
    <div class="row"><span class="label">اسم الطالب</span><span class="value">${summary.studentName}</span></div>
    <div class="row"><span class="label">الصف الدراسي</span><span class="value">${GRADE}</span></div>
    <div class="row"><span class="label">تاريخ الاختبار</span><span class="value">${summary.date}</span></div>
    <div class="score-box">
      <div class="score-num">${summary.score} / ${TOTAL_MARK}</div>
      <div class="percent">النسبة المئوية: ${summary.percentage.toFixed(2)}%</div>
    </div>
    <div class="row"><span class="label">عدد الإجابات الصحيحة</span><span class="value">${summary.correct}</span></div>
    <div class="row"><span class="label">عدد الإجابات الخاطئة</span><span class="value">${summary.wrong}</span></div>
    <div class="row"><span class="label">عدد الأسئلة التي لم تُجب</span><span class="value">${summary.unanswered}</span></div>
    <div class="msg">${summary.message}</div>
  </div>
  <div class="footer">
    <p>إعداد وتصميم: <span class="teacher">${TEACHER}</span></p>
    <p style="font-size:13px;color:#666;margin-top:6px;">${INSTITUTE}</p>
  </div>
  <div class="actions no-print">
    <button onclick="window.print()" style="display:inline-block;padding:10px 24px;background:#0b6e4f;color:#fff;border:none;border-radius:8px;font-family:'Cairo';font-size:16px;cursor:pointer;">طباعة</button>
  </div>
  <script>window.onload = function(){ setTimeout(function(){ window.print(); }, 350); };<\/script>
</body>
</html>`;
  win.document.open();
  win.document.write(html);
  win.document.close();
}
