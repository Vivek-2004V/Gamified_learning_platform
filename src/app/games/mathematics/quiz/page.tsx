'use client';
import { MathematicsQuiz } from '@/components/mathematics-quiz';
import { useLanguage } from '@/context/language-context';

export default function MathematicsQuizPage() {
  const { t } = useLanguage();

  return (
    <div className="flex-1 p-4 md:p-8">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold">{t('mathQuizzes')}</h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            {t('mathQuizzesDescription')}
          </p>
        </div>
        <MathematicsQuiz />
      </div>
    </div>
  );
}