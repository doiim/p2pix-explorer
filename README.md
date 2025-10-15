# P2PIX Analytics Dashboard

A Next.js application for visualizing smart contract activity from the P2PIX protocol using The Graph Protocol.

## Features

- **Network Support**: Sepolia and Rootstock testnets
- **Real-time Data**: Live activity feed with automatic polling
- **Activity Visualization**: 
  - Deposits and withdrawals
  - Lock creation and releases
  - Lock returns and expirations
- **Statistics Dashboard**: Key metrics and analytics
- **User Search**: Search for specific wallet addresses
- **Responsive Design**: Mobile-friendly interface

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **GraphQL**: Apollo Client
- **Data Source**: The Graph Protocol
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd p2pix-analytics
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Configuration

### Network Configuration

The app supports two networks:

- **Sepolia**: `https://api.studio.thegraph.com/query/113713/p-2-pix/sepolia`
- **Rootstock**: `https://api.studio.thegraph.com/query/113713/p-2-pix/1`

Network configuration can be updated in `src/config/networks.ts`.

### Contract Addresses

Update contract addresses in the network configuration file:

```typescript
contracts: {
  p2pix: '0x...', // P2PIX contract address
  reputation: '0x...', // Reputation contract address
  tokens: {
    '0x...': '0x...', // Token addresses
  },
}
```

## GraphQL Queries

The app uses several GraphQL queries to fetch data:

- `GET_ALL_ACTIVITY`: Combined activity feed
- `GET_DEPOSITS`: Deposit transactions
- `GET_LOCKS`: Lock creation events
- `GET_LOCK_RELEASES`: Lock release events
- `GET_USER_ACTIVITY`: User-specific activity
- `GET_DEPOSIT_STATS`: Deposit statistics
- `GET_LOCK_STATS`: Lock statistics

## Project Structure

```
src/
├── app/                    # Next.js App Router
├── components/             # React components
│   ├── ui/                # Reusable UI components
│   ├── ActivityFeed.tsx   # Activity feed component
│   ├── StatsOverview.tsx  # Statistics dashboard
│   └── UserSearch.tsx     # User search functionality
├── config/                # Configuration files
├── lib/                   # Utility libraries
│   ├── apollo-client.ts   # Apollo Client setup
│   └── graphql-queries.ts # GraphQL queries
└── types/                 # TypeScript type definitions
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Features Overview

### 1. Network Overview
- Total deposits, locks, and releases
- Success rates and average amounts
- Real-time statistics

### 2. Activity Feed
- Recent transactions across all event types
- Auto-refresh every 30 seconds
- Detailed transaction information
- Links to block explorers

### 3. User Search
- Search by wallet address
- View all activity for a specific user
- Filter by transaction type

## Data Sources

This application queries data from The Graph Protocol subgraphs:

- **Sepolia Subgraph**: Indexes P2PIX contract events on Sepolia testnet
- **Rootstock Subgraph**: Indexes P2PIX contract events on Rootstock testnet

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support or questions, please open an issue in the repository.