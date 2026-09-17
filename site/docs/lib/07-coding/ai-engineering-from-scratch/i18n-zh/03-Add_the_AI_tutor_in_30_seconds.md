---
title: "AI Engineering from Scratch（英文原版）"
sourceId: "07-coding/ai-engineering-from-scratch"
sourceTitle: "AI Engineering from Scratch（英文原版）"
sourceKind: "源码研读"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "07-coding"
sourceUrl: "https://github.com/rohitg00/ai-engineering-from-scratch"
entryUrl: "https://github.com/rohitg00/ai-engineering-from-scratch/blob/d18b8fe5a913c46011a3b06cb6ebd6a924414fd3/i18n/zh/README.md"
sourceRel: "i18n/zh/README.md"
rawUrl: "/raw/07-coding/ai-engineering-from-scratch/i18n/zh/README.md"
sourceSha256: "7717abf429b9210b48b76ae2cd506e6606e36d5f758edc0e802b40302c2fce27"
pageSha256: "2d561e82561658c71af7e5301cf7cb1da54044e3e017e02449570ceda6cd1f69"
contentMode: "local-full"
zh: ""
---

## Add the AI tutor in 30 seconds

If Node.js, `npx`, and a skill-capable coding agent are already installed,
your coding agent can become your tutor in two commands. A repository clone is
not needed to install or read the tutor. Runnable focused-path labs need
`python3`. Agent Skills host labs also need a selected host and a writable
user or project skill scope.

Check the local requirements first:

```bash
node --version
npx --version
python3 --version
```

Then install the curriculum skills and choose the host and scope you intend to
use when the installer asks:

```bash
npx skills add rohitg00/ai-engineering-from-scratch
```

Invocation syntax belongs to the host, not to the portable `SKILL.md` format:

| Host | Start the course | Start Model Context Protocol (MCP) | Start Agent Skills | Run a phase quiz |
|---|---|---|---|---|
| Codex | `start-learning`, or choose it from `/skills` | `learn-mcp`, or choose it from `/skills` | `learn-agent-skills`, or choose it from `/skills` | `check-understanding 13`, or choose it from `/skills` |
| Claude Code | `/start-learning` | `/learn-mcp` | `/learn-agent-skills` | `/check-understanding 13` |
| Other compatible hosts | `Use start-learning to begin the course.` | `Use learn-mcp to start the Model Context Protocol (MCP) path.` | `Use learn-agent-skills to start the Agent Skills Engineering path.` | `Use check-understanding to quiz me on Phase 13.` |

A ten-question placement quiz maps what you already know to a starting phase and
saves a personalized study plan to `LEARNING.md`. From there, the `learn` skill
teaches one lesson per session: concept, math, code, quiz. It streams lessons
straight from this repo, and the `course-guide` skill jumps you to the exact
lesson that covers anything you are stuck on. In Codex, invoke these skills with
`learn` and `course-guide`; in Claude Code, use `/learn` and `/course-guide`;
in other compatible hosts, ask to use the skill by name.

Only want Model Context Protocol (MCP)? Use the MCP invocation for your host. It creates
`MCP-LEARNING.md` and follows one 17-lesson route through stateless
requests, transports, bidirectional work, security, reliability, registry
governance, and conformance evidence. The exact order and checkpoints live in
the [Model Context Protocol (MCP) manifest](https://github.com/rohitg00/ai-engineering-from-scratch/blob/d18b8fe5a913c46011a3b06cb6ebd6a924414fd3/learning-paths/model-context-protocol.json).

Only want Agent Skills? Use the Agent Skills invocation for your host. It
creates `AGENT-SKILLS-LEARNING.md` and follows one coherent five-lesson route:
contract, discovery, invocation, sandbox boundaries, then release evals and
real-host portability. Start on the web with the
[Agent Skills path](https://aiengineeringfromscratch.com/lesson?path=phases/13-tools-and-protocols/22-skills-and-agent-sdks&learningPath=agent-skills).

The installer lists the hosts it can configure and asks where to install. If
you do not have Node.js, `npx`, `python3`, a supported host, or a writable
scope yet, use the website or read `docs/en.md` manually. That path teaches the
concepts, but real-host discovery, invocation, script, and uninstall evidence
remains pending until the preflight is available. Read the lessons at
[aiengineeringfromscratch.com](https://aiengineeringfromscratch.com).
