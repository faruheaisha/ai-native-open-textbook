---
title: "Harness Adapter Compliance Matrix"
sourceId: "09-harness/ecc"
sourceTitle: "ECC —— Harness 性能优化系统"
sourceKind: "其他材料"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://github.com/affaan-m/ECC"
entryUrl: "https://github.com/affaan-m/ECC/blob/928c1dea72f5c330442fc1f595563398b8f389f7/docs/architecture/harness-adapter-compliance.md"
sourceRel: "docs/architecture/harness-adapter-compliance.md"
rawUrl: "/raw/09-harness/ecc/docs/architecture/harness-adapter-compliance.md"
sourceSha256: "c3757fa48a311bb1c9a7b0b244f91ff9f16e7e038a4d9765d680c481f43ecf74"
pageSha256: "c3757fa48a311bb1c9a7b0b244f91ff9f16e7e038a4d9765d680c481f43ecf74"
contentMode: "local-full"
zh: ""
---

# Harness Adapter Compliance Matrix

This matrix is the public onramp for teams that want to use ECC across more
than one coding harness. It turns the cross-harness architecture into a
practical scorecard: what works today, what is instruction-only, what needs an
adapter, and what evidence an operator should collect before trusting a setup.

ECC's durable units stay in shared sources:

- `skills/*/SKILL.md`
- `rules/`
- `commands/`
- `hooks/hooks.json`
- `scripts/hooks/`
- MCP reference configs
- session and observability contracts

Harness-specific files should only adapt loading, event shape, command names,
or platform limits.

## Compliance States

| State | Meaning |
| --- | --- |
| Native | ECC can install or verify the surface directly for this harness. |
| Adapter-backed | ECC has a thin adapter, plugin, or package surface, but parity differs by harness. |
| Instruction-backed | ECC can provide the guidance and files, but the harness does not expose the runtime hook/session surface ECC needs for enforcement. |
| Reference-only | The tool is useful as a design pressure or external runtime, but ECC does not yet ship a direct installer or adapter for it. |

## Matrix

The matrix below is rendered from
`scripts/lib/harness-adapter-compliance.js` and verified by
`npm run harness:adapters -- --check`.

## Scorecard Onramp

Use this sequence before asking ECC to make a team or repo setup more
autonomous:

```bash
npm run harness:adapters -- --check
npm run harness:audit -- --format json
npm run observability:ready
node scripts/session-inspect.js --list-adapters
node scripts/loop-status.js --json --write-dir .ecc/loop-status
```

Read the result as a setup scorecard, not a product badge:

- `harness:adapters -- --check` proves this public matrix still matches the
  adapter source data and required evidence fields.
- `harness:audit` scores tool coverage, context efficiency, quality gates,
  memory persistence, eval coverage, security guardrails, and cost efficiency.
- `observability:ready` proves the repo still exposes the local status,
  session, tool-activity, risk-ledger, and release-onramp signals.
- `session-inspect --list-adapters` shows which session surfaces are actually
  inspectable in the current environment.
- `loop-status --json` creates a machine-readable handoff/status payload for
  longer autonomous runs.

## Data-Backed Scorecard Contract

Each adapter record exposes:

- `id`
- `state`
- `supported_assets`
- `unsupported_surfaces`
- `install_or_onramp`
- `verification_commands`
- `risk_notes`
- `last_verified_at`
- `owner`
- `source_docs`

The validator fails if a public adapter claim has no install path,
verification command, risk note, owner, source doc, or verification date.

## Operating Rules

- Prefer small, additive adapters over harness-specific forks of the same
  workflow.
- Do not call a harness native until the adapter has an install path and a
  verification command.
- Keep Codex, Gemini, and Zed surfaces honest when enforcement is
  instruction-backed rather than runtime-backed.
- Treat reference-only tools as design pressure until ECC has a direct adapter.
- Keep the terminal-only path healthy; it is the portability floor.
