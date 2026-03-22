'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUser, useFirestore, useDoc, useMemoFirebase } from '@/firebase';
import { doc } from 'firebase/firestore';
import { Loader2 } from 'lucide-react';

interface UserData {
  class?: string;
}

export default function DashboardRedirectPage() {
  const router = useRouter();
  const { user, isUserLoading } = useUser();
  const firestore = useFirestore();

  const userDocRef = useMemoFirebase(
    () => (user ? doc(firestore, 'users', user.uid) : null),
    [user, firestore]
  );

  const { data: userData, isLoading: isUserDataLoading } =
    useDoc<UserData>(userDocRef);
    
  const isLoading = isUserLoading || isUserDataLoading;

  useEffect(() => {
    if (!isLoading) {
      if (user && userData?.class) {
        const classPath = userData.class.toLowerCase().replace('th', '').replace(' grade', '');
        router.replace(`/class-${classPath}`);
      } else if (!user) {
        router.replace('/login');
      }
    }
  }, [userData, user, isLoading, router]);

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center space-y-4">
      <Loader2 className="h-12 w-12 animate-spin text-primary" />
    </div>
  );
}
