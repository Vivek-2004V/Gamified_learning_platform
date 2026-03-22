'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUser, useFirestore, useDoc, useMemoFirebase } from '@/firebase';
import { doc } from 'firebase/firestore';

interface UserData {
  class?: string;
}

export default function Class6RedirectPage() {
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
      const userClass = userData?.class?.toLowerCase().trim();
      if (userClass === '6' || userClass === '6th') {
        router.replace('/class-6/dashboard');
      } else {
        // If not a class 6 user, redirect to the generic dashboard which will handle redirection
        router.replace('/dashboard');
      }
    }
  }, [userData, isLoading, router, isUserLoading, isUserDataLoading]);

  return (
    <div className="flex h-screen w-full items-center justify-center">
    </div>
  );
}
