---
title: "Update Threat Intelligence Through AgentSec"
sourceId: "09-harness/claude-code-ultimate-guide"
sourceTitle: "Claude Code Ultimate Guide"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://github.com/FlorianBruniaux/claude-code-ultimate-guide"
entryUrl: "https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/examples/skills/update-threat-db/SKILL.md"
sourceRel: "examples/skills/update-threat-db/SKILL.md"
rawUrl: "/raw/09-harness/claude-code-ultimate-guide/examples/skills/update-threat-db/SKILL.md"
sourceSha256: "4a6f404b4125b1b9e2245aabc1e755604eb90f3aa288521169f98c24b9b2e586"
pageSha256: "4a6f404b4125b1b9e2245aabc1e755604eb90f3aa288521169f98c24b9b2e586"
contentMode: "local-full"
zh: ""
---

# Update Threat Intelligence Through AgentSec

AgentSec Triage owns the technical source of truth. This guide skill is a
delegator and does not carry a private copy of the threat database.

## Workflow

1. Locate the sibling `agentsec-triage` checkout or use `AGENTSEC_REPO`.
2. Read AgentSec's `AGENTS.md` and
   `.claude/commands/update-threat-db.md` completely.
3. Execute the source review, red-first tests, authoring changes, and builders
   inside an isolated AgentSec worktree.
4. Synchronize `exports/security-feed.v1.json` to the guide and landing only
   after AgentSec passes locally.
5. Run the guide and landing mirror checks, then report each repository's
   status separately.

Do not treat the guide's compatibility database as canonical. Do not publish,
tag, or push AgentSec while its license decision blocks public release.

The compatibility database still consumed by the guide commands is
`examples/commands/resources/threat-db.yaml`.
