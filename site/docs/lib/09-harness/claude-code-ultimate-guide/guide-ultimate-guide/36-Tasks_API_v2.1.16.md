---
title: "Claude Code Ultimate Guide"
sourceId: "09-harness/claude-code-ultimate-guide"
sourceTitle: "Claude Code Ultimate Guide"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://github.com/FlorianBruniaux/claude-code-ultimate-guide"
entryUrl: "https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/ultimate-guide.md"
sourceRel: "guide/ultimate-guide.md"
rawUrl: "/raw/09-harness/claude-code-ultimate-guide/guide/ultimate-guide.md"
sourceSha256: "4d290b0171bbaaffd149d5d2e4da964392cb212d7357408df40d8f346f952dbc"
pageSha256: "588fd694a1ef36f8cc05097a17e8ef52955c9ae91f993eecefbde8940248609d"
contentMode: "local-full"
zh: ""
---

#### Tasks API (v2.1.16+)

**Available tools:**
- `TaskCreate` - Initialize new tasks with hierarchy and dependencies
- `TaskUpdate` - Modify task status, metadata, and dependencies
- `TaskGet` - Retrieve individual task details
- `TaskList` - List all tasks in current task list
- ~~`TaskOutput`~~: **Deprecated (v2.1.83+)**. Use `Read` on `.claude/tasks/<id>/output.log` to access task output directly.

**Core capabilities:**
