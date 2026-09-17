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
entryUrl: "https://github.com/zebbern/claude-code-guide/blob/64c890fe74c3ccfad673dc9c71dc85b8dd2f4817/skills/react-best-practices/rules/js-batch-dom-css.md"
sourceRel: "skills/react-best-practices/rules/js-batch-dom-css.md"
rawUrl: "/raw/09-harness/claude-code-guide-zebbern/skills/react-best-practices/rules/js-batch-dom-css.md"
sourceSha256: "ed3ce24f6a2a0e409950686a447d354cc9c6b96849ba0bd87e1bc461d33df9fe"
pageSha256: "ed3ce24f6a2a0e409950686a447d354cc9c6b96849ba0bd87e1bc461d33df9fe"
contentMode: "local-full"
zh: ""
---

# Claude Code Guide（zebbern）

## Avoid Layout Thrashing

Avoid interleaving style writes with layout reads. When you read a layout property (like `offsetWidth`, `getBoundingClientRect()`, or `getComputedStyle()`) between style changes, the browser is forced to trigger a synchronous reflow.

**This is OK (browser batches style changes):**

```typescript
function updateElementStyles(element: HTMLElement) {
  // Each line invalidates style, but browser batches the recalculation
  element.style.width = "100px"
  element.style.height = "200px"
  element.style.backgroundColor = "blue"
  element.style.border = "1px solid black"
}
```

**Incorrect (interleaved reads and writes force reflows):**

```typescript
function layoutThrashing(element: HTMLElement) {
  element.style.width = "100px"
  const width = element.offsetWidth // Forces reflow
  element.style.height = "200px"
  const height = element.offsetHeight // Forces another reflow
}
```

**Correct (batch writes, then read once):**

```typescript
function updateElementStyles(element: HTMLElement) {
  // Batch all writes together
  element.style.width = "100px"
  element.style.height = "200px"
  element.style.backgroundColor = "blue"
  element.style.border = "1px solid black"

  // Read after all writes are done (single reflow)
  const { width, height } = element.getBoundingClientRect()
}
```

**Correct (batch reads, then writes):**

```typescript
function avoidThrashing(element: HTMLElement) {
  // Read phase - all layout queries first
  const rect1 = element.getBoundingClientRect()
  const offsetWidth = element.offsetWidth
  const offsetHeight = element.offsetHeight

  // Write phase - all style changes after
  element.style.width = "100px"
  element.style.height = "200px"
}
```

**Better: use CSS classes**

```css
.highlighted-box {
  width: 100px;
  height: 200px;
  background-color: blue;
  border: 1px solid black;
}
```

```typescript
function updateElementStyles(element: HTMLElement) {
  element.classList.add("highlighted-box")

  const { width, height } = element.getBoundingClientRect()
}
```

**React example:**

```tsx
// Incorrect: interleaving style changes with layout queries
function Box({ isHighlighted }: { isHighlighted: boolean }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (ref.current && isHighlighted) {
      ref.current.style.width = "100px"
      const width = ref.current.offsetWidth // Forces layout
      ref.current.style.height = "200px"
    }
  }, [isHighlighted])

  return <div ref={ref}>Content</div>
}

// Correct: toggle class
function Box({ isHighlighted }: { isHighlighted: boolean }) {
  return <div className={isHighlighted ? "highlighted-box" : ""}>Content</div>
}
```

Prefer CSS classes over inline styles when possible. CSS files are cached by the browser, and classes provide better separation of concerns and are easier to maintain.

See [this gist](https://gist.github.com/paulirish/5d52fb081b3570c81e3a) and [CSS Triggers](https://csstriggers.com/) for more information on layout-forcing operations.
