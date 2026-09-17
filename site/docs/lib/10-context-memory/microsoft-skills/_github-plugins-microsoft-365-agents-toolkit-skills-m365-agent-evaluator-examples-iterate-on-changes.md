---
title: "Example: iterate after agent changes"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/microsoft-365-agents-toolkit/skills/m365-agent-evaluator/examples/iterate-on-changes.md"
sourceRel: ".github/plugins/microsoft-365-agents-toolkit/skills/m365-agent-evaluator/examples/iterate-on-changes.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/microsoft-365-agents-toolkit/skills/m365-agent-evaluator/examples/iterate-on-changes.md"
sourceSha256: "56f41fc11c36061bf9518b1d3c88cab57e70d8019c6c0424edfb2e376c8c2c13"
pageSha256: "56f41fc11c36061bf9518b1d3c88cab57e70d8019c6c0424edfb2e376c8c2c13"
contentMode: "local-full"
zh: ""
---

# Example: iterate after agent changes

User intent: "I changed my agent instructions. Re-run the evals and compare."

## Baseline run

```powershell
npx -y --package @microsoft/m365-copilot-eval@latest runevals --prompts-file evals\evals.json --concurrency 1 --output .evals\baseline.json
```

## After-change run

```powershell
npx -y --package @microsoft/m365-copilot-eval@latest runevals --prompts-file evals\evals.json --concurrency 1 --output .evals\after-instructions.json
```

Keep the dataset, evaluator thresholds, model deployment, and concurrency stable when comparing. If the user intentionally changed the dataset, report that the comparison is not a strict regression comparison.

## Compare

1. Compare `items` by prompt or conversation name.
2. Compare only score keys that exist in both runs.
3. Look for improvements and regressions by evaluator theme.
4. If a setup/auth/model error appears in only one run, do not call it an agent regression.

## Example summary

```text
The instruction change improved grounding on the project-status prompt from fail to pass, but the action-item prompt still fails citations. The next targeted change should require source citations when listing owners, or the eval should be relaxed if the agent cannot expose citations for that data path.
```
