'use client';

import { useState } from 'react';
import type { Network } from '@/types';
import { X } from 'lucide-react';

interface UserActivitySearchProps {
  networkId: Network['id'];
  onSearchChange?: (searchAddress: string) => void;
}

export default function UserActivitySearch({ networkId, onSearchChange }: UserActivitySearchProps) {
  const [userAddress, setUserAddress] = useState('');

  const handleSearchChange = (value: string) => {
    setUserAddress(value);
    if (onSearchChange) {
      onSearchChange(value.trim());
    }
  };

  const clearSearch = () => {
    setUserAddress('');
    if (onSearchChange) {
      onSearchChange('');
    }
  };

  return (
    <div className="flex gap-4">
      <div className="flex-1">
        <input
          type="text"
          value={userAddress}
          onChange={(e) => handleSearchChange(e.target.value)}
          placeholder="Enter wallet address (0x...)"
          className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-button text-primary placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent"
        />
      </div>
      {userAddress && (
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
  );
}