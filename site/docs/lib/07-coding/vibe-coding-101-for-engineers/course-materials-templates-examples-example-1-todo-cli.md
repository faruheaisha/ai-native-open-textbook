---
title: "PRD Example 1: Todo CLI"
sourceId: "07-coding/vibe-coding-101-for-engineers"
sourceTitle: "Vibe Coding 101 for Software Engineers"
sourceKind: "系统课程"
licenseLabel: "仅引用"
lang: "英文"
tier: 3
volume: "07-coding"
sourceUrl: "https://github.com/goker/vibe-coding-101-for-software-engineers"
entryUrl: "https://github.com/goker/vibe-coding-101-for-software-engineers/blob/60d5a7fc465fc10be3b4478486a9535f1045f607/course-materials/templates/examples/example-1-todo-cli.md"
sourceRel: "course-materials/templates/examples/example-1-todo-cli.md"
rawUrl: "/raw/07-coding/vibe-coding-101-for-engineers/course-materials/templates/examples/example-1-todo-cli.md"
sourceSha256: "bf71122b557302a107c11fa526f8fd77e08675725117e5f41dc8d34b0b855db2"
pageSha256: "bf71122b557302a107c11fa526f8fd77e08675725117e5f41dc8d34b0b855db2"
contentMode: "local-full"
zh: ""
---

# PRD Example 1: Todo CLI

> **Difficulty:** Beginner | **Project Type:** CLI Tool | **Time:** 2-3 hours

---

# Todo CLI

## Overview

| | |
|---|---|
| **What** | A command-line todo list manager that stores tasks in a local JSON file |
| **Who** | Developers who prefer terminal-based workflows |
| **Why** | Quick task capture without leaving the terminal |

## Features

1. **Add Task:** `todo add "Buy groceries"` → Adds task with auto-generated ID
2. **List Tasks:** `todo list` → Shows all tasks with status ([ ] or [x])
3. **Complete Task:** `todo done 1` → Marks task #1 as complete
4. **Delete Task:** `todo delete 1` → Removes task #1 from list

## Non-Goals

**Will NOT build:**
- Due dates or reminders
- Priority levels or tags
- Multiple todo lists
- Cloud sync or backup
- Undo functionality

**Will NOT use:**
- Databases (SQLite, PostgreSQL, etc.)
- External APIs
- Rich terminal UI libraries (rich, textual)

## Technical Constraints

| | |
|---|---|
| **Language** | Python 3.11+ |
| **Framework** | None (stdlib only) |
| **Dependencies** | argparse, json, pathlib (all stdlib) |
| **Testing** | pytest, minimum 4 test cases |

**Data Storage:**
```json
{
  "tasks": [
    {"id": 1, "text": "Buy groceries", "done": false},
    {"id": 2, "text": "Call mom", "done": true}
  ]
}
```
File location: `~/.todo.json`

## Phases

### Phase 1: Add and List
**Tasks:** Create `todo.py` with `add` and `list` commands. Store in JSON file.
**Verify:**
```bash
python todo.py add "Test task"
python todo.py list
# Output: [ ] 1. Test task
```

### Phase 2: Complete and Delete
**Tasks:** Add `done` and `delete` commands. Handle invalid IDs gracefully.
**Verify:**
```bash
python todo.py done 1
python todo.py list
# Output: [x] 1. Test task
```

### Phase 3: Tests
**Tasks:** Create `test_todo.py` with tests for add, list, done, delete.
**Verify:** `pytest test_todo.py -v` → All tests pass

## Agent Rules

| Always | Ask First | Never |
|--------|-----------|-------|
| Handle missing file gracefully | Before changing JSON schema | Use external packages |
| Validate task IDs exist | Before adding new commands | Store data outside ~/.todo.json |
| Show helpful error messages | | Add features not in this PRD |
