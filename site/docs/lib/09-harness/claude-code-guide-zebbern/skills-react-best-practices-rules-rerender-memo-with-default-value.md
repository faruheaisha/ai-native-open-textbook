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
entryUrl: "https://github.com/zebbern/claude-code-guide/blob/64c890fe74c3ccfad673dc9c71dc85b8dd2f4817/skills/react-best-practices/rules/rerender-memo-with-default-value.md"
sourceRel: "skills/react-best-practices/rules/rerender-memo-with-default-value.md"
rawUrl: "/raw/09-harness/claude-code-guide-zebbern/skills/react-best-practices/rules/rerender-memo-with-default-value.md"
sourceSha256: "97044a6c30973672df6be20cbcd7e1e3582ca7550a46b661021c3ade93759354"
pageSha256: "97044a6c30973672df6be20cbcd7e1e3582ca7550a46b661021c3ade93759354"
contentMode: "local-full"
zh: ""
---

# Claude Code Guide（zebbern）

## Extract Default Non-primitive Parameter Value from Memoized Component to Constant

When memoized component has a default value for some non-primitive optional parameter, such as an array, function, or object, calling the component without that parameter results in broken memoization. This is because new value instances are created on every rerender, and they do not pass strict equality comparison in `memo()`.

To address this issue, extract the default value into a constant.

**Incorrect (`onClick` has different values on every rerender):**

```tsx
const UserAvatar = memo(function UserAvatar({ onClick = () => {} }: { onClick?: () => void }) {
  // ...
})

// Used without optional onClick
```

**Correct (stable default value):**

```tsx
const NOOP = () => {};

const UserAvatar = memo(function UserAvatar({ onClick = NOOP }: { onClick?: () => void }) {
  // ...
})

// Used without optional onClick
```
