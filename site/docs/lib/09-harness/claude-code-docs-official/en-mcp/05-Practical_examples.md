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
pageSha256: "5c1874dc7f19cb4e93647afadbf112de5df126a1ed5c0339d138b14459fd2138"
contentMode: "local-full"
zh: ""
---

## Practical examples

### Example: Connect to GitHub for code reviews

GitHub's remote MCP server authenticates with a GitHub personal access token passed as a header. To get one, open your [GitHub token settings](https://github.com/settings/personal-access-tokens), generate a new fine-grained token with access to the repositories you want Claude to work with, then add the server:

```bash theme={null}
claude mcp add --transport http github https://api.githubcopilot.com/mcp/ \
  --header "Authorization: Bearer YOUR_GITHUB_PAT"
```

Replace `YOUR_GITHUB_PAT` with your personal access token. The `claude mcp add` command saves the configuration without validating credentials, so a placeholder value is accepted here but the server fails to connect later. To verify the connection, run `/mcp` and check that the server shows `connected`. A server with bad credentials shows `failed`, and the failure detail includes the HTTP status the server returned, such as a 401.

Then work with GitHub:

```text wrap theme={null}
Review PR #456 and suggest improvements
```

```text wrap theme={null}
Create a new issue for the bug we just found
```

```text wrap theme={null}
Show me all open PRs assigned to me
```

### Example: Query your PostgreSQL database

[DBHub](https://github.com/bytebase/dbhub), the `@bytebase/dbhub` package, is an MCP server that connects Claude to a relational database through the connection string you pass in `--dsn`. Use a read-only database user in the connection string so the queries Claude runs can't modify data:

```bash theme={null}
claude mcp add --transport stdio db -- npx -y @bytebase/dbhub \
  --dsn "postgresql://readonly:pass@prod.db.com:5432/analytics"
```

To confirm the server starts, run `/mcp` and check that `db` shows `connected`.

Then query your database naturally:

```text wrap theme={null}
What's our total revenue this month?
```

```text wrap theme={null}
Show me the schema for the orders table
```

```text wrap theme={null}
Find customers who haven't made a purchase in 90 days
```
