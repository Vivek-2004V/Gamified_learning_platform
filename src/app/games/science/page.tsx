
'use client';
import { useLanguage } from '@/context/language-context';
import { FlaskConical, ClipboardCheck, Orbit } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { useUser, useFirestore, useMemoFirebase, useDoc } from '@/firebase';
import { doc } from 'firebase/firestore';
import { Skeleton } from '@/components/ui/skeleton';

export default function ScienceGamesPage() {
  const { t } = useLanguage();
  const { user, isUserLoading } = useUser();
  const firestore = useFirestore();

  const userDocRef = useMemoFirebase(
    () => (firestore && user ? doc(firestore, 'users', user.uid) : null),
    [firestore, user]
  );
  const { data: userData, isLoading: isUserDataLoading } = useDoc(userDocRef);

  const isLoading = isUserLoading || isUserDataLoading;

  if (isLoading) {
    return (
      <div className="flex-1 p-4 md:p-8">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <Skeleton className="h-16 w-16 mx-auto rounded-full mb-4" />
            <Skeleton className="h-10 w-1/2 mx-auto" />
            <Skeleton className="h-6 w-3/4 mx-auto mt-4" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <Skeleton className="h-64" />
            <Skeleton className="h-64" />
            <Skeleton className="h-64" />
          </div>
        </div>
      </div>
    );
  }
  
  const scienceCategories = [
    {
      title: t('scienceQuizzes'),
      description: t('scienceQuizzesDescription'),
      icon: <ClipboardCheck className="h-8 w-8 text-primary" />,
      href: '/games/science/quiz',
    },
    {
      title: t('scienceSimulations'),
      description: t('scienceSimulationsDescription'),
      icon: <Orbit className="h-8 w-8 text-primary" />,
      href: '/games/science/simulations',
    },
  ];

  return (
    <div className="flex-1 p-4 md:p-8">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <FlaskConical className="h-16 w-16 mx-auto text-primary mb-4" />
          <h1 className="text-4xl font-bold">{t('stemScience')}</h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            {t('sciencePageSubtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {scienceCategories.map((category) => (
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
