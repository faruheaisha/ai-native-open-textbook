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
sourceRel: "en/remote-control.md"
rawUrl: "/raw/09-harness/claude-code-docs-official/en/remote-control.md"
sourceSha256: "24ef9e60eeae3360065480ea2b2ba103f3bef9e6e470ada18c41fcd2be67bbbe"
pageSha256: "351ff29125420d66c8d65b738039e739810390cbcd56eb9b7ff790385c9daadb"
contentMode: "local-full"
zh: ""
---

## Requirements

Before using Remote Control, confirm that your environment meets these conditions:

* **Subscription**: available on Pro, Max, Team, and Enterprise plans. API keys are not supported. On Team and Enterprise, an Owner must first enable the Remote Control toggle in [Claude Code admin settings](https://claude.ai/admin-settings/claude-code).
* **Authentication**: run `claude` and use `/login` to sign in through claude.ai if you haven't already. Without an eligible login, `claude remote-control` exits with an error, while `claude --remote-control` still starts an interactive session and shows a Remote Control failure notification shortly after launch.
* **API endpoint**: not available in any of these configurations:
  * You use Amazon Bedrock, Google Cloud's Agent Platform, or Microsoft Foundry.
  * You point [`ANTHROPIC_BASE_URL`](https://code.claude.com/docs/en/env-vars) at a host other than `api.anthropic.com`, such as an [LLM gateway](https://code.claude.com/docs/en/llm-gateway) or proxy. Unset the variable to use Remote Control. Before v2.1.196, Claude Code allowed Remote Control with a custom `ANTHROPIC_BASE_URL`.
  * You sign in through an enterprise [Claude apps gateway](https://code.claude.com/docs/en/claude-apps-gateway).
* **Feature-flag evaluation**: [`DISABLE_TELEMETRY`, `DO_NOT_TRACK`, `CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC`, and `DISABLE_GROWTHBOOK`](https://code.claude.com/docs/en/env-vars) each disable the feature-flag evaluation that Remote Control availability depends on. Unset the variable wherever it's set, in your shell environment or in the `env` block of a [`settings.json` file](https://code.claude.com/docs/en/settings-reference#all-settings), to use Remote Control.
* **Workspace trust**: run `claude` in your project directory at least once to accept the workspace trust dialog. The startup trust dialog never saves trust for your home directory, so start Remote Control from a project directory.
