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
entryUrl: "https://github.com/zebbern/claude-code-guide/blob/64c890fe74c3ccfad673dc9c71dc85b8dd2f4817/skills/composition-patterns/rules/patterns-explicit-variants.md"
sourceRel: "skills/composition-patterns/rules/patterns-explicit-variants.md"
rawUrl: "/raw/09-harness/claude-code-guide-zebbern/skills/composition-patterns/rules/patterns-explicit-variants.md"
sourceSha256: "2f975d960e6a17a0478cf6d53c4089eb5942e28e8c38f9ac9f544fee11284cf4"
pageSha256: "2f975d960e6a17a0478cf6d53c4089eb5942e28e8c38f9ac9f544fee11284cf4"
contentMode: "local-full"
zh: ""
---

# Claude Code Guide（zebbern）

## Create Explicit Component Variants

Instead of one component with many boolean props, create explicit variant
components. Each variant composes the pieces it needs. The code documents
itself.

**Incorrect (one component, many modes):**

```tsx
// What does this component actually render?
```

**Correct (explicit variants):**

```tsx
// Immediately clear what this renders

// Or

// Or
```

Each implementation is unique, explicit and self-contained. Yet they can each
use shared parts.

**Implementation:**

```tsx
function ThreadComposer({ channelId }: { channelId: string }) {
  return (
      <Composer.Frame>
        <Composer.Input />
        <Composer.Footer>
          <Composer.Formatting />
          <Composer.Emojis />
          <Composer.Submit />
        </Composer.Footer>
      </Composer.Frame>
  )
}

function EditMessageComposer({ messageId }: { messageId: string }) {
  return (
      <Composer.Frame>
        <Composer.Input />
        <Composer.Footer>
          <Composer.Formatting />
          <Composer.Emojis />
          <Composer.CancelEdit />
          <Composer.SaveEdit />
        </Composer.Footer>
      </Composer.Frame>
  )
}

function ForwardMessageComposer({ messageId }: { messageId: string }) {
  return (
      <Composer.Frame>
        <Composer.Input placeholder="Add a message, if you'd like." />
        <Composer.Footer>
          <Composer.Formatting />
          <Composer.Emojis />
          <Composer.Mentions />
        </Composer.Footer>
      </Composer.Frame>
  )
}
```

Each variant is explicit about:

- What provider/state it uses
- What UI elements it includes
- What actions are available

No boolean prop combinations to reason about. No impossible states.
