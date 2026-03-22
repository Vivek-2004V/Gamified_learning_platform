'use client';
import React from 'react';
import { useLanguage } from '@/context/language-context';
import { Rocket, Calculator, Pyramid, Footprints, Grid } from 'lucide-react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import Link from 'next/link';

export default function MathematicsSimulationsPage() {
  const { t } = useLanguage();

  const simulationChapters = [
    {
      title: t('mathRocketTitle'),
      description: t('mathRocketDescription'),
      icon: <Rocket className="h-8 w-8 text-primary" />,
      href: '/games/mathematics/simulations/chapter1',
    },
    {
      title: t('placeValuePyramidTitle'),
      description: t('placeValuePyramidDescription'),
      icon: <Pyramid className="h-8 w-8 text-primary" />,
      href: '/games/mathematics/simulations/chapter2',
    },
    {
      title: t('numberLineHopscotchTitle'),
      description: t('numberLineHopscotchDescription'),
      icon: <Footprints className="h-8 w-8 text-primary" />,
      href: '/games/mathematics/simulations/chapter3',
    },
    {
      title: t('numberConceptsChallengeTitle'),
      description: t('numberConceptsChallengeDescription'),
      icon: <Grid className="h-8 w-8 text-primary" />,
      href: '/games/mathematics/simulations/chapter4',
    },
  ];

  return (
    <div className="flex-1 p-4 md:p-8">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold">{t('simulations')}</h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            {t('mathematicsSimulationsDescription')}
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-2xl mx-auto">
          {simulationChapters.map((sim: any, index) => {
            const cardContent = (
              <Card
                className={`shadow-lg flex flex-col items-center justify-center text-center p-6 h-full ${
                  sim.comingSoon
                    ? 'opacity-50 cursor-not-allowed'
                    : 'group-hover:shadow-xl group-hover:-translate-y-1 transition-all duration-300'
                }`}
              >
                <CardHeader>
                  <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 mx-auto mb-4">
                    {sim.icon}
                  </div>
                  <CardTitle>{sim.title}</CardTitle>
                </CardHeader>
                <CardDescription>{sim.description}</CardDescription>
                {sim.comingSoon && (
                  <div className="mt-4 text-sm font-semibold text-primary">
                    {t('simulationComingSoon')}
                  </div>
                )}
              </Card>
            );

            if (sim.comingSoon) {
              return (
                <div key={index} className="group">
                  {cardContent}
                </div>
              );
            }

            return (
              <Link href={sim.href} key={index} className="group">
                {cardContent}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
