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
pageSha256: "f97d58bd1fc5e93e3ce39763d8bb791cec4693fc35c049caa525b146d0f97ba9"
contentMode: "local-full"
zh: ""
---

#### Common Patterns

| Need | Solution | Example |
|------|----------|---------|
| Run tests before commit | Skill (user-invocable) | `/commit` with test step |
| Security review knowledge | Skill + Agent | security-guardian skill → security-audit agent |
| Parallel code review | Multiple scope-focused agents | Launch 3 review agents with isolated scopes |
| Quick git workflow | Skill (user-invocable) | `/pr`, `/ship` |
| Architecture knowledge | Skill (model-invocable) | architecture-patterns skill |
| Complex debugging | Agent | debugging-specialist agent |
