---
title: "Source notes"
sourceId: "08-agents/agent-systems-handbook"
sourceTitle: "Agent Systems Handbook（智能体系统手册）"
sourceKind: "工程手册"
licenseLabel: "限非商用"
lang: "英文"
tier: 1
volume: "08-agents"
sourceUrl: "https://github.com/Prompthon-IO/agent-systems-handbook"
entryUrl: "https://github.com/Prompthon-IO/agent-systems-handbook/blob/5b71cfa598701a34834f33b42be5f8a422138a3c/README.md"
zh: ""
---

# Source notes

- Upstream project: ComposioHQ/awesome-claude-skills
- Exact source URL: https://github.com/ComposioHQ/awesome-claude-skills/blob/be2a406907dbc61b73e6827ded415c96139d13a2/file-organizer/SKILL.md
- Commit reviewed: `be2a406907dbc61b73e6827ded415c96139d13a2`
- Repository license: UNVERIFIED; where unverified, no copying permission is inferred.
- Copied: no external prose, scripts, diagrams or assets.
- Rewritten: original Prompthon workflow and deterministic helper.
- Prompthon modifications: Classify and safely relocate local files, with preview, approval and undo. Do not synthesize their knowledge. Shared scoped persistence, classroom fixtures, privacy/approval gates, canonical readback and reset guidance.
- Date reviewed: 2026-08-30.

Internal baseline: existing Handbook skills at commit `4103082479cfe632b4ad0def86955f89ef1398e5`. Existing organizer classification and knowledge extractors are reused by import, not replaced. Automate invokes them without reimplementing their jobs. See the [shared audit](https://github.com/Prompthon-IO/agent-systems-handbook/blob/5b71cfa598701a34834f33b42be5f8a422138a3c/skills/course-support/references/source-audit.json).
