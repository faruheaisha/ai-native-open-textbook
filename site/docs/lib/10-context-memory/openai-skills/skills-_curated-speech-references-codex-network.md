---
title: "Codex network approvals / sandbox notes"
sourceId: "10-context-memory/openai-skills"
sourceTitle: "Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "仅引用"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/openai/skills"
entryUrl: "https://github.com/openai/skills/blob/49f948faa9258a0c61caceaf225e179651397431/skills/.curated/speech/references/codex-network.md"
sourceRel: "skills/.curated/speech/references/codex-network.md"
rawUrl: "/raw/10-context-memory/openai-skills/skills/.curated/speech/references/codex-network.md"
sourceSha256: "c956a51d3e67246cfb43982aa8c82065350fcce4ef7b94bd89e599c575c94d9c"
pageSha256: "c956a51d3e67246cfb43982aa8c82065350fcce4ef7b94bd89e599c575c94d9c"
contentMode: "local-full"
zh: ""
---

# Codex network approvals / sandbox notes

This guidance is intentionally isolated from `SKILL.md` because it can vary by environment and may become stale. Prefer the defaults in your environment when in doubt.

## Why am I asked to approve every speech generation call?
Speech generation uses the OpenAI Audio API, so the CLI needs outbound network access. In many Codex setups, network access is disabled by default (especially under stricter sandbox modes), and/or the approval policy may require confirmation before networked commands run.

## How do I reduce repeated approval prompts (network)?
If you trust the repo and want fewer prompts, enable network access for the relevant sandbox mode and relax the approval policy.

Example `~/.codex/config.toml` pattern:

```
approval_policy = "never"
sandbox_mode = "workspace-write"

[sandbox_workspace_write]
network_access = true
```

Or for a single session:

```
codex --sandbox workspace-write --ask-for-approval never
```

## Safety note
Use caution: enabling network and disabling approvals reduces friction but increases risk if you run untrusted code or work in an untrusted repository.
