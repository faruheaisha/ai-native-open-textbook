---
title: "Runbook: OOMKilled / OutOfMemoryError"
sourceId: "08-agents/anthropic-cookbook"
sourceTitle: "Claude Cookbooks"
sourceKind: "官方资料集"
licenseLabel: "可转载"
lang: "英文"
tier: 1
volume: "08-agents"
sourceUrl: "https://github.com/anthropics/anthropic-cookbook"
entryUrl: "https://github.com/anthropics/anthropic-cookbook/blob/a97b9a2dc300635f0c26b5e05d0b54bbe0279ee5/managed_agents/example_data/sre/runbooks/oom.md"
sourceRel: "managed_agents/example_data/sre/runbooks/oom.md"
rawUrl: "/raw/08-agents/anthropic-cookbook/managed_agents/example_data/sre/runbooks/oom.md"
sourceSha256: "1e542dfd9a5f7803037829ee754f2e4aedce45b109c8199b6a3d999909ef9366"
pageSha256: "1e542dfd9a5f7803037829ee754f2e4aedce45b109c8199b6a3d999909ef9366"
contentMode: "local-full"
zh: ""
---

# Runbook: OOMKilled / OutOfMemoryError

**Symptom:** container exits 137, `OOMKilled` in pod events, heap-exhausted
errors in application logs.

**Triage:**

1. Confirm the kill is the kubelet OOM killer (exit 137) and not an
   application-level limit.
2. Open the deployment manifest under `infra/k8s/<service>-deploy.yaml`
   and check `spec.template.spec.containers[].resources.limits.memory`.
3. If the limit is below the service's documented working set (checkout-svc
   needs ~400Mi after the pricing cache warms), raise the limit. 512Mi is
   the standard next tier.
4. Keep `requests.memory` at or below the new limit.

**Fix:** open a PR against the infra repo with the corrected limit. Do not
hot-patch the live deployment.
