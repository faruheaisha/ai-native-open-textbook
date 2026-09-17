---
title: "Vibe Coding：AI 编程实战课"
sourceId: "07-coding/fufan-vibe-coding-course"
sourceTitle: "Vibe Coding：AI 编程实战课"
sourceKind: "系统课程"
licenseLabel: "可转载"
lang: "中英混排"
tier: 1
volume: "07-coding"
sourceUrl: "https://github.com/fufankeji/FuFan-VibeCodingCourse"
entryUrl: "https://github.com/fufankeji/FuFan-VibeCodingCourse/blob/5336ede159a7ac2ce0ee136324fe5bffd56970ca/Stage7_Superpowers_Applied/Lesson12_Superpowers_Getting_Started/nanoclaw-v2-backend/container/agent-runner/src/mcp-tools/self-mod.instructions.md"
sourceRel: "Stage7_Superpowers_Applied/Lesson12_Superpowers_Getting_Started/nanoclaw-v2-backend/container/agent-runner/src/mcp-tools/self-mod.instructions.md"
rawUrl: "/raw/07-coding/fufan-vibe-coding-course/Stage7_Superpowers_Applied/Lesson12_Superpowers_Getting_Started/nanoclaw-v2-backend/container/agent-runner/src/mcp-tools/self-mod.instructions.md"
sourceSha256: "a3f9184ffd20b31ea8ddcc7e1f1b90ad82b96693f99aa6fa2c405f599aa82924"
pageSha256: "a3f9184ffd20b31ea8ddcc7e1f1b90ad82b96693f99aa6fa2c405f599aa82924"
contentMode: "local-full"
zh: ""
---

# Vibe Coding：AI 编程实战课

## Installing packages & tools

To install packages that persist, use the self-modification tools:

**`install_packages`** — request system (apt) or global npm packages. Requires admin approval.

Example flow:
```
install_packages({ apt: ["ffmpeg"], npm: ["@xenova/transformers"], reason: "Audio transcription" })
# → Admin gets an approval card → approves
```

**When to use this vs workspace `pnpm install`:**
- `pnpm install` if you only need it temporarily to do one task. Will not be available in subsequent truns.
- `install_packages` persists for all future turns. Use especially if the user specifically asks you to add a capability

### MCP servers (`add_mcp_server`)

Use **`add_mcp_server`** to add an MCP server to your configuration. Browse available servers at https://mcp.so — it's a curated directory of high-quality MCP servers. Most Node.js servers run via `pnpm dlx`, e.g.:

```
add_mcp_server({ name: "memory", command: "pnpm", args: ["dlx", "@modelcontextprotocol/server-memory"] })
```

Do not ask the user to give you credentials. Credentials are managed by the user in the OneCLI agent vault. Add a "placeholder" string instead of the credential, and ask the user to add the credential to the vault. You can make a test request before the secret is added and the vault proxy will respond with the local url of the vault dashboard on the user's machine and a link to a form for adding that specific credential.
