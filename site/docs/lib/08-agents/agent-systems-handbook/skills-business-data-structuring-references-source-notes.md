---
title: "Source and license notes"
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

# Source and license notes

Reviewed 2026-08-30. Behavioral reference: [pinned upstream package](https://github.com/anthropics/skills/blob/3b3fad96af16a10759d930941b4520ba0c40edae/skills/xlsx/SKILL.md). The upstream xlsx package has separate proprietary terms. It is a behavior/quality reference only; no upstream instructions, scripts or assets were copied.

Copied: nothing. Rewritten: all instructions, code, fixtures and classroom material. Prompthon adaptations: a distinct Structure boundary, tenant-scoped persistence, synthetic data, approval/readback safeguards, portable setup, English/Chinese exercises and reset behavior. The underlying openpyxl library is a declared dependency, not copied skill code.

See the [shared source audit](https://github.com/Prompthon-IO/agent-systems-handbook/blob/5b71cfa598701a34834f33b42be5f8a422138a3c/skills/course-support/references/source-audit.json). Package-specific license conditions take precedence over an upstream repository's general license; in particular, xlsx material is not vendored.
