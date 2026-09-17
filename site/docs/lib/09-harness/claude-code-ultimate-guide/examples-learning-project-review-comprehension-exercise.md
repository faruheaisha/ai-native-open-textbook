---
title: "Explain, perturb, diagnose, escalate"
sourceId: "09-harness/claude-code-ultimate-guide"
sourceTitle: "Claude Code Ultimate Guide"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://github.com/FlorianBruniaux/claude-code-ultimate-guide"
entryUrl: "https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/examples/learning-project/review-comprehension-exercise.md"
sourceRel: "examples/learning-project/review-comprehension-exercise.md"
rawUrl: "/raw/09-harness/claude-code-ultimate-guide/examples/learning-project/review-comprehension-exercise.md"
sourceSha256: "cd67b0e1b40fb7412b2109967789609c3813d9b5e91e8cae1875980f3f10c2f9"
pageSha256: "cd67b0e1b40fb7412b2109967789609c3813d9b5e91e8cae1875980f3f10c2f9"
contentMode: "local-full"
zh: ""
---

# Explain, perturb, diagnose, escalate

Use a disposable local exercise with synthetic data and a known behavior. This worksheet proposes an assessment; it has not established that review-based training produces the same learning as writing code.

1. **Explain.** Before asking an assistant, describe the input, output, invariant and one boundary case of a small change. The mentor records mistakes and prompts needed.
2. **Perturb.** The mentor changes one assumption, such as an empty input or a duplicate identifier. Predict the result, then run a relevant check. Distinguish a wrong prediction from a broken test environment.
3. **Diagnose.** Investigate one seeded defect. Produce reproduction steps, a causal explanation and a minimal correction. An assistant may be enabled for this round, but record its interventions separately from the learner's reasoning.
4. **Escalate.** Introduce a requirement outside the agreed scope, such as a change to authorization. The learner must identify the missing decision and request the appropriate review rather than silently broaden the patch.

| Observation | Independent | With prompt/help | Not demonstrated |
|---|---|---|---|
| Explains the invariant and its source | | | |
| Predicts the changed boundary case | | | |
| Reproduces and diagnoses the defect | | | |
| Identifies an authority or knowledge boundary | | | |

Repeat with a different but comparable task and reverse assisted/unassisted order across learners where practical. Record prior familiarity and mentor interventions. Do not reuse the same solution as proof of transfer. A correct escalation is a successful boundary decision, not a failed coding task.

Save the assessment separately from delivery metrics. A merged change does not establish independent understanding, and one exercise does not qualify someone for unrestricted production access.
