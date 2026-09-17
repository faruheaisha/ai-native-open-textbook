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
pageSha256: "4b6429a8d8bc98be136af80655f6be7f544153546d152d90bb73cdc31c398758"
contentMode: "local-full"
zh: ""
---

## Scripts - Hummingbot

**URL:** https://hummingbot.org/scripts/

**Contents:**
- Scripts
- Script Examples¶
- Configuration Files¶
- Base Classes¶
- Script Architecture¶
  - Adding Config Parameters¶
  - on_tick Method¶
  - format_status Method¶

Scripts are the entry point for Hummingbot strategies. Standalone scripts let new users automate basic trading actions and implement simple versions of Humminggbot strategies.

They also enable Hummingbot users to build customized strategies using the Strategy V2 framework, and access the full power of Hummingbot exchange connectors in a few lines of Python code.

Should your script run into an error, it's crucial that you exit Hummingbot entirely, correct or debug the faulty script, and then restart Hummingbot. The stop command won't rectify the issue in case of an error. To get back on track, a complete shutdown and subsequent relaunch of Hummingbot is required.

For more info, see the Script Walkthrough. This detailed walkthrough shows you how to run a simple directional algo trading strategy.

See Script Examples for a list of the current sample scripts in the Hummingbot codebase. These examples show you how to:

We welcome new sample script contributions from users! To submit a contribution, please follow the Contribution Guidelines.

Scripts can be created both with and without config files.

To create a configuration file for your script, execute:

This command auto-completes with scripts from the local /scripts directory that are configurable. You'll be prompted to specify strategy parameters, which are then saved in a YAML file within the conf/scripts directory. To run the script, use:

Auto-complete will suggest config files from the local /conf/scripts directory.

Scripts that use the Strategy V2 framework inherit from the StrategyV2Base class. These scripts allow the user to create a config file with parameters.

Other scripts, including simple examples and older scripts, inherit from the ScriptStrategyBase class. These scripts define their parameters in the script code and do not expose config parameters.

The entry point for StrategyV2 is a Hummingbot script that inherits from the StrategyV2Base class.

This script fetches data from the Market Data Provider and manages how each Executor behaves. Optionally, it can load a Controller to manage the stategy logic instead of defining it in within the script. Go through the Walkthrough to learn how it works.

See Sample Scripts for more examples of StrategyV2-compatible scripts.

To add user-defined parameters to a StategyV2 script, add a configuration class that extends the StrategyV2ConfigBase class in StrategyV2Base class.

This defines a set of configuration parameters that are prompted to the user when they run create to generate the config file. Only questions marked prompt_on_new are displayed.

Afterwards, these parameters are stored in a config file. The script checks this config file every config_update_interval (default: 60 seconds) and updates the parameters that it uses in-flight.

This method acts as the strategy's heartbeat, is called regularly, and allows the strategy to adapt to new market conditions in real time.

This overrides the standard status function and provides a formatted string representing the current status of the strategy, including the name, trading pair, and status of each executor.

Users can customize this function to display their custom strategy variables.

**Examples:**

Example 1 (unknown):
```unknown
create --script-config [SCRIPT_FILE]
```

Example 2 (unknown):
```unknown
start --script [SCRIPT_FILE] --conf [SCRIPT_CONFIG_FILE]
```

Example 3 (unknown):
```unknown
class StrategyV2ConfigBase(BaseClientModel):
    """
    Base class for version 2 strategy configurations.
    """
    markets: Dict[str, Set[str]] = Field(
        default="binance_perpetual.JASMY-USDT,RLC-USDT",
        client_data=ClientFieldData(
            prompt_on_new=True,
            prompt=lambda mi: (
                "Enter markets in format 'exchange1.tp1,tp2:exchange2.tp1,tp2':"
            )
        )
    )
    candles_config: List[CandlesConfig] = Field(
        default="binance_perpetual.JASMY-USDT.1m.500:binance_perpetual.RLC-USDT.1m.500",
        client_data=ClientFieldData(
            prompt_on_new=True,
            prompt=lambda mi: (
                "Enter candle configs in format 'exchange1.tp1.interval1.max_records:"
                "exchange2.tp2.interval2.max_records':"
            )
        )
    )
    controllers_config: List[str] = Field(
        default=None,
        client_data=ClientFieldData(
            is_updatable=True,
            prompt_on_new=True,
            prompt=lambda mi: "Enter controller configurations (comma-separated file paths), leave it empty if none: "
        ))
    config_update_interval: int = Field(
        default=60,
        gt=0,
        client_data=ClientFieldData(
            prompt_on_new=False,
            prompt=lambda mi: "Enter the config update interval in seconds (e.g. 60): ",
        )
    )
```

Example 4 (python):
```python
def on_tick(self):
    for executor_handler in self.executor_handlers.values():
        if executor_handler.status == ExecutorHandlerStatus.NOT_STARTED:
            executor_handler.start()
```

---

## 

**URL:** https://hummingbot.org/v2-strategies/diagrams/14.png
