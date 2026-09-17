---
title: "Operationalize Support (1 - 60)"
sourceId: "09-harness/better-harness"
sourceTitle: "Better Harness（QoderAI）"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "09-harness"
sourceUrl: "https://github.com/QoderAI/better-harness"
entryUrl: "https://github.com/QoderAI/better-harness/blob/e1538c15a98856b3349f365d951f4fa0bcc33f24/skills/better-harness/references/support-operationalize.md"
sourceRel: "skills/better-harness/references/support-operationalize.md"
rawUrl: "/raw/09-harness/better-harness/skills/better-harness/references/support-operationalize.md"
sourceSha256: "29307a9a77119980acc25e1e2c697df9e939ab406d501571c7909be5c4fec585"
pageSha256: "29307a9a77119980acc25e1e2c697df9e939ab406d501571c7909be5c4fec585"
contentMode: "local-full"
zh: ""
---

# Operationalize Support (1 -> 60)

Use this track only after the lead freezes findings and dimension scores. The
range in the title describes a user journey, not a score band. This is the
normal route when useful mechanisms exist but supported evidence shows they are
not yet wired into ordinary work or exercised through an observable result.

## Select This Track

Select Operationalize when at least one relevant project or agent mechanism is
present and retained findings establish a `Present -> Wired -> Exercised` gap.
Examples include a documented check with no task route, a runnable command with
no acceptance boundary, or a configured asset with no observed invocation.

Do not select it from counts, a middling score, or missing Session coverage. Use
[Project Harness Evidence](/lib/09-harness/better-harness/skills-better-harness-references-project-harness),
[Agent Customize Evidence](/lib/09-harness/better-harness/skills-better-harness-references-agent-customize), and
[Findings Quality Gates](/lib/09-harness/better-harness/skills-better-harness-references-findings-review) as the canonical owners; do not
duplicate their evidence or eligibility rules here.

## Shape the Recommendation

Prioritize the smallest supported move that advances one real mechanism by one
observable state:

1. connect a present owner to the task entrypoint where an agent needs it;
2. expose the exact command, trigger, or decision boundary;
3. add the cheapest representative verifier and expected result; and
4. name failure, reset, recovery, or escalation behavior when the action has a
   meaningful side effect.

Choose the durable owner from the target rather than naming a fashionable tool.
Use the
[Project Capability Artifact Examples](https://github.com/QoderAI/better-harness/blob/e1538c15a98856b3349f365d951f4fa0bcc33f24/case-studies/project-harness/project-capability-artifact-examples.md)
to calibrate `Document`, `Rule`, `Skill`, `Hook`, `Script`, `Test`, `Config`,
`MCP`, or `Code` outputs. Treat these as labels, not evidence that an artifact
is needed.

Each priority move must remain attached to a retained finding and state the
observable end state, smallest owner, verifier, and recovery or approval
boundary. Prefer extending an existing route over introducing a parallel owner.

## Preserve Boundaries

Do not create a new finding, change severity, or rescore a dimension because a
track was selected. Do not claim a mechanism is exercised from presence or
configuration alone. Finding-bound mutation and independent reassessment remain
owned by [Finding-bound Fix](/lib/09-harness/better-harness/skills-better-harness-references-finding-bound-fix).
