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
entryUrl: "https://github.com/zebbern/claude-code-guide/blob/64c890fe74c3ccfad673dc9c71dc85b8dd2f4817/skills/react-best-practices/rules/bundle-conditional.md"
sourceRel: "skills/react-best-practices/rules/bundle-conditional.md"
rawUrl: "/raw/09-harness/claude-code-guide-zebbern/skills/react-best-practices/rules/bundle-conditional.md"
sourceSha256: "9749abe978b5645db5dc173d080d1d61ce4e6d9f4089e2cc4a0651d111fc7471"
pageSha256: "9749abe978b5645db5dc173d080d1d61ce4e6d9f4089e2cc4a0651d111fc7471"
contentMode: "local-full"
zh: ""
---

# Claude Code Guide（zebbern）

## Conditional Module Loading

Load large data or modules only when a feature is activated.

**Example (lazy-load animation frames):**

```tsx
function AnimationPlayer({
  enabled,
  setEnabled,
}: {
  enabled: boolean
  setEnabled: React.Dispatch<React.SetStateAction<boolean>>
}) {
  const [frames, setFrames] = useState<Frame[] | null>(null)

  useEffect(() => {
    if (enabled && !frames && typeof window !== "undefined") {
      import("./animation-frames.js")
        .then((mod) => setFrames(mod.frames))
        .catch(() => setEnabled(false))
    }
  }, [enabled, frames, setEnabled])

  if (!frames) return <Skeleton />
  return <Canvas frames={frames} />
}
```

The `typeof window !== 'undefined'` check prevents bundling this module for SSR, optimizing server bundle size and build speed.
