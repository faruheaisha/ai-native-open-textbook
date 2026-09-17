---
title: "Node Runtime Discovery"
sourceId: "09-harness/better-harness"
sourceTitle: "Better Harness（QoderAI）"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "09-harness"
sourceUrl: "https://github.com/QoderAI/better-harness"
entryUrl: "https://github.com/QoderAI/better-harness/blob/e1538c15a98856b3349f365d951f4fa0bcc33f24/references/tool-runtimes/node-runtime-discovery.md"
sourceRel: "references/tool-runtimes/node-runtime-discovery.md"
rawUrl: "/raw/09-harness/better-harness/references/tool-runtimes/node-runtime-discovery.md"
sourceSha256: "a8b8b44b8c18c40bad2253e30115f2bd0a0b24c8316eaf3a0fbe4a74e4366467"
pageSha256: "a8b8b44b8c18c40bad2253e30115f2bd0a0b24c8316eaf3a0fbe4a74e4366467"
contentMode: "local-full"
zh: ""
---

# Node Runtime Discovery

Use this reference before running Better Harness Node-backed tools when `node` is
not available on `PATH` or `node --version` fails. Treat the resolved executable
as `<node>` in command examples.

Do not install Node, mutate PATH, or create symlinks as part of discovery.

## Discovery Order

1. Use `NODE_REPL_NODE_PATH` or a user-provided Node path when present.
2. Use `node` from `PATH` only if `node --version` succeeds.
3. Prefer standalone Codex and Cursor helpers:
   - macOS Codex:
     `/Applications/Codex.app/Contents/Resources/cua_node/bin/node`
   - macOS Cursor:
     `/Applications/Cursor.app/Contents/Resources/app/resources/helpers/node`
4. Only use Electron-as-Node as a final fallback after validating that it runs
   as Node and exits quickly. For example:
   - macOS:
      `ELECTRON_RUN_AS_NODE=1 /Applications/Qoder.app/Contents/MacOS/Electron`
    - Windows PowerShell:
     `$env:ELECTRON_RUN_AS_NODE="1"; & "$env:LOCALAPPDATA\Programs\Qoder\Qoder.exe" -e "console.log(process.version)"`
   - Windows CMD:
     `set "ELECTRON_RUN_AS_NODE=1" && "%LOCALAPPDATA%\Programs\Qoder\Qoder.exe" -e "console.log(process.version)"`

Qoder app binaries that are not named `node` or `node.exe` are not automatically
valid Node helpers. Probe them only when a user provides the path, and skip them
unless validation proves they behave as Node.

## Candidate Validation

Validate every candidate before using it:

```sh
"$NODE" -p 'JSON.stringify({node:process.versions.node,electron:process.versions.electron||null})'
```

Accept the candidate only when the command exits quickly, returns valid JSON,
and reports `node >= 22.22.0`.

For Electron-as-Node, set the host's Node mode if needed, run the same
validation with a short timeout, and require quick exit. If it launches the app,
hangs, or reports an older Node version, reject it.

## Command Usage

After resolving `<node>`, run Better Harness `.mjs` tools with that executable:

```sh
