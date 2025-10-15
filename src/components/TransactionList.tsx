'use client';

import { useState } from 'react';
import { useQuery } from '@apollo/client';
import { ApolloProvider } from '@apollo/client';
import { getClient } from '@/lib/apollo-client';
import { GET_ALL_ACTIVITY, GET_USER_ACTIVITY } from '@/lib/graphql-queries';
import { networks, formatAmount, formatTimestamp } from '@/config/networks';
import type { Network } from '@/types';
import { ExternalLink, Clock, User, DollarSign, X } from 'lucide-react';

interface TransactionListProps {
  networkId: Network['id'];
}

interface ActivityItem {
  id: string;
  blockNumber: string;
  blockTimestamp: string;
  transactionHash: string;
  type: 'deposit' | 'withdrawal' | 'lock' | 'release' | 'return';
  seller?: string;
  buyer?: string;
  amount?: string;
  token?: string;
  lockID?: string;
  lockId?: string;
}

export default function TransactionList({ networkId }: TransactionListProps) {
  const [selectedType, setSelectedType] = useState<'all' | 'deposit' | 'lock' | 'release'>('all');
  const [userAddress, setUserAddress] = useState('');
  const [searchAddress, setSearchAddress] = useState('');
  
  // Query for all activities
  const { data: allData, loading: allLoading, error: allError } = useQuery(GET_ALL_ACTIVITY, {
    variables: { first: 50 },
    skip: !!searchAddress, // Skip if searching for specific user
    errorPolicy: 'all'
  });

  // Query for user activities
  const { data: userData, loading: userLoading, error: userError } = useQuery(GET_USER_ACTIVITY, {
    variables: {
      userAddress: searchAddress,
      first: 50
    },
    skip: !searchAddress, // Skip if no search address
    errorPolicy: 'all'
  });

  // Use the appropriate data based on search state
  const data = searchAddress ? userData : allData;
  const loading = searchAddress ? userLoading : allLoading;
  const error = searchAddress ? userError : allError;

  const getTransactionTypeInfo = (type: string) => {
    switch (type) {
      case 'deposit':
        return { label: 'Deposit', color: 'text-green-600', bgColor: 'bg-green-100' };
      case 'withdrawal':
        return { label: 'Withdrawal', color: 'text-blue-600', bgColor: 'bg-blue-100' };
      case 'lock':
        return { label: 'Lock', color: 'text-orange-600', bgColor: 'bg-orange-100' };
      case 'release':
        return { label: 'Release', color: 'text-purple-600', bgColor: 'bg-purple-100' };
      case 'return':
        return { label: 'Return', color: 'text-red-600', bgColor: 'bg-red-100' };
      default:
        return { label: 'Transaction', color: 'text-gray-600', bgColor: 'bg-gray-100' };
    }
  };

  const formatAddress = (address: string) => {
    if (!address) return '';
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const clearSearch = () => {
    setUserAddress('');
    setSearchAddress('');
  };

  // Processar dados e criar lista unificada
  const processActivityData = () => {
    if (!data) return [];

    const activities: ActivityItem[] = [];

    // Deposits
    data.depositAddeds?.forEach((item: any) => {
      activities.push({
        id: item.id,
        blockNumber: item.blockNumber,
        blockTimestamp: item.blockTimestamp,
        transactionHash: item.transactionHash,
        type: 'deposit',
        seller: item.seller,
        amount: item.amount,
        token: item.token,
      });
    });

    // Withdrawals
    data.depositWithdrawns?.forEach((item: any) => {
      activities.push({
        id: item.id,
        blockNumber: item.blockNumber,
        blockTimestamp: item.blockTimestamp,
        transactionHash: item.transactionHash,
        type: 'withdrawal',
        seller: item.seller,
        amount: item.amount,
        token: item.token,
      });
    });

    // Locks
    data.lockAddeds?.forEach((item: any) => {
      activities.push({
        id: item.id,
        blockNumber: item.blockNumber,
        blockTimestamp: item.blockTimestamp,
        transactionHash: item.transactionHash,
        type: 'lock',
        buyer: item.buyer,
        seller: item.seller,
        amount: item.amount,
        lockID: item.lockID,
      });
    });

    // Releases
    data.lockReleaseds?.forEach((item: any) => {
      activities.push({
        id: item.id,
        blockNumber: item.blockNumber,
        blockTimestamp: item.blockTimestamp,
        transactionHash: item.transactionHash,
        type: 'release',
        buyer: item.buyer,
        amount: item.amount,
        lockId: item.lockId,
      });
    });

    // Returns
    data.lockReturneds?.forEach((item: any) => {
      activities.push({
        id: item.id,
        blockNumber: item.blockNumber,
        blockTimestamp: item.blockTimestamp,
        transactionHash: item.transactionHash,
        type: 'return',
        buyer: item.buyer,
        lockId: item.lockId,
      });
    });

    // Ordenar por timestamp (mais recente primeiro)
    return activities.sort((a, b) => parseInt(b.blockTimestamp) - parseInt(a.blockTimestamp));
  };

  const filteredActivities = processActivityData().filter(activity => 
    selectedType === 'all' || activity.type === selectedType
  );

  if (loading) {
    return (
      <div className="card-dark p-8 text-center">
        <div className="animate-spin w-8 h-8 border-2 border-primary-400 border-t-transparent rounded-full mx-auto mb-4"></div>
        <p className="text-text-secondary">Carregando transações...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="card-dark p-8 text-center">
        <div className="text-red-400 mb-4">⚠️</div>
        <p className="text-red-400 mb-2">Erro ao carregar transações</p>
        <p className="text-text-secondary text-sm">{error.message}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Search Field */}
      <div className="flex gap-4">
        <div className="flex-1">
          <input
            type="text"
            value={userAddress}
            onChange={(e) => {
              setUserAddress(e.target.value);
              setSearchAddress(e.target.value.trim());
            }}
            placeholder="Enter wallet address (0x...)"
            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-button text-primary placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent"
          />
        </div>
        {searchAddress && (
          <button
            type="button"
            onClick={clearSearch}
            className="btn-secondary flex items-center space-x-2"
          >
            <X className="w-4 h-4" />
            <span>Clear</span>
          </button>
        )}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2">
        {[
          { key: 'all', label: 'All' },
          { key: 'deposit', label: 'Deposits' },
          { key: 'lock', label: 'Locks' },
          { key: 'release', label: 'Releases' },
        ].map((filter) => (
          <button
            key={filter.key}
            onClick={() => setSelectedType(filter.key as any)}
            className={`px-4 py-2 rounded-button text-sm font-medium transition-colors ${
              selectedType === filter.key
                ? 'bg-primary-400 text-text-dark'
                : 'bg-white/10 text-text-secondary hover:bg-white/20'
            }`}
          >
            {filter.label}
          </button>
        ))}
      </div>

      {/* Transaction List */}
      <div className="card-dark p-6">
        <h3 className="text-lg font-semibold text-primary mb-6">
          {searchAddress ? `Activities Found (${filteredActivities.length})` : `Recent Transactions (${filteredActivities.length})`}
        </h3>
        
        {filteredActivities.length === 0 ? (
          <div className="text-center py-8">
            <div className="text-text-secondary mb-2">📭</div>
            <p className="text-text-secondary">
              {searchAddress ? 'No activities found for this address' : 'No transactions found'}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredActivities.map((activity) => {
              const typeInfo = getTransactionTypeInfo(activity.type);
              return (
                <div key={activity.id} className="card p-4 hover:shadow-card transition-shadow">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${typeInfo.bgColor} ${typeInfo.color}`}>
                          {typeInfo.label}
                        </span>
                        <span className="text-gray-700 text-sm">
                          Block #{activity.blockNumber}
                        </span>
                      </div>
                      
                      <div className="space-y-1">
                        {activity.seller && (
                          <div className="flex items-center space-x-2 text-sm">
                            <User className="w-4 h-4 text-text-secondary" />
                            <span className="text-gray-600">Seller:</span>
                            <span className="text-gray-800 font-mono">{formatAddress(activity.seller)}</span>
                          </div>
                        )}
                        
                        {activity.buyer && (
                          <div className="flex items-center space-x-2 text-sm">
                            <User className="w-4 h-4 text-text-secondary" />
                            <span className="text-gray-600">Buyer:</span>
                            <span className="text-gray-800 font-mono">{formatAddress(activity.buyer)}</span>
                          </div>
                        )}
                        
                        {activity.amount && (
                          <div className="flex items-center space-x-2 text-sm">
                            <DollarSign className="w-4 h-4 text-text-secondary" />
                            <span className="text-gray-600">Amount:</span>
                            <span className="text-gray-800 font-semibold">
                              {formatAmount(activity.amount)} BRZ
                            </span>
                          </div>
                        )}
                        
                        {(activity.lockID || activity.lockId) && (
                          <div className="flex items-center space-x-2 text-sm">
                            <Clock className="w-4 h-4 text-text-secondary" />
                            <span className="text-gray-600">Lock ID:</span>
                            <span className="text-gray-800 font-mono">{activity.lockID || activity.lockId}</span>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex flex-col items-end space-y-2">
                      <div className="flex items-center space-x-2 text-text-secondary text-sm">
                        <Clock className="w-4 h-4" />
                        <span>{formatTimestamp(activity.blockTimestamp)}</span>
                      </div>
                      
                      <a
                        href={`${networks[networkId].explorerUrl}/tx/${activity.transactionHash}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-secondary text-sm flex items-center space-x-1"
                      >
                        <ExternalLink className="w-4 h-4" />
                        <span>Explorer</span>
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
