---
title: "aws-cli-reference-ts"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/microsoft-365-agents-toolkit/skills/teams-app-developer/experts/deploy/aws-cli-reference-ts.md"
sourceRel: ".github/plugins/microsoft-365-agents-toolkit/skills/teams-app-developer/experts/deploy/aws-cli-reference-ts.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/microsoft-365-agents-toolkit/skills/teams-app-developer/experts/deploy/aws-cli-reference-ts.md"
sourceSha256: "fa3ca731956df4f73f304948f415053eb5c929424183aedf70b29cf5d273a1a4"
pageSha256: "fa3ca731956df4f73f304948f415053eb5c929424183aedf70b29cf5d273a1a4"
contentMode: "local-full"
zh: ""
---

# aws-cli-reference-ts

## purpose

Comprehensive reference of all AWS CLI (`aws`) command groups a developer needs for creating, reading, updating, and deleting resources in a bot or AI agent project on AWS. Use as a lookup companion to `aws-bot-deploy-ts.md` (step-by-step deployment) — this file maps every relevant CLI surface so you know what commands exist.

## rules

1. **This is a reference, not a tutorial.** For step-by-step deployment walkthroughs, see `aws-bot-deploy-ts.md`. This file catalogs every `aws` command group relevant to bot/agent projects.
2. **Always authenticate first.** Every command below assumes you have run `aws configure` (or `aws sso login`) and verified with `aws sts get-caller-identity`. [docs.aws.amazon.com/cli/latest/userguide/cli-configure-quickstart.html](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-quickstart.html)
3. **Region matters.** Most commands operate in your configured default region. Override per-command with `--region <region>`, or set globally with `export AWS_DEFAULT_REGION=us-east-1`.

---

## 1. IAM (`aws iam`) — Identity & Access Management

Every bot needs an execution role with least-privilege permissions.

### Roles

| Command | Purpose |
|---|---|
| `aws iam create-role --role-name <name> --assume-role-policy-document file://trust.json` | Create execution role for Lambda/ECS/EC2 bot |
| `aws iam get-role --role-name <name>` | Read role details including ARN |
| `aws iam list-roles` | List all roles |
| `aws iam update-role --role-name <name> --max-session-duration 7200` | Update role session duration |
| `aws iam update-assume-role-policy --role-name <name> --policy-document file://trust.json` | Update who can assume the role |
| `aws iam delete-role --role-name <name>` | Delete a role (must detach policies first) |

### Policies

| Command | Purpose |
|---|---|
| `aws iam create-policy --policy-name <name> --policy-document file://policy.json` | Create custom policy for bot permissions |
| `aws iam get-policy --policy-arn <arn>` | Read policy metadata |
| `aws iam get-policy-version --policy-arn <arn> --version-id v1` | Read actual policy document |
| `aws iam list-policies --scope Local` | List custom policies |
| `aws iam create-policy-version --policy-arn <arn> --policy-document file://policy.json --set-as-default` | Update policy (creates new version) |
| `aws iam delete-policy --policy-arn <arn>` | Delete policy |

### Attach/Detach Policies to Roles

| Command | Purpose |
|---|---|
| `aws iam attach-role-policy --role-name <name> --policy-arn <arn>` | Attach managed policy to role |
| `aws iam list-attached-role-policies --role-name <name>` | List policies on a role |
| `aws iam detach-role-policy --role-name <name> --policy-arn <arn>` | Remove policy from role |
| `aws iam put-role-policy --role-name <name> --policy-name <name> --policy-document file://policy.json` | Attach inline policy |
| `aws iam delete-role-policy --role-name <name> --policy-name <name>` | Delete inline policy |

### Instance Profiles (for EC2 bots)

| Command | Purpose |
|---|---|
| `aws iam create-instance-profile --instance-profile-name <name>` | Create instance profile for EC2 |
| `aws iam add-role-to-instance-profile --instance-profile-name <name> --role-name <name>` | Link role to instance profile |
| `aws iam remove-role-from-instance-profile --instance-profile-name <name> --role-name <name>` | Unlink role |
| `aws iam delete-instance-profile --instance-profile-name <name>` | Delete instance profile |

Reference: [docs.aws.amazon.com/cli/latest/reference/iam](https://docs.aws.amazon.com/cli/latest/reference/iam)

---

## 2. Lambda (`aws lambda`) — Serverless Bot Hosting

### Functions

| Command | Purpose |
|---|---|
| `aws lambda create-function --function-name <name> --runtime nodejs20.x --role <arn> --handler index.handler --zip-file fileb://function.zip` | Create bot function |
| `aws lambda get-function --function-name <name>` | Read function config and code location |
| `aws lambda get-function-configuration --function-name <name>` | Read runtime config only |
| `aws lambda list-functions` | List all functions |
| `aws lambda update-function-code --function-name <name> --zip-file fileb://function.zip` | Deploy new bot code |
