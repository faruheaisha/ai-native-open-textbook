---
title: "Filesystem-Based Context Engineering"
sourceId: "10-context-memory/agent-skills-for-context-engineering"
sourceTitle: "Agent Skills for Context Engineering"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/muratcankoylan/Agent-Skills-for-Context-Engineering"
entryUrl: "https://github.com/muratcankoylan/Agent-Skills-for-Context-Engineering/blob/6dbe1a1d868eab51a3bc9011b0f55e2891513e40/skills/filesystem-context/SKILL.md"
sourceRel: "skills/filesystem-context/SKILL.md"
rawUrl: "/raw/10-context-memory/agent-skills-for-context-engineering/skills/filesystem-context/SKILL.md"
sourceSha256: "bbde98d3481f1f51394e9fa84bbfff6807d9cce1f91dcf9161280fef17ae7f94"
pageSha256: "bbde98d3481f1f51394e9fa84bbfff6807d9cce1f91dcf9161280fef17ae7f94"
contentMode: "local-full"
zh: ""
---

# Filesystem-Based Context Engineering

Use the filesystem as the primary overflow layer for agent context because context windows are limited while tasks often require more information than fits in a single window. Files let agents store, retrieve, and update an effectively unlimited amount of context through a single interface.

Prefer dynamic context discovery -- pulling relevant context on demand -- over static inclusion, because static context consumes tokens regardless of relevance and crowds out space for task-specific information.

## When to Activate

Activate this skill when:
- Tool outputs are bloating the context window
- Agents need to persist state across long trajectories
- Sub-agents must share information without direct message passing
- Tasks require more context than fits in the window
- Building agents that learn and update their own instructions
- Implementing scratch pads for intermediate results
- Terminal outputs or logs need to be accessible to agents

Do not activate this skill for adjacent work owned by other skills:
- Semantic cross-session memory, entity tracking, or temporal knowledge graphs: `memory-systems`.
- Conversation summarization, compaction, or durable handoff wording: `context-compression`.
- Token-efficiency tactics that do not require file-backed storage: `context-optimization`.
- Multi-agent topology or handoff protocol design: `multi-agent-patterns`.

## Core Concepts

Diagnose context failures against these four modes, because each requires a different filesystem remedy:

1. **Missing context** -- needed information is absent from the total available context. Fix by persisting tool outputs and intermediate results to files so nothing is lost.
2. **Under-retrieved context** -- retrieved content fails to encapsulate what the agent needs. Fix by structuring files for targeted retrieval (grep-friendly formats, clear section headers).
3. **Over-retrieved context** -- retrieved content far exceeds what is needed, wasting tokens and degrading attention. Fix by offloading bulk content to files and returning compact references.
4. **Buried context** -- niche information is hidden across many files. Fix by combining glob and grep for structural search alongside semantic search for conceptual queries.

Use the filesystem as the persistent layer that addresses all four: write once, store durably, retrieve selectively.

## Detailed Topics

### The Static vs Dynamic Context Trade-off

Treat static context (system instructions, tool definitions, critical rules) as expensive real estate -- it consumes tokens on every turn regardless of relevance. As agents accumulate capabilities, static context grows and crowds out dynamic information.

Use dynamic context discovery instead: include only minimal static pointers (names, one-line descriptions, file paths) and load full content with search tools when relevant. This is more token-efficient and often improves response quality by reducing contradictory or irrelevant information in the window.

Accept the trade-off: dynamic discovery requires the model to recognize when it needs more context. Current frontier models handle this well, but less capable models may fail to trigger loads. When in doubt, err toward including critical safety or correctness constraints statically.

### Pattern 1: Filesystem as Scratch Pad

Redirect large tool outputs to files instead of returning them directly to context, because a single web search or database query can dump thousands of tokens into message history where they persist for the entire conversation.

Write the output to a scratch file, extract a compact summary, and return a file reference. The agent then uses targeted retrieval (grep for patterns, read with line ranges) to access only what it needs.

```python
def handle_tool_output(output: str, threshold: int = 2000) -> str:
    if len(output) < threshold:
        return output

    file_path = f"scratch/{tool_name}_{timestamp}.txt"
    write_file(file_path, output)

    key_summary = extract_summary(output, max_tokens=200)
    return f"[Output written to {file_path}. Summary: {key_summary}]"
```

Use grep to search the offloaded file and read_file with line ranges to retrieve targeted sections, because this preserves full output for later reference while keeping only ~100 tokens in the active context.

### Pattern 2: Plan Persistence

Write plans to the filesystem because long-horizon tasks lose coherence when plans fall out of attention or get summarized away. The agent re-reads its plan at any point, restoring awareness of the objective and progress.

Store plans in structured format so they are both human-readable and machine-parseable:
```yaml
# scratch/current_plan.yaml
objective: "Refactor authentication module"
status: in_progress
steps:
  - id: 1
    description: "Audit current auth endpoints"
    status: completed
  - id: 2
    description: "Design new token validation flow"
    status: in_progress
  - id: 3
    description: "Implement and test changes"
    status: pending
```

Re-read the plan at the start of each turn or after any context refresh to re-orient, because this acts as "manipulating attention through recitation."

### Pattern 3: Sub-Agent Communication via Filesystem

Route sub-agent findings through the filesystem instead of message passing, because multi-hop message chains degrade information through summarization at each hop ("game of telephone").

Have each sub-agent write directly to its own workspace directory. The coordinator reads these files directly, preserving full fidelity:
```
workspace/
  agents/
    research_agent/
      findings.md
      sources.jsonl
    code_agent/
      changes.md
      test_results.txt
  coordinator/
    synthesis.md
```

Enforce per-agent directory isolation to prevent write conflicts and maintain clear ownership of each output artifact.

### Pattern 4: Dynamic Skill Loading

Store skills as files and include only skill names with brief descriptions in static context, because stuffing all instructions into the system prompt wastes tokens and can confuse the model with contradictory guidance.

```
Available skills (load with read_file when relevant):
- database-optimization: Query tuning and indexing strategies
- api-design: REST/GraphQL best practices
- testing-strategies: Unit, integration, and e2e testing patterns
```

Load the full skill file (e.g., `skills/database-optimization/SKILL.md`) only when the current task requires it. This converts O(n) static token cost into O(1) per task.

### Pattern 5: Terminal and Log Persistence

Persist terminal output to files automatically and use grep for selective retrieval, because terminal output from long-running processes accumulates rapidly and manual copy-paste is error-prone.

```
terminals/
  1.txt    # Terminal session 1 output
  2.txt    # Terminal session 2 output
```

Query with targeted grep (`grep -A 5 "error" terminals/1.txt`) instead of loading entire terminal histories into context.

### Pattern 6: Learning Through Self-Modification

Have agents write learned preferences and patterns to their own instruction files so subsequent sessions load this context automatically, instead of requiring manual system prompt updates.

```python
def remember_preference(key: str, value: str):
    preferences_file = "agent/user_preferences.yaml"
    prefs = load_yaml(preferences_file)
    prefs[key] = value
    write_yaml(preferences_file, prefs)
```

Guard this pattern with validation because self-modification can accumulate incorrect or contradictory instructions over time. Treat it as experimental -- review persisted preferences periodically.

### Filesystem Search Techniques

Combine `ls`/`list_dir`, `glob`, `grep`, and `read_file` with line ranges for context discovery, because models are specifically trained on filesystem traversal and this combination often outperforms semantic search for technical content where structural patterns are clear.

- `ls` / `list_dir`: Discover directory structure
- `glob`: Find files matching patterns (e.g., `**/*.py`)
- `grep`: Search file contents, returns matching lines with context
- `read_file` with ranges: Read specific sections without loading entire files

Use filesystem search for structural and exact-match queries, and semantic search for conceptual queries. Combine both for comprehensive discovery.

## Practical Guidance

### When to Use Filesystem Context

Apply filesystem patterns when the situation matches these criteria, because they add I/O overhead that is only justified by token savings or persistence needs:

**Use when:**
- Tool outputs exceed ~2000 tokens
- Tasks span multiple conversation turns
- Multiple agents need shared state
- Skills or instructions exceed comfortable system prompt size
- Logs or terminal output need selective querying

**Avoid when:**
- Tasks complete in single turns (overhead not justified)
- Context fits comfortably in window (no problem to solve)
- Latency is critical (file I/O adds measurable delay)
- Model lacks filesystem tool capabilities

### File Organization

Structure files for agent discoverability, because agents navigate by listing and reading directory names:
```
project/
  scratch/           # Temporary working files
    tool_outputs/    # Large tool results
    plans/           # Active plans and checklists
  memory/            # Persistent learned information
    preferences.yaml # User preferences
    patterns.md      # Learned patterns
  skills/            # Loadable skill definitions
  agents/            # Sub-agent workspaces
```

Use consistent naming conventions and include timestamps or IDs in scratch files for disambiguation.
