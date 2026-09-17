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
entryUrl: "https://github.com/zebbern/claude-code-guide/blob/64c890fe74c3ccfad673dc9c71dc85b8dd2f4817/skills/react-best-practices/rules/rerender-simple-expression-in-memo.md"
sourceRel: "skills/react-best-practices/rules/rerender-simple-expression-in-memo.md"
rawUrl: "/raw/09-harness/claude-code-guide-zebbern/skills/react-best-practices/rules/rerender-simple-expression-in-memo.md"
sourceSha256: "5bdcf2d1558ba5204e643c887b7b4060f89630969425651eb68e96427d97f800"
pageSha256: "5bdcf2d1558ba5204e643c887b7b4060f89630969425651eb68e96427d97f800"
contentMode: "local-full"
zh: ""
---

# Claude Code Guide（zebbern）

## Do not wrap a simple expression with a primitive result type in useMemo

When an expression is simple (few logical or arithmetical operators) and has a primitive result type (boolean, number, string), do not wrap it in `useMemo`.
Calling `useMemo` and comparing hook dependencies may consume more resources than the expression itself.

**Incorrect:**

```tsx
function Header({ user, notifications }: Props) {
  const isLoading = useMemo(() => {
    return user.isLoading || notifications.isLoading
  }, [user.isLoading, notifications.isLoading])

  if (isLoading) return <Skeleton />
  // return some markup
}
```

**Correct:**

```tsx
function Header({ user, notifications }: Props) {
  const isLoading = user.isLoading || notifications.isLoading

  if (isLoading) return <Skeleton />
  // return some markup
}
```
