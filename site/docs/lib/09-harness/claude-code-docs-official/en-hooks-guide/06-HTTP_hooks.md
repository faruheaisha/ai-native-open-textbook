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
sourceRel: "en/hooks-guide.md"
rawUrl: "/raw/09-harness/claude-code-docs-official/en/hooks-guide.md"
sourceSha256: "b5632cf6b8c78f04797a91ed590ed7718f6af17cc923a856cbad3b3a2f7138a8"
pageSha256: "5b536df830f6479e71d4280508a138e2b3bac539f0b17db12adcfba9e1416c9e"
contentMode: "local-full"
zh: ""
---

## HTTP hooks

Use `type: "http"` hooks to POST event data to an HTTP endpoint instead of running a shell command. The endpoint receives the same JSON that a command hook would receive on stdin, and returns results through the HTTP response body using the same JSON format.

HTTP hooks are useful when you want a web server, cloud function, or external service to handle hook logic: for example, a shared audit service that logs tool use events across a team.

This example posts every tool use to a local logging service:

```json theme={null}
{
  "hooks": {
    "PostToolUse": [
      {
        "hooks": [
          {
            "type": "http",
            "url": "http://localhost:8080/hooks/tool-use",
            "headers": {
              "Authorization": "Bearer $MY_TOKEN"
            },
            "allowedEnvVars": ["MY_TOKEN"]
          }
        ]
      }
    ]
  }
}
```

The endpoint should return a JSON response body using the same [output format](https://code.claude.com/docs/en/hooks#json-output) as command hooks. To block a tool call, return a 2xx response with the appropriate `hookSpecificOutput` fields. HTTP status codes alone can't block actions.

Header values support environment variable interpolation using `$VAR_NAME` or `${VAR_NAME\}` syntax. Only variables listed in the `allowedEnvVars` array are resolved; all other `$VAR` references remain empty.

For full configuration options and response handling, see [HTTP hooks](https://code.claude.com/docs/en/hooks#http-hook-fields) in the reference.
