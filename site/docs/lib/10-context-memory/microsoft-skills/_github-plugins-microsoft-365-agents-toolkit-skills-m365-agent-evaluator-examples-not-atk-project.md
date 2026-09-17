---
title: "Example: evaluate a non-ATK project"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/microsoft-365-agents-toolkit/skills/m365-agent-evaluator/examples/not-atk-project.md"
sourceRel: ".github/plugins/microsoft-365-agents-toolkit/skills/m365-agent-evaluator/examples/not-atk-project.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/microsoft-365-agents-toolkit/skills/m365-agent-evaluator/examples/not-atk-project.md"
sourceSha256: "561b687faeba871bcad879e2d57340be2b665cbc29c2b5bcdeea5d4e5b8e480b"
pageSha256: "561b687faeba871bcad879e2d57340be2b665cbc29c2b5bcdeea5d4e5b8e480b"
contentMode: "local-full"
zh: ""
---

# Example: evaluate a non-ATK project

User intent: "I do not have an Agents Toolkit project. Can I still evaluate a deployed agent?"

Yes. Use an explicit deployed agent ID through `M365_AGENT_ID` or `--m365-agent-id`.

## Suggested layout

```text
evals\evals.json
env\.env.dev
.evals\
```

Example `env\.env.dev` values:

```text
