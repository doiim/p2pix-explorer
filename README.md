# P2Pix Explorer

An application for visualizing smart contract activity from the P2PIX protocol using The Graph Protocol. P2Pix Explorer provides real-time insights into deposits, locks, releases, and user activities across Sepolia and Rootstock networks.

## ✨ Features

### 🔍 **Search & Filter**
- **Wallet Address Search**: Search for specific user activities by wallet address
- **Transaction Type Filtering**: Filter by deposits, locks, releases, or view all
- **Real-time Search**: Instant results as you type
- **Clear Search**: Easy reset functionality

### 📊 **Activity Visualization**
- **Unified Transaction List**: Combined view of all transaction types
- **Detailed Transaction Cards**: Complete information for each transaction
- **Transaction Types**:
  - **Deposits**: Seller deposits with amount and token info
  - **Withdrawals**: Seller withdrawals from the protocol
  - **Locks**: Buyer locks with seller, amount, and lock ID
  - **Releases**: Successful lock releases
  - **Returns**: Expired or returned locks

### 🌐 **Multi-Network Support**
- **Sepolia Testnet**: Ethereum testnet with full functionality
- **Rootstock Testnet**: Bitcoin sidechain testnet support
- **Network Switching**: Easy toggle between networks
- **Network-Specific Data**: Each network maintains separate data

### 🎨 **Modern UI/UX**
- **Responsive Design**: Works perfectly on desktop and mobile
- **Dark Theme**: Professional dark interface
- **Real-time Updates**: Live data refresh
- **Explorer Integration**: Direct links to block explorers
- **Loading States**: Smooth loading indicators
- **Error Handling**: Graceful error management

## 🛠 Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom design system
- **State Management**: Apollo Client for GraphQL
- **Data Source**: The Graph Protocol subgraphs
- **Icons**: Lucide React
- **Environment**: Configurable via environment variables

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository:**
```bash
git clone <repository-url>
cd p2pix-explorer
```

2. **Install dependencies:**
```bash
npm install
```

3. **Configure environment variables (optional):**
```bash
# Create .env.local file with your preferred values
# See environment variables section below for configuration options
```

4. **Start the development server:**
```bash
npm run dev
```

5. **Open your browser:**
Navigate to [http://localhost:3000](http://localhost:3000)

## ⚙️ Configuration

### Environment Variables

The application supports configuration via environment variables. See the environment variables section below for complete documentation.

**All Available Variables:**
```bash
# GraphQL API Endpoints
NEXT_PUBLIC_SEPOLIA_GRAPH_URL=https://api.studio.thegraph.com/query/113713/p-2-pix/sepolia
NEXT_PUBLIC_ROOTSTOCK_GRAPH_URL=https://api.studio.thegraph.com/query/113713/p-2-pix/1

# RPC URLs
NEXT_PUBLIC_SEPOLIA_RPC_URL=https://eth-sepolia.g.alchemy.com/v2/LgaUspQXUtbBxAF8qApKG8L5-FesOVLH
NEXT_PUBLIC_ROOTSTOCK_RPC_URL=https://rootstock-testnet.g.alchemy.com/v2/dHLGA_JZ4cW83ZB23SBhCCqys3niIUDv

# Contract Addresses
NEXT_PUBLIC_SEPOLIA_P2PIX_CONTRACT=0xb7cD135F5eFD9760981e02E2a898790b688939fe
NEXT_PUBLIC_ROOTSTOCK_P2PIX_CONTRACT=0x57Dcba05980761169508886eEdc6f5E7EC0411Dc

# Token Addresses
NEXT_PUBLIC_SEPOLIA_BRZ_TOKEN=0x3eBE67A2C7bdB2081CBd34ba3281E90377462289
NEXT_PUBLIC_ROOTSTOCK_BRZ_TOKEN=0xfE841c74250e57640390f46d914C88d22C51e82e

# Explorer URLs
NEXT_PUBLIC_SEPOLIA_EXPLORER_URL=https://sepolia.etherscan.io
NEXT_PUBLIC_ROOTSTOCK_EXPLORER_URL=https://explorer.testnet.rsk.co
```

**Notes:**
- All variables use the `NEXT_PUBLIC_` prefix to make them available in the browser
- Default values are provided as fallbacks in the code
- The application will work without setting these variables, but they allow for easy configuration changes

### Default Configuration

If no environment variables are set, the application uses these defaults:

- **Sepolia GraphQL**: `https://api.studio.thegraph.com/query/113713/p-2-pix/sepolia`
- **Rootstock GraphQL**: `https://api.studio.thegraph.com/query/113713/p-2-pix/1`
- **Contract Addresses**: As defined in `src/config/networks.ts`

## 📁 Project Structure

```
src/
├── app/                          # Next.js App Router
│   ├── layout.tsx               # Root layout with providers
│   ├── page.tsx                 # Main dashboard page
│   └── globals.css              # Global styles
├── components/                   # React components
│   ├── TransactionList.tsx      # Main transaction list with search
│   └── UserActivitySearch.tsx   # Search component (simplified)
├── config/                      # Configuration files
│   └── networks.ts              # Network configurations with env support
├── lib/                         # Utility libraries
│   ├── apollo-client.ts         # Apollo Client setup with env URLs
│   └── graphql-queries.ts       # GraphQL queries and fragments
└── types/                       # TypeScript definitions
    └── index.ts                 # Type definitions
```

## 🔧 Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build optimized production bundle
- `npm run start` - Start production server
- `npm run lint` - Run ESLint for code quality
- `npm run test` - Run test suite (if configured)

## 📊 Data Sources

This application queries data from The Graph Protocol subgraphs:

### Sepolia Subgraph
- **Endpoint**: `https://api.studio.thegraph.com/query/113713/p-2-pix/sepolia`
- **Network**: Ethereum Sepolia Testnet
- **Events**: All P2PIX contract events

### Rootstock Subgraph  
- **Endpoint**: `https://api.studio.thegraph.com/query/113713/p-2-pix/1`
- **Network**: Rootstock Testnet
- **Events**: All P2PIX contract events

## 🎯 Usage Guide

### Searching for Activities

1. **Enter Wallet Address**: Type a wallet address in the search field
2. **View Results**: See all activities for that address
3. **Filter by Type**: Use filter buttons to show specific transaction types
4. **Clear Search**: Click "Clear" to return to all transactions

### Understanding Transaction Types

- **Deposit**: Seller adds funds to the protocol
- **Withdrawal**: Seller removes funds from the protocol  
- **Lock**: Buyer locks funds for a specific seller
- **Release**: Successful completion of a locked transaction
- **Return**: Funds returned due to timeout or cancellation

### Network Information

- **Block Numbers**: Shows the blockchain block for each transaction
- **Timestamps**: Human-readable transaction times
- **Explorer Links**: Direct links to view transactions on block explorers

## 🔄 GraphQL Queries

The application uses optimized GraphQL queries:

- **`GET_ALL_ACTIVITY`**: Fetches combined activity across all transaction types
- **`GET_USER_ACTIVITY`**: Searches for specific user activities
- **Fragments**: Reusable query fragments for consistent data structure

## 🚀 Deployment

### Environment Setup

1. Set environment variables in your deployment platform
2. Ensure all required variables are configured
3. Build and deploy using standard Next.js deployment methods

### Recommended Platforms

- **Vercel**: Optimized for Next.js applications
- **Netlify**: Great for static deployments
- **AWS/GCP/Azure**: For enterprise deployments

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes and test thoroughly
4. Add tests if applicable
5. Commit your changes: `git commit -m 'Add amazing feature'`
6. Push to the branch: `git push origin feature/amazing-feature`
7. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- **Issues**: Report bugs or request features via GitHub Issues
- **Documentation**: Check the environment variables section for configuration details
- **Questions**: Open a discussion for general questions

## 🔮 Future Enhancements

- [ ] Advanced filtering options
- [ ] Export functionality
- [ ] Historical data charts
- [ ] Multi-language support
- [ ] API endpoints for external integrations
- [ ] Real-time notifications
- [ ] Advanced analytics dashboard