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
entryUrl: "https://github.com/zebbern/claude-code-guide/blob/64c890fe74c3ccfad673dc9c71dc85b8dd2f4817/skills/react-best-practices/rules/async-dependencies.md"
sourceRel: "skills/react-best-practices/rules/async-dependencies.md"
rawUrl: "/raw/09-harness/claude-code-guide-zebbern/skills/react-best-practices/rules/async-dependencies.md"
sourceSha256: "b79d159580b359a0a0ff17374b96a06fa1797d241a3e0ca26d5084f85b67d800"
pageSha256: "b79d159580b359a0a0ff17374b96a06fa1797d241a3e0ca26d5084f85b67d800"
contentMode: "local-full"
zh: ""
---

# Claude Code Guide（zebbern）

## Dependency-Based Parallelization

For operations with partial dependencies, use `better-all` to maximize parallelism. It automatically starts each task at the earliest possible moment.

**Incorrect (profile waits for config unnecessarily):**

```typescript
const [user, config] = await Promise.all([fetchUser(), fetchConfig()])
const profile = await fetchProfile(user.id)
```

**Correct (config and profile run in parallel):**

```typescript
import { all } from "better-all"

const { user, config, profile } = await all({
  async user() {
    return fetchUser()
  },
  async config() {
    return fetchConfig()
  },
  async profile() {
    return fetchProfile((await this.$.user).id)
  },
})
```

**Alternative without extra dependencies:**

We can also create all the promises first, and do `Promise.all()` at the end.

```typescript
const userPromise = fetchUser()
const profilePromise = userPromise.then((user) => fetchProfile(user.id))

const [user, config, profile] = await Promise.all([userPromise, fetchConfig(), profilePromise])
```

Reference: [https://github.com/shuding/better-all](https://github.com/shuding/better-all)
