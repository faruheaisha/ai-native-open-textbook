---
title: "Claude Code Best Practice"
sourceId: "09-harness/claude-code-best-practice"
sourceTitle: "Claude Code Best Practice"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 1
volume: "09-harness"
sourceUrl: "https://github.com/shanraisshan/claude-code-best-practice"
entryUrl: "https://github.com/shanraisshan/claude-code-best-practice/blob/2d6ea151c0d7189c3eaf364809c5574bd210e545/best-practice/claude-settings.md"
sourceRel: "best-practice/claude-settings.md"
rawUrl: "/raw/09-harness/claude-code-best-practice/best-practice/claude-settings.md"
sourceSha256: "75075e7b44bd6afd58459b40b4d627c415bb3b04514783ad87ee15a97b2e8077"
pageSha256: "d332adee589b722039ad9b1416756e8d5222c23a4b1bb4b68b89e234b39134f6"
contentMode: "local-full"
zh: ""
---

## Environment Variables (via `env`)

Set environment variables for all Claude Code sessions.

```json
{
  "env": {
    "ANTHROPIC_API_KEY": "...",
    "NODE_ENV": "development",
    "DEBUG": "true"
  }
}
```

### Common Environment Variables

| Variable | Description |
|----------|-------------|
| `ANTHROPIC_API_KEY` | API key for authentication |
| `ANTHROPIC_AUTH_TOKEN` | OAuth token |
| `CLAUDE_CODE_OAUTH_TOKEN` | OAuth access token for Claude.ai authentication. Alternative to `/login` for SDK and automated environments. Takes precedence over keychain-stored credentials |
| `CLAUDE_CODE_OAUTH_REFRESH_TOKEN` | OAuth refresh token for Claude.ai authentication. When set, `claude auth login` exchanges this token directly instead of opening a browser. Requires `CLAUDE_CODE_OAUTH_SCOPES` |
| `CLAUDE_CODE_OAUTH_SCOPES` | Space-separated OAuth scopes the refresh token was issued with (e.g., `"user:profile user:inference user:sessions:claude_code"`). Required when `CLAUDE_CODE_OAUTH_REFRESH_TOKEN` is set |
| `ANTHROPIC_WORKSPACE_ID` | Workspace ID for [workload identity federation](https://platform.claude.com/docs/en/manage-claude/workload-identity-federation). Set when your federation rule is scoped to more than one workspace so the token exchange knows which workspace to target (v2.1.141) |
| `ANTHROPIC_BASE_URL` | Custom API endpoint |
| `ANTHROPIC_BEDROCK_BASE_URL` | Override Bedrock endpoint URL |
| `ANTHROPIC_BEDROCK_MANTLE_BASE_URL` | Override the Bedrock Mantle endpoint URL. See [Mantle endpoint](https://code.claude.com/docs/en/amazon-bedrock#use-the-mantle-endpoint) |
| `ANTHROPIC_BEDROCK_SERVICE_TIER` | Bedrock service tier: `default`, `flex`, or `priority`. Sent as the `X-Amzn-Bedrock-Service-Tier` header on every request. See [Amazon Bedrock service tiers](https://code.claude.com/docs/en/amazon-bedrock#service-tiers) (v2.1.122) |
| `ANTHROPIC_AWS_API_KEY` | Workspace API key for Claude Platform on AWS |
| `ANTHROPIC_AWS_BASE_URL` | Override Claude Platform on AWS endpoint URL |
| `ANTHROPIC_AWS_WORKSPACE_ID` | Required workspace ID for Claude Platform on AWS |
| `CLAUDE_CODE_PROVIDER_MANAGED_BY_HOST` | Set by host platforms that embed Claude Code and manage model provider routing on the user's behalf. When set, provider-selection / endpoint / authentication env vars in `settings.json` (e.g., `CLAUDE_CODE_USE_BEDROCK`, `ANTHROPIC_BASE_URL`, `ANTHROPIC_API_KEY`) are ignored so user settings cannot override the host's routing. The automatic telemetry opt-out for Bedrock/Vertex/Foundry is also skipped, so telemetry follows the standard `DISABLE_TELEMETRY` opt-out (v2.1.126) |
| `ANTHROPIC_VERTEX_BASE_URL` | Override Vertex AI endpoint URL |
| `ANTHROPIC_BETAS` | Comma-separated Anthropic beta header values |
| `ANTHROPIC_VERTEX_PROJECT_ID` | GCP project ID for Vertex AI |
| `GCLOUD_PROJECT` | GCP project ID for Vertex AI requests (overrides `ANTHROPIC_VERTEX_PROJECT_ID`) |
| `GOOGLE_APPLICATION_CREDENTIALS` | Path to GCP service account credential file for Vertex AI authentication |
| `GOOGLE_CLOUD_PROJECT` | GCP project ID for Vertex AI requests (overrides `ANTHROPIC_VERTEX_PROJECT_ID`) |
| `ANTHROPIC_CUSTOM_MODEL_OPTION` | Model ID to add as a custom entry in the `/model` picker. Use to make a non-standard or gateway-specific model selectable without replacing built-in aliases |
| `ANTHROPIC_CUSTOM_MODEL_OPTION_NAME` | Display name for the custom model entry in the `/model` picker. Defaults to the model ID when not set |
