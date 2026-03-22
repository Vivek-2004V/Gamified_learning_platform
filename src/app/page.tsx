
'use client';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Zap,
  Languages,
  Smartphone,
  Puzzle,
  FlaskConical,
  BrainCircuit,
  Star,
  Trophy,
  TrendingUp,
} from 'lucide-react';
import { useLanguage } from '@/context/language-context';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

export default function Home() {
  const { t } = useLanguage();

  const features = [
    {
      Icon: Zap,
      title: t('featureOfflineTitle'),
      description: t('featureOfflineDescription'),
    },
    {
      Icon: Languages,
      title: t('featureLanguagesTitle'),
      description: t('featureLanguagesDescription'),
    },
    {
      Icon: Smartphone,
      title: t('featureDeviceTitle'),
      description: t('featureDeviceDescription'),
    },
  ];

  const playgroundFeatures = [
    {
      Icon: Puzzle,
      title: t('playgroundPuzzlesTitle'),
      description: t('playgroundPuzzlesDescription'),
    },
    {
      Icon: FlaskConical,
      title: t('playgroundLabsTitle'),
      description: t('playgroundLabsDescription'),
    },
    {
      Icon: BrainCircuit,
      title: t('playgroundQuestsTitle'),
      description: t('playgroundQuestsDescription'),
    },
  ];

  const knowledgeFeatures = [
    {
      Icon: Star,
      title: t('knowledgePointsTitle'),
      description: t('knowledgePointsDescription'),
    },
    {
      Icon: Trophy,
      title: t('knowledgeAchievementsTitle'),
      description: t('knowledgeAchievementsDescription'),
    },
    {
      Icon: TrendingUp,
      title: t('knowledgeLeaderboardTitle'),
      description: t('knowledgeLeaderboardDescription'),
    },
  ];

  return (
    <>
      <div className="relative flex-1 flex flex-col items-center justify-center text-center p-4">
        <div className="relative z-10 flex flex-col items-center space-y-6 mt-12">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl font-headline">
            {t('heroTitle')}
          </h1>
          <p className="max-w-3xl text-lg text-muted-foreground md:text-xl">
            {t('heroSubtitle')}
          </p>
          <Link href="/login">
            <Button
              size="lg"
              className="bg-accent text-accent-foreground h-12 px-8 text-base font-semibold hover:bg-accent/90 transition-transform duration-300 hover:scale-105"
            >
              {t('heroButton')}
            </Button>
          </Link>
        </div>
      </div>
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">{t('featuresTitle')}</h2>
            <div className="mt-2 h-1 w-24 bg-primary mx-auto rounded-full"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="relative group overflow-hidden rounded-lg bg-card p-8 text-center shadow-lg border border-border/50 transition-all duration-300 hover:shadow-primary/20 hover:-translate-y-2"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative z-10">
                  <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 mx-auto mb-6 transition-transform duration-300 group-hover:scale-110">
                    <feature.Icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-16 md:py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">{t('playgroundTitle')}</h2>
            <div className="mt-2 h-1 w-24 bg-primary mx-auto rounded-full"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {playgroundFeatures.map((feature, index) => (
              <div
                key={index}
                className="relative group overflow-hidden rounded-lg bg-card p-8 text-center shadow-lg border border-border/50 transition-all duration-300 hover:shadow-primary/20 hover:-translate-y-2"
              >
                 <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative z-10">
                  <div className="flex items-center justify-center h-20 w-20 rounded-full bg-primary/10 mx-auto mb-6 transition-transform duration-300 group-hover:scale-110">
                    <feature.Icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">{t('knowledgeTitle')}</h2>
            <div className="mt-2 h-1 w-24 bg-primary mx-auto rounded-full"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {knowledgeFeatures.map((feature, index) => (
              <div key={index} className="group flex flex-col items-center p-6 rounded-xl transition-all duration-300 hover:bg-card hover:shadow-lg">
                <div className="flex items-center justify-center h-20 w-20 rounded-full border-2 border-primary bg-primary/10 mb-6 transition-all duration-300 group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground">
                  <feature.Icon className="h-8 w-8 text-primary transition-colors duration-300 group-hover:text-primary-foreground" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground max-w-xs">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <footer className="bg-background border-t py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-1">
              <h3 className="font-semibold mb-4">{t('quickLinks')}</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-primary transition-transform duration-200 inline-block hover:-translate-y-0.5">
                    {t('aboutUs')}
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-primary transition-transform duration-200 inline-block hover:-translate-y-0.5">
                    {t('contact')}
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-primary transition-transform duration-200 inline-block hover:-translate-y-0.5">
                    {t('privacyPolicy')}
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-primary transition-transform duration-200 inline-block hover:-translate-y-0.5">
                    {t('termsOfService')}
                  </Link>
                </li>
              </ul>
            </div>

            <div className="col-span-1 md:col-span-1">
              <h3 className="font-semibold mb-4">{t('followUs')}</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-primary transition-transform duration-200 inline-block hover:-translate-y-0.5">
                    Facebook
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-primary transition-transform duration-200 inline-block hover:-translate-y-0.5">
                    Twitter
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-primary transition-transform duration-200 inline-block hover:-translate-y-0.5">
                    Instagram
                  </Link>
                </li>
              </ul>
            </div>

            <div className="col-span-2 md:col-span-2">
              <h3 className="font-semibold mb-4">{t('haveFeedback')}</h3>
              <p className="text-muted-foreground mb-4">
                {t('feedbackPrompt')}
              </p>
              <form className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input placeholder={t('fullName')} />
                  <Input type="email" placeholder={t('email')} />
                </div>
                <Textarea placeholder={t('message')} />
                <Button type="submit" className="w-full sm:w-auto transition-transform duration-300 hover:scale-105 hover:-translate-y-1 shadow-lg hover:shadow-primary/30">
                  {t('submitFeedback')}
                </Button>
              </form>
            </div>
          </div>
          <div className="mt-12 border-t pt-8 text-center text-muted-foreground">
            &copy; {new Date().getFullYear()} VidyaSphere. {t('allRightsReserved')}.
          </div>
        </div>
      </footer>
    </>
  );
}
