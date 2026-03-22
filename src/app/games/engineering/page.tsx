'use client';
import { useLanguage } from '@/context/language-context';
import { Cog, Wrench, Bot, SlidersHorizontal } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { useUser, useFirestore, useMemoFirebase } from '@/firebase';
import { doc } from 'firebase/firestore';
import { useDoc } from '@/firebase/firestore/use-doc';

export default function EngineeringGamesPage() {
  const { t } = useLanguage();

  const engineeringCategories = [
    {
      title: t('quizzes'),
      description: t('quizzesDescription'),
      icon: <Wrench className="h-8 w-8 text-primary" />,
      href: '/games/engineering/quiz',
    },
    {
      title: t('simulations'),
      description: t('engineeringSimulationsDescription'),
      icon: <Bot className="h-8 w-8 text-primary" />,
      href: '/games/engineering/simulations',
    },
  ];

  return (
    <div className="flex-1 p-4 md:p-8">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <Cog className="h-16 w-16 mx-auto text-primary mb-4" />
          <h1 className="text-4xl font-bold">{t('stemEngineering')}</h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            {t('engineeringPageSubtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {engineeringCategories.map((category) => (
            <Link href={category.href} key={category.title} className="group">
              <Card className="relative overflow-hidden shadow-lg hover:shadow-primary/30 hover:-translate-y-2 transition-all duration-300 flex flex-col h-full animate-float">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,_rgba(163,123,255,0.2),_transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse-slow"></div>
                <CardHeader className="relative flex flex-col items-center justify-center text-center">
                  <div className="mb-4 flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 transition-colors duration-300 group-hover:bg-primary/20">
                    {category.icon}
                  </div>
                  <CardTitle className="text-xl">{category.title}</CardTitle>
                </CardHeader>
                <CardContent className="relative text-center text-muted-foreground text-sm flex-grow">
                  <p>{category.description}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
