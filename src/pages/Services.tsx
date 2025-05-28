
import {
    WalletIcon,
    ClockIcon,
    ChartBarIcon,
    ShieldCheckIcon,
    BanknotesIcon,
    ArrowPathIcon,
    BellAlertIcon,
    DocumentTextIcon,
    AcademicCapIcon,
    ComputerDesktopIcon,
    TrashIcon,
    ShoppingCartIcon,
    MapPinIcon,
    GiftIcon
} from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';

interface Service {
    id: string;
    title: string;
    description: string;
    icon: React.ForwardRefExoticComponent<any>;
    benefits: string[];
    link: string;
    comingSoon?: boolean;
}

const services: Service[] = [
    {
        id: 'virtual-wallet',
        title: 'Virtual Wallet',
        description: 'A secure digital wallet for all your bill payments and transactions.',
        icon: WalletIcon,
        benefits: [
            'Store and manage funds securely',
            'Instant transfers between accounts',
            'Real-time balance updates',
            'Transaction history tracking'
        ],
        link: '/wallet'
    },
    {
        id: 'auto-pay',
        title: 'Auto-Pay',
        description: 'Set up automatic payments for your recurring bills.',
        icon: ClockIcon,
        benefits: [
            'Never miss a payment deadline',
            'Customize payment schedules',
            'Automatic payment confirmations',
            'Flexible payment rules'
        ],
        link: '/payments?tab=auto-pay'  // Updated to use payments page with tab parameter
    },
    {
        id: 'analytics',
        title: 'Spending Analytics',
        description: 'Track and analyze your spending patterns.',
        icon: ChartBarIcon,
        benefits: [
            'Detailed spending breakdowns',
            'Monthly expense reports',
            'Customizable categories',
            'Budget tracking tools'
        ],
        link: '/analytics'
    },
    {
        id: 'security',
        title: 'Enhanced Security',
        description: 'Bank-grade security features to protect your transactions.',
        icon: ShieldCheckIcon,
        benefits: [
            'Two-factor authentication',
            'Biometric login support',
            'Transaction monitoring',
            'Fraud protection'
        ],
        link: '/security'
    },
    {
        id: 'bill-payments',
        title: 'Bill Payments',
        description: 'Pay all your utilities and services in one place.',
        icon: BanknotesIcon,
        benefits: [
            'Multiple payment options',
            'Instant payment confirmation',
            'Saved biller information',
            'Payment scheduling'
        ],
        link: '/payments'
    },
    {
        id: 'recurring',
        title: 'Recurring Payments',
        description: 'Manage and track your recurring payment subscriptions.',
        icon: ArrowPathIcon,
        benefits: [
            'Subscription management',
            'Payment reminders',
            'Flexible scheduling',
            'Payment history'
        ],
        link: '/payments?tab=recurring'  // Updated to use payments page with tab parameter
    },
    {
        id: 'priority',
        title: 'Priority Settings',
        description: 'Set payment priorities and manage payment order.',
        icon: BellAlertIcon,
        benefits: [
            'Custom priority rules',
            'Automatic prioritization',
            'Balance requirements',
            'Priority notifications'
        ],
        link: '/settings?tab=payment-priorities'  // Updated to use settings page with tab parameter
    },
    {
        id: 'statements',
        title: 'Digital Statements',
        description: 'Access and download your payment statements.',
        icon: DocumentTextIcon,
        benefits: [
            'Monthly statements',
            'Download in multiple formats',
            'Statement history',
            'Payment receipts'
        ],
        link: '/history',  // Updated to use history page
        comingSoon: true
    },
    {
        id: 'school-fees',
        title: 'School Fees Payment',
        description: 'Pay school-related fees directly from the platform.',
        icon: AcademicCapIcon,
        benefits: [
            'Centralized education payments',
            'Payment receipts and history',
            'Multiple institution support',
            'Scheduled payments'
        ],
        link: '/payments?tab=education',
        comingSoon: true
    },
    {
        id: 'savings',
        title: 'Savings Functionality',
        description: 'Create and manage savings goals with automatic contributions.',
        icon: BanknotesIcon,
        benefits: [
            'Goal-based savings',
            'Automatic contributions',
            'Progress tracking',
            'Flexible withdrawal options'
        ],
        link: '/savings',
        comingSoon: true
    },
    {
        id: 'auto-registration',
        title: 'Auto-Registration',
        description: 'Automatically detect and add your subscriptions to Payvance.',
        icon: ComputerDesktopIcon,
        benefits: [
            'Subscription detection',
            'Automatic integration',
            'Centralized management',
            'Payment tracking'
        ],
        link: '/services/auto-detect',
        comingSoon: true
    },
    {
        id: 'service-management',
        title: 'Subscription Management',
        description: 'Remove or stop paying for software services you no longer need.',
        icon: TrashIcon,
        benefits: [
            'One-click cancellation',
            'Subscription tracking',
            'Payment history',
            'Renewal notifications'
        ],
        link: '/services/manage',
        comingSoon: true
    },
    {
        id: 'software-marketplace',
        title: 'Software Marketplace',
        description: 'Discover, purchase, and manage software services directly.',
        icon: ShoppingCartIcon,
        benefits: [
            'Curated software selection',
            'Simplified purchasing',
            'Integrated billing',
            'Subscription management'
        ],
        link: '/marketplace',
        comingSoon: true
    },
    {
        id: 'geo-utilities',
        title: 'Location-Based Utilities',
        description: 'Automatically detect local utility providers based on your location.',
        icon: MapPinIcon,
        benefits: [
            'Location-based detection',
            'Local provider integration',
            'Simplified setup',
            'Regional payment options'
        ],
        link: '/utilities/local',
        comingSoon: true
    },
    {
        id: 'prepaid-access',
        title: 'Prepaid Software Access',
        description: 'Pre-order or pre-pay for upcoming software products and games.',
        icon: GiftIcon,
        benefits: [
            'Early access opportunities',
            'Secure pre-ordering',
            'Release notifications',
            'Integrated delivery'
        ],
        link: '/marketplace/upcoming',
        comingSoon: true
    }
];

const Services = () => {
    return (
        <div style={{
            padding: '32px 24px',
            maxWidth: '1280px',
            margin: '0 auto'
        }}>
            {/* Header Section */}
            <div style={{ marginBottom: '48px', textAlign: 'center' }}>
                <h1 style={{
                    fontSize: '36px',
                    fontWeight: 'bold',
                    color: '#1A2233',
                    marginBottom: '16px'
                }}>
                    Our Services
                </h1>
                <p style={{
                    fontSize: '18px',
                    color: '#6A7385',
                    maxWidth: '600px',
                    margin: '0 auto'
                }}>
                    Discover how Payvance can help you manage your payments and finances more effectively
                </p>
            </div>

            {/* Services Grid */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '24px'
            }}>
                {services.map((service) => (
                    <Link
                        key={service.id}
                        to={service.link}
                        style={{
                            textDecoration: 'none',
                            color: 'inherit'
                        }}
                    >
                        <div style={{
                            backgroundColor: 'white',
                            borderRadius: '12px',
                            padding: '24px',
                            height: '100%',
                            border: '1px solid #E2E8F0',
                            transition: 'all 0.3s ease',
                            cursor: 'pointer',
                            position: 'relative',
                            overflow: 'hidden'
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'translateY(-4px)';
                            e.currentTarget.style.boxShadow = '0 12px 24px -8px rgba(0, 0, 0, 0.15)';
                            e.currentTarget.style.borderColor = '#00C2FF';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'none';
                            e.currentTarget.style.boxShadow = 'none';
                            e.currentTarget.style.borderColor = '#E2E8F0';
                        }}
                        >
                            {service.comingSoon && (
                                <div style={{
                                    position: 'absolute',
                                    top: '12px',
                                    right: '-30px',
                                    backgroundColor: '#00C2FF',
                                    color: 'white',
                                    padding: '4px 32px',
                                    transform: 'rotate(45deg)',
                                    fontSize: '12px',
                                    fontWeight: 'bold'
                                }}>
                                    Coming Soon
                                </div>
                            )}

                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                marginBottom: '16px'
                            }}>
                                <service.icon style={{
                                    width: '32px',
                                    height: '32px',
                                    color: '#00C2FF',
                                    marginRight: '12px'
                                }} />
                                <h2 style={{
                                    fontSize: '20px',
                                    fontWeight: 'bold',
                                    color: '#1A2233',
                                    margin: 0
                                }}>
                                    {service.title}
                                </h2>
                            </div>

                            <p style={{
                                fontSize: '16px',
                                color: '#6A7385',
                                marginBottom: '16px',
                                lineHeight: '1.5'
                            }}>
                                {service.description}
                            </p>

                            <ul style={{
                                margin: 0,
                                padding: 0,
                                listStyle: 'none'
                            }}>
                                {service.benefits.map((benefit, index) => (
                                    <li
                                        key={index}
                                        style={{
                                            fontSize: '14px',
                                            color: '#6A7385',
                                            marginBottom: '8px',
                                            display: 'flex',
                                            alignItems: 'center'
                                        }}
                                    >
                                        <div style={{
                                            width: '6px',
                                            height: '6px',
                                            backgroundColor: '#00C2FF',
                                            borderRadius: '50%',
                                            marginRight: '8px'
                                        }} />
                                        {benefit}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Services;



