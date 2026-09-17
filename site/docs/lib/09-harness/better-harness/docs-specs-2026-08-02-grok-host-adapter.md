---
title: "Spec: Grok CLI host adapter"
sourceId: "09-harness/better-harness"
sourceTitle: "Better Harness（QoderAI）"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "09-harness"
sourceUrl: "https://github.com/QoderAI/better-harness"
entryUrl: "https://github.com/QoderAI/better-harness/blob/e1538c15a98856b3349f365d951f4fa0bcc33f24/docs/specs/2026-08-02-grok-host-adapter.md"
sourceRel: "docs/specs/2026-08-02-grok-host-adapter.md"
rawUrl: "/raw/09-harness/better-harness/docs/specs/2026-08-02-grok-host-adapter.md"
sourceSha256: "8bf8b6a556fb9a521db263800b51c1119d8f656f12e126a0bdfdb11fa8d0cd3e"
pageSha256: "8bf8b6a556fb9a521db263800b51c1119d8f656f12e126a0bdfdb11fa8d0cd3e"
contentMode: "local-full"
zh: ""
---

# Spec: Grok CLI host adapter

**Date:** 2026-08-02
**Host id:** `grok`
**Host version (verified):** Grok CLI 0.2.x (user-guide + local `~/.grok`)
**Capability level (this PR):** Partial adapter → Verified assets + sessions + HTML render path
**Non-goals:** Grok marketplace packaging into public npm shell; Canvas mode; reading `auth.json` secrets; claiming full Quickstart until native install smoke is recorded.

## Support slices

| Slice | Status | Owner |
| --- | --- | --- |
| Shell / discovery | Partial — Skill path + optional thin docs; no `.grok-plugin` required for analysis | docs + `skills/better-harness` |
| Configured assets | Claimed | `scripts/agent-customize/providers/grok.mjs` |
| Session evidence | Claimed | `scripts/session-analysis/platforms/grok.mjs` |
| Evidence bundle / registries | Claimed | capability indexes + `evidence-bundle` |
| Output | Claimed — HTML visual | `.grok/better-harness` host root |
| Packaging (npm shell) | Unavailable this PR | — |

## Native contract (verified)

| Item | Value |
| --- | --- |
| Home | `GROK_HOME` env, else `~/.grok` |
| Config | `$GROK_HOME/config.toml`; project may also use `<ws>/.grok/config.toml` |
| Skills | `$GROK_HOME/skills/`, `$GROK_HOME/bundled/skills/`, `~/.agents/skills/`, `<ws>/.grok/skills/`, `<ws>/.agents/skills/` |
| Hooks | `$GROK_HOME/hooks/*.json`, project `.grok/hooks` when present |
| MCP | `[mcp_servers.<name>]` tables in user and project `config.toml` (enabled flag) |
| Plugins | Trusted user `$GROK_HOME/plugins/`, legacy `$GROK_HOME/installed-plugins/`, project `<ws>/.grok/plugins/`, plus `[plugins].paths` from config; physical roots are deduped by realpath while distinct roots keep distinct ids |
