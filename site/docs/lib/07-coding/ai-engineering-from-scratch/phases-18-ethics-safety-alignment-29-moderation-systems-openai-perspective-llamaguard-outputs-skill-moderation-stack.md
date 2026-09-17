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
entryUrl: "https://github.com/rohitg00/ai-engineering-from-scratch/blob/d18b8fe5a913c46011a3b06cb6ebd6a924414fd3/phases/18-ethics-safety-alignment/29-moderation-systems-openai-perspective-llamaguard/outputs/skill-moderation-stack.md"
sourceRel: "phases/18-ethics-safety-alignment/29-moderation-systems-openai-perspective-llamaguard/outputs/skill-moderation-stack.md"
rawUrl: "/raw/07-coding/ai-engineering-from-scratch/phases/18-ethics-safety-alignment/29-moderation-systems-openai-perspective-llamaguard/outputs/skill-moderation-stack.md"
sourceSha256: "4272b4eb109f656f5ff37d9e88efef47e50922ba430ea1c306a0ba431b9b6cb1"
pageSha256: "4272b4eb109f656f5ff37d9e88efef47e50922ba430ea1c306a0ba431b9b6cb1"
contentMode: "local-full"
zh: ""
---

# AI Engineering from Scratch（英文原版）

Given a production deployment, recommend a moderation stack configuration across the three layers.

Produce:

1. Input classifier. Choose OpenAI Moderation, Llama Guard 3/4, or Perspective API. Match to policy taxonomy. For multimodal deployments, Llama Guard 4 or OpenAI omni-moderation.
2. Output classifier. Same or different from input classifier. Match thresholds to the downstream risk model.
3. Custom domain rules. Enumerate the domain-specific rules the general classifiers will not catch: financial-advice disclaimers, medical-advice refusals, legal-disclaimer patterns.
4. Judge for edge cases. Specify the human-escalation path. Hard refusals are final; ambiguous cases go to human review within SLA.
5. Migration plan. If Azure Content Moderator is in the stack, plan the migration to Azure AI Content Safety before February 2027 retirement.

Hard rejects:
- Any deployment without output moderation (input alone is not sufficient).
- Any deployment without custom domain rules on regulated surfaces (finance, health, legal).
- Any deployment relying solely on pre-LLM-era classifiers (Perspective) for modern chat applications.

Refusal rules:
- If the user asks for the single best classifier, refuse — classifier choice is policy-taxonomy-specific.
- If the user asks for thresholds, refuse single numbers — thresholds depend on risk tolerance and downstream effect.

Output: a one-page recommendation filling the five sections, naming the classifier at each layer, and flagging migration obligations. Cite OpenAI Moderation docs and Llama Guard 3/4 references once each.
