---
title: "Assessment: Cloud Run to Container Apps"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-cloud-migrate/references/services/container-apps/cloudrun-assessment-guide.md"
sourceRel: ".github/plugins/azure-skills/skills/azure-cloud-migrate/references/services/container-apps/cloudrun-assessment-guide.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/azure-cloud-migrate/references/services/container-apps/cloudrun-assessment-guide.md"
sourceSha256: "e6f0219ec6872961bbad76096bc7f12f7ed133abf6e8b2016394954f4660f21c"
pageSha256: "e6f0219ec6872961bbad76096bc7f12f7ed133abf6e8b2016394954f4660f21c"
contentMode: "local-full"
zh: ""
---

# Assessment: Cloud Run to Container Apps

## Checklist

### 1. Service Configuration
- **CPU/Memory**: Cloud Run (1–4 vCPU, 128 MiB–32 GiB) → Container Apps (0.25–4 vCPU, 0.5–8 Gi)
- **Images**: Registry location (GCR or Artifact Registry), image size, base image
- **Port**: Exposed port (Cloud Run default 8080)
- **Environment Variables**: Static values, secret references, service URLs

### 2. Request Handling
- **Concurrency**: Per instance (default 80, max 1000) → Container Apps (1–300)
- **Min/Max Instances**: 0–1000 → Container Apps 0–300 per revision
- **Timeout**: Max 60 min → Container Apps max 30 min (1800s)
- **CPU Allocation**: Request-based vs always → Container Apps always allocated
- **HTTP/2, WebSockets, gRPC**: Document if used

### 3. Networking
- **Ingress**: Public, internal (VPC), or internal + load balancing
- **Custom Domains**: List domains and SSL certificates
- **VPC Connector**: Region, IP range, connected VPC
- **Dependencies**: Cloud SQL, Firestore, Cloud Storage, Pub/Sub, Redis, external APIs

### 4. IAM & Security
- **Service Account**: Default or custom
- **IAM Roles**: Storage, Firestore, Pub/Sub, Secret Manager, Cloud SQL permissions
- Task role policies → Managed Identity + Azure RBAC
- Secret Manager access → Key Vault RBAC (recommended) or access policies for vaults still using access-policy mode

### 5. Observability
- **Logging**: Destinations, structured logs (JSON)
- **Monitoring**: Request metrics, CPU/memory, instance count
- **Tracing**: Cloud Trace → Application Insights

### 6. Event-Driven
- **Eventarc**: Pub/Sub triggers, Cloud Storage triggers
- **Cloud Scheduler**: Schedule (cron), target endpoint

### 7. Cost Analysis
- Cloud Run: Request charges, CPU/memory time
- Data transfer egress charges
- Container Registry storage

## Resource Mapping

| Cloud Run Config | Container Apps Equivalent |
|------------------|--------------------------|
| `--concurrency 80` | `--scale-rule-http-concurrency 80` |
| `--min-instances 0` | `--min-replicas 0` |
| `--max-instances 10` | `--max-replicas 10` |
| `--cpu 1` | `--cpu 1.0` |
| `--memory 512Mi` | `--memory 1Gi` |
| `--port 8080` | `--target-port 8080` |
| `--timeout 300` | ingress timeout 300s |

## Complexity Rating

- **Low**: Single container, public ingress, standard env vars, no VPC
- **Medium**: Internal ingress, Pub/Sub triggers, custom service account, Cloud Scheduler
- **High**: Complex traffic management, VPC networking, multiple Eventarc triggers, long-running requests (>30 min)
