---
title: "Claude Code System Prompts"
sourceId: "10-context-memory/claude-code-system-prompts"
sourceTitle: "Claude Code System Prompts"
sourceKind: "源码研读"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "10-context-memory"
sourceUrl: "https://github.com/Piebald-AI/claude-code-system-prompts"
entryUrl: "https://github.com/Piebald-AI/claude-code-system-prompts/blob/3af4c6139aaabb0470440961ca8c8fb871099234/system-prompts/skill-update-config-7-step-verification-flow.md"
sourceRel: "system-prompts/skill-update-config-7-step-verification-flow.md"
rawUrl: "/raw/10-context-memory/claude-code-system-prompts/system-prompts/skill-update-config-7-step-verification-flow.md"
sourceSha256: "ec02c5da77b536c1a342e2406981d630847baf0c39538807440c23c8e19f0015"
pageSha256: "ec02c5da77b536c1a342e2406981d630847baf0c39538807440c23c8e19f0015"
contentMode: "local-full"
zh: ""
---

# Claude Code System Prompts

## Constructing a Hook (with verification)

Given an event, matcher, target file, and desired behavior, follow this flow. Each step catches a different failure class — a hook that silently does nothing is worse than no hook.

1. **Dedup check.** Read the target file. If a hook already exists on the same event+matcher, show the existing command and ask: keep it, replace it, or add alongside.

2. **Construct the command for THIS project — don't assume.** The hook receives JSON on stdin. Build a command that:
   - Extracts any needed payload safely — use `jq -r` into a quoted variable or `\{ read -r f; ... "$f"; \}`, NOT unquoted `| xargs` (splits on spaces)
   - Invokes the underlying tool the way this project runs it (npx/bunx/yarn/pnpm? Makefile target? globally-installed?)
   - Skips inputs the tool doesn't handle (formatters often have `--ignore-unknown`; if not, guard by extension)
   - Stays RAW for now — no `|| true`, no stderr suppression. You'll wrap it after the pipe-test passes.

3. **Pipe-test the raw command.** Synthesize the stdin payload the hook will receive and pipe it directly:
   - `Pre|PostToolUse` on `Write|Edit`: <code v-pre>echo '\{"tool_name":"Edit","tool_input":\{"file_path":"&lt;a real file from this repo>"}}' | &lt;cmd></code>
   - `Pre|PostToolUse` on `Bash`: <code v-pre>echo '\{"tool_name":"Bash","tool_input":\{"command":"ls"}}' | &lt;cmd></code>
   - `Stop`/`UserPromptSubmit`/`SessionStart`: most commands don't read stdin, so `echo '\{\}' | <cmd>` suffices

   Check exit code AND side effect (file actually formatted, test actually ran). If it fails you get a real error — fix (wrong package manager? tool not installed? jq path wrong?) and retest. Once it works, wrap with `2>/dev/null || true` (unless the user wants a blocking check).

4. **Write the JSON.** Merge into the target file (schema shape in the "Hook Structure" section above). If this creates `.claude/settings.local.json` for the first time, add it to .gitignore — the Write tool doesn't auto-gitignore it.

5. **Validate syntax + schema in one shot:**
