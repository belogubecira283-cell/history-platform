'use client';
import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { courseData } from '../../../components/courseData';
import { CheckCircle, BookOpen, HelpCircle, ArrowRight, MessageSquare } from 'lucide-react';

export default function FutureLearnStep() {
  const params = useParams();
  const router = useRouter();
  
  const currentWeekId = (params?.week as string) || 'week-1';
  const currentStepId = (params?.step as string) || 'step-1';

  // Поиск текущей недели и шага в базе данных курса
  const currentWeek = courseData.find(w => w.id === currentWeekId) || courseData[0];
  const currentStep = currentWeek.steps.find(s => s.id === currentStepId) || currentWeek.steps[0];

  const [isCompleted, setIsCompleted] = useState(false);
  const [comments, setComments] = useState([
    { id: 1, author: "Студент (Истфак, 2 курс)", text: "Интересно, как Л.В. Милов связывает короткий рабочий цикл с крепостным правом. Получается, без жесткого государственного принуждения было просто невозможно мобилизовать ресурсы в такой цейтнот?" },
    { id: 2, author: "Преподаватель (Модератор)", text: "Отличный вопрос. Обратите внимание на третью главу «Великорусского пахаря», где автор подробно описывает «компенсационные механизмы» общины и роль сильной власти в изъятии совокупного прибавочного продукта." }
  ]);
  const [newComment, setNewComment] = useState("");

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    setComments([...comments, { id: Date.now(), author: "Вы (Студент)", text: newComment }]);
    setNewComment("");
  };

  return (
    <div className="min-h-screen bg-[#faf8f5] text-stone-900 flex flex-col md:flex-row">
      
      {/* ЛЕВОЕ МЕНЮ: Список недель и шагов по канонам FutureLearn */}
      <aside className="w-full md:w-80 bg-stone-900 text-stone-200 p-6 flex flex-col border-r border-stone-800">
        <div className="mb-8">
          <span className="text-xs uppercase tracking-widest text-amber-500 font-bold">Курс Истории России</span>
          <h2 className="text-lg font-bold text-white mt-1">II пол. XIX — нач. XX вв.</h2>
        </div>

        <div className="space-y-6 overflow-y-auto flex-1">
          {courseData.map((week) => (
            <div key={week.id} className="space-y-2">
              <h4 className="text-xs font-bold text-stone-400 uppercase tracking-wider line-clamp-1">
                {week.title}
              </h4>
              <ul className="space-y-1">
                {week.steps.map((step) => {
                  const isActive = week.id === currentWeekId && step.id === currentStepId;
                  return (
                    <li key={step.id}>
                      <button
                        onClick={() => router.push(`/course/${week.id}/${step.id}`)}
                        className={`w-full text-left p-2.5 rounded-lg text-xs transition flex items-center gap-2 ${
                          isActive 
                            ? 'bg-amber-600 text-white font-semibold shadow-sm' 
                            : 'hover:bg-stone-800 text-stone-300'
                        }`}
                      >
                        {step.type === 'quiz' ? <HelpCircle size={14} /> : <BookOpen size={14} />}
                        <span className="truncate">{step.title}</span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-4 border-t border-stone-800 mt-4 text-xs text-stone-400">
          Платформа Истфака • 2 курс
        </div>
      </aside>

      {/* ЦЕНТРАЛЬНЫЙ БЛОК: Контент лекции или исторического источника */}
      <main className="flex-1 max-w-3xl mx-auto px-6 py-12 md:px-12 overflow-y-auto">
        
        <div className="border-b border-stone-200 pb-4 mb-8 flex justify-between items-center">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-800 bg-amber-50 px-2 py-1 rounded">
              Шаг • {currentStep.duration}
            </span>
          </div>
          <span className="text-xs text-stone-500 italic">Модель FutureLearn</span>
        </div>

        <h1 className="text-3xl md:text-4xl font-serif font-black text-stone-800 mb-6 leading-tight">
          {currentStep.title}
        </h1>

        <article className="prose prose-stone max-w-none text-stone-800 leading-relaxed text-base md:text-lg space-y-6">
          <p className="whitespace-pre-line">{currentStep.content}</p>
        </article>

        {/* Раздел сносок для Милова, Зайончковского, Энгельгардта */}
        {currentStep.sources && (
          <div className="mt-8 p-5 bg-stone-100 border-l-4 border-amber-700 rounded-r-xl text-xs text-stone-700 shadow-sm">
            <span className="font-bold uppercase block text-amber-900 mb-2 tracking-wide">
              Обязательный источник / Литература к семинару:
            </span>
            {currentStep.sources.map((src, i) => (
              <p key={i} className="italic font-serif text-sm text-stone-800 mt-1">
                • {src}
              </p>
            ))}
          </div>
        )}

        {/* Кнопка прогресса (Mark as complete) */}
        <div className="mt-12 pt-6 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <button
            onClick={() => setIsCompleted(!isCompleted)}
            className={`w-full sm:w-auto px-6 py-3 rounded-full font-bold text-sm transition-all duration-200 flex items-center justify-center gap-2 shadow-sm ${
              isCompleted 
                ? 'bg-emerald-600 text-white hover:bg-emerald-700' 
                : 'bg-white border-2 border-stone-800 text-stone-800 hover:bg-stone-50'
            }`}
          >
            <CheckCircle size={18} />
            {isCompleted ? 'Выполнено!' : 'Отметить как выполненное'}
          </button>

          <button className="w-full sm:w-auto text-amber-800 hover:text-amber-950 font-bold text-sm flex items-center justify-center gap-1 transition">
            Следующий шаг <ArrowRight size={16} />
          </button>
        </div>

        {/* Семинарское обсуждение внизу шага (Визитная карточка FutureLearn) */}
        <section className="mt-16 border-t-2 border-stone-200 pt-8">
          <h3 className="text-xl font-bold text-stone-800 flex items-center gap-2 mb-6">
            <MessageSquare size={20} className="text-amber-700" />
            Академическая дискуссия ({comments.length})
          </h3>

          <form onSubmit={handleAddComment} className="mb-8">
            <textarea
              className="w-full p-4 border border-stone-300 rounded-xl text-sm focus:ring-2 focus:ring-amber-600 focus:outline-none bg-white text-stone-800 placeholder-stone-400"
              rows={3}
              placeholder="Задайте вопрос по источнику или ответьте коллегам..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
            <button 
              type="submit" 
              className="mt-2 bg-stone-800 hover:bg-stone-900 text-white text-xs font-bold py-2.5 px-4 rounded-lg transition"
            >
              Добавить аргумент в дискуссию
            </button>
          </form>

          <div className="space-y-4">
            {comments.map((comment) => (
              <div 
                key={comment.id} 
                className={`p-4 rounded-xl border transition shadow-sm text-sm ${
                  comment.author.includes('Преподаватель') 
                    ? 'bg-amber-50/60 border-amber-200' 
                    : 'bg-white border-stone-200'
                }`}
              >
                <div className="flex justify-between items-center mb-1">
                  <span className={`font-bold ${comment.author.includes('Преподаватель') ? 'text-amber-900' : 'text-stone-700'}`}>
                    {comment.author}
                  </span>
                </div>
                <p className="text-stone-600 leading-relaxed">{comment.text}</p>
              </div>
            ))}
          </div>
        </section>

      </main>
    </div>
  );
}
