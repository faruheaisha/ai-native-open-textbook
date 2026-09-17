---
title: "Installation"
sourceId: "07-coding/vibe-coding-cn"
sourceTitle: "Vibe Coding CN"
sourceKind: "课时教程"
licenseLabel: "可转载"
lang: "中英混排"
tier: 3
volume: "07-coding"
sourceUrl: "https://github.com/2025Emma/vibe-coding-cn"
entryUrl: "https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/twscrape/references/installation.md"
sourceRel: "i18n/zh/skills/twscrape/references/installation.md"
rawUrl: "/raw/07-coding/vibe-coding-cn/i18n/zh/skills/twscrape/references/installation.md"
sourceSha256: "77a1759f5df83f7795f9106caf5557bf190188dc7640562ecc881dcd7a4b57bb"
pageSha256: "77a1759f5df83f7795f9106caf5557bf190188dc7640562ecc881dcd7a4b57bb"
contentMode: "local-full"
zh: ""
---

# Installation

## Standard Installation

```bash
pip install twscrape
```

## Development Version

Install the latest development version directly from GitHub:

```bash
pip install git+https://github.com/vladkens/twscrape.git
```

## Requirements

- Python 3.7+
- asyncio support
- Internet connection for Twitter/X access

## Dependencies

The library automatically installs required dependencies:
- `httpx` - Async HTTP client
- `aiosqlite` - Async SQLite database
- Additional dependencies as specified in setup.py

## Verification

Verify installation:

```bash
# Check CLI is available
twscrape --help

# Check Python import works
python -c "from twscrape import API; print('OK')"
```

## Upgrading

```bash
pip install --upgrade twscrape
```

## Uninstallation

```bash
pip uninstall twscrape
```

## Database Location

By default, twscrape creates `accounts.db` in your current working directory. You can specify a custom location:

```python
api = API("path/to/custom.db")
```

Or via CLI:

```bash
twscrape --db path/to/custom.db <command>
```
