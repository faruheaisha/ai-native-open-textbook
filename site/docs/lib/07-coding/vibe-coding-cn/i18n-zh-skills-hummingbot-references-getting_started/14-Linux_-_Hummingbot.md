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
pageSha256: "cc4755e06f855c3d551761ecf90cd590c4f89fdf61e2b21ac79c5e64c9730a86"
contentMode: "local-full"
zh: ""
---

## Linux - Hummingbot

**URL:** https://hummingbot.org/installation/linux/

**Contents:**
- Linux
- Prerequisites¶
  - Cloud server or local machine¶
  - Update Dependencies¶
  - Miniconda / Anaconda¶
- Install Hummingbot¶
- Launch Hummingbot¶
- Other Useful Commands¶
  - Update Hummingbot to latest master release¶
  - Update Hummingbot to development branch¶

The instructions below help you install a standalone Hummingbot instance from source on Linux-based machines.

On new Ubuntu instances, you may need to install the build-essentials package:

Hummingbot uses conda, an open source environment manager to manage dependencies for Python. You can install conda using either Miniconda or Anaconda.

Download the installer for your environment and run it:

Follow the prompts on the installer screens. If you are unsure about any setting, accept the defaults.

To make the changes take effect, close and then re-open your terminal window.

After you have installed the dependencies, run the following commands to install Hummingbot from source:

The conda activate hummingbot command should add a (hummingbot) label in front of your command line, which lets you know that you are inside the conda environment. If not, check if conda was installed correctly and reinstall if necessary.

From inside the conda environment, run the following command to launch Hummingbot:

You should see the Hummingbot welcome screen:

To get started with Hummingbot, check out the following docs:

If you need to run DEX bots, install Hummingbot Gateway.

**Examples:**

Example 1 (unknown):
```unknown
sudo apt update && sudo apt upgrade -y && sudo apt install -y gcc build-essential
```

Example 2 (unknown):
```unknown
wget https://repo.anaconda.com/miniconda/Miniconda3-latest-Linux-x86_64.sh
bash Miniconda3-latest-Linux-x86_64.sh
```

Example 3 (unknown):
```unknown
git clone https://github.com/hummingbot/hummingbot.git
cd hummingbot
./install
conda activate hummingbot
./compile
```

Example 4 (unknown):
```unknown
git pull origin master
```
