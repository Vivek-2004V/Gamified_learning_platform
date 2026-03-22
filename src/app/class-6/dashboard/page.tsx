
'use client';

import {
  LayoutDashboard,
  GraduationCap,
  Folder,
  Youtube,
  FileText,
  FlaskConical,
  Laptop,
  Wrench,
  Calculator,
} from 'lucide-react';
import Link from 'next/link';
import { useUser, useFirestore, useMemoFirebase, useDoc } from '@/firebase';
import { doc } from 'firebase/firestore';
import { useLanguage } from '@/context/language-context';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';

interface UserData {
  name: string;
  class: string;
}

export default function DashboardPage() {
  const { user, isUserLoading } = useUser();
  const firestore = useFirestore();
  const { t } = useLanguage();

  const userDocRef = useMemoFirebase(
    () => (firestore && user ? doc(firestore, 'users', user.uid) : null),
    [firestore, user]
  );

  const { data: userData, isLoading: isUserDataLoading } = useDoc<UserData>(userDocRef);

  if (isUserLoading || isUserDataLoading) {
    return (
      <div className="flex-1 p-8 space-y-6">
        <Skeleton className="h-10 w-1/3" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Skeleton className="h-40" />
          <Skeleton className="h-40" />
        </div>
        <Skeleton className="h-10 w-1/4 mt-8" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Skeleton className="h-48" />
          <Skeleton className="h-48" />
          <Skeleton className="h-48" />
          <Skeleton className="h-48" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 p-4 sm:p-6 md:p-8 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            {t('dashboardTitle')} - Class 6
          </h1>
          <p className="text-muted-foreground">
            {userData ? t('welcomeMessage', { name: userData.name }) : t('loading')}
          </p>
        </div>
        {userData && (
          <div className="text-right">
             <p className="text-sm text-muted-foreground">{t('yourClass')}</p>
             <p className="font-semibold">{userData.class}</p>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link href="/dashboard/progress">
          <Card className="hover:bg-muted/50 transition-colors h-full">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-lg font-medium">
                {t('progressTracking')}
              </CardTitle>
              <LayoutDashboard className="w-6 h-6 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                {t('progressTrackingDescription')}
              </p>
            </CardContent>
          </Card>
        </Link>
        <Link href="/dashboard/achievements">
          <Card className="hover:bg-muted/50 transition-colors h-full">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-lg font-medium">
                {t('achievements')}
              </CardTitle>
              <GraduationCap className="w-6 h-6 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                {t('achievementsDescription')}
              </p>
            </CardContent>
          </Card>
        </Link>
      </div>

      <section>
        <h2 className="text-2xl font-bold tracking-tight mb-4">{t('learningMaterial')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full text-center">
              <CardHeader>
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <Folder className="h-8 w-8 text-primary" />
                </div>
                <CardTitle>{t('classMaterialsTitle')}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow flex flex-col justify-center">
                <p className="text-sm text-muted-foreground mb-4">{t('classMaterialsDescription')}</p>
                <div className="flex flex-col sm:flex-row justify-center gap-2">
                    <a href="https://drive.google.com/drive/folders/1ZYan40ZAQMiSHKoJSrHr3NKCZ4sEcE01?usp=drive_link" target="_blank" rel="noopener noreferrer" className="flex-1">
                        <Button variant="outline" className="w-full">English</Button>
                    </a>
                    <a href="https://drive.google.com/drive/folders/1-Jq3dpNR12IExdYtWZtFWfs750Iv6kY-?usp=sharing" target="_blank" rel="noopener noreferrer" className="flex-1">
                        <Button variant="outline" className="w-full">Hindi</Button>
                    </a>
                </div>
              </CardContent>
          </Card>
          
          <a href="https://youtube.com/playlist?list=PLVLoWQFkZbhW47wzJZJ6mkN_K9jeiAFhK&si=fpFz3_bCBax_Jb9o" target="_blank" rel="noopener noreferrer">
            <Card className="shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full text-center">
                <CardHeader>
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                    <Youtube className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle>{t('videoLecturesTitle')}</CardTitle>
                </CardHeader>
                 <CardContent>
                  <p className="text-sm text-muted-foreground">{t('videoLecturesDescription')}</p>
                </CardContent>
            </Card>
          </a>
          <Link href="/dashboard/worksheets">
            <Card className="shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full text-center">
                <CardHeader>
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                    <FileText className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle>{t('learningMaterialWorksheets')}</CardTitle>
                </CardHeader>
                 <CardContent>
                  <p className="text-sm text-muted-foreground">{t('learningMaterialWorksheetsDescription')}</p>
                </CardContent>
            </Card>
          </Link>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold tracking-tight mb-4">{t('learningModules')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Link href="/games/science">
            <Card className="shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full text-center">
              <CardHeader>
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-500/10">
                  <FlaskConical className="h-8 w-8 text-green-500" />
                </div>
                <CardTitle>{t('stemScience')}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{t('stemScienceDescription')}</p>
              </CardContent>
            </Card>
          </Link>
          <Link href="/games/technology">
            <Card className="shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full text-center">
              <CardHeader>
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-blue-500/10">
                  <Laptop className="h-8 w-8 text-blue-500" />
                </div>
                <CardTitle>{t('stemTechnology')}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{t('stemTechnologyDescription')}</p>
              </CardContent>
            </Card>
          </Link>
          <Link href="/games/engineering">
            <Card className="shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full text-center">
              <CardHeader>
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-purple-500/10">
                  <Wrench className="h-8 w-8 text-purple-500" />
                </div>
                <CardTitle>{t('stemEngineering')}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{t('stemEngineeringDescription')}</p>
              </CardContent>
            </Card>
          </Link>
          <Link href="/games/mathematics">
            <Card className="shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full text-center">
              <CardHeader>
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-500/10">
                  <Calculator className="h-8 w-8 text-red-500" />
                </div>
                <CardTitle>{t('stemMathematics')}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{t('stemMathematicsDescription')}</p>
              </CardContent>
            </Card>
          </Link>
        </div>
      </section>


      {!user && !isUserLoading && (
        <div className="text-center p-8 bg-muted rounded-lg">
            <h2 className="text-xl font-bold mb-2">Content Locked</h2>
            <p className="text-muted-foreground mb-4">Please log in to access your dashboard and learning materials.</p>
            <Link href="/login">
                <Button>Go to Login</Button>
            </Link>
        </div>
      )}

    </div>
  );
}
