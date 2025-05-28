import React, { useState } from 'react';
import {
    BanknotesIcon,
    ClockIcon,
    ArrowPathIcon,
    BellIcon,
    ExclamationCircleIcon,
} from '@heroicons/react/24/outline';

interface UtilityBill {
    id: string;
    name: string;
    provider: string;
    amount: number;
    dueDate: string;
    status: 'pending' | 'overdue' | 'paid';
    isAutomated: boolean;
    accountNumber: string;
    logo?: string;
}

const Payments = () => {
    const [activeTab, setActiveTab] = useState<'pending' | 'history'>('pending');
    const [bills, setBills] = useState<UtilityBill[]>([
        {
            id: '1',
            name: 'Electricity',
            provider: 'IBEDC',
            amount: 25000,
            dueDate: '2024-02-15',
            status: 'pending',
            isAutomated: true,
            accountNumber: '1234567890',
            logo: 'https://cdn.brandfetch.io/ibedc.com/w/400/h/400?c=1idQOP3w5WG5h4g__Gn'
        },
        {
            id: '2',
            name: 'Internet',
            provider: 'Spectranet',
            amount: 15000,
            dueDate: '2024-02-18',
            status: 'overdue',
            isAutomated: false,
            accountNumber: '9876543210'
        },
        {
            id: '3',
            name: 'Cable TV',
            provider: 'DSTV',
            amount: 12000,
            dueDate: '2024-02-20',
            status: 'pending',
            isAutomated: true,
            accountNumber: '5678901234'
        }
    ]);

    return (
        <div style={{ padding: '24px', maxWidth: '1280px', margin: '0 auto' }}>
            {/* Header */}
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '24px',
                flexWrap: 'wrap',
                gap: '16px'
            }}>
                <h1 style={{ fontSize: '24px', fontWeight: 'bold' }}>Payments</h1>
                <div style={{
                    display: 'flex',
                    gap: '12px'
                }}>
                    <button
                        onClick={() => setActiveTab('pending')}
                        style={{
                            padding: '8px 16px',
                            borderRadius: '8px',
                            border: 'none',
                            backgroundColor: activeTab === 'pending' ? '#00C2FF' : '#F1F5F9',
                            color: activeTab === 'pending' ? 'white' : '#64748B',
                            cursor: 'pointer'
                        }}
                    >
                        Pending Bills
                    </button>
                    <button
                        onClick={() => setActiveTab('history')}
                        style={{
                            padding: '8px 16px',
                            borderRadius: '8px',
                            border: 'none',
                            backgroundColor: activeTab === 'history' ? '#00C2FF' : '#F1F5F9',
                            color: activeTab === 'history' ? 'white' : '#64748B',
                            cursor: 'pointer'
                        }}
                    >
                        Payment History
                    </button>
                </div>
            </div>

            {/* Bills Grid */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '24px',
                marginBottom: '32px'
            }}>
                {bills.map((bill) => (
                    <BillCard key={bill.id} bill={bill} onPayNow={() => {}} onToggleAutomation={() => {}} />
                ))}
            </div>

            {/* Automation Section */}
            <div style={{
                backgroundColor: 'white',
                borderRadius: '12px',
                padding: '24px',
                border: '1px solid #E2E8F0'
            }}>
                <h2 style={{ 
                    fontSize: '18px', 
                    fontWeight: 'bold',
                    marginBottom: '16px'
                }}>
                    Payment Automation
                </h2>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                    gap: '16px'
                }}>
                    <AutomationCard
                        title="Schedule Payments"
                        description="Set up automatic payments for your bills"
                        icon={ClockIcon}
                        onClick={() => {}}
                    />
                    <AutomationCard
                        title="Payment Rules"
                        description="Create custom rules for bill payments"
                        icon={ArrowPathIcon}
                        onClick={() => {}}
                    />
                    <AutomationCard
                        title="Notifications"
                        description="Manage payment alerts and reminders"
                        icon={BellIcon}
                        onClick={() => {}}
                    />
                </div>
            </div>
        </div>
    );
};

const BillCard = ({ 
    bill, 
    onPayNow, 
    onToggleAutomation 
}: { 
    bill: UtilityBill;
    onPayNow: () => void;
    onToggleAutomation: () => void;
}) => (
    <div style={{
        backgroundColor: 'white',
        borderRadius: '12px',
        padding: '20px',
        border: '1px solid #E2E8F0'
    }}>
        <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            marginBottom: '16px'
        }}>
            {bill.logo ? (
                <img 
                    src={bill.logo} 
                    alt={bill.provider}
                    style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '8px',
                        objectFit: 'cover'
                    }}
                />
            ) : (
                <div style={{
                    width: '40px',
                    height: '40px',
                    backgroundColor: '#F1F5F9',
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <BanknotesIcon style={{ width: '24px', height: '24px', color: '#64748B' }} />
                </div>
            )}
            <div>
                <h3 style={{ fontWeight: 'bold', marginBottom: '4px' }}>{bill.name}</h3>
                <p style={{ fontSize: '14px', color: '#64748B' }}>{bill.provider}</p>
            </div>
        </div>

        <div style={{ marginBottom: '16px' }}>
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '8px'
            }}>
                <span style={{ color: '#64748B' }}>Amount</span>
                <span style={{ fontWeight: 'bold' }}>₦{bill.amount.toLocaleString()}</span>
            </div>
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}>
                <span style={{ color: '#64748B' }}>Due Date</span>
                <span style={{ 
                    color: bill.status === 'overdue' ? '#EF4444' : '#64748B',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                }}>
                    {bill.status === 'overdue' && (
                        <ExclamationCircleIcon style={{ width: '16px', height: '16px', color: '#EF4444' }} />
                    )}
                    {new Date(bill.dueDate).toLocaleDateString()}
                </span>
            </div>
        </div>

        <div style={{
            display: 'flex',
            gap: '8px'
        }}>
            <button
                onClick={onPayNow}
                style={{
                    flex: 1,
                    padding: '10px',
                    backgroundColor: '#00C2FF',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    fontWeight: 'bold',
                    cursor: 'pointer'
                }}
            >
                Pay Now
            </button>
            <button
                onClick={onToggleAutomation}
                style={{
                    padding: '10px',
                    backgroundColor: bill.isAutomated ? '#DCF7FF' : '#F1F5F9',
                    color: bill.isAutomated ? '#00C2FF' : '#64748B',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer'
                }}
            >
                <ArrowPathIcon style={{ width: '20px', height: '20px' }} />
            </button>
        </div>
    </div>
);

const AutomationCard = ({ 
    title, 
    description, 
    icon: Icon, 
    onClick 
}: {
    title: string;
    description: string;
    icon: React.ElementType;
    onClick: () => void;
}) => (
    <button
        onClick={onClick}
        style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            padding: '16px',
            backgroundColor: '#F8FAFC',
            border: '1px solid #E2E8F0',
            borderRadius: '8px',
            cursor: 'pointer',
            width: '100%',
            textAlign: 'left'
        }}
    >
        <div style={{
            backgroundColor: '#EFF6FF',
            padding: '12px',
            borderRadius: '8px'
        }}>
            <Icon style={{ width: '24px', height: '24px', color: '#00C2FF' }} />
        </div>
        <div>
            <h3 style={{ 
                fontWeight: 'bold',
                marginBottom: '4px'
            }}>
                {title}
            </h3>
            <p style={{ 
                fontSize: '14px',
                color: '#64748B'
            }}>
                {description}
            </p>
        </div>
    </button>
);

export default Payments;

