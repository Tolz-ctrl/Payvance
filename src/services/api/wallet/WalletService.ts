import axios from 'axios';
import { API_CONFIG } from '../config';

export interface Transaction {
  id: string;
  type: 'credit' | 'debit';
  amount: number;
  description: string;
  date: string;
  status: 'completed' | 'pending' | 'failed';
  method: string;
  reference?: string;
}

export interface WalletBalance {
  balance: number;
  pendingCredit: number;
  pendingDebit: number;
}

class WalletService {
  private baseUrl = 'https://api.payvance.com/v1'; // Replace with your actual API URL
  
  async getWalletBalance(): Promise<WalletBalance> {
    try {
      const response = await axios.get(`${this.baseUrl}/wallet/balance`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      return response.data;
    } catch (error) {
      console.error('Failed to fetch wallet balance:', error);
      throw error;
    }
  }
  
  async getTransactionHistory(page = 1, limit = 10): Promise<Transaction[]> {
    try {
      const response = await axios.get(`${this.baseUrl}/wallet/transactions`, {
        params: { page, limit },
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      return response.data.transactions;
    } catch (error) {
      console.error('Failed to fetch transaction history:', error);
      throw error;
    }
  }
  
  async initiateWithdrawal(amount: number, bankCode: string, accountNumber: string): Promise<Transaction> {
    try {
      const response = await axios.post(`${this.baseUrl}/wallet/withdraw`, {
        amount,
        bankCode,
        accountNumber
      }, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      return response.data;
    } catch (error) {
      console.error('Withdrawal initiation failed:', error);
      throw error;
    }
  }
  
  async recordTransaction(transactionData: Partial<Transaction>): Promise<Transaction> {
    try {
      const response = await axios.post(`${this.baseUrl}/wallet/transactions`, transactionData, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      return response.data;
    } catch (error) {
      console.error('Failed to record transaction:', error);
      throw error;
    }
  }
  
  async updateTransactionStatus(transactionId: string, status: Transaction['status']): Promise<Transaction> {
    try {
      const response = await axios.patch(`${this.baseUrl}/wallet/transactions/${transactionId}`, {
        status
      }, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      return response.data;
    } catch (error) {
      console.error('Failed to update transaction status:', error);
      throw error;
    }
  }
}

export default new WalletService();
