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
entryUrl: "https://github.com/zebbern/claude-code-guide/blob/64c890fe74c3ccfad673dc9c71dc85b8dd2f4817/skills/react-best-practices/rules/bundle-dynamic-imports.md"
sourceRel: "skills/react-best-practices/rules/bundle-dynamic-imports.md"
rawUrl: "/raw/09-harness/claude-code-guide-zebbern/skills/react-best-practices/rules/bundle-dynamic-imports.md"
sourceSha256: "290228cb600ba0e6288b9150e94409790b485d9bb1fc9a8884acbccff5f29dd6"
pageSha256: "290228cb600ba0e6288b9150e94409790b485d9bb1fc9a8884acbccff5f29dd6"
contentMode: "local-full"
zh: ""
---

# Claude Code Guide（zebbern）

## Dynamic Imports for Heavy Components

Use `next/dynamic` to lazy-load large components not needed on initial render.

**Incorrect (Monaco bundles with main chunk ~300KB):**

```tsx
import { MonacoEditor } from "./monaco-editor"

function CodePanel({ code }: { code: string }) {
  return <MonacoEditor value={code} />
}
```

**Correct (Monaco loads on demand):**

```tsx
import dynamic from "next/dynamic"

const MonacoEditor = dynamic(() => import("./monaco-editor").then((m) => m.MonacoEditor), {
  ssr: false,
})

function CodePanel({ code }: { code: string }) {
  return <MonacoEditor value={code} />
}
```
