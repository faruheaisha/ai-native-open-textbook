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
entryUrl: "https://github.com/zebbern/claude-code-guide/blob/64c890fe74c3ccfad673dc9c71dc85b8dd2f4817/skills/react-best-practices/rules/rerender-use-ref-transient-values.md"
sourceRel: "skills/react-best-practices/rules/rerender-use-ref-transient-values.md"
rawUrl: "/raw/09-harness/claude-code-guide-zebbern/skills/react-best-practices/rules/rerender-use-ref-transient-values.md"
sourceSha256: "81a836b55f914f1fbf396575cb147a9c4a0da7e0dfa8baa88398274bb07ef2d0"
pageSha256: "81a836b55f914f1fbf396575cb147a9c4a0da7e0dfa8baa88398274bb07ef2d0"
contentMode: "local-full"
zh: ""
---

# Claude Code Guide（zebbern）

## Use useRef for Transient Values

When a value changes frequently and you don't want a re-render on every update (e.g., mouse trackers, intervals, transient flags), store it in `useRef` instead of `useState`. Keep component state for UI; use refs for temporary DOM-adjacent values. Updating a ref does not trigger a re-render.

**Incorrect (renders every update):**

```tsx
function Tracker() {
  const [lastX, setLastX] = useState(0)

  useEffect(() => {
    const onMove = (e: MouseEvent) => setLastX(e.clientX)
    window.addEventListener("mousemove", onMove)
    return () => window.removeEventListener("mousemove", onMove)
  }, [])

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: lastX,
        width: 8,
        height: 8,
        background: "black",
      }}
    />
  )
}
```

**Correct (no re-render for tracking):**

```tsx
function Tracker() {
  const lastXRef = useRef(0)
  const dotRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      lastXRef.current = e.clientX
      const node = dotRef.current
      if (node) {
        node.style.transform = `translateX(${e.clientX}px)`
      }
    }
    window.addEventListener("mousemove", onMove)
    return () => window.removeEventListener("mousemove", onMove)
  }, [])

  return (
    <div
      ref={dotRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: 8,
        height: 8,
        background: "black",
        transform: "translateX(0px)",
      }}
    />
  )
}
```
