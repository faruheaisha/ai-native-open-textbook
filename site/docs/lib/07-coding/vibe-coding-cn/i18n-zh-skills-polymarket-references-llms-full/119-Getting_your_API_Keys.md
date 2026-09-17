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
entryUrl: "https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/polymarket/references/llms-full.md"
sourceRel: "i18n/zh/skills/polymarket/references/llms-full.md"
rawUrl: "/raw/07-coding/vibe-coding-cn/i18n/zh/skills/polymarket/references/llms-full.md"
sourceSha256: "f2977ee42f8298e33bc8c8a0ee646bdd5f4e91e39de2641b8e15138a3174bd62"
pageSha256: "a795fbcf3996ee26f178d0bf528f533da961cbc927f4c14add1fadf7c6fbb56b"
contentMode: "local-full"
zh: ""
---

## Getting your API Keys

  ```python DeriveAPIKeys-Python [expandable] theme={null}
  from py_clob_client.client import ClobClient

  host: str = "https://clob.polymarket.com"
  key: str = "" #This is your Private Key. If using email login export from https://reveal.magic.link/polymarket otherwise export from your Web3 Application
  chain_id: int = 137 #No need to adjust this
  POLYMARKET_PROXY_ADDRESS: str = '' #This is the address you deposit/send USDC to to FUND your Polymarket account.

  #Select from the following 3 initialization options to matches your login method, and remove any unused lines so only one client is initialized.

  ### Initialization of a client using a Polymarket Proxy associated with an Email/Magic account. If you login with your email use this example.
  client = ClobClient(host, key=key, chain_id=chain_id, signature_type=1, funder=POLYMARKET_PROXY_ADDRESS)

  ### Initialization of a client using a Polymarket Proxy associated with a Browser Wallet(Metamask, Coinbase Wallet, etc)
  client = ClobClient(host, key=key, chain_id=chain_id, signature_type=2, funder=POLYMARKET_PROXY_ADDRESS)

  ### Initialization of a client that trades directly from an EOA. 
  client = ClobClient(host, key=key, chain_id=chain_id)

  print( client.derive_api_key() )

  ```

  ```javascript DeriveAPIKeys-TS [expandable] theme={null}
  //npm install @polymarket/clob-client
  //npm install ethers
  //Client initialization example and dumping API Keys
  import {ClobClient, ApiKeyCreds } from "@polymarket/clob-client";
  import { Wallet } from "@ethersproject/wallet";

  const host = 'https://clob.polymarket.com';
  const signer = new Wallet("YourPrivateKey"); //This is your Private Key. If using email login export from https://reveal.magic.link/polymarket otherwise export from your Web3 Application

  // Initialize the clob client
  // NOTE: the signer must be approved on the CTFExchange contract
  const clobClient = new ClobClient(host, 137, signer);

  (async () => {
    const apiKey = await clobClient.deriveApiKey();
    console.log(apiKey);
  })();
  ```
