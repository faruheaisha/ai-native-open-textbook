---
title: "Anthropic 平台文档（英文全量）"
sourceId: "01-foundations/anthropic-platform-docs-en"
sourceTitle: "Anthropic 平台文档（英文全量）"
sourceKind: "官方文档"
licenseLabel: "仅引用"
lang: "英文"
tier: 3
volume: "01-foundations"
sourceUrl: "https://platform.claude.com/docs"
entryUrl: "https://platform.claude.com/docs"
sourceRel: "docs/en/cli-sdks-libraries/cli/authentication.md"
rawUrl: "/raw/01-foundations/anthropic-platform-docs-en/docs/en/cli-sdks-libraries/cli/authentication.md"
sourceSha256: "fffbd1c839997adb106c2ae8a2f86bd4e2678c0451121c2af12e742845aa19d2"
pageSha256: "fffbd1c839997adb106c2ae8a2f86bd4e2678c0451121c2af12e742845aa19d2"
contentMode: "local-full"
zh: ""
---

# Anthropic 平台文档（英文全量）

The `ant` CLI supports several credential sources. The [Quickstart](https://platform.claude.com/docs/en/cli-sdks-libraries/cli/quickstart#authentication) covers the one-command happy path (`ant auth login`). This page covers every option in full.

## Interactive login

`ant auth login` lets you call the API without creating or managing an API key. It opens a browser-based OAuth flow against the Claude Console and stores the resulting credentials under `$ANTHROPIC_CONFIG_DIR` (see [Configuration directory](https://platform.claude.com/docs/en/manage-claude/wif-reference#configuration-directory) for the OS-specific default). On a remote host or in any environment without a local browser, pass `--no-browser` to print the authorize URL and paste the returned code back into the terminal.

```bash CLI
ant auth login

# On a remote host without a browser:
ant auth login --no-browser

# Bind to a specific workspace and skip the browser picker:
ant auth login --workspace-id wrkspc_01...

# If the named profile you pass with --profile doesn't exist,
# a new named profile will be created with that name.
