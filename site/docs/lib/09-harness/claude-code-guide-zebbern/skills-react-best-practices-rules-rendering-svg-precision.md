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
entryUrl: "https://github.com/zebbern/claude-code-guide/blob/64c890fe74c3ccfad673dc9c71dc85b8dd2f4817/skills/react-best-practices/rules/rendering-svg-precision.md"
sourceRel: "skills/react-best-practices/rules/rendering-svg-precision.md"
rawUrl: "/raw/09-harness/claude-code-guide-zebbern/skills/react-best-practices/rules/rendering-svg-precision.md"
sourceSha256: "ed468533f6e95f622859c884b122cf21f9f593ed6bb3d500a54de4b9f9bcb9fb"
pageSha256: "ed468533f6e95f622859c884b122cf21f9f593ed6bb3d500a54de4b9f9bcb9fb"
contentMode: "local-full"
zh: ""
---

# Claude Code Guide（zebbern）

## Optimize SVG Precision

Reduce SVG coordinate precision to decrease file size. The optimal precision depends on the viewBox size, but in general reducing precision should be considered.

**Incorrect (excessive precision):**

```svg
<path d="M 10.293847 20.847362 L 30.938472 40.192837" />
```

**Correct (1 decimal place):**

```svg
<path d="M 10.3 20.8 L 30.9 40.2" />
```

**Automate with SVGO:**

```bash
npx svgo --precision=1 --multipass icon.svg
```
