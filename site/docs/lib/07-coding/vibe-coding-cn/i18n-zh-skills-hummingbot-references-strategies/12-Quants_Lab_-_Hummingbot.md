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
pageSha256: "d6d69c174fef8402b5d18bbcfbe18873f5f493592f0630c61001a79de8bfdf78"
contentMode: "local-full"
zh: ""
---

## Quants Lab - Hummingbot

**URL:** https://hummingbot.org/quants-lab/

**Contents:**
- Quants Lab¶
- What is Quants Lab?¶
- Installation¶
- Usage¶
- Next Steps¶
- Tutorials¶
  - Hummingbot Live: Quants Lab¶

Quants Lab contains interactive notebooks and task schedulers for quantitative trading research and development. It provides comprehensive tools for data collection, backtesting, strategy development, and automated task management.

GitHub Repository: github.com/hummingbot/quants-lab

Quants Lab acts as a research and development platform for quantitative traders, enabling systematic strategy creation and testing. It bridges the gap between raw market data and executable trading strategies, providing a complete toolkit for quants and algorithmic traders.

Quants Lab enables quantitative traders to:

Under the hood, Quants Lab uses the Hummingbot Python library and is designed to be compatible with other Hummingbot repos.

Clone the Quants-Lab Github repo to download it to your machine, and then enter the folder: git clone https://github.com/hummingbot/quants-lab.git cd quants-lab

Then, run the one-command installation script install.sh:

This script create a quants-lab Anaconda/Miniconda environment with all dependencies. Then, it sets up a MongoDB database for storage and creates a new .env file that contains starting environment variables.

For more information about other installation options, see the Quants Lab Github repository.

To get started, activate the quants-lab environment, explore available notebooks, and then customize them for your needs.

You can also create and schedule automated runs of tasks, as well as individual notebooks:

After successful installation:

The videos below demonstrate features from an pre-release version of Quants Lab. Some interfaces and functionalities may have changed in the official release.

**Examples:**

Example 1 (unknown):
```unknown
git clone https://github.com/hummingbot/quants-lab.git
cd quants-lab
```

Example 2 (unknown):
```unknown
./install.sh

[INFO] 🚀 Welcome to QuantsLab Installation!

[INFO] This script will:
[INFO]   1. Check prerequisites (conda, docker, docker compose)
[INFO]   2. Create conda environment from environment.yml
[INFO]   3. Install QuantsLab package in development mode
[INFO]   4. Setup databases (optional)
[INFO]   5. Create .env file with defaults
[INFO]   6. Test the installation
```

Example 3 (unknown):
```unknown
# Activate environment
conda activate quants-lab

# Launch Jupyter notebooks
jupyter lab

# Navigate to research_notebooks/ folders
```

Example 4 (unknown):
```unknown
# List available tasks
python cli.py list-tasks

# Run single task
python cli.py trigger-task --task pools_screener --config config/pools_screener_v2.yml
```
