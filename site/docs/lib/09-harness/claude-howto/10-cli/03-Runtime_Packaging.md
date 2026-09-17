---
title: "Claude How-To"
sourceId: "09-harness/claude-howto"
sourceTitle: "Claude How-To"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "09-harness"
sourceUrl: "https://github.com/luongnv89/claude-howto"
entryUrl: "https://github.com/luongnv89/claude-howto/blob/97bfb0685e03112ad39845889061d02cef6e534c/10-cli/README.md"
sourceRel: "10-cli/README.md"
rawUrl: "/raw/09-harness/claude-howto/10-cli/README.md"
sourceSha256: "d828c0d6684b52e2c08a4547b5e6e526f7b27045e72b6e3e8b73824e05e7f8e5"
pageSha256: "06b732b3b2f58422978c11326d6b6597a4d1be8170e2db1a402cef968ed2cef7"
contentMode: "local-full"
zh: ""
---

## Runtime & Packaging

Since **v2.1.113**, the Claude Code CLI launches a **native per-platform binary** (macOS, Linux, Windows) via optional npm dependencies. The binary is matched to your OS and architecture at install time — the older bundled-JavaScript runtime is no longer the default on macOS or Linux.

The **user-facing install is unchanged**: `npm install -g @anthropic-ai/claude-code` still works and remains the recommended path. Behind the scenes npm fetches the correct native binary for your platform.

**Download host** (v2.1.116+): native-binary artifacts are served from `https://downloads.claude.ai/claude-code-releases`.

> **Corporate / proxy users**: If your network requires an explicit allowlist, add `downloads.claude.ai` (and `https://downloads.claude.ai/claude-code-releases`) to your proxy egress rules. Environments that previously allowlisted only `storage.googleapis.com` or the npm registry will need to be updated or `claude update` and the initial install will fail.

The older JavaScript bundle is still produced for Windows and for environments that pin to it; those installs continue to ship Glob and Grep as first-class tools (see the Glob/Grep footnote under [Tools](#tool--permission-management)).
