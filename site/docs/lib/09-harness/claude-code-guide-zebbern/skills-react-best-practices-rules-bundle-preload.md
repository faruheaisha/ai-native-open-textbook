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
entryUrl: "https://github.com/zebbern/claude-code-guide/blob/64c890fe74c3ccfad673dc9c71dc85b8dd2f4817/skills/react-best-practices/rules/bundle-preload.md"
sourceRel: "skills/react-best-practices/rules/bundle-preload.md"
rawUrl: "/raw/09-harness/claude-code-guide-zebbern/skills/react-best-practices/rules/bundle-preload.md"
sourceSha256: "a4309bcb2fdfc3306612d61a1f42e31dfa79ed746702b6a46112a59ef7a041e5"
pageSha256: "a4309bcb2fdfc3306612d61a1f42e31dfa79ed746702b6a46112a59ef7a041e5"
contentMode: "local-full"
zh: ""
---

# Claude Code Guide（zebbern）

## Preload Based on User Intent

Preload heavy bundles before they're needed to reduce perceived latency.

**Example (preload on hover/focus):**

```tsx
function EditorButton({ onClick }: { onClick: () => void }) {
  const preload = () => {
    if (typeof window !== "undefined") {
      void import("./monaco-editor")
    }
  }

  return (
    <button onMouseEnter={preload} onFocus={preload} onClick={onClick}>
      Open Editor
    </button>
  )
}
```

**Example (preload when feature flag is enabled):**

```tsx
function FlagsProvider({ children, flags }: Props) {
  useEffect(() => {
    if (flags.editorEnabled && typeof window !== "undefined") {
      void import("./monaco-editor").then((mod) => mod.init())
    }
  }, [flags.editorEnabled])

  return <FlagsContext.Provider value={flags}>{children}</FlagsContext.Provider>
}
```

The `typeof window !== 'undefined'` check prevents bundling preloaded modules for SSR, optimizing server bundle size and build speed.
