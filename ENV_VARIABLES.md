# Environment Variables

This project uses environment variables to configure network endpoints, contract addresses, and API URLs. Create a `.env.local` file in the root directory with the following variables:

## GraphQL API Endpoints
```bash
NEXT_PUBLIC_SEPOLIA_GRAPH_URL=https://api.studio.thegraph.com/query/113713/p-2-pix/sepolia
NEXT_PUBLIC_ROOTSTOCK_GRAPH_URL=https://api.studio.thegraph.com/query/113713/p-2-pix/1
```

## RPC URLs
```bash
NEXT_PUBLIC_SEPOLIA_RPC_URL=https://eth-sepolia.g.alchemy.com/v2/LgaUspQXUtbBxAF8qApKG8L5-FesOVLH
NEXT_PUBLIC_ROOTSTOCK_RPC_URL=https://rootstock-testnet.g.alchemy.com/v2/dHLGA_JZ4cW83ZB23SBhCCqys3niIUDv
```

## Contract Addresses
```bash
NEXT_PUBLIC_SEPOLIA_P2PIX_CONTRACT=0xb7cD135F5eFD9760981e02E2a898790b688939fe
NEXT_PUBLIC_ROOTSTOCK_P2PIX_CONTRACT=0x57Dcba05980761169508886eEdc6f5E7EC0411Dc
```

## Token Addresses
```bash
NEXT_PUBLIC_SEPOLIA_BRZ_TOKEN=0x3eBE67A2C7bdB2081CBd34ba3281E90377462289
NEXT_PUBLIC_ROOTSTOCK_BRZ_TOKEN=0xfE841c74250e57640390f46d914C88d22C51e82e
```

## Explorer URLs
```bash
NEXT_PUBLIC_SEPOLIA_EXPLORER_URL=https://sepolia.etherscan.io
NEXT_PUBLIC_ROOTSTOCK_EXPLORER_URL=https://explorer.testnet.rsk.co
```

## Notes
- All variables use the `NEXT_PUBLIC_` prefix to make them available in the browser
- Default values are provided as fallbacks in the code
- The application will work without setting these variables, but they allow for easy configuration changes
