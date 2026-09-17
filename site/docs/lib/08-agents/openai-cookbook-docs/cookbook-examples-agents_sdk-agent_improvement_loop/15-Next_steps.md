---
title: "openai-cookbook-docs"
sourceId: "08-agents/openai-cookbook-docs"
sourceTitle: "openai-cookbook-docs"
sourceKind: "官方文档"
licenseLabel: "仅引用"
lang: "英文"
tier: 3
volume: "08-agents"
sourceUrl: "https://developers.openai.com/cookbook"
entryUrl: "https://developers.openai.com/cookbook"
sourceRel: "cookbook/examples/agents_sdk/agent_improvement_loop.md"
rawUrl: "/raw/08-agents/openai-cookbook-docs/cookbook/examples/agents_sdk/agent_improvement_loop.md"
sourceSha256: "e4974f3b65d46cea41ba7561497e8602ad0731cfc5d1ab4d976c4f0246ea610a"
pageSha256: "bb2d3c4d53ccc0ab886036a1a964dbb54ed767151ebd070c1f617fb3ba4a9c8f"
contentMode: "local-full"
zh: ""
---

## Next steps

- Choose the model for each stage of the loop by editing `AGENT_MODEL`, `ANALYSIS_MODEL`, `EVAL_GENERATION_MODEL`, `JUDGE_MODEL`, and `HALO_MODEL` near the top of the notebook.
- Create your own traces to test the agent.
- Decide how much of the final path should remain reviewed versus automated: you can stop at a developer-reviewed PR, or wire the handoff into a system that opens, merges, and deploys changes automatically.
- Pass the generated `codex_handoff.md` file under `ARTIFACT_DIR` to Codex, inspect the harness changes it proposes, and rerun the same eval suite against the updated harness.
