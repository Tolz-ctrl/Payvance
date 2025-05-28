import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import WalletService, { Transaction, WalletBalance } from '../services/api/wallet/WalletService';
import PaymentService from '../services/api/payment/PaymentService';
import { useUser as useAuth } from './AuthContext';

interface WalletContextType {
  balance: WalletBalance;
  transactions: Transaction[];
  isLoading: boolean;
  error: string | null;
  refreshWallet: () => Promise<void>;
  fundWallet: (amount: number, method: string) => Promise<string>;
  withdrawFunds: (amount: number, bankCode: string, accountNumber: string) => Promise<Transaction>;
  verifyTransaction: (reference: string) => Promise<void>;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export const WalletProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { user, isAuthenticated } = useAuth();
  const [balance, setBalance] = useState<WalletBalance>({ balance: 0, pendingCredit: 0, pendingDebit: 0 });
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const refreshWallet = async () => {
    if (!isAuthenticated) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      const [balanceData, transactionsData] = await Promise.all([
        WalletService.getWalletBalance(),
        WalletService.getTransactionHistory()
      ]);
      
      setBalance(balanceData);
      setTransactions(transactionsData);
    } catch (err) {
      setError('Failed to load wallet data. Please try again.');
      console.error('Wallet refresh error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const fundWallet = async (amount: number, method: string): Promise<string> => {
    if (!user?.email) {
      throw new Error('User email is required');
    }
    
    setIsLoading(true);
    setError(null);
    
    try {
      // 1. Initialize payment with payment gateway
      const paymentMethod = method as 'card' | 'bank' | 'ussd' | 'qr' | 'bank_transfer' | 'opay' | 'moniepoint';
      const response = await PaymentService.initializePayment({
        amount,
        email: user.email,
        paymentMethod,
        metadata: {
          user_id: user.id,
          transaction_type: 'wallet_funding'
        }
      });
      
      // 2. Record pending transaction in our system
      const transaction: Partial<Transaction> = {
        type: 'credit',
        amount,
        description: 'Wallet Funding',
        date: new Date().toISOString(),
        status: 'pending',
        method: method,
        reference: response.data.reference
      };
      
      const recordedTransaction = await WalletService.recordTransaction(transaction);
      
      // 3. Update local state with the new pending transaction
      setTransactions(prev => [recordedTransaction, ...prev]);
      
      // 4. Update balance with pending credit
      setBalance(prev => ({
        ...prev,
        pendingCredit: prev.pendingCredit + amount
      }));
      
      return response.data.reference;
    } catch (err) {
      setError('Failed to initiate wallet funding. Please try again.');
      console.error('Wallet funding error:', err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const verifyTransaction = async (reference: string): Promise<void> => {
    setIsLoading(true);
    setError(null);
    
    try {
      // 1. Verify transaction with payment gateway
      const verificationResponse = await PaymentService.verifyTransaction(reference);
      
      // 2. Find the transaction in our local state
      const transactionIndex = transactions.findIndex(t => t.reference === reference);
      
      if (transactionIndex === -1) {
        throw new Error('Transaction not found');
      }
      
      // 3. Update transaction status based on verification response
      const updatedStatus = verificationResponse.data.status === 'success' 
        ? 'completed' 
        : verificationResponse.data.status === 'pending' 
          ? 'pending' 
          : 'failed';
      
      const updatedTransaction = await WalletService.updateTransactionStatus(
        transactions[transactionIndex].id,
        updatedStatus
      );
      
      // 4. Update local state
      const updatedTransactions = [...transactions];
      updatedTransactions[transactionIndex] = updatedTransaction;
      setTransactions(updatedTransactions);
      
      // 5. Update balance
      if (updatedStatus === 'completed') {
        // If transaction was successful, move amount from pendingCredit to actual balance
        if (transactions[transactionIndex].type === 'credit') {
          setBalance(prev => ({
            ...prev,
            balance: prev.balance + transactions[transactionIndex].amount,
            pendingCredit: prev.pendingCredit - transactions[transactionIndex].amount
          }));
        } else if (transactions[transactionIndex].type === 'debit') {
          // For debit transactions, we've already reduced the balance, just clear the pending amount
          setBalance(prev => ({
            ...prev,
            pendingDebit: prev.pendingDebit - transactions[transactionIndex].amount
          }));
        }
      } else if (updatedStatus === 'failed' && transactions[transactionIndex].type === 'debit') {
        // If a debit transaction failed, restore the balance
        setBalance(prev => ({
          ...prev,
          balance: prev.balance + transactions[transactionIndex].amount,
          pendingDebit: prev.pendingDebit - transactions[transactionIndex].amount
        }));
      }
    } catch (err) {
      setError('Failed to verify transaction. Please contact support.');
      console.error('Transaction verification error:', err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const withdrawFunds = async (amount: number, bankCode: string, accountNumber: string): Promise<Transaction> => {
    setIsLoading(true);
    setError(null);
    
    try {
      // 1. Check if user has sufficient balance
      if (balance.balance < amount) {
        throw new Error('Insufficient balance');
      }
      
      // 2. Initiate withdrawal
      const transaction = await WalletService.initiateWithdrawal(amount, bankCode, accountNumber);
      
      // 3. Update local state
      setTransactions(prev => [transaction, ...prev]);
      
      // 4. Update balance
      if (transaction.status === 'pending') {
        setBalance(prev => ({
          ...prev,
          balance: prev.balance - amount,
          pendingDebit: prev.pendingDebit + amount
        }));
      } else if (transaction.status === 'completed') {
        setBalance(prev => ({
          ...prev,
          balance: prev.balance - amount
        }));
      }
      
      return transaction;
    } catch (err) {
      setError('Failed to initiate withdrawal. Please try again.');
      console.error('Withdrawal error:', err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Load wallet data when user authenticates
  useEffect(() => {
    if (isAuthenticated) {
      refreshWallet();
    }
  }, [isAuthenticated]);

  const value: WalletContextType = {
    balance,
    transactions,
    isLoading,
    error,
    refreshWallet,
    fundWallet,
    withdrawFunds,
    verifyTransaction
  };

  return <WalletContext.Provider value={value}>{children}</WalletContext.Provider>;
};

export const useWallet = (): WalletContextType => {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
};
