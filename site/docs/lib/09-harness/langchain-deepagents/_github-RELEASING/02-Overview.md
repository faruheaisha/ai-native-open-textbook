---
title: "LangChain DeepAgents"
sourceId: "09-harness/langchain-deepagents"
sourceTitle: "LangChain DeepAgents"
sourceKind: "产品仓库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://github.com/langchain-ai/deepagents"
entryUrl: "https://github.com/langchain-ai/deepagents/blob/d93ab3351bbf4c3687212f665094ccad100f2c08/.github/RELEASING.md"
sourceRel: ".github/RELEASING.md"
rawUrl: "/raw/09-harness/langchain-deepagents/.github/RELEASING.md"
sourceSha256: "c49b4d41b74096555af3aadaeee6fda996e8d0ea7d0bb75fe5371469cd90c0c4"
pageSha256: "6c5c29a31e7c2c01f6ee1dc733027a20d522b752c8edf2bff0f9d8064766df87"
contentMode: "local-full"
zh: ""
---

## Overview

Releases are managed via release-please, which:

1. Analyzes commits made to `main`
2. Creates/updates a release PR [(example)](https://github.com/langchain-ai/deepagents/pull/1956) with automated changelog and version bumps
3. When said release PR is merged, triggers the release workflow for that merge commit, which creates both a GitHub and PyPI release
