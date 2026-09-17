---
title: "Configure the sandboxed Bash tool"
sourceId: "09-harness/claude-code-docs-official"
sourceTitle: "claude-code-docs-official"
sourceKind: "官方文档"
licenseLabel: "仅引用"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://code.claude.com/docs"
entryUrl: "https://code.claude.com/docs"
sourceRel: "en/sandboxing.md"
rawUrl: "/raw/09-harness/claude-code-docs-official/en/sandboxing.md"
sourceSha256: "9173fa7bfc40900080b167be86897899912ce55ff61ad1072f71a5eab69e80ce"
pageSha256: "16389fd919fcbff77ce97db1db2d2ae38a80d968c7a74f4c58100201e418fa7c"
contentMode: "local-full"
zh: ""
---

# Configure the sandboxed Bash tool

> Learn how Claude Code's sandboxed Bash tool provides filesystem and network isolation for safer, more autonomous agent execution.

The Bash sandbox lets Claude run most shell commands without stopping to ask permission. Instead of approving each command, you define which files and network domains commands can touch, and the operating system enforces that boundary for every Bash command and its child processes.

  To compare other isolation approaches such as dev containers, custom containers, and virtual machines, see [Sandbox environments](https://code.claude.com/docs/en/sandbox-environments). To reduce permission prompts for tools other than Bash, see [permission modes](https://code.claude.com/docs/en/permission-modes).

## 本篇目录

- [Get started](https://code.claude.com/docs)
- [Configure sandboxing](https://code.claude.com/docs)
- [How sandboxing works](https://code.claude.com/docs)
- [How sandboxing relates to permissions and permission modes](https://code.claude.com/docs)
- [Configure the sandbox for your organization](https://code.claude.com/docs)
- [Troubleshooting](https://code.claude.com/docs)
- [Limitations](https://code.claude.com/docs)
- [See also](https://code.claude.com/docs)
