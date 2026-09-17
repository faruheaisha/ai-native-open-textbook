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
pageSha256: "2df63c0a1709946227b291e40dd9c31eaa0c011c4e482d6c24d1481603afd84c"
contentMode: "local-full"
zh: ""
---

## AWS & Cloud Credentials

### AWS Settings

| Key | Type | Description |
|-----|------|-------------|
| `awsAuthRefresh` | string | Script to refresh AWS auth (modifies `.aws` dir) |
| `awsCredentialExport` | string | Script outputting JSON with AWS credentials |

**Example:**
```json
{
  "awsAuthRefresh": "aws sso login --profile myprofile",
  "awsCredentialExport": "/bin/generate_aws_grant.sh"
}
```

### OpenTelemetry

| Key | Type | Description |
|-----|------|-------------|
| `otelHeadersHelper` | string | Script to generate dynamic OpenTelemetry headers |

**Example:**
```json
{
  "otelHeadersHelper": "/bin/generate_otel_headers.sh"
}
```
