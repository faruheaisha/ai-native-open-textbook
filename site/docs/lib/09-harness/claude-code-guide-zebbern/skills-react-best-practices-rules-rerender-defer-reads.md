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
entryUrl: "https://github.com/zebbern/claude-code-guide/blob/64c890fe74c3ccfad673dc9c71dc85b8dd2f4817/skills/react-best-practices/rules/rerender-defer-reads.md"
sourceRel: "skills/react-best-practices/rules/rerender-defer-reads.md"
rawUrl: "/raw/09-harness/claude-code-guide-zebbern/skills/react-best-practices/rules/rerender-defer-reads.md"
sourceSha256: "f0ef4ad02ace35b1b0142318d18c470e3014bb9833fb226877cee4939e1463c1"
pageSha256: "f0ef4ad02ace35b1b0142318d18c470e3014bb9833fb226877cee4939e1463c1"
contentMode: "local-full"
zh: ""
---

# Claude Code Guide（zebbern）

## Defer State Reads to Usage Point

Don't subscribe to dynamic state (searchParams, localStorage) if you only read it inside callbacks.

**Incorrect (subscribes to all searchParams changes):**

```tsx
function ShareButton({ chatId }: { chatId: string }) {
  const searchParams = useSearchParams()

  const handleShare = () => {
    const ref = searchParams.get("ref")
    shareChat(chatId, { ref })
  }

  return <button onClick={handleShare}>Share</button>
}
```

**Correct (reads on demand, no subscription):**

```tsx
function ShareButton({ chatId }: { chatId: string }) {
  const handleShare = () => {
    const params = new URLSearchParams(window.location.search)
    const ref = params.get("ref")
    shareChat(chatId, { ref })
  }

  return <button onClick={handleShare}>Share</button>
}
```
