'use client';

import {
  LayoutDashboard,
  GraduationCap,
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
            {t('dashboardTitle')} - Class 8
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
