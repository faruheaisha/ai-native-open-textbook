---
title: "Session context audit"
sourceId: "10-context-memory/agent-skills-addyosmani"
sourceTitle: "Agent Skills（Addy Osmani）"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "10-context-memory"
sourceUrl: "https://github.com/addyosmani/agent-skills"
entryUrl: "https://github.com/addyosmani/agent-skills/blob/6ca0cd7db39b41b1c37e26d335c507ee92382c6d/evals/fixtures/context-engineering/context-audit.md"
sourceRel: "evals/fixtures/context-engineering/context-audit.md"
rawUrl: "/raw/10-context-memory/agent-skills-addyosmani/evals/fixtures/context-engineering/context-audit.md"
sourceSha256: "48130238edcf4ee51632c173de6b4bb53868ba935c4f70bceae7913490e7dd8e"
pageSha256: "48130238edcf4ee51632c173de6b4bb53868ba935c4f70bceae7913490e7dd8e"
contentMode: "local-full"
zh: ""
---

# Session context audit

The repository is a TypeScript service. The current agent session loads the
entire `docs/archive/` directory (1,800 files), generated API output, six old
incident transcripts, and every ADR on startup. It does not load the active
`CONTRIBUTING.md` or `docs/current-architecture.md`.

Observed failures:

- Responses recommend JavaScript even though new source must be TypeScript.
- Tests are proposed with Jest, but this project uses Vitest.
- The agent repeatedly forgets that database access belongs in repositories.
- Answers become generic after long tool traces.

Current task: add validation to one existing HTTP handler.
