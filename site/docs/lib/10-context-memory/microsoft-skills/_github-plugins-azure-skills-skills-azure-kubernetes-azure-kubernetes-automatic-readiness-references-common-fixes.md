---
title: "Common Fix Patterns for AKS Automatic Compatibility"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-kubernetes/azure-kubernetes-automatic-readiness/references/common-fixes.md"
sourceRel: ".github/plugins/azure-skills/skills/azure-kubernetes/azure-kubernetes-automatic-readiness/references/common-fixes.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/azure-kubernetes/azure-kubernetes-automatic-readiness/references/common-fixes.md"
sourceSha256: "6197c9fdbc3efcc26ef8984803b8a1bcc464443a7b84420c8800e884602befd0"
pageSha256: "6197c9fdbc3efcc26ef8984803b8a1bcc464443a7b84420c8800e884602befd0"
contentMode: "local-full"
zh: ""
---

# Common Fix Patterns for AKS Automatic Compatibility

Loaded on demand when generating YAML fixes during assessment.
Maps to constraint IDs in `constraint-spec-v1.yaml`.

---

## `safeguard-container-resource-requests` — Add resource requests/limits

**Before:**
```yaml
containers:
  - name: web
    image: myapp:v1.0.0
```

**After:**
```yaml
containers:
  - name: web
    image: myapp:v1.0.0
    resources:
      requests:
        cpu: "250m"
        memory: "256Mi"
      limits:
        cpu: "500m"
        memory: "512Mi"
```

> 💡 **Tip:** Use safe minimums as starting values. VPA (auto-enabled on AKS Automatic) will tune these after deployment based on actual usage.

---

## `safeguard-container-capabilities` — Drop all capabilities

**Before:**
```yaml
securityContext:
  capabilities:
    add: ["NET_ADMIN"]
```

**After:**
```yaml
securityContext:
  capabilities:
    drop: ["ALL"]
```

> ⚠️ **Warning:** If the app genuinely requires `NET_ADMIN` or similar, it is **incompatible** with AKS Automatic. Do not silently drop — explain the incompatibility and suggest redesign.

---

## `safeguard-allowed-seccomp-profiles` — Add seccomp profile

**Before:**
```yaml
spec:
  containers:
    - name: web
```

**After:**
```yaml
spec:
  securityContext:
    seccompProfile:
      type: RuntimeDefault
  containers:
    - name: web
```

---

## `safeguard-allowed-seccomp-profiles` — Remove 'Unconfined' seccomp profile

**Before:**
```yaml
spec:
  securityContext:
    seccompProfile:
      type: Unconfined
  containers:
    - name: web
```

**After:**
```yaml
spec:
  containers:
    - name: web
```

---

## `safeguard-enforce-apparmor` — Add AppArmor annotation

**Before:**
```yaml
metadata:
  name: my-deployment
```

**After:**
```yaml
metadata:
  name: my-deployment
  annotations:
    container.apparmor.security.beta.kubernetes.io/web: runtime/default
```

> 💡 **Tip:** Replace `web` with the actual container name. Add one annotation per container.

---

## `safeguard-images-no-latest` — Pin image tag *(LLM-reasoned — ask user)*

**Before:**
```yaml
image: myapp:latest
```

**After:**
```yaml
image: myapp:v1.2.3   # ← version confirmed with user
```

> ⚠️ **Warning:** Do not guess the version. Ask the user: _"What specific version tag or SHA digest should I pin this image to?"_ If from a public registry, suggest checking Docker Hub or the registry for the latest stable tag.

---

## `safeguard-probes-configured` — Add probes *(best-practice recommendation — warning-only, not blocked at admission)*

**HTTP app (most common):**
```yaml
readinessProbe:
  httpGet:
    path: /healthz        # ← ask user for their health endpoint
    port: 8080            # ← ask user for port
  initialDelaySeconds: 5
  periodSeconds: 10
  failureThreshold: 3
livenessProbe:
  httpGet:
    path: /healthz
    port: 8080
  initialDelaySeconds: 15
  periodSeconds: 20
  failureThreshold: 3
```

**TCP-only app (databases, Redis, etc.):**
```yaml
readinessProbe:
  tcpSocket:
    port: 6379           # ← service port
  initialDelaySeconds: 5
  periodSeconds: 10
livenessProbe:
  tcpSocket:
    port: 6379
  initialDelaySeconds: 15
  periodSeconds: 20
```

**gRPC app:**
```yaml
readinessProbe:
  grpc:
    port: 50051
  initialDelaySeconds: 5
  periodSeconds: 10
```

---

## `safeguard-host-probes` — Remove host field in probes and lifecycle hooks

**Before:**
```yaml
spec:
  containers:
  - name: my-container
    image: nginx:v1.2.3
    livenessProbe:
      httpGet:
        host: "my-host"
        path: /healthz
        port: 8080
      initialDelaySeconds: 15
      periodSeconds: 20
      failureThreshold: 3
```

**After:**
Remove the `host` field
Example:
```yaml
spec:
  containers:
  - name: my-container
    image: nginx:v1.2.3
    livenessProbe:
      httpGet:
        path: /healthz
        port: 8080
      initialDelaySeconds: 15
      periodSeconds: 20
      failureThreshold: 3
```

---

## `safeguard-pod-enforce-antiaffinity` — Add topology spread *(LLM-reasoned — ask user for label)*

Ask user: _"What label key/value identifies your workload's pods?"_

```yaml
spec:
  template:
    spec:
      topologySpreadConstraints:
        - maxSkew: 1
          topologyKey: kubernetes.io/hostname
          whenUnsatisfiable: DoNotSchedule
          labelSelector:
            matchLabels:
