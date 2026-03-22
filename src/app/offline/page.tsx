'use client';
import { WifiOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/context/language-context';
import Link from 'next/link';

export default function OfflinePage() {
  const { t } = useLanguage();

  const handleRetry = () => {
    window.location.reload();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 text-center p-4">
      <WifiOff className="w-24 h-24 text-red-500 mb-6" />
      <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-200 mb-2">
        {t('youAreOffline')}
      </h1>
      <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto">
        {t('offlineMessage')}
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <Button onClick={handleRetry} size="lg">
          {t('retry')}
        </Button>
        <Link href="/class-6/science/the-wonderful-world-of-science" passHref>
          <Button size="lg" variant="outline">
            Read Cached Chapter
          </Button>
        </Link>
      </div>
      <p className="mt-8 text-sm text-muted-foreground">
        Some features, like this cached chapter, are available offline thanks to PWA technology.
      </p>
    </div>
  );
}
