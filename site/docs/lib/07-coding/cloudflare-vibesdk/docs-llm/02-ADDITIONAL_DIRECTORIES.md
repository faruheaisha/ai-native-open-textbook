---
title: "📦 ADDITIONAL DIRECTORIES"
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
pageSha256: "0868a9b72de9b9ae178125365149e40c9ff5ce9d1025e54d8792e78771ca797a"
contentMode: "local-full"
zh: ""
---

# 📦 ADDITIONAL DIRECTORIES

## container/

**Purpose:** Sandbox container tooling for local development and debugging

**Location:** `/container/`

**Key files:**

1. **cli-tools.ts** - Command-line interface for container operations:
   - File synchronization
   - Command execution in sandbox
   - Log retrieval
   - Static analysis
   - Runtime error monitoring

2. **storage.ts** - Persistent storage management:
   - Key-value store for container state
   - File system operations
   - Cache management

3. **process-monitor.ts** - Process lifecycle monitoring:
   - Dev server health checks
   - Process restart on crashes
   - Resource usage tracking
   - Error collection

4. **types.ts** - TypeScript types for container APIs

**Usage:**
These tools are used internally by the sandbox service and for local debugging. Not typically modified unless adding new sandbox features.

---

## templates/

**Purpose:** Project template system for generating new apps

**Location:** `/templates/`

**Key files:**

1. **template_catalog.json** - Master catalog of all available templates:
   - React (Vite, CRA)
   - Next.js
   - Vue
   - Svelte
   - Vanilla JS
   Each with metadata: name, description, files, dependencies

2. **definitions/** - Template definition files (not in repo, generated)

3. **zips/** - Compressed template archives for deployment

4. **generate_template_catalog.py** - Builds catalog from template sources

5. **deploy_templates.sh** - Deploys templates to production

6. **reference/** - Reference implementations

**How templates work:**
1. Agent selects template based on user's requirements (React, Vue, etc.)
2. Template provides base files (package.json, tsconfig, etc.)
3. Agent generates additional files on top of template
4. All files deployed to sandbox for preview

**Adding new templates:**
1. Create template definition in `definitions/`
2. Run `python generate_template_catalog.py`
3. Test locally with agent
4. Deploy: `bash deploy_templates.sh`
