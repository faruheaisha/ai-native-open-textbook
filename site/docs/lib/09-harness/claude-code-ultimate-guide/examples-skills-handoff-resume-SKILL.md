---
title: "Claude Code Ultimate Guide"
sourceId: "09-harness/claude-code-ultimate-guide"
sourceTitle: "Claude Code Ultimate Guide"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://github.com/FlorianBruniaux/claude-code-ultimate-guide"
entryUrl: "https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/examples/skills/handoff-resume/SKILL.md"
sourceRel: "examples/skills/handoff-resume/SKILL.md"
rawUrl: "/raw/09-harness/claude-code-ultimate-guide/examples/skills/handoff-resume/SKILL.md"
sourceSha256: "be4678294233db7a6c2a9fe48113586822e63183e8f73ebd5a02652d1e8ce078"
pageSha256: "be4678294233db7a6c2a9fe48113586822e63183e8f73ebd5a02652d1e8ce078"
contentMode: "local-full"
zh: ""
---

# Claude Code Ultimate Guide

Read and load the handoff document at `$ARGUMENTS[0]`.

## Steps

1. **Read the file** at the provided path. If the path does not exist, list files in `claudedocs/handoffs/` and ask the user which one to load.

2. **Parse and confirm**:
   - Task and scope
   - Files involved (with line numbers)
   - Key discoveries
   - Work completed so far
   - Current status
   - Next steps (ordered)

3. **Confirm understanding**: Summarize what you have loaded in 3-5 bullet points. Ask: "Should I proceed with the next step, or do you want to adjust the plan first?"

4. **Do not start working** until the user confirms. The confirmation step is mandatory.

## Notes

- If the handoff file references commits (`commit: abc1234`), note them but do not re-run the work.
- If next steps are unclear or conflicting, flag it before proceeding.
- The "Work Done" section is the authoritative record of what has been completed. Trust it.
