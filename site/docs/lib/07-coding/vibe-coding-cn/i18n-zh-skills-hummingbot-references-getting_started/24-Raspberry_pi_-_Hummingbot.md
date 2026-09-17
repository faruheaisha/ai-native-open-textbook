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
pageSha256: "c3ebd058d8c552d6a7e93958eef8f5ccf2224fe84ea316584229cf64e27b3a51"
contentMode: "local-full"
zh: ""
---

## Raspberry pi - Hummingbot

**URL:** https://hummingbot.org/installation/raspberry-pi/

**Contents:**
- Raspberry pi
- Prerequisites¶
  - Download 64-bit OS¶
  - Load the image file to your Raspberry Pi’s SD card¶
- Install from Source¶

Hummingbot doesn't require much power, so some users have run successfully run multiple instances on a single Raspberry Pi. The following steps are for the Raspberry Pi but it should also work with any other device that uses the same ARM architecture.

Running Hummingbot on a Raspberry Pi or similar device has the same main benefit of running it on a cloud server: having a dedicated machine for Hummingbot. Raspberry Pi’s are relatively low cost, easy to set up, and, of course, don’t have the monthly charges associated with a cloud provider.

To run Hummingbot on a Raspberry Pi, a 64-bit OS is required as it won't work with 32-bit. You can download the 64-bit OS from the Raspberry Pi website or from the Ubuntu website.

You can also choose between CLI (command line) and Desktop GUI versions but you'll get more performance with just using the CLI version.

The Raspberry Pi has an easy to follow guide with alternatives on how to load the SD card with a Raspberry Pi OS from different operating systems.

Once the OS is installed and booted then you can follow the steps below to install Hummingbot using either Docker or Source

Update the repository and install important dependencies: sudo apt update sudo apt upgrade -y sudo apt-get install build-essential libssl-dev libffi-dev gcc python3-dev -y

Install Miniforge: wget https://github.com/conda-forge/miniforge/releases/latest/download/Miniforge3-Linux-aarch64.sh sh Miniforge3-Linux-aarch64.sh

Restart the terminal: exec bash

Install conda-build: conda install conda-build

Clone the Hummingbot repository: git clone https://github.com/hummingbot/hummingbot.git

If you need to switch branches (ie. development branch) then after cloning the repository use the command git checkout [branch_name] to switch branches. For example, to switch to the development branch use git checkout development

Change directory into the Hummingbot folder: cd hummingbot

If you are using Ubuntu 22.04 you'll need to go into the ./setup folder first and edit the environment.yml file and change "cryptography==2.8" to "cryptography==3.1.1" before running the ./install command otherwise you'll get an error "could not build wheels for cryptography"

Run the install command: ./install

Activate the conda environment: conda activate hummingbot

Clean your Hummingbot directory and then compile:

Launch Hummingbot: ./start

**Examples:**

Example 1 (unknown):
```unknown
sudo apt update
sudo apt upgrade -y
sudo apt-get install build-essential libssl-dev libffi-dev gcc python3-dev -y
```

Example 2 (unknown):
```unknown
wget https://github.com/conda-forge/miniforge/releases/latest/download/Miniforge3-Linux-aarch64.sh
sh Miniforge3-Linux-aarch64.sh
```

Example 3 (unknown):
```unknown
conda install conda-build
```

Example 4 (unknown):
```unknown
git clone https://github.com/hummingbot/hummingbot.git
```
