---
title: "Deploy to AKS"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-kubernetes/azure-kubernetes-app-deploy/SKILL.md"
sourceRel: ".github/plugins/azure-skills/skills/azure-kubernetes/azure-kubernetes-app-deploy/SKILL.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/azure-kubernetes/azure-kubernetes-app-deploy/SKILL.md"
sourceSha256: "d29b307591886cde7841ff3cdb5509fbee2f66ffeb8c14dc88fd2e9a0a6f8dbe"
pageSha256: "d29b307591886cde7841ff3cdb5509fbee2f66ffeb8c14dc88fd2e9a0a6f8dbe"
contentMode: "local-full"
zh: ""
---

# Deploy to AKS

**Use when:** deploying a web app/API to AKS; containerizing for Kubernetes; generating manifests; AKS CI/CD; DS001–DS013 failures.

**Not for:** provisioning clusters (`azure-kubernetes`), AKS Automatic readiness (`azure-kubernetes-automatic-readiness`), non-AKS targets.

## Workflow

Requires: existing AKS cluster, `az login`, `kubectl` configured. Follow `phases/quick-deploy.md`. On failure: `references/rollback.md`.

## References

- [detection.md](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-kubernetes-azure-kubernetes-app-deploy-references-detection) — framework/port/health detection
- [safeguards.md](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-kubernetes-azure-kubernetes-app-deploy-references-safeguards) — DS001-DS013 checklist
- [workload-identity.md](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-kubernetes-azure-kubernetes-app-deploy-references-workload-identity) — Workload Identity setup
- [rollback.md](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-kubernetes-azure-kubernetes-app-deploy-references-rollback) — recovery procedures
- [base-images.md](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-kubernetes-azure-kubernetes-app-deploy-references-base-images) — base image policy and `<LATEST_STABLE_*>` resolution

## Knowledge Packs

Load `knowledge-packs/frameworks/<framework>.md` per detected framework. Available: `spring-boot`, `express`, `nextjs`, `fastapi`, `django`, `nestjs`, `aspnet-core`, `go`, `flask`

## Templates

`templates/` (dockerfiles/, k8s/, github-actions/, mermaid/).
