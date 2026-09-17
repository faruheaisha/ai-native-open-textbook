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
entryUrl: "https://github.com/zebbern/claude-code-guide/blob/64c890fe74c3ccfad673dc9c71dc85b8dd2f4817/skills/react-best-practices/rules/rendering-hydration-suppress-warning.md"
sourceRel: "skills/react-best-practices/rules/rendering-hydration-suppress-warning.md"
rawUrl: "/raw/09-harness/claude-code-guide-zebbern/skills/react-best-practices/rules/rendering-hydration-suppress-warning.md"
sourceSha256: "fb6274dc927fee28f71641ffe4395f378cbff8ef13955c8cfa43c820fc21f68b"
pageSha256: "fb6274dc927fee28f71641ffe4395f378cbff8ef13955c8cfa43c820fc21f68b"
contentMode: "local-full"
zh: ""
---

# Claude Code Guide（zebbern）

## Suppress Expected Hydration Mismatches

In SSR frameworks (e.g., Next.js), some values are intentionally different on server vs client (random IDs, dates, locale/timezone formatting). For these _expected_ mismatches, wrap the dynamic text in an element with `suppressHydrationWarning` to prevent noisy warnings. Do not use this to hide real bugs. Don’t overuse it.

**Incorrect (known mismatch warnings):**

```tsx
function Timestamp() {
  return <span>{new Date().toLocaleString()}</span>
}
```

**Correct (suppress expected mismatch only):**

```tsx
function Timestamp() {
  return <span suppressHydrationWarning>{new Date().toLocaleString()}</span>
}
```
