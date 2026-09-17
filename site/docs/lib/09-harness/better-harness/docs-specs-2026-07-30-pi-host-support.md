---
title: "Add Pi as a supported host"
sourceId: "09-harness/better-harness"
sourceTitle: "Better Harness（QoderAI）"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "09-harness"
sourceUrl: "https://github.com/QoderAI/better-harness"
entryUrl: "https://github.com/QoderAI/better-harness/blob/e1538c15a98856b3349f365d951f4fa0bcc33f24/docs/specs/2026-07-30-pi-host-support.md"
sourceRel: "docs/specs/2026-07-30-pi-host-support.md"
rawUrl: "/raw/09-harness/better-harness/docs/specs/2026-07-30-pi-host-support.md"
sourceSha256: "cd1a932d9f0c8d7fea2e54b69870d5f29fe77665120dbcb80387de65ec79fe14"
pageSha256: "cd1a932d9f0c8d7fea2e54b69870d5f29fe77665120dbcb80387de65ec79fe14"
contentMode: "local-full"
zh: ""
---

# Add Pi as a supported host

## Traceability

- Spec ID: `pi-host-support`
- Status: Implemented
- Contribution workflow: [Contributing a New Coding Agent Host](https://github.com/QoderAI/better-harness/blob/e1538c15a98856b3349f365d951f4fa0bcc33f24/docs/adapters/contributing-new-coding-agent.md)

## Intent

Make Pi (`pi.dev`, `@earendil-works/pi-coding-agent`) a first-class,
evidence-safe Better Harness host alongside Qoder, Codex, Claude Code, Cursor,
Qwen Code, and GitHub Copilot.

This contribution reaches the **Verified install/discovery** capability level:
native discovery, configured assets, session evidence, evidence-bundle routing,
and portable report routing are verified. Pi remains outside the public
Quickstart set until a full report render is validated end to end in Pi, as
required by the repository's host contribution contract.

Pi is a minimal terminal coding harness extended through TypeScript extensions,
skills, prompt templates, themes, and pi packages. It already implements the
Agent Skills standard and auto-discovers a package's `skills/` directory, so
`pi install <repo>` can load the canonical `better-harness` Skill today. The
gaps this spec closes are the missing native slash-command entry point and,
more importantly, the missing evidence: every provider enum rejected `pi`, so
the workflow could neither inventory Pi's configured assets nor read Pi session
transcripts, leaving a Pi user unable to get a Pi-scoped Harness report.

Pi's native contracts were verified against `@earendil-works/pi-coding-agent`:
the agent dir resolves from `PI_CODING_AGENT_DIR` (default `~/.pi/agent`);
sessions are JSONL trees whose default location is
