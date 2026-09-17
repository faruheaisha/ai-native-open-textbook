---
title: "VibeSDK Developer Guide"
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
pageSha256: "4e812bc914395b3f5bc8c1c84a72526525d5f32980ea4f2de60d0a4ee546a3e9"
contentMode: "local-full"
zh: ""
---

# VibeSDK Developer Guide

> Follow [`AGENTS.md`](https://github.com/cloudflare/vibesdk/blob/9da158d82c597a0e8f4bf033cdccd1053fb6fb15/AGENTS.md) for current commands, code style, error handling, and required implementation patterns. The current architecture in this section supersedes the legacy reference later in this document.

## Current architecture

- `ThinkAgent` is an Agent powered by Cloudflare Think and backed by a Durable Object. It owns conversation history, context selection, skills, streaming, tools, and step limits.
- `SpaceDO` is a Durable Object that provides each project's isolated workspace and files. Think's explicit workspace tools call it through Durable Object RPC; workspace bash is disabled.
- When `ENABLE_ARTIFACTS="true"` is selected for a SpaceDO, Cloudflare Artifacts is its durable git and version-history layer for commits, branches, history, and restore points; otherwise the SQLite workspace filesystem stores its local git history.
- `@cloudflare/worker-bundler` builds committed project files, and a Worker Loader binding loads them as a Dynamic Worker preview.
- Generated apps export an `App` Durable Object class that SpaceDO hosts as a Facet with isolated SQLite storage.
- AI Gateway routes configured model providers and provides centralized observability and caching.

SpaceDO is the workspace and file layer. For Artifacts-backed spaces, Cloudflare Artifacts is the git and history layer; SQL-backed spaces retain local git history in SQLite. Do not describe SpaceDO itself as git-backed.

## Current coding loop

1. The host behavior configures ThinkAgent with model coordinates, project context, and a signed preview URL.
2. Think calls models and tools iteratively within the turn's step budget.
3. Workspace tools read and edit files in the companion SpaceDO.
4. `commit` creates a meaningful restore point without deploying; `deploy_space` commits and rebuilds the branch preview.
5. SpaceDO bundles files and loads the result through the Worker Loader binding.
6. Browser console diagnostics return to Think for repair and redeployment.
7. Rollback applies a selected tree, creates a new commit on the current branch, and redeploys without rewriting history.

## Authoritative paths

| Area | Path |
|---|---|
| Think and tool registration | `worker/agents/think/ThinkAgent.ts` |
| Host orchestration | `worker/agents/core/behaviors/think.ts` |
| Workspace adapter | `worker/agents/think/space-workspace-ops.ts` |
| Think prompts and skills | `worker/agents/think/prompts/`, `worker/agents/think/skills/` |
| SpaceDO | `space/src/space/durable-object.ts` |
| Preview build pipeline | `space/src/space/deploy-engine.ts` |
| Artifacts synchronization | `space/src/space/artifacts-sync.ts` |
| Frontend API types and client | `src/api-types.ts`, `src/lib/api-client.ts` |
| API routes and controllers | `worker/api/routes/`, `worker/api/controllers/` |
| Setup and deployment | `scripts/setup.ts`, `scripts/deploy.ts` |

## Development commands

```bash
bun install
bun run setup
bun run dev
bun run typecheck
bun run lint
bun run test
bun run build
```

Use `bun run dev:browser` for local browser-console inspection and `bun run deploy` with `.prod.vars` for production deployment.

## Legacy reference

> Everything below this point documents the retired phase-based sandbox architecture. It is retained for historical context only. Do not follow its paths, commands, state machines, sandbox guidance, or git ownership model without verifying them against the current code.

---

## 📝 Recent Changes (Updated Nov 2024)

### **Git System Refactor - CLI Semantics Alignment**

**Changes Made:**
1. **GitVersionControl Class (`/worker/agents/git/git.ts`):**
   - Added `reset(ref, options)` - Aligns with `git reset --hard` (moves HEAD, no new commit)
   - Removed `revert()` - Was creating incorrect "revert commits"
   - Removed `restoreCommit()` - Functionality merged into internal helpers
   - Removed `inferPurposeFromPath()` - No longer needed
   - Added `setOnFilesChangedCallback()` - Callback mechanism for FileManager sync
   - Added `getAllFilesFromHead()` - Simple HEAD file read for syncing

2. **FileManager Auto-Sync (`/worker/agents/services/implementations/FileManager.ts`):**
   - Self-contained synchronization via callback registration
   - Auto-registers with GitVersionControl during construction
   - Syncs `generatedFilesMap` from git HEAD after operations
   - Preserves file purposes across syncs
   - No external changes required - fully transparent

3. **Git Tool with Access Control (`/worker/agents/tools/toolkit/git.ts`):**
   - Parameterized tool creation: `createGitTool(agent, logger, options?)`
   - Dynamic command filtering via `excludeCommands` parameter
   - **User conversations:** Get safe version (commit, log, show only)
   - **Deep debugger:** Gets full version (includes reset with warnings)
   - Type-safe enum generation based on context

4. **Deep Debugger Prompt Updates (`/worker/agents/assistants/codeDebugger.ts`):**
   - Updated git command documentation
   - Added strong warnings about reset being UNTESTED and DESTRUCTIVE
   - Clear guidance: only use reset when absolutely necessary
   - Documented proper git semantics (reset vs checkout)

5. **User Conversation Updates (`/worker/agents/operations/UserConversationProcessor.ts`):**
   - Added git tool to help documentation
   - Noted reset unavailable for safety

6. **Commit Message Enhancement (`/worker/agents/core/simpleGeneratorAgent.ts`):**
   - Phase commits now include description in body
   - Format: `feat: Phase Name\n\nPhase description`
   - Provides better context in git history

**Benefits:**
- ✅ Git commands now match actual git CLI behavior
- ✅ FileManager stays in sync automatically via callbacks
- ✅ Context-aware tool access (safe for users, full for debugger)
- ✅ Type-safe, DRY, flexible architecture
- ✅ Self-contained FileManager (no external changes needed)

**See detailed documentation:** Section "GitVersionControl Class & Git Tool" (line 901)

---

## 🛠️ Quick Start for Developers

### **Running Locally**

**Prerequisites:**
- Node.js 22+
- Cloudflare account (for D1, Durable Objects)
- API keys: OpenAI, Anthropic, Google AI Studio

**Environment Variables:**
Create `.dev.vars` in project root:
```bash
# LLM Providers
OPENAI_API_KEY=sk-...
ANTHROPIC_API_KEY=sk-ant-...
GOOGLE_AI_STUDIO_API_KEY=...

# Authentication
JWT_SECRET=your-secret-key
GOOGLE_CLIENT_ID=...
GOOGLE_CLIENT_SECRET=...
GITHUB_CLIENT_ID=...
GITHUB_CLIENT_SECRET=...

# Cloudflare
CLOUDFLARE_ACCOUNT_ID=...
CLOUDFLARE_API_TOKEN=...

# Sandbox Service
SANDBOX_SERVICE_URL=https://sandbox.example.com
SANDBOX_SERVICE_TOKEN=...
```

**Setup:**
```bash
# Install dependencies
npm install

# Setup local D1 database
npm run db:migrate:local

# Start dev servers
npm run dev        # Frontend (Vite)
npm run dev:worker # Backend (Wrangler)
```

### **Common Development Tasks**

**Task: Change LLM model for an operation**

**File:** `/worker/agents/inferutils/config.ts`
```typescript
export const AGENT_CONFIG = {
  blueprint: {
    name: GEMINI_2_5_PRO,  // Change this
    reasoning_effort: 'medium',
    max_tokens: 64000,
    temperature: 0.7
  },
  // ... other operations
};
```

**Task: Modify system prompt for conversation agent**

**File:** `/worker/agents/operations/UserConversationProcessor.ts`
- Line ~50: System prompt starts
- Defines Orange AI personality, tool usage rules, behavior

**Task: Add new WebSocket message**

See "Getting Started - Common Tasks" section below (line 1605)

**Task: Debug Durable Object state**

**In code:**
```typescript
// In simpleGeneratorAgent.ts
this.logger().info('Current state', { 
  devState: this.state.currentDevState,
  filesCount: Object.keys(this.state.generatedFilesMap).length,
  currentPhase: this.state.currentPhase
});
```

**Via Cloudflare dashboard:**
1. Go to Workers & Pages → Durable Objects
2. Find your DO instance
3. View SQLite database directly

---

## 🎯 Core Principles & Non-Negotiable Rules

### **1. Strict Type Safety**
- ❌ **NEVER use `any` type** - find or create proper types
- ✅ All frontend types imported from `@/api-types` (which re-exports from worker) or `shared/types/`
- ✅ Search codebase for existing types before creating new ones
- ✅ Extend/compose existing types rather than duplicating

**Type Import Pattern:**
```typescript
// ✅ CORRECT - Single source of truth
import { BlueprintType, WebSocketMessage } from '@/api-types';

// ❌ WRONG - Direct worker imports in frontend
import { BlueprintType } from 'worker/agents/schemas';
```

### **2. DRY Principle**
- Search for similar functionality before implementing
- Extract reusable utilities, hooks, and components
- Never copy-paste code - refactor into shared functions

### **3. Follow Existing Patterns**
- **Frontend APIs:** All defined in `/src/lib/api-client.ts`
- **Backend Routes:** Controllers in `worker/api/controllers/`, routes in `worker/api/routes/`
- **Database Services:** In `worker/database/services/`
- **Types:** Shared types in `shared/types/`, API types in `src/api-types.ts`

### **4. File Naming Conventions**
- **React Components:** `PascalCase.tsx`
- **Utilities/Hooks:** `kebab-case.ts`
- **Backend Services:** `PascalCase.ts`
- Match the naming style of surrounding files

### **5. Code Quality Standards**
- ✅ Production-ready code only - no TODOs or placeholders
- ✅ Proper TypeScript types with no implicit any
- ✅ Clean, maintainable code
- ❌ No hacky workarounds
- ❌ No overly verbose AI-like comments
- ❌ No emojis in code (only in markdown docs)

### **6. Comments Style**
```typescript
// ✅ GOOD - Explains code's purpose
// Calculate exponential backoff with max cap
const delay = Math.min(Math.pow(2, attempt) * 1000, 30000);

// ❌ BAD - Verbose AI narration
// Here we are calculating the delay using exponential backoff...
```

---

## 🏗️ Project Architecture

### **Tech Stack**
- **Frontend:** React 18, TypeScript, Vite, TailwindCSS, React Router v7
- **Backend:** Cloudflare Workers, Durable Objects, D1 (SQLite)
- **AI/LLM:** OpenAI, Anthropic, Google AI Studio (Gemini)
- **WebSocket:** PartySocket for real-time communication
- **Sandbox:** Custom container service with CLI tools
- **Templates:** Project scaffolding system with template catalog

### **Complete Directory Structure**

```
📦 vibesdk/
│
├── 📁 src/                                    # Frontend React application
│   ├── api-types.ts                          # ALL shared types (single source of truth)
│   ├── main.tsx                              # React entry point
│   ├── App.tsx                               # Root component with router
│   ├── routes.ts                             # Route definitions
│   │
│   ├── 📁 components/                        # Reusable UI components (80 files)
│   │   ├── 📁 auth/                          # Login, signup, auth modals
│   │   ├── 📁 layout/                        # Headers, footers, sidebars
│   │   ├── 📁 shared/                        # Buttons, inputs, avatars
│   │   ├── 📁 ui/                            # shadcn/ui primitives (46 components)
│   │   ├── 📁 monaco-editor/                 # Code editor integration
│   │   ├── 📁 analytics/                     # Analytics tracking components
│   │   ├── ErrorBoundary.tsx                 # Global error boundary
│   │   ├── theme-toggle.tsx                  # Dark/light mode
│   │   ├── agent-mode-toggle.tsx             # Deterministic/smart mode
│   │   ├── github-export-modal.tsx           # Export to GitHub
│   │   ├── config-modal.tsx                  # Model configuration
│   │   └── byok-api-keys-modal.tsx           # BYOK API key management
│   │
│   ├── 📁 contexts/                          # React contexts
│   │   ├── auth-context.tsx                  # Authentication state
│   │   ├── theme-context.tsx                 # Theme (dark/light)
│   │   └── apps-data-context.tsx             # Apps global state
│   │
│   ├── 📁 hooks/                             # Custom React hooks (14 files)
│   │   ├── useAuthGuard.ts                   # Auth protection
│   │   ├── useActionGuard.ts                 # Action-based auth
│   │   ├── use-app.ts                        # Single app data
│   │   ├── use-apps.ts                       # Apps list with pagination
│   │   ├── use-image-upload.ts               # Image upload handling
│   │   ├── use-analytics.ts                  # Analytics tracking
│   │   └── use-*.ts                          # Other domain hooks
│   │
│   ├── 📁 lib/                               # Core libraries
│   │   ├── api-client.ts                     # ALL API calls (single source)
│   │   └── websocket-client.ts               # WebSocket utilities
│   │
│   ├── 📁 routes/                            # Page components (30 files)
│   │   ├── 📁 chat/                          # Code generation interface
│   │   │   ├── chat.tsx                      # Main chat UI (1208 lines)
│   │   │   ├── 📁 hooks/
│   │   │   │   └── use-chat.ts               # Chat state management (BRAIN)
│   │   │   ├── 📁 utils/
│   │   │   │   ├── handle-websocket-message.ts  # WS message handler (831 lines)
│   │   │   │   └── deduplicate-messages.ts   # Message deduplication
│   │   │   └── 📁 components/
│   │   │       ├── phase-timeline.tsx        # Phase progress UI
│   │   │       ├── messages.tsx              # Chat messages
│   │   │       ├── editor.tsx                # Code editor view
│   │   │       └── blueprint.tsx             # Blueprint display
│   │   │
│   │   ├── 📁 app/                           # Single app detail page
│   │   ├── 📁 apps/                          # Apps list/discovery
│   │   ├── 📁 settings/                      # User settings
│   │   ├── 📁 auth/                          # Auth pages
│   │   └── home.tsx                          # Landing page
│   │
│   ├── 📁 utils/                             # Utility functions
│   │   ├── analytics.ts                      # Analytics helpers
│   │   ├── logger.ts                         # Client-side logging
│   │   ├── screenshot.ts                     # Screenshot utilities
│   │   ├── sentry.ts                         # Error tracking
│   │   ├── validationUtils.ts                # Input validation
│   │   └── 📁 ndjson-parser/                 # NDJSON streaming parser
│   │
│   └── 📁 assets/                            # Static assets
│       └── 📁 provider-logos/                # LLM provider logos
│
├── 📁 worker/                                 # Backend Cloudflare Worker
│   ├── index.ts                              # Worker entry point (7860 lines)
│   ├── app.ts                                # Hono app setup
│   │
│   ├── 📁 agents/                            # AI Agent System (88 files)
│   │   ├── 📁 core/                          # Agent DO base classes
│   │   │   ├── simpleGeneratorAgent.ts       # Main agent DO (2800+ lines)
│   │   │   ├── smartGeneratorAgent.ts        # Smart mode variant
│   │   │   ├── websocket.ts                  # WebSocket handler (250 lines)
│   │   │   ├── state.ts                      # CodeGenState interface
│   │   │   ├── stateMigration.ts             # State version migrations
│   │   │   └── types.ts                      # Core types
│   │   │
│   │   ├── 📁 assistants/                    # Specialized AI assistants
│   │   │   ├── codeDebugger.ts               # Deep debugger (Gemini 2.5 Pro)
│   │   │   ├── projectsetup.ts               # Initial setup assistant
│   │   │   └── realtimeCodeFixer.ts          # Real-time fixes
│   │   │
│   │   ├── 📁 operations/                    # State machine operations
│   │   │   ├── PhaseGeneration.ts            # Phase planning
│   │   │   ├── PhaseImplementation.ts        # File generation (37k lines)
│   │   │   ├── UserConversationProcessor.ts  # Orange AI (42k lines)
│   │   │   ├── PostPhaseCodeFixer.ts         # Code review/fixes
│   │   │   ├── FileRegeneration.ts           # Single file fixes
│   │   │   └── ScreenshotAnalysis.ts         # Image analysis
│   │   │
│   │   ├── 📁 tools/                         # LLM Tools
│   │   │   ├── customTools.ts                # Tool registry
│   │   │   ├── types.ts                      # Tool type definitions
│   │   │   └── 📁 toolkit/                   # Individual tools (17 files)
│   │   │       ├── read-files.ts             # Read source code
│   │   │       ├── run-analysis.ts           # Static analysis
│   │   │       ├── get-runtime-errors.ts     # Runtime errors
│   │   │       ├── get-logs.ts               # Container logs
│   │   │       ├── regenerate-file.ts        # Fix files
│   │   │       ├── generate-files.ts         # Generate files
│   │   │       ├── deploy-preview.ts         # Deploy to sandbox
│   │   │       ├── exec-commands.ts          # Run commands
│   │   │       ├── deep-debugger.ts          # Debug assistant
│   │   │       ├── queue-request.ts          # Queue features
│   │   │       ├── alter-blueprint.ts        # Modify PRD
│   │   │       ├── rename-project.ts         # Rename project
│   │   │       ├── wait.ts                   # Wait N seconds
│   │   │       ├── wait-for-generation.ts    # Wait for generation
│   │   │       ├── wait-for-debug.ts         # Wait for debug
│   │   │       ├── web-search.ts             # Web search (8k lines)
│   │   │       └── feedback.ts               # User feedback
│   │   │
│   │   ├── 📁 inferutils/                    # LLM inference engine
│   │   │   ├── core.ts                       # Main infer() function
│   │   │   ├── infer.ts                      # Execution wrapper
│   │   │   ├── config.ts                     # Model configurations
│   │   │   ├── config.types.ts               # Config types
│   │   │   └── common.ts                     # Shared types
│   │   │
│   │   ├── 📁 services/                      # Agent service abstractions
│   │   │   ├── 📁 interfaces/                # Service interfaces
│   │   │   │   ├── ICodingAgent.ts           # Agent interface
│   │   │   │   ├── IFileManager.ts           # File operations
│   │   │   │   ├── IDeploymentManager.ts     # Deployment interface
│   │   │   │   ├── IServiceOptions.ts        # Service options
│   │   │   │   └── IGitService.ts            # Git operations
│   │   │   └── 📁 implementations/           # Service implementations
│   │   │       ├── CodingAgent.ts            # Agent proxy for DO
│   │   │       ├── FileManager.ts            # File CRUD, validation
│   │   │       ├── DeploymentManager.ts      # Sandbox deployment (710 lines)
│   │   │       ├── GitService.ts             # Git operations
│   │   │       └── BaseAgentService.ts       # Base class
│   │   │
│   │   ├── 📁 git/                           # Git system (isomorphic-git)
│   │   │   ├── git-clone-service.ts          # Git clone protocol (388 lines)
│   │   │   ├── fs-adapter.ts                 # SQLite filesystem
│   │   │   └── MemFS.ts                      # In-memory filesystem
│   │   │
│   │   ├── 📁 planning/                      # Project planning
│   │   │   ├── blueprint.ts                  # Blueprint generation
│   │   │   └── templateSelector.ts           # Template selection
│   │   │
│   │   ├── 📁 domain/                        # Domain logic
│   │   ├── 📁 utils/                         # Agent utilities
│   │   ├── 📁 schemas.ts                     # Zod schemas
│   │   ├── prompts.ts                        # Shared prompts
│   │   └── constants.ts                      # WS message types
│   │
│   ├── 📁 api/                               # HTTP API Layer
│   │   ├── 📁 routes/                        # Route definitions
│   │   │   ├── index.ts                      # Main router
│   │   │   ├── agentRoutes.ts                # Agent CRUD
│   │   │   ├── authRoutes.ts                 # Authentication
│   │   │   ├── appRoutes.ts                  # Apps CRUD
│   │   │   ├── gitRoutes.ts                  # Git clone endpoints
│   │   │   ├── webhookRoutes.ts              # Webhooks
│   │   │   └── diagnosticRoutes.ts           # Debug endpoints
│   │   │
│   │   ├── 📁 controllers/                   # Business logic
│   │   │   ├── 📁 agent/                     # Agent controller
│   │   │   ├── 📁 apps/                      # Apps controller
│   │   │   ├── 📁 auth/                      # Auth controller
│   │   │   ├── 📁 git/                       # Git controller
│   │   │   └── 📁 diagnostics/               # Debug controller
│   │   │
│   │   ├── 📁 handlers/                      # Special handlers
│   │   │   ├── git-cache.ts                  # Git caching
│   │   │   └── websocket-upgrade.ts          # WS upgrade
│   │   │
│   │   ├── websocketTypes.ts                 # WebSocket types
│   │   └── apiUtils.ts                       # API utilities
│   │
│   ├── 📁 database/                          # Database Layer (D1 + Drizzle)
│   │   ├── schema.ts                         # All table schemas (618 lines)
│   │   ├── index.ts                          # Database service exports
│   │   ├── database.ts                       # DatabaseService class
│   │   │
│   │   └── 📁 services/                      # Domain services
│   │       ├── BaseService.ts                # Base DB service
│   │       ├── AuthService.ts                # Authentication
│   │       ├── SessionService.ts             # JWT sessions
│   │       ├── UserService.ts                # User CRUD
│   │       ├── AppService.ts                 # App CRUD + rankings
│   │       ├── AnalyticsService.ts           # Views, stars, activity
│   │       ├── SecretsService.ts             # Encrypted secrets
│   │       ├── ModelConfigService.ts         # Model overrides
│   │       ├── ModelProvidersService.ts      # BYOK providers
│   │       ├── ApiKeyService.ts              # API keys
│   │       └── ModelTestService.ts           # Model testing
│   │
│   ├── 📁 services/                          # External Services (50 files)
│   │   ├── 📁 sandbox/                       # Sandbox service (12 files)
│   │   │   ├── remoteSandboxService.ts       # Sandbox API client
│   │   │   ├── BaseSandboxService.ts         # Base sandbox class
│   │   │   ├── sandboxSdkClient.ts           # SDK wrapper
│   │   │   ├── sandboxTypes.ts               # Types
│   │   │   ├── factory.ts                    # Service factory
│   │   │   ├── request-handler.ts            # HTTP requests
│   │   │   └── fileTreeBuilder.ts            # File tree utilities
│   │   │
│   │   ├── 📁 code-fixer/                    # TypeScript fixer (14 files)
│   │   │   ├── index.ts                      # Main fixer (11k lines)
│   │   │   ├── types.ts                      # Fixer types
│   │   │   ├── 📁 fixers/                    # Error-specific fixers
│   │   │   │   ├── ts2304.ts                 # Cannot find name
│   │   │   │   ├── ts2305.ts                 # Missing export
│   │   │   │   ├── ts2307.ts                 # Cannot find module
│   │   │   │   ├── ts2613.ts                 # Not a module
│   │   │   │   ├── ts2614.ts                 # Import/export mismatch
│   │   │   │   └── ts2724.ts                 # Incorrect import
│   │   │   └── 📁 utils/                     # Fixer utilities
│   │   │
│   │   ├── 📁 oauth/                         # OAuth providers
│   │   │   ├── base.ts                       # Base OAuth provider
│   │   │   ├── google.ts                     # Google OAuth
│   │   │   ├── github.ts                     # GitHub OAuth
│   │   │   └── factory.ts                    # Provider factory
│   │   │
│   │   ├── 📁 github/                        # GitHub integration
│   │   │   ├── GitHubService.ts              # GitHub API client
│   │   │   └── types.ts                      # GitHub types
│   │   │
│   │   ├── 📁 rate-limit/                    # Rate limiting (5 files)
│   │   │   ├── rateLimits.ts                 # Rate limit service
│   │   │   ├── rateLimitDO.ts                # Durable Object store
│   │   │   ├── rateLimitKV.ts                # KV store
│   │   │   └── types.ts                      # Rate limit types
│   │   │
│   │   ├── 📁 deployer/                      # Cloudflare deployment
│   │   ├── 📁 aigateway-proxy/               # AI Gateway proxy
│   │   ├── 📁 analytics/                     # Analytics tracking
│   │   ├── 📁 cache/                         # Caching layer
│   │   ├── 📁 csrf/                          # CSRF protection
│   │   └── 📁 sentry/                        # Error tracking
│   │
│   ├── 📁 utils/                             # Utility functions (15 files)
│   │   ├── authUtils.ts                      # Auth utilities
│   │   ├── jwtUtils.ts                       # JWT creation/verification
│   │   ├── passwordService.ts                # bcrypt password hashing
│   │   ├── cryptoUtils.ts                    # Encryption/hashing
│   │   ├── inputValidator.ts                 # Input validation
│   │   ├── validationUtils.ts                # Schema validation
│   │   ├── ErrorHandling.ts                  # Error classes
│   │   ├── idGenerator.ts                    # ID generation (ULID)
│   │   ├── images.ts                         # Image processing
│   │   ├── urls.ts                           # URL utilities
│   │   ├── githubUtils.ts                    # GitHub helpers
│   │   ├── timeFormatter.ts                  # Time formatting
│   │   ├── deployToCf.ts                     # CF deployment
│   │   ├── dispatcherUtils.ts                # Request dispatching
│   │   └── envs.ts                           # Environment helpers
│   │
│   ├── 📁 middleware/                        # HTTP middleware
│   │   ├── 📁 auth/                          # Auth middleware
│   │   │   └── routeAuth.ts                  # Route protection
│   │   └── errorHandler.ts                   # Global error handler
│   │
│   ├── 📁 config/                            # Configuration
│   │   ├── index.ts                          # Config exports
│   │   └── security.ts                       # Security config
│   │
│   ├── 📁 logger/                            # Logging system
│   │   └── index.ts                          # Logger implementation
│   │
│   ├── 📁 types/                             # Shared types
│   │   ├── image-attachment.ts               # Image types
│   │   └── index.ts                          # Type exports
│   │
│   └── 📁 observability/                     # Observability
│       └── sentry.ts                         # Sentry integration
│
├── 📁 shared/                                # Shared between frontend/backend
│   └── 📁 types/                             # Shared type definitions
│       └── errors.ts                         # Error types
│
├── 📁 migrations/                            # Database migrations
│   ├── 0000_living_forge.sql                # Initial schema
│   ├── 0001_married_moondragon.sql          # Migration 1
│   ├── 0002_nebulous_fantastic_four.sql     # Migration 2
│   └── 📁 meta/                              # Migration metadata
│       ├── _journal.json                     # Migration journal
│       └── *_snapshot.json                   # Schema snapshots
│
├── 📁 scripts/                               # Utility scripts
│   ├── setup.ts                              # Project setup
│   ├── deploy.ts                             # Deployment script
│   └── undeploy.ts                           # Cleanup script
│
├── 📁 public/                                # Static assets
│   ├── favicon.ico
│   └── logo.png
│
├── 📁 docs/                                  # Documentation
│   └── llm.md                                # THIS FILE - comprehensive guide
│
└── 📁 Config Files (Root)
    ├── package.json                          # Dependencies
    ├── tsconfig.json                         # TypeScript config
    ├── vite.config.ts                        # Vite config
    ├── wrangler.jsonc                        # Cloudflare Workers config
    ├── drizzle.config.local.ts               # Local DB config
    ├── drizzle.config.remote.ts              # Production DB config
    ├── components.json                       # shadcn/ui config
    ├── eslint.config.js                      # ESLint config
    ├── .editorconfig                         # Editor config
    └── .dev.vars                             # Local environment variables
```

---

## 💬 Chat View Architecture

### **Core Component:** `/src/routes/chat/chat.tsx`

**Layout:**
- **Left Panel (40%):** Chat messages, phase timeline, deployment controls, chat input
- **Right Panel (60%):** Editor view, Preview iframe, or Blueprint markdown

### **State Management:** `/src/routes/chat/hooks/use-chat.ts`

This hook manages all chat state:
```typescript
{
  files: FileType[]              // Generated files
  phaseTimeline: PhaseTimelineItem[] // Phase progress
  messages: ChatMessage[]        // Chat history
  websocket: WebSocket           // Real-time connection
  isGenerating: boolean          // Generation state
  previewUrl: string             // Preview deployment URL
  // ... deployment, blueprint, bootstrap state
}
```

### **WebSocket Message Handler**

**Location:** `/src/routes/chat/utils/handle-websocket-message.ts`

**Critical Messages:**
- `agent_connected` - Restore full state on connect
- `conversation_state` - Load chat history with deduplication
- `file_generating` / `file_generated` - File generation progress
- `phase_implementing` / `phase_implemented` - Phase progress
- `deployment_completed` - Preview URL ready
- `conversation_response` - AI message (streaming or complete)
- `generation_stopped` - User cancelled, mark phases as "cancelled"

### **Phase Timeline**

**Component:** `/src/routes/chat/components/phase-timeline.tsx`

**Status States:**
- `generating` - Active (orange spinner)
- `validating` - Code review (blue spinner)
- `completed` - Success (green checkmark)
- `cancelled` - Interrupted (orange X)
- `error` - Failed (red alert)

### **Message Deduplication**

**Problem:** Tool execution causes duplicate AI messages

**Solution:** Multi-layer approach
1. Backend skips redundant LLM calls (empty tool results)
2. Frontend utilities (`deduplicate-messages.ts`) for live and restored messages
3. System prompt teaches LLM not to repeat

---

## 🔧 Backend Architecture

### **Durable Objects Pattern**

Each chat session is a Durable Object instance:

```typescript
class SimpleCodeGeneratorAgent implements DurableObject {
  // Persisted in SQLite
  private state: CodeGenState;
  
  // In-memory only (ephemeral)
  private currentAbortController?: AbortController;
  private deepDebugPromise: Promise<any> | null = null;
}
```

**Key Concepts:**
- **Persistent State:** Stored in SQLite (blueprint, files, history)
- **Ephemeral State:** In-memory (abort controllers, active promises)
- **Lifecycle:** Created on-demand, evicted after inactivity
- **Concurrency:** Single-threaded per DO instance

### **CodeGenState - Agent Persistent State**

**Location:** `/worker/agents/core/state.ts`

Stored in Durable Object SQLite, survives page refreshes.

**Key groups:**

1. **Project Identity:** blueprint (full PRD), projectName, original query, templateName
2. **File Management:** generatedFilesMap (tracks all files with hash, modified time, uncommitted changes)
3. **Phase Tracking:** generatedPhases (completed), currentPhase (active), phasesCounter
4. **State Machine:** currentDevState (IDLE/PHASE_GENERATING/PHASE_IMPLEMENTING/REVIEWING/FINALIZING), shouldBeGenerating flag, mvpGenerated, reviewingInitiated
5. **Sandbox:** sandboxInstanceId, commandsHistory, lastPackageJson
6. **Configuration:** agentMode (deterministic/smart), sessionId, hostname
7. **Conversation:** conversationMessages (chat history), pendingUserInputs, projectUpdatesAccumulator
8. **Debug:** lastDeepDebugTranscript (for context in next debug session)

---

## 📋 Blueprint - Project Requirements Document

**Location:** `/worker/agents/schemas.ts`

The blueprint is the complete PRD generated from user's prompt. Contains:

1. **Identity:** title, projectName (kebab-case), description
2. **Visual Design:** colorPalette (RGB codes), views (screens/pages)
3. **User Experience:** uiLayout, uiDesign, userJourney
4. **Technical Architecture:** dataFlow, component structure
5. **Features:** List of capabilities
6. **Phases:** Ordered implementation steps with file paths and purposes
7. **Development Guide:** pitfalls (common bugs to avoid), frameworks (allowed dependencies)
8. **Implementation Roadmap:** High-level phases
9. **Initial Phase:** First phase to implement with file list

**Generation process:**
1. User submits query
2. Template selection (LLM picks React/Vue/Next/etc.)
3. Blueprint generation (large LLM call with full context)
4. Bootstrap template files
5. Initial phase implementation
6. User can iterate or approve

**Key principles:**
- Blueprint is source of truth for entire project
- Modified via `alter_blueprint` tool
- Pitfalls guide prevent common mistakes
- Framework constraints limit dependencies
