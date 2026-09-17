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
sourceRel: "en/hooks.md"
rawUrl: "/raw/09-harness/claude-code-docs-official/en/hooks.md"
sourceSha256: "a6f4f82aca2e63d64ba787c2dc8d735ff95ae86fd3a53471b87eb089133cbdca"
pageSha256: "a4c03bc876cb3ca2fcd2ef8192158d7aa5e2ed4f4c5a66c5cc6c0e9ec258cefc"
contentMode: "local-full"
zh: ""
---

### Hooks in skills and agents

In addition to settings files and plugins, hooks can be defined directly in [skills](https://code.claude.com/docs/en/skills) and [subagents](https://code.claude.com/docs/en/sub-agents) using frontmatter, in the same configuration format as settings-based hooks. How long Claude Code keeps them registered depends on the component:

* **Subagent hooks**: Claude Code runs them only while that subagent is running and removes them when it finishes. Claude Code converts a `Stop` hook here to `SubagentStop`, the event it fires when a subagent completes.
* **Skill hooks**: Claude Code registers them when you or Claude invoke the skill and keeps running them for the rest of the session, on turns after the skill's own turn as well. To have Claude Code remove a hook after its first successful run instead, set [`once: true`](#common-fields) on it.

This skill defines a `PreToolUse` hook that runs a security validation script before each `Bash` command:

```yaml theme={null}
---
name: secure-operations
description: Perform operations with security checks
hooks:
  PreToolUse:
    - matcher: "Bash"
      hooks:
        - type: command
          command: "./scripts/security-check.sh"
---
```

Subagents use the same format in their YAML frontmatter.

Frontmatter hooks in a project skill follow the same [workspace trust rule as hooks in settings files](#workspace-trust). Claude Code registers them when you or Claude invoke the skill, including in a `-p` run in a folder you haven't trusted.

Frontmatter hooks in a project subagent run only after you accept the [workspace trust dialog](https://code.claude.com/docs/en/permissions#project-allow-rules-and-workspace-trust) for the folder the agent file came from. A `-p` session doesn't count as accepting it. [What runs before you trust a folder](https://code.claude.com/docs/en/permissions#what-runs-before-you-trust-a-folder) compares this with the settings-file rule, and the subagents page lists [which scopes are exempt](https://code.claude.com/docs/en/sub-agents#hooks-in-subagent-frontmatter). Before v2.1.218, these hooks could run from folders you hadn't trusted.
