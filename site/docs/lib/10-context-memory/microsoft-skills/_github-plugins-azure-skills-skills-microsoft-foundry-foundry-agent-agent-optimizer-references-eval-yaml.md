---
title: "eval.yaml Guidance"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/microsoft-foundry/foundry-agent/agent-optimizer/references/eval-yaml.md"
sourceRel: ".github/plugins/azure-skills/skills/microsoft-foundry/foundry-agent/agent-optimizer/references/eval-yaml.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/microsoft-foundry/foundry-agent/agent-optimizer/references/eval-yaml.md"
sourceSha256: "4d76aa71d6ff96cd0feb8b2b5b49f5af157d5d0e2e20c6340e54c9b129143909"
pageSha256: "4d76aa71d6ff96cd0feb8b2b5b49f5af157d5d0e2e20c6340e54c9b129143909"
contentMode: "local-full"
zh: ""
---

# eval.yaml Guidance

Create `eval.yaml` directly when the conversation or `.foundry/agent-metadata*.yaml` already selected the dataset/evaluators. Otherwise ask whether to run `azd ai agent eval generate` or let optimize use built-in defaults.

## Include

```yaml
