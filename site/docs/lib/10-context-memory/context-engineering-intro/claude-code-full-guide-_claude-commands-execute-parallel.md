---
title: "Parallel Task Version Execution"
sourceId: "10-context-memory/context-engineering-intro"
sourceTitle: "Context Engineering Intro"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 1
volume: "10-context-memory"
sourceUrl: "https://github.com/coleam00/context-engineering-intro"
entryUrl: "https://github.com/coleam00/context-engineering-intro/blob/a2d84b021cee1e2f4e77ba854bba0be8cb319035/claude-code-full-guide/.claude/commands/execute-parallel.md"
sourceRel: "claude-code-full-guide/.claude/commands/execute-parallel.md"
rawUrl: "/raw/10-context-memory/context-engineering-intro/claude-code-full-guide/.claude/commands/execute-parallel.md"
sourceSha256: "9d20b321bd9178ec5a49090ca4d38bbbe1653ce855d1be9dd7907de7fb5bfd66"
pageSha256: "9d20b321bd9178ec5a49090ca4d38bbbe1653ce855d1be9dd7907de7fb5bfd66"
contentMode: "local-full"
zh: ""
---

# Parallel Task Version Execution

## Variables
FEATURE_NAME: $ARGUMENTS
PLAN_TO_EXECUTE: $ARGUMENTS
NUMBER_OF_PARALLEL_WORKTREES: $ARGUMENTS

## Instructions

We're going to create NUMBER_OF_PARALLEL_WORKTREES new subagents that use the Task tool to create N versions of the same feature in parallel.

Be sure to read PLAN_TO_EXECUTE.

This enables use to concurrently build the same feature in parallel so we can test and validate each subagent's changes in isolation then pick the best changes.

The first agent will run in trees/&lt;FEATURE_NAME>-1/
The second agent will run in trees/&lt;FEATURE_NAME>-2/
...
The last agent will run in trees/&lt;FEATURE_NAME>-&lt;NUMBER_OF_PARALLEL_WORKTREES>/

The code in trees/&lt;FEATURE_NAME>-&lt;i>/ will be identical to the code in the current branch. It will be setup and ready for you to build the feature end to end.

Each agent will independently implement the engineering plan detailed in PLAN_TO_EXECUTE in their respective workspace.

When the subagent completes it's work, have the subagent to report their final changes made in a comprehensive `RESULTS.md` file at the root of their respective workspace.

Make sure agents don't run any tests or other code - focus on the code changes only.
