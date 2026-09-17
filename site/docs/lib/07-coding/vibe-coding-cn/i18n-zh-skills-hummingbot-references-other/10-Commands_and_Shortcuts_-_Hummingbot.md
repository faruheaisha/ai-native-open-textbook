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
pageSha256: "35544372e0c2af3c4da5888206018ff5b5facdc64a6236afa618481157cc6cf4"
contentMode: "local-full"
zh: ""
---

## Commands and Shortcuts - Hummingbot

**URL:** https://hummingbot.org/client/commands-shortcuts

**Contents:**
- Commands and Shortcuts¶
- Hummingbot Commands¶
- Gateway Commands¶
- Docker Commands¶
- Linux Commands¶
- Keyboard Shortcuts¶
- Search¶
- Copy and Paste¶
- Adding New Commands¶

Below are the available commands in the current Hummingbot release.

Gateway v2.8.0 introduces comprehensive commands for managing wallets, executing swaps, and managing liquidity positions on decentralized exchanges. For detailed usage and examples, see the Gateway Commands Reference.

Users can also use gateway --help to see all available commands:

Gateway help command can also be used with specific commands:

It can also be used with other commands:

These are the commonly used docker commands when using Hummingbot.

To view more docker commands, go to Docker Command Line Reference.

These are the basic commands used to navigate Linux commonly used with Hummingbot.

For more information about basic Linux commands, check out The Linux command line for beginners.

* Used for text edit in input pane only.

To highlight, hold SHIFT + LMB (left mouse button) and drag across the text you want to select.

To select text on macOS, you may need to enable the Allow Mouse Reporting option by pressing ⌘ + R or selecting View > Allow Mouse Reporting in the menu bar.

Then you should be able to select text by holding LMB (left mouse button) and drag. You can also hold down ⌥ + shift to select specific lines like the image below.

When accessing Hummingbot on a Linux cloud server through ssh using a macOS terminal, hold down the Option ⌥ key or ⌥ + ⌘ to highlight text.

To use this shortcut, check this box by doing a right-click on the title bar at the top of the Hummingbot window, then select Properties.

Currently, Hummingbot supports the following commands:

Depending on the usage of the hummingbot client, you may need to add new commands to the client. This is done by adding a new command class to the hummingbot/client/command directory.

The new command class should be called &lt;command_name>_command.py

The new class should be called &lt;CommandName>Command and adhere to the CamelCase naming convention.

The new class should have a function called command_name which will be ran when the command is called in the Hummingbot client.

Add the new class to the __init__.py file in the hummingbot/client/command directory and add any necessary imports to the __init__.py file.

The last step is to add any other functions that the new command class may need.

Please note: check the hummingbot/client/command directory for any existing commands that may be similar to the new command you are adding.

**Examples:**

Example 1 (javascript):
```javascript
>>> gateway --help
usage:  gateway [-h] {allowance,approve,balance,config,connect,generate-certs,list,lp,ping,pool,swap,token} ...

positional arguments:
  {allowance,approve,balance,config,connect,generate-certs,list,lp,ping,pool,swap,token}
    allowance           Check token allowances for ethereum connectors
    approve             Approve token for use with ethereum connectors
    balance             Check token balances
    config              Show or update configuration
    connect             Add a wallet for a chain
    generate-certs      Create SSL certificate
    list                List available connectors
    lp                  Manage liquidity positions
    ping                Test node and chain/network status
    pool                View or update pool information
    swap                Swap tokens
    token               View or update token information

options:
  -h, --help            show this help message and exit
```

Example 2 (unknown):
```unknown
>>> gateway swap --help
usage: gateway swap [-h] [connector] [args ...]

positional arguments:
  connector   Connector name/type (e.g., jupiter/router)
  args        Arguments: [base-quote] [side] [amount]

options:
  -h, --help  show this help message and exit
```

Example 3 (unknown):
```unknown
>>> gateway lp --help
usage: gateway lp [-h] [connector] [{add-liquidity,remove-liquidity,position-info,collect-fees}]

positional arguments:
  connector             Connector name/type (e.g., raydium/amm)
  {add-liquidity,remove-liquidity,position-info,collect-fees}
                        LP action to perform

options:
  -h, --help            show this help message and exit
```

---

## 

**URL:** https://hummingbot.org/dashboard/portfolio-5.png

---

## 

**URL:** https://hummingbot.org/dashboard/instance-4.png
