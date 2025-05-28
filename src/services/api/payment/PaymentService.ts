import axios from 'axios';
import { PAYMENT_GATEWAY_CONFIG } from './config';

// Interfaces for API responses
export interface PaymentResponse {
  status: boolean;
  message: string;
  data: {
    reference: string;
    authorization_url?: string;
    access_code?: string;
    transaction_id?: string;
    amount: number;
  };
}

export interface TransactionVerificationResponse {
  status: boolean;
  data: {
    status: 'success' | 'pending' | 'failed';
    reference: string;
    amount: number;
    gateway_response: string;
  };
}

class PaymentService {
  private paystackConfig = PAYMENT_GATEWAY_CONFIG.PAYSTACK;
  private flutterwaveConfig = PAYMENT_GATEWAY_CONFIG.FLUTTERWAVE;

  async initializePayment({
    amount,
    email,
    paymentMethod,
    metadata,
    gateway = 'paystack'
  }: {
    amount: number;
    email: string;
    paymentMethod: 'card' | 'bank' | 'ussd' | 'qr' | 'bank_transfer' | 'opay' | 'moniepoint';
    metadata: unknown;
    gateway?: 'paystack' | 'flutterwave';
  }): Promise<PaymentResponse> {
    // Validate inputs
    if (!amount || amount <= 0) {
      throw new Error('Invalid payment amount');
    }
    
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      throw new Error('Invalid email address');
    }
    
    const validPaymentMethods = ['card', 'bank', 'ussd', 'qr', 'bank_transfer', 'opay', 'moniepoint'];
    if (!validPaymentMethods.includes(paymentMethod)) {
      throw new Error('Invalid payment method');
    }
    
    const validGateways = ['paystack', 'flutterwave'];
    if (!validGateways.includes(gateway)) {
      throw new Error('Unsupported payment gateway');
    }
    
    if (gateway === 'paystack') {
      return this.initializePaystackPayment({ amount, email, paymentMethod, metadata });
    } else if (gateway === 'flutterwave') {
      return this.initializeFlutterwavePayment({ amount, email, paymentMethod, metadata });
    }
    
    throw new Error('Unsupported payment gateway');
  }

  private async initializePaystackPayment({
    amount,
    email,
    paymentMethod,
    metadata
  }: {
    amount: number;
    email: string;
    paymentMethod: 'card' | 'bank' | 'ussd' | 'qr' | 'bank_transfer' | 'opay' | 'moniepoint';
    metadata: unknown;
  }): Promise<PaymentResponse> {
    const channels = this.getPaymentChannels(paymentMethod);
    
    try {
      // Call Paystack API directly
      const response = await axios.post(
        `${this.paystackConfig.BASE_URL}${this.paystackConfig.ENDPOINTS.INITIALIZE}`,
        {
          amount: amount * 100, // Paystack expects amount in kobo
          email,
          channels,
          metadata: {
            ...(metadata as Record<string, unknown>),
            transaction_type: 'wallet_funding'
          }
        },
        {
          headers: {
            'Authorization': `Bearer ${this.paystackConfig.SECRET_KEY}`,
            'Content-Type': 'application/json'
          }
        }
      );
      
      return response.data;
    } catch (error) {
      console.error('Payment initialization failed:', error);
      throw new Error('Payment service unavailable. Please try again later.');
    }
  }

  private async initializeFlutterwavePayment({
    amount,
    email,
    paymentMethod,
    metadata
  }: {
    amount: number;
    email: string;
    paymentMethod: string;
    metadata: unknown;
  }): Promise<PaymentResponse> {
    try {
      // Call Flutterwave API directly
      const response = await axios.post(
        `${this.flutterwaveConfig.BASE_URL}${this.flutterwaveConfig.ENDPOINTS.INITIALIZE}`,
        {
          amount,
          email,
          payment_options: this.getFlutterwavePaymentOptions(paymentMethod),
          meta: {
            ...(metadata as Record<string, unknown>),
            transaction_type: 'wallet_funding'
          }
        },
        {
          headers: {
            'Authorization': `Bearer ${this.flutterwaveConfig.SECRET_KEY}`,
            'Content-Type': 'application/json'
          }
        }
      );
      
      return response.data;
    } catch (error) {
      console.error('Flutterwave payment initialization failed:', error);
      throw new Error('Payment service unavailable. Please try again later.');
    }
  }

  async verifyTransaction(reference: string, gateway = 'paystack'): Promise<TransactionVerificationResponse> {
    if (gateway === 'paystack') {
      return this.verifyPaystackTransaction(reference);
    } else if (gateway === 'flutterwave') {
      return this.verifyFlutterwaveTransaction(reference);
    }
    
    throw new Error('Unsupported payment gateway');
  }

  private async verifyPaystackTransaction(reference: string): Promise<TransactionVerificationResponse> {
    try {
      const response = await axios.get(
        `${this.paystackConfig.BASE_URL}${this.paystackConfig.ENDPOINTS.VERIFY}/${reference}`,
        {
          headers: {
            'Authorization': `Bearer ${this.paystackConfig.SECRET_KEY}`,
            'Content-Type': 'application/json'
          }
        }
      );
      
      return response.data;
    } catch (error) {
      console.error('Transaction verification failed:', error);
      throw new Error('Unable to verify transaction. Please try again later.');
    }
  }

  private async verifyFlutterwaveTransaction(reference: string): Promise<TransactionVerificationResponse> {
    try {
      const response = await axios.get(
        `${this.flutterwaveConfig.BASE_URL}${this.flutterwaveConfig.ENDPOINTS.VERIFY}/${reference}`,
        {
          headers: {
            'Authorization': `Bearer ${this.flutterwaveConfig.SECRET_KEY}`,
            'Content-Type': 'application/json'
          }
        }
      );
      
      return response.data;
    } catch (error) {
      console.error('Flutterwave transaction verification failed:', error);
      throw new Error('Unable to verify transaction. Please try again later.');
    }
  }

  private getPaymentChannels(paymentMethod: string): string[] {
    switch (paymentMethod) {
      case 'card':
        return ['card'];
      case 'bank':
        return ['bank'];
      case 'ussd':
        return ['ussd'];
      case 'qr':
        return ['qr'];
      case 'bank_transfer':
        return ['bank_transfer'];
      case 'opay':
        return ['opay'];
      case 'moniepoint':
        return ['moniepoint'];
      default:
        return ['card', 'bank', 'ussd', 'bank_transfer'];
    }
  }

  private getFlutterwavePaymentOptions(paymentMethod: string): string {
    switch (paymentMethod) {
      case 'card':
        return 'card';
      case 'bank':
        return 'account';
      case 'ussd':
        return 'ussd';
      case 'qr':
        return 'qr';
      case 'bank_transfer':
        return 'banktransfer';
      case 'opay':
        return 'opay';
      case 'moniepoint':
        return 'moniepoint';
      default:
        return 'card,account,ussd,banktransfer';
    }
  }

  private formatErrorDetails(error: unknown): string {
    if (error instanceof Error) {
      return error.message;
    }
    return String(error);
  }
}

export default new PaymentService();















