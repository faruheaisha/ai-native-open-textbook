---
title: "Hummingbot Skill"
sourceId: "07-coding/vibe-coding-cn"
sourceTitle: "Vibe Coding CN"
sourceKind: "课时教程"
licenseLabel: "可转载"
lang: "中英混排"
tier: 3
volume: "07-coding"
sourceUrl: "https://github.com/2025Emma/vibe-coding-cn"
entryUrl: "https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/hummingbot/SKILL.md"
sourceRel: "i18n/zh/skills/hummingbot/SKILL.md"
rawUrl: "/raw/07-coding/vibe-coding-cn/i18n/zh/skills/hummingbot/SKILL.md"
sourceSha256: "7211311601ade919f4aa855be316f5e1cd613bfba88fa8e3336c015bdba6a93b"
pageSha256: "7211311601ade919f4aa855be316f5e1cd613bfba88fa8e3336c015bdba6a93b"
contentMode: "local-full"
zh: ""
---

# Hummingbot Skill

Comprehensive assistance with hummingbot development, generated from official documentation.

## When to Use This Skill

This skill should be triggered when:
- Working with hummingbot
- Asking about hummingbot features or APIs
- Implementing hummingbot solutions
- Debugging hummingbot code
- Learning hummingbot best practices

## Quick Reference

### Common Patterns

**Pattern 1:** For example: candles = [CandlesFactory.get_candle(connector=kucoin, trading_pair="ETH-USDT", interval="1m", max_records=100)]

```
candles = [CandlesFactory.get_candle(connector=kucoin,
           trading_pair="ETH-USDT", interval="1m", max_records=100)]
```

**Pattern 2:** Example:

```
bin/hummingbot_quickstart.py -p a -f simple_pmm_example_config.py -c conf_simple_pmm_example_config_1.yml
```

**Pattern 3:** >>> gateway swap --help usage: gateway swap [-h] [connector] [args ...] positional arguments: connector Connector name/type (e.g., jupiter/router) args Arguments: [base-quote] [side] [amount] options: -h, --help show this help message and exit

```
>>> gateway swap --help
usage: gateway swap [-h] [connector] [args ...]

positional arguments:
  connector   Connector name/type (e.g., jupiter/router)
  args        Arguments: [base-quote] [side] [amount]

options:
  -h, --help  show this help message and exit
```

**Pattern 4:** usage: gateway list [-h]

```
usage: gateway list [-h]
```

**Pattern 5:** Example:

```
price = self.market_data_provider.get_price_by_type('binance', 'BTC-USDT', PriceType.MidPrice)
```

**Pattern 6:** Example:

```
price = self.market_data_provider.get_price_by_volume('binance', 'BTC-USDT', volume: 10000, True)
```

**Pattern 7:** Example:

```
price = self.market_data_provider.get_volume_for_price('binance', 'BTC-USDT', 70000, True)
```

**Pattern 8:** Example:

```
price = self.market_data_provider.get_order_book_snapshot('binance', 'BTC-USDT')
```

## Reference Files

This skill includes comprehensive documentation in `references/`:

- **advanced.md** - Advanced documentation
- **configuration.md** - Configuration documentation
- **connectors.md** - Connectors documentation
- **development.md** - Development documentation
- **getting_started.md** - Getting Started documentation
- **other.md** - Other documentation
- **strategies.md** - Strategies documentation
- **trading.md** - Trading documentation
- **troubleshooting.md** - Troubleshooting documentation

Use `view` to read specific reference files when detailed information is needed.

## Working with This Skill

### For Beginners
Start with the getting_started or tutorials reference files for foundational concepts.

### For Specific Features
Use the appropriate category reference file (api, guides, etc.) for detailed information.

### For Code Examples
The quick reference section above contains common patterns extracted from the official docs.

## Resources

### references/
Organized documentation extracted from official sources. These files contain:
- Detailed explanations
- Code examples with language annotations
- Links to original documentation
- Table of contents for quick navigation

### scripts/
Add helper scripts here for common automation tasks.

### assets/
Add templates, boilerplate, or example projects here.

## Notes

- This skill was automatically generated from official documentation
- Reference files preserve the structure and examples from source docs
- Code examples include language detection for better syntax highlighting
- Quick reference patterns are extracted from common usage examples in the docs

## Updating

To refresh this skill with updated documentation:
1. Re-run the scraper with the same configuration
2. The skill will be rebuilt with the latest information
