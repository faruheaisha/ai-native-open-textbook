---
title: "claude-code-docs-official"
sourceId: "09-harness/claude-code-docs-official"
sourceTitle: "claude-code-docs-official"
sourceKind: "官方文档"
licenseLabel: "仅引用"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://code.claude.com/docs"
entryUrl: "https://code.claude.com/docs"
sourceRel: "en/skills.md"
rawUrl: "/raw/09-harness/claude-code-docs-official/en/skills.md"
sourceSha256: "6cb66d6c1ab6b06eda6dd6854f4133901c8daef8fc447f59fe65ac4038ec8043"
pageSha256: "9d58963a9a06ac0a159fc7712a37b063a52eeb4bb818d6af2c688277366b1d7a"
contentMode: "local-full"
zh: ""
---

## Evaluate and iterate on a skill

Seeing a skill trigger tells you Claude found it, not that it did what you intended. To know a skill is working, measure two things separately: whether Claude invokes it on the prompts it should, and whether the output matches what you expect when it does.

The check for both is a baseline comparison. Collect a few realistic prompts, run each one in a fresh session with the skill available and again with it [disabled](#override-skill-visibility-from-settings), and compare the results. A fresh session matters because leftover context from authoring the skill will mask gaps in the written instructions.

### Run evals with skill-creator

The [`skill-creator` plugin](https://github.com/anthropics/claude-plugins-official/tree/main/plugins/skill-creator) automates the comparison loop inside Claude Code. Install it from the official marketplace:

```text theme={null}
/plugin install skill-creator@claude-plugins-official
```

If the install fails, match the message Claude Code reports:

* `Marketplace "claude-plugins-official" not found`: add the marketplace with `/plugin marketplace add anthropics/claude-plugins-official`, then retry the install.
* The plugin is [not found in the marketplace](https://code.claude.com/docs/en/discover-plugins#install-plugins): check the plugin name.

If the install summary reports `Run /reload-plugins to activate.`, Claude Code then runs that reload for you. If the reload warns that your next message would re-read the conversation, run `/reload-plugins --force` to make the plugin's skills available in the current session. Then ask Claude to evaluate an existing skill, for example `evaluate my summarize-changes skill with skill-creator`. The plugin walks you through writing test cases and runs the loop:

* **Test cases**: stores prompts, input files, and expected behavior in `evals/evals.json` inside the skill directory
* **Isolated runs**: spawns a [subagent](https://code.claude.com/docs/en/sub-agents) per test case so each run starts with a clean context, and records token count and duration
* **Grading**: checks each assertion against the output and writes pass or fail with evidence to `grading.json`
* **Benchmark**: aggregates pass rate, time, and tokens for with-skill versus without-skill into `benchmark.json` so you can compare the pass-rate improvement against the token and time overhead
* **Version comparison**: runs a blind A/B between two versions of the skill so you can confirm an edit is an improvement before committing it
* **Description tuning**: generates should-trigger and should-not-trigger prompts, measures the hit rate, and proposes description edits when the skill activates on the wrong requests
* **Review viewer**: opens an HTML report where you inspect each output and record qualitative feedback that the next iteration reads

For the eval file format and the full iteration workflow, see [Evaluating skill output quality](https://agentskills.io/skill-creation/evaluating-skills) on agentskills.io. For background on the benchmark and comparison modes, see the [skill-creator announcement](https://claude.com/blog/improving-skill-creator-test-measure-and-refine-agent-skills).
