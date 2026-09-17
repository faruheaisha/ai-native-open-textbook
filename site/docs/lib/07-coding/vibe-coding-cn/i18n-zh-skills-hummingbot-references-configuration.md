---
title: "Hummingbot - Configuration"
sourceId: "07-coding/vibe-coding-cn"
sourceTitle: "Vibe Coding CN"
sourceKind: "课时教程"
licenseLabel: "可转载"
lang: "中英混排"
tier: 3
volume: "07-coding"
sourceUrl: "https://github.com/2025Emma/vibe-coding-cn"
entryUrl: "https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/hummingbot/references/configuration.md"
sourceRel: "i18n/zh/skills/hummingbot/references/configuration.md"
rawUrl: "/raw/07-coding/vibe-coding-cn/i18n/zh/skills/hummingbot/references/configuration.md"
sourceSha256: "9cd27f8883235f97fa49d25a70552434569733e4edbf59f31bbada5b2368e03e"
pageSha256: "9cd27f8883235f97fa49d25a70552434569733e4edbf59f31bbada5b2368e03e"
contentMode: "local-full"
zh: ""
---

# Hummingbot - Configuration

**Pages:** 24

---

## 

**URL:** https://hummingbot.org/dashboard/config-10.png

---

## 1.6.0 - Hummingbot

**URL:** https://hummingbot.org/release-notes/1.6.0/

**Contents:**
- Release Notes - Version 1.6.0¶
- Config Management Refactoring¶
- New Gateway DEX Connector: UniswapLP¶
- Restored Strategy: Uniswap-V3 LP¶
- New Gateway DEX Connector: Quickswap¶
- New Spot and Perpetual Exchange Connectors: Bitmex¶
- New Spot Exchange Connector: Latoken¶
- Developer Updates¶
  - Hummingbot changes¶
  - Gateway changes¶

Released on July 26, 2022

Install via Docker: Linux | Windows | macOS | Raspberry Pi

Binary builds are no longer supported. Docker and Source are now the only supported methods of install.

We are very excited to ship the July 2022 Hummingbot release (v1.6.0) today!

In 5428, Hummingbot's configuration management system was significantly overhauled. The new approach uses pydantic models to define the configuration maps. Aside from built-in validation functionality, this approach also allows the automatic generation of JSON schemas which is a big first step in the direction of decoupling the bot from its interface. Another major step in that direction is significantly restricting the use of global variables when dealing with the global config map (now renamed to client config map) and the AllConnectorSettings class.

The approach to storing and retrieving secure configs has also been refactored. We no longer store secure configs in the client config map (former global config map). Those are only stored in the Security class (which is still unfortunately accessed globally). In addition, the secure values are no longer stored separate from non-secure configs — they are both part of the same config map and stored in the same yaml file.

When returning users log in to version 1.6.0, they will be prompted to enter their password to migrate their old configurations to the new configuration schema. If the configuration is successful, users will see the screen below"

As this new version will automatically migrate any old configuration files due to the config management refactoring, we strongly advise users to create a backup of the config files first prior to updating the bots to 1.6.0. The migration process may also take some time or may encounter issues so it's advisable to implement the update at a more convenient period. Lastly, make sure to remove any existing scripts you have and download instead the latest helper scripts (create.sh, update.sh) from our installation page.

We are excited to re-introduce a connector for Uniswap that supports the Uniswap V3 AI, enabling users to add and remove concentrated liquidity ranges.

See the Uniswap documentation for more information.

Because Gateway now supports the UniswapLP connector, we have restored the Uniswap V3 LP strategy that allows users to create a bot that adds concentrated liquidity ranges and dynamically adjusts them given flucutations in market price and volatility.

See the uniswap-lp-v3 documentation for more information.

Quickswap is the leading AMM DEX on the Polygon Network.

See the quickswap documentation for more information.

Bitmex is a cryptocurrency exchange and derivative trading platform. It is owned and operated by HDR Global Trading Limited, which is registered in the Seychelles.

Latoken is a rapidly growing crypto exchange focusing on liquidity for new tokens.

See the latoken documentation for more information.

---

## Configuration - Hummingbot

**URL:** https://hummingbot.org/gateway/configuration/

**Contents:**
- Configuration
- Configuration Overview¶
  - Configuration Structure¶
  - Root Configuration¶
  - Server Configuration¶
  - Chain Configuration¶
  - Connector Configuration¶
    - Example: Jupiter Configuration¶
  - Network Configuration¶
    - Example: Solana mainnet-beta Configuration¶

Gateway uses a modular configuration system that allows you to customize various aspects of its operation. This guide explains the configuration structure and how to modify it to suit your needs.

Gateway's configuration system consists of YAML files located in the /conf directory, along with JSON files for tokens and pools organized by chain and connector.

The initial configuration files are created automatically using the default templates in /src/templates when you run the setup script during installation.

The /conf/ folder contains the following types of configuration files:

The root.yml file serves as the entry point for Gateway's configuration system. It defines which configuration files are loaded and their corresponding schema files.

This file tells Gateway:

The server.yml file controls the core Gateway server behavior, including ports, logging, and security settings.

Chain configuration files (e.g., /conf/chains/solana.yml) now contain only the default network and wallet settings for each blockchain.

When you connect a wallet using gateway connect, it automatically becomes the defaultWallet for that chain. The defaultNetwork determines which network configuration Gateway uses by default for that chain.

Network-specific configurations are now stored in separate files under /conf/chains/\{chain\}/\{network\}.yml

Connector configuration files (e.g., /conf/connectors/jupiter.yml) define settings specific to each DEX connector, including slippage tolerance, routing preferences, and API configurations.

Configuration Options Explained:

slippagePct: Maximum acceptable price slippage for trades. If the execution price deviates more than this percentage from the quoted price, the transaction will fail.

priorityLevel: Controls transaction priority on Solana. Higher priority levels result in faster confirmation but cost more in fees. Set to veryHigh for time-sensitive trades.

maxLamports: Caps the maximum priority fee to prevent excessive costs during network congestion. 1,000,000 lamports = 0.001 SOL.

onlyDirectRoutes: When true, restricts swaps to direct pools only (no intermediate tokens). This can reduce price impact but may result in worse pricing or failed routes for less liquid pairs.

restrictIntermediateTokens: When true, only routes through major tokens (SOL, USDC, USDT) as intermediates. This increases reliability and reduces price impact risks.

apiKey: Optional API key for Jupiter's paid tier. The free tier (lite-api) is suitable for most users, while the paid tier offers higher rate limits and additional features.

Network configuration files (e.g., /conf/chains/solana/mainnet-beta.yml) contain the detailed settings for each blockchain network, including RPC endpoints and transaction parameters.

You can view the current configuration for any network using Gateway commands:

To update any network setting, use gateway config [namespace] update:

To change the RPC node provider for a blockchain network, you can either use Gateway commands or edit the configuration files directly.

Example for Solana mainnet (/conf/chains/solana/mainnet-beta.yml): nodeURL: https://your-preferred-node-provider.com/your-api-key nativeCurrencySymbol: SOL # Default compute units for a transaction # This sets the compute unit limit for transactions when not specified by the user defaultComputeUnits: 200000 # Confirmation polling interval in seconds # How often to check if a submitted transaction has been confirmed (inner retry loop) confirmRetryInterval: 0.5 # Number of confirmation polling attempts # How many times to poll for confirmation before considering the transaction unconfirmed confirmRetryCount: 10 # Floor percentile of recent priority fee samples used to estimate gasPrice for a transaction # Use the Nth percentile of recent priority fees as the base fee (90 = 90th percentile) basePriorityFeePct: 90 # Minimum priority fee per compute unit in lamports # This sets the floor for priority fees to ensure transactions are processed (default: 0.1 lamports/CU) minPriorityFeePerCU: 0.1

Example for Ethereum mainnet (/conf/chains/ethereum/mainnet.yml): chainID: 1 nodeURL: https://your-preferred-node-provider.com/your-api-key nativeCurrencySymbol: ETH minGasPrice: 0.1

The new Gateway endpoints accept addresses for baseToken and quoteToken in addition to symbols, so you should be able to use addresses directly before adding their symbols into the network's token list.

Gateway uses standardized token lists organized by chain and network. Each network has its own token list file that contains metadata for all supported tokens on that network.

The token list structure follows the Token Lists standard, which helps users avoid scams and find legitimate tokens across different networks.

Each AMM and CLMM DEX may have different pools for the same trading pair, with varying parameters like fee tier and bin step. Gateway now stores pool definitions in dedicated JSON files for each DEX connector.

Example pool entry: \{ "type": "amm", "network": "mainnet-beta", "baseSymbol": "WIF", "quoteSymbol": "SOL", "address": "EP2ib6dYdEeqD8MfE2ezHCxX3kP3K2eLKkirfPm5eyMx" \}

For CLMM pools, use "type": "clmm" instead. The pool file structure allows you to specify different pools for different networks and trading types (AMM vs CLMM) within the same connector.

There are two ways to update your Gateway configurations:

Restart Gateway to apply changes

Always validate your configuration changes before applying them to a production environment. You can use the schema files referenced in root.yml to ensure your configurations are valid.

**Examples:**

Example 1 (unknown):
```unknown
version: 3
configurations:
  $namespace server:
    configurationPath: server.yml
    schemaPath: server-schema.json

  $namespace solana:
    configurationPath: solana.yml
    schemaPath: solana-schema.json

  $namespace jupiter:
    configurationPath: jupiter.yml
    schemaPath: jupiter-schema.json
```

Example 2 (unknown):
```unknown
# GMT Offset in hours (e.g. -8 for Pacific US Time, -5 for Eastern US Time)
GMTOffset: -8

# Port on which to run the Gateway server
port: 15888

# Port on which to run the Swagger documentation UI. 
# Set to 0 to serve docs at http://0.0.0.0:{port}/docs (same port as Gateway server)
# Set to a specific port (e.g. 8080) to serve docs separately at http://0.0.0.0:{docPort}
docsPort: 0

# Path to folder where Hummingbot generates self-signed certificates
certificatePath: ./certs/

# Path to folder where logs will be stored.
logPath: './logs'

# IPs allowed to access gateway. localhost is allowed by default.
ipWhitelist: []

# If true, logs will be stored in logPath and printed to stdout. If false, they
# will only be stored in logPath and not printed to stdout.
logToStdOut: true

# If true, the server will print detailed Fastify logs for each request and response to stdout. If false, only standard logs will be emitted.
fastifyLogs: false

# Nonce database
nonceDbPath: 'nonce.level'

# Transaction database
transactionDbPath: 'transaction.level'
```

Example 3 (unknown):
```unknown
defaultNetwork: mainnet-beta
