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
pageSha256: "2dfc1b1fffa9fb5643121a2413373b787d7c72482372f8c53a0107b73d22a615"
contentMode: "local-full"
zh: ""
---

#### When to Use

| Situation | Use |
|-----------|-----|
| Context 70-90%, staying interactive | `/compact` |
| Context 90%+, need fresh start | `/clear` then continue |
| Long autonomous run, task-based | Fresh Context Pattern |
| Overnight/AFK execution | Fresh Context Pattern |

**Good fit**:
- Autonomous sessions >1 hour
- Migrations, large refactorings
- Tasks with clear success criteria (tests pass, build succeeds)

**Poor fit**:
- Interactive exploration
- Design without clear spec
- Tasks with slow/ambiguous feedback loops

**Variant: Session-per-Concern Pipeline**

Instead of looping the same task, dedicate a fresh session to each quality dimension:

1. **Plan session**: Architecture, scope, acceptance criteria
2. **Test session**: Write unit, integration, and E2E tests first (TDD)
3. **Implement session**: Code until all linters and tests pass
4. **Review sessions**: Separate sessions for security audit, performance, code review
5. **Repeat**: Iterate with scope adjustments as needed

This combines Fresh Context (clean 200K per phase) with [OpusPlan](#62-opusplan-hybrid-mode) (Opus for review/strategy sessions, Sonnet for implementation). Each session generates progress artifacts that feed the next.
