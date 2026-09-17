---
title: "Architecture Planning"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-prepare/references/architecture.md"
sourceRel: ".github/plugins/azure-skills/skills/azure-prepare/references/architecture.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/azure-prepare/references/architecture.md"
sourceSha256: "d2297fade99ce38a80c5ce65d368e8f9427c8e6515c64ea714aa3b4cc6d322fd"
pageSha256: "d2297fade99ce38a80c5ce65d368e8f9427c8e6515c64ea714aa3b4cc6d322fd"
contentMode: "local-full"
zh: ""
---

# Architecture Planning

Select hosting stack and map components to Azure services.

## Stack Selection

| Stack           | Best For                                               | Azure Services                    |
| --------------- | ------------------------------------------------------ | --------------------------------- |
| **Containers**  | Docker experience, complex dependencies, microservices | Container Apps, AKS, ACR          |
| **Serverless**  | Event-driven, variable traffic, cost optimization      | Functions, Logic Apps, Event Grid |
| **App Service** | Traditional web apps, PaaS preference                  | App Service, Static Web Apps      |

### Decision Factors

| Factor                   | Containers |          Serverless          | App Service |
| ------------------------ | :--------: | :--------------------------: | :---------: |
| Docker experience        |     ✓✓     |                              |             |
| Event-driven             |     ✓      |              ✓✓              |             |
| Variable traffic         |            |              ✓✓              |      ✓      |
| Complex dependencies     |     ✓✓     |                              |      ✓      |
| Long-running processes   |     ✓✓     |    ✓ (Durable Functions)     |      ✓      |
| Workflow / orchestration |            | ✓✓ (Durable Functions + DTS) |             |
| Minimal ops overhead     |            |              ✓✓              |      ✓      |

### Container Hosting: Container Apps vs AKS

| Factor                    |       Container Apps        |                 AKS                 |
| ------------------------- | :-------------------------: | :---------------------------------: |
| **Scale to zero**         |             ✓✓              |                                     |
| **Kubernetes API access** |                             |                 ✓✓                  |
| **Custom operators/CRDs** |                             |                 ✓✓                  |
| **Service mesh**          |       Dapr (built-in)       |                Istio                |
| **Networking/dataplane**  |  Managed platform defaults  |     Azure CNI powered by Cilium     |
| **GPU workloads**         |                             |                 ✓✓                  |
| **Best for**              | Microservices, event-driven | Full K8s control, complex workloads |

#### When to Use Container Apps

- Microservices without Kubernetes complexity
- Event-driven workloads (KEDA built-in)
- Need scale-to-zero for cost optimization
- Teams without Kubernetes expertise

#### When to Use AKS

- Need Kubernetes API/kubectl access
- Require custom operators or CRDs
- Service mesh requirements (Istio, Linkerd)
- GPU/ML workloads
- Complex networking or multi-tenant architectures

> **AKS Planning:** For AKS SKU selection (Automatic vs Standard), networking, identity, scaling, and security configuration, invoke the **azure-kubernetes** skill.

## Service Mapping

### Hosting

| Component Type           | Primary Service   | Alternatives                                     |
| ------------------------ | ----------------- | ------------------------------------------------ |
| SPA Frontend             | Static Web Apps   | Blob + CDN                                       |
| SSR Web App              | Container Apps    | App Service, AKS                                 |
| REST/GraphQL API         | Container Apps    | App Service, Functions, AKS                      |
| Background Worker        | Container Apps    | Functions, AKS                                   |
| Scheduled Task           | Functions (Timer) | Container Apps Jobs, Kubernetes CronJob (on AKS) |
| Event Processor          | Functions         | Container Apps, AKS + KEDA                       |
| Microservices (full K8s) | AKS               | Container Apps                                   |
| GPU/ML Workloads         | AKS               | Azure ML                                         |

### Data

| Need       | Primary      | Reference                                       | Alternatives      |
| ---------- | ------------ | ----------------------------------------------- | ----------------- |
| Relational | Azure SQL    | [SQL Database](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-prepare-references-services-sql-database) | PostgreSQL, MySQL |
| Document   | Cosmos DB    | [Cosmos DB](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-prepare-references-services-cosmos-db)       | MongoDB           |
| Cache      | Redis Cache  |                                                 |                   |
| Files      | Blob Storage | [Storage](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-prepare-references-services-storage)           | Files Storage     |
| Search     | AI Search    |                                                 |                   |

### Integration

| Need          | Service     |
| ------------- | ----------- |
| Message Queue | Service Bus |
| Pub/Sub       | Event Grid  |
| Streaming     | Event Hubs  |

### Workflow & Orchestration

| Need                                | Service                                        | Notes                                                                                                                                                       |
| ----------------------------------- | ---------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Multi-step workflow / orchestration | **Durable Functions + Durable Task Scheduler** | DTS is the **required** managed backend for Durable Functions. Do NOT use Azure Storage or MSSQL backends. See [durable.md](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-prepare-references-services-functions-durable). |
| Low-code / visual workflow          | Logic Apps                                     | For integration-heavy, low-code scenarios                                                                                                                   |

### Supporting (Always Include)

| Service              | Purpose                 |
| -------------------- | ----------------------- |
| Log Analytics        | Centralized logging     |
| Application Insights | Monitoring, APM         |
| Key Vault            | Secrets management      |
| Managed Identity     | Service-to-service auth |

---

## Document Architecture

Record selections in `.azure/deployment-plan.md` with rationale for each choice.
