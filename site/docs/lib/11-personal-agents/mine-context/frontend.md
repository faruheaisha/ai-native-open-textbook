---
title: "MineContext"
sourceId: "11-personal-agents/mine-context"
sourceTitle: "MineContext（火山引擎个人上下文助手）"
sourceKind: "其他材料"
licenseLabel: "可转载"
lang: "中英混排"
tier: 3
volume: "11-personal-agents"
sourceUrl: "https://github.com/volcengine/MineContext"
entryUrl: "https://github.com/volcengine/MineContext/blob/171c7a9ea8091e326ddcf0f10718aa1b58c83c65/frontend/README.md"
sourceRel: "frontend/README.md"
rawUrl: "/raw/11-personal-agents/mine-context/frontend/README.md"
sourceSha256: "15f68e4f2eced5fab838dea2d6ec613228c12f876c228cbcd1e803d6ebdc26be"
pageSha256: "15f68e4f2eced5fab838dea2d6ec613228c12f876c228cbcd1e803d6ebdc26be"
contentMode: "local-full"
zh: ""
---

# MineContext

## Project Setup

### Build Backend

#### for macos

```bash
uv sync
source .venv/bin/activate
./build.sh
```

#### for windows

not support yet

### Install

```bash
cd frontend
pnpm install
```

### Development

```bash
pnpm dev
```

### Build APP

```bash
# For macOS
pnpm build:mac
# Data Path
# ～/Library/Application\ Support/MineContext
```

### Data Path

～/Library/Application\ Support/MineContext
