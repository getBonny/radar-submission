import React, { createContext, useState, useEffect, useContext } from 'react';
import { Session } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase';
import { TransactionType } from '@/src/types';
import { useAuth } from '@/context/authContext';
import { getUserTransactions } from '@/services/api/transactions';
import { useUser } from './userContext';

type TransactionContextType = {
    transactions: TransactionType[];
    setTransactions: React.Dispatch<React.SetStateAction<TransactionType[]>>;
    listenToChannel: (receiptCount: number) => Promise<void>;
    isListening: boolean;
    demandedReceiptCount: number;
    receivedTransactionCount: number;
};

const TransactionContext = createContext<TransactionContextType | undefined>(undefined);

export const TransactionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [transactions, setTransactions] = useState<TransactionType[]>([]);
  const [isListening, setIsListening] = useState<boolean>(false);
  const [demandedReceiptCount, setDemandedReceiptCount] = useState<number>(0);
  const [receivedTransactionCount, setReceivedTransactionCount] = useState<number>(0);
  const { session } = useAuth();
  const { refreshUser } = useUser();
  const userId = session?.user?.id;

  const listenToChannel = async (receiptCount: number) => {
    if (!userId) return;

    console.log('Listening to channel:', userId);
    setIsListening(true);
    setDemandedReceiptCount(receiptCount);
    setReceivedTransactionCount(0);

    const channel = supabase.channel(userId);
    channel.on("broadcast", {"event":"receipt_extract"}, async (message) => {
        const payload = message.payload.transaction as TransactionType;
        
        setTransactions(prev => [payload, ...prev]);
        setReceivedTransactionCount(count => {
          const newCount = count + 1;
          if (newCount >= receiptCount) {
            setIsListening(false);
            channel.unsubscribe();
          }
          return newCount;
        });

        await refreshUser();
    });
    channel.subscribe();
  };

  const fetchTransactions = async () => {
    console.log('Fetching transactions:', userId);
    try {
      const userTransactions = await getUserTransactions();
      console.log('User transactions:', userTransactions);
      setTransactions(userTransactions);
      // Sort transactions by date, newest date first
      userTransactions.sort((a, b) => new Date(b.createdOn).getTime() - new Date(a.createdOn).getTime());
    } catch (error) {
      console.error("Error fetching user transactions:", error);
      // Optionally, you can set an error state or show a notification to the user
    }
  };

  useEffect(() => {
    if (userId) {
      fetchTransactions();
    }
  }, [userId]);

  return (
    <TransactionContext.Provider value={{ transactions, setTransactions, listenToChannel, isListening, demandedReceiptCount, receivedTransactionCount }}>
      {children}
    </TransactionContext.Provider>
  );
};

export const useTransaction = () => {
  const context = useContext(TransactionContext);
  if (context === undefined) {
    throw new Error('useTransaction must be used within a TransactionProvider');
  }
  return context;
};