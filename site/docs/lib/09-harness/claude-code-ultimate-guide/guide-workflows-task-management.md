---
title: "Task Management Workflow"
sourceId: "09-harness/claude-code-ultimate-guide"
sourceTitle: "Claude Code Ultimate Guide"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://github.com/FlorianBruniaux/claude-code-ultimate-guide"
entryUrl: "https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/workflows/task-management.md"
sourceRel: "guide/workflows/task-management.md"
rawUrl: "/raw/09-harness/claude-code-ultimate-guide/guide/workflows/task-management.md"
sourceSha256: "5e13ed00dc4b06d8faf6d4aa7e3319020d87e96c70690539cfe91f96827e06ca"
pageSha256: "5e13ed00dc4b06d8faf6d4aa7e3319020d87e96c70690539cfe91f96827e06ca"
contentMode: "local-full"
zh: ""
---

# Task Management Workflow

**Version**: Claude Code v2.1.16+
**Prerequisites**: Understanding of multi-session workflows, basic CLI proficiency
**Time**: 15-30 min to learn, applies to all complex projects

## Overview

Task management in Claude Code evolved significantly in v2.1.16 with the introduction of the **Tasks API**, complementing the original **TodoWrite** tool. This workflow teaches you when to use each system and how to coordinate tasks across sessions for complex projects.

**When to use this workflow:**
- Projects spanning multiple coding sessions
- Multi-agent coordination scenarios
- Complex task hierarchies with dependencies
- Need to resume work after context compaction or session interruption

**When NOT to use:**
- Single-session, straightforward implementations
- Quick fixes or exploratory coding
- Tasks completable in <10 minutes

---

## System Comparison Quick Reference

| Feature | TodoWrite (Legacy) | Tasks API (v2.1.16+) |
|---------|-------------------|---------------------|
| **Persistence** | Session memory only | Disk storage (`~/.claude/tasks/`) |
| **Multi-session** | ❌ Lost on session end | ✅ Survives across sessions |
| **Dependencies** | ❌ Manual ordering | ✅ Task blocking (A blocks B) |
| **Coordination** | Single agent | ✅ Multi-agent with broadcast |
| **Status tracking** | pending/in_progress/completed | pending/in_progress/completed |
| **When to use** | Simple single-session todos | Complex multi-session projects |

**Migration flag** (v2.1.19+):
```bash
# Use old system (TodoWrite)
CLAUDE_CODE_ENABLE_TASKS=false claude

# Use new system (Tasks API) - default since v2.1.19
claude
```

---

## Workflow Phase 1: Task Planning

**Goal**: Decompose complex work into trackable, executable units

### Step 1: Analyze Scope

Before creating tasks, understand what you're building:

```bash
# Discovery pattern
claude
> "Analyze this codebase for implementing JWT authentication:
  - Glob for existing auth patterns
  - Grep for security-related code
  - Identify integration points"
```

### Step 2: Design Task Hierarchy

Break work into logical phases with dependencies:

**Example: Authentication System**
```
Authentication System (parent)
├── 1. Login endpoint (no dependencies)
├── 2. Token refresh (depends on #1)
├── 3. Logout endpoint (depends on #1)
└── 4. Integration tests (depends on #1, #2, #3)
```

### Step 3: Create Task Structure

Use `TaskCreate` to materialize your plan:

```bash
# Session 1: Planning phase
export CLAUDE_CODE_TASK_LIST_ID="auth-system-v2"
claude

# Inside Claude session:
> "Create a task hierarchy for JWT authentication:

  Parent task: 'Implement JWT authentication system'
  - Description: Add JWT-based auth with refresh tokens and secure storage

  Child tasks:
  1. 'Create login endpoint' (no dependencies)
  2. 'Implement token refresh logic' (depends on task 1)
  3. 'Create logout endpoint' (depends on task 1)
  4. 'Write integration tests' (depends on tasks 1, 2, 3)

  Use TaskCreate with proper metadata."
```

**Expected output from Claude:**
```json
{
  "tasks": [
    {
      "id": "task-auth-parent",
      "title": "Implement JWT authentication system",
      "status": "pending",
      "children": ["task-login", "task-refresh", "task-logout", "task-tests"]
    },
    {
      "id": "task-login",
      "title": "Create login endpoint",
      "status": "pending",
      "dependencies": [],
      "metadata": {"priority": "high", "estimated_duration": "2h"}
    },
    {
      "id": "task-refresh",
      "title": "Implement token refresh logic",
      "status": "pending",
      "dependencies": ["task-login"],
      "metadata": {"priority": "high", "estimated_duration": "1h"}
    }
    // ... other tasks
  ]
}
```

---

## Workflow Phase 2: Task Execution

**Goal**: Execute tasks systematically with progress tracking

### Execution Pattern

```
TaskList → TaskGet (next pending) → Execute → TaskUpdate → Validate → Repeat
```

### Step 1: Discover Next Task

```bash
# Session 2: Start implementation
export CLAUDE_CODE_TASK_LIST_ID="auth-system-v2"
claude

> "TaskList to show all pending tasks"
```

**Output:**
```
Tasks for 'auth-system-v2':
✅ task-login: Create login endpoint [completed]
⏳ task-refresh: Implement token refresh logic [pending, blocked by: none]
⏳ task-logout: Create logout endpoint [pending, blocked by: none]
⏳ task-tests: Write integration tests [pending, blocked by: task-refresh, task-logout]
```

### Step 2: Get Task Details

```bash
> "TaskGet task-refresh to see full requirements"
```

**Output:**
```json
{
  "id": "task-refresh",
  "title": "Implement token refresh logic",
  "description": "Create endpoint POST /auth/refresh that validates refresh token and issues new access token",
  "status": "pending",
  "dependencies": ["task-login"],
  "metadata": {
    "priority": "high",
    "estimated_duration": "1h",
    "files": ["src/auth/refresh.ts", "src/middleware/auth.ts"]
  }
}
```

### Step 3: Execute & Update

```bash
> "Mark task-refresh as in_progress, then implement the token refresh endpoint according to requirements"

# Claude executes: TaskUpdate task-refresh status=in_progress
# Claude implements the feature...
# Upon completion:

> "Mark task-refresh as completed"
# Claude executes: TaskUpdate task-refresh status=completed
```

### Step 4: Validate

```bash
> "Run tests for token refresh functionality"

# If tests pass:
# ✅ Task remains completed

# If tests fail:
> "TaskUpdate task-refresh status=in_progress, add error details to metadata and fix issues"
```

---

## Workflow Phase 3: Session Management

**Goal**: Seamlessly resume work across sessions and context boundaries

### Persistence Mechanism
