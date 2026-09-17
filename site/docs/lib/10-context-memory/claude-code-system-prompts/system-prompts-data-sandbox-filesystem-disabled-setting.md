---
title: "Claude Code System Prompts"
sourceId: "10-context-memory/claude-code-system-prompts"
sourceTitle: "Claude Code System Prompts"
sourceKind: "源码研读"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "10-context-memory"
sourceUrl: "https://github.com/Piebald-AI/claude-code-system-prompts"
entryUrl: "https://github.com/Piebald-AI/claude-code-system-prompts/blob/3af4c6139aaabb0470440961ca8c8fb871099234/system-prompts/data-sandbox-filesystem-disabled-setting.md"
sourceRel: "system-prompts/data-sandbox-filesystem-disabled-setting.md"
rawUrl: "/raw/10-context-memory/claude-code-system-prompts/system-prompts/data-sandbox-filesystem-disabled-setting.md"
sourceSha256: "c86aa0477cb0c24ddb199c67dc255b0410e1e641ca006a51134eadfabe974150"
pageSha256: "c86aa0477cb0c24ddb199c67dc255b0410e1e641ca006a51134eadfabe974150"
contentMode: "local-full"
zh: ""
---

# Claude Code System Prompts

Sandboxed commands get unrestricted read/write access to the host filesystem; network egress is still confined to network.allowedDomains. Intended for deployments whose goal is egress control rather than filesystem containment. Does not change Bash prompting: sandbox.autoAllowBashIfSandboxed is independent and still defaults to true, so set it to false to keep prompting for sandboxed commands. Drops the read protection from filesystem.denyRead and credentials.files deny entries for sandboxed commands, since both are enforced by the filesystem layer this turns off; credentials.files mask entries (sentinel binds) and credentials.envVars deny/mask are unaffected.
