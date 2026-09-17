---
title: "Terraform Data Sources Reference"
sourceId: "10-context-memory/openai-skills"
sourceTitle: "Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "仅引用"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/openai/skills"
entryUrl: "https://github.com/openai/skills/blob/49f948faa9258a0c61caceaf225e179651397431/skills/.curated/cloudflare-deploy/references/terraform/api.md"
sourceRel: "skills/.curated/cloudflare-deploy/references/terraform/api.md"
rawUrl: "/raw/10-context-memory/openai-skills/skills/.curated/cloudflare-deploy/references/terraform/api.md"
sourceSha256: "5dc812c078d06454d801b0e126d50c48031c1a7b0ffef7ebf77a97cf7b41e768"
pageSha256: "5dc812c078d06454d801b0e126d50c48031c1a7b0ffef7ebf77a97cf7b41e768"
contentMode: "local-full"
zh: ""
---

# Terraform Data Sources Reference

Query existing Cloudflare resources to reference in your configurations.

## v5 Data Source Names

| v4 Name | v5 Name | Notes |
|---------|---------|-------|
| `cloudflare_record` | `cloudflare_dns_record` | |
| `cloudflare_worker_script` | `cloudflare_workers_script` | Note: plural |
| `cloudflare_access_*` | `cloudflare_zero_trust_*` | Access → Zero Trust |

## Zone Data Sources

```hcl
# Get zone by name
data "cloudflare_zone" "example" {
  name = "example.com"
}

# Use in resources
resource "cloudflare_dns_record" "www" {
  zone_id = data.cloudflare_zone.example.id
  name = "www"
  # ...
}
```

## Account Data Sources

```hcl
# List all accounts
data "cloudflare_accounts" "main" {
  name = "My Account"
}

# Use account ID
resource "cloudflare_worker_script" "api" {
  account_id = data.cloudflare_accounts.main.accounts[0].id
  # ...
}
```

## Worker Data Sources

```hcl
# Get existing worker script (v5: cloudflare_workers_script)
data "cloudflare_workers_script" "existing" {
  account_id = var.account_id
  name = "existing-worker"
}

# Reference in service bindings
resource "cloudflare_workers_script" "consumer" {
  service_binding {
    name = "UPSTREAM"
    service = data.cloudflare_workers_script.existing.name
  }
}
```

## KV Data Sources

```hcl
# Get KV namespace
data "cloudflare_workers_kv_namespace" "existing" {
  account_id = var.account_id
  namespace_id = "abc123"
}

# Use in worker binding
resource "cloudflare_workers_script" "api" {
  kv_namespace_binding {
    name = "KV"
    namespace_id = data.cloudflare_workers_kv_namespace.existing.id
  }
}
```

## Lists Data Source

```hcl
# Get IP lists for WAF rules
data "cloudflare_list" "blocked_ips" {
  account_id = var.account_id
  name = "blocked_ips"
}
```

## IP Ranges Data Source

```hcl
# Get Cloudflare IP ranges (for firewall rules)
data "cloudflare_ip_ranges" "cloudflare" {}

output "ipv4_cidrs" {
  value = data.cloudflare_ip_ranges.cloudflare.ipv4_cidr_blocks
}

output "ipv6_cidrs" {
  value = data.cloudflare_ip_ranges.cloudflare.ipv6_cidr_blocks
}

# Use in security group rules (AWS example)
resource "aws_security_group_rule" "allow_cloudflare" {
  type = "ingress"
  from_port = 443
  to_port = 443
  protocol = "tcp"
  cidr_blocks = data.cloudflare_ip_ranges.cloudflare.ipv4_cidr_blocks
  security_group_id = aws_security_group.web.id
}
```

## Common Patterns

### Import ID Formats

| Resource | Import ID Format |
|----------|------------------|
