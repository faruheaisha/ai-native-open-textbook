---
title: "AWS Fargate to Azure Container Apps Migration"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-cloud-migrate/references/services/container-apps/fargate-to-container-apps.md"
sourceRel: ".github/plugins/azure-skills/skills/azure-cloud-migrate/references/services/container-apps/fargate-to-container-apps.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/azure-cloud-migrate/references/services/container-apps/fargate-to-container-apps.md"
sourceSha256: "3a79869b62430da7a65581b6315561b6fa9a3950e34643580e7819d9f9337d41"
pageSha256: "3a79869b62430da7a65581b6315561b6fa9a3950e34643580e7819d9f9337d41"
contentMode: "local-full"
zh: ""
---

# AWS Fargate to Azure Container Apps Migration

Guidance for migrating AWS Fargate (ECS) containerized workloads to Azure Container Apps.

## Overview

| AWS Service | Azure Equivalent | Notes |
|-------------|------------------|-------|
| ECS Fargate | Azure Container Apps | Serverless container platform |
| ECR | Azure Container Registry | Private container registry |
| Application Load Balancer | Container Apps Ingress | Built-in HTTPS |
| AWS Secrets Manager | Azure Key Vault | Managed identity integration |
| CloudWatch Logs | Azure Monitor/Log Analytics | Requires Log Analytics workspace on environment |
| CloudWatch Metrics | Azure Monitor Metrics | Available without Log Analytics workspace |
| IAM Roles (tasks) | Managed Identity | Microsoft Entra ID integration |
| VPC | Virtual Network | VNet integration |
| Security Groups | NSG + Container Apps rules | Network security |
| Auto Scaling | Container Apps scaling rules | HTTP, CPU, memory, custom |
| Parameter Store | App Configuration or Key Vault | Configuration management |

## Critical Differences

| Feature | AWS Fargate | Container Apps | Impact |
|---------|-------------|----------------|--------|
| Max vCPU | 16 vCPU | 4 vCPU (Consumption Plan) | Split CPU-intensive tasks |
| Max Memory | 120 GiB | 8 GiB (Consumption Plan) | Redesign memory-heavy workloads |
| GPU | Available (ECS) | Supported (preview) | Validate GPU SKU availability |
| Sidecar Containers | Supported (ECS) | Supported (init + sidecar) | Compatible pattern |
| Task Placement | Placement strategies/constraints | No node-level control | Remove placement logic |
| Persistent Storage | EFS mounts | Azure Files only | Migrate to Azure Files or Blob |
| Max Replicas | Service-dependent | 300 per revision | Validate scale requirements |
| Networking | VPC + Security Groups | VNet + NSG | Subnet-level isolation |
| Startup Timeout | No platform limit | 240s default | Optimize startup time |

## Migration Workflow

1. **Assess** — Analyze ECS task definitions, IAM roles, VPC config → [fargate-assessment-guide.md](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-cloud-migrate-references-services-container-apps-fargate-assessment-guide)
2. **Migrate Images** — Pull from ECR, push to ACR
3. **Map Services** — Convert AWS dependencies to Azure equivalents
4. **Convert Config** — Transform task definitions to Container Apps CLI flags
5. **Deploy** — Create Container Apps environment and deploy → [fargate-deployment-guide.md](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-cloud-migrate-references-services-container-apps-fargate-deployment-guide)
6. **Validate** — Health checks, scaling, monitoring

## Service Dependency Mappings

| AWS Service | Azure Equivalent | Notes |
|-------------|------------------|-------|
| S3 | Azure Blob Storage | SDK change (boto3 → azure-storage-blob) |
| DynamoDB | Azure Cosmos DB | API compatibility or code changes |
| SQS | Azure Service Bus / Queue Storage | SDK change |
| SNS | Azure Event Grid / Service Bus Topics | SDK change |
| RDS | Azure Database for PostgreSQL/MySQL/SQL | Connection string + managed identity |
| ElastiCache (Redis) | Azure Cache for Redis | Connection string update |
| Parameter Store | Azure App Configuration / Key Vault | SDK change |
| EventBridge | Azure Event Grid | SDK change required |
| Step Functions | Azure Logic Apps / Durable Functions | Workflow redesign |
| Kinesis | Azure Event Hubs | SDK change required |
| X-Ray | Application Insights | Requires SDK + connection string setup |
| CloudWatch Logs | Azure Monitor Logs | Requires Log Analytics workspace on environment |

## Resource Mapping

See [Resource Mapping](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-cloud-migrate-references-services-container-apps-fargate-assessment-guide#resource-mapping) in the assessment guide for the canonical ECS-to-Container-Apps resource mapping table.

## Reference Links

- [Azure Container Apps overview](https://learn.microsoft.com/azure/container-apps/overview)
- [AWS to Azure services comparison](https://learn.microsoft.com/azure/architecture/aws-professional/services)
- [Container Apps scaling](https://learn.microsoft.com/azure/container-apps/scale-app)
- [Container Apps managed identity](https://learn.microsoft.com/azure/container-apps/managed-identity)
