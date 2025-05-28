import React from 'react';
import { Link } from 'react-router-dom';
import {
    WalletIcon,
    ClockIcon,
    ShieldCheckIcon,
    ChartBarIcon,
    BanknotesIcon,
    ArrowPathIcon,
    BellAlertIcon,
    DocumentTextIcon,
} from '@heroicons/react/24/outline';
import BackButton from '../components/BackButton';

const FeaturesPage = () => {
    return (
        <div>
            <BackButton />
            <div style={{
                minHeight: '100vh',
                backgroundColor: '#FFFFFF',
                padding: '32px 24px',
            }}>
                {/* Header */}
                <div style={{
                    maxWidth: '1280px',
                    margin: '0 auto',
                    textAlign: 'center',
                    marginBottom: '64px',
                }}>
                    <h1 style={{
                        fontSize: '48px',
                        fontWeight: 'bold',
                        color: '#1A2233',
                        marginBottom: '24px',
                    }}>
                        Our Features
                    </h1>
                    <p style={{
                        fontSize: '20px',
                        color: '#6A7385',
                        maxWidth: '600px',
                        margin: '0 auto',
                    }}>
                        Discover all the powerful features that make Payvance the smart choice for managing your bills and payments
                    </p>
                </div>

                {/* Features Grid */}
                <div style={{
                    maxWidth: '1280px',
                    margin: '0 auto',
                }}>
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                        gap: '32px',
                        marginBottom: '64px',
                    }}>
                        {features.map((feature, index) => (
                            <div
                                key={index}
                                style={{
                                    backgroundColor: '#FFFFFF',
                                    padding: '32px',
                                    borderRadius: '12px',
                                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                                    border: '1px solid #E2E8F0',
                                }}
                            >
                                <feature.icon style={{
                                    width: '48px',
                                    height: '48px',
                                    color: '#00C2FF',
                                    marginBottom: '24px',
                                }} />
                                <h3 style={{
                                    fontSize: '24px',
                                    fontWeight: 'bold',
                                    color: '#1A2233',
                                    marginBottom: '16px',
                                }}>
                                    {feature.title}
                                </h3>
                                <p style={{
                                    color: '#6A7385',
                                    marginBottom: '24px',
                                    lineHeight: '1.6',
                                }}>
                                    {feature.description}
                                </p>
                                <ul style={{
                                    listStyle: 'none',
                                    padding: 0,
                                    margin: 0,
                                }}>
                                    {feature.benefits.map((benefit, idx) => (
                                        <li
                                            key={idx}
                                            style={{
                                                color: '#4A5568',
                                                marginBottom: '8px',
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '8px',
                                            }}
                                        >
                                            <span style={{
                                                width: '6px',
                                                height: '6px',
                                                backgroundColor: '#00C2FF',
                                                borderRadius: '50%',
                                            }} />
                                            {benefit}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>

                    {/* CTA Section */}
                    <div style={{
                        textAlign: 'center',
                        padding: '64px 0',
                    }}>
                        <h2 style={{
                            fontSize: '36px',
                            fontWeight: 'bold',
                            color: '#1A2233',
                            marginBottom: '24px',
                        }}>
                            Ready to Get Started?
                        </h2>
                        <p style={{
                            fontSize: '18px',
                            color: '#6A7385',
                            marginBottom: '32px',
                        }}>
                            Join thousands of users who trust Payvance for their payment needs
                        </p>
                        <Link
                            to="/register"
                            style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '8px',
                                backgroundColor: '#00C2FF',
                                color: '#FFFFFF',
                                padding: '16px 32px',
                                borderRadius: '8px',
                                textDecoration: 'none',
                                fontWeight: 'bold',
                                transition: 'all 0.2s ease',
                            }}
                        >
                            Create Your Account
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

const features = [
    {
        title: 'Virtual Wallet',
        description: 'A secure digital wallet for all your bill payments and transactions.',
        icon: WalletIcon,
        benefits: [
            'Store and manage funds securely',
            'Instant transfers between accounts',
            'Real-time balance updates',
            'Transaction history tracking'
        ]
    },
    {
        title: 'Auto-Pay',
        description: 'Set up automatic payments for your recurring bills.',
        icon: ClockIcon,
        benefits: [
            'Never miss a payment deadline',
            'Customize payment schedules',
            'Automatic payment confirmations',
            'Flexible payment rules'
        ]
    },
    {
        title: 'Enhanced Security',
        description: 'Bank-grade security features to protect your transactions.',
        icon: ShieldCheckIcon,
        benefits: [
            'Two-factor authentication',
            'Biometric login support',
            'Transaction monitoring',
            'Fraud protection'
        ]
    },
    {
        title: 'Spending Analytics',
        description: 'Track and analyze your spending patterns.',
        icon: ChartBarIcon,
        benefits: [
            'Detailed spending breakdowns',
            'Monthly expense reports',
            'Customizable categories',
            'Budget tracking tools'
        ]
    },
    {
        title: 'Bill Payments',
        description: 'Pay all your utilities and services in one place.',
        icon: BanknotesIcon,
        benefits: [
            'Multiple payment options',
            'Instant payment confirmation',
            'Saved biller information',
            'Payment scheduling'
        ]
    },
    {
        title: 'Recurring Payments',
        description: 'Manage and track your recurring payment subscriptions.',
        icon: ArrowPathIcon,
        benefits: [
            'Subscription management',
            'Payment reminders',
            'Flexible scheduling',
            'Payment history'
        ]
    }
];

export default FeaturesPage;


