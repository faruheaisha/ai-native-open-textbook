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
entryUrl: "https://github.com/zebbern/claude-code-guide/blob/64c890fe74c3ccfad673dc9c71dc85b8dd2f4817/skills/react-best-practices/rules/rerender-derived-state-no-effect.md"
sourceRel: "skills/react-best-practices/rules/rerender-derived-state-no-effect.md"
rawUrl: "/raw/09-harness/claude-code-guide-zebbern/skills/react-best-practices/rules/rerender-derived-state-no-effect.md"
sourceSha256: "ec5aaac550052119ac5690346b29d01e441139a47ffb6f1026c44b22a6d4893e"
pageSha256: "ec5aaac550052119ac5690346b29d01e441139a47ffb6f1026c44b22a6d4893e"
contentMode: "local-full"
zh: ""
---

# Claude Code Guide（zebbern）

## Calculate Derived State During Rendering

If a value can be computed from current props/state, do not store it in state or update it in an effect. Derive it during render to avoid extra renders and state drift. Do not set state in effects solely in response to prop changes; prefer derived values or keyed resets instead.

**Incorrect (redundant state and effect):**

```tsx
function Form() {
  const [firstName, setFirstName] = useState("First")
  const [lastName, setLastName] = useState("Last")
  const [fullName, setFullName] = useState("")

  useEffect(() => {
    setFullName(firstName + " " + lastName)
  }, [firstName, lastName])

  return <p>{fullName}</p>
}
```

**Correct (derive during render):**

```tsx
function Form() {
  const [firstName, setFirstName] = useState("First")
  const [lastName, setLastName] = useState("Last")
  const fullName = firstName + " " + lastName

  return <p>{fullName}</p>
}
```

References: [You Might Not Need an Effect](https://react.dev/learn/you-might-not-need-an-effect)
