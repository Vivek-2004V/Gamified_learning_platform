'use client';
import { useLanguage } from '@/context/language-context';
import { Cog, Wrench, Bot, SlidersHorizontal, Cpu } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';

export default function EngineeringSimulationsPage() {
  const { t } = useLanguage();

  const engineeringCategories = [
    {
      title: t('stabilityEngineeringTitle'),
      description: t('simulation1Description'),
      icon: <Wrench className="h-8 w-8 text-primary" />,
      href: '/games/engineering/simulations/chapter1',
      comingSoon: false,
    },
    {
      title: t('logicLinkTitle'),
      description: t('logicLinkDescription'),
      icon: <Cpu className="h-8 w-8 text-primary" />,
      href: '/games/engineering/simulations/chapter2',
      comingSoon: false,
    },
  ];

  return (
    <div className="flex-1 p-4 md:p-8">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <Bot className="h-16 w-16 mx-auto text-primary mb-4" />
          <h1 className="text-4xl font-bold">{t('simulations')}</h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            {t('engineeringSimulationsDescription')}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {engineeringCategories.map((category) => {
            const cardContent = (
              <Card
                className={`shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full ${
                  category.comingSoon ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                <CardHeader className="flex flex-col items-center justify-center text-center">
                  <div className="mb-4 flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 transition-colors duration-300 group-hover:bg-primary/20">
                    {category.icon}
                  </div>
                  <CardTitle className="text-xl">{category.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-center text-muted-foreground text-sm flex-grow">
                  <p>{category.description}</p>
                  {category.comingSoon && (
                    <div className="mt-4 text-sm font-semibold text-primary">
                      {t('simulationComingSoon')}
                    </div>
                  )}
                </CardContent>
              </Card>
            );

            if (category.comingSoon) {
              return (
                <div key={category.title} className="group">
                  {cardContent}
                </div>
              );
            }

            return (
              <Link href={category.href} key={category.title} className="group">
                {cardContent}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
