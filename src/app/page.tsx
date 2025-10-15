'use client';

import { useState, useEffect, useRef } from 'react';
import { ApolloProvider } from '@apollo/client';
import { ChevronDown } from 'lucide-react';
import { networks, getAllNetworks } from '@/config/networks';
import { getClient } from '@/lib/apollo-client';
import TransactionList from '@/components/TransactionList';
import type { Network } from '@/types';

export default function HomePage() {
  const [selectedNetwork, setSelectedNetwork] = useState<Network['id']>('sepolia');
  const [isNetworkDropdownOpen, setIsNetworkDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsNetworkDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);


  const client = getClient(selectedNetwork);

  return (
    <ApolloProvider client={client}>
      <div className="min-h-screen">
        {/* Header */}
        <header className="header-glass sticky top-0 z-50">
          <div className="container-main">
            <div className="flex items-center justify-between">
              {/* Logo */}
              <div className="flex items-center">
                <img 
                  src="/logo.svg" 
                  alt="P2Pix Logo"
                  className="w-24 h-24"
                />
              </div>

              {/* Network Selector */}
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setIsNetworkDropdownOpen(!isNetworkDropdownOpen)}
                  className="flex items-center space-x-2 px-3 py-2 border border-primary-400 rounded-lg hover:bg-white/5 transition-colors"
                >
                  <img 
                    src={`/${selectedNetwork}.svg`} 
                    alt={`${networks[selectedNetwork].name} icon`}
                    className="w-6 h-6"
                  />
                  <span className="text-primary font-medium">{networks[selectedNetwork].name}</span>
                  <ChevronDown className={`w-4 h-4 text-primary transition-transform ${isNetworkDropdownOpen ? 'rotate-180' : ''}`} />
                </button>
                
                {/* Network Dropdown */}
                {isNetworkDropdownOpen && (
                  <div className="absolute right-0 top-full mt-2 w-64 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg shadow-lg z-50">
                    <div className="py-2">
                      {getAllNetworks().map((network) => (
                        <button
                          key={network.id}
                          onClick={() => {
                            setSelectedNetwork(network.id);
                            setIsNetworkDropdownOpen(false);
                          }}
                          className={`w-full px-4 py-3 text-left hover:bg-white/10 transition-colors flex items-center space-x-3 ${
                            selectedNetwork === network.id ? 'bg-white/5' : ''
                          }`}
                        >
                          <img 
                            src={`/${network.id}.svg`} 
                            alt={`${network.name} icon`}
                            className="w-6 h-6"
                          />
                          <div>
                            <div className="text-primary font-medium">{network.name}</div>
                            <div className="text-text-secondary text-sm">Chain ID: {network.chainId}</div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="container-main py-12">
          {/* Transaction List with integrated search */}
          <div className="max-w-6xl mx-auto">
            <TransactionList networkId={selectedNetwork} />
          </div>
        </main>
      </div>
    </ApolloProvider>
  );
}