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
entryUrl: "https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/hummingbot/references/connectors.md"
sourceRel: "i18n/zh/skills/hummingbot/references/connectors.md"
rawUrl: "/raw/07-coding/vibe-coding-cn/i18n/zh/skills/hummingbot/references/connectors.md"
sourceSha256: "16ff6b5efa43a0629074cd926d8e11b244d1cda26f6f4eee157acd5d0c75f303"
pageSha256: "a16abe5efe8ee208c5bf26bf0f9f4c63fd1f03936b5064e27f792dbc530fd26f"
contentMode: "local-full"
zh: ""
---

## Building Gateway Connectors - Hummingbot

**URL:** https://hummingbot.org/developers/gateway-connectors/

**Contents:**
- Building Gateway Connectors¶
- Overview¶
- Prerequisites¶
  - Development Environment¶
  - Protocol Knowledge¶
  - Gateway Setup¶
- Connector Architecture¶
- Implementation Steps¶
  - Step 1: Choose Connector Type¶
  - Step 2: Create Connector Class¶

This guide walks you through the process of building new Gateway connectors for decentralized exchanges (DEXs). Gateway connectors enable Hummingbot to interact with blockchain-based trading protocols through a standardized REST API interface.

Gateway supports three types of DEX connectors:

Before building a Gateway connector, ensure you have:

Gateway connectors follow a modular architecture:

Determine which trading types your DEX supports:

Create the main connector class - reference Uniswap if you are building an Ethereum-based DEX connector and Raydium if you are building a Solana-based DEX connector.

Based on your connector type, implement the required methods:

Create route handler files for your supported operations:

Create configuration files for your connector:

Register your connector in the main connector routes:

Create comprehensive tests for your connector:

Gateway is currently not accepting pull requests for new blockchain implementations. The framework currently supports: - EVM chains: Ethereum and EVM-compatible chains (Arbitrum, Optimism, Base, Polygon, BSC, Avalanche, etc.) - SVM chains: Solana and SVM-compatible chains

If your connector requires a chain built on either EVM or SVM architecture, you can proceed with the implementation below. For entirely new blockchain architectures, please check the GitHub repository for updates on when new chain support will be accepted.

If your connector requires a new blockchain:

All Gateway connectors must meet these testing standards:

Gateway uses ESLint and Prettier for code quality:

Before submitting your connector:

**Examples:**

Example 1 (unknown):
```unknown
src/connectors/{protocol}/
├── {protocol}.ts           # Main connector class
├── {protocol}.config.ts    # Configuration interface
├── {protocol}.constants.ts # Protocol-specific constants
├── {protocol}.utils.ts     # Helper functions
├── router-routes/          # Router endpoints (if applicable)
├── amm-routes/            # AMM endpoints (if applicable)
└── clmm-routes/           # CLMM endpoints (if applicable)
```

Example 2 (javascript):
```javascript
// src/connectors/mydex/mydex.ts
export class MyDex {
  private static instances: Record<string, MyDex> = {};
  public solana: Solana; // or Ethereum
  public sdk: MyDEXSDK;
  public config: MyDexConfig.RootConfig;

  private constructor() {
    this.config = MyDexConfig.config;
    this.txVersion = TxVersion.V0;
  }

  // Gets singleton instance
  public static getInstance(network: string): MyDex {
    if (!MyDex._instances) {
      MyDex._instances = {};
    }

    if (!MyDex._instances[network]) {
      const instance = new MyDex();
      await instance.init(network);
      MyDex._instances[network] = instance;
    }

    return MyDex._instances[network];
  }

  // Initializes instance
  private async init(network: string) {
    try {
      this.solana = await Solana.getInstance(network);
      this.sdk = await MyDEXSDK.load({
        connection: this.solana.connection,
        blockhashCommitment: 'confirmed',
      });

      logger.info('MyDEX initialized successfully');
    } catch (error) {
      logger.error('MyDEX initialization failed:', error);
      throw error;
    }
  }
}
```

Example 3 (unknown):
```unknown
// Quote a swap
async quote(
  base: Token,
  quote: Token,
  amount: BigNumber,
  side: 'BUY' | 'SELL'
): Promise<SwapQuote> {
  // Implement quote logic
  return {
    route: optimalRoute,
    expectedOut: outputAmount,
    priceImpact: impact,
    gasEstimate: gasLimit
  };
}

// Execute a swap
async trade(
  wallet: Wallet,
  quote: SwapQuote,
  slippage: number
): Promise<Transaction> {
  // Build and execute transaction
  return transaction;
}
```

Example 4 (unknown):
```unknown
// Get pool information
async poolInfo(
  base: Token,
  quote: Token
): Promise<PoolInfo> {
  // Fetch pool data
  return {
    reserves: [baseReserve, quoteReserve],
    fee: poolFee,
    liquidity: totalLiquidity
  };
}

// Add liquidity
async addLiquidity(
  wallet: Wallet,
  base: Token,
  quote: Token,
  baseAmount: BigNumber,
  quoteAmount: BigNumber,
  slippage: number
): Promise<Transaction> {
  // Add liquidity logic
  return transaction;
}
```
