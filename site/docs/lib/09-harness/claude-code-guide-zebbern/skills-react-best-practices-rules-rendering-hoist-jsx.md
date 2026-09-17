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
entryUrl: "https://github.com/zebbern/claude-code-guide/blob/64c890fe74c3ccfad673dc9c71dc85b8dd2f4817/skills/react-best-practices/rules/rendering-hoist-jsx.md"
sourceRel: "skills/react-best-practices/rules/rendering-hoist-jsx.md"
rawUrl: "/raw/09-harness/claude-code-guide-zebbern/skills/react-best-practices/rules/rendering-hoist-jsx.md"
sourceSha256: "3ae4becd913830f232f9ffef8ac4f1139eea6c00285db18c18142078137037ee"
pageSha256: "3ae4becd913830f232f9ffef8ac4f1139eea6c00285db18c18142078137037ee"
contentMode: "local-full"
zh: ""
---

# Claude Code Guide（zebbern）

## Hoist Static JSX Elements

Extract static JSX outside components to avoid re-creation.

**Incorrect (recreates element every render):**

```tsx
function LoadingSkeleton() {
  return <div className="h-20 animate-pulse bg-gray-200" />
}

function Container() {
  return <div>{loading && <LoadingSkeleton />}</div>
}
```

**Correct (reuses same element):**

```tsx
const loadingSkeleton = <div className="h-20 animate-pulse bg-gray-200" />

function Container() {
  return <div>{loading && loadingSkeleton}</div>
}
```

This is especially helpful for large and static SVG nodes, which can be expensive to recreate on every render.

**Note:** If your project has [React Compiler](https://react.dev/learn/react-compiler) enabled, the compiler automatically hoists static JSX elements and optimizes component re-renders, making manual hoisting unnecessary.
