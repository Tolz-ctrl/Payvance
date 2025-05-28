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

export const UTILITY_PROVIDERS_CONFIG = {
    ELECTRICITY: {
        IBEDC: { name: 'Ibadan Electricity Distribution Company', code: 'ibedc' },
        EKEDC: { name: 'Eko Electricity Distribution Company', code: 'ekedc' },
        KAEDC: { name: 'Kaduna Electric', code: 'kaedc' },
        PHEDC: { name: 'Port Harcourt Electric', code: 'phedc' },
    },
    CABLE_TV: {
        DSTV: { name: 'DStv', code: 'dstv' },
        GOTV: { name: 'GOtv', code: 'gotv' },
        STARTIMES: { name: 'StarTimes', code: 'startimes' },
    },
    INTERNET: {
        MTN: { name: 'MTN Data', code: 'mtn-data' },
        AIRTEL: { name: 'Airtel Data', code: 'airtel-data' },
        GLO: { name: 'Glo Data', code: 'glo-data' },
        ETISALAT: { name: '9mobile Data', code: '9mobile-data' },
    }
};


