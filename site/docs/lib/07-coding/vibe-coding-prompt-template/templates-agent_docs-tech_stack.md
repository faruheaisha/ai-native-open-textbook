---
title: "Tech Stack"
sourceId: "07-coding/vibe-coding-prompt-template"
sourceTitle: "Vibe Coding 提示词模板"
sourceKind: "课时教程"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "07-coding"
sourceUrl: "https://github.com/KhazP/vibe-coding-prompt-template"
entryUrl: "https://github.com/KhazP/vibe-coding-prompt-template/blob/db481763c24e2b66b919f9d40aa42b16409a62d7/templates/agent_docs/tech_stack.md"
sourceRel: "templates/agent_docs/tech_stack.md"
rawUrl: "/raw/07-coding/vibe-coding-prompt-template/templates/agent_docs/tech_stack.md"
sourceSha256: "8ec7011b65cb5c95adf0b4d5aa24c028ac9264ec0ed25841e3d14d8ddfa2d42d"
pageSha256: "8ec7011b65cb5c95adf0b4d5aa24c028ac9264ec0ed25841e3d14d8ddfa2d42d"
contentMode: "local-full"
zh: ""
---

# Tech Stack

Last verified: [YYYY-MM]

## Stack

| Area | Choice | Notes |
|------|--------|-------|
| Frontend | [framework/version] | [why this choice] |
| Backend | [framework/runtime] | [why this choice] |
| Database | [database/ORM] | [local + production setup] |
| Auth | [provider] | [roles/sessions] |
| Styling | [library/system] | [design constraints] |
| Deployment | [host] | [preview/production path] |

## Commands

- Setup: `[exact command]`
- Dev: `[exact command]`
- Test: `[exact command]`
- Typecheck: `[exact command]`
- Lint/format: `[exact command]`
- Build: `[exact command]`
- Browser/device check: `[exact command or manual flow]`

## AI Runtime

Fill this in only if the product uses AI.

- Provider/runtime: [OpenAI / Anthropic / Gemini-Antigravity / Vercel AI SDK / Cloudflare Workers AI / local model / none]
- Model can see:
  - Public:
  - User-owned:
  - Never send:
- Tools/actions: [read only / draft / write / destructive / external network]
- Approval gates: [what pauses for human confirmation]
- Retention/training setting to verify: [provider setting or policy]
- Fallback: [non-AI path or degraded state]

## Important Patterns

- Data fetching: [pattern]
- State management: [pattern]
- Forms/validation: [pattern]
- Error handling: [pattern]
- Logging/monitoring: [pattern]
