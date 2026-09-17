---
title: "{topic}-ts"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/microsoft-365-agents-toolkit/skills/teams-app-developer/experts/_expert-ts.md"
sourceRel: ".github/plugins/microsoft-365-agents-toolkit/skills/teams-app-developer/experts/_expert-ts.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/microsoft-365-agents-toolkit/skills/teams-app-developer/experts/_expert-ts.md"
sourceSha256: "ea2d67f43582372b88bb3de0978b447fba50642b0f7843ff23f3cce1a97dad2e"
pageSha256: "ea2d67f43582372b88bb3de0978b447fba50642b0f7843ff23f3cce1a97dad2e"
contentMode: "local-full"
zh: ""
---

# \{topic\}-ts

\## purpose

\{One-line description of what this expert covers.\}

\## rules

1. \{Core rule or pattern #1.\}
2. \{Core rule or pattern #2.\}
3. \{Add or remove rules as needed.\}

\## interview (optional — delete if not needed)

\### Q1 — \{Decision Topic\}
```
question: "{Clear question ending with ?}"
header: "{Short label, max 12 chars}"
options:
  - label: "{Option A} (Recommended)"
    description: "{What this option means and effort/tradeoff}"
  - label: "{Option B}"
    description: "{What this option means and effort/tradeoff}"
  - label: "You Decide Everything"
    description: "Accept recommended defaults for all decisions and skip remaining questions."
multiSelect: false
```

\### defaults table (required if interview exists)

| Question | Default |
|---|---|
| Q1 | \{Option A — the recommended choice\} |

\## instructions

Do a web search for:

\- "\{SDK or library name\} \{specific API or concept\} TypeScript \{additional keywords\}"

\## research

Deep Research prompt:

"\{Write a micro expert on \{topic\} in \{SDK/platform\} (TypeScript). Cover \{key areas\}. Include canonical patterns for: \{pattern list\}.\}"

---

\## post-creation checklist

After creating a new expert from this template, you MUST complete these steps:

1. **Add to domain `index.md`** — Open the domain's `index.md` (e.g., `teams/index.md`). Either:
   - Append the new file to an existing task cluster's `Read:` list, OR
   - Create a new task cluster with a `When:` description and `Read:` entry.
   - Append the filename to the `## file inventory` list (alphabetical order).

2. **Update root `index.md` signals** — If the new expert introduces signal words not already covered by the domain's signals list in `.experts/index.md`, add them to the domain's `Signals:` line.

3. **Verify** — Confirm the file appears in both the domain `index.md` file inventory and the appropriate task cluster `Read:` list.
