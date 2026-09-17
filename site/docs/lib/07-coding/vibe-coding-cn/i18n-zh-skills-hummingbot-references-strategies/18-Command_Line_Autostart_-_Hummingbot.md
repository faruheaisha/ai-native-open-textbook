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
pageSha256: "003df2327549c79d9793c21f12f414718d02b135e8443daed323f60ebba51b21"
contentMode: "local-full"
zh: ""
---

## Command Line Autostart - Hummingbot

**URL:** https://hummingbot.org/global-configs/strategy-autostart

**Contents:**
- Strategy Autostart¶
- Docker autostart¶
  - Prerequisites¶
  - How to autostart¶
- Source autostart¶
  - Prerequisites¶
  - How to autostart¶

Running any trading bots without manual supervision may incur additional risks. It is imperative that you thoroughly understand and test the strategy and parameters before deploying bots that can trade in an unattended manner.

Hummingbot can automatically start the execution of a previously configured trading strategy upon launch without needing user interaction when provided with pre-existing configuration files. This can be very useful if you wish to deploy already well-tested strategies and configurations to cloud services and have Hummingbot running automatically in the background.

Stop any running containers

Use an IDE like VSCode to edit the docker-compose.yml file.

Edit or add the section that defines the environment variables:

The environment: line

The CONFIG_PASSWORD line: add the Hummingbot password to login

One of CONFIG_FILE_NAME lines: add your script OR strategy config file

Add your SCRIPT_CONFIG file if using a configurable script

The final environment section of the YAML file should look something like this:

Afterwards, save the file.

You can auto-start either a Script or a Strategy:

Scripts are Python files that contain all strategy logic. If you define a .py file as CONFIG_FILE_NAME, Hummingbot assumes it's a script file and looks for the .py file in the hummingbot_files/scripts directory.

Strategies are configurable strategy templates. If you define a .yml file as CONFIG_FILE_NAME, Hummingbot assumes it's a strategy config file and looks for the .yml file in the hummingbot_files/conf/strategies directory.

When you attach to it, the strategy or script should already be running:

Running unattended Hummingbot is very similar to running Hummingbot manually. The only differences are:

Where CONFIG_PASSWORD is the config password SCRIPT_FILE_NAME is the script / strategy file name CONFIG_FILE_NAME is the script / strategy config file name

Let's say you configured your Hummingbot password as a single letter a and you created a config for the Simple PMM Example script which you then want to autostart as soon as you start the bot. Here's how you would configure the autostart command -

a is the config password

simple_pmm_example_config.py is the script / strategy file name

conf_simple_pmm_example_config_1.yml is the script / strategy config file name

More information on strategy can be found in Strategy.

More information on configuration file name can be found in Configuring Hummingbot.

More information on password can be found in Create a secure password.

**Examples:**

Example 1 (unknown):
```unknown
docker compose down
```

Example 2 (unknown):
```unknown
environment:
      - CONFIG_PASSWORD=password
      - CONFIG_FILE_NAME=simple_pmm_example.py
      - SCRIPT_CONFIG=conf_simple_pmm_example_config_1.yml
```

Example 3 (unknown):
```unknown
docker compose up -d
```

Example 4 (unknown):
```unknown
docker attach hummingbot
```
