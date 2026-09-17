---
title: "Claim Provenance"
sourceId: "10-context-memory/agent-skills-for-context-engineering"
sourceTitle: "Agent Skills for Context Engineering"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/muratcankoylan/Agent-Skills-for-Context-Engineering"
entryUrl: "https://github.com/muratcankoylan/Agent-Skills-for-Context-Engineering/blob/6dbe1a1d868eab51a3bc9011b0f55e2891513e40/researcher/claims/README.md"
sourceRel: "researcher/claims/README.md"
rawUrl: "/raw/10-context-memory/agent-skills-for-context-engineering/researcher/claims/README.md"
sourceSha256: "4dfe1172a317438b7beaae8bec5c2e599864d02f3354390e7bbd6995cacdc08b"
pageSha256: "4dfe1172a317438b7beaae8bec5c2e599864d02f3354390e7bbd6995cacdc08b"
contentMode: "local-full"
zh: ""
---

# Claim Provenance

Claim provenance records volatile, numeric, benchmark, or externally sourced claims that appear in published skills. The goal is not to cite every sentence. It is to make claims that can rot easy to audit and revalidate.

Each line in `index.jsonl` records:

- `claim_id`: stable identifier
- `claim_text`: concise statement of the claim
- `owning_skill`: skill that uses the claim
- `section`: section where the claim appears
- `source_url`: upstream source
- `retrieved_at`: date or run artifact that captured the source
- `evidence_strength`: `primary`, `secondary`, `anecdotal`, or `derived`
- `volatility`: `low`, `medium`, or `high`
- `last_reviewed`: date or run ID for the latest review

High-volatility claims should be reviewed before release-sensitive updates and after major model or provider changes.
