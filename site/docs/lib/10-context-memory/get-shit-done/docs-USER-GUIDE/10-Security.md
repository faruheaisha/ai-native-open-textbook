---
title: "GSD（Get Shit Done）工作流文档"
sourceId: "10-context-memory/get-shit-done"
sourceTitle: "GSD（Get Shit Done）工作流文档"
sourceKind: "其他材料"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/gsd-build/get-shit-done"
entryUrl: "https://github.com/gsd-build/get-shit-done/blob/bdcaab2c752d9a33a1a1ca9acf3a3c81fb991815/docs/USER-GUIDE.md"
sourceRel: "docs/USER-GUIDE.md"
rawUrl: "/raw/10-context-memory/get-shit-done/docs/USER-GUIDE.md"
sourceSha256: "4550e970e63aa2066ecde7d4f8350d0d1c104699167310213bc4c5a9ca0fb7e4"
pageSha256: "c06e99a425157ee2d1ae8e4e6488432ff0b8d05fa9277d6e7df08699df1d4ca7"
contentMode: "local-full"
zh: ""
---

## Security

### Defense-in-Depth (v1.27)

GSD generates markdown files that become LLM system prompts. This means any user-controlled text flowing into planning artifacts is a potential indirect prompt injection vector. v1.27 introduced centralized security hardening:

**Path Traversal Prevention:**
All user-supplied file paths (`--text-file`, `--prd`) are validated to resolve within the project directory. macOS `/var` → `/private/var` symlink resolution is handled.

**Prompt Injection Detection:**
The `security.cjs` module scans for known injection patterns (role overrides, instruction bypasses, system tag injections) in user-supplied text before it enters planning artifacts.

**Runtime Hooks:**

- `gsd-prompt-guard.js` — Scans Write/Edit calls to `.planning/` for injection patterns (always active, advisory-only)
- `gsd-workflow-guard.js` — Warns on file edits outside GSD workflow context (opt-in via `hooks.workflow_guard`)

**CI Scanner:**
`prompt-injection-scan.test.cjs` scans all agent, workflow, and command files for embedded injection vectors. Run as part of the test suite.

---

### Package Legitimacy Gate (v1.42.1)
