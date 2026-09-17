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
entryUrl: "https://github.com/fancyboi999/ai-engineering-from-scratch-zh/blob/109181ce68128c1bf27ec20867177007a8bace89/phases/16-multi-agent-and-swarms/13-shared-memory-blackboard/outputs/skill-memory-auditor.md"
sourceRel: "phases/16-multi-agent-and-swarms/13-shared-memory-blackboard/outputs/skill-memory-auditor.md"
rawUrl: "/raw/07-coding/ai-engineering-from-scratch-zh/phases/16-multi-agent-and-swarms/13-shared-memory-blackboard/outputs/skill-memory-auditor.md"
sourceSha256: "e0ebf4705b65aec5639ca5659d4503666b6a166ae7d46bbc8d163175cabdc5fc"
pageSha256: "e0ebf4705b65aec5639ca5659d4503666b6a166ae7d46bbc8d163175cabdc5fc"
contentMode: "local-full"
zh: ""
---

# AI 工程从零到一（中文）

Given a multi-agent codebase or architecture doc, audit the shared-memory design and flag exposure to memory poisoning.

Produce:

1. **Topology.** Full message pool, topic-partitioned blackboard, projected per-agent view, or hybrid? Name the data structure (list, dict, pandas frame, vector store, SQL table). Count rough upper bound of writers and readers at steady state.
2. **Provenance fields.** On every write, does the entry record: writer id, timestamp, prompt hash or prompt text, tool-call trace, source URI or tool name? List the fields present and the fields missing.
3. **Update model.** Is the log append-only, or do writers mutate in place? If mutation, what is the concurrency-control mechanism (lock, optimistic versioning, none)? Corrections should be supersession entries, not in-place edits — flag any design that does not do this.
4. **Verifier separation.** Is there a read-only agent with independent source access? Can it write to the main pool (it should not)? Where does its output go?
5. **Projection schema.** If the design uses projections (LangGraph reducers, blackboard topics, role-scoped views), is the schema documented? How do new agents declare the projection they consume?
6. **Poisoning risk score.** Score 1-5 on each axis: [provenance completeness], [supersession over mutation], [verifier independence], [projection schema clarity]. A system that scores below 3 on any axis is flagged.

Hard rejects:

- Any audit that does not flag a missing verifier. An unwritable verifier with independent source access is the load-bearing mitigation; every other mitigation is decorative without it.
- Audits that recommend "add more tests." Tests do not catch memory poisoning because poisoning produces plausible outputs that pass tests.
- Audits that recommend hashing the content as the sole provenance. A hash tells you *what* was written, not *who* or *from where*.

Refusal rules:

- If the codebase hides shared state in an external service (Redis, Postgres, vector DB) with no inspection tools, state that the audit cannot complete without production read access.
- If the system has fewer than three agents, note that memory poisoning risk is low but provenance is still cheap insurance.
- If the system uses a framework with built-in state management (LangGraph checkpointer, AutoGen pool), audit the framework's guarantees rather than re-deriving them.

Output: a two-page report. Start with a one-sentence summary ("Shared state is a full message pool with no provenance and no verifier — high poisoning risk."), then the six sections above. End with a prioritized action list: three changes, each labeled [critical] [should] or [nice-to-have], with estimated time-to-implement.
