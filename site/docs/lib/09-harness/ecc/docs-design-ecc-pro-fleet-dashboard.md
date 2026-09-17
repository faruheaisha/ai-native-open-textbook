---
title: "ECC Pro: Hosted Multi-Repo Agent Security Posture Dashboard"
sourceId: "09-harness/ecc"
sourceTitle: "ECC —— Harness 性能优化系统"
sourceKind: "其他材料"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://github.com/affaan-m/ECC"
entryUrl: "https://github.com/affaan-m/ECC/blob/928c1dea72f5c330442fc1f595563398b8f389f7/docs/design/ecc-pro-fleet-dashboard.md"
sourceRel: "docs/design/ecc-pro-fleet-dashboard.md"
rawUrl: "/raw/09-harness/ecc/docs/design/ecc-pro-fleet-dashboard.md"
sourceSha256: "99bf23b96dfea69ccfc3f1f57bf470c31003a075319559416985edb98b968ca7"
pageSha256: "99bf23b96dfea69ccfc3f1f57bf470c31003a075319559416985edb98b968ca7"
contentMode: "local-full"
zh: ""
---

# ECC Pro: Hosted Multi-Repo Agent Security Posture Dashboard

> Status: draft design for review. Produced 2026-06-21 by an architecture agent grounded
> in the existing ecc-agentshield primitives. Proposes the hosted ECC Pro surface; does not
> implement it. Companion to docs/ECC-PRO-SECURITY-ROADMAP.md (the "next" flagship item).

## 1. Title, Thesis, and Wedge

ECC Pro is a hosted, authenticated, multi-repo "Sentry for agent security" surface built on top of the existing `ecc-agentshield` local CLI primitives. AgentShield already does ~30K npm downloads/month with near-zero monetization. The thesis: the continuous and fleet primitives that make a hosted product valuable already exist as local CLI building blocks (evidence packs with `bundleDigest` integrity, `operatorReadback`/`reviewItems` promotion routing, `fs.watch` drift detection, NDJSON runtime allow/block logging, baseline diffing, and policy promotion gates). The fastest path to MRR is not new science; it is hosting these primitives as authenticated multi-repo and multi-org surfaces and unifying config-scan posture with runtime telemetry over time.

The wedge: Snyk and similar SCA tools are scan-only and have no concept of agent-runtime semantics (no PreToolUse deny decisions, no MCP/hook/agent injection model, no drift-over-time on agent config). Sentry has time-series and alerting but zero security semantics; it does not know what a hardcoded `sk-ant-` key, a `Bash(*)` allow rule, or an `autoApprove` MCP server is. CodeRabbit reviews PR diffs but is point-in-time and has no fleet posture rollup or runtime block-rate trend. ECC Pro is the only surface that charts `score` trend, `drift` history, `blocked-command` rate, and `injection-attempt` rate across a fleet of repos, anchored on a security-specific rule engine (102 rules across secrets/permissions/hooks/mcp/agents) that nobody else has. AgentShield was featured at the Cerebral Valley x Anthropic Claude Code Hackathon (Feb 2026); the hosted surface is the commercial extension of that featured tooling.

## 2. Scope: Free Local-First vs Pro Hosted

The free local-first scanner stays the moat. We never paywall the scanner itself; we monetize hosting, history, and multi-repo aggregation. Local-first capability is also what produces the redacted, integrity-checked artifacts the hosted product ingests, so a strong free tier directly grows the funnel.

Free, zero-account, local-only (unchanged, MIT):
- `agentshield scan` and all 102 rules, `--format terminal|json|markdown|html|sarif`.
- `--fix`, `agentshield init`, `--opus` deep analysis (user supplies their own `ANTHROPIC_API_KEY`).
- `--evidence-pack <dir>`, `evidence-pack verify|inspect|fleet` (local fleet routing stays free).
- `--baseline`, `--save-baseline`, `agentshield baseline write`, `--gate`.
- `agentshield runtime install|status|repair`, local `runtime.ndjson` logging.
- `agentshield policy init|export|promote`, all 6 policy packs (`oss`, `team`, `enterprise`, `regulated`, `high-risk-hooks-mcp`, `ci-enforcement`).
- Local `agentshield watch` (fs.watch drift, terminal/webhook alerts).
- GitHub Action `affaan-m/agentshield@v1` (CI scanning, SARIF upload, baseline gate).
- MiniClaw local server.

Pro, hosted, account-required (the recurring-revenue surface):
- Persisted history: every scan/baseline/drift/runtime event retained and charted over time (free CLI is point-in-time and stateless on the local box).
- Multi-repo and org rollup: cross-repo posture, fleet `operatorReadback` aggregation, org-level score trend.
- Authenticated ingestion endpoints for CI scan results, `runtime.ndjson` streaming, and watch/drift events.
- Hosted dashboard frontend (posture, drift timeline, blocked-command rate, injection-attempt rate, secret-exposure events).
- Hosted alerting and routing: turn `reviewItems` into assignable tickets, deliver to Slack/Linear/GitHub via the ecc-tools GitHub App.
- RBAC, audit log, retention/compliance, SSO (Enterprise).
- Hosted policy promotion gate: org-level promotion approval workflow on top of `policy promote` `reviewItems`.

The hard line: anything that runs against local files and produces a redacted artifact stays free. Anything that stores, aggregates, charts, or routes across repos/time/people is Pro. We never require an account to find a vulnerability; we require one to track a fleet of them over time.

## 3. Architecture

The hosted backend is a thin, stateless ingestion and query layer over the existing artifact shapes. The CLI/Action/App remain the producers; the backend never re-implements scanning. It receives already-redacted artifacts (the CLI redacts paths/usernames/emails/tokens by default in `createRedactor`/`buildReplacements`) and persists summaries plus time-series rollups.

Component diagram (ASCII):

```
  PRODUCERS (free, local-first, already redacted)
  +-----------------------+   +------------------------+   +-------------------------+
  | GitHub Action          |   | agentshield watch       |   | runtime PreToolUse hook |
  | (CI scan + evidence    |   | (fs.watch, diffBaseline,|   | (evaluateToolCall ->    |
  |  pack, SARIF, baseline)|   |  DriftResult, webhook)  |   |  runtime.ndjson)        |
  +-----------+-----------+   +-----------+------------+   +-----------+-------------+
              |                            |                            |
              | POST evidence-pack         | POST drift event           | POST/stream ndjson batch
              | summary + manifest digest  | (DriftResult)              | (RuntimeLogEntry[])
              v                            v                            v
  +-----------------------------------------------------------------------------------+
  | INGESTION GATEWAY (stateless, authenticated)                                       |
  |  - API token auth + org/repo identity resolution                                   |
  |  - schema validation (Zod, reuse SecurityReport / DriftResult / RuntimeLogEntry)   |
  |  - bundleDigest re-verification, idempotency on digest                             |
  |  - reject-if-not-redacted guard (manifest.redacted must be true for hosted)        |
  +-----------------------------------+-----------------------------------------------+
                                      |
                 +--------------------+--------------------+
                 v                                         v
  +-----------------------------+              +-------------------------------+
  | PRIMARY STORE (Postgres)     |              | TIME-SERIES ROLLUP STORE       |
  |  org, repo, scan, baseline,  |              |  score_trend, drift_history,   |
  |  finding, runtime_event,     |  rollup job  |  blocked_cmd_rate,             |
  |  drift_event, policy_eval,   |------------->|  injection_rate, secret_events |
  |  evidence_pack, review_item  |              |  (Postgres time buckets or     |
  +--------------+--------------+              |   ClickHouse for high-volume    |
                 |                              |   runtime ndjson)               |
                 |                              +---------------+----------------+
                 |                                              |
                 v                                              v
  +-----------------------------------------------------------------------------------+
  | QUERY API (authenticated, RBAC-filtered, multi-tenant isolated by org_id)          |
  +-----------------------------------+-----------------------------------------------+
                                      |
                                      v
  +-----------------------------+        +-------------------------------------------+
  | DASHBOARD FRONTEND (Next.js) |        | ROUTING/ALERTS (ecc-tools GitHub App,      |
  |  posture, trends, drift, fleet|        |  Slack/Linear) from reviewItems + tickets  |
  +-----------------------------+        +-------------------------------------------+
```

Ingestion sources and their existing producers:
- CI scan results: GitHub Action already emits the full `SecurityReport` JSON, SARIF, and an evidence pack with `manifest.json` (`bundleDigest`, per-artifact `sha256`/`bytes`) plus `ci-context.json` (`EvidencePackGitHubContext`: `repository`, `sha`, `runId`, `workflow`, `ref`, `actor`). The Action gets a new optional input `ecc-pro-ingest-url` + token; on success it POSTs the inspected pack summary (`EvidencePackInspectionResult`) and the manifest digest.
- Runtime telemetry: the PreToolUse hook (`evaluateToolCall` -> `logEvalResult`) writes `RuntimeLogEntry` lines to `.agentshield/runtime.ndjson`. A small `agentshield runtime ship` command (Pro) tails and batch-POSTs new NDJSON lines.
- Watch/drift events: `startWatcher` already computes `DriftResult` and calls `dispatchAlert`. We add a `webhook` alert target that points at the hosted ingest endpoint; the existing `formatWebhookPayload` carries `newFindings`, `resolvedFindings`, `scoreDelta`, `isRegression`, `hasCritical`.

Storage choice: Postgres (Supabase) for the relational entities and most rollups; ClickHouse only if runtime NDJSON volume per org makes per-row retention in Postgres uneconomical (runtime events are append-only and high-cardinality, which is the ClickHouse sweet spot). Default MVP is Postgres-only.

## 4. API Contract

All endpoints are authenticated with an org-scoped API token (header `Authorization: Bearer eccp_...`). Request/response shapes reuse the real field names from the CLI so the producers do not need a translation layer. Ingestion is idempotent keyed on `bundleDigest` (scans) or `(repo_id, timestamp, tool, decision)` hash (runtime).

### 4.1 Ingest a scan / evidence pack summary

`POST /v1/ingest/scan`

The body is the existing `EvidencePackInspectionResult` plus the `ci-context` summary. The backend never asks for raw evidence; it consumes the already-computed inspection summary so it can re-derive the same rollups the local `evidence-pack inspect` produces.

Request:
```json
{
  "repository": "acme/agent-platform",
  "bundleDigest": "sha256:9f2c...e1",
  "expectedBundleDigest": "sha256:9f2c...e1",
  "generatedAt": "2026-06-21T17:42:00.000Z",
  "redacted": true,
  "report": {
    "score": { "grade": "C", "numericScore": 66 },
    "findings": { "total": 29, "critical": 1, "high": 7, "medium": 8, "low": 10, "info": 3 },
    "runtimeConfidence": { "active-runtime": 11, "template-example": 14, "project-local-optional": 4 }
  },
  "policy": { "status": "failed", "policyPack": "enterprise", "violations": 3 },
  "baseline": { "status": "regressed", "newFindings": 4, "resolvedFindings": 1, "scoreDelta": -8 },
  "supplyChain": { "totalPackages": 22, "riskyPackages": 2, "criticalCount": 0, "highCount": 1 },
  "ciContext": {
    "provider": "github-actions",
    "repository": "acme/agent-platform",
    "workflow": "security.yml",
    "runId": "1182334455",
    "sha": "4c1d9ab"
  },
  "remediation": { "totalFindings": 29, "autoFixable": 2, "manualReview": 7 }
}
```

Response:
```json
{
  "ok": true,
  "scanId": "scan_01J...",
  "repoId": "repo_01H...",
  "ingestedAt": "2026-06-21T17:42:03.114Z",
  "deduped": false,
  "rollupsUpdated": ["score_trend", "drift_history", "secret_exposure_events"]
}
```

Server-side guards: reject with `422` if `redacted !== true` (hosted tenants must never store unredacted bundles), and reject with `409 deduped` echo if `bundleDigest` already ingested for that repo. If `expectedBundleDigest` is present and differs from `bundleDigest`, mark `integrity: "mismatch"` on the stored scan.

### 4.2 Ingest runtime telemetry batch

`POST /v1/ingest/runtime`

Body is an array of the existing `RuntimeLogEntry` shape from `src/runtime/types.ts`.

Request:
```json
{
  "repository": "acme/agent-platform",
  "sessionId": "sess_4f8a",
  "entries": [
    { "timestamp": "2026-06-21T17:50:01.002Z", "tool": "Bash", "decision": "block", "reason": "Input matches denied pattern \"rm -rf\"", "durationMs": 2 },
    { "timestamp": "2026-06-21T17:50:02.114Z", "tool": "Read", "decision": "allow", "durationMs": 1 }
  ]
}
```

Response:
```json
{ "ok": true, "accepted": 2, "blocked": 1, "allowed": 1, "rollupsUpdated": ["blocked_command_rate"] }
```

Note: `RuntimeLogEntry` already carries no raw input payload (only `tool`, `decision`, `reason`, `durationMs`), so runtime ingestion is safe-by-construction. We keep it that way; the hosted API must not add a raw-input field.

### 4.3 Ingest a drift event

`POST /v1/ingest/drift`

Body is the existing `DriftResult` from `src/watch/types.ts` (already what `formatWebhookPayload` emits).

Request:
```json
{
  "repository": "acme/agent-platform",
  "timestamp": "2026-06-21T18:01:10.000Z",
