---
title: "🧪 SANDBOX SYSTEM"
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
pageSha256: "eb719a0e3de887ae88c1830077cb6299414c21e23d218bbae4e96a1bd5b0910c"
contentMode: "local-full"
zh: ""
---

# 🧪 SANDBOX SYSTEM

## Overview

Sandboxes are **ephemeral containers** that run user's generated apps in isolated environments.

**Technology:** Remote sandbox service (separate infrastructure)
**Communication:** HTTP API with bearer token auth
**Lifecycle:** Created on-demand, destroyed after inactivity

---

## Sandbox Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     Agent (Durable Object)                  │
│  - Generates code                                           │
│  - Manages state                                            │
└────────────────┬────────────────────────────────────────────┘
                 │
                 ↓ HTTP API calls
┌─────────────────────────────────────────────────────────────┐
│              RemoteSandboxServiceClient                     │
│  - createInstance()                                         │
│  - writeFiles()                                             │
│  - executeCommands()                                        │
│  - getStaticAnalysis()                                      │
│  - getRuntimeErrors()                                       │
│  - getLogs()                                                │
└────────────────┬────────────────────────────────────────────┘
                 │
                 ↓ HTTPS (authenticated)
┌─────────────────────────────────────────────────────────────┐
│                   Sandbox Service API                       │
│  (External infrastructure)                                  │
└────────────────┬────────────────────────────────────────────┘
                 │
                 ↓ Manages
┌─────────────────────────────────────────────────────────────┐
│              Container Instance (per session)               │
│  - Node.js environment                                      │
│  - File system (template + generated files)                 │
│  - Dev server (Vite/Next/etc)                               │
│  - Error monitoring                                         │
│  - Log collection                                           │
└─────────────────────────────────────────────────────────────┘
```

---

## Sandbox Operations

### **1. Instance Creation**
**Method:** `createInstance(templateName, projectName, webhookUrl?, envVars?)`

**Flow:**
1. Agent calls with template (react-vite, nextjs, etc.)
2. Sandbox service spins up container
3. Clones template from git
4. Installs base dependencies
5. Returns instanceId + preview URL

**Response:** `\{ instanceId, url, status: 'ready' \}`

### **2. File Synchronization**
**Method:** `writeFiles(instanceId, files, commitMessage?)`

**Flow:**
1. Agent sends array of files: `[\{ path, content, encoding \}]`
2. Sandbox writes to container filesystem
3. Triggers hot reload if dev server running
4. Optionally commits to git with message

**Used for:** Initial deployment, incremental updates, fixes

### **3. Command Execution**
**Method:** `executeCommands(instanceId, commands, timeout?)`

**Flow:**
1. Agent sends shell commands (npm install, npm run build, etc.)
2. Sandbox executes in container
3. Returns stdout, stderr, exit code
4. Timeout after 60s default

**Security:** Commands validated/filtered before execution to prevent dangerous operations

### **4. Static Analysis**
**Method:** `getStaticAnalysis(instanceId)`

**Flow:**
1. Sandbox runs TypeScript compiler (tsc --noEmit)
2. Collects all errors with file/line/column
3. Returns structured error list

**Used by:** PostPhaseCodeFixer, deep debugger

### **5. Runtime Error Monitoring**
**Method:** `getRuntimeErrors(instanceId)`

**Flow:**
1. Sandbox monitors browser console errors
2. Collects stack traces, error messages
3. Deduplicates and categorizes
4. Returns recent errors

**Triggers:** Websocket webhook to agent when errors occur

### **6. Log Retrieval**
**Method:** `getLogs(instanceId, lines?, filter?)`

**Flow:**
1. Returns recent console output from container
2. Includes dev server logs, build output, console.log statements
3. Filtered by pattern if provided

**Note:** Logs only appear when user interacts with app

### **7. Instance Shutdown**
**Method:** `shutdownInstance(instanceId)`

**Flow:**
1. Stops dev server
2. Destroys container
3. Frees resources

**Auto-triggered:** After 30 min inactivity or explicit user close

---

## Session Management

Each agent has a **sessionId** that maps to a sandbox instance:

- **Stored in:** `CodeGenState.sessionId`
- **Purpose:** Ensures deployment goes to correct container
- **Reset on:** Timeout errors, critical failures
- **Cached client:** DeploymentManager caches sandbox client per session

**Health Checks:**
- Periodic ping to sandbox every 30s
- If unhealthy, resets sessionId
- Forces redeployment on next attempt
