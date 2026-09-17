---
title: "Configuration"
sourceId: "10-context-memory/openai-skills"
sourceTitle: "Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "仅引用"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/openai/skills"
entryUrl: "https://github.com/openai/skills/blob/49f948faa9258a0c61caceaf225e179651397431/skills/.curated/cloudflare-deploy/references/secrets-store/configuration.md"
sourceRel: "skills/.curated/cloudflare-deploy/references/secrets-store/configuration.md"
rawUrl: "/raw/10-context-memory/openai-skills/skills/.curated/cloudflare-deploy/references/secrets-store/configuration.md"
sourceSha256: "a7cb7ba5afedecbd005217d6155d85e2800b9f5029bc49f16f15498fc99f17ba"
pageSha256: "a7cb7ba5afedecbd005217d6155d85e2800b9f5029bc49f16f15498fc99f17ba"
contentMode: "local-full"
zh: ""
---

# Configuration

## Wrangler Config

### Basic Binding

**wrangler.jsonc**:

```jsonc
{
  "secrets_store_secrets": [
    {
      "binding": "API_KEY",
      "store_id": "abc123",
      "secret_name": "stripe_api_key"
    }
  ]
}
```

**wrangler.toml** (alternative):

```toml
[[secrets_store_secrets]]
binding = "API_KEY"
store_id = "abc123"
secret_name = "stripe_api_key"
```

Fields:
- `binding`: Variable name for `env` access
- `store_id`: From `wrangler secrets-store store list`
- `secret_name`: Identifier (no spaces)

### Environment-Specific

**wrangler.jsonc**:

```jsonc
{
  "env": {
    "production": {
      "secrets_store_secrets": [
        {
          "binding": "API_KEY",
          "store_id": "prod-store",
          "secret_name": "prod_api_key"
        }
      ]
    },
    "staging": {
      "secrets_store_secrets": [
        {
          "binding": "API_KEY",
          "store_id": "staging-store",
          "secret_name": "staging_api_key"
        }
      ]
    }
  }
}
```

**wrangler.toml** (alternative):

```toml
[env.production]
[[env.production.secrets_store_secrets]]
binding = "API_KEY"
store_id = "prod-store"
secret_name = "prod_api_key"

[env.staging]
[[env.staging.secrets_store_secrets]]
binding = "API_KEY"
store_id = "staging-store"
secret_name = "staging_api_key"
```

## Wrangler Commands

### Store Management

```bash
wrangler secrets-store store list
wrangler secrets-store store create my-store --remote
