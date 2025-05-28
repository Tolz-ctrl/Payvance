import axios from 'axios';
import { UTILITY_PROVIDERS_CONFIG } from './config';

export class BillPaymentService {
    private readonly baxiConfig = {
        baseURL: 'https://payments.baxipay.com.ng/api/baxipay',
        apiKey: process.env.BAXI_API_KEY,
    };

    private readonly vtpassConfig = {
        baseURL: 'https://vtpass.com/api',
        apiKey: process.env.VTPASS_API_KEY,
        secretKey: process.env.VTPASS_SECRET_KEY,
    };

    async validateMeter(provider: string, meterNumber: string, type: 'prepaid' | 'postpaid') {
        if (UTILITY_PROVIDERS_CONFIG.ELECTRICITY[provider]) {
            return await axios.post(`${this.baxiConfig.baseURL}/services/electricity/verify`, {
                service_type: provider.toLowerCase(),
                meter_number: meterNumber,
                meter_type: type,
            }, {
                headers: { 'Authorization': `Bearer ${this.baxiConfig.apiKey}` }
            });
        }
        throw new Error('Unsupported provider');
    }

    async validateTvSubscription(provider: string, smartCardNumber: string) {
        if (provider === 'DSTV') {
            return await axios.post(`${this.vtpassConfig.baseURL}/tv/verify`, {
                serviceID: 'dstv',
                billersCode: smartCardNumber,
            }, {
                headers: {
                    'api-key': this.vtpassConfig.apiKey,
                    'secret-key': this.vtpassConfig.secretKey,
                }
            });
        }
        throw new Error('Unsupported TV provider');
    }

    async payBill(paymentDetails: {
        provider: string,
        accountNumber: string,
        amount: number,
        phone: string,
        email: string,
        type?: 'prepaid' | 'postpaid'
    }) {
        // Implementation varies based on provider
        // Returns transaction reference for verification
    }
}