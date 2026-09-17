---
title: "Manage service accounts with Terraform"
sourceId: "01-foundations/openai-api-docs-en"
sourceTitle: "OpenAI API 文档（英文）"
sourceKind: "官方文档"
licenseLabel: "仅引用"
lang: "英文"
tier: 3
volume: "01-foundations"
sourceUrl: "https://developers.openai.com/api/docs"
entryUrl: "https://developers.openai.com/api/docs"
sourceRel: "api/docs/guides/terraform/service-accounts.md"
rawUrl: "/raw/01-foundations/openai-api-docs-en/api/docs/guides/terraform/service-accounts.md"
sourceSha256: "2c71a617482f96a22ae37f1596487e5bacf684939ac5c9d780bedbae5a277c39"
pageSha256: "2c71a617482f96a22ae37f1596487e5bacf684939ac5c9d780bedbae5a277c39"
contentMode: "local-full"
zh: ""
---

# Manage service accounts with Terraform

> For the complete documentation index, see [llms.txt](https://developers.openai.com/llms.txt). Markdown versions of documentation pages are available by appending `.md` to the page URL.

An OpenAI service account is a nonhuman identity owned by a project. Terraform can create the account without a default role, define a least-privilege permission bundle, and assign that bundle through a group. Create and manage service-account API keys outside Terraform through the Administration API.

This guide follows a typical service-account onboarding workflow:

1. Create a service account without a default project role or API key.
2. Assign a custom project role through a group, granting only the permissions the workload needs.
3. Create a scoped API key and store it in your secrets manager.

## Before you begin

Complete the [Terraform provider setup](https://developers.openai.com/api/docs/guides/terraform), export an Admin API key as `OPENAI_ADMIN_KEY`, and export the existing project's ID as `PROJECT_ID`.

Use a test organization when evaluating service-account creation, import, replacement, and deletion.

## Create a service account without a default role

Create the service account with Terraform:

```terraform
resource "openai_project_service_account" "application" {
  project_id = "proj_123"
  name       = "example-application-development-service-account"
}

output "service_account_id" {
  value = openai_project_service_account.application.service_account_id
}
```

Replace `proj_123` with the ID of the existing project that will own the service account.

The provider creates the service-account identity without generating an API key or assigning a default project role. Terraform stores the service-account ID and other nonsensitive metadata in state. At this stage, the service account has no project permissions.

## Assign least-privilege permissions

Define a custom project role with only the permissions the workload requires. Create a group, add the service account to it, and assign the role to the group. This example allows group members to create responses:

```terraform
resource "openai_project_role" "application" {
  project_id  = openai_project_service_account.application.project_id
  role_name   = "Application response writer"
  description = "Allows the application to create responses"
  permissions = ["api.responses.write"]
}

resource "openai_group" "application_access" {
  name = "example-application-development-access"
}

resource "openai_group_user" "application" {
  group_id = openai_group.application_access.group_id
  user_id  = openai_project_service_account.application.id
}

resource "openai_project_group_role" "application_access" {
  project_id = openai_project_service_account.application.project_id
  group_id   = openai_group.application_access.group_id
  role_id    = openai_project_role.application.role_id
}
```

The `openai_project_role` resource defines the least-privilege permission bundle, `openai_group_user` adds the service account to the group, and `openai_project_group_role` assigns the role to that group. Every service account added to the group inherits the same project role. Replace `api.responses.write` with the smallest set of permissions approved for your workload. See [Projects and access](https://developers.openai.com/api/docs/guides/terraform/projects-and-access) for more information about group-based project access.

Review and apply the configuration:

```bash
terraform plan
terraform apply
```

Don't assign the built-in `member` or `owner` role when a custom project role
  provides the permissions your workload needs. Keep access limited to the
  approved permission bundle.

## Create a scoped API key

After applying the Terraform configuration, create an API key through the [Create project service account API key](https://developers.openai.com/api/reference/resources/admin/subresources/organization/subresources/projects/subresources/service_accounts/subresources/api_keys/methods/create) endpoint. The API returns the key's full value only once, so protect the response file before making the request:

```bash
SERVICE_ACCOUNT_ID="$(terraform output -raw service_account_id)"
umask 077

curl -X POST \
  "https://api.openai.com/v1/organization/projects/$PROJECT_ID/service_accounts/$SERVICE_ACCOUNT_ID/api_keys" \
  -H "Authorization: Bearer $OPENAI_ADMIN_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Production App",
    "scopes": ["api.responses.write"]
  }' \
  --output service-account-api-key.json
```

Choose the narrowest scopes the workload needs. API-key scopes can further restrict the service account's permissions, but they can't grant permissions outside its assigned project role.

Pass the `value` from `service-account-api-key.json` to your approved secrets-manager workflow without printing it. After your secrets manager stores and verifies the secret, remove the response file:

```bash
rm service-account-api-key.json
```

Treat `service-account-api-key.json` as a secret for as long as it exists. Don't commit it, write the key to Terraform configuration, expose it through a Terraform output, or pass it as a Terraform variable.

The [API reference](https://developers.openai.com/api/reference/resources/admin/subresources/organization/subresources/projects/subresources/service_accounts/subresources/api_keys/methods/create) includes the response shape and language-specific examples. Workloads that support [workload identity federation](https://developers.openai.com/api/docs/guides/workload-identity-federation) can use the same service account and least-privilege role without creating an API key.

## Import an existing service account

You don't need to import a service account that Terraform created. To adopt a service account created outside Terraform, declare it with the same project ID and name:

```terraform
resource "openai_project_service_account" "application" {
  project_id = "proj_123"
  name       = "example-application-development-service-account"
}
```

Import the existing identity before running a normal apply:

```bash
