---
title: "🌳 GIT SYSTEM"
sourceId: "07-coding/cloudflare-vibesdk"
sourceTitle: "Cloudflare VibeSDK"
sourceKind: "产品仓库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "07-coding"
sourceUrl: "https://github.com/cloudflare/vibesdk"
entryUrl: "https://github.com/cloudflare/vibesdk/blob/9da158d82c597a0e8f4bf033cdccd1053fb6fb15/docs/llm.md"
sourceRel: "docs/llm.md"
rawUrl: "/raw/07-coding/cloudflare-vibesdk/docs/llm.md"
sourceSha256: "5cade1cd8dea6404f985f3f367e0c0233441fc841f741f71f3da1e6c1e0c9cf7"
pageSha256: "29ec04d7f9d69d198741cf343a9bf7dbd53a3e38459bb05960837baa3389a3b7"
contentMode: "local-full"
zh: ""
---

# 🌳 GIT SYSTEM

## Overview

**Location:** `/worker/agents/git/`

Vibesdk uses **isomorphic-git** to manage version control entirely in the browser/Worker environment - no git binary required.

**Key features:**
- Git operations in SQLite (no filesystem needed)
- Full commit history tracking
- Git clone protocol support (clone generated repos)
- Template rebasing for clean history

---

## Git Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                   Agent (Durable Object)                    │
│  - Generates files                                          │
│  - Tracks changes                                           │
└────────────────┬────────────────────────────────────────────┘
                 │
                 ↓ Calls
┌─────────────────────────────────────────────────────────────┐
│                      GitService                             │
│  - commitFiles()                                            │
│  - getCommitHistory()                                       │
│  - buildCloneRepository()                                   │
└────────────────┬────────────────────────────────────────────┘
                 │
                 ↓ Uses
┌─────────────────────────────────────────────────────────────┐
│                    isomorphic-git                           │
│  - commit(), log(), readCommit()                            │
│  - Works with SQLite filesystem                             │
└────────────────┬────────────────────────────────────────────┘
                 │
                 ↓ Stores in
┌─────────────────────────────────────────────────────────────┐
│                  SQLite Filesystem                          │
│  - fs-adapter.ts                                            │
│  - Git objects stored as blobs                              │
│  - Read/write via SQL queries                               │
└─────────────────────────────────────────────────────────────┘
```

---

## Core Operations

### **1. File Commits**
**When:** After each phase implementation, after fixes

**Flow:**
1. Agent tracks file changes (new/modified)
2. Calls `GitService.commitFiles(files, message)`
3. Git service stages all files
4. Creates commit with metadata:
   - Author: "vibesdk AI Agent"
   - Committer: same
   - Message: "Phase X: Feature Y" or "Fix: Bug Z"
   - Timestamp: current time
5. Stores commit in SQLite
6. Returns commit SHA

**Example messages:**
- "Phase 1: Initial project setup"
- "Phase 2: Add user authentication"
- "Fix: Resolve type errors in UserStore"
- "Update: Improve button styling"

### **2. Commit History**
**Used by:** Git clone service, UI display

**Flow:**
1. Query git log via isomorphic-git
2. Returns commits with:
   - SHA, author, message, timestamp
   - Parent commits
   - Tree (file snapshot)
3. Ordered newest first

### **3. Git Clone Service**
**Purpose:** Allow users to clone their generated repos locally

**Location:** `/worker/agents/git/git-clone-service.ts`

**Problem:** Agent commits are separate from template commits. Users cloning would get disconnected history.

**Solution:** Rebase agent commits on top of template

**Process:**
1. **Create fresh repo** in memory (MemFS)
2. **Template base commit:**
   - Write all template files
   - Commit as "Initial template setup"
   - This becomes commit #0
3. **Import agent's git objects** (skip refs)
4. **Replay each agent commit:**
   - Read commit from agent's repo
   - Extract files from commit tree
   - Write files to memory repo (template + agent files)
   - Stage ALL files
   - Create new commit with:
     - Same message as original
     - Same author/committer
     - Same timestamps
     - Parent = previous rebased commit
5. **Generate packfile:**
   - Collect ALL git objects
   - Create git packfile (binary format)
   - Return via HTTP (git clone protocol)

**Result:** Clean linear history starting from template

### **4. Git Clone Protocol**

**Endpoints:**
- `GET /git/\{agentId\}/info/refs?service=git-upload-pack` - Returns refs (branches/tags)
- `POST /git/\{agentId\}/git-upload-pack` - Returns packfile for clone

**Usage:**
```bash
git clone https://vibesdk.com/git/{agentId}
```

User gets complete repository with:
✅ All commits with original messages
✅ Full file history
✅ Template base included
✅ Can push to GitHub, modify locally, etc.

---

## SQLite Filesystem Adapter

**Location:** `/worker/agents/git/fs-adapter.ts`

**Purpose:** Make SQLite look like a filesystem to isomorphic-git

**Implementation:**
- Implements Node.js `fs` API (readFile, writeFile, readdir, stat, etc.)
- Stores files as blobs in SQLite
- Handles directory structures
- Supports git object storage format

**Why SQLite?**
- Durable Objects have SQLite built-in
- Persistent across DO hibernation
- Fast for git operations
- No external filesystem needed

---

## Memory Filesystem (MemFS)

**Location:** `/worker/agents/git/MemFS.ts`

**Purpose:** Ephemeral in-memory filesystem for clone service

**Usage:**
- Git clone service builds repo in memory
- Fast (no disk I/O)
- Garbage collected after request completes
- Full async API for isomorphic-git

---

## Commit Preservation

When cloning, the following are preserved:

✅ **Commit messages** - Exact text
✅ **Author info** - Name, email
✅ **Timestamps** - Original commit times
✅ **Committer info** - Who made the commit  
✅ **File states** - Exact file content at each commit
✅ **Template files** - Base template in all commits

❌ **NOT preserved:**
- Original commit SHAs (rebased, so new SHAs)
- Agent's internal refs (branches reset)

---

## Testing

**Coverage:** 140 tests passing

**Test areas:**
- Basic git workflow (init, add, commit, log)
- Template rebasing with multiple commits
- Packfile generation
- Large-scale operations (100+ commits)
- File content integrity
- Commit metadata preservation

---

## GitVersionControl Class & Git Tool

### **Overview**

**Location:** `/worker/agents/git/git.ts`

The `GitVersionControl` class wraps isomorphic-git with Git CLI-aligned semantics and provides callback support for FileManager synchronization.

### **Key Methods**

#### **1. commit(files, message)**
Standard git commit - stages and commits files.

```typescript
await git.commit([], 'feat: Add authentication');
```

#### **2. reset(ref, options?)**
**Aligns with:** `git reset --hard <commit>`

```typescript
await git.reset('abc123', { hard: true });
// Moves HEAD to commit, updates working directory
// No new commit created (destructive)
```

**Behavior:**
- Moves HEAD to specified commit
- Updates working directory (hard: true by default)
- **Does NOT create a new commit**
- Triggers `onFilesChangedCallback`

#### **3. log(limit?)**
Query commit history - standard git log.

#### **4. show(oid)**
Show commit details - files changed in commit.

#### **5. setOnFilesChangedCallback(callback)**
Register callback to be notified after git operations that change files.

```typescript
git.setOnFilesChangedCallback(() => {
  fileManager.syncGeneratedFilesMapFromGit();
});
```

#### **6. getAllFilesFromHead()**
Get all files from HEAD commit for syncing.

```typescript
const files = await git.getAllFilesFromHead();
// Returns: [{ filePath: string, fileContents: string }]
```

### **FileManager Sync Pattern**

**File:** `/worker/agents/services/implementations/FileManager.ts`

FileManager is **self-contained** - it registers with GitVersionControl during construction and auto-syncs after git operations.

```typescript
constructor(stateManager, getTemplateDetailsFunc, git) {
  // Auto-register callback with git
  this.git.setOnFilesChangedCallback(() => {
    this.syncGeneratedFilesMapFromGit();
  });
}

private async syncGeneratedFilesMapFromGit(): Promise<void> {
  // Get all files from HEAD commit
  const gitFiles = await this.git.getAllFilesFromHead();
  
  // Preserve existing file purposes
  const oldMap = this.stateManager.getState().generatedFilesMap;
  
  // Build new map
  const newMap = {};
  for (const file of gitFiles) {
    newMap[file.filePath] = {
      ...file,
      filePurpose: oldMap[file.filePath]?.filePurpose || 'Generated file',
      lastDiff: ''
    };
  }
  
  // Update state
  this.stateManager.setState({ generatedFilesMap: newMap });
}
```

**Flow:**
1. FileManager constructed → Registers callback with git
2. User performs operations → Dual-write continues (map + git)
3. User calls git reset/checkout → Git modifies files
4. Git calls callback → FileManager.syncGeneratedFilesMapFromGit()
5. Sync reads from HEAD → Updates generatedFilesMap
6. State synchronized ✅

### **Git Tool - Access Control**

**Location:** `/worker/agents/tools/toolkit/git.ts`

The git tool has **parameterized access control** - different commands available in different contexts.

#### **Tool Creation**

```typescript
export function createGitTool(
  agent: CodingAgentInterface,
  logger: StructuredLogger,
  options?: { excludeCommands?: GitCommand[] }
): ToolDefinition<...> {
  const allowedCommands = options?.excludeCommands
    ? allCommands.filter(cmd => !options.excludeCommands!.includes(cmd))
    : allCommands;
  
  // Dynamic enum and description based on allowed commands
  return {
    function: {
      enum: allowedCommands,
      description: hasReset 
        ? "... WARNING: reset is destructive!"
        : "...",
    }
  };
}
```

#### **Access by Context**

| Context | Available Commands | File | Notes |
|---------|-------------------|------|-------|
| **User Conversations** | commit, log, show | `/worker/agents/tools/customTools.ts` (line 56) | ✅ Safe - no destructive ops |
| **Deep Debugger** | commit, log, show, reset | `/worker/agents/tools/customTools.ts` (line 71) | ⚠️ Full access with warnings |

**User Conversations:**
```typescript
// Safe version - no reset
createGitTool(agent, logger, { excludeCommands: ['reset'] })
```

**Deep Debugger:**
```typescript
// Full access - includes reset
createGitTool(session.agent, logger) // No restrictions
```

#### **Reset Command - Safety**

**Deep debugger prompt warnings:**
- Marked as **UNTESTED** and **DESTRUCTIVE**
- Only use when:
  - User explicitly requests it
  - Tried everything else
  - Absolutely certain it's necessary
- Must warn user before using
- Prefer alternatives: regenerate_file, generate_files

### **Why This Architecture?**

✅ **Single implementation** - DRY principle maintained  
✅ **Type-safe** - TypeScript enforces valid commands  
✅ **Context-aware** - Different access in different contexts  
✅ **Flexible** - Easy to add more restrictions  
✅ **Safe default** - Users can't accidentally reset commits  
✅ **Git CLI semantics** - Aligns with actual git behavior  

### **Removed Methods**

- `inferPurposeFromPath()` - Removed as requested
- `revert()` - Was creating incorrect "revert commits"
- `restoreCommit()` - Renamed to internal helper `readFilesFromCommit`

---

### **Why These Limits?**

**MAX_PHASES = 12:**
- Prevents infinite generation loops
- Forces focused, efficient implementation
- Keeps projects manageable

**MAX_TOOL_CALLING_DEPTH = 7:**
- Prevents infinite recursion
- Typically need 2-3 levels max
- Safety against runaway LLM behavior

**MAX_IMAGES_PER_MESSAGE = 2:**
- Balance between utility and cost
- Vision API costs are high
- Usually 1-2 images sufficient for context

**MAX_LLM_MESSAGES = 200:**
- Prevents conversation from growing unbounded
- Compactification kicks in before this
- Typical session has 20-50 messages

### **State Machine - Detailed Flow**

**States:** Defined in `CurrentDevState` enum

```
┌─────────────────────────────────────────────────────────┐
│                    IDLE                                  │
│  (No active generation)                                  │
└──────────────────┬──────────────────────────────────────┘
                   │ User clicks "Generate"
                   ↓
┌─────────────────────────────────────────────────────────┐
│              PHASE_GENERATING                            │
│  • LLM plans next phase                                  │
│  • Determines files to create                            │
│  • Decides if last phase                                 │
└──────────────────┬──────────────────────────────────────┘
                   │
                   ↓
┌─────────────────────────────────────────────────────────┐
│            PHASE_IMPLEMENTING                            │
│  • Generate files (streaming)                            │
│  • Deploy to sandbox                                     │
│  • Run static analysis                                   │
│  • Check runtime errors                                  │
└──────────────────┬──────────────────────────────────────┘
                   │
                   ↓
┌─────────────────────────────────────────────────────────┐
│               REVIEWING                                  │
│  • Code review agent analyzes files                      │
│  • Identifies issues                                     │
│  • Regenerates files with fixes (parallel)               │
│  • Redeploys and verifies                                │
└──────────────────┬──────────────────────────────────────┘
                   │
                   ├─→ More phases needed? → PHASE_GENERATING
                   │
                   ↓ All phases complete
┌─────────────────────────────────────────────────────────┐
│              FINALIZING                                  │
│  • Final code review                                     │
│  • Final fixes                                           │
│  • Mark as complete                                      │
└──────────────────┬──────────────────────────────────────┘
                   │
                   ↓
┌─────────────────────────────────────────────────────────┐
│                    IDLE                                  │
│  Generation complete, ready for user input               │
└─────────────────────────────────────────────────────────┘
```

### **State Transitions**

| From | To | Trigger |
|------|----|---------|
| IDLE | PHASE_GENERATING | User starts generation / Resume after queue |
| PHASE_GENERATING | PHASE_IMPLEMENTING | Phase plan ready |
| PHASE_IMPLEMENTING | REVIEWING | Files generated, deployed |
| REVIEWING | IDLE | Review complete (not looping back to PHASE_GENERATING) |
| FINALIZING | REVIEWING | After final fixes, review again |
| PHASE_IMPLEMENTING | FINALIZING | Last phase, no more phases needed |
| ANY | IDLE | User stops generation |

### **State Persistence**

- State stored in `CodeGenState.currentDevState`
- Survives page refreshes
- Used to resume generation after reconnect
- If `shouldBeGenerating=true` and state=IDLE → restart

---

## 🧠 Deep Debugger

### **System Prompt & Configuration**
**File:** `/worker/agents/assistants/codeDebugger.ts`
- System prompt defines behavior, diagnostic priorities, action-oriented instructions
- Model: Gemini 2.5 Pro (reasoning_effort: high, 32k tokens, temperature: 0.2)
- Max tool depth: 7 recursive calls

### **Available Tools**
**Tool Registry:** `/worker/agents/tools/customTools.ts` → `buildDebugTools()` function (lines 59-87)

**Tool Definitions Location:** `/worker/agents/tools/toolkit/`

Each tool is a separate file:
1. **read-files.ts** - Read source code
2. **run-analysis.ts** - TypeScript static analysis (tsc --noEmit)
3. **get-runtime-errors.ts** - Fetch runtime errors from sandbox
4. **get-logs.ts** - Container logs (dev server, console)
5. **regenerate-file.ts** - Fix single file with issues list
6. **generate-files.ts** - Generate multiple files
7. **deploy-preview.ts** - Deploy to sandbox
8. **exec-commands.ts** - Run shell commands
9. **wait.ts** - Wait N seconds (for user interaction)
10. **git.ts** - Version control (commit, log, show, reset)

### **How Tools Work**
Each tool file exports:
```typescript
// Structure in /worker/agents/tools/toolkit/{tool-name}.ts
export function createToolName(agent: CodingAgentInterface, logger: StructuredLogger) {
  return {
    type: 'function',
    function: {
      name: 'tool_name',
      description: 'Brief description (LLM sees this)',
      parameters: { /* JSON schema */ }
    },
    implementation: async (args) => {
      // Tool logic here
      return result;
    }
  };
}
```

### **To Add a New Tool:**
1. Create `/worker/agents/tools/toolkit/my-tool.ts`
2. Export `createMyTool(agent, logger)` function
3. Import in `/worker/agents/tools/customTools.ts`
4. Add to either `buildTools()` (conversation) or `buildDebugTools()` (debugging)
5. Tool automatically available to LLM

### **Diagnostic Priority (in system prompt)**
1. **run_analysis** first (fast, no user interaction needed)
2. **get_runtime_errors** second (focused errors)
3. **get_logs** last resort (verbose, cumulative)

**Can fix multiple files in parallel** - `regenerate_file` called simultaneously on different files

**Concurrency:** Cannot run while code generation active - checked via `agent.isCodeGenerating()`

---

## 🔌 WebSocket Communication

### **Connection Flow**
1. User visits `/chat/:chatId`
2. Frontend calls `apiClient.connectToAgent(chatId)`
3. API returns `websocketUrl`
4. Frontend connects via PartySocket
5. Backend sends `agent_connected` with full state
6. Frontend restores UI

### **State Restoration**
```typescript
case 'agent_connected': {
  // Backend sends snapshot
  setState(message.state);
  websocket.send({ type: 'get_conversation_state' });
}

case 'conversation_state': {
  // Restore with deduplication
  const deduplicated = deduplicateMessages(message.messages);
  setMessages(prev => [...prev, ...deduplicated]);
}
```

### **Streaming Pattern**
```typescript
// Backend sends chunks
ws.send({
  type: 'conversation_response',
  conversationId: 'abc',
  message: 'chunk',
  isStreaming: true,
});

// Frontend updates in place
setMessages(prev => updateOrAppendMessage(prev, id, content));
```

---

## 🛠️ Implementation Patterns

### **Adding New API Endpoint**

**1. Define types (`src/api-types.ts`):**
```typescript
export interface GetFeatureRequest {
  id: string;
}

export interface GetFeatureResponse {
  feature: Feature;
}
```

**2. Add to API client (`src/lib/api-client.ts`):**
```typescript
export const apiClient = {
  async getFeature(req: GetFeatureRequest): Promise<GetFeatureResponse> {
    const response = await fetch('/api/features', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req),
    });
    if (!response.ok) throw new ApiError(response);
    return response.json();
  },
};
```

**3. Create service (`worker/database/services/FeatureService.ts`):**
```typescript
export class FeatureService {
  constructor(private env: Env) {}
  
  async getFeature(id: string): Promise<Feature> {
    // Database logic
  }
}
```

**4. Create controller (`worker/api/controllers/feature/controller.ts`):**
```typescript
export const featureController = {
  async getFeature(c: Context<AppEnv>) {
    const body = await c.req.json<GetFeatureRequest>();
    const service = new FeatureService(c.env);
    const feature = await service.getFeature(body.id);
    return c.json({ feature });
  },
};
```

**5. Add route (`worker/api/routes/feature-routes.ts`):**
```typescript
export const featureRoutes = new Hono<AppEnv>();
featureRoutes.post('/', featureController.getFeature);
```

**6. Register in main router (`worker/api/routes/index.ts`):**
```typescript
router.route('/api/features', featureRoutes);
```

### **Creating Custom Hook**

**Pattern:** `/src/hooks/use-\{feature\}.ts`
```typescript
export function useFeature(params: FeatureParams) {
  const [data, setData] = useState<FeatureData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  
  useEffect(() => {
    async function fetch() {
      try {
        const result = await apiClient.getFeature(params);
        setData(result);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }
    fetch();
  }, [params]);
  
  const refetch = useCallback(() => {
    setLoading(true);
    // ... refetch logic
  }, [params]);
  
  return { data, loading, error, refetch };
}
```

### **Adding LLM Tool**

**1. Create tool file (`worker/agents/tools/toolkit/my-tool.ts`):**
```typescript
export function createMyToolDefinition() {
  return {
    type: 'function' as const,
    function: {
      name: 'my_tool',
      description: 'Brief description (2-3 lines max)',
      parameters: {
        type: 'object',
        properties: {
          param: { type: 'string', description: 'Param description' },
        },
        required: ['param'],
      },
    },
  };
}

export async function myToolImplementation(
  args: { param: string },
  context: ToolContext,
  streamCb?: StreamCallback
): Promise<ToolResult> {
  // Check concurrency if needed
  if (context.agent.isCodeGenerating()) {
    return { error: 'GENERATION_IN_PROGRESS' };
  }
  
  // Implementation
  const result = await doWork(args.param);
  
  return { result };
}
```

**2. Register tool (`worker/agents/tools/customTools.ts`):**
```typescript
import { createMyToolDefinition, myToolImplementation } from './toolkit/my-tool';

export function buildTools(agent: CodingAgentInterface) {
  return [
    // ... existing tools
    createTool(createMyToolDefinition(), myToolImplementation),
  ];
}
```

---

## 🧪 Testing Patterns

### **Frontend Tests**
- Component tests in `__tests__/` directories
- Integration tests for hooks
- E2E tests with Playwright (if applicable)

### **Backend Tests**
- Unit tests for services
- Integration tests for API endpoints
- Tool execution tests

---

## 📝 Documentation Standards

### **Code Comments**
- Explain WHY, not WHAT (code should be self-documenting)
- Keep comments brief and to the point
- Update comments when code changes
- No emojis in code comments

### **Type Documentation**
```typescript
// ✅ GOOD
/**
 * Represents a generated file in the chat interface.
 * Contains both metadata and content.
 */
export interface FileType {
  filePath: string;
  fileContents: string;
  isGenerating: boolean;
}

// ❌ BAD
// This is a file type that we use to represent files
export interface FileType { ... }
```

---

## 🔍 Debugging Guide

### **Frontend Debugging**
- Use React DevTools for component state
- Check browser console for errors
- Monitor WebSocket messages in Network tab
- Use Debug Panel in chat interface

### **Backend Debugging**
- Check Cloudflare Workers logs
- Use `wrangler tail` for live logs
- Add strategic console.log with prefixes: `[TOOL_CALL_DEBUG]`, `[WS_DEBUG]`
- Check DO storage for persisted state

### **Common Issues**

**Empty Deep Debug Transcript:**
- Check `max_tokens` is sufficient (32000+)
- Verify tool calls are completing
- Check for abort signals

**Duplicate Messages:**
- Verify deduplication utilities are used
- Check backend history management
- Ensure tool results aren't causing re-calls

**WebSocket Disconnects:**
- Check retry logic in `use-chat.ts`
- Verify DO isn't being evicted prematurely
- Check for abort controller issues

---

## 📦 Deployment

### **Frontend**
- Built with Vite
- Deployed as static assets
- Served by Cloudflare Pages or Workers

### **Backend**
- Deployed via Wrangler
- Durable Objects for stateful agents
- D1 for persistent database
- KV for caching (if used)

### **Database Migrations**
```bash
# Generate migration
npm run db:generate

# Apply migrations (local)
npm run db:migrate:local

# Apply migrations (production)
npm run db:migrate:remote
```

---

## 🔄 Continuous Improvement

### **Keep This Document Updated**

When you:
- Add new features or components
- Discover undocumented patterns
- Find inaccuracies or outdated info
- Learn domain-specific knowledge
- Identify new best practices

**Update sections:**
- Add to relevant section
- Create new section if needed
- Mark outdated info with ⚠️ and correction
- Add examples for clarity
- Keep it concise but complete

### **Document Structure**
This guide is organized by:
1. Core principles (rules that never change)
2. Architecture (how things are structured)
3. Patterns (how to implement features)
4. Examples (concrete implementations)

Keep this structure when adding content.

---

## 🔌 WebSocket Communication - Complete Reference

### **WebSocket Message Types**

**Location:** `/worker/agents/constants.ts`

#### **Request Messages (Frontend → Backend):**

```typescript
WebSocketMessageRequests:
- GENERATE_ALL: 'generate_all'           // Start code generation
- DEPLOY: 'deploy'                       // Deploy to Cloudflare Workers
- PREVIEW: 'preview'                     // Deploy to sandbox preview
- STOP_GENERATION: 'stop_generation'     // Cancel current operation
- RESUME_GENERATION: 'resume_generation' // Resume paused generation
- USER_SUGGESTION: 'user_suggestion'     // User message (conversational AI)
- CLEAR_CONVERSATION: 'clear_conversation' // Reset chat history
- GET_CONVERSATION_STATE: 'get_conversation_state' // Request history
- GET_MODEL_CONFIGS: 'get_model_configs' // Request model info
- CAPTURE_SCREENSHOT: 'capture_screenshot' // Capture preview screenshot
- GITHUB_EXPORT: 'github_export'         // DEPRECATED - use OAuth flow
```

#### **Response Messages (Backend → Frontend):**

```typescript
WebSocketMessageResponses:
// Generation Lifecycle
- generation_started: Start of generation process
- generation_complete: All generation finished
- generation_stopped: User cancelled generation
- generation_resumed: Generation restarted after pause

// Phase Progress
- phase_generating: Planning next phase (LLM thinking)
- phase_generated: Phase plan ready
- phase_implementing: Generating files for phase
- phase_implemented: Phase complete, preview refreshing
- phase_validating: Code review in progress
- phase_validated: Code review complete

// File Progress
- file_generating: File generation started
- file_chunk_generated: Streaming file content chunk
- file_generated: File completed
- file_regenerating: Fixing file after review
- file_regenerated: File fix complete

// Code Quality
- code_reviewing: Static analysis + runtime error check
- code_reviewed: Review complete with results
- runtime_error_found: Runtime errors detected in sandbox
- deterministic_code_fix_started: Auto-fixing TypeScript errors
- deterministic_code_fix_completed: Auto-fix complete

// Deployment
- deployment_started: Preview deployment started
- deployment_completed: Preview ready (with URL)
- deployment_failed: Preview deployment failed
- preview_force_refresh: Force iframe refresh
- cloudflare_deployment_started: Production deployment started
- cloudflare_deployment_completed: Deployed to Cloudflare (with URL)
- cloudflare_deployment_error: Production deployment failed

// Screenshot
- screenshot_capture_started: Screenshot capture initiated
- screenshot_capture_success: Screenshot saved
- screenshot_capture_error: Screenshot failed

// Conversational AI
- conversation_response: AI message (streaming or complete)
- conversation_state: Full chat history
- conversation_cleared: Chat history cleared
- project_name_updated: Project renamed
- blueprint_updated: Blueprint modified

// System
- error: Generic error message
- rate_limit_error: Rate limit exceeded
- model_configs_info: Model configuration data
```

### **WebSocket Message Flow Examples**

#### **1. Code Generation Flow:**
```
User clicks "Generate" button
  ↓
Frontend: GENERATE_ALL
  ↓
Backend: generation_started
  ↓
[For each phase]
  Backend: phase_generating (LLM thinking)
  Backend: phase_generated (plan ready)
  Backend: phase_implementing (files starting)
  [For each file]
    Backend: file_generating
    Backend: file_chunk_generated (streaming)
    Backend: file_generated
  Backend: deployment_started
  Backend: deployment_completed (preview URL)
  Backend: code_reviewing (static analysis)
  Backend: code_reviewed (results)
  Backend: phase_implemented (phase done)
  ↓
Backend: generation_complete
```

#### **2. User Conversation Flow:**
```
User types message → clicks send
  ↓
Frontend: USER_SUGGESTION { message, images? }
  ↓
Backend: conversation_response { isStreaming: true } (chunks)
  ↓
[If tool calls]
  Backend: conversation_response { tool: { name, status: 'start' } }
  Backend: conversation_response { tool: { name, status: 'success', result } }
  ↓
Backend: conversation_response { isStreaming: false } (final)
```

#### **3. Abort Generation Flow:**
```
User clicks abort button
  ↓
Frontend: STOP_GENERATION
  ↓
Backend: 
  - Calls agent.cancelCurrentInference()
  - Aborts active AbortController
  - Sets shouldBeGenerating = false
  ↓
Backend: generation_stopped
  ↓
Frontend:
  - Marks active phases as 'cancelled'
  - Shows orange X icon
  - Disables abort button
```

### **Critical State Flags**

#### **`shouldBeGenerating` Flag**

**Purpose:** Persistent intent to generate code, survives page refreshes.

**When set to `true`:**
- User clicks "Generate" button
- User resumes generation

**When set to `false`:**
- User clicks "Stop" button
- Generation completes successfully
- Generation fails permanently

**Why it matters:**
- On page refresh, if `shouldBeGenerating=true` and no active generation → restart
- Prevents abandoned generation sessions
- Used by frontend to show "generating" vs "cancelled" phases

---

## 🤖 Conversational AI System ("Orange")

### **Purpose**
Orange is the AI interface between users and the development agent. It handles:
- User questions and discussions
- Feature/bug requests (via `queue_request` tool)
- Immediate debugging (via `deep_debug` tool)
- Web searches for information

### **System Prompt Philosophy**

**CRITICAL:** Orange speaks AS IF it's the developer:
- ✅ "I'll add that feature"
- ✅ "I'm fixing that bug"
- ❌ NEVER: "The team will...", "The agent will..."

**Two Options for User Requests:**

1. **Immediate Action (deep_debug):**
   - For active bugs needing instant fixes
   - Transfers control to autonomous debug agent
   - Returns transcript after completion
   - User sees real-time progress

2. **Queued Implementation (queue_request):**
   - For features or non-urgent fixes
   - Relays to development agent
   - Implemented in next phase
   - Tell user: "I'll have that in the next phase or two"

### **Available Tools**

**Location:** `/worker/agents/tools/customTools.ts` → `buildTools()`

```typescript
1. queue_request: Queue modification requests
2. get_logs: Fetch sandbox logs (USE SPARINGLY)
3. deep_debug: Autonomous debugging (immediate fixes)
4. git: Version control (commit, log, show) - Safe version without reset
5. wait_for_generation: Wait for code generation
6. wait_for_debug: Wait for debug session
7. deploy_preview: Redeploy sandbox
8. clear_conversation: Clear chat history
9. rename_project: Rename the project
10. alter_blueprint: Modify blueprint fields
11. web_search: Search the web
12. feedback: Submit platform feedback
```

**Note:** User conversations get **safe git tool** (no reset command). Deep debugger gets **full git tool** (includes reset with warnings).

### **Tool Call Rendering**

**Pattern:**
```typescript
// Tool calls appear as expandable UI in chat messages
conversation_response {
  tool: {
    name: 'deep_debug',
    status: 'start' | 'success' | 'error',
    args: { issue: "..."},
    result: "transcript or error"
  }
}
```

**Frontend displays:**
- Tool name with icon
- Status indicator (spinner/check/alert)
- Expandable arguments
- Expandable result (for deep_debug, shows full transcript)

### **Conversation History Management**

**Two-Tier Storage:**

1. **Running History (Compact):**
   - Used for LLM context
   - Size-limited for token efficiency
   - Can be archived/summarized
   - Stored in `compact_conversations` table

2. **Full History:**
   - Complete conversation log
   - Used for UI restoration
   - Never truncated
   - Stored in `full_conversations` table

**Compactification:**
```typescript
COMPACTIFICATION_CONFIG:
- MAX_TURNS: 40 conversation turns
- MAX_ESTIMATED_TOKENS: 100,000 tokens
- PRESERVE_RECENT_MESSAGES: 10 messages always kept
- CHARS_PER_TOKEN: 4 (estimation)
```

**Update Pattern:**
```typescript
addConversationMessage(message) {
  // Update or append to both histories
  if (exists) {
    // Update existing (for streaming)
    runningHistory[index] = message;
  } else {
    // Append new message
    runningHistory.push(message);
  }
  // Same for fullHistory
  save();
}
```

---

## 🛠️ Tool System Architecture

### **Tool Definition Pattern**

**Location:** `/worker/agents/tools/toolkit/\{tool-name\}.ts`

```typescript
// 1. Define tool schema
export function createMyToolDefinition() {
  return {
    type: 'function' as const,
    function: {
      name: 'my_tool',
      description: 'CONCISE description (2-3 lines max)',
      parameters: {
        type: 'object',
        properties: {
          param: { 
            type: 'string', 
            description: 'Param description' 
          }
        },
        required: ['param'],
      },
    },
  };
}

// 2. Implement tool logic
export async function myToolImplementation(
  args: { param: string },
  context: ToolContext,
  streamCb?: StreamCallback
): Promise<ToolResult> {
  // Validation
  if (!args.param) {
    return { error: 'Missing required parameter' };
  }
  
  // Concurrency checks (if needed)
  if (context.agent.isCodeGenerating()) {
    return { error: 'GENERATION_IN_PROGRESS' };
  }
  
  // Execute tool logic
  const result = await doWork(args.param);
  
  // Stream progress if callback provided
  streamCb?.('Processing...');
  
  return { result };
}
```

### **Tool Registration**

**For Conversation Tools:**
```typescript
// File: /worker/agents/tools/customTools.ts
import { createMyToolDefinition, myToolImplementation } from './toolkit/my-tool';

export function buildTools(
  agent: CodingAgentInterface,
  logger: StructuredLogger,
  toolRenderer: RenderToolCall,
  streamCb: (chunk: string) => void
): ToolDefinition[] {
  return [
    // ... existing tools
    createTool(createMyToolDefinition(), myToolImplementation),
  ];
}
```

**For Debug Tools:**
```typescript
export function buildDebugTools(
  session: DebugSession,
  logger: StructuredLogger
): ToolDefinition[] {
  return [
    createReadFilesTool(session.agent, logger),
    createRunAnalysisTool(session.agent, logger),
    createRegenerateFileTool(session.agent, logger),
    // ... more debug-specific tools
  ];
}
```

### **Tool Lifecycle Hooks**

```typescript
const tool = {
  function: {...},
  implementation: async (args) => {...},
  
  // Optional hooks for UI feedback
  onStart: (args) => {
    toolRenderer({ 
      name: 'my_tool', 
      status: 'start', 
      args 
    });
  },
  
  onComplete: (args, result) => {
    toolRenderer({ 
      name: 'my_tool', 
      status: 'success', 
      args,
      result: JSON.stringify(result)
    });
  }
};
```

---

## 🗄️ Database Schema Overview

### **Core Tables**

**Location:** `/worker/database/schema.ts`

#### **1. Users Table**
```typescript
users {
  id: text (PK)
  email: text (unique)
  username: text (unique, nullable)
  displayName: text
  avatarUrl: text
  provider: 'github' | 'google' | 'email'
  providerId: text
  passwordHash: text (for email provider)
  
  // Security
  emailVerified: boolean
  failedLoginAttempts: number
  lockedUntil: timestamp
  
  // Preferences
  theme: 'light' | 'dark' | 'system'
  timezone: text
  
  // Status
  isActive: boolean
  isSuspended: boolean
  
  // Timestamps
  createdAt, updatedAt, lastActiveAt, deletedAt
}
```

#### **2. Apps Table**
```typescript
apps {
  id: text (PK)
  title: text
  description: text
  iconUrl: text
  
  // Generation
  originalPrompt: text
  finalPrompt: text
  framework: text
  
  // Ownership
  userId: text (FK → users, nullable for anonymous)
  sessionToken: text (for anonymous)
  
  // Visibility
  visibility: 'private' | 'public'
  status: 'generating' | 'completed'
  
  // Deployment
  deploymentId: text
  githubRepositoryUrl: text
  
  // Metadata
  isArchived: boolean
  isFeatured: boolean
  version: number
  parentAppId: text (for forks)
  screenshotUrl: text
  
  // Timestamps
  createdAt, updatedAt, lastDeployedAt
}
```

#### **3. Sessions Table**
```typescript
sessions {
  id: text (PK)
  userId: text (FK → users)
  
  // Session data
  deviceInfo: text
  userAgent: text
  ipAddress: text
  
  // Security
  isRevoked: boolean
  accessTokenHash: text
  refreshTokenHash: text
  
  // Timing
  expiresAt: timestamp
  createdAt: timestamp
  lastActivity: timestamp
}
```

#### **4. Stars & Favorites**
```typescript
stars {
  id: text (PK)
  userId: text (FK → users)
  appId: text (FK → apps)
  starredAt: timestamp
  
  // Unique constraint on (userId, appId)
}

favorites {
  id: text (PK)
  userId: text (FK → users)
  appId: text (FK → apps)
  createdAt: timestamp
  
  // Unique constraint on (userId, appId)
}
```

#### **5. Analytics Tables**
```typescript
appViews {
  id: text (PK)
  appId: text (FK → apps)
  userId: text (FK → users, nullable)
  sessionId: text
  viewedAt: timestamp
  
  // Indexes for fast counting
}

userModelConfigs {
  id: text (PK)
  userId: text (FK → users)
  agentActionName: text
  
  // Model overrides
  modelName: text
  maxTokens: number
  temperature: number
  reasoningEffort: 'low' | 'medium' | 'high'
  fallbackModel: text
  
  // Unique per user+action
}
```

### **Database Service Pattern**

```typescript
// File: /worker/database/services/DomainService.ts
export class DomainService {
  private db: D1Database;
  
  constructor(env: Env) {
    this.db = env.DB;
  }
  
  async getItem(id: string): Promise<Item> {
    // Use Drizzle ORM for type safety
    const result = await this.db
      .select()
      .from(itemsTable)
      .where(eq(itemsTable.id, id))
      .get();
    
    if (!result) throw new ApiError(404, 'Not found');
    return result;
  }
  
  async createItem(data: CreateInput): Promise<Item> {
    // Insert with validation
    const id = generateId();
    await this.db
      .insert(itemsTable)
      .values({ id, ...data });
    
    return this.getItem(id);
  }
}
```

---

## 📸 Image Attachment System

### **Supported Formats**

**Location:** `/worker/types/image-attachment.ts`

```typescript
SUPPORTED_IMAGE_MIME_TYPES = [
  'image/png',
  'image/jpeg',
  'image/webp',
]

MAX_IMAGE_SIZE_BYTES = 10 * 1024 * 1024; // 10MB
MAX_IMAGES_PER_MESSAGE = 2;
```

### **Image Flow**

```
1. User uploads/drags image
   ↓
2. Frontend: Validate size/type
   ↓
3. Frontend: Convert to base64
   ↓
4. Frontend: Show preview
   ↓
5. User sends message
   ↓
6. Frontend → Backend: USER_SUGGESTION { message, images: [...] }
   ↓
7. Backend: Upload to R2 storage
   ↓
8. Backend: Pass to LLM with vision model
   ↓
9. LLM: Analyze image + generate response
```

### **Image Types**

```typescript
// Raw upload from user
interface ImageAttachment {
  id: string;
  filename: string;
  mimeType: SupportedImageMimeType;
  base64Data: string; // Without data URL prefix
  size: number;
  dimensions?: { width: number; height: number };
}

// After R2 upload
interface ProcessedImageAttachment {
  mimeType: SupportedImageMimeType;
  base64Data?: string; // Optional, may be cleared after upload
  r2Key: string; // R2 storage key
  publicUrl: string; // Public URL
  hash: string; // Content hash
}
```

### **Frontend Validation**

**Location:** `/src/hooks/use-image-upload.ts`

```typescript
Validation checks:
1. File type in SUPPORTED_IMAGE_MIME_TYPES
2. File size ≤ MAX_IMAGE_SIZE_BYTES
3. Total images ≤ MAX_IMAGES_PER_MESSAGE

Rejection behavior:
- Show error toast
- Don't add to preview
- Log validation failure
```

### **Backend Validation**

**Location:** `/worker/agents/core/websocket.ts`

```typescript
case USER_SUGGESTION:
  if (images && images.length > MAX_IMAGES_PER_MESSAGE) {
    sendError(`Maximum ${MAX_IMAGES_PER_MESSAGE} images allowed`);
    return;
  }
  
  for (const image of images) {
    if (image.size > MAX_IMAGE_SIZE_BYTES) {
      sendError(`Image exceeds ${MAX_IMAGE_SIZE_BYTES / 1024 / 1024}MB`);
      return;
    }
  }
```

---

## 🔐 Authentication Guards

**Location:** `/src/hooks/useAuthGuard.ts` and `useActionGuard.ts`

**Purpose:** Protect actions requiring authentication (star, fork, etc.)

**Flow:**
1. User clicks protected action (not authenticated)
2. Guard shows auth modal
3. User logs in via GitHub/Google OAuth
4. OAuth callback creates session
5. Redirects back with `?action=star` parameter
6. Frontend detects parameter, executes pending action
7. Clears action parameter

**Options:** requireFullAuth (reject anonymous), actionContext ("to star this app"), onSuccess callback
