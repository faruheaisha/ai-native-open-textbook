---
title: "Your First Order"
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
pageSha256: "62d669e382ef8d3efc3382674582038077507ed35ee659ad4af5fd1cb2abfb12"
contentMode: "local-full"
zh: ""
---

# Your First Order
Source: https://docs.polymarket.com/quickstart/orders/first-order

Placing your first order using one of our two Clients is relatively straightforward.

For Python: `pip install py-clob-client`.

For Typescript: `npm install polymarket/clob-client` & `npm install ethers`.

After installing one of those you will be able to run the below code. Take the time to fill in the constants at the top and ensure you're using the proper signature type based on your login method.
&lt;Tip>Many additional examples for the Typescript and Python clients are available [here(TS)](https://github.com/Polymarket/clob-client/tree/main/examples) and [here(Python)](https://github.com/Polymarket/py-clob-client/tree/main/examples) .&lt;/Tip>

  ```python Python First Trade [expandable] theme={null}
  from py_clob_client.client import ClobClient
  from py_clob_client.clob_types import OrderArgs, OrderType
  from py_clob_client.order_builder.constants import BUY

  host: str = "https://clob.polymarket.com"
  key: str = "" #This is your Private Key. Export from https://reveal.magic.link/polymarket or from your Web3 Extension
  chain_id: int = 137 #No need to adjust this
  POLYMARKET_PROXY_ADDRESS: str = '' #This is the address listed below your profile picture when using the Polymarket site.

  #Select from the following 3 initialization options to match your login method, and remove any unused lines so only one client is initialized.

  ### Initialization of a client using a Polymarket Proxy associated with an Email/Magic account. If you login with your email use this example.
  client = ClobClient(host, key=key, chain_id=chain_id, signature_type=1, funder=POLYMARKET_PROXY_ADDRESS)

  ### Initialization of a client using a Polymarket Proxy associated with a Browser Wallet(Metamask, Coinbase Wallet, etc)
  client = ClobClient(host, key=key, chain_id=chain_id, signature_type=2, funder=POLYMARKET_PROXY_ADDRESS)

  ### Initialization of a client that trades directly from an EOA. (If you don't know what this means, you're not using it)
  client = ClobClient(host, key=key, chain_id=chain_id)

  ## Create and sign a limit order buying 5 tokens for 0.010c each
  #Refer to the API documentation to locate a tokenID: https://docs.polymarket.com/developers/gamma-markets-api/fetch-markets-guide

  client.set_api_creds(client.create_or_derive_api_creds()) 

  order_args = OrderArgs(
      price=0.01,
      size=5.0,
      side=BUY,
      token_id="", #Token ID you want to purchase goes here. Example token: 114304586861386186441621124384163963092522056897081085884483958561365015034812 ( Xi Jinping out in 2025, YES side )
  )
  signed_order = client.create_order(order_args)

  ## GTC(Good-Till-Cancelled) Order
  resp = client.post_order(signed_order, OrderType.GTC)
  print(resp)

  ```

  ```typescript Typescript First Trade theme={null}
  //npm install @polymarket/clob-client
  //npm install ethers
  //Client initialization example and dumping API Keys

  import { ApiKeyCreds, ClobClient, OrderType, Side, } from "@polymarket/clob-client";
  import { Wallet } from "@ethersproject/wallet";

  const host = 'https://clob.polymarket.com';
  const funder = ''; //This is the address listed below your profile picture when using the Polymarket site.
  const signer = new Wallet(""); //This is your Private Key. If using email login export from https://reveal.magic.link/polymarket otherwise export from your Web3 Application

  //In general don't create a new API key, always derive or createOrDerive
  const creds = new ClobClient(host, 137, signer).createOrDeriveApiKey();

  //1: Magic/Email Login
  //2: Browser Wallet(Metamask, Coinbase Wallet, etc)
  //0: EOA (If you don't know what this is you're not using it)

  const signatureType = 1; 
    (async () => {
      const clobClient = new ClobClient(host, 137, signer, await creds, signatureType, funder);
      const resp2 = await clobClient.createAndPostOrder(
          {
              tokenID: "", //Use https://docs.polymarket.com/developers/gamma-markets-api/get-markets to grab a sample token
              price: 0.01,
              side: Side.BUY,
              size: 5,
              feeRateBps: 0,
          },
          { tickSize: "0.001",negRisk: false }, //You'll need to adjust these based on the market. Get the tickSize and negRisk T/F from the get-markets above
          //Refer to the API documentation to locate a tokenID: https://docs.polymarket.com/developers/gamma-markets-api/fetch-markets-guide
          //Example token: 114304586861386186441621124384163963092522056897081085884483958561365015034812 ( Xi Jinping out in 2025, YES side )
          //{ tickSize: "0.001",negRisk: true },

          OrderType.GTC, 
      );
      console.log(resp2)
    })();
  ```

#### In addition to detailed comments in the code snippet, here are some more tips to help you get started.

* See the Python example for details on the proper way to initialize a Py-Clob-Client depending on your wallet type. Three exhaustive examples are given. If using a MetaMask wallet or EOA please see the resources [here](https://github.com/Polymarket/py-clob-client?tab=readme-ov-file), for instructions on setting allowances.
* When buying into a market you purchase a "Token" that token represents either a Yes or No outcome of the event. To easily get required token pairs for a given event we have provided an interactive endpoint [here](https://docs.polymarket.com/developers/gamma-markets-api/get-markets).
* Common pitfalls:
  * Negrisk Markets require an additional flag in the OrderArgs `negrisk=False `
  * `invalid signature` error, likely due to one of the following.
    * Incorrect Funder and or Private Key
    * Incorrect NegRisk flag in your order arguments
  * `not enough balance / allowance`.
    * Not enough USDC to perform the trade. See the formula at the bottom of [this](https://docs.polymarket.com/developers/CLOB/orders/orders) page for details.
    * If using Metamask / WEB3 wallet go [here](https://github.com/Polymarket/py-clob-client?tab=readme-ov-file), for instructions on setting allowances.

# WSS Quickstart
Source: https://docs.polymarket.com/quickstart/websocket/WSS-Quickstart

The following code samples and explanation will show you how to subsribe to the Marker and User channels of the Websocket.
You'll need your API keys to do this so we'll start with that.
