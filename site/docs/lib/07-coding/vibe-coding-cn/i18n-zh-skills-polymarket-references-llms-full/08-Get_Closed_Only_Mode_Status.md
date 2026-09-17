---
title: "null"
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
pageSha256: "526b087dfc86e77c8e96be677f20fd4293a133172fe01e1b45820a6133f8f357"
contentMode: "local-full"
zh: ""
---

# null
Source: https://docs.polymarket.com/developers/CLOB/clients

Polymarket has implemented reference clients that allow programmatic use of the API below:

* [clob-client](https://github.com/Polymarket/clob-client) (Typescript)
* [py-clob-client](https://github.com/Polymarket/py-clob-client) (Python)

  ```python python_initialization theme={null}
  pip install py-clob-client

  from py_clob_client.client import ClobClient

  host: str = ""
  key: str = ""
  chain_id: int = 137

  ### Initialization of a client that trades directly from an EOA
  client = ClobClient(host, key=key, chain_id=chain_id)

  ### Initialization of a client using a Polymarket Proxy associated with an Email/Magic account
  client = ClobClient(host, key=key, chain_id=chain_id, signature_type=1, funder=POLYMARKET_PROXY_ADDRESS)

  ### Initialization of a client using a Polymarket Proxy associated with a Browser Wallet(Metamask, Coinbase Wallet, etc)
  client = ClobClient(host, key=key, chain_id=chain_id, signature_type=2, funder=POLYMARKET_PROXY_ADDRESS)

  ```

  ```javascript typescript_initialization theme={null}
  //npm install @polymarket/clob-client
  //npm install ethers
  //Client initialization example and dumping API Keys

  import { ApiKeyCreds, ClobClient} from "@polymarket/clob-client";
  import { Wallet } from "@ethersproject/wallet";

  const host = 'https://clob.polymarket.com';
  const funder = '';//This is your Polymarket Profile Address, where you send UDSC to. 
  const signer = new Wallet(""); //This is your Private Key. If using email login export from https://reveal.magic.link/polymarket otherwise export from your Web3 Application

  //In general don't create a new API key, always derive or createOrDerive
  const creds = new ClobClient(host, 137, signer).createOrDeriveApiKey();

  //0: EOA
  //1: Magic/Email Login
  //2: Metamask
  const signatureType = 1; 
    
  (async () => {
      const clobClient = new ClobClient(host, 137, signer, await creds, signatureType, funder);
  })

  ```

***
