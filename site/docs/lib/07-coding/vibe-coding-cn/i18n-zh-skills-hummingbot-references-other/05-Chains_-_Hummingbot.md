---
title: "Vibe Coding CN"
sourceId: "07-coding/vibe-coding-cn"
sourceTitle: "Vibe Coding CN"
sourceKind: "课时教程"
licenseLabel: "可转载"
lang: "中英混排"
tier: 3
volume: "07-coding"
sourceUrl: "https://github.com/2025Emma/vibe-coding-cn"
entryUrl: "https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/hummingbot/references/other.md"
sourceRel: "i18n/zh/skills/hummingbot/references/other.md"
rawUrl: "/raw/07-coding/vibe-coding-cn/i18n/zh/skills/hummingbot/references/other.md"
sourceSha256: "7bd57673fc3df5b901db36ae3eac6be136526e8e2dbb141702c9a6ebc26b607a"
pageSha256: "56eded106f5ba262aa09d4d919fb46e507a79eac96ad8768a799a657438a0727"
contentMode: "local-full"
zh: ""
---

## Chains - Hummingbot

**URL:** https://hummingbot.org/gateway/chains/

**Contents:**
- Chains
- Ethereum¶
  - Chain Configuration¶
  - Network Configuration¶
  - API Endpoints¶
- Solana¶
  - Chain Configuration¶
  - Network Configuration¶
  - API Endpoints¶
- Chain Schema¶

Gateway provides standardized access to multiple blockchain networks, enabling wallet management, transaction execution, and node RPC interactions. Each chain integration is customized to handle the specific requirements and features of that blockchain.

Gateway currently supports the following blockchain architectures:

Gateway's Ethereum integration supports the Ethereum mainnet and all EVM-compatible Layer 1 and Layer 2 blockchains as networks. These networks share the same basic architecture, allowing for unified handling of wallets, transactions, and smart contract interactions.

Each chain and network can be configured in Gateway through YAML configuration files:

All EVM chains share the same API structure:

Gateway's Solana integration provides access to the Solana blockchain and other networks that utilize the Solana Virtual Machine.

Each chain and network can be configured in Gateway through YAML configuration files:

All Solana networks share the same API structure:

Gateway implements a standardized schema for chain operations across all supported blockchains. These schemas define the structure of requests and responses for common blockchain operations.

Returns chain connection status and current block/slot information.

Request Schema: \{ "network": "string (optional)" // Network identifier (e.g., "mainnet", "mainnet-beta") \}

Response Schema: \{ "chain": "string", // Chain name (e.g., "ethereum", "solana") "network": "string", // Network identifier "rpcUrl": "string", // Current RPC endpoint "currentBlockNumber": 12345, // Current block number or slot "nativeCurrency": "string" // Native token symbol (e.g., "ETH", "SOL") \}

Retrieves token metadata including addresses and decimals.

Request Schema: \{ "network": "string (optional)", // Network identifier "tokenSymbols": "string | string[] (optional)" // Single symbol or array of symbols/addresses \}

Response Schema: \{ "tokens": [ \{ "symbol": "string", // Token symbol "address": "string", // Token contract address "decimals": 6, // Token decimals "name": "string" // Token full name \} ] \}

Fetches wallet balances for native and specified tokens.

Request Schema: \{ "network": "string (optional)", // Network identifier "address": "string (optional)", // Wallet address to query "tokens": ["string"] (optional)", // Array of token symbols or addresses "fetchAll": false // Fetch all tokens in wallet, not just those in token list \}

Response Schema: \{ "balances": \{ "TOKEN_SYMBOL": 1234.56 // Token symbol/address as key, balance as number \} \}

Polls the status of a submitted transaction.

Request Schema: \{ "network": "string (optional)", // Network identifier "signature": "string", // Transaction signature/hash "tokens": ["string"] (optional)", // Token symbols/addresses for balance change calculation "walletAddress": "string (optional)" // Wallet address for balance change calculation \}

Response Schema: \{ "currentBlock": 12345, // Current block number "signature": "string", // Transaction signature "txBlock": 12340 | null, // Block where transaction was included "txStatus": 0 | 1 | -1, // 0=PENDING, 1=CONFIRMED, -1=FAILED "fee": 0.001 | null, // Transaction fee paid "tokenBalanceChanges": \{ // Optional: token balance changes "TOKEN": 100.5 // Change amount for each token \}, "txData": \{\} | null, // Additional transaction data "error": "string (optional)" // Error message if failed \}

Estimates transaction fees for the network.

Request Schema: \{ "network": "string (optional)" // Network identifier \}

Response Schema: \{ "feePerComputeUnit": 0.000001, // Fee per compute unit or gas unit "denomination": "string", // Unit denomination ("lamports" for Solana, "gwei" for Ethereum) "computeUnits": 200000, // Default compute units/gas limit used for calculation "feeAsset": "string", // Native currency symbol (ETH, SOL, etc.) "fee": 0.002, // Total estimated fee using default limits "timestamp": 1234567890 // Unix timestamp of estimate \}

All chains use a standardized transaction status enum:

Gateway's modular architecture makes it easy to add support for new EVM- and SVM-based blockchain networks.

Create network configuration file: # /conf/chains/ethereum/mynetwork.yml nodeURL: "https://rpc.mynetwork.com" chainId: 12345 nativeCurrencySymbol: "MYT" minGasPrice: 0.1

Add token list: Create /conf/tokens/ethereum/mynetwork.json with supported tokens

Update connectors Update each supported connector's configuration file (i.e. uniswap.config.ts) to include the new network

**Examples:**

Example 1 (unknown):
```unknown
defaultNetwork: mainnet
