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
entryUrl: "https://github.com/zebbern/claude-code-guide/blob/64c890fe74c3ccfad673dc9c71dc85b8dd2f4817/skills/react-best-practices/rules/rerender-move-effect-to-event.md"
sourceRel: "skills/react-best-practices/rules/rerender-move-effect-to-event.md"
rawUrl: "/raw/09-harness/claude-code-guide-zebbern/skills/react-best-practices/rules/rerender-move-effect-to-event.md"
sourceSha256: "0682c7b340dfa0cad098ec0c9db58728fac9f19f60825ab21d381e0fb9b303df"
pageSha256: "0682c7b340dfa0cad098ec0c9db58728fac9f19f60825ab21d381e0fb9b303df"
contentMode: "local-full"
zh: ""
---

# Claude Code Guide（zebbern）

## Put Interaction Logic in Event Handlers

If a side effect is triggered by a specific user action (submit, click, drag), run it in that event handler. Do not model the action as state + effect; it makes effects re-run on unrelated changes and can duplicate the action.

**Incorrect (event modeled as state + effect):**

```tsx
function Form() {
  const [submitted, setSubmitted] = useState(false)
  const theme = useContext(ThemeContext)

  useEffect(() => {
    if (submitted) {
      post("/api/register")
      showToast("Registered", theme)
    }
  }, [submitted, theme])

  return <button onClick={() => setSubmitted(true)}>Submit</button>
}
```

**Correct (do it in the handler):**

```tsx
function Form() {
  const theme = useContext(ThemeContext)

  function handleSubmit() {
    post("/api/register")
    showToast("Registered", theme)
  }

  return <button onClick={handleSubmit}>Submit</button>
}
```

Reference: [Should this code move to an event handler?](https://react.dev/learn/removing-effect-dependencies#should-this-code-move-to-an-event-handler)
