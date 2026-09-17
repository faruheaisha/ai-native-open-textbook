---
title: "n8n workflow sketch"
sourceId: "10-context-memory/context-engineering-book"
sourceTitle: "Context Engineering（Bonigarcia 教程）"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "10-context-memory"
sourceUrl: "https://github.com/bonigarcia/context-engineering"
entryUrl: "https://github.com/bonigarcia/context-engineering/blob/46719154489e410b509db4fb69ab1c29fb3362a0/ch10/n8n/human_approval_workflow/workflow.md"
sourceRel: "ch10/n8n/human_approval_workflow/workflow.md"
rawUrl: "/raw/10-context-memory/context-engineering-book/ch10/n8n/human_approval_workflow/workflow.md"
sourceSha256: "07b00dc136dc4975e33b23dc9b8644f273abf17f37f63583521273acea2068e1"
pageSha256: "07b00dc136dc4975e33b23dc9b8644f273abf17f37f63583521273acea2068e1"
contentMode: "local-full"
zh: ""
---

# n8n workflow sketch

```text
Manual Trigger
  -> Collect request
  -> Classify request
  -> If approval needed
  -> Wait for approval
  -> Final action
```
