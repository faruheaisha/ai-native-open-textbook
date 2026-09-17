---
title: "Prime Workflows: Workflow Engine Orientation"
sourceId: "10-context-memory/context-engineering-intro"
sourceTitle: "Context Engineering Intro"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 1
volume: "10-context-memory"
sourceUrl: "https://github.com/coleam00/context-engineering-intro"
entryUrl: "https://github.com/coleam00/context-engineering-intro/blob/a2d84b021cee1e2f4e77ba854bba0be8cb319035/use-cases/ai-coding-wisc-framework/.claude/commands/prime-workflows.md"
sourceRel: "use-cases/ai-coding-wisc-framework/.claude/commands/prime-workflows.md"
rawUrl: "/raw/10-context-memory/context-engineering-intro/use-cases/ai-coding-wisc-framework/.claude/commands/prime-workflows.md"
sourceSha256: "ad6d90d59857be7be8afa40421c6fbe549f2bc1867deb04dbd94a52fa50ad27b"
pageSha256: "ad6d90d59857be7be8afa40421c6fbe549f2bc1867deb04dbd94a52fa50ad27b"
contentMode: "local-full"
zh: ""
---

# Prime Workflows: Workflow Engine Orientation

## Objective

Orient on the workflow engine (`packages/workflows/`) before working on workflow execution,
YAML parsing, DAG logic, routing, or observability.

## Process

### 1. Understand the Workflow Package Structure

!`ls packages/workflows/src/`

### 2. Understand Workflow Type Definitions

Read `packages/workflows/src/types.ts` in full — the complete type system for workflow
definitions: `WorkflowDefinition`, `WorkflowStep`, `WorkflowNode` (DAG), `LoopConfig`,
`NodeType` (command / prompt / bash), `TriggerRule`, `OutputFormat`, tool restriction fields.

### 3. Understand the Executor

Read `packages/workflows/src/executor.ts` first 80 lines — `executeWorkflow()` entry point,
the three mutually exclusive execution modes (steps, loop, nodes/DAG), artifact directory setup,
variable substitution via `$ARTIFACTS_DIR` / `$WORKFLOW_ID`.

Read `packages/workflows/src/dag-executor.ts` first 80 lines — topological sort, concurrent
node dispatch for independent nodes in the same layer, `when:` condition evaluation,
`trigger_rule` join semantics, `$nodeId.output` substitution.

### 4. Understand the Loader

Read `packages/workflows/src/loader.ts` first 60 lines — `discoverWorkflows()` / `discoverWorkflowsWithConfig()`,
resilient loading (one bad YAML doesn't abort), model validation at load time,
bundled defaults merging with repo-specific workflows.

### 5. Understand the Router

Read `packages/workflows/src/router.ts` first 60 lines — how incoming messages are matched
to workflows, case-insensitive matching, `archon-assist` fallback, Codex tool bypass detection.

### 6. Understand Observability

Read `packages/workflows/src/event-emitter.ts` — `WorkflowEventEmitter`, emitted event types
(step_started, step_completed, node events, loop iterations, artifacts), how the server
bridges these to SSE via `WorkflowEventBridge`.

### 7. Understand Dependency Injection

Read `packages/workflows/src/deps.ts` — `WorkflowDeps` type: `IWorkflowPlatform`,
`IWorkflowAssistantClient`, `IWorkflowStore` injected at runtime. No direct DB or AI imports
inside this package.

### 8. See What Workflows Are Available

List bundled default workflows:
!`ls packages/workflows/src/defaults/`

List repo workflows (if any):
!`ls .archon/workflows/ 2>/dev/null || echo "(none in repo root)"`

### 9. Check Recent Workflow Engine Activity

!`git log -8 --oneline -- packages/workflows/`

## Output

Summarize (under 250 words):

### Execution Modes
- `steps:` — sequential steps, each step is a command or inline prompt
- `loop:` — iterative execution with `max_iterations` and `exit_condition`
- `nodes:` (DAG) — explicit `depends_on` edges, concurrent independent nodes per layer

### DAG Node Types
- `command:` — named command file from `.archon/commands/`
- `prompt:` — inline prompt text
- `bash:` — shell script, stdout captured as `$nodeId.output`, no AI involved

### Key Features
- `when:` conditions, `trigger_rule` join semantics (all / any_success / always)
- `output_format` for structured JSON (Claude only)
- `allowed_tools` / `denied_tools` per node (Claude only)
- Per-node `provider` and `model` overrides
- `$nodeId.output` cross-node data passing

### Variable Substitution
- `$1`, `$2`, `$ARGUMENTS`, `$PLAN`, `$ARTIFACTS_DIR`, `$WORKFLOW_ID`, `$BASE_BRANCH`

### Bundled Workflows
- List the key default workflow names and their purposes

### Recent Changes
