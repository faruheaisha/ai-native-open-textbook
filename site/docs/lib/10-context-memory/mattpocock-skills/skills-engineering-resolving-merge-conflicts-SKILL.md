---
title: "Matt Pocock Skills（工程技能库）"
sourceId: "10-context-memory/mattpocock-skills"
sourceTitle: "Matt Pocock Skills（工程技能库）"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/mattpocock/skills"
entryUrl: "https://github.com/mattpocock/skills/blob/3cca18b368ae95cdbdebbff572ccafa662551015/skills/engineering/resolving-merge-conflicts/SKILL.md"
sourceRel: "skills/engineering/resolving-merge-conflicts/SKILL.md"
rawUrl: "/raw/10-context-memory/mattpocock-skills/skills/engineering/resolving-merge-conflicts/SKILL.md"
sourceSha256: "9d8114f8ef0b31f535a265fc05c364bd8cf2e2895a830040e06c22acb11f54b0"
pageSha256: "9d8114f8ef0b31f535a265fc05c364bd8cf2e2895a830040e06c22acb11f54b0"
contentMode: "local-full"
zh: ""
---

# Matt Pocock Skills（工程技能库）

1. **See the current state** of the merge/rebase. Check git history, and the conflicting files.

2. **Find the primary sources** for each conflict. Understand deeply why each change was made, and what the original intent was. Read the commit messages, check the PRs, check original issues/tickets.

3. **Resolve each hunk.** Preserve both intents where possible. Where incompatible, pick the one matching the merge's stated goal and note the trade-off. Do **not** invent new behaviour. Always resolve; never `--abort`.

4. Discover the project's **automated checks** and run them, typically typecheck, then tests, then format. Fix anything the merge broke.

5. **Finish the merge/rebase.** Stage everything and commit. If rebasing, continue the rebase process until all commits are rebased.
