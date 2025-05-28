import React, { useState } from 'react';
import {
    BanknotesIcon, 
    ClockIcon,
    ChartBarIcon,
    BoltIcon,
    WifiIcon,
    TvIcon,
    UserCircleIcon,
    Cog6ToothIcon,
    QuestionMarkCircleIcon
} from '@heroicons/react/24/outline';



interface UtilityUsage {
    type: string;
    amount: number;
    change: number;
    icon: React.ElementType | string;
    isCustomIcon?: boolean;
}

interface SpendingCategory {
    category: string;
    amount: number;
    percentage: number;
}

const Dashboard = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState<{ name: string; email: string } | null>(null);


    const logout = () => {
        setIsAuthenticated(false);
        setUser(null);
    };

    // Example data - replace with real data from your backend
    const walletBalance = 250000.00;
    const totalSpent = 75000.00;
    const pendingPayments = 25000.00;

    const utilityUsage: UtilityUsage[] = [
        { type: 'IBEDC', amount: 20000, change: 3.5, icon: "https://cdn.brandfetch.io/ibedc.com/w/400/h/400?c=1idQOP3w5WG5h4g__Gn", isCustomIcon: true },
        { type: 'Electricity', amount: 15000, change: 5.2, icon: BoltIcon },
        { type: 'Internet', amount: 12000, change: -2.1, icon: WifiIcon },
        { type: 'Cable TV', amount: 8000, change: 0, icon: TvIcon },
    ];

    const spendingCategories: SpendingCategory[] = [
        { category: 'Utilities', amount: 35000, percentage: 45 },
        { category: 'Internet', amount: 12000, percentage: 25 },
        { category: 'Entertainment', amount: 18000, percentage: 20 },
        { category: 'Others', amount: 10000, percentage: 10 },
    ];

    return (
        <div style={{ padding: '24px', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            {/* Overview Cards */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                gap: '24px',
                marginBottom: '32px'
            }}>
                <MetricCard
                    title="Wallet Balance"
                    value={`₦${walletBalance.toLocaleString()}`}
                    icon={BanknotesIcon}
                    trend={'+12.5%'}
                    trendDirection="up"
                />
                <MetricCard
                    title="Total Spent"
                    value={`₦${totalSpent.toLocaleString()}`}
                    icon={ChartBarIcon}
                    trend={'-8.3%'}
                    trendDirection="down"
                />
                <MetricCard
                    title="Pending Payments"
                    value={`₦${pendingPayments.toLocaleString()}`}
                    icon={ClockIcon}
                    trend={'+2.4%'}
                    trendDirection="up"
                />
            </div>

            {/* Utility Usage Section */}
            <div style={{
                backgroundColor: 'white',
                borderRadius: '12px',
                padding: '24px',
                marginBottom: '32px',
                border: '1px solid #E2E8F0'
            }}>
                <h2 style={{ 
                    fontSize: '18px', 
                    fontWeight: 'bold',
                    marginBottom: '24px'
                }}>
                    Utility Usage
                </h2>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                    gap: '24px'
                }}>
                    {utilityUsage.map((utility) => (
                        <UtilityCard
                            key={utility.type}
                            type={utility.type}
                            amount={utility.amount}
                            change={utility.change}
                            icon={utility.icon}
                            isCustomIcon={utility.isCustomIcon}
                        />
                    ))}
                </div>
            </div>

            {/* Spending Analysis */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '24px'
            }}>
                {/* Spending Categories */}
                <div style={{
                    backgroundColor: 'white',
                    borderRadius: '12px',
                    padding: '24px',
                    border: '1px solid #E2E8F0'
                }}>
                    <h2 style={{ 
                        fontSize: '18px', 
                        fontWeight: 'bold',
                        marginBottom: '24px'
                    }}>
                        Spending Categories
                    </h2>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        {spendingCategories.map((category) => (
                            <SpendingBar
                                key={category.category}
                                category={category.category}
                                amount={category.amount}
                                percentage={category.percentage}
                            />
                        ))}
                    </div>
                </div>

                {/* Payment Schedule */}
                <div style={{
                    backgroundColor: 'white',
                    borderRadius: '12px',
                    padding: '24px',
                    border: '1px solid #E2E8F0'
                }}>
                    <h2 style={{ 
                        fontSize: '18px', 
                        fontWeight: 'bold',
                        marginBottom: '24px'
                    }}>
                        Upcoming Payments
                    </h2>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        <PaymentItem
                            title="Electricity Bill"
                            amount={15000}
                            dueDate="2024-02-15"
                            status="pending"
                        />
                        <PaymentItem
                            title="Internet Subscription"
                            amount={12000}
                            dueDate="2024-02-18"
                            status="scheduled"
                        />
                        <PaymentItem
                            title="Cable TV"
                            amount={8000}
                            dueDate="2024-02-20"
                            status="pending"
                        />
                    </div>
                </div>
            </div>

            {/* Dashboard Footer - Only visible when authenticated */}
            {isAuthenticated && (
                <DashboardFooter user={user} onLogout={logout} />
            )}
        </div>
    );
};

// Component for metric cards
const MetricCard = ({ 
    title, 
    value, 
    icon: Icon, 
    trend, 
    trendDirection 
}: { 
    title: string;
    value: string;
    icon: React.ElementType;
    trend: string;
    trendDirection: 'up' | 'down';
}) => (
    <div style={{
        backgroundColor: 'white',
        borderRadius: '12px',
        padding: '24px',
        border: '1px solid #E2E8F0'
    }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
            <span style={{ color: '#6A7385' }}>{title}</span>
            <Icon style={{ width: '24px', height: '24px', color: '#00C2FF' }} />
        </div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
            <span style={{ fontSize: '24px', fontWeight: 'bold' }}>{value}</span>
            <span style={{ 
                color: trendDirection === 'up' ? '#10B981' : '#EF4444',
                fontSize: '14px'
            }}>
                {trend}
            </span>
        </div>
    </div>
);

// Component for utility usage cards
const UtilityCard = ({ 
    type, 
    amount, 
    change, 
    icon: Icon,
    isCustomIcon = false
}: UtilityUsage) => (
    <div style={{
        padding: '16px',
        backgroundColor: '#F8FAFC',
        borderRadius: '8px'
    }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
            {isCustomIcon ? (
                <img 
                    src={Icon as string} 
                    alt={`${type} icon`}
                    style={{ 
                        width: '24px', 
                        height: '24px',
                        objectFit: 'contain'
                    }} 
                />
            ) : (
                <Icon style={{ width: '24px', height: '24px', color: '#00C2FF' }} />
            )}
            <span style={{ 
                color: change > 0 ? '#10B981' : change < 0 ? '#EF4444' : '#6A7385',
                fontSize: '14px'
            }}>
                {change > 0 ? '+' : ''}{change}%
            </span>
        </div>
        <div>
            <h3 style={{ fontSize: '16px', marginBottom: '4px' }}>{type}</h3>
            <p style={{ fontSize: '20px', fontWeight: 'bold' }}>₦{amount.toLocaleString()}</p>
        </div>
    </div>
);

// Component for spending category bars
const SpendingBar = ({ category, amount, percentage }: SpendingCategory) => (
    <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
            <span>{category}</span>
            <span>₦{amount.toLocaleString()}</span>
        </div>
        <div style={{
            width: '100%',
            height: '8px',
            backgroundColor: '#F1F5F9',
            borderRadius: '4px',
            overflow: 'hidden'
        }}>
            <div style={{
                width: `${percentage}%`,
                height: '100%',
                backgroundColor: '#00C2FF',
                borderRadius: '4px'
            }} />
        </div>
    </div>
);

// Component for payment schedule items
const PaymentItem = ({ 
    title, 
    amount, 
    dueDate, 
    status 
}: { 
    title: string;
    amount: number;
    dueDate: string;
    status: 'pending' | 'scheduled';
}) => (
    <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '12px',
        backgroundColor: '#F8FAFC',
        borderRadius: '8px'
    }}>
        <div>
            <h4 style={{ marginBottom: '4px' }}>{title}</h4>
            <span style={{ fontSize: '14px', color: '#6A7385' }}>Due: {dueDate}</span>
        </div>
        <div style={{ textAlign: 'right' }}>
            <p style={{ fontWeight: 'bold', marginBottom: '4px' }}>₦{amount.toLocaleString()}</p>
            <span style={{
                fontSize: '12px',
                padding: '4px 8px',
                borderRadius: '4px',
                backgroundColor: status === 'pending' ? '#FEF3C7' : '#DCFCE7',
                color: status === 'pending' ? '#D97706' : '#059669'
            }}>
                {status.charAt(0).toUpperCase() + status.slice(1)}
            </span>
        </div>
    </div>
);

// New Dashboard Footer Component
const DashboardFooter = ({ 
    user, 
    onLogout 
}: { 
    user: { name: string; email: string } | null;
    onLogout: () => void;
}) => (
    <footer style={{
        marginTop: 'auto',
        paddingTop: '32px',
        borderTop: '1px solid #E2E8F0',
        backgroundColor: 'white'
    }}>
        <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '32px',
            marginBottom: '24px'
        }}>
            {/* User Profile Section */}
            <div>
                <h3 style={{ 
                    fontSize: '16px', 
                    fontWeight: 'bold',
                    marginBottom: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                }}>
                    <UserCircleIcon style={{ width: '20px', height: '20px', color: '#00C2FF' }} />
                    Account
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <span style={{ fontSize: '14px', color: '#374151' }}>
                        Welcome, {user?.name}
                    </span>
                    <span style={{ fontSize: '12px', color: '#6B7280' }}>
                        {user?.email}
                    </span>
                    <button
                        onClick={onLogout}
                        style={{
                            padding: '8px 16px',
                            backgroundColor: '#EF4444',
                            color: 'white',
                            border: 'none',
                            borderRadius: '6px',
                            fontSize: '12px',
                            cursor: 'pointer',
                            width: 'fit-content',
                            marginTop: '8px'
                        }}
                    >
                        Logout
                    </button>
                </div>
            </div>

            {/* Quick Actions */}
            <div>
                <h3 style={{ 
                    fontSize: '16px', 
                    fontWeight: 'bold',
                    marginBottom: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                }}>
                    <Cog6ToothIcon style={{ width: '20px', height: '20px', color: '#00C2FF' }} />
                    Quick Actions
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <FooterLink text="Account Settings" />
                    <FooterLink text="Payment History" />
                    <FooterLink text="Notification Preferences" />
                    <FooterLink text="Security Settings" />
                </div>
            </div>

            {/* Support */}
            <div>
                <h3 style={{ 
                    fontSize: '16px', 
                    fontWeight: 'bold',
                    marginBottom: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                }}>
                    <QuestionMarkCircleIcon style={{ width: '20px', height: '20px', color: '#00C2FF' }} />
                    Support
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <FooterLink text="Help Center" />
                    <FooterLink text="Contact Support" />
                    <FooterLink text="Report an Issue" />
                    <FooterLink text="Terms of Service" />
                </div>
            </div>
        </div>

        {/* Copyright */}
        <div style={{
            paddingTop: '16px',
            borderTop: '1px solid #F3F4F6',
            textAlign: 'center'
        }}>
            <span style={{ fontSize: '12px', color: '#6B7280' }}>
                © 2024 Payvance. All rights reserved. | Secure payments for authenticated users only.
            </span>
        </div>
    </footer>
);

// Footer Link Component
const FooterLink = ({ text }: { text: string }) => (
    <button
        style={{
            background: 'none',
            border: 'none',
            color: '#6B7280',
            fontSize: '14px',
            cursor: 'pointer',
            textAlign: 'left',
            padding: '4px 0',
            textDecoration: 'none'
        }}
        onMouseEnter={(e) => {
            e.currentTarget.style.color = '#00C2FF';
        }}
        onMouseLeave={(e) => {
            e.currentTarget.style.color = '#6B7280';
        }}
    >
        {text}
    </button>
);

export default Dashboard;
