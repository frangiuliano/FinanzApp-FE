import { create } from 'zustand';
import { Transaction } from '@/types/transaction';
import * as transactionService from '@/services/transactions';

interface TransactionStore {
  transactions: Transaction[];
  loading: boolean;
  error: string | null;
  loadTransactions: () => Promise<void>;
  addTransaction: (transaction: Transaction) => void;
  updateTransaction: (id: string, transaction: Partial<Transaction>) => void;
  deleteTransaction: (id: string) => void;
}

export const useTransactionStore = create<TransactionStore>((set, get) => ({
  transactions: [],
  loading: false,
  error: null,
  
  loadTransactions: async () => {
    set({ loading: true, error: null });
    try {
      const transactions = await transactionService.getTransactions();
      set({ transactions, loading: false });
    } catch (error) {
      console.error('Error loading transactions:', error);
      set({ error: 'Failed to load transactions', loading: false });
    }
  },
  
  addTransaction: (transaction: Transaction) => {
    set((state) => ({
      transactions: [...state.transactions, transaction],
    }));
  },
  
  updateTransaction: (id: string, updatedTransaction: Partial<Transaction>) => {
    set((state) => ({
      transactions: state.transactions.map((transaction) =>
        transaction._id === id
          ? { ...transaction, ...updatedTransaction }
          : transaction
      ),
    }));
  },
  
  deleteTransaction: (id: string) => {
    set((state) => ({
      transactions: state.transactions.filter(
        (transaction) => transaction._id !== id
      ),
    }));
  },
}));