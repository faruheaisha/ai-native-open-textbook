---
title: "Testing"
sourceId: "07-coding/vibe-coding-prompt-template"
sourceTitle: "Vibe Coding 提示词模板"
sourceKind: "课时教程"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "07-coding"
sourceUrl: "https://github.com/KhazP/vibe-coding-prompt-template"
entryUrl: "https://github.com/KhazP/vibe-coding-prompt-template/blob/db481763c24e2b66b919f9d40aa42b16409a62d7/templates/agent_docs/testing.md"
sourceRel: "templates/agent_docs/testing.md"
rawUrl: "/raw/07-coding/vibe-coding-prompt-template/templates/agent_docs/testing.md"
sourceSha256: "8486a1c1a0df18a23d2aab18669308e06c50f092dd1616eac8364e3acda73ce3"
pageSha256: "8486a1c1a0df18a23d2aab18669308e06c50f092dd1616eac8364e3acda73ce3"
contentMode: "local-full"
zh: ""
---

# Testing

## Required Before Completion

- [ ] Relevant tests pass.
- [ ] Typecheck/build passes.
- [ ] User-visible changes are checked in a browser or device when applicable.
- [ ] No tests were skipped or weakened without human approval.
- [ ] Evidence is reported in the final response.

## Commands

- All tests: `[command]`
- Single test: `[command pattern]`
- Typecheck: `[command]`
- Lint/format: `[command]`
- Build: `[command]`
- Browser/device check: `[command or manual flow]`

## What To Test

| Change type | Minimum check |
|-------------|---------------|
| Pure logic | Unit test |
| API/data flow | Integration test |
| UI behavior | Browser/device check |
| Auth, billing, migrations, deployment | Human review plus focused test |
| AI/tool behavior | Prompt/tool eval plus data-boundary check |

## AI Checks

Fill this in only if the product uses AI.

- Direct prompt: [expected result]
- Bad/indirect prompt: [expected refusal or safe behavior]
- Auth-required prompt: [expected permission behavior]
- Failure case: [provider timeout/quota/malformed response]
- Tool/action check: [expected tool call and blocked tool calls]
- Data check: [what must not appear in model output or logs]
