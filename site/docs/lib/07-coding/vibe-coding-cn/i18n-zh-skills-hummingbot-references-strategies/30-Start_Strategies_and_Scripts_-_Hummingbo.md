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
pageSha256: "3e8d0759907970518ce2fb747c91f57766f5a59dfeb4d969fd51cfddced36961"
contentMode: "local-full"
zh: ""
---

## Start Strategies and Scripts - Hummingbot

**URL:** https://hummingbot.org/client/start-stop

**Contents:**
- Start and Stop Strategy¶
- Starting a strategy¶
- Stop a running strategy¶
- Strategy Autostart¶
  - Docker Autostart¶
    - Prerequisites¶
    - How to Configure Docker Autostart¶
  - Source Installation Autostart¶
    - Prerequisites¶
    - How to Configure Source Autostart¶

After creating or importing a config file, use the start command to run the strategy.

Run stop command to stop the running strategy. Doing this will also cancel all active orders.

Hummingbot can automatically start the execution of a previously configured trading strategy upon launch without needing user interaction. This feature works with both regular and headless modes.

Stop any running containers docker compose down

Modify docker-compose.yml

Edit the environment section to include:

This will start Hummingbot in detached mode (running in the background).

You should see your Hummingbot container running with the configured strategy.

When you attach, the strategy should already be running. To detach without stopping the container, use Ctrl+P followed by Ctrl+Q.

Use the following command:

Running any trading bots without manual supervision may incur additional risks. It is imperative that you thoroughly understand and test the strategy and parameters before deploying bots that can trade in an unattended manner.

Hummingbot can run in headless mode, which allows the bot to operate without the interactive CLI interface. This is particularly useful for deploying bots to cloud services or running multiple instances programmatically.

--headless: Enables headless mode

-p PASSWORD: Your Hummingbot password

-f CONFIG_FILE_NAME: Strategy config file (.yml) or script file (.py)

-c SCRIPT_CONFIG: (Optional) Configuration file for scripts

You can also use environment variables, which is especially useful for Docker deployments:

MQTT is Required: Without a CLI interface, MQTT is the only way to:

Monitor bot status and performance

View logs and error messages

Stop the bot or modify parameters

Receive alerts and notifications

Use with Hummingbot API: We strongly recommend using headless mode alongside the Hummingbot API for:

Managing multiple bot instances

Real-time monitoring and control

Automated deployment and scaling

Integration with other systems

Logging: In headless mode, logs are still written to files, but you won't see them in real-time unless you're monitoring via MQTT or viewing log files directly.

You can auto-start either:

Scripts: Python files (.py) containing all strategy logic. Hummingbot looks for these in the scripts directory

Strategies: Configurable strategy templates with YAML config files (.yml). Hummingbot looks for these in the conf/strategies directory

Test Thoroughly: Always test your strategies in paper trading mode before running them unattended

Set Appropriate Limits: Configure kill switches, balance limits, and other safety parameters

Monitor Regularly: Even in headless/autostart mode, regularly check logs and performance

Use MQTT/API: Set up proper monitoring through MQTT or Hummingbot API for real-time alerts

Secure Your System: Ensure your deployment environment is secure, especially when running with autostart

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
  - SCRIPT_CONFIG=conf_simple_pmm_example_config_1.yml  # Optional for scripts
  - HEADLESS_MODE=true  # Optional: Enable headless mode
```

Example 3 (unknown):
```unknown
docker compose up -d
```

Example 4 (unknown):
```unknown
docker attach hummingbot
```
