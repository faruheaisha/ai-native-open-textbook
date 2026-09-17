---
title: "AI Engineering from Scratch（英文原版）"
sourceId: "07-coding/ai-engineering-from-scratch"
sourceTitle: "AI Engineering from Scratch（英文原版）"
sourceKind: "源码研读"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "07-coding"
sourceUrl: "https://github.com/rohitg00/ai-engineering-from-scratch"
entryUrl: "https://github.com/rohitg00/ai-engineering-from-scratch/blob/d18b8fe5a913c46011a3b06cb6ebd6a924414fd3/phases/17-infrastructure-and-production/23-sre-for-ai/outputs/skill-ai-sre-plan.md"
sourceRel: "phases/17-infrastructure-and-production/23-sre-for-ai/outputs/skill-ai-sre-plan.md"
rawUrl: "/raw/07-coding/ai-engineering-from-scratch/phases/17-infrastructure-and-production/23-sre-for-ai/outputs/skill-ai-sre-plan.md"
sourceSha256: "39a72339eb91c321ed1e33f6aafc585fb9448bc49e38016462599ad96b1de96e"
pageSha256: "39a72339eb91c321ed1e33f6aafc585fb9448bc49e38016462599ad96b1de96e"
contentMode: "local-full"
zh: ""
---

# AI Engineering from Scratch（英文原版）

Given team size, incident volume, observability maturity, and risk tolerance, produce an AI SRE plan.

Produce:

1. Architecture. Multi-agent: supervisor + log agent + metric agent + runbook agent + human gate. Match specialized agents to existing data sources (Datadog, Grafana, Loki, Confluence).
2. Runbook transformation. Move from unstructured Confluence to structured markdown with symptom / hypothesis / verify / act sections. Version in git.
3. Product choice. Datadog Bits AI, Azure SRE Agent, NeuBird Hawkeye, Incident.io Autopilot, or DIY.
4. Auto-remediation scope. Narrow safe set (restart pod, revert deploy, scale within bounds). Explicit deny list (topology, code, IAM, database). Policy as code.
5. Adversarial evaluation. Specify two-model agreement gate for auto-remediation. Disagreement escalates.
6. Predictive-detection posture. If considering (MIT 89% result), name the actuation policy — pager, pre-drain, auto-scale — otherwise it's just a dashboard.

Hard rejects:
- Auto-remediation without human gate on broad changes. Refuse — name the safe set explicitly.
- Unstructured runbooks as the knowledge base. Refuse — require structured, versioned markdown.
- "Set it and forget it" framing. Refuse — explicitly scope what is and isn't autonomous.

Refusal rules:
- If incident volume is <10/month, refuse full AI SRE rollout — cost exceeds benefit. Recommend structured runbooks only.
- If team observability is immature (logs unsearchable, metrics sparse), refuse — AI SRE amplifies bad data.
- If the team proposes "predictive detection → auto-remediation" as first feature, refuse — walk through the actuation-policy question first.

Output: a one-page plan with architecture, runbook plan, product choice, auto-remediation scope, adversarial gate, predictive posture. End with a 12-week rollout schedule: weeks 1-4 structured runbooks, 5-8 triage agent, 9-12 narrow auto-remediation.
