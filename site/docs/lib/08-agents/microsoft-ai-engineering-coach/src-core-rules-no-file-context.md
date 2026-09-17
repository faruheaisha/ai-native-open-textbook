---
title: "Description"
sourceId: "08-agents/microsoft-ai-engineering-coach"
sourceTitle: "AI Engineering Coach（微软）"
sourceKind: "系统课程"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "08-agents"
sourceUrl: "https://github.com/microsoft/AI-Engineering-Coach"
entryUrl: "https://github.com/microsoft/AI-Engineering-Coach/blob/18b1a3d16b586c171426c6a407cc5c2dc073556e/src/core/rules/no-file-context.md"
sourceRel: "src/core/rules/no-file-context.md"
rawUrl: "/raw/08-agents/microsoft-ai-engineering-coach/src/core/rules/no-file-context.md"
sourceSha256: "3fcffc22eeb858a47f491c17f9ca8871d96fd518c6239c4ead9762e4355b1528"
pageSha256: "3fcffc22eeb858a47f491c17f9ca8871d96fd518c6239c4ead9762e4355b1528"
contentMode: "local-full"
zh: ""
---

# Description
Detects requests that have no file references, meaning Copilot cannot see the relevant code context.

# When Triggered
&#123;&#123;pct&#125;&#125; of requests have no file references. Copilot gives better answers with file context.

# How to Improve
Use #file to reference relevant files, or open files in the editor so Copilot can use them as context.

# Examples
"&#123;&#123;message&#125;&#125;..."

# Detection Logic
```detect
scan: requests
match: referencedFiles.length == 0 AND editedFiles.length == 0
aggregate: ratio
check: ratio > thresholds.maxNoContextRate AND count > thresholds.minSample
examples: "{{messageText | clip:80}}"
```
