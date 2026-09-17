---
title: "Claude Code Ultimate Guide"
sourceId: "09-harness/claude-code-ultimate-guide"
sourceTitle: "Claude Code Ultimate Guide"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://github.com/FlorianBruniaux/claude-code-ultimate-guide"
entryUrl: "https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/ultimate-guide.md"
sourceRel: "guide/ultimate-guide.md"
rawUrl: "/raw/09-harness/claude-code-ultimate-guide/guide/ultimate-guide.md"
sourceSha256: "4d290b0171bbaaffd149d5d2e4da964392cb212d7357408df40d8f346f952dbc"
pageSha256: "a9806c1cf8990a5a6b1596d0aebdd9735ef5526078cdfc7c78d13bf0f0f27ca1"
contentMode: "local-full"
zh: ""
---

#### What Costs the Most?

| Action | Tokens Consumed | Estimated Cost |
|--------|-----------------|----------------|
| Read a 100-line file | ~500 | $0.0015 |
| Read 10 files (1000 lines) | ~5,000 | $0.015 |
| Long conversation (20 messages) | ~30,000 | $0.090 |
| MCP tool call (Serena, Context7) | ~2,000 | $0.006 |
| Running tests (with output) | ~3,000-10,000 | $0.009-$0.030 |
| Code generation (100 lines) | ~2,000 output | $0.030 |

**The expensive operations**:
1. **Reading entire large files** - 2000+ line files add up fast
2. **Multiple MCP server calls** - Each server adds ~2K tokens overhead
3. **Long conversations without `/compact`** - Context accumulates
4. **Repeated trial and error** - Each iteration costs
