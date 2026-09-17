---
title: "AI 工程从零到一（中文）"
sourceId: "07-coding/ai-engineering-from-scratch-zh"
sourceTitle: "AI 工程从零到一（中文）"
sourceKind: "源码研读"
licenseLabel: "可转载"
lang: "中文"
tier: 1
volume: "07-coding"
sourceUrl: "https://github.com/fancyboi999/ai-engineering-from-scratch-zh"
entryUrl: "https://github.com/fancyboi999/ai-engineering-from-scratch-zh/blob/109181ce68128c1bf27ec20867177007a8bace89/phases/16-multi-agent-and-swarms/20-marl-maddpg-qmix-mappo/outputs/skill-marl-picker.md"
sourceRel: "phases/16-multi-agent-and-swarms/20-marl-maddpg-qmix-mappo/outputs/skill-marl-picker.md"
rawUrl: "/raw/07-coding/ai-engineering-from-scratch-zh/phases/16-multi-agent-and-swarms/20-marl-maddpg-qmix-mappo/outputs/skill-marl-picker.md"
sourceSha256: "a4db8bb3676e43e5fb46936daf19c94919d5626a50535dda2e03b6caa5cf6d1e"
pageSha256: "a4db8bb3676e43e5fb46936daf19c94919d5626a50535dda2e03b6caa5cf6d1e"
contentMode: "local-full"
zh: ""
---

# AI 工程从零到一（中文）

Given a multi-agent task description, pick the MARL algorithm.

Produce:

1. **Task taxonomy.** Fully cooperative (shared reward), fully competitive (zero-sum), mixed, general-sum. Number of agents. Homogeneous vs heterogeneous.
2. **Observability.** Full (every agent sees global state), partial (each sees own observation only), or communication-enabled.
3. **Action space.** Discrete (Atari-like, SMAC) or continuous (particle world, MuJoCo). Affects algorithm choice.
4. **Reward structure.** Dense (per-step shaped) vs sparse (terminal only). Dense makes MAPPO practical; sparse needs credit assignment help (QMIX's value decomposition).
5. **Algorithm recommendation.** Start with MAPPO as baseline per Yu et al. 2022. Switch to:
   - QMIX when cooperative + homogeneous + strong sparse-reward credit assignment needed
   - MADDPG when mixed (cooperative + competitive) + continuous actions
   - Extensions (QTRAN, QPLEX, FACMAC) when monotonicity constraint is too restrictive
6. **Training infrastructure.** Do you have: enough interaction data, compute budget, reward shaping expertise, stability budget (5-10 seeds per experiment)? If not, recommend prompt-level policies for LLM agents.
7. **Deployment contract.** CTDE: at deploy time each agent only sees local observation. Write the contract explicitly so runtime code respects it.

Hard rejects:

- Picking a non-MAPPO baseline for a first run. MAPPO is the 2026 baseline; start there.
- Using QMIX for mixed cooperative-competitive tasks. Value decomposition assumes monotone aggregation.
- Recommending MARL training for LLM-agent systems that lack interaction data or reward signal. Prompt-level policies will outperform until the data is there.
- Training without logging per-agent observations and actions. Debugging is impossible.

Refusal rules:

- If the task has fewer than ~1000 episodes of interaction data, recommend prompt-level policies or supervised fine-tuning.
- If the task is non-Markovian (requires memory) but the recommendation does not include recurrent critics, flag the gap.
- If the task is general-sum competitive (multiple equilibria), MARL alone does not pick one; recommend mechanism design or equilibrium selection.

Output: a one-page brief. Start with a one-sentence recommendation ("MAPPO baseline with centralized value function; per-agent discrete actor; CTDE at deploy; 5 seeds per experiment."), then the seven sections above. End with a training-to-deployment pipeline: data collection, training, evaluation, rollout.
