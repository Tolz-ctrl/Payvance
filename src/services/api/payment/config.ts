export const PAYMENT_GATEWAY_CONFIG = {
    PAYSTACK: {
        BASE_URL: 'https://api.paystack.co',
        PUBLIC_KEY: import.meta.env.VITE_PAYSTACK_PUBLIC_KEY,
        SECRET_KEY: import.meta.env.VITE_PAYSTACK_SECRET_KEY,
        ENDPOINTS: {
            INITIALIZE: '/transaction/initialize',
            VERIFY: '/transaction/verify/:reference',
            LIST_BANKS: '/bank',
            VALIDATE_ACCOUNT: '/bank/resolve',
            TRANSFER_RECIPIENT: '/transferrecipient',
        }
    },
    FLUTTERWAVE: {  // Secondary gateway for redundancy
        BASE_URL: 'https://api.flutterwave.com/v3',
        PUBLIC_KEY: import.meta.env.VITE_FLUTTERWAVE_PUBLIC_KEY,
        SECRET_KEY: import.meta.env.VITE_FLUTTERWAVE_SECRET_KEY,
        ENDPOINTS: {
            INITIALIZE: '/payments',
            VERIFY: '/transactions/:id/verify',
            VALIDATE_ACCOUNT: '/accounts/resolve',
        }
    }
};


