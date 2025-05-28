import { Link } from 'react-router-dom';
import {
    ArrowRightIcon,
    CurrencyDollarIcon,
    WalletIcon,
    BanknotesIcon,
    ArrowTrendingUpIcon,
    Cog6ToothIcon,
    CheckCircleIcon
} from '@heroicons/react/24/outline';
import LandingFooter from '../components/LandingFooter';

const Landing = () => {
    const navLinkStyle = {
        color: '#E6EAF1',
        textDecoration: 'none',
        transition: 'all 0.2s ease',
        padding: '8px 12px',
        borderRadius: '4px',
    };

    return (
        <div style={{
            minHeight: '100vh',
            backgroundColor: '#FFFFFF',
        }}>
            {/* Navigation */}
            <nav style={{
                padding: '24px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                maxWidth: '1280px',
                margin: '0 auto',
                backgroundColor: '#121826',
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <CurrencyDollarIcon
                        style={{
                            width: '32px',
                            height: '32px',
                            color: '#00C2FF'
                        }}
                    />
                    <span style={{ fontSize: '24px', fontWeight: 'bold', color: '#FFFFFF' }}>Payvance</span>
                </div>
                <div style={{ display: 'flex', gap: '32px', alignItems: 'center' }}>
                    <Link
                        to="/about"
                        style={navLinkStyle}
                        onMouseEnter={e => {
                            e.currentTarget.style.backgroundColor = '#1A1F2E';
                            e.currentTarget.style.color = '#00C2FF';
                        }}
                        onMouseLeave={e => {
                            e.currentTarget.style.backgroundColor = 'transparent';
                            e.currentTarget.style.color = '#E6EAF1';
                        }}
                    >
                        About
                    </Link>
                    <Link
                        to="/features"
                        style={navLinkStyle}
                        onMouseEnter={e => {
                            e.currentTarget.style.backgroundColor = '#1A1F2E';
                            e.currentTarget.style.color = '#00C2FF';
                        }}
                        onMouseLeave={e => {
                            e.currentTarget.style.backgroundColor = 'transparent';
                            e.currentTarget.style.color = '#E6EAF1';
                        }}
                    >
                        Features
                    </Link>
                    <Link
                        to="/contact"
                        style={navLinkStyle}
                        onMouseEnter={e => {
                            e.currentTarget.style.backgroundColor = '#1A1F2E';
                            e.currentTarget.style.color = '#00C2FF';
                        }}
                        onMouseLeave={e => {
                            e.currentTarget.style.backgroundColor = 'transparent';
                            e.currentTarget.style.color = '#E6EAF1';
                        }}
                    >
                        Contact
                    </Link>
                    <Link
                        to="/login"
                        style={navLinkStyle}
                        onMouseEnter={e => {
                            e.currentTarget.style.backgroundColor = '#1A1F2E';
                            e.currentTarget.style.color = '#00C2FF';
                        }}
                        onMouseLeave={e => {
                            e.currentTarget.style.backgroundColor = 'transparent';
                            e.currentTarget.style.color = '#E6EAF1';
                        }}
                    >
                        Login
                    </Link>
                    <Link
                        to="/register"
                        style={{
                            backgroundColor: '#00C2FF',
                            color: '#121826',
                            padding: '12px 24px',
                            borderRadius: '8px',
                            textDecoration: 'none',
                            fontWeight: 'bold',
                            transition: 'all 0.2s ease',
                            boxShadow: '0px 4px 15px rgba(0, 194, 255, 0.2)',
                        }}
                        onMouseEnter={e => {
                            e.currentTarget.style.backgroundColor = '#00A6D6';
                            e.currentTarget.style.transform = 'translateY(-2px)';
                            e.currentTarget.style.boxShadow = '0px 6px 20px rgba(0, 194, 255, 0.3)';
                        }}
                        onMouseLeave={e => {
                            e.currentTarget.style.backgroundColor = '#00C2FF';
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow = '0px 4px 15px rgba(0, 194, 255, 0.2)';
                        }}
                    >
                        Get Started
                    </Link>
                </div>
            </nav>

            {/* Hero Section */}
            <section style={{
                padding: '80px 24px',
                maxWidth: '1280px',
                margin: '0 auto',
                textAlign: 'center',
                backgroundColor: '#121826',
                borderRadius: '0 0 24px 24px',
                color: '#FFFFFF',
            }}>
                <h1 style={{
                    fontSize: '48px',
                    fontWeight: 'bold',
                    color: '#FFFFFF',
                    marginBottom: '24px',
                }}>
                    Simplify Your Bill Payments<br />with One Smart Wallet
                </h1>
                <p style={{
                    fontSize: '20px',
                    color: '#E6EAF1',
                    marginBottom: '48px',
                    maxWidth: '600px',
                    margin: '0 auto 48px',
                }}>
                    Pay all your bills in one place, track expenses, and manage recurring payments effortlessly.
                </p>
                <Link
                    to="/register"
                    style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '8px',
                        backgroundColor: '#00C2FF',
                        color: '#121826',
                        padding: '16px 32px',
                        borderRadius: '8px',
                        textDecoration: 'none',
                        fontWeight: 'bold',
                        fontSize: '18px',
                        transition: 'all 0.2s ease',
                        boxShadow: '0px 4px 15px rgba(0, 194, 255, 0.2)',
                    }}
                >
                    Start Now
                    <ArrowRightIcon style={{ width: '20px', height: '20px' }} />
                </Link>
            </section>

            {/* 3 Simple Steps Section */}
            <section style={{
                padding: '100px 24px',
                backgroundColor: '#FFFFFF',
            }}>
                <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
                    <h2 style={{
                        fontSize: '36px',
                        fontWeight: 'bold',
                        color: '#1A2233',
                        marginBottom: '16px',
                        textAlign: 'center',
                    }}>
                        Payvance in 3 Simple Steps
                    </h2>
                    <p style={{
                        fontSize: '18px',
                        color: '#6A7385',
                        marginBottom: '64px',
                        textAlign: 'center',
                        maxWidth: '600px',
                        margin: '0 auto 64px',
                    }}>
                        Get started with Payvance in minutes and simplify your bill payments forever
                    </p>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                        gap: '32px',
                    }}>
                        <StepCard
                            number="1"
                            title="Create Your Account"
                            description="Sign up for a free Payvance account in less than 2 minutes. All you need is your email and phone number."
                            icon={<CurrencyDollarIcon style={{ width: '32px', height: '32px', color: '#00C2FF' }} />}
                        />
                        <StepCard
                            number="2"
                            title="Fund Your Wallet"
                            description="Add funds to your Payvance wallet using your debit card, bank transfer, or other payment methods."
                            icon={<WalletIcon style={{ width: '32px', height: '32px', color: '#00C2FF' }} />}
                        />
                        <StepCard
                            number="3"
                            title="Pay Your Bills"
                            description="Select the bills you want to pay, set up recurring payments, and enjoy the convenience of one-stop bill payments."
                            icon={<BanknotesIcon style={{ width: '32px', height: '32px', color: '#00C2FF' }} />}
                        />
                    </div>

                    <div style={{
                        textAlign: 'center',
                        marginTop: '48px',
                    }}>
                        <Link
                            to="/register"
                            style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '8px',
                                backgroundColor: '#00C2FF',
                                color: '#121826',
                                padding: '16px 32px',
                                borderRadius: '8px',
                                textDecoration: 'none',
                                fontWeight: 'bold',
                                fontSize: '18px',
                                transition: 'all 0.2s ease',
                                boxShadow: '0px 4px 15px rgba(0, 194, 255, 0.2)',
                            }}
                            onMouseEnter={e => {
                                e.currentTarget.style.backgroundColor = '#00A6D6';
                                e.currentTarget.style.transform = 'translateY(-2px)';
                                e.currentTarget.style.boxShadow = '0px 6px 20px rgba(0, 194, 255, 0.3)';
                            }}
                            onMouseLeave={e => {
                                e.currentTarget.style.backgroundColor = '#00C2FF';
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow = '0px 4px 15px rgba(0, 194, 255, 0.2)';
                            }}
                        >
                            Get Started Now
                            <ArrowRightIcon style={{ width: '20px', height: '20px' }} />
                        </Link>
                    </div>
                </div>
            </section>

            {/* Core Features Section */}
            <section style={{
                padding: '100px 24px',
                backgroundColor: '#121826',
                color: '#FFFFFF',
            }}>
                <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
                    <h2 style={{
                        fontSize: '36px',
                        fontWeight: 'bold',
                        marginBottom: '16px',
                        textAlign: 'center',
                    }}>
                        Core Features
                    </h2>
                    <p style={{
                        fontSize: '18px',
                        color: '#A0AEC0',
                        marginBottom: '64px',
                        textAlign: 'center',
                        maxWidth: '600px',
                        margin: '0 auto 64px',
                    }}>
                        Designed to simplify your bill payments and give you complete control
                    </p>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                        gap: '32px',
                    }}>
                        <CoreFeatureCard
                            title="Virtual Wallet"
                            description="A secure digital wallet for all your bill payments and transactions."
                            features={[
                                'Real-time balance display',
                                'Detailed transaction history',
                                'Multiple top-up options',
                                'Instant fund transfers'
                            ]}
                            icon={<WalletIcon style={{ width: '48px', height: '48px', color: '#00C2FF' }} />}
                        />

                        <CoreFeatureCard
                            title="Utility Prioritization"
                            description="Set payment priorities and manage payment order when funds are limited."
                            features={[
                                'User-defined payment order',
                                'Smart auto-payment logic',
                                'Priority-based fund allocation',
                                'Flexible priority adjustments'
                            ]}
                            icon={<ArrowTrendingUpIcon style={{ width: '48px', height: '48px', color: '#00C2FF' }} />}
                        />

                        <CoreFeatureCard
                            title="Settings Panel"
                            description="Comprehensive control panel to manage all your payment preferences."
                            features={[
                                'Intuitive drag-and-drop interface',
                                'Ranked list of utilities',
                                'Payment schedule management',
                                'Notification preferences'
                            ]}
                            icon={<Cog6ToothIcon style={{ width: '48px', height: '48px', color: '#00C2FF' }} />}
                        />
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section style={{
                padding: '80px 24px',
                backgroundColor: '#F8FAFC',
            }}>
                <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
                    <h2 style={{
                        fontSize: '36px',
                        fontWeight: 'bold',
                        color: '#1A2233',
                        marginBottom: '48px',
                        textAlign: 'center',
                    }}>
                        Why Choose Payvance?
                    </h2>
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                        gap: '32px',
                    }}>
                        {features.map((feature, index) => (
                            <div
                                key={index}
                                style={{
                                    backgroundColor: '#FFFFFF',
                                    padding: '32px',
                                    borderRadius: '12px',
                                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                                    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                                    cursor: 'pointer',
                                }}
                                onMouseEnter={e => {
                                    e.currentTarget.style.transform = 'translateY(-4px)';
                                    e.currentTarget.style.boxShadow = '0 12px 20px -6px rgba(0, 0, 0, 0.15)';
                                }}
                                onMouseLeave={e => {
                                    e.currentTarget.style.transform = 'none';
                                    e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
                                }}
                            >
                                <h3 style={{
                                    fontSize: '24px',
                                    fontWeight: 'bold',
                                    color: '#1A2233',
                                    marginBottom: '16px',
                                }}>
                                    {feature.title}
                                </h3>
                                <p style={{ color: '#6A7385', lineHeight: '1.6' }}>
                                    {feature.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Footer */}
            <LandingFooter/>
        </div>
    );
};

// Step Card Component
const StepCard = ({
    number,
    title,
    description,
    icon
}: {
    number: string;
    title: string;
    description: string;
    icon: React.ReactNode;
}) => {
    return (
        <div style={{
            backgroundColor: '#FFFFFF',
            padding: '32px',
            borderRadius: '12px',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
            position: 'relative',
            transition: 'transform 0.2s ease, box-shadow 0.2s ease',
        }}
        onMouseEnter={e => {
            e.currentTarget.style.transform = 'translateY(-4px)';
            e.currentTarget.style.boxShadow = '0 12px 20px -6px rgba(0, 0, 0, 0.15)';
        }}
        onMouseLeave={e => {
            e.currentTarget.style.transform = 'none';
            e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
        }}
        >
            <div style={{
                position: 'absolute',
                top: '-20px',
                left: '32px',
                width: '40px',
                height: '40px',
                backgroundColor: '#00C2FF',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#FFFFFF',
                fontWeight: 'bold',
                fontSize: '20px',
                boxShadow: '0 4px 6px -1px rgba(0, 194, 255, 0.3)',
            }}>
                {number}
            </div>
            <div style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: '16px',
            }}>
                {icon}
                <h3 style={{
                    fontSize: '20px',
                    fontWeight: 'bold',
                    color: '#1A2233',
                    marginLeft: '12px',
                }}>
                    {title}
                </h3>
            </div>
            <p style={{
                fontSize: '16px',
                color: '#6A7385',
                lineHeight: '1.6',
            }}>
                {description}
            </p>
        </div>
    );
};

// Core Feature Card Component
const CoreFeatureCard = ({
    title,
    description,
    features,
    icon
}: {
    title: string;
    description: string;
    features: string[];
    icon: React.ReactNode;
}) => {
    return (
        <div style={{
            backgroundColor: '#1A2233',
            padding: '32px',
            borderRadius: '12px',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
        }}
        onMouseEnter={e => {
            e.currentTarget.style.transform = 'translateY(-8px)';
            e.currentTarget.style.boxShadow = '0 12px 30px rgba(0, 0, 0, 0.3)';
        }}
        onMouseLeave={e => {
            e.currentTarget.style.transform = 'none';
            e.currentTarget.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.2)';
        }}
        >
            <div style={{ marginBottom: '24px' }}>
                {icon}
            </div>
            <h3 style={{
                fontSize: '24px',
                fontWeight: 'bold',
                color: '#FFFFFF',
                marginBottom: '12px',
            }}>
                {title}
            </h3>
            <p style={{
                fontSize: '16px',
                color: '#A0AEC0',
                lineHeight: '1.6',
                marginBottom: '24px',
            }}>
                {description}
            </p>
            <div style={{
                marginTop: 'auto',
            }}>
                <h4 style={{
                    fontSize: '16px',
                    fontWeight: 'bold',
                    color: '#00C2FF',
                    marginBottom: '16px',
                }}>
                    Key Features:
                </h4>
                <ul style={{
                    listStyle: 'none',
                    padding: 0,
                    margin: 0,
                }}>
                    {features.map((feature, index) => (
                        <li key={index} style={{
                            display: 'flex',
                            alignItems: 'center',
                            marginBottom: '12px',
                        }}>
                            <CheckCircleIcon style={{
                                width: '20px',
                                height: '20px',
                                color: '#00C2FF',
                                marginRight: '12px',
                            }} />
                            <span style={{ color: '#E2E8F0' }}>{feature}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

const features = [
    {
        title: 'All-in-One Wallet',
        description: 'Manage all your bill payments from a single dashboard. No more juggling between different platforms.',
    },
    {
        title: 'Smart Automation',
        description: 'Set up recurring payments and never miss a bill. Get notifications when payments are due.',
    },
    {
        title: 'Secure Transactions',
        description: 'Bank-grade security ensures your money and data are always protected.',
    },
];

export default Landing;




