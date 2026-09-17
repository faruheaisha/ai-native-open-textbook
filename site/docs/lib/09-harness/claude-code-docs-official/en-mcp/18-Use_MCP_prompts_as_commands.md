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
sourceRel: "en/mcp.md"
rawUrl: "/raw/09-harness/claude-code-docs-official/en/mcp.md"
sourceSha256: "10c37e3b840932b59cb7c7ab34e81595c598b0213bd2f1bb15c8effa1d7bc22b"
pageSha256: "cb1b61b88083d9767e948bc7098a8423d2a47313c4386cd830f400c9aaa5eca3"
contentMode: "local-full"
zh: ""
---

## Use MCP prompts as commands

MCP servers can expose prompts that become available as commands in Claude Code.

### Execute MCP prompts

    Type `/` to see the commands available to you, including those from MCP servers. Claude Code lists each MCP prompt as `/servername:promptname (MCP)`. Typing `/mcp__servername__promptname` also runs it.

    ```text wrap theme=\{null\}
    /mcp__github__list_prs
    ```

    Many prompts accept arguments. Pass them space-separated after the command. Claude Code splits the arguments on whitespace, so each argument is a single token:

    ```text wrap theme=\{null\}
    /mcp__github__pr_review 456
    ```

    ```text wrap theme=\{null\}
    /mcp__jira__create_issue login-bug high
    ```

  Tips:

  * MCP prompts are dynamically discovered from connected servers
  * Arguments are parsed based on the prompt's defined parameters
  * Prompt results are injected directly into the conversation
  * In the `/mcp__servername__promptname` form, Claude Code replaces any character in the server name outside `A-Z`, `a-z`, `0-9`, `_`, and `-` with `_`, and uses the prompt name as the server declares it
