'use client';
import { FlaskConical, GraduationCap, Rocket, Wrench } from 'lucide-react';

const ICONS: { [key: string]: JSX.Element } = {
    science: <FlaskConical className="h-8 w-8 text-green-500" />,
    technology: <GraduationCap className="h-8 w-8 text-blue-500" />,
    engineering: <Wrench className="h-8 w-8 text-purple-500" />,
    mathematics: <Rocket className="h-8 w-8 text-red-500" />,
};

const getBaseModules = (t: (key: string) => string) => [
  {
    title: t('stemScience'),
    description: t('stemScienceDescription'),
    icon: ICONS.science,
    href: '/games/science',
  },
  {
    title: t('stemTechnology'),
    description: t('stemTechnologyDescription'),
    icon: ICONS.technology,
    href: '/games/technology',
  },
  {
    title: t('stemEngineering'),
    description: t('stemEngineeringDescription'),
    icon: ICONS.engineering,
    href: '/games/engineering',
  },
  {
    title: t('stemMathematics'),
    description: t('stemMathematicsDescription'),
    icon: ICONS.mathematics,
    href: '/games/mathematics',
  },
];

const classModules: { [key: string]: (t: (key: string) => string) => any[] } = {
  '6': (t) => getBaseModules(t),
  '6th': (t) => getBaseModules(t),
  '7': (t) => getBaseModules(t),
  '7th': (t) => getBaseModules(t),
  '8': (t) => getBaseModules(t),
  '8th': (t) => getBaseModules(t),
  '9': (t) => getBaseModules(t),
  '9th': (t) => getBaseModules(t),
  '10': (t) => getBaseModules(t),
  '10th': (t) => getBaseModules(t),
  '11': (t) => getBaseModules(t),
  '11th': (t) => getBaseModules(t),
  '12': (t) => getBaseModules(t),
  '12th': (t) => getBaseModules(t),
  default: (t) => getBaseModules(t),
};

export function getLearningModules(userClass: string, t: (key: string) => string) {
  const classKey = userClass.toLowerCase().trim();
  const modulesFn = classModules[classKey] || classModules.default;
  return modulesFn(t);
}
