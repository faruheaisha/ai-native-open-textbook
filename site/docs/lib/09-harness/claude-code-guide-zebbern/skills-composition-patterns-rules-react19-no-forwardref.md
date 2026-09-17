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
entryUrl: "https://github.com/zebbern/claude-code-guide/blob/64c890fe74c3ccfad673dc9c71dc85b8dd2f4817/skills/composition-patterns/rules/react19-no-forwardref.md"
sourceRel: "skills/composition-patterns/rules/react19-no-forwardref.md"
rawUrl: "/raw/09-harness/claude-code-guide-zebbern/skills/composition-patterns/rules/react19-no-forwardref.md"
sourceSha256: "881830adb7534c4b2d70db426556646ad9837f5478f744f35641f635ada22227"
pageSha256: "881830adb7534c4b2d70db426556646ad9837f5478f744f35641f635ada22227"
contentMode: "local-full"
zh: ""
---

# Claude Code Guide（zebbern）

## React 19 API Changes

> **⚠️ React 19+ only.** Skip this if you're on React 18 or earlier.

In React 19, `ref` is now a regular prop (no `forwardRef` wrapper needed), and `use()` replaces `useContext()`.

**Incorrect (forwardRef in React 19):**

```tsx
const ComposerInput = forwardRef<TextInput, Props>((props, ref) => {
  return <TextInput ref={ref} {...props} />
})
```

**Correct (ref as a regular prop):**

```tsx
function ComposerInput({ ref, ...props }: Props & { ref?: React.Ref<TextInput> }) {
  return <TextInput ref={ref} {...props} />
}
```

**Incorrect (useContext in React 19):**

```tsx
const value = useContext(MyContext)
```

**Correct (use instead of useContext):**

```tsx
const value = use(MyContext)
```

`use()` can also be called conditionally, unlike `useContext()`.
