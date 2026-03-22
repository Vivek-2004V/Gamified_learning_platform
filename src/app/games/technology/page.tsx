'use client';
import { useLanguage } from '@/context/language-context';
import { Laptop, Code, PlayCircle, CircuitBoard } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';

export default function TechnologyGamesPage() {
  const { t } = useLanguage();

  const technologyCategories = [
   {
      title: t('quizzes'),
      description: t('quizzesDescription'),
      icon: <Code className="h-8 w-8 text-primary" />,
      href: '/games/technology/quiz',
    },
    {
      title: t('simulations'),
      description: t('simulationsDescription'),
      icon: <PlayCircle className="h-8 w-8 text-primary" />,
      href: '/games/technology/simulations',
    },
  ];

  return (
    <div className="flex-1 p-4 md:p-8">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <Laptop className="h-16 w-16 mx-auto text-primary mb-4" />
          <h1 className="text-4xl font-bold">{t('stemTechnology')}</h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            {t('technologyPageSubtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {technologyCategories.map((category) => (
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
