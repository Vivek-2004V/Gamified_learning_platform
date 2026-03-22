'use client';
import { Youtube } from 'lucide-react';
import { useLanguage } from '@/context/language-context';

export default function VideosPage() {
  const { t } = useLanguage();

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-4">
      <Youtube className="w-24 h-24 text-primary mb-6" />
      <h1 className="text-4xl font-bold text-foreground mb-2">
        {t('learningMaterialVideoLectures')}
      </h1>
      <p className="text-lg text-muted-foreground max-w-md mx-auto">
        {t('comingSoonDescription')}
      </p>
    </div>
  );
}
