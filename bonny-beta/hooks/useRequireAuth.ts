import { useEffect } from 'react';
import { useRouter } from 'expo-router';
import { useAuth } from '@/context/authContext';

export const useRequireAuth = () => {
  const { session } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!session) {
      router.replace("/");
    }
  }, [session, router]);

  return session;
};