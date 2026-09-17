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
entryUrl: "https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/hummingbot/references/strategies.md"
sourceRel: "i18n/zh/skills/hummingbot/references/strategies.md"
rawUrl: "/raw/07-coding/vibe-coding-cn/i18n/zh/skills/hummingbot/references/strategies.md"
sourceSha256: "a9ba87eb4e73a53320c54672ff37d6a98bbd94e8e45e53c860c73e4e1c853574"
pageSha256: "fa82ce72417252af34a9ae53369e6e4193c4306b24b9cf00bbec20b57c838790"
contentMode: "local-full"
zh: ""
---

## Walkthrough controller - Hummingbot

**URL:** https://hummingbot.org/v2-strategies/walkthrough-controller/

**Contents:**
- Walkthrough controller
- What we'll cover¶
- Create the controller configs¶
- Create the generic script config¶
- Start the script¶
- Changing configs¶

Starting with Hummingbot 2.0, you will be able to configure and deploy controllers using Dashboard, the new entry point for Hummingbot users launching in June 2024!

In this more complex example, the strategy logic is housed in a Controller, and the user generates a controller configuration that is run with a generic script, which acts as a controller loader.

This allows users to run multiple configurations, as well as multiple controllers, in a single script.

Let's say we want to create a single bot that provides liquidity to two distinct trading pairs on Binance Futures, each configured with unique buy and sell spreads, order amounts, and other pair-specific parameters. In the past, users had to run separate Hummingbot instances for each configuration, each running a separate strategy or script.

Now, this can be handled in a single strategy using the pmm_simple.py controller.

First, we will generate pair-specific configurations. Then, we can run these configurations all at once with the v2_with_controllers.py generic script.

The initial step involves generating a separate controller configuration for each trading pair.

Execute the command below to generate the controller config:

This will create the conf_market_making.pmm_simple_1.yml controller config file under the /conf/controllers folder

Now, repeat the steps above to create a new controller config.

This time, use a different trading pair, and different buy and sell spreads. Save this modified configuration under the file name conf_market_making.pmm_simple_2.yml.

Afterwards, you should now have two controller config files under the /conf/controllers/ folder:

Execute the command below to generate the script config file:

Enter the file names of your controller configs, separated by commas:

Once you create the initial generic script config, it might be easier to edit this file and replace it with new controller names rather than having to re-generate it each time.

Execute the command below to start the script:

The bot should now be running and start placing orders for both pairs. Run the status command to see the bot status.

Users often need to modify the strategy configuration as it is running. In the Strategies V2 framework, the configs are dynamic, so you just need to save changes to the config files

Let's say we want to adjust the order spreads or refresh time for the first pair above.

The controller config files are under the /conf/controllers/ folder within your instance. Browse to the Hummingbot folder then enter the command below: nano conf/controllers/conf_market_making.pmm_simple_1.yml

This will open up Nano - a Linux text editor. You can also use Visual Studio Code or any other text editor you prefer.

Make the necessary changes you want here then press CTRL + O to save, then CTRL + X to exit.

If you edit and save changes to the controller config file, you'll see the spreads change on the next refresh, which is set by the config_update_interval parameter (default: 60 seconds).

**Examples:**

Example 1 (unknown):
```unknown
create --controller-config market.making.pmm_simple
```

Example 2 (unknown):
```unknown
Enter the name of the exchange to trade on >> binance_perpetual
Enter the name of the trading pair to trade on >> WLD-USDT
Enter the total amount in quote asset to use for trading >> 100
Enter a comma-separated list of buy spreads >> 0.01, 0.02
Enter a comma-separated list of sell spreads >> 0.01, 0.02
Enter the refresh time in seconds for executors >> 20
Set the leverage to use for trading >> 20
Enter the stop loss >> 0.03
Enter the take profit >> 0.02 
Enter the time limit in seconds >> 2700
Enter the order type for taking profit >> LIMIT
Enter the trailing stop as activation_price, trailing_delta >> 0.013, 0.003
Enter a file name for your configuration >> conf_market_making.pmm_simple_1.yml
```

Example 3 (unknown):
```unknown
conf_market_making.pmm_simple_1.yml
conf_market_making.pmm_simple_2.yml
```

Example 4 (unknown):
```unknown
create --script-config v2_with_controllers
```

---

## 

**URL:** https://hummingbot.org/v2-strategies/diagrams/23.png
