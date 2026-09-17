---
title: "Claude Code Guide（zebbern）"
sourceId: "09-harness/claude-code-guide-zebbern"
sourceTitle: "Claude Code Guide（zebbern）"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://github.com/zebbern/claude-code-guide"
entryUrl: "https://github.com/zebbern/claude-code-guide/blob/64c890fe74c3ccfad673dc9c71dc85b8dd2f4817/skills/react-best-practices/rules/rendering-activity.md"
sourceRel: "skills/react-best-practices/rules/rendering-activity.md"
rawUrl: "/raw/09-harness/claude-code-guide-zebbern/skills/react-best-practices/rules/rendering-activity.md"
sourceSha256: "8fff22008e423e8f97504f9317520bef7c92feab66e1b841f67bf53076849ee9"
pageSha256: "8fff22008e423e8f97504f9317520bef7c92feab66e1b841f67bf53076849ee9"
contentMode: "local-full"
zh: ""
---

# Claude Code Guide（zebbern）

## Use Activity Component for Show/Hide

Use React's `<Activity>` to preserve state/DOM for expensive components that frequently toggle visibility.

**Usage:**

```tsx
import { Activity } from "react"

function Dropdown({ isOpen }: Props) {
  return (
  )
}
```

Avoids expensive re-renders and state loss.
