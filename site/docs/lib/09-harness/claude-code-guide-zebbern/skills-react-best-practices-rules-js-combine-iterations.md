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
entryUrl: "https://github.com/zebbern/claude-code-guide/blob/64c890fe74c3ccfad673dc9c71dc85b8dd2f4817/skills/react-best-practices/rules/js-combine-iterations.md"
sourceRel: "skills/react-best-practices/rules/js-combine-iterations.md"
rawUrl: "/raw/09-harness/claude-code-guide-zebbern/skills/react-best-practices/rules/js-combine-iterations.md"
sourceSha256: "b3ab8de503670c89d448c40c9587ce2d4a422c91279b337d163048e9a5afdd4b"
pageSha256: "b3ab8de503670c89d448c40c9587ce2d4a422c91279b337d163048e9a5afdd4b"
contentMode: "local-full"
zh: ""
---

# Claude Code Guide（zebbern）

## Combine Multiple Array Iterations

Multiple `.filter()` or `.map()` calls iterate the array multiple times. Combine into one loop.

**Incorrect (3 iterations):**

```typescript
const admins = users.filter((u) => u.isAdmin)
const testers = users.filter((u) => u.isTester)
const inactive = users.filter((u) => !u.isActive)
```

**Correct (1 iteration):**

```typescript
const admins: User[] = []
const testers: User[] = []
const inactive: User[] = []

for (const user of users) {
  if (user.isAdmin) admins.push(user)
  if (user.isTester) testers.push(user)
  if (!user.isActive) inactive.push(user)
}
```
