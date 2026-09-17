---
title: "Chapter 11: Task Management System"
sourceId: "09-harness/how-claude-code-works"
sourceTitle: "How Claude Code Works"
sourceKind: "源码研读"
licenseLabel: "可转载"
lang: "中文"
tier: 2
volume: "09-harness"
sourceUrl: "https://github.com/Windy3f3f3f3f/how-claude-code-works"
entryUrl: "https://github.com/Windy3f3f3f3f/how-claude-code-works/blob/f4d6505ed9162a0ee6be089190f74c419ecacb19/en/docs/15-task-system.md"
sourceRel: "en/docs/15-task-system.md"
rawUrl: "/raw/09-harness/how-claude-code-works/en/docs/15-task-system.md"
sourceSha256: "766c2889b0c52fcffc82ff248d7c9008e90bea9d1974485066dfb8ca25f80637"
pageSha256: "766c2889b0c52fcffc82ff248d7c9008e90bea9d1974485066dfb8ca25f80637"
contentMode: "local-full"
zh: ""
---

# Chapter 11: Task Management System

> **In one sentence**: Claude Code's task system (TodoV2) uses **file-level storage + locking** to implement a lightweight task manager supporting multi-Agent concurrency, enabling AI Agents to break down complex work, track progress, and coordinate division of labor within a team.

## Why a Task System?

Imagine this scenario: you ask Claude Code to "refactor the entire authentication module." This involves dozens of steps — modifying data models, updating API endpoints, adjusting frontend components, writing tests, updating documentation... Without task management, the Agent is likely to lose context, miss steps, or forget what remains halfway through.

The core problems the task system solves:

1. **Complex task decomposition** — A single Agent breaks large tasks into trackable subtasks
2. **Progress visibility** — Users see the status of each step in real time in the terminal UI
3. **Multi-Agent coordination** — Multiple Agents in a team share a task list, claim work, and avoid duplication

### Evolution from TodoV1 to TodoV2

The early `TodoWriteTool` was a simple single JSON file approach — all to-do items written in one list. This worked fine for single-Agent scenarios, but when multiple Agents read and write the same JSON file simultaneously, race conditions and data loss occur.

TodoV2 made a critical architectural decision: **one independent file per task**. This refined the lock granularity from "the entire list" to "a single task," forming the foundation for multi-Agent concurrency.

## 11.1 Four Core Tools

The task system exposes four tools to the model, with clear separation of concerns:

| Tool | Responsibility | Read-only |
|------|---------------|-----------|
| **TaskCreate** | Create new tasks | No |
| **TaskGet** | Get full details of a single task | Yes |
| **TaskList** | List summaries of all tasks | Yes |
| **TaskUpdate** | Update status, owner, dependencies, etc. | No |

### Thoughtful Parameter Design

```typescript
// TaskCreate input parameters
{
  subject: string       // "Fix authentication bug in login flow"
  description: string   // Detailed description
  activeForm?: string   // "Fixing authentication bug" — shown in spinner
  metadata?: Record<string, unknown>  // Extensible metadata
}
```

Several design choices worth noting:

- **subject requires imperative form** (e.g., "Fix bug" not "Fixing bug") — the system prompt explicitly guides the LLM to use this format, as it works better as a title
- **activeForm is an optional progressive form** — while a task is in progress, the terminal spinner shows "Fixing authentication bug" rather than "Fix authentication bug." This distinction in tense makes the UI feel more natural
- **metadata supports `_internal` flags** — setting `metadata._internal = true` hides the task from TaskList results, allowing the system to create internal tasks invisible to the user

### State Machine

A task's lifecycle follows a simple state machine:

```
pending ──→ in_progress ──→ completed
   │             │              │
   └─────────────┼──────────────┘
                 ↓
              deleted   (special action: a task in any state can be deleted directly)
```

- `pending`: Just created, awaiting claim
- `in_progress`: Currently being worked on
- `completed`: Done
- `deleted`: Not a real state — calling `deleteTask()` directly removes the file and cleans up references to it from other tasks

### Dependency Tracking: blocks / blockedBy

Tasks can declare dependency relationships:

```typescript
// "Task 2 is blocked by Task 1" — i.e., Task 1 must be completed first
TaskUpdate({ taskId: "2", addBlockedBy: ["1"] })
```

Under the hood, this is a **bidirectional update** (the `blockTask` function):

```typescript
// src/utils/tasks.ts
export async function blockTask(taskListId, fromTaskId, toTaskId) {
  // A blocks B → update both sides
  // fromTask.blocks adds toTaskId
  // toTask.blockedBy adds fromTaskId
}
```

Why maintain both directions? Because `TaskList` needs to quickly determine whether a task can be claimed (by checking if `blockedBy` is empty), while `TaskGet` needs to show which downstream tasks a given task is blocking (via `blocks`). Bidirectional redundancy avoids traversing all tasks to compute relationships.

`TaskList` also **automatically filters out completed blockers** — if Task 1 is already completed, Task 2's `blockedBy` won't include it in the display, preventing the model from mistakenly thinking it's still blocked.

## 11.2 File-Level Storage: Built for Concurrency

This is the most critical design decision in the task system and merits in-depth analysis.

### Storage Structure

```
~/.claude/tasks/
  └── {taskListId}/        # One directory per session/team
      ├── .lock            # Directory-level lock file
      ├── .highwatermark   # Highest ID record
      ├── 1.json           # Task 1
      ├── 2.json           # Task 2
      └── 3.json           # Task 3
```

Contents of each task file:

```json
{
  "id": "1",
  "subject": "Fix authentication bug",
  "description": "The login endpoint returns 500...",
  "status": "in_progress",
  "owner": "teammate-1",
  "blocks": ["3"],
  "blockedBy": [],
  "metadata": {}
}
```

### Why One File Per Task?

This is the key improvement over TodoV1. Consider the multi-Agent scenario:

**The single-file problem**: Agent A reads `tasks.json`, Agent B also reads `tasks.json`. A modifies Task 1 and writes it back, B modifies Task 2 and writes it back — B's write overwrites A's changes to Task 1. To fix this, you need to lock the entire file, meaning all Agents' task operations become serialized.

**The one-file-per-task advantage**: Agent A locks `1.json`, Agent B locks `2.json`, and both can operate in parallel without interference. Only when cross-task atomic operations are needed (e.g., allocating an ID when creating a new task) does the directory-level `.lock` file come into play.

### TaskListId: Who Shares the Same Task List?

Task list isolation is achieved through `taskListId`, resolved with a 5-level priority:

```typescript
// src/utils/tasks.ts
export function getTaskListId(): string {
  // 1. Explicitly specified (environment variable)
  if (process.env.CLAUDE_CODE_TASK_LIST_ID) return it
  // 2. In-process teammate → use leader's team name
  const teammateCtx = getTeammateContext()
  if (teammateCtx) return teammateCtx.teamName
  // 3. Process-based teammate → CLAUDE_CODE_TEAM_NAME
  // 4. Team name created by the leader
  // 5. Fallback → session ID (standalone session)
  return getTeamName() || leaderTeamName || getSessionId()
}
```

This design ensures:
- **Standalone sessions** are isolated from each other (using session ID)
- **All team members** (whether in-process or cross-process) share the same task list (using team name)
- **External tools** can force a specific list via environment variable

### High Water Mark: Preventing ID Reuse

Task IDs are auto-incrementing integers ("1", "2", "3"...) rather than UUIDs. This is an intentional choice:

- **Readability**: "#1" is much easier to reference in conversation than "a7f3b2c1-..."
- **Ordering**: The system prompt suggests the model process tasks in ID order, since earlier tasks often establish context for later ones

But auto-incrementing IDs have a problem with deletion: if Task 3 is deleted and a new task is created, the new task should not get ID "3" again — this would create ambiguity with earlier references to "#3" in the conversation.

The solution is the `.highwatermark` file:

```typescript
// Update high water mark when deleting a task
export async function deleteTask(taskListId, taskId) {
  const numericId = parseInt(taskId, 10)
  const currentMark = await readHighWaterMark(taskListId)
  if (numericId > currentMark) {
    await writeHighWaterMark(taskListId, numericId)
  }
  // ... delete file
}

// When creating a task, consider both files and high water mark
async function findHighestTaskId(taskListId) {
  const [fromFiles, fromMark] = await Promise.all([
    findHighestTaskIdFromFiles(taskListId),
    readHighWaterMark(taskListId),
  ])
  return Math.max(fromFiles, fromMark)
}
```

Even if all task files are deleted, the high water mark still records the historical maximum ID, and new tasks start numbering from there.

### Lock Strategy: Two Granularities

The system uses the `proper-lockfile` library with a fairly aggressive retry strategy:

```typescript
// Designed for ~10+ concurrent swarm agents
const LOCK_OPTIONS = {
  retries: {
    retries: 30,       // Up to 30 retries
    minTimeout: 5,     // Minimum 5ms
    maxTimeout: 100,   // Maximum 100ms
  },
}
// Total wait time ~2.6 seconds — sufficient for 10-way contention
```

Two lock granularities serve different scenarios:

| Granularity | Lock Target | Use Case |
|-------------|-------------|----------|
| **Task-level** | `\{taskId\}.json` | Updating a single task (e.g., changing status, setting owner) |
| **Directory-level** | `.lock` | Cross-task atomic operations (e.g., allocating ID for new task, claiming with busy check) |

Particularly noteworthy is `claimTaskWithBusyCheck` — it uses a directory-level lock to **atomically** perform the two-step "check if agent is idle + claim task" operation. If task-level locks were used, two agents could simultaneously pass the busy check and both claim successfully, violating the "one agent works on one task at a time" constraint.

## 11.3 Real-Time UI: Three-Layer Change Detection

Task state changes need to be reflected in the terminal UI in real time. Claude Code uses a **three-layer detection mechanism** to ensure no updates are missed:

### Layer 1: File System Events (fs.watch)

```typescript
// src/hooks/useTasksV2.ts
#rewatch(dir: string): void {
  this.#watcher = watch(dir, this.#debouncedFetch)
  this.#watcher.unref()  // Don't prevent process exit
}
```

The fastest notification method — OS-level file system events. Debounced at 50ms, since a single task operation may trigger multiple file events (e.g., modifying a task file + updating the high water mark).

**Limitation**: `fs.watch` is not 100% reliable (behavior varies across operating systems and file systems), and it cannot watch a task directory that doesn't exist yet.

### Layer 2: In-Process Signals (onTasksUpdated)

```typescript
// Called after every write operation in src/utils/tasks.ts
notifyTasksUpdated()

// Subscribed in useTasksV2.ts
this.#unsubscribeTasksUpdated = onTasksUpdated(this.#debouncedFetch)
```

When code within the same process modifies tasks (e.g., tasks created by the Agent itself), the UI is notified directly via an in-memory signal, independent of the file system.

**Coverage**: Instant updates within the same process, zero latency.

### Layer 3: Polling Fallback (5-Second Interval)

```typescript
// Only poll when there are incomplete tasks
if (hasIncomplete) {
  this.#pollTimer = setTimeout(this.#debouncedFetch, FALLBACK_POLL_MS)
  this.#pollTimer.unref()
}
```

The ultimate fallback — re-reads the task list every 5 seconds. Primarily covers **cross-process updates** (e.g., another Agent in a different tmux window modifying tasks), as well as edge cases where fs.watch is unreliable.

**Optimization**: Polling only occurs when there are incomplete tasks. Once all tasks are completed, polling stops to avoid unnecessary I/O.

### Why Three Layers?

Each layer covers different failure modes:

| Layer | Coverage | Latency | Reliability |
|-------|----------|---------|-------------|
| fs.watch | File changes on the same machine | ~50ms | Medium (platform-dependent) |
| In-process signal | Same-process operations | Instant | High |
| Polling | Cross-process, fs.watch failures | ≤5s | High |

The combined result: under normal conditions, changes are visible almost instantly; in the worst case, there is at most a 5-second delay.

### Singleton Store Pattern

```typescript
let _store: TasksV2Store | null = null
function getStore(): TasksV2Store {
  return (_store ??= new TasksV2Store())
}
```

All React components share a single `TasksV2Store` instance. Why not let each component create its own watcher?

The source code comment puts it directly: "Spinner mounts/unmounts every turn — per-hook watchers caused constant watch/unwatch churn." The Spinner component mounts and unmounts on every conversation turn. If it maintained its own watcher, it would constantly create and destroy file watchers — both wasteful and likely to miss events between unmounting and remounting.

The Singleton pattern decouples the watcher's lifecycle from "whether anyone is watching." The REPL component is always mounted, ensuring at least one subscriber exists so the Singleton is never destroyed.

### Auto-Hide and Reset

The behavior after all tasks are completed is elegant:

1. Detects that all tasks have become `completed`
2. Waits 5 seconds (`HIDE_DELAY_MS`) — giving the user time to see the completion status
3. Re-confirms all tasks are still completed (in case new tasks were created during the wait)
4. Calls `resetTaskList()` to clear task files
5. UI automatically collapses the task panel

This 5-second delay is a small detail but important — if tasks disappeared immediately upon completion, users couldn't confirm everything was truly done.

### Task Display Priority

Terminal space is limited (approximately 10 tasks can be displayed at most). `TaskListV2.tsx` uses priority sorting to decide which tasks are visible:

1. **Recently completed** (within 30 seconds) — lets the user see freshly completed work
2. **In progress** — what's currently being done
3. **Pending (unblocked)** — what can be done next
4. **Pending (blocked)** — what needs to wait
5. **Completed earlier** — lowest priority

Tasks exceeding the display limit are replaced with a summary: "... +2 in progress, 3 pending, 1 completed."

## 11.4 Context Injection: How Tasks Enter the LLM's View

Once tasks are created, they live on disk — but the LLM can't see disk files. How does task state become part of the model's input? The answer is **two parallel paths**: tool call results + periodic reminder injection.

### Path 1: Tool Call Results (Active Retrieval)

When the model calls `TaskCreate`, `TaskList`, `TaskGet`, or `TaskUpdate`, the tool execution return value is fed back into the conversation context as a `tool_result` message. For example, `TaskList` returns:

```
#1 [completed] Set up database schema
#2 [in_progress] Implement API endpoints (alice)
#3 [pending] Write integration tests [blocked by #2]
```

This is the most direct path — the model actively queries, the system returns the latest state. But the problem is: **what if the model forgets the task system exists?**

### Path 2: Periodic Reminders (Passive Injection)

This is the more elegant design. Claude Code's Attachment system automatically injects task reminders into the conversation at appropriate moments:

```typescript
// src/utils/attachments.ts
export const TODO_REMINDER_CONFIG = {
  TURNS_SINCE_WRITE: 10,     // 10 turns since last TaskCreate/TaskUpdate
  TURNS_BETWEEN_REMINDERS: 10, // At least 10 turns between reminders
}
```

**Trigger logic**: The system scans backward from the end of conversation history, counting:
1. How many assistant turns have passed since the last `TaskCreate` or `TaskUpdate` usage
2. How many assistant turns have passed since the last task reminder was shown

When both conditions are met (≥10 turns), the current task list is loaded from disk and an injection message is generated.
