---
title: "Terraform provider"
sourceId: "01-foundations/openai-api-docs-en"
sourceTitle: "OpenAI API 文档（英文）"
sourceKind: "官方文档"
licenseLabel: "仅引用"
lang: "英文"
tier: 3
volume: "01-foundations"
sourceUrl: "https://developers.openai.com/api/docs"
entryUrl: "https://developers.openai.com/api/docs"
sourceRel: "api/docs/guides/terraform.md"
rawUrl: "/raw/01-foundations/openai-api-docs-en/api/docs/guides/terraform.md"
sourceSha256: "69a659fa35c6c9eb0b61e1a8b18df662fdd6b720ba0d0ed1a930310be6690624"
pageSha256: "69a659fa35c6c9eb0b61e1a8b18df662fdd6b720ba0d0ed1a930310be6690624"
contentMode: "local-full"
zh: ""
---

# Terraform provider

> For the complete documentation index, see [llms.txt](https://developers.openai.com/llms.txt). Markdown versions of documentation pages are available by appending `.md` to the page URL.

The official [OpenAI Terraform provider](https://github.com/openai/terraform-provider-openai) lets you manage OpenAI organization resources with infrastructure as code. The provider uses the [Administration API](https://developers.openai.com/api/reference/administration/overview) to manage projects, users, groups, roles, service accounts, certificates, rate limits, spend alerts, and related project settings.

This guide creates an OpenAI project. Continue to the use-case guides for project access, service accounts, operational limits, project controls, and imports.

## Before you begin

You need:

- [Terraform](https://developer.hashicorp.com/terraform/install) 1.0 or later. The import examples require Terraform 1.5 or later.
- An OpenAI organization with permission to create an [Admin API key](https://platform.openai.com/settings/organization/admin-keys).

Administration API endpoints require Admin API keys, which don't work with non-administration OpenAI API endpoints. Store the key in an environment variable or a secrets manager. Don't commit it to your Terraform configuration or source control.

## Configure the provider

Create a new directory and add a `main.tf` file with the following configuration:

```terraform
terraform {
  required_version = ">= 1.0"

  required_providers {
    openai = {
      source  = "openai/openai"
      version = ">= 1.0.0"
    }
  }
}

provider "openai" {}

resource "openai_project" "example" {
  name = "terraform-managed"
}

output "project_id" {
  value = openai_project.example.project_id
}
```

The version constraint allows provider version 1.0.0 and later. Review the [provider releases](https://github.com/openai/terraform-provider-openai/releases) before upgrading.

Set your Admin API key in the environment:

```bash
