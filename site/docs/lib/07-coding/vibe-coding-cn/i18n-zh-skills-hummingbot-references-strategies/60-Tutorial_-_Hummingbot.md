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
pageSha256: "4e372a75ead9268899cf35af1be8711845b7a02907dd7bdd1604a9ee17e891ba"
contentMode: "local-full"
zh: ""
---

## Tutorial - Hummingbot

**URL:** https://hummingbot.org/developers/strategies/tutorial

**Contents:**
- Tutorial
- What you'll learn¶
- Getting started¶
- Create a strategy¶
  - Strategy files¶
  - __init__.py¶
  - limit_order_config_map.py¶
  - start.py¶
  - limit_order.py¶
  - conf_limit_order_strategy_TEMPLATE.yml¶

This tutorial is intended to get you familiarized with the basic concepts of creating a basic Hummingbot strategy that executes a simple limit order.

By the end of this tutorial, you should:

Follow the instructions in Installation and install Hummingbot from source. If the installation was successful, you should see the Hummingbot welcome screen afterwards:

Let’s create a simple LimitOrder strategy that places a limit order!

For the purposes of this article, we assume that you have installed Hummingbot in a directory ~/hummingbot-instance. From that directory, navigate to the strategy directory that contains all the strategies. Each sub-folder is a different strategy. cd ~/hummingbot-instance cd hummingbot/strategy In this directory, create a limit_order folder which will contain the files for our strategy: mkdir limit_order cd limit_order

Next, go into the folder and create the four files that we need for our strategy: touch __init__.py limit_order_config_map.py limit_order.py start.py

Each of these files has a specific purpose and naming convention. See the Developer Tutorial to learn more about the file structure and naming conventions for different strategies.

Lastly, we also need to create a strategy configuration template, which defines the user-configurable parameters defined by the strategy. Like the strategy files and folders, the template file name also follows a convention.

Let’s look at these files individually.

The init file exposes your strategy. Paste the following code into the file using a code editor: # Initializing the project from .limit_order import LimitOrder __all__ = [limit_order]

Here, the __all__ field is used to expose the public module LimitOrder for use.

The config map file sets the user prompts to set the strategy parameters. The naming convention for this file is \{strategy_name\}_config_map.py.

Use the following code in your config map file: from hummingbot.client.config.config_var import ConfigVar # Returns a market prompt that incorporates the connector value set by the user def market_prompt() -> str: connector = limit_order_config_map.get("connector").value return f'Enter the token trading pair on \{connector\} >>> ' # List of parameters defined by the strategy limit_order_config_map =\{ "strategy": ConfigVar(key="strategy", prompt="", default="limit_order", ), "connector": ConfigVar(key="connector", prompt="Enter the name of the exchange >>> ", prompt_on_new=True, ), "market": ConfigVar( key="market", prompt=market_prompt, prompt_on_new=True, ), \} The parameters in this file are mapped as key-value pairs. Each field uses a ConfigVar method to accept parameters. ConfigVar is a variable that you can use to control the trading behavior of the bot.

The key parameter identifies the field, while the prompt parameter lets you choose the prompt message. If you include prompt_on_new, the prompt will be asked each time the user creates a new strategy. Otherwise, it will only be displayed when the user configures the parameter with config.

In the above example, the strategy field identifies the trading strategy: LimitOrder. Similarly, we use connector field to prompt for the name of the exchange, and the market field to prompt for trading pair that you want to trade. Note that the prompt for market uses a function which uses the value for connector set by the user in the previous question.

Additionally, you can supply validators as parameters to ensure only accepted values are entered, and you can use the default parameter to supply a default value to the parameters. See the ConfigVar file for all the ways that you can set strategy parameters.

The start file initializes the configuration for a strategy. Paste the following code into the file:

In the above code, the connector variable stores the exchange name, whereas the market variable stores the trading pair. These variables fetch the required values from the config map file, which we defined in the previous step.

Similarly, the MarketTradingPairTuple object accepts the exchange name, trading pair, base asset and quote asset for as its parameters.

This information allows us to initialize the LimitOrder object.

The strategy file defines its behavior. Paste the following code into the file:

Check out the MarketTradingPairTuple class for more methods to add to your bot.

Both StrategyPyBase class and buy_with_specific_market method derive from the strategy base class. To learn more about other methods you can use using the class, visit Strategy_base.

Lastly, we also need an additional file inside the templates folder, which acts as a placeholder for the strategy parameters. First, let’s navigate to the templates folder and create the file. Run the following commands. cd ~/hummingbot-instance cd hummingbot/templates touch conf_limit_order_strategy_TEMPLATE.yml

Add the following code to this file: template_version: 1 strategy: null connector: null market: null

The template filename convention is conf_\{strategy_name\}_strategy_TEMPLATE.yml.

Now that we have created a new trading strategy let’s run it in paper trading mode!

First, let’s recompile the code. It's good practice to recompile the code every time you make changes to rebuild any altered Cython code. cd ~/hummingbot-instance ./compile Now, start Hummingbot: ./start

Your Hummingbot UI comprises three sections:

Follow the steps below to use the strategy we have created.

Run start to run your bot in paper trading mode. You should see the following log messages:

You can also run the history command to see the results of the trade:

Congratulations - you have just created your first trading bot! This bot is very simple but should provide the foundation for you to experiment further. Can you prompt the user to change the order amount or trade type, or chain a series of trades?

Before you know it, you will be creating complex trading strategies combining different exchanges with Hummingbot! To learn more about creating Hummingbot strategies, check out our Developer Tutorial.

**Examples:**

Example 1 (unknown):
```unknown
cd ~/hummingbot-instance
cd hummingbot/strategy
```

Example 2 (unknown):
```unknown
mkdir limit_order
cd limit_order
```

Example 3 (unknown):
```unknown
touch __init__.py limit_order_config_map.py limit_order.py start.py
```

Example 4 (python):
```python
# Initializing the project
from .limit_order import LimitOrder
__all__ = [limit_order]
```
