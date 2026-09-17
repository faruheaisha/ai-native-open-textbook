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
entryUrl: "https://github.com/zebbern/claude-code-guide/blob/64c890fe74c3ccfad673dc9c71dc85b8dd2f4817/skills/react-best-practices/rules/rerender-derived-state.md"
sourceRel: "skills/react-best-practices/rules/rerender-derived-state.md"
rawUrl: "/raw/09-harness/claude-code-guide-zebbern/skills/react-best-practices/rules/rerender-derived-state.md"
sourceSha256: "51c54ee7b2014c1f0479618a9d805568705bb72ac750ab7396d5afd518a7ae78"
pageSha256: "51c54ee7b2014c1f0479618a9d805568705bb72ac750ab7396d5afd518a7ae78"
contentMode: "local-full"
zh: ""
---

# Claude Code Guide（zebbern）

## Subscribe to Derived State

Subscribe to derived boolean state instead of continuous values to reduce re-render frequency.

**Incorrect (re-renders on every pixel change):**

```tsx
function Sidebar() {
  const width = useWindowWidth() // updates continuously
  const isMobile = width < 768
  return <nav className={isMobile ? "mobile" : "desktop"} />
}
```

**Correct (re-renders only when boolean changes):**

```tsx
function Sidebar() {
  const isMobile = useMediaQuery("(max-width: 767px)")
  return <nav className={isMobile ? "mobile" : "desktop"} />
}
```
