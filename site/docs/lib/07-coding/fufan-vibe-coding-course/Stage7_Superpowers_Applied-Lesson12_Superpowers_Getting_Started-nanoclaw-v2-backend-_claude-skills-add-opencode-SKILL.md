---
title: "OpenCode agent provider"
sourceId: "07-coding/fufan-vibe-coding-course"
sourceTitle: "Vibe Coding：AI 编程实战课"
sourceKind: "系统课程"
licenseLabel: "可转载"
lang: "中英混排"
tier: 1
volume: "07-coding"
sourceUrl: "https://github.com/fufankeji/FuFan-VibeCodingCourse"
entryUrl: "https://github.com/fufankeji/FuFan-VibeCodingCourse/blob/5336ede159a7ac2ce0ee136324fe5bffd56970ca/Stage7_Superpowers_Applied/Lesson12_Superpowers_Getting_Started/nanoclaw-v2-backend/.claude/skills/add-opencode/SKILL.md"
sourceRel: "Stage7_Superpowers_Applied/Lesson12_Superpowers_Getting_Started/nanoclaw-v2-backend/.claude/skills/add-opencode/SKILL.md"
rawUrl: "/raw/07-coding/fufan-vibe-coding-course/Stage7_Superpowers_Applied/Lesson12_Superpowers_Getting_Started/nanoclaw-v2-backend/.claude/skills/add-opencode/SKILL.md"
sourceSha256: "468bdf0e7f2045d6aed0811d29fc86ceb3560162f094d28827f4ae7f11e993ad"
pageSha256: "468bdf0e7f2045d6aed0811d29fc86ceb3560162f094d28827f4ae7f11e993ad"
contentMode: "local-full"
zh: ""
---

# OpenCode agent provider

NanoClaw runs agents in a long-lived **poll loop** inside the container. The backend is selected with **`AGENT_PROVIDER`** (`claude` | `opencode` | `mock`).

Trunk ships with only the `claude` provider baked in. This skill copies the OpenCode provider files in from the `providers` branch, wires them into the host and container barrels, installs dependencies, and rebuilds the image.

## Install

### Pre-flight

If all of the following are already present, skip to **Configuration**:

- `src/providers/opencode.ts`
- `container/agent-runner/src/providers/opencode.ts`
- `import './opencode.js';` line in `src/providers/index.ts`
- `import './opencode.js';` line in `container/agent-runner/src/providers/index.ts`
- `@opencode-ai/sdk` in `container/agent-runner/package.json`
- `opencode-ai@$\{OPENCODE_VERSION\}` in the pnpm global-install block in `container/Dockerfile`

Missing pieces — continue below. All steps are idempotent; re-running is safe.

### 1. Fetch the providers branch

```bash
git fetch origin providers
```

### 2. Copy the OpenCode source files

Wholesale copies (owned entirely by this skill — user edits to these files won't survive a re-run, as designed):

```bash
git show origin/providers:src/providers/opencode.ts                                    > src/providers/opencode.ts
git show origin/providers:container/agent-runner/src/providers/opencode.ts             > container/agent-runner/src/providers/opencode.ts
git show origin/providers:container/agent-runner/src/providers/mcp-to-opencode.ts      > container/agent-runner/src/providers/mcp-to-opencode.ts
git show origin/providers:container/agent-runner/src/providers/mcp-to-opencode.test.ts > container/agent-runner/src/providers/mcp-to-opencode.test.ts
git show origin/providers:container/agent-runner/src/providers/opencode.factory.test.ts > container/agent-runner/src/providers/opencode.factory.test.ts
```

### 3. Append the self-registration imports

Each barrel gets one line appended at the end — skip if the line is already present.

`src/providers/index.ts`:

```typescript
import './opencode.js';
```

`container/agent-runner/src/providers/index.ts`:

```typescript
import './opencode.js';
```

### 4. Add the agent-runner dependency

Pinned. Bump deliberately, not with `bun update`. Use `1.4.17` — must match the `opencode-ai` CLI version pinned in step 5. The 1.14.x SDK has a completely different API and is **incompatible** with the current provider code.

```bash
cd container/agent-runner && bun add @opencode-ai/sdk@1.4.17 && cd -
```

### 5. Add `opencode-ai` to the container Dockerfile

Two edits to `container/Dockerfile`, both idempotent (skip if already present):

**(a)** In the "Pin CLI versions" ARG block (around line 18), add after `ARG VERCEL_VERSION=latest`:

```dockerfile
ARG OPENCODE_VERSION=1.4.17
```

> **Do not use `latest`** — the CLI and SDK must be the same version. `latest` silently upgrades the CLI to 1.14.x which has a breaking session API change (UUID session IDs → `ses_` prefix) incompatible with SDK 1.4.x.

**(b)** In the `pnpm install -g` block (around line 80), append `"opencode-ai@$\{OPENCODE_VERSION\}"` to the list:

```dockerfile
    pnpm install -g \
        "@anthropic-ai/claude-code@${CLAUDE_CODE_VERSION}" \
        "agent-browser@${AGENT_BROWSER_VERSION}" \
        "vercel@${VERCEL_VERSION}" \
        "opencode-ai@${OPENCODE_VERSION}"
```

### 6. Build

```bash
pnpm run build                                         # host
pnpm exec tsc -p container/agent-runner/tsconfig.json --noEmit   # container typecheck
./container/build.sh                                   # agent image
```

> **Build cache gotcha:** The container buildkit caches COPY steps aggressively. If provider files were already present in the build context before, the new files may not be picked up. If you see "Unknown provider: opencode" after the build, prune the builder and rebuild:
> ```bash
> docker builder prune -f && ./container/build.sh
> ```

### 7. Propagate to existing per-group overlays
