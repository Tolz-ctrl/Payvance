import React, { useState } from 'react';
import {
    ArrowDownIcon,
    ArrowUpIcon,
    ArrowDownTrayIcon
} from '@heroicons/react/24/outline';

interface Transaction {
    id: string;
    type: 'credit' | 'debit';
    amount: number;
    description: string;
    date: string;
    status: 'successful' | 'pending' | 'failed';
    reference: string;
    category: string;
}

const History: React.FC = () => {
    const [dateRange, setDateRange] = useState({ from: '', to: '' });
    const [selectedType, setSelectedType] = useState('all');
    const [selectedStatus, setSelectedStatus] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');

    // Example transaction data
    const [transactions] = useState<Transaction[]>([
        {
            id: '1',
            type: 'debit',
            amount: 25000,
            description: 'IBEDC Electricity Bill',
            date: '2024-02-15',
            status: 'successful',
            reference: 'TRX123456',
            category: 'Utilities'
        },
        {
            id: '2',
            type: 'credit',
            amount: 100000,
            description: 'Wallet Funding',
            date: '2024-02-14',
            status: 'successful',
            reference: 'TRX123457',
            category: 'Funding'
        },
        {
            id: '3',
            type: 'debit',
            amount: 15000,
            description: 'Spectranet Internet',
            date: '2024-02-13',
            status: 'pending',
            reference: 'TRX123458',
            category: 'Internet'
        }
    ]);

    const filteredTransactions = transactions.filter(transaction => {
        const matchesSearch = transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            transaction.reference.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesType = selectedType === 'all' || transaction.type === selectedType;
        const matchesStatus = selectedStatus === 'all' || transaction.status === selectedStatus;
        
        return matchesSearch && matchesType && matchesStatus;
    });

    const handleExport = () => {
        console.log('Exporting transactions...');
    };

    return (
        <div style={{ padding: '24px', maxWidth: '1200px', margin: '0 auto' }}>
            {/* Header */}
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '24px'
            }}>
                <h1 style={{ fontSize: '24px', fontWeight: 'bold' }}>Transaction History</h1>
                <button
                    onClick={handleExport}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        padding: '8px 16px',
                        backgroundColor: '#00C2FF',
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        cursor: 'pointer'
                    }}
                >
                    <ArrowDownTrayIcon style={{ width: '20px', height: '20px' }} />
                    Export
                </button>
            </div>

            {/* Transactions Table */}
            <div style={{
                backgroundColor: 'white',
                borderRadius: '8px',
                border: '1px solid #E2E8F0',
                overflow: 'hidden'
            }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr style={{ backgroundColor: '#F8FAFC' }}>
                            <th style={{ padding: '12px', textAlign: 'left' }}>Date</th>
                            <th style={{ padding: '12px', textAlign: 'left' }}>Description</th>
                            <th style={{ padding: '12px', textAlign: 'left' }}>Reference</th>
                            <th style={{ padding: '12px', textAlign: 'left' }}>Type</th>
                            <th style={{ padding: '12px', textAlign: 'right' }}>Amount</th>
                            <th style={{ padding: '12px', textAlign: 'left' }}>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredTransactions.map((transaction) => (
                            <tr 
                                key={transaction.id}
                                style={{ borderTop: '1px solid #E2E8F0' }}
                            >
                                <td style={{ padding: '12px' }}>{transaction.date}</td>
                                <td style={{ padding: '12px' }}>{transaction.description}</td>
                                <td style={{ padding: '12px' }}>{transaction.reference}</td>
                                <td style={{ padding: '12px' }}>
                                    <span style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '4px',
                                        color: transaction.type === 'credit' ? '#10B981' : '#EF4444'
                                    }}>
                                        {transaction.type === 'credit' ? 
                                            <ArrowUpIcon style={{ width: '16px', height: '16px' }} /> :
                                            <ArrowDownIcon style={{ width: '16px', height: '16px' }} />
                                        }
                                        {transaction.type}
                                    </span>
                                </td>
                                <td style={{ 
                                    padding: '12px',
                                    textAlign: 'right',
                                    color: transaction.type === 'credit' ? '#10B981' : '#EF4444'
                                }}>
                                    {transaction.type === 'credit' ? '+' : '-'}₦{transaction.amount.toLocaleString()}
                                </td>
                                <td style={{ padding: '12px' }}>
                                    <span style={{
                                        padding: '4px 8px',
                                        borderRadius: '4px',
                                        fontSize: '14px',
                                        backgroundColor: 
                                            transaction.status === 'successful' ? '#DEF7EC' :
                                            transaction.status === 'pending' ? '#FEF3C7' : '#FEE2E2',
                                        color:
                                            transaction.status === 'successful' ? '#059669' :
                                            transaction.status === 'pending' ? '#D97706' : '#DC2626'
                                    }}>
                                        {transaction.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default History;

