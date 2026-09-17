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
entryUrl: "https://github.com/zebbern/claude-code-guide/blob/64c890fe74c3ccfad673dc9c71dc85b8dd2f4817/skills/react-best-practices/rules/rendering-content-visibility.md"
sourceRel: "skills/react-best-practices/rules/rendering-content-visibility.md"
rawUrl: "/raw/09-harness/claude-code-guide-zebbern/skills/react-best-practices/rules/rendering-content-visibility.md"
sourceSha256: "6be3e7d55f6f6f25afcd6eca7bac7023b3f4df72fb39569c9575b9c8219c4362"
pageSha256: "6be3e7d55f6f6f25afcd6eca7bac7023b3f4df72fb39569c9575b9c8219c4362"
contentMode: "local-full"
zh: ""
---

# Claude Code Guide（zebbern）

## CSS content-visibility for Long Lists

Apply `content-visibility: auto` to defer off-screen rendering.

**CSS:**

```css
.message-item {
  content-visibility: auto;
  contain-intrinsic-size: 0 80px;
}
```

**Example:**

```tsx
function MessageList({ messages }: { messages: Message[] }) {
  return (
    <div className="h-screen overflow-y-auto">
      {messages.map((msg) => (
        <div key={msg.id} className="message-item">
          <div>{msg.content}</div>
        </div>
      ))}
    </div>
  )
}
```

For 1000 messages, browser skips layout/paint for ~990 off-screen items (10× faster initial render).
