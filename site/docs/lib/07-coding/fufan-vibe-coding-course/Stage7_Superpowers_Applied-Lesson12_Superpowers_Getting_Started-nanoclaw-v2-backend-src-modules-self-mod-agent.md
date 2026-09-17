---
title: "Self-modification"
sourceId: "07-coding/fufan-vibe-coding-course"
sourceTitle: "Vibe Coding：AI 编程实战课"
sourceKind: "系统课程"
licenseLabel: "可转载"
lang: "中英混排"
tier: 1
volume: "07-coding"
sourceUrl: "https://github.com/fufankeji/FuFan-VibeCodingCourse"
entryUrl: "https://github.com/fufankeji/FuFan-VibeCodingCourse/blob/5336ede159a7ac2ce0ee136324fe5bffd56970ca/Stage7_Superpowers_Applied/Lesson12_Superpowers_Getting_Started/nanoclaw-v2-backend/src/modules/self-mod/agent.md"
sourceRel: "Stage7_Superpowers_Applied/Lesson12_Superpowers_Getting_Started/nanoclaw-v2-backend/src/modules/self-mod/agent.md"
rawUrl: "/raw/07-coding/fufan-vibe-coding-course/Stage7_Superpowers_Applied/Lesson12_Superpowers_Getting_Started/nanoclaw-v2-backend/src/modules/self-mod/agent.md"
sourceSha256: "24effac36f740c6b5304ce7d9ad70928febac836f7cecad3015e680b2342a65b"
pageSha256: "24effac36f740c6b5304ce7d9ad70928febac836f7cecad3015e680b2342a65b"
contentMode: "local-full"
zh: ""
---

# Self-modification

You can install additional OS or npm packages or add new MCP servers — but
only with admin approval.

## Tools

- `install_packages(\{ apt?: string[], npm?: string[], reason?: string \})` —
  adds the listed packages to your container config, rebuilds the image,
  and restarts your container, all in a single admin approval step.
  Package names are validated strictly (`[a-z0-9._+-]` for apt, standard
  npm naming with optional scope). Max 20 packages per request.

- `add_mcp_server(\{ name, command, args?, env? \})` — adds a new MCP server
  to your container config and restarts the container so the new server
  is wired up on the next message. No image rebuild is required (bun runs
  TS directly).

## Flow

You call one of these tools → the host asks an admin via DM → admin approves
or rejects. On approve, the config is applied, the image is rebuilt if
needed, and the container is killed; the host respawns it on the next
message. You'll get a system chat message confirming the outcome (either
"Packages installed..." or a failure reason).

On reject you'll see "Your X request was rejected by admin."

If no admin is configured or reachable, the request fails immediately with
a chat notification explaining why.
