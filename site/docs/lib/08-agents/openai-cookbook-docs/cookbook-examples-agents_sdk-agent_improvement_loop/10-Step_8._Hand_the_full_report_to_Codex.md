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
pageSha256: "b1717410a80d15b189167cb183c4ae8b3321ca8fd9a8daa8a31df3d1971d22de"
contentMode: "local-full"
zh: ""
---

## Step 8. Hand the full report to Codex

HALO diagnoses and prioritizes. A coding agent or human still changes the harness.

Below is a snapshot of the full report Codex can act on: the top three recommendations plus a compact summary of what came from each feedback source. The complete `codex_handoff.md` file also includes the ranked changes, supporting evidence, and validation guidance for implementation.

```python
handoff_file = ARTIFACT_DIR / "codex_handoff.md"

if handoff_file.exists():
    print(f"Full Codex handoff written to: {handoff_file.relative_to(PROJECT_ROOT)}")
    print("Snapshot below; open the generated codex_handoff.md file to review the full handoff.")
    display(Markdown(render_notebook_halo_summary(handoff_file.read_text(encoding="utf-8"))))
else:
    print(f"Codex handoff not found yet: {handoff_file.relative_to(PROJECT_ROOT)}")
    print("Run the HALO optimization cell above to generate it.")
```

```text
Full Codex handoff written to: examples/agents_sdk/agent_improvement_loop_artifacts/codex_handoff.md
Snapshot below; open the generated codex_handoff.md file to review the full handoff.
```
