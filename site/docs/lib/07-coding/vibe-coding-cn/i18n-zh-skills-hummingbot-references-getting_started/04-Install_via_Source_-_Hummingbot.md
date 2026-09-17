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
entryUrl: "https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/hummingbot/references/getting_started.md"
sourceRel: "i18n/zh/skills/hummingbot/references/getting_started.md"
rawUrl: "/raw/07-coding/vibe-coding-cn/i18n/zh/skills/hummingbot/references/getting_started.md"
sourceSha256: "aee68b742e5dcbc964624d10833db685d054e63a53b7e60a19dcbb50ba658356"
pageSha256: "a910a8625a2df3b1f2adbea24d4707057bf441f372ba62e344724ac10c24c66a"
contentMode: "local-full"
zh: ""
---

## Install via Source - Hummingbot

**URL:** https://hummingbot.org/installation/source/

**Contents:**
- Install from Source¶
- Install Dependencies¶
  - 🛠️ macOS Setup Instructions¶
    - ✅ Install Xcode Command Line Tools¶
    - ✅ Install Anaconda (Recommended for macOS)¶
  - 🔹 Option 1: Graphical Installer (Beginner-Friendly)¶
  - 🔹 Option 2: Command Line Installer¶
  - 🐧 Linux Setup Instructions¶
    - ✅ Install/Update System Packages¶
    - ✅ Install Anaconda¶

This method is recommended for developers and users who need to modify Hummingbot's source code. Most users should prefer Docker installation.

These are essential for compiling some Python dependencies.

We recommend using the full Anaconda distribution instead of lighter alternatives like Miniconda. Anaconda includes a broader set of preinstalled packages, which helps prevent dependency conflicts and installation errors commonly encountered with Miniconda.

You can install Anaconda using either the graphical interface or the command line.

Use this method if you're comfortable with the terminal.

For macOS with Intel (x86): curl -O https://repo.anaconda.com/archive/Anaconda3-2024.10-1-MacOSX-x86_64.sh bash Anaconda3-2024.10-1-MacOSX-x86_64.sh

For macOS with Apple Silicon (M1/M2/M3): curl -O https://repo.anaconda.com/archive/Anaconda3-2024.10-1-MacOSX-arm64.sh bash Anaconda3-2024.10-1-MacOSX-arm64.sh

This may take a while to complete and may require a system restart.

Once the Ubuntu distribution is installed, open the Ubuntu terminal and follow the instructions in the Linux section to install the dependencies.

Run all install commands below in an Ubuntu terminal, not Windows Command Prompt or PowerShell.

Clone the repository git clone https://github.com/hummingbot/hummingbot.git cd hummingbot

Install the environment and dependencies ./install

Activate the environment conda activate hummingbot

Compile the code ./compile

Launch Hummingbot ./start

You should see the Hummingbot welcome screen:

To get started with Hummingbot, check out the following pages and guides:

If you need to install the development branch or an older version of Hummingbot, follow these steps:

To use the latest development version, first clone the repository and then switch to the development branch:

To install a specific older version, first list the available tags to find the correct version:

Once you've identified the desired version (e.g., v2.1.0), switch to it using:

The tags for previous versions follow this format: vx.x.x (e.g., v2.1.0).

Essential for Decentralized Exchanges

Gateway must be installed separately to trade on these supported DEXs: - Uniswap (Ethereum) - PancakeSwap (BNB Chain) - Trader Joe (Avalanche) - dYdX (Starkware) - And 30+ others

Gateway acts as middleware that enables Hummingbot to interact with blockchain-based decentralized exchanges. To set up, follow the instructions in Gateway - Installation to generate certificates and connect Gateway to Hummingbot.

**Examples:**

Example 1 (unknown):
```unknown
xcode-select --install
```

Example 2 (unknown):
```unknown
curl -O https://repo.anaconda.com/archive/Anaconda3-2024.10-1-MacOSX-x86_64.sh
bash Anaconda3-2024.10-1-MacOSX-x86_64.sh
```

Example 3 (unknown):
```unknown
curl -O https://repo.anaconda.com/archive/Anaconda3-2024.10-1-MacOSX-arm64.sh
bash Anaconda3-2024.10-1-MacOSX-arm64.sh
```

Example 4 (unknown):
```unknown
sudo apt update && sudo apt upgrade -y && sudo apt install -y gcc build-essential
```
