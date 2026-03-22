'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUser, useFirestore, useDoc, useMemoFirebase } from '@/firebase';
import { doc } from 'firebase/firestore';

interface UserData {
  class?: string;
}

export default function GamesRedirectPage() {
  const router = useRouter();
  const { user, isUserLoading } = useUser();
  const firestore = useFirestore();

  const userDocRef = useMemoFirebase(
    () => (user ? doc(firestore, 'users', user.uid) : null),
    [user, firestore]
  );

  const { data: userData, isLoading: isUserDataLoading } =
    useDoc<UserData>(userDocRef);

  useEffect(() => {
    const isLoading = isUserLoading || isUserDataLoading;
    if (!isLoading) {
      if (user && userData?.class) {
        const classPath = userData.class.toLowerCase().replace('th', '').replace(' grade', '');
        router.replace(`/class-${classPath}`);
      } else if (!user) {
        router.replace('/login');
      } else {
        router.replace('/');
      }
    }
  }, [userData, user, router, isUserLoading, isUserDataLoading]);

  return (
    <div className="flex h-screen w-full items-center justify-center">
      <p>Loading games...</p>
    </div>
  );
}
