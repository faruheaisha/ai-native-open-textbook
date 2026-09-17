---
title: "Claude How-To"
sourceId: "09-harness/claude-howto"
sourceTitle: "Claude How-To"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "09-harness"
sourceUrl: "https://github.com/luongnv89/claude-howto"
entryUrl: "https://github.com/luongnv89/claude-howto/blob/97bfb0685e03112ad39845889061d02cef6e534c/09-advanced-features/README.md"
sourceRel: "09-advanced-features/README.md"
rawUrl: "/raw/09-harness/claude-howto/09-advanced-features/README.md"
sourceSha256: "988281137b2d4521b357f46ae4fdd619ac2b8be6a7500cb14375141641efbc65"
pageSha256: "a58e74842c15c1364de4fefc2b4bba51095c18fce2a1f279e8918bfe8b5d57ce"
contentMode: "local-full"
zh: ""
---

## Planning Mode

Planning mode allows Claude to think through complex tasks before implementing them, creating a detailed plan that you can review and approve.

### What is Planning Mode?

Planning mode is a two-phase approach:
1. **Planning Phase**: Claude analyzes the task and creates a detailed implementation plan
2. **Implementation Phase**: After approval, Claude executes the plan

### When to Use Planning Mode

✅ Use planning mode for:
- Complex multi-file refactoring
- New feature implementations
- Architectural changes
- Database migrations
- Major API redesigns

❌ Don't use planning mode for:
- Simple bug fixes
- Formatting changes
- Single-file edits
- Quick queries

### Activating Planning Mode

**Slash command**:
```bash
/plan Implement user authentication system
```

**CLI flag**:
```bash
claude --permission-mode plan
```

**Set as default**:
```json
{
  "permissions": {
    "defaultMode": "plan"
  }
}
```

**Keyboard shortcut**:
- `Shift + Tab` - Toggle permission modes (including plan)
- `Alt + M` - Toggle permission modes (Windows/Linux)

### Benefits of Planning Mode

- **Structured implementation approach**: Detailed breakdown of implementation steps
- **Review and approval**: Approve or adjust the plan before execution
- **Risk identification**: Identify potential issues before implementation
- **Clear phases**: Organized implementation phases and milestones

### Example: Feature Implementation

```
User: /plan Add a real-time notification system

Claude: I'll create a plan for implementing real-time notifications.

## Implementation Plan

### Phase 1: Infrastructure Setup
1. Install WebSocket libraries (socket.io)
2. Set up WebSocket server
3. Configure connection management

### Phase 2: Backend Implementation
4. Create notification service
5. Implement notification queue
6. Add database schema for notifications
7. Create API endpoints

### Phase 3: Frontend Integration
8. Set up WebSocket client
9. Create notification UI components
10. Implement notification state management
11. Add notification permissions

### Phase 4: Testing & Deployment
12. Write unit tests
13. Write integration tests
14. Update documentation
15. Deploy to staging

Estimated time: 3-4 hours
Files to modify: 12
New files to create: 8

Ready to proceed? (yes/no/modify plan)

User: yes

Claude: [Begins implementation following the plan]
```

### Plan Modifications

```
User: Modify the plan - skip the queue for now, we'll add it later

Claude: Updated plan:
[Shows modified plan with queue removed]

User: Looks good, proceed

Claude: [Implements modified plan]
```

### Planning Mode Configuration

Planning mode is activated via the CLI flag or slash command:

```bash
# Activate plan mode via CLI
claude --permission-mode plan

# Or use the /plan slash command inside the REPL
/plan Implement user authentication system
```

**Model alias for planning**: Use `opusplan` as a model alias to use Opus for planning and Sonnet for execution:

```bash
claude --model opusplan "design and implement the new API"
```

**Edit plan externally**: Press `Ctrl+G` to open the current plan in your external editor for detailed modifications.

> **v2.1.112 update**: Plan files are now named after the prompt that produced them (instead of random words), making them easier to browse and reuse.

> **v2.1.136 update — plan-mode write blocks are unconditional**: Plan mode now blocks all file writes, including when a matching `Edit(...)` rule exists in `permissions.allow`. Previously a permissive `Edit(...)` rule could let writes through in plan mode; that bypass is closed. If a workflow depended on the older behavior, exit plan mode (`Shift+Tab`) before editing.
