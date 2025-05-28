import { 
    ArrowTrendingUpIcon, 
    BanknotesIcon, 
    ArrowPathIcon, 
    ClockIcon 
} from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();
    // Example data - replace with real data from your backend
    const walletBalance = 250000.00;
    const recentTransactions = [
        { id: 1, type: 'credit', amount: 50000, description: 'Wallet Funding', date: '2024-01-20' },
        { id: 2, type: 'debit', amount: 15000, description: 'Electricity Bill', date: '2024-01-19' },
        { id: 3, type: 'debit', amount: 5000, description: 'Cable TV', date: '2024-01-18' },
    ];

    return (
        <div style={{ padding: '24px' }}>
            {/* Welcome Section */}
            <div style={{ marginBottom: '32px' }}>
                <h1 style={{ 
                    fontSize: '24px', 
                    fontWeight: 'bold',
                    color: '#1A2233',
                    marginBottom: '8px'
                }}>
                    Welcome back, User
                </h1>
                <p style={{ color: '#6A7385' }}>
                    Here's an overview of your account
                </p>
            </div>

            {/* Balance Card */}
            <div style={{
                backgroundColor: '#121826',
                borderRadius: '12px',
                padding: '24px',
                marginBottom: '32px',
                color: 'white'
            }}>
                <div style={{ marginBottom: '16px' }}>
                    <p style={{ fontSize: '14px', opacity: 0.8 }}>Available Balance</p>
                    <h2 style={{ fontSize: '32px', fontWeight: 'bold' }}>
                        ₦{walletBalance.toLocaleString()}
                    </h2>
                </div>
                <div style={{ 
                    display: 'flex', 
                    gap: '12px' 
                }}>
                    <button style={{
                        backgroundColor: '#00C2FF',
                        border: 'none',
                        borderRadius: '6px',
                        padding: '8px 16px',
                        color: 'white',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                    }}>
                        Fund Wallet
                    </button>
                    <button style={{
                        backgroundColor: 'rgba(255,255,255,0.1)',
                        border: 'none',
                        borderRadius: '6px',
                        padding: '8px 16px',
                        color: 'white',
                        fontWeight: 'bold',
                        cursor: 'pointer'
                    }}>
                        Transfer
                    </button>
                </div>
            </div>

            {/* Quick Actions Grid */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: '24px',
                marginBottom: '32px'
            }}>
                <QuickActionCard 
                    icon={BanknotesIcon}
                    title="Pay Bills"
                    description="Pay for utilities, TV, internet and more"
                    action={() => navigate('/payments')}
                />
                <QuickActionCard 
                    icon={ArrowPathIcon}
                    title="Recurring Payments"
                    description="Set up automatic bill payments"
                    action={() => navigate('/payments?tab=recurring')}
                />
                <QuickActionCard 
                    icon={ArrowTrendingUpIcon}
                    title="Analytics"
                    description="Track your spending patterns"
                    action={() => navigate('/history')}
                />
            </div>

            {/* Recent Transactions */}
            <div style={{
                backgroundColor: 'white',
                borderRadius: '8px',
                border: '1px solid #E2E8F0',
                padding: '24px'
            }}>
                <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '16px'
                }}>
                    <h2 style={{ 
                        fontSize: '18px', 
                        fontWeight: 'bold',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px'
                    }}>
                        <ClockIcon style={{ width: '20px', height: '20px' }} />
                        Recent Transactions
                    </h2>
                    <button style={{
                        color: '#00C2FF',
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer'
                    }}>
                        View All
                    </button>
                </div>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {recentTransactions.map(transaction => (
                        <div key={transaction.id} style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            padding: '12px',
                            borderRadius: '6px',
                            backgroundColor: '#F8FAFC'
                        }}>
                            <div>
                                <p style={{ fontWeight: '500' }}>{transaction.description}</p>
                                <p style={{ fontSize: '14px', color: '#6A7385' }}>{transaction.date}</p>
                            </div>
                            <p style={{ 
                                fontWeight: '500',
                                color: transaction.type === 'credit' ? '#10B981' : '#EF4444'
                            }}>
                                {transaction.type === 'credit' ? '+' : '-'}₦{transaction.amount.toLocaleString()}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

// Quick Action Card Component
const QuickActionCard = ({ 
    icon: Icon, 
    title, 
    description, 
    action 
}: { 
    icon: React.ElementType;
    title: string;
    description: string;
    action: () => void;
}) => (
    <div 
        onClick={action}
        style={{
            backgroundColor: 'white',
            borderRadius: '8px',
            border: '1px solid #E2E8F0',
            padding: '24px',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
        }}
        onMouseEnter={e => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
        }}
        onMouseLeave={e => {
            e.currentTarget.style.transform = 'none';
            e.currentTarget.style.boxShadow = 'none';
        }}
    >
        <Icon style={{ 
            width: '24px', 
            height: '24px', 
            color: '#00C2FF',
            marginBottom: '16px'
        }} />
        <h3 style={{ 
            fontSize: '16px', 
            fontWeight: 'bold',
            marginBottom: '8px'
        }}>
            {title}
        </h3>
        <p style={{ 
            fontSize: '14px',
            color: '#6A7385'
        }}>
            {description}
        </p>
    </div>
);

export default Home;
