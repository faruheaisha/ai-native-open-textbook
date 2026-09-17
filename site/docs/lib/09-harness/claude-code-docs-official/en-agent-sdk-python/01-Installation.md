---
title: "claude-code-docs-official"
sourceId: "09-harness/claude-code-docs-official"
sourceTitle: "claude-code-docs-official"
sourceKind: "官方文档"
licenseLabel: "仅引用"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://code.claude.com/docs"
entryUrl: "https://code.claude.com/docs"
sourceRel: "en/agent-sdk/python.md"
rawUrl: "/raw/09-harness/claude-code-docs-official/en/agent-sdk/python.md"
sourceSha256: "f49fb09963fda69499dc97a835a8db4970f3cd3070dff7f68ae6b644bd544987"
pageSha256: "7d40788acf1ea4ec914a5082d5c6bea7722de8073e29950881f355c879e7b301"
contentMode: "local-full"
zh: ""
---

## Installation

Install the package into a virtual environment. On recent Debian, Ubuntu, and Homebrew Python installs, running `pip install` against system Python fails with `error: externally-managed-environment`.

```bash theme={null}
python3 -m venv .venv
source .venv/bin/activate
pip install claude-agent-sdk
```

For uv, Windows PowerShell, and API key setup, see [Setup in the Agent SDK quickstart](https://code.claude.com/docs/en/agent-sdk/quickstart#setup).
