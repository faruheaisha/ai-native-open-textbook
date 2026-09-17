---
title: "🏗️ CORE AGENT SYSTEM (Durable Objects)"
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
pageSha256: "6f538f58c393f689788d9bfb5d83c0068cb5bb2cd64a4cec81f028931491a48e"
contentMode: "local-full"
zh: ""
---

# 🏗️ CORE AGENT SYSTEM (Durable Objects)

## Overview

**SimpleCodeGeneratorAgent** is the brain of vibesdk - a Durable Object that orchestrates entire app generation lifecycle.

**Key responsibilities:**
- Blueprint generation from user prompts
- Phase-by-phase code generation
- File management and versioning
- Sandbox deployment and monitoring
- Conversation handling
- Debug session orchestration

---

## Agent Operations (State Machine)

### **1. Blueprint Generation**
**Trigger:** User submits initial prompt
**Flow:**
1. LLM analyzes prompt → generates complete PRD (Blueprint)
2. Blueprint includes: project structure, phases, tech stack, UI design, color palette
3. Saved to state, shown to user for confirmation
4. User can iterate or approve

### **2. Phase Generation** 
**Trigger:** User starts generation or requests new feature
**Flow:**
1. Agent determines next phase from blueprint
2. Uses PhaseGeneration operation to plan files
3. Updates currentDevState = PHASE_GENERATING
4. Generates phase concept (files to create, purposes)

### **3. Phase Implementation**
**Trigger:** Phase concept ready
**Flow:**
1. PhaseImplementation operation generates all files for phase
2. Uses LLM with file generation tools
3. Tracks progress per-file
4. Updates generatedFilesMap with new files
5. Commits to git (isomorphic-git in SQLite)
6. Sets currentDevState = PHASE_IMPLEMENTING

### **4. Code Review & Fixing**
**Trigger:** Phase complete, auto-triggered or user-requested
**Flow:**
1. PostPhaseCodeFixer runs TypeScript static analysis
2. Identifies type errors, missing imports, etc.
3. Automatically fixes common issues (TS2304, TS2307, etc.)
4. Re-analyzes until clean or max iterations
5. Updates files in generatedFilesMap

### **5. Deployment to Sandbox**
**Trigger:** Files ready, user clicks preview
**Flow:**
1. DeploymentManager.deployToSandbox()
2. Syncs all files to remote sandbox container
3. Executes install commands (npm install, etc.)
4. Starts dev server
5. Returns preview URL
6. Monitors health with periodic checks

### **6. User Conversation**
**Trigger:** User sends message during generation
**Flow:**
1. UserConversationProcessor handles chat
2. Queues feature requests if generating
3. Processes immediately if idle
4. Has access to tools: queue_request, deep_debug, deploy, etc.
5. Streams responses via WebSocket

### **7. Deep Debugging**
**Trigger:** User reports bug or runtime error
**Flow:**
1. Agent checks not currently generating (conflict prevention)
2. DeepCodeDebugger assistant spawned
3. Has access to: read files, static analysis, runtime errors, logs, regenerate files
4. Iteratively diagnoses and fixes
5. Saves transcript for context in next session
6. Deploys fixes automatically

---

## Agent Services (Delegation Pattern)

Agent delegates specific responsibilities to service classes:

**Location:** `/worker/agents/services/implementations/`

1. **FileManager** - File CRUD, validation, deduplication
2. **DeploymentManager** - Sandbox lifecycle, deployment, health checks
3. **GitService** - Commit, history, clone service
4. **CodingAgent (Proxy)** - Exposes agent methods to tools (runs in DO context)

**Why services?**
- Separation of concerns
- Testability
- Code reuse
- Clean interfaces
