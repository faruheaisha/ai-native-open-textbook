---
title: "CLI output contract"
sourceId: "07-coding/vibe-coding-prompt-template"
sourceTitle: "Vibe Coding 提示词模板"
sourceKind: "课时教程"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "07-coding"
sourceUrl: "https://github.com/KhazP/vibe-coding-prompt-template"
entryUrl: "https://github.com/KhazP/vibe-coding-prompt-template/blob/db481763c24e2b66b919f9d40aa42b16409a62d7/.agents/skills/vibe-prd/references/cli-output.md"
sourceRel: ".agents/skills/vibe-prd/references/cli-output.md"
rawUrl: "/raw/07-coding/vibe-coding-prompt-template/.agents/skills/vibe-prd/references/cli-output.md"
sourceSha256: "2f1481db057218de8e9c154761808b294144e2b6b05b3b1a90b095daf38541c7"
pageSha256: "2f1481db057218de8e9c154761808b294144e2b6b05b3b1a90b095daf38541c7"
contentMode: "local-full"
zh: ""
---

# CLI output contract

After the final `---`, append this fenced JSON block. It powers the `vibeworkflow` CLI, so keep values short and matching the PRD:

```json
{
  "schemaVersion": 1,
  "documentType": "prd",
  "appName": "[App Name]",
  "oneLiner": "[one-sentence description]",
  "targetUsers": "[who this is for]",
  "phase": "Foundation",
  "mustHave": ["feature"],
  "niceToHave": ["feature"],
  "notInMvp": ["feature"],
  "successMetrics": ["metric"]
}
```
