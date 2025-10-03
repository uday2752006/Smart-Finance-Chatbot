'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { BankBalance } from '@/components/dashboard/bank-balance';
import { Chatbot } from '@/components/dashboard/chatbot';
import { NormalUserDashboard } from '@/components/dashboard/normal-dashboard';
import { StudentUserDashboard } from '@/components/dashboard/student-dashboard';
import { Header } from '@/components/dashboard/header';
import { useUser, useFirestore, useDoc, useMemoFirebase } from '@/firebase';
import { doc } from 'firebase/firestore';

export default function DashboardPage() {
  const router = useRouter();
  const { user, isUserLoading } = useUser();
  const firestore = useFirestore();
  const [balance, setBalance] = useState(12530.75);

  const userDocRef = useMemoFirebase(
    () => (user ? doc(firestore, 'users', user.uid) : null),
    [firestore, user]
  );
  const { data: userData, isLoading: isUserDocLoading } = useDoc(userDocRef);

  const role = userData?.role || 'normal';

  useEffect(() => {
    if (!isUserLoading && !user) {
      router.push('/');
    }
  }, [isUserLoading, user, router]);

  if (isUserLoading || !user || isUserDocLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full flex flex-col bg-background">
      <Header balance={balance} />
      <main className="flex-1 p-4 sm:p-6 lg:p-8">
        <div className="container mx-auto">
          <div className="flex flex-col gap-8">
            {role === 'normal' && (
              <BankBalance balance={balance} setBalance={setBalance} />
            )}
            <Chatbot role={role as 'normal' | 'student'} />
            {role === 'normal' ? (
              <NormalUserDashboard balance={balance} />
            ) : (
              <StudentUserDashboard />
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
