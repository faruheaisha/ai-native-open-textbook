---
title: "AI Assistance Disclosure (CONTRIBUTING.md Template)"
sourceId: "09-harness/claude-code-ultimate-guide"
sourceTitle: "Claude Code Ultimate Guide"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://github.com/FlorianBruniaux/claude-code-ultimate-guide"
entryUrl: "https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/examples/config/CONTRIBUTING-ai-disclosure.md"
sourceRel: "examples/config/CONTRIBUTING-ai-disclosure.md"
rawUrl: "/raw/09-harness/claude-code-ultimate-guide/examples/config/CONTRIBUTING-ai-disclosure.md"
sourceSha256: "7f383ab7a483777c2e519441534d2058b28785a500a52ac4eb304fc019cd2630"
pageSha256: "7f383ab7a483777c2e519441534d2058b28785a500a52ac4eb304fc019cd2630"
contentMode: "local-full"
zh: ""
---

# AI Assistance Disclosure (CONTRIBUTING.md Template)

> Copy this section into your project's CONTRIBUTING.md

---

## AI Assistance Disclosure

If you use any AI tools to help with your contribution, please disclose this
in your pull request description.

### What to Disclose

| AI Usage | Example Disclosure |
|----------|-------------------|
| **AI-generated code** | "This PR was written primarily by Claude Code" |
| **AI-assisted research** | "I consulted ChatGPT to understand the codebase" |
| **AI-suggested approach** | "Copilot suggested the algorithm structure" |
| **AI-drafted docs** | "Documentation was drafted with Claude assistance" |

### What Doesn't Need Disclosure

- Trivial autocomplete (single keywords, short phrases)
- IDE syntax helpers (formatting, auto-imports)
- Grammar/spell checking
- Code formatting tools (prettier, black)

### Why We Ask

AI-generated code often requires more careful review:

- May use patterns unfamiliar to the codebase
- Could introduce subtle bugs humans wouldn't make
- Might miss project-specific conventions
- Sometimes "looks right" but has logical issues

Disclosure helps maintainers:
- Allocate review time appropriately
- Know where to look more carefully
- Provide better feedback on AI usage

This is a **courtesy to reviewers**, not a judgment on AI use.

### Suggested Disclosure Format

In your PR description:

```markdown
## AI Assistance

This PR was developed with assistance from [Tool Name].
Specifically:
- [What AI helped with]
- [What you did manually]

All code has been reviewed and understood by the author.
```

---

## Attribution

Based on policies from:
- [Ghostty](https://github.com/ghostty-org/ghostty/blob/main/CONTRIBUTING.md)
- [LLVM](https://llvm.org/docs/DeveloperPolicy.html)
- [Fedora](https://docs.fedoraproject.org/en-US/project/ai-policy/)

For more context, see [AI Traceability Guide](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/main/guide/ops/ai-traceability.md).
