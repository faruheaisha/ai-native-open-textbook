---
title: "AKS Deployment Safeguards Reference"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-kubernetes/azure-kubernetes-app-deploy/references/safeguards.md"
sourceRel: ".github/plugins/azure-skills/skills/azure-kubernetes/azure-kubernetes-app-deploy/references/safeguards.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/azure-kubernetes/azure-kubernetes-app-deploy/references/safeguards.md"
sourceSha256: "9f7894df0940a5c839cf8c5fb08d1f0d683d9b9b106e36157d6e91e9c1d8a813"
pageSha256: "9f7894df0940a5c839cf8c5fb08d1f0d683d9b9b106e36157d6e91e9c1d8a813"
contentMode: "local-full"
zh: ""
---

# AKS Deployment Safeguards Reference

> **Source of truth:** the Deployment Safeguards policy initiative is defined
> once in
> `../../azure-kubernetes-automatic-readiness/references/constraint-spec-v1.yaml`
> (initiative `c047ea8e-…`). This file is the **deploy-time checklist**: which
> rules the app-deploy workflow auto-fixes vs. warns on, and how. When the
> policy set changes, update the constraint spec; only the app-deploy-specific
> fix behavior below is maintained here.

This checklist maps each safeguard to how the quick-deploy workflow handles it.

## DS001 — Resource Limits Required (Error)

Every container needs `resources.requests` AND `resources.limits` for both `cpu` and `memory`.

## DS002 — Liveness Probe Required (Warning)

Every container needs a `livenessProbe`. Use `httpGet`, `tcpSocket`, or `exec`.

## DS003 — Readiness Probe Required (Warning)

Every container needs a `readinessProbe`.

## DS004 — runAsNonRoot Required (Error)

Set at **both** pod and container level.

## DS005 — No hostNetwork (Error)

Remove `hostNetwork: true` or set to `false`.

## DS006 — No hostPID (Error)

Remove `hostPID: true` or set to `false`.

## DS007 — No hostIPC (Error)

Remove `hostIPC: true` or set to `false`.

## DS008 — No Privileged Containers (Error)

Remove `securityContext.privileged: true` or set to `false`.

## DS009 — No :latest Image Tag (Error, NOT auto-fixable)

Use a semantic version, git SHA, or digest — never `:latest` or omit the tag.

## DS010 — Minimum 2 Replicas (Warning)

Set `spec.replicas: 2` or higher. Pair with a PodDisruptionBudget.

## DS011 — allowPrivilegeEscalation: false (Error)

Every container must set `securityContext.allowPrivilegeEscalation: false`.

## DS012 — readOnlyRootFilesystem: true (Warning)

Every container must set `securityContext.readOnlyRootFilesystem: true`.

If the app writes to specific paths, mount `emptyDir` volumes:

```yaml
volumes:
  - name: tmp
    emptyDir: {}
containers:
  - volumeMounts:
      - name: tmp
        mountPath: /tmp
```

Common writable paths: Spring Boot `/tmp`, ASP.NET `/tmp`, Django `/tmp`, Express `/tmp`, Go `/tmp`.

## DS013 — automountServiceAccountToken: false (Warning)

Set `spec.automountServiceAccountToken: false`. Set to `true` only if the app genuinely calls the K8s API (scope with RBAC).

---

## Quick Reference

| Rule | What | Severity | Auto-Fix |
|------|------|----------|----------|
| DS001 | Resource limits | Error | Yes |
| DS002 | Liveness probe | Warning | Yes |
| DS003 | Readiness probe | Warning | Yes |
| DS004 | runAsNonRoot | Error | Yes |
| DS005 | No hostNetwork | Error | Yes |
| DS006 | No hostPID | Error | Yes |
| DS007 | No hostIPC | Error | Yes |
| DS008 | No privileged | Error | Yes |
| DS009 | No :latest tag | Error | No |
| DS010 | Min 2 replicas | Warning | Yes |
| DS011 | No privilege escalation | Error | Yes |
| DS012 | Read-only root FS | Warning | Yes |
| DS013 | No SA token mount | Warning | Yes |
