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
entryUrl: "https://github.com/KhazP/vibe-coding-prompt-template/blob/db481763c24e2b66b919f9d40aa42b16409a62d7/.agents/skills/vibe-techdesign/references/cli-output.md"
sourceRel: ".agents/skills/vibe-techdesign/references/cli-output.md"
rawUrl: "/raw/07-coding/vibe-coding-prompt-template/.agents/skills/vibe-techdesign/references/cli-output.md"
sourceSha256: "c3261e415eec5ec497d5059f15fbcded11406541af3fa0e7e63b9d8a1ce1e7bb"
pageSha256: "c3261e415eec5ec497d5059f15fbcded11406541af3fa0e7e63b9d8a1ce1e7bb"
contentMode: "local-full"
zh: ""
---

# CLI output contract

After the final `---`, append this fenced JSON block. It powers the `vibeworkflow` CLI, so use the exact stack and commands chosen:

```json
{
  "schemaVersion": 1,
  "documentType": "techdesign",
  "appName": "[App Name]",
  "stack": {
    "frontend": "[framework]",
    "backend": "[framework/runtime]",
    "database": "[database/ORM]",
    "auth": "[provider]",
    "styling": "[library/system]",
    "deployment": "[host]"
  },
  "commands": {
    "setup": "[exact command]",
    "dev": "[exact command]",
    "test": "[exact command]",
    "typecheck": "[exact command]",
    "lint": "[exact command]",
    "build": "[exact command]"
  },
  "aiScope": "[none / in-app AI / automation / agent]"
}
```
