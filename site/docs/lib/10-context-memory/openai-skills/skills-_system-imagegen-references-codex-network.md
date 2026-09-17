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
entryUrl: "https://github.com/openai/skills/blob/49f948faa9258a0c61caceaf225e179651397431/skills/.system/imagegen/references/codex-network.md"
sourceRel: "skills/.system/imagegen/references/codex-network.md"
rawUrl: "/raw/10-context-memory/openai-skills/skills/.system/imagegen/references/codex-network.md"
sourceSha256: "dd6e85cb3da3589cab0f65be15b2c8f9d19633d9490f0a4b0fef5fd243d0464c"
pageSha256: "dd6e85cb3da3589cab0f65be15b2c8f9d19633d9490f0a4b0fef5fd243d0464c"
contentMode: "local-full"
zh: ""
---

# Codex network approvals / sandbox notes

This file is for the fallback CLI mode only. Read it only after the user explicitly asks to use `scripts/image_gen.py`.

This guidance is intentionally isolated from `SKILL.md` because it can vary by environment and may become stale. Prefer the defaults in your environment when in doubt.

## Why am I asked to approve image generation calls?
The fallback CLI uses the OpenAI Image API, so it needs outbound network access. In many Codex setups, network access is disabled by default and/or the approval policy requires confirmation before networked commands run.

## Important note about approvals vs network
- `--ask-for-approval never` suppresses approval prompts.
- It does **not** by itself enable network access.
- In `workspace-write`, network access still depends on your Codex configuration (for example `[sandbox_workspace_write] network_access = true`).

## How do I reduce repeated approval prompts?
If you trust the repo and want fewer prompts, use a configuration or profile that both:
- enables network for the sandbox mode you plan to use
- sets an approval policy that matches your risk tolerance

Example `~/.codex/config.toml` pattern:

```toml
approval_policy = "on-request"
sandbox_mode = "workspace-write"

[sandbox_workspace_write]
network_access = true
```

If you want quieter automation after network is enabled, you can choose a stricter approval policy, but do that intentionally and with care.

## Safety note
Enabling network and reducing approvals lowers friction, but increases risk if you run untrusted code or work in an untrusted repository.
