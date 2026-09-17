---
title: "Third-Party Notices"
sourceId: "09-harness/learn-workbuddy"
sourceTitle: "Learn WorkBuddy（从 0 复刻桌面 Agent Harness）"
sourceKind: "课时教程"
licenseLabel: "可转载"
lang: "中文"
tier: 1
volume: "09-harness"
sourceUrl: "https://github.com/adongwanai/learn-workbuddy"
entryUrl: "https://github.com/adongwanai/learn-workbuddy/blob/d8c2a32614555196e405f20c67e23ed84f2f2239/THIRD_PARTY_NOTICES.md"
sourceRel: "THIRD_PARTY_NOTICES.md"
rawUrl: "/raw/09-harness/learn-workbuddy/THIRD_PARTY_NOTICES.md"
sourceSha256: "4840be894b7eeed86b0f3dda326547890eb1a8089cf9b84a56a27de0f4b14765"
pageSha256: "4840be894b7eeed86b0f3dda326547890eb1a8089cf9b84a56a27de0f4b14765"
contentMode: "local-full"
zh: ""
---

# Third-Party Notices

This repository is MIT licensed. It also depends on third-party Python
packages for demos and tests. Their licenses are governed by their respective
projects.

| Package | Why It Is Used | Notes |
|---|---|---|
| `anthropic` | Anthropic-compatible teaching path and DeepSeek compatibility. | Imported lazily when a real provider is selected. |
| `openai` | OpenAI Responses API provider path. | Imported lazily when `--provider openai` is selected. |
| `python-dotenv` | Load local `.env` files for optional real-provider demos. | No secrets should be committed. |
| `pyyaml` | Parse chapter progression metadata and structured teaching files. | Used by tests and verification utilities. |
| `pytest` | Offline test suite. | Required for local and CI verification. |

The tutorial code does not vendor these packages. Install them with:

```sh
pip install -r requirements.txt
```

Before adding a dependency, prefer the Python standard library for teaching
clarity. If a dependency is necessary, document why it exists here and keep
provider SDK imports lazy so offline demos remain deterministic.
