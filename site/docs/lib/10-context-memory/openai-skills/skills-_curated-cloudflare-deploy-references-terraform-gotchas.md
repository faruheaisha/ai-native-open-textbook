---
title: "Terraform Troubleshooting & Best Practices"
sourceId: "10-context-memory/openai-skills"
sourceTitle: "Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "仅引用"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/openai/skills"
entryUrl: "https://github.com/openai/skills/blob/49f948faa9258a0c61caceaf225e179651397431/skills/.curated/cloudflare-deploy/references/terraform/gotchas.md"
sourceRel: "skills/.curated/cloudflare-deploy/references/terraform/gotchas.md"
rawUrl: "/raw/10-context-memory/openai-skills/skills/.curated/cloudflare-deploy/references/terraform/gotchas.md"
sourceSha256: "ede039589518cceb96d40c12b7e22aaf0fbb1a5ec4d806af57940dfcaf9da672"
pageSha256: "ede039589518cceb96d40c12b7e22aaf0fbb1a5ec4d806af57940dfcaf9da672"
contentMode: "local-full"
zh: ""
---

# Terraform Troubleshooting & Best Practices

Common issues, security considerations, and best practices.

## State Drift Issues

Some resources have known state drift. Add lifecycle blocks to prevent perpetual diffs:

| Resource | Drift Attributes | Workaround |
|----------|------------------|------------|
| `cloudflare_pages_project` | `deployment_configs.*` | `ignore_changes = [deployment_configs]` |
| `cloudflare_workers_script` | secrets returned as REDACTED | `ignore_changes = [secret_text_binding]` |
| `cloudflare_load_balancer` | `adaptive_routing`, `random_steering` | `ignore_changes = [adaptive_routing, random_steering]` |
| `cloudflare_workers_kv` | special chars in keys (< 5.16.0) | Upgrade to 5.16.0+ |

```hcl
# Example: Ignore secret drift
resource "cloudflare_workers_script" "api" {
  account_id = var.account_id
  name = "api-worker"
  content = file("worker.js")
  secret_text_binding { name = "API_KEY"; text = var.api_key }
  
  lifecycle {
    ignore_changes = [secret_text_binding]
  }
}
```

## v5 Breaking Changes

Provider v5 is current (auto-generated from OpenAPI). v4→v5 has breaking changes:

**Resource Renames:**

| v4 Resource | v5 Resource | Notes |
|-------------|-------------|-------|
| `cloudflare_record` | `cloudflare_dns_record` | |
| `cloudflare_worker_script` | `cloudflare_workers_script` | Note: plural |
| `cloudflare_worker_*` | `cloudflare_workers_*` | All worker resources |
| `cloudflare_access_*` | `cloudflare_zero_trust_*` | Access → Zero Trust |

**Attribute Changes:**

| v4 Attribute | v5 Attribute | Resources |
|--------------|--------------|-----------|
| `zone` | `name` | zone |
| `account_id` | `account.id` | zone (object syntax) |
| `key` | `key_name` | KV |
| `location_hint` | `location` | R2 |

**State Migration:**

```bash
# Rename resources in state after v5 upgrade
terraform state mv cloudflare_record.example cloudflare_dns_record.example
terraform state mv cloudflare_worker_script.api cloudflare_workers_script.api
```

## Resource-Specific Gotchas

### R2 Location Case Sensitivity

**Problem:** Terraform creates R2 bucket but fails on subsequent applies  
**Cause:** Location must be UPPERCASE  
**Solution:** Use `WNAM`, `ENAM`, `WEUR`, `EEUR`, `APAC` (not `wnam`, `enam`, etc.)

```hcl
resource "cloudflare_r2_bucket" "assets" {
  account_id = var.account_id
  name = "assets"
  location = "WNAM"  # UPPERCASE required
}
```

### KV Special Characters (< 5.16.0)

**Problem:** Keys with `+`, `#`, `%` cause encoding issues  
**Cause:** URL encoding bug in provider < 5.16.0  
**Solution:** Upgrade to 5.16.0+ or avoid special chars in keys

### D1 Migrations

**Problem:** Terraform creates database but schema is empty  
**Cause:** Terraform only creates D1 resource, not schema  
**Solution:** Run migrations via wrangler after Terraform apply

```bash
# After terraform apply
