---
title: "Harness as Code v0.3 contract"
sourceId: "09-harness/better-harness"
sourceTitle: "Better Harness（QoderAI）"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "09-harness"
sourceUrl: "https://github.com/QoderAI/better-harness"
entryUrl: "https://github.com/QoderAI/better-harness/blob/e1538c15a98856b3349f365d951f4fa0bcc33f24/packages/harness/skills/generate-harness-dsl/references/dsl-contract.md"
sourceRel: "packages/harness/skills/generate-harness-dsl/references/dsl-contract.md"
rawUrl: "/raw/09-harness/better-harness/packages/harness/skills/generate-harness-dsl/references/dsl-contract.md"
sourceSha256: "0b0a69503a06873e9d53d35b693441864e48ef36f26ff19534910ca6fb6fb3c9"
pageSha256: "0b0a69503a06873e9d53d35b693441864e48ef36f26ff19534910ca6fb6fb3c9"
contentMode: "local-full"
zh: ""
---

# Harness as Code v0.3 contract

The grammar and runtime are owned by `packages/harness/src/`; this reference is
the compact authoring contract.

- [Document and deployment](#document-and-deployment)
- [Harness and workflow](#harness-and-workflow)
- [Capabilities](#capabilities)
- [Semantic checklist](#semantic-checklist)

## Document and deployment

Every document starts with its language version. A deployable assembly declares
its runtime and names the exact harness/runtime pair:

```harness
language 0.3

skill require-tests {
  description "Do not report completion until tests prove it."
}

workflow single-pass {
  session coder
}

harness my-agent {
  workflow single-pass
  agent coder { use skill require-tests }
}

runtime qoder {
  adapter "@harness/adapter-qoder"
}

deployment my-agent-qoder {
  harness my-agent
  runtime qoder
}
```

Only named deployments are resolvable. This makes composition sparse and
auditable: two harnesses and two runtimes do not silently create four products.
Deployment ids and harness/runtime pairs must be unique.

Comments use `//` or `/* ... */`. Identifiers match
`[_a-zA-Z][\w-]*`; capability ids may be dotted. Strings use double quotes and
do not support embedded escaped quotes.

## Harness and workflow

A harness declares logical agent roles and exactly one workflow reference. The
workflow has exactly one form.

Portable single host session:

```harness
workflow coding-session { session coder }
```

Each harness using it must declare exactly the named agent. Qoder and Pi support
this mode; they do not turn multiple logical roles into separate sessions.

Adapter-owned state machine:

```harness
workflow coding-loop {
  state-machine
  entry author
  on author.ready -> verifier
  on verifier.failed -> author
  stop when verifier.passed
}

harness reviewed-coding {
  workflow coding-loop
  agent author { outcomes { ready } }
  agent verifier { outcomes { failed passed } }
}
```

Outcomes are typed per emitting role. Every agent must be reachable from
`entry`, every route must name declared roles/outcomes, and at least one stop is
required. Compilation proves graph shape; resolution still fails unless the
selected adapter declares and implements `state-machine` orchestration.

Programmatic controller:

```harness
workflow scripted-loop {
  program deno "./flows/coding-loop.ts"
}
```

The adapter must support `programmatic` workflows and list `deno` as a
controller language. The DSL does not execute the file by itself.

## Capabilities

Requirements use kind-specific verbs:

```harness
agent coder {
  use skill repository-analysis
  require tool workspace.read
  connect mcp package-registry
}
```

- A skill needs `source`, `description`, or both. Resolution means the adapter
  can deliver it; source-backed skill bytes are locked and delivered at run
  time.
- Standard tools may be implicit: `workspace.read`, `workspace.glob`,
  `workspace.search`, `workspace.edit`, `workspace.write`, and `process.exec`.
