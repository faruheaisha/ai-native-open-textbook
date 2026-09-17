---
title: "Phase 2 — Model"
sourceId: "04-work/workbuddy-bench-official"
sourceTitle: "WorkBuddy Bench（腾讯官方评测集）"
sourceKind: "产品仓库"
licenseLabel: "限非商用"
lang: "英文"
tier: 3
volume: "04-work"
sourceUrl: "https://github.com/Tencent/workbuddy-bench"
entryUrl: "https://github.com/Tencent/workbuddy-bench/blob/625b2233093ae4f23e76be28c1f341d41cc70373/.agents/skills/wbbench-run-setup/references/02-model.md"
sourceRel: ".agents/skills/wbbench-run-setup/references/02-model.md"
rawUrl: "/raw/04-work/workbuddy-bench-official/.agents/skills/wbbench-run-setup/references/02-model.md"
sourceSha256: "8b41b214e33d96099ddc1a59166f7874b3c51b9edd9fdd040655ac647ee8ae63"
pageSha256: "8b41b214e33d96099ddc1a59166f7874b3c51b9edd9fdd040655ac647ee8ae63"
contentMode: "local-full"
zh: ""
---

# Phase 2 — Model

Goal: write `configs/models/<provider>/<slug>.yaml`.

**Always read `configs/models/_template.model.yaml` first** — it carries the
authoritative, inline-documented field set (v3 schema). The fields below are a
guide, not a substitute for the live template.

## The one field people get wrong: `protocols`

Declare the backend's wire protocol under the **plural** key `protocols`
(a scalar or a list; first element = primary):

```yaml
model:
  protocols: [openai]          # or [anthropic], or [openai, anthropic] for a gateway
```

- `openai` — backend speaks OpenAI Chat Completions (`/v1/chat/completions`)
- `anthropic` — backend speaks Anthropic Messages (`/v1/messages`)
- A multi-protocol gateway lists every protocol it accepts; a harness whose
  protocol is in the list routes via same-protocol passthrough instead of
  conversion.

**Why the plural matters (verified in source):**
`resolve_manifest.normalize_model_protocols` reads **only** `protocols`; a
missing key silently defaults to `["openai"]`. Several shipped files use the
singular `protocol:` — that works *only* because they're all `openai` and the
default happens to match. `scripts/run.sh`'s preflight additionally reads
singular `protocol` as the primary, so a non-openai backend declared with just
`protocol: anthropic` gets treated as anthropic by the shell but as openai by
the manifest resolver — a split-brain that mis-routes. **Always write
`protocols` (plural).** Never rely on the singular form.

## Required fields

```yaml
model:
