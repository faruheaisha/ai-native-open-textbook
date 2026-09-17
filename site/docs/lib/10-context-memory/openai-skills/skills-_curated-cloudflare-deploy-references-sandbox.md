---
title: "Cloudflare Sandbox SDK"
sourceId: "10-context-memory/openai-skills"
sourceTitle: "Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "仅引用"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/openai/skills"
entryUrl: "https://github.com/openai/skills/blob/49f948faa9258a0c61caceaf225e179651397431/skills/.curated/cloudflare-deploy/references/sandbox/README.md"
sourceRel: "skills/.curated/cloudflare-deploy/references/sandbox/README.md"
rawUrl: "/raw/10-context-memory/openai-skills/skills/.curated/cloudflare-deploy/references/sandbox/README.md"
sourceSha256: "daef5eaf1d88b2980c8d6053134e991d6b762c8969b3100a3ee4c5c79f43fa26"
pageSha256: "daef5eaf1d88b2980c8d6053134e991d6b762c8969b3100a3ee4c5c79f43fa26"
contentMode: "local-full"
zh: ""
---

# Cloudflare Sandbox SDK

Secure isolated code execution in containers on Cloudflare's edge. Run untrusted code, manage files, expose services, integrate with AI agents.

**Use cases**: AI code execution, interactive dev environments, data analysis, CI/CD, code interpreters, multi-tenant execution.

## Architecture

- Each sandbox = Durable Object + Container
- Persistent across requests (same ID = same sandbox)
- Isolated filesystem/processes/network
- Configurable sleep/wake for cost optimization

## Quick Start

```typescript
import { getSandbox, proxyToSandbox, type Sandbox } from '@cloudflare/sandbox';
export { Sandbox } from '@cloudflare/sandbox';

type Env = { Sandbox: DurableObjectNamespace<Sandbox>; };

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    // CRITICAL: proxyToSandbox MUST be called first for preview URLs
    const proxyResponse = await proxyToSandbox(request, env);
    if (proxyResponse) return proxyResponse;

    const sandbox = getSandbox(env.Sandbox, 'my-sandbox');
    const result = await sandbox.exec('python3 -c "print(2 + 2)"');
    return Response.json({ output: result.stdout });
  }
};
```

**wrangler.jsonc**:
```jsonc
{
  "name": "my-sandbox-worker",
  "main": "src/index.ts",
  "compatibility_date": "2025-01-01", // Use current date for new projects
  
  "containers": [{
    "class_name": "Sandbox",
    "image": "./Dockerfile",
    "instance_type": "lite",        // lite | standard | heavy
    "max_instances": 5
  }],
  
  "durable_objects": {
    "bindings": [{ "class_name": "Sandbox", "name": "Sandbox" }]
  },
  
  "migrations": [{
    "tag": "v1",
    "new_sqlite_classes": ["Sandbox"]
  }]
}
```

**Dockerfile**:
```dockerfile
FROM docker.io/cloudflare/sandbox:latest
RUN pip3 install --no-cache-dir pandas numpy matplotlib
EXPOSE 8080 3000  # Required for wrangler dev
```

## Core APIs

- `getSandbox(namespace, id, options?)` → Get/create sandbox
- `sandbox.exec(command, options?)` → Execute command
- `sandbox.readFile(path)` / `writeFile(path, content)` → File ops
- `sandbox.startProcess(command, options)` → Background process
- `sandbox.exposePort(port, options)` → Get preview URL
- `sandbox.createSession(options)` → Isolated session
- `sandbox.wsConnect(request, port)` → WebSocket proxy
- `sandbox.destroy()` → Terminate container
- `sandbox.mountBucket(bucket, path, options)` → Mount S3 storage

## Critical Rules

- ALWAYS call `proxyToSandbox()` first
- Same ID = reuse sandbox
- Use `/workspace` for persistent files
- `normalizeId: true` for preview URLs
- Retry on `CONTAINER_NOT_READY`

## In This Reference
- [configuration.md](/lib/10-context-memory/openai-skills/skills-_curated-cloudflare-deploy-references-sandbox-configuration) - Config, CLI, environment setup
- [api.md](/lib/10-context-memory/openai-skills/skills-_curated-cloudflare-deploy-references-sandbox-api) - Programmatic API, testing patterns
- [patterns.md](/lib/10-context-memory/openai-skills/skills-_curated-cloudflare-deploy-references-sandbox-patterns) - Common workflows, CI/CD integration
- [gotchas.md](/lib/10-context-memory/openai-skills/skills-_curated-cloudflare-deploy-references-sandbox-gotchas) - Issues, limits, best practices

## See Also
- [durable-objects](/lib/10-context-memory/openai-skills/skills-_curated-cloudflare-deploy-references-durable-objects) - Sandbox runs on DO infrastructure
- [containers](/lib/10-context-memory/openai-skills/skills-_curated-cloudflare-deploy-references-containers) - Container runtime fundamentals
- [workers](/lib/10-context-memory/openai-skills/skills-_curated-cloudflare-deploy-references-workers) - Entry point for sandbox requests
