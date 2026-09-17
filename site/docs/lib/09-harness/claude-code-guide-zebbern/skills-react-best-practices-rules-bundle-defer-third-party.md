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
entryUrl: "https://github.com/zebbern/claude-code-guide/blob/64c890fe74c3ccfad673dc9c71dc85b8dd2f4817/skills/react-best-practices/rules/bundle-defer-third-party.md"
sourceRel: "skills/react-best-practices/rules/bundle-defer-third-party.md"
rawUrl: "/raw/09-harness/claude-code-guide-zebbern/skills/react-best-practices/rules/bundle-defer-third-party.md"
sourceSha256: "8b6c374e82fd686ffe63c4101a83b588137753f426d3812ad59cf6c6e3e079e2"
pageSha256: "8b6c374e82fd686ffe63c4101a83b588137753f426d3812ad59cf6c6e3e079e2"
contentMode: "local-full"
zh: ""
---

# Claude Code Guide（zebbern）

## Defer Non-Critical Third-Party Libraries

Analytics, logging, and error tracking don't block user interaction. Load them after hydration.

**Incorrect (blocks initial bundle):**

```tsx
import { Analytics } from "@vercel/analytics/react"

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
      </body>
    </html>
  )
}
```

**Correct (loads after hydration):**

```tsx
import dynamic from "next/dynamic"

const Analytics = dynamic(() => import("@vercel/analytics/react").then((m) => m.Analytics), {
  ssr: false,
})

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
      </body>
    </html>
  )
}
```
