import { Network, TokenInfo } from '@/types';

// Token configurations
const sepoliaTokens: Record<string, TokenInfo> = {
  [process.env.NEXT_PUBLIC_SEPOLIA_BRZ_TOKEN || '0x3eBE67A2C7bdB2081CBd34ba3281E90377462289']: {
    address: process.env.NEXT_PUBLIC_SEPOLIA_BRZ_TOKEN || '0x3eBE67A2C7bdB2081CBd34ba3281E90377462289',
    symbol: 'BRZ',
    name: 'Brazilian Digital Token',
    decimals: 4,
  },
};

const rootstockTokens: Record<string, TokenInfo> = {
  [process.env.NEXT_PUBLIC_ROOTSTOCK_BRZ_TOKEN || '0xfE841c74250e57640390f46d914C88d22C51e82e']: {
    address: process.env.NEXT_PUBLIC_ROOTSTOCK_BRZ_TOKEN || '0xfE841c74250e57640390f46d914C88d22C51e82e',
    symbol: 'BRZ',
    name: 'Brazilian Digital Token',
    decimals: 4,
  },
};

export const networks: Record<string, Network> = {
  sepolia: {
    id: 'sepolia',
    name: 'Sepolia Testnet',
    chainId: 11155111,
    rpcUrl: process.env.NEXT_PUBLIC_SEPOLIA_RPC_URL || 'https://eth-sepolia.g.alchemy.com/v2/LgaUspQXUtbBxAF8qApKG8L5-FesOVLH',
    graphUrl: process.env.NEXT_PUBLIC_SEPOLIA_GRAPH_URL || 'https://api.studio.thegraph.com/query/113713/p-2-pix/sepolia',
    explorerUrl: process.env.NEXT_PUBLIC_SEPOLIA_EXPLORER_URL || 'https://sepolia.etherscan.io',
    contracts: {
      p2pix: process.env.NEXT_PUBLIC_SEPOLIA_P2PIX_CONTRACT || '0xb7cD135F5eFD9760981e02E2a898790b688939fe',
      reputation: '0x0000000000000000000000000000000000000000', // Not used in current implementation
      tokens: {
        BRZ: process.env.NEXT_PUBLIC_SEPOLIA_BRZ_TOKEN || '0x3eBE67A2C7bdB2081CBd34ba3281E90377462289',
      },
    },
    tokens: sepoliaTokens,
  },
  rootstock: {
    id: 'rootstock',
    name: 'Rootstock Testnet',
    chainId: 31,
    rpcUrl: process.env.NEXT_PUBLIC_ROOTSTOCK_RPC_URL || 'https://rootstock-testnet.g.alchemy.com/v2/dHLGA_JZ4cW83ZB23SBhCCqys3niIUDv',
    graphUrl: process.env.NEXT_PUBLIC_ROOTSTOCK_GRAPH_URL || 'https://api.studio.thegraph.com/query/113713/p-2-pix/1',
    explorerUrl: process.env.NEXT_PUBLIC_ROOTSTOCK_EXPLORER_URL || 'https://explorer.testnet.rsk.co',
    contracts: {
      p2pix: process.env.NEXT_PUBLIC_ROOTSTOCK_P2PIX_CONTRACT || '0x57Dcba05980761169508886eEdc6f5E7EC0411Dc',
      reputation: '0x0000000000000000000000000000000000000000', // Not used in current implementation
      tokens: {
        BRZ: process.env.NEXT_PUBLIC_ROOTSTOCK_BRZ_TOKEN || '0xfE841c74250e57640390f46d914C88d22C51e82e',
      },
    },
    tokens: rootstockTokens,
  },
};

export const getNetwork = (networkId: string): Network => {
  const network = networks[networkId];
  if (!network) {
    throw new Error(`Network ${networkId} not found`);
  }
  return network;
};

export const getNetworkByChainId = (chainId: number): Network | undefined => {
  return Object.values(networks).find(network => network.chainId === chainId);
};

export const getAllNetworks = (): Network[] => {
  return Object.values(networks);
};

export const formatAddress = (address: string): string => {
  if (!address) return '';
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

export const formatAmount = (amount: string, decimals: number = 18): string => {
  const num = parseFloat(amount) / Math.pow(10, decimals);
  return num.toString();
};

export const formatTimestamp = (timestamp: string): string => {
  const date = new Date(parseInt(timestamp) * 1000);
  return date.toLocaleString();
};
