---
title: "Middleware & Handler Patterns"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/microsoft-365-agents-toolkit/skills/teams-app-developer/docs/middleware-and-handlers.md"
sourceRel: ".github/plugins/microsoft-365-agents-toolkit/skills/teams-app-developer/docs/middleware-and-handlers.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/microsoft-365-agents-toolkit/skills/teams-app-developer/docs/middleware-and-handlers.md"
sourceSha256: "f7c6de3003620f7effb7b1cf6123ae9631354b517fc6ed0ad1b498bdc3561355"
pageSha256: "f7c6de3003620f7effb7b1cf6123ae9631354b517fc6ed0ad1b498bdc3561355"
contentMode: "local-full"
zh: ""
---

# Middleware & Handler Patterns

## Middleware

| Aspect | Slack (Bolt) | Teams SDK v2 |
|---|---|---|
| Global middleware | `app.use(async (\{ next \}) => \{ ... await next(); \})` | `app.use(async (ctx) => \{ ... ctx.next(); \})` |
| Chaining | Explicit `await next()` — omitting drops the event silently | Explicit `ctx.next()` — omitting stops the pipeline |
| Listener middleware | Passed as extra args to `app.message(filter, middleware, handler)` | No equivalent — use guard functions at handler start |
| Authorization | Custom middleware checking Slack user/workspace | Bot Framework JWT validation is automatic |

**Rating:** GREEN — both have middleware, but Slack's is more granular.

### Key Difference

Slack supports **listener middleware** — functions that run only for specific handlers. Teams has no equivalent. Convert listener middleware to guard conditions at the top of each handler:

```typescript
// Slack: listener middleware
app.message(isAdmin, async ({ say }) => { await say("Admin action"); });

// Teams: guard function
app.on("message", async (ctx) => {
  if (!isAdmin(ctx.activity.from.id)) return;
  await ctx.send("Admin action");
});
```
