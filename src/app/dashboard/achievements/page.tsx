'use client';
import { achievements, Achievement } from '@/lib/achievements-data';
import { useLanguage } from '@/context/language-context';
import { Check, Lock, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AchievementCoin } from '@/components/ui/achievement-coin';

export default function AchievementsPage() {
  const { t } = useLanguage();

  const handleDownload = (achievement: Achievement) => {
    const coinElement = document.getElementById(`coin-${achievement.titleKey}`);
    if (coinElement) {
      const svgData = new XMLSerializer().serializeToString(coinElement);
      const blob = new Blob([svgData], { type: 'image/svg+xml' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${achievement.titleKey}.svg`;
      link.click();
      URL.revokeObjectURL(url);
    }
  };

  return (
    <div className="flex-1 space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {achievements.map((achievement: Achievement, index: number) => (
          <div
            key={index}
            className="flex flex-col items-center p-6 rounded-2xl bg-card shadow-lg border border-border/50"
          >
            <div className="relative mb-4">
              <AchievementCoin
                id={`coin-${achievement.titleKey}`}
                icon={achievement.icon}
                unlocked={achievement.unlocked}
              />
              <div
                className={`absolute -bottom-2 -right-2 rounded-full p-1.5 border-2 border-background ${
                  achievement.unlocked
                    ? 'bg-green-500 text-white'
                    : 'bg-muted-foreground text-muted'
                }`}
              >
                {achievement.unlocked ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <Lock className="h-4 w-4" />
                )}
              </div>
            </div>
            <h3 className="text-xl font-bold text-center">
              {t(achievement.titleKey)}
            </h3>
            <p className="text-muted-foreground text-center text-sm mt-1 mb-4 h-10">
              {t(achievement.descriptionKey)}
            </p>
            <Button
              onClick={() => handleDownload(achievement)}
              disabled={!achievement.unlocked}
              variant="outline"
              size="sm"
            >
              <Download className="mr-2 h-4 w-4" />
              {t('download')}
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
