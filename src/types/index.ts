// Types for GraphQL responses

export interface Transaction {
  id: string;
  hash: string;
  blockNumber: string;
  blockTimestamp: string;
  from: string;
  to: string;
  gasUsed: string;
  gasPrice: string;
}

export interface DepositAdded {
  id: string;
  seller: string;
  token: string;
  amount: string;
  blockNumber: string;
  blockTimestamp: string;
  transactionHash: string;
}

export interface DepositWithdrawn {
  id: string;
  seller: string;
  token: string;
  amount: string;
  blockNumber: string;
  blockTimestamp: string;
  transactionHash: string;
}

export interface LockAdded {
  id: string;
  buyer: string;
  lockID: string;
  seller: string;
  amount: string;
  blockNumber: string;
  blockTimestamp: string;
  transactionHash: string;
}

export interface LockReleased {
  id: string;
  buyer: string;
  lockId: string;
  amount: string;
  blockNumber: string;
  blockTimestamp: string;
  transactionHash: string;
}

export interface LockReturned {
  id: string;
  buyer: string;
  lockId: string;
  blockNumber: string;
  blockTimestamp: string;
  transactionHash: string;
}

export type ActivityItem = DepositAdded | DepositWithdrawn | LockAdded | LockReleased | LockReturned;

export interface ActivityItemWithType {
  id: string;
  blockNumber: string;
  blockTimestamp: string;
  transactionHash: string;
  type: 'deposit' | 'withdrawal' | 'lock' | 'release' | 'return';
  // Common fields for deposits/withdrawals
  seller?: string;
  token?: string;
  amount?: string;
  // Common fields for locks
  buyer?: string;
  lockID?: string;
  lockId?: string;
}

export interface UserActivity {
  depositAddeds: DepositAdded[];
  depositWithdrawns: DepositWithdrawn[];
  lockAddeds: LockAdded[];
  lockReleaseds: LockReleased[];
  lockReturneds: LockReturned[];
}

export interface NetworkConfig {
  name: string;
  chainId: number;
  rpcUrl: string;
  graphUrl: string;
  explorerUrl: string;
}

export interface TokenInfo {
  address: string;
  symbol: string;
  name: string;
  decimals: number;
}

export interface ContractAddresses {
  p2pix: string;
  reputation: string;
  tokens: Record<string, string>;
}

export interface Network {
  id: 'sepolia' | 'rootstock';
  name: string;
  chainId: number;
  rpcUrl: string;
  graphUrl: string;
  explorerUrl: string;
  contracts: ContractAddresses;
  tokens: Record<string, TokenInfo>;
}
