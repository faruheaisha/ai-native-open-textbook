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
entryUrl: "https://github.com/zebbern/claude-code-guide/blob/64c890fe74c3ccfad673dc9c71dc85b8dd2f4817/skills/react-best-practices/rules/client-passive-event-listeners.md"
sourceRel: "skills/react-best-practices/rules/client-passive-event-listeners.md"
rawUrl: "/raw/09-harness/claude-code-guide-zebbern/skills/react-best-practices/rules/client-passive-event-listeners.md"
sourceSha256: "330bd95d9d7c55926ce760c0a34c477aa86ab3cb9d3ba69eab24d6601628f34b"
pageSha256: "330bd95d9d7c55926ce760c0a34c477aa86ab3cb9d3ba69eab24d6601628f34b"
contentMode: "local-full"
zh: ""
---

# Claude Code Guide（zebbern）

## Use Passive Event Listeners for Scrolling Performance

Add `\{ passive: true \}` to touch and wheel event listeners to enable immediate scrolling. Browsers normally wait for listeners to finish to check if `preventDefault()` is called, causing scroll delay.

**Incorrect:**

```typescript
useEffect(() => {
  const handleTouch = (e: TouchEvent) => console.log(e.touches[0].clientX)
  const handleWheel = (e: WheelEvent) => console.log(e.deltaY)

  document.addEventListener("touchstart", handleTouch)
  document.addEventListener("wheel", handleWheel)

  return () => {
    document.removeEventListener("touchstart", handleTouch)
    document.removeEventListener("wheel", handleWheel)
  }
}, [])
```

**Correct:**

```typescript
useEffect(() => {
  const handleTouch = (e: TouchEvent) => console.log(e.touches[0].clientX)
  const handleWheel = (e: WheelEvent) => console.log(e.deltaY)

  document.addEventListener("touchstart", handleTouch, { passive: true })
  document.addEventListener("wheel", handleWheel, { passive: true })

  return () => {
    document.removeEventListener("touchstart", handleTouch)
    document.removeEventListener("wheel", handleWheel)
  }
}, [])
```

**Use passive when:** tracking/analytics, logging, any listener that doesn't call `preventDefault()`.

**Don't use passive when:** implementing custom swipe gestures, custom zoom controls, or any listener that needs `preventDefault()`.
