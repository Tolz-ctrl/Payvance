import  { useState, } from 'react';
import { PlusCircle, ArrowDown, ArrowUp } from "lucide-react";
import { useWallet } from '../context/WalletContext';
import { useUser as useAuth } from '../context/AuthContext';

export default function Wallet() {
  useAuth(); // Ensure user is authenticated
  const { 
    balance,
    transactions, 
    isLoading,
    fundWallet
  } = useWallet();
  
  const [showFundModal, setShowFundModal] = useState(false);
  const [fundAmount, setFundAmount] = useState('');

  const handleFundWallet = async () => {
    try {
      if (!fundAmount || isNaN(Number(fundAmount))) return;
      await fundWallet(Number(fundAmount), 'card');
      setShowFundModal(false);
      setFundAmount('');
    } catch (error) {
      console.error('Error funding wallet:', error);
    }
  };

  return (
    <div className="bg-gray-950 min-h-screen px-6 py-10 text-gray-100 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-white">My Wallet</h1>

      {/* Wallet Summary */}
      <div className="bg-gray-900 rounded-2xl p-6 mb-8 shadow-lg border border-gray-800">
        <div className="flex justify-between items-center mb-4">
          <div>
            <p className="text-sm text-gray-400">Available Balance</p>
            <p className="text-3xl font-bold text-green-400">₦{balance.balance.toLocaleString()}</p>
          </div>
          <button 
            onClick={() => setShowFundModal(true)}
            className="bg-primary-600 hover:bg-primary-700 px-4 py-2 rounded-lg font-semibold text-white flex items-center gap-2"
          >
            <PlusCircle size={18} /> Fund Wallet
          </button>
        </div>
        <p className="text-xs text-gray-500">You can use this balance for bills, software, and subscriptions.</p>
      </div>

      {/* Transaction History */}
      <div className="bg-gray-900 rounded-2xl p-6 border border-gray-800">
        <h2 className="text-lg font-semibold mb-4">Recent Transactions</h2>
        {isLoading ? (
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary-600"></div>
          </div>
        ) : (
          <ul className="divide-y divide-gray-800 text-sm">
            {transactions.slice(0, 5).map((transaction) => (
              <li key={transaction.id} className="py-3 flex justify-between items-center">
                <div className={`flex items-center gap-2 ${transaction.type === 'credit' ? 'text-green-400' : 'text-red-400'}`}>
                  {transaction.type === 'credit' ? <ArrowDown size={16} /> : <ArrowUp size={16} />}
                  {transaction.description}
                </div>
                <span>{transaction.type === 'credit' ? '+' : '-'}₦{transaction.amount.toLocaleString()}</span>
              </li>
            ))}
            {transactions.length === 0 && (
              <li className="py-3 text-center text-gray-500">No transactions yet</li>
            )}
          </ul>
        )}
      </div>

      {/* Fund Wallet Modal */}
      {showFundModal && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-gray-900 rounded-xl p-6 max-w-md w-full border border-gray-800">
            <h3 className="text-xl font-bold mb-4">Fund Your Wallet</h3>
            <div className="mb-4">
              <label className="block text-sm mb-2">Amount (₦)</label>
              <input
                type="number"
                value={fundAmount}
                onChange={(e) => setFundAmount(e.target.value)}
                className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 text-white"
                placeholder="Enter amount"
              />
            </div>
            <div className="flex gap-3 justify-end">
              <button 
                onClick={() => setShowFundModal(false)}
                className="px-4 py-2 rounded-lg border border-gray-700 hover:bg-gray-800"
              >
                Cancel
              </button>
              <button 
                onClick={handleFundWallet}
                className="bg-primary-600 hover:bg-primary-700 px-4 py-2 rounded-lg font-semibold"
              >
                Proceed
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

