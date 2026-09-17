---
title: "Quick Deploy"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-kubernetes/azure-kubernetes-app-deploy/phases/quick-deploy.md"
sourceRel: ".github/plugins/azure-skills/skills/azure-kubernetes/azure-kubernetes-app-deploy/phases/quick-deploy.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/azure-kubernetes/azure-kubernetes-app-deploy/phases/quick-deploy.md"
sourceSha256: "3203e42fd195104c188e585146994f2d88cb7474250623abbb145360c492d737"
pageSha256: "3203e42fd195104c188e585146994f2d88cb7474250623abbb145360c492d737"
contentMode: "local-full"
zh: ""
---

# Quick Deploy

Deploy an application to an existing AKS cluster with production-grade artifacts.

## Section 1: Detection

Scan the project and Azure environment. Ask at most one clarifying question if genuinely ambiguous (multiple Dockerfiles, ACRs, or identities).

### Framework Detection

Follow the framework detection table in `references/detection.md`. Scan for signal files at the project root (and one level deep for monorepos).

### Port and Health Endpoint Detection

Follow the port and health endpoint detection tables in `references/detection.md` (first match wins). If none found, use `/health` as default in probes.

### Existing Artifact Detection

Check for existing `Dockerfile` and `k8s/` (or `manifests/`, `deploy/`) directories.

### Azure Infrastructure Detection

```bash
kubectl config current-context
az aks show -g <rg> -n <cluster> -o json
```

Extract from cluster details:
- **AKS flavor**: `nodeProvisioningProfile.mode` — `"Auto"` = AKS Automatic, otherwise Standard
- **OIDC issuer**: `oidcIssuerProfile.issuerUrl`
- **Azure RBAC**: `aadProfile.enableAzureRBAC`

### Routing Detection

```bash
az aks show -g <rg> -n <cluster> --query '{webAppRoutingEnabled: ingressProfile.webAppRouting.enabled, istioMode: serviceMeshProfile.istio.mode}' -o json
```

- If `webAppRoutingEnabled` is not `true`, stop with error: `az aks approuting enable -g <rg> -n <cluster>`
- If `istioMode` is `"Enabled"` → use **Gateway API** (`gateway.yaml` + `httproute.yaml`, `gatewayClassName: istio`)
- Otherwise → use **Ingress** (`ingress.yaml`, `ingressClassName: webapprouting.kubernetes.azure.com`)

```bash
az acr list -g <rg> -o json
az identity list -g <rg> -o json
```

### ACR-AKS Integration

Verify the AKS kubelet identity can pull images from the detected ACR:

```bash
