---
title: "Claude Code Ultimate Guide"
sourceId: "09-harness/claude-code-ultimate-guide"
sourceTitle: "Claude Code Ultimate Guide"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://github.com/FlorianBruniaux/claude-code-ultimate-guide"
entryUrl: "https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/workflows/agent-teams.md"
sourceRel: "guide/workflows/agent-teams.md"
rawUrl: "/raw/09-harness/claude-code-ultimate-guide/guide/workflows/agent-teams.md"
sourceSha256: "a31f6529fd0d6c7f53e64323461842508bad29795405d8d1b81c69cbfb2ca812"
pageSha256: "84fb6dafee4d39a7933813c94c56f90324f1e009ac348505434605b6f6d0a00f"
contentMode: "local-full"
zh: ""
---

## Advanced Orchestration Patterns

These patterns address the failure modes that emerge at scale in multi-agent pipelines: coordinators that do too much work themselves, agents that proceed without prerequisites, and pipelines that cannot recover from mid-run failures.

---

### Hub-and-Spoke Coordinator

The hub-and-spoke pattern separates coordination from execution. The coordinator agent decomposes the task, selects subagents, dispatches work, monitors results, and aggregates outputs. It does no domain work itself: no research, no analysis, no generation. This separation is what makes the coordinator reusable across different task types.

```python
from dataclasses import dataclass
from typing import Callable, Any

@dataclass
class SubagentResult:
    agent_id: str
    task: str
    result: Any
    success: bool
    error: str | None = None

class ResearchCoordinator:
    def __init__(self, subagents: dict[str, Callable]):
        self.subagents = subagents  # name -> callable

    def run(self, research_question: str) -> dict:
        # Decompose into parallel subtasks
        subtasks = self.decompose(research_question)

        # Dispatch to appropriate subagents
        results = []
        for subtask in subtasks:
            agent_name = self.select_agent(subtask)
            if agent_name not in self.subagents:
                results.append(SubagentResult(
                    agent_id=agent_name, task=subtask,
                    result=None, success=False,
                    error=f"No agent available for: {agent_name}"
                ))
                continue

            try:
                result = self.subagents[agent_name](subtask)
                results.append(SubagentResult(
                    agent_id=agent_name, task=subtask,
                    result=result, success=True
                ))
            except Exception as e:
                results.append(SubagentResult(
                    agent_id=agent_name, task=subtask,
                    result=None, success=False, error=str(e)
                ))

        # Aggregate — coordinator's only domain responsibility
        return self.aggregate(research_question, results)

    def decompose(self, question: str) -> list[str]:
        # Returns subtasks — coordinator decides structure, not domain content
        raise NotImplementedError

    def select_agent(self, subtask: str) -> str:
        # Routing logic — pattern matching or LLM-based selection
        raise NotImplementedError

    def aggregate(self, original_question: str, results: list[SubagentResult]) -> dict:
        successful = [r for r in results if r.success]
        failed = [r for r in results if not r.success]

        return {
            "question": original_question,
            "findings": [r.result for r in successful],
            "coverage": len(successful) / len(results) if results else 0.0,
            "failures": [{"task": r.task, "error": r.error} for r in failed]
        }
```

The coordinator never touches the content of results, only routes them, counts them, and passes them to an aggregation step. If you find coordinator code that contains analysis logic, business rules, or domain-specific processing, that logic belongs in a subagent.

---

### Programmatic Prerequisites

Prerequisite checks should be deterministic gates, not prompt instructions. Telling a model "make sure the data is ready before proceeding" is a suggestion, not a prerequisite. A programmatic prerequisite is a state check that either allows execution to continue or returns a structured error.

**Pattern 1: State-flag gate**

```python
@dataclass
class PipelineState:
    data_ingested: bool = False
    schema_validated: bool = False
    permissions_checked: bool = False

    def can_proceed_to_analysis(self) -> tuple[bool, list[str]]:
        missing = []
        if not self.data_ingested:
            missing.append("data_ingested")
        if not self.schema_validated:
            missing.append("schema_validated")
        if not self.permissions_checked:
            missing.append("permissions_checked")
        return len(missing) == 0, missing

def run_analysis_phase(state: PipelineState, data: dict) -> dict:
    can_proceed, missing = state.can_proceed_to_analysis()
    if not can_proceed:
        return {
            "status": "blocked",
            "reason": f"Prerequisites not met: {', '.join(missing)}",
            "required": missing
        }

    # Proceed with analysis — all prerequisites confirmed
    return perform_analysis(data)
```

**Pattern 2: Phase-based dispatch**

For pipelines with sequential phases, the orchestrator dispatches based on completed phases rather than on elapsed time or turn count:

```python
from enum import Enum

class PipelinePhase(Enum):
    INIT = "init"
    INGESTION = "ingestion"
    VALIDATION = "validation"
    PROCESSING = "processing"
    COMPLETE = "complete"
    FAILED = "failed"

@dataclass
class PipelineContext:
    phase: PipelinePhase = PipelinePhase.INIT
    phase_results: dict = None

    def __post_init__(self):
        if self.phase_results is None:
            self.phase_results = {}

def dispatch_next_phase(context: PipelineContext, agents: dict) -> PipelineContext:
    next_phase_map = {
        PipelinePhase.INIT: PipelinePhase.INGESTION,
        PipelinePhase.INGESTION: PipelinePhase.VALIDATION,
        PipelinePhase.VALIDATION: PipelinePhase.PROCESSING,
        PipelinePhase.PROCESSING: PipelinePhase.COMPLETE
    }

    next_phase = next_phase_map.get(context.phase)
    if next_phase is None:
        return context

    agent = agents.get(next_phase.value)
    if agent is None:
        context.phase = PipelinePhase.FAILED
        return context

    try:
        result = agent(context.phase_results)
        context.phase_results[next_phase.value] = result
        context.phase = next_phase
    except Exception as e:
        context.phase = PipelinePhase.FAILED
        context.phase_results["error"] = str(e)

    return context
```

---

### Dynamic Subagent Selection

Instead of hardcoding which agent handles which task, a coordinator can select subagents dynamically based on task characteristics. This allows the same coordinator to handle new task types without code changes.

```python
@dataclass
class AgentCapability:
    name: str
    handles: list[str]  # task type keywords
    cost: float          # relative cost (1.0 = baseline)
    latency: float       # expected seconds

class DynamicSelector:
    def __init__(self, agents: list[AgentCapability]):
        self.agents = agents

    def select(self, task: str, budget_tier: str = "standard") -> str:
        candidates = [
            a for a in self.agents
            if any(keyword in task.lower() for keyword in a.handles)
        ]

        if not candidates:
            return "general"  # fallback agent

        if budget_tier == "economy":
            # Cheapest capable agent
            return min(candidates, key=lambda a: a.cost).name
        elif budget_tier == "performance":
            # Fastest capable agent
            return min(candidates, key=lambda a: a.latency).name
        else:
            # Balanced: cheapest among the fast agents
            fast = [a for a in candidates if a.latency < 10.0]
            pool = fast if fast else candidates
            return min(pool, key=lambda a: a.cost).name
```

---

### Research Space Partitioning

When multiple agents research the same broad topic, they will return overlapping results unless the coordinator explicitly partitions the search space. Overlap wastes budget and makes aggregation harder.

```python
def partition_research_space(
    topic: str,
    num_agents: int,
    partition_dimensions: list[str]
) -> list[dict]:
    """
    Divide a research topic into non-overlapping partitions.
    Each agent receives a partition with explicit scope boundaries.
    """
    if len(partition_dimensions) >= num_agents:
        dimensions = partition_dimensions[:num_agents]
    else:
        # Create additional partitions if not enough thematic dimensions
        dimensions = partition_dimensions + [
            f"recent_{i}" for i in range(num_agents - len(partition_dimensions))
        ]

    return [
        {
            "agent_id": f"researcher_{i}",
            "topic": topic,
            "scope": dimension,
            "exclusions": [d for j, d in enumerate(dimensions) if j != i],
            "instruction": (
                f"Research '{topic}' focusing exclusively on '{dimension}'. "
                f"Do NOT cover: {', '.join(dimensions[:i] + dimensions[i+1:])}. "
                f"This constraint prevents duplication with parallel researchers."
            )
        }
        for i, dimension in enumerate(dimensions)
    ]

# Example: 3-agent research on "vector database performance"
partitions = partition_research_space(
    topic="vector database performance",
    num_agents=3,
    partition_dimensions=["indexing algorithms", "query optimization", "hardware scaling"]
)
```

---

### Crash Recovery Manifest

Long-running agent pipelines (hours, overnight jobs) need crash recovery. A manifest records completed work at phase boundaries so that a restart can continue from the last checkpoint rather than starting over.

```python
import json
import os
from dataclasses import dataclass, field, asdict
from datetime import datetime

@dataclass
class PipelineManifest:
    pipeline_id: str
    created_at: str
    task_description: str
    total_items: int
    completed_items: list[str] = field(default_factory=list)
    failed_items: list[dict] = field(default_factory=list)
    phase_checkpoints: dict = field(default_factory=dict)
    status: str = "in_progress"  # "in_progress" | "complete" | "failed"

    def save(self, path: str):
        with open(path, "w") as f:
            json.dump(asdict(self), f, indent=2)

    @classmethod
    def load(cls, path: str) -> "PipelineManifest":
        with open(path) as f:
            data = json.load(f)
        return cls(**data)

    def checkpoint(self, phase: str, result: dict, manifest_path: str):
        self.phase_checkpoints[phase] = {
            "completed_at": datetime.utcnow().isoformat(),
            "result_summary": result.get("summary", "")
        }
        self.save(manifest_path)

    def mark_item_complete(self, item_id: str, manifest_path: str):
        self.completed_items.append(item_id)
        self.save(manifest_path)  # write after every item

class RecoverableOrchestrator:
    def __init__(self, manifest_path: str):
        self.manifest_path = manifest_path

    def run(self, pipeline_id: str, items: list[str], processor) -> PipelineManifest:
        # Load or create manifest
        if os.path.exists(self.manifest_path):
            manifest = PipelineManifest.load(self.manifest_path)
            print(f"Resuming: {len(manifest.completed_items)}/{manifest.total_items} done")
        else:
            manifest = PipelineManifest(
                pipeline_id=pipeline_id,
                created_at=datetime.utcnow().isoformat(),
                task_description=f"Processing {len(items)} items",
                total_items=len(items)
            )

        for item_id in items:
            if item_id in manifest.completed_items:
                continue  # skip completed items

            try:
                processor(item_id)
                manifest.mark_item_complete(item_id, self.manifest_path)
            except Exception as e:
                manifest.failed_items.append({"id": item_id, "error": str(e)})
                manifest.save(self.manifest_path)

        manifest.status = "complete" if not manifest.failed_items else "partial"
        manifest.save(self.manifest_path)
        return manifest
```

Checkpoint at phase boundaries, not just at task completion. For a 3-phase pipeline (ingest, analyze, report), a crash mid-analysis should resume from the start of analysis, not from the start of ingest.

---

### Iterative Refinement Loop

Some tasks require multiple passes to reach acceptable quality. The coordinator drives iteration, not the subagent. This separation means the subagent stays stateless and the coordinator controls stopping criteria.

```python
@dataclass
class RefinementState:
    iteration: int
    current_output: str
    quality_score: float
    feedback: str | None
    max_iterations: int = 5
    target_quality: float = 0.85

    def should_continue(self) -> bool:
        return (
            self.iteration < self.max_iterations
            and self.quality_score < self.target_quality
        )

def iterative_refine(
    initial_task: str,
    generator_fn,
    evaluator_fn,
    max_iterations: int = 5
) -> RefinementState:
    state = RefinementState(
        iteration=0,
        current_output="",
        quality_score=0.0,
        feedback=None,
        max_iterations=max_iterations
    )

    while True:
        # Generate (or refine based on feedback)
        if state.iteration == 0:
            state.current_output = generator_fn(initial_task)
        else:
            state.current_output = generator_fn(
                f"{initial_task}\n\nPrevious attempt:\n{state.current_output}\n\n"
                f"Feedback to address:\n{state.feedback}"
            )

        # Evaluate — separate pass with fresh context
        evaluation = evaluator_fn(state.current_output, initial_task)
        state.quality_score = evaluation["score"]
        state.feedback = evaluation["feedback"]
        state.iteration += 1

        if not state.should_continue():
            break

    return state
```

Stopping criteria matter. "Keep going until it's perfect" is not a stopping criterion. Define `target_quality` as a numeric threshold based on a validation set, and `max_iterations` as a hard budget. Without both, the loop either terminates too early or runs indefinitely.

---

### Narrow Task Decomposition

Broad task decomposition produces subagents with unclear success criteria. Use the SPEC test to validate each subtask before dispatching:

**SPEC test for subtasks:**
- **S**pecific: the task description leaves no ambiguity about what to produce
- **P**rogrammatically evaluable: success or failure can be checked without human judgment
- **E**xplicit scope: what is in and out of scope is stated, not implied
- **C**onstrained: the task has a defined output format, length, or schema

A subtask that fails the SPEC test should be decomposed further or clarified before dispatch.

| Subtask | SPEC pass? | Issue |
|---|---|---|
| "Research the topic" | No | Not specific, not programmatically evaluable |
| "Find 3 peer-reviewed papers on vector indexing published 2022-2024" | Yes | Specific, countable, scoped, constrained format |
| "Analyze the data" | No | Not specific, no output schema |
| "Extract vendor names from invoices 001-050, output as JSON array" | Yes | Specific, schema-constrained, scoped |
| "Write something good" | No | No quality criteria, not evaluable |
| "Write a 150-word executive summary with: problem, approach, outcome" | Yes | Word count, structure, and content all specified |

When a subtask cannot be expressed in a way that passes the SPEC test, that is usually a signal that the coordinator does not yet have enough information to decompose that portion of the work. Gather more context before decomposing further.

---

### Steering a Running Agent

Once a coordinator can message a working agent mid-execution, the tempting move is to correct anything that looks suboptimal. That instinct is wrong and it costs real time.

**The rule: steer an agent that is drifting, never an agent that is progressing.**

A message delivered to a healthy agent does not accelerate it. It preempts the work, forces a context switch, and buys a reply instead of a result. One documented case had a well-intentioned steer send a runner into roughly ten minutes of answering messages rather than advancing on its task. The agent was doing fine until it was told otherwise.

Drift, by contrast, is worth interrupting immediately, and it is recognizable without reading the agent's reasoning. The signal is always behavioral, visible from the outside:

| Observed behavior | Verdict | Intervention |
|---|---|---|
| Writing a script for 12 minutes without ever executing it | Drift | Declare failed, relaunch cleanly. No debate, no wait loop |
| Loop that kills its own process (e.g. a `grep` matching its own PID) | Drift | Redirect in one or two lines: "fixed PIDs, no loop" |
| 22 seconds spent discovering a directory it was already given | Drift | Re-dispatch with an absolute working directory |
| Emitting a literal `$now` into JSON from a broken shell substitution | Drift | Rewrite the step in a language with real argument passing |
| Hitting an obstacle and adapting on its own (for example switching to `find -o` after shell-mangled `for` loops) | Progress | Do not intervene |
| Status file advancing, output growing, no error | Progress | Do not intervene |

The practical consequence is that a coordinator needs a **non-blocking supervision channel**, not a conversational one. A per-agent status file holding the last output preview, the step count, and the exit code lets the coordinator judge drift without sending anything. Messaging is then reserved for the cases where the observation says intervention is warranted, which keeps the peer-to-peer mailbox from becoming the bottleneck it was meant to remove.

A useful threshold: watch the status file, and only consider a steer when it has not advanced for longer than the task's expected step duration. Roughly 30 seconds works for shell-level work; a build or test step needs a proportionally longer window.

> Field-reported by Mathieu Grenier (CTO, Easystrat) across a five-project agent network, 2026-08-15. Full evaluation: [`docs/resource-evaluations/grenier-multi-project-agent-network.md`](/lib/09-harness/claude-code-ultimate-guide/docs-resource-evaluations-grenier-multi-project-agent-network)

---

### Single-Writer for Shared Plan Files

Multiple agents editing one plan, task list, or checklist file is the most common source of silent corruption in a team setup. Two agents strike the same item and produce a duplicate. One writes while another holds a stale read and overwrites the change. A batch write gets killed halfway and leaves the file structurally broken.

Isolated context windows do not help here, because the conflict is on disk, not in context.

**The rule: exactly one agent holds write access to a shared file. Every other agent requests the write over the message bus.**

The requesting agent produces the content and sends it. The owning agent performs the write. The mechanism costs one message round trip and removes the entire class of concurrent-write failures, because there is never more than one writer by construction.

```
memory-curator  --(coms: "strike items 4-9, batch complete")-->  orchestrator
                <--(ack)--                                        writes plan file
```

A documented application: a `memory-curator` agent with no write permission produced three entries, then asked its orchestrator over the bus to strike the corresponding batch in the orchestration plan. The orchestrator performed the single write. No duplicates, no conflict.

This composes with the read/write separation already used for investigation agents. An agent that reads untrusted input (production logs, third-party issue text, scraped pages) should not hold write access to anything for injection-safety reasons; making it request writes through an owner satisfies both the concurrency requirement and the security one with the same mechanism.

| Shared artifact | Suggested owner |
|---|---|
| Orchestration plan / task list | Team lead or coordinator |
| Per-agent status file | The agent it describes (single writer by definition) |
| Shared findings document | Coordinator, appending on message |
| Source files | Whoever holds the worktree, one agent per worktree |

The last row is why worktree isolation and single-writer are complementary rather than redundant: worktrees give each agent its own source tree, single-writer covers the coordination artifacts that necessarily stay shared. See also [Multi-Agent Shared Memory](/lib/09-harness/claude-code-ultimate-guide/guide-core-memory-systems/index#5-multi-agent-shared-memory) for the persistence side of the same problem.

> Field-reported by Mathieu Grenier (CTO, Easystrat), 2026-08-15. Full evaluation: [`docs/resource-evaluations/grenier-multi-project-agent-network.md`](/lib/09-harness/claude-code-ultimate-guide/docs-resource-evaluations-grenier-multi-project-agent-network)

---

*Version 1.1.0 | Created: 2026-02-07 | Updated: 2026-08-16 | Agent Teams (v2.1.32+, Experimental)*
