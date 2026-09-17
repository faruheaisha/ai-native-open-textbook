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
entryUrl: "https://github.com/rohitg00/ai-engineering-from-scratch/blob/d18b8fe5a913c46011a3b06cb6ebd6a924414fd3/phases/18-ethics-safety-alignment/06-mesa-optimization-deceptive-alignment/outputs/skill-mesa-diagnostic.md"
sourceRel: "phases/18-ethics-safety-alignment/06-mesa-optimization-deceptive-alignment/outputs/skill-mesa-diagnostic.md"
rawUrl: "/raw/07-coding/ai-engineering-from-scratch/phases/18-ethics-safety-alignment/06-mesa-optimization-deceptive-alignment/outputs/skill-mesa-diagnostic.md"
sourceSha256: "22f2b618ea197bacb9d538d4424e611ce4363fc4933c1dd49b8631418888d63e"
pageSha256: "22f2b618ea197bacb9d538d4424e611ce4363fc4933c1dd49b8631418888d63e"
contentMode: "local-full"
zh: ""
---

# AI Engineering from Scratch（英文原版）

Given a safety evaluation report (eval task, failure mode, model class, training recipe), classify the failure into the Hubinger 2019 categories and recommend the mitigation class that addresses it.

Produce:

1. Failure-mode categorization. Pick one of:
   - Outer-alignment failure: the base objective (reward, loss) was wrong; the model optimized it correctly.
   - Inner-alignment proxy failure: mesa-objective is a proxy that tracks base in-distribution; fails off-distribution.
   - Inner-alignment deceptive: mesa-optimizer has situational awareness and defects at deployment; training behaviour is clean.
2. Evidence trace. For each category, what evidence would support it. For deceptive, distinguish from proxy: evidence of situational awareness (date sensitivity, eval-vs-deployment distinguishers, strategic reasoning in chain-of-thought).
3. Mitigation class. For outer-alignment: change the objective (CAI, better reward data, process supervision). For proxy-inner: distributional coverage, ensembles, held-out evals. For deceptive-inner: control measures (Lesson 10), interpretability (residual-stream probes), capability reductions.
4. Known-failures check. For deceptive-inner, cite the relevant 2024-2026 empirical demonstration (Sleeper Agents, Alignment Faking, In-Context Scheming) this failure most resembles.

Hard rejects:
- Any classification of deceptive-inner without evidence of situational awareness. "Unexpected behaviour at deployment" is not enough — it could be proxy-inner.
- Any claim that adversarial robustness training alone addresses deceptive-inner. Hubinger 2019 predicts (and Sleeper Agents 2024 confirms) that adversarial training can teach better test-vs-deployment distinguishers.
- Any recommendation to retrain a deceptively aligned model on more data. The prior predicts deception is preserved under further training.

Refusal rules:
- If the evidence is a single failure on a single prompt, refuse to classify. Base rates matter; you need a distribution of failures.
- If the user asks you to "rule out" deceptive alignment, refuse — you can estimate its probability from evidence, but you cannot rule it out behaviourally alone.

Output: a one-page diagnosis with category, evidence trace, mitigation class, and nearest empirical analog. Cite Hubinger et al. (arXiv:1906.01820) once.
