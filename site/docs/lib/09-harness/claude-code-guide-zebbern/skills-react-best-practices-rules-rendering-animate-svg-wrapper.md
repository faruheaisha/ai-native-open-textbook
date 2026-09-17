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
entryUrl: "https://github.com/zebbern/claude-code-guide/blob/64c890fe74c3ccfad673dc9c71dc85b8dd2f4817/skills/react-best-practices/rules/rendering-animate-svg-wrapper.md"
sourceRel: "skills/react-best-practices/rules/rendering-animate-svg-wrapper.md"
rawUrl: "/raw/09-harness/claude-code-guide-zebbern/skills/react-best-practices/rules/rendering-animate-svg-wrapper.md"
sourceSha256: "428b9dc83be365585093ab3b8dbc6689b4b3d6b65ac76f6aacc8f6c9432656c8"
pageSha256: "428b9dc83be365585093ab3b8dbc6689b4b3d6b65ac76f6aacc8f6c9432656c8"
contentMode: "local-full"
zh: ""
---

# Claude Code Guide（zebbern）

## Animate SVG Wrapper Instead of SVG Element

Many browsers don't have hardware acceleration for CSS3 animations on SVG elements. Wrap SVG in a `` and animate the wrapper instead.

**Incorrect (animating SVG directly - no hardware acceleration):**

```tsx
function LoadingSpinner() {
  return (
    <svg className="animate-spin" width="24" height="24" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="10" stroke="currentColor" />
    </svg>
  )
}
```

**Correct (animating wrapper div - hardware accelerated):**

```tsx
function LoadingSpinner() {
  return (
    <div className="animate-spin">
      <svg width="24" height="24" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10" stroke="currentColor" />
      </svg>
    </div>
  )
}
```

This applies to all CSS transforms and transitions (`transform`, `opacity`, `translate`, `scale`, `rotate`). The wrapper div allows browsers to use GPU acceleration for smoother animations.
