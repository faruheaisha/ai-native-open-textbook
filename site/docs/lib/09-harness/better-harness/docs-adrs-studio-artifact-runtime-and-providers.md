---
title: "Harness Studio Artifact runtime and provider architecture"
sourceId: "09-harness/better-harness"
sourceTitle: "Better Harness（QoderAI）"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "09-harness"
sourceUrl: "https://github.com/QoderAI/better-harness"
entryUrl: "https://github.com/QoderAI/better-harness/blob/e1538c15a98856b3349f365d951f4fa0bcc33f24/docs/adrs/studio-artifact-runtime-and-providers.md"
sourceRel: "docs/adrs/studio-artifact-runtime-and-providers.md"
rawUrl: "/raw/09-harness/better-harness/docs/adrs/studio-artifact-runtime-and-providers.md"
sourceSha256: "3759df354b6678c9d1ad823a5f960df893a6f2dbf93a17e07fe24a27ecbeb3fe"
pageSha256: "3759df354b6678c9d1ad823a5f960df893a6f2dbf93a17e07fe24a27ecbeb3fe"
contentMode: "local-full"
zh: ""
---

# Harness Studio Artifact runtime and provider architecture

## Traceability

- ADR ID: `ADR-0007`
- Status: Proposed
- Decision date: 2026-08-22
- Related specs:
  - [View AI-generated artifacts inside Harness Studio](/lib/09-harness/better-harness/docs-specs-2026-08-20-harness-studio-artifact-view)
  - [Narrow the Studio artifact catalog contract](/lib/09-harness/better-harness/docs-specs-2026-08-21-artifact-workspace-model)
  - [Model revision-bound artifacts in Harness Studio](/lib/09-harness/better-harness/docs-specs-2026-08-21-studio-artifact-view-model)
  - [Unify code and diff rendering through Artifact View](/lib/09-harness/better-harness/docs-specs-2026-08-22-studio-artifact-code-diff-view)
  - [Render live code artifacts in Studio](/lib/09-harness/better-harness/docs-specs-2026-08-22-studio-live-artifact-preview)
  - [Render Markdown artifacts as native React documents](/lib/09-harness/better-harness/docs-specs-2026-08-22-studio-markdown-artifact-view)
  - [Render SVG and Mermaid artifacts through the React preview runtime](/lib/09-harness/better-harness/docs-specs-2026-08-22-studio-react-document-artifacts)
  - [Keep Walnut bootstrap receipts portable across platforms](/lib/09-harness/better-harness/docs-specs-2026-08-21-walnut-cross-platform-paths)
  - [Implement external Artifact providers in Harness Studio](/lib/09-harness/better-harness/docs-specs-2026-08-22-studio-external-artifact-provider-runtime)
  - [Extract the Artifact provider SDK and prove it with Structurizr](/lib/09-harness/better-harness/docs-specs-2026-08-22-artifact-provider-sdk-and-structurizr)

## Context

Harness Studio started with a bounded directory catalog and several direct file
previews. It now has the beginnings of a real Artifact runtime:

- exact-byte revisions and revision-scoped URLs;
- data-backed adapters and immutable data snapshots;
- Studio-native React renderers for source, diff, Markdown, PPTX, and images;
- code-backed React previews compiled by `esbuild-wasm` into immutable build
  snapshots and run in an opaque-origin iframe;
- Studio-owned virtual React modules for SVG and Mermaid, with Mermaid rendered
  by `beautiful-mermaid` rather than the larger Mermaid runtime;
- advisory live invalidation followed by an authoritative catalog refetch;
- a Qoder Canvas compatibility bridge; and
- a content-addressed, locally derived Walnut installation receipt.

These capabilities were introduced by separate implementation slices. Their
boundaries are individually useful, but the overall architecture is not yet
explicit. In particular:

- server-side format resolution and browser-side renderer mounting are both
  called registries even though they have different authority;
- Qoder-specific viewer values still leak through the shared server contract;
- Qoder has an executable adapter and hosted renderer without a common provider
  receipt, while Walnut has a strong provider receipt but no reviewed Artifact
  adapter contract;
- a live directory revision is sometimes discussed as if it were retained
  history; and
- Session events, Artifact revisions, semantic addresses, comparison, and
  replay do not yet have an evidence-backed bridge.

Without an explicit decision, adding DOCX, XLSX, PDF, more diagram formats, or
another third-party runtime would put new vendor and format branches into the
catalog, server routes, and React host. It would also make an installed external
runtime appear more trusted or capable than the evidence supports.

## Current and target boundaries

This ADR distinguishes implemented foundations from target boundaries. A target
boundary becomes runtime behavior only through a dated implementation spec and
its validation evidence.

| Concern | Current evidence | Decision target |
| --- | --- | --- |
| Catalog | `HarnessStudioArtifactCatalogV2` with exact content digests | Preserve the server-owned catalog as the browser's sole authority and project every selected runtime through one binding |
| Data lifecycle | Raw, Markdown, PPTX, and Qoder data adapters | Format adapters produce immutable, schema-valid snapshots or exact content references |
| Code lifecycle | TSX/JSX plus Studio-owned SVG and Mermaid virtual modules | One bounded compile/build/preview lifecycle for executable presentation |
| Browser host | Ordered `ArtifactView` providers | Mount the exact server-selected surface; never reclassify by extension |
| Qoder | Provider-specific discovery, sidecar, routes, and renderer type | Translate Qoder into a generic external provider contribution and hosted surface |
| Walnut | Verified local bootstrap receipt; no Artifact execution | Register a receipt-verified, locally derived provider with zero contributions; any future contribution starts `experimental-local` |
| Revision history | Current bytes are revision-bound but not retained | Retention, compare, and replay require a separate immutable Artifact authority |
| Session trace | No canonical Artifact trace link | Add an evidence-backed manifest and trace projection in a later spec |

## Decision

### Use one Artifact domain model

The following terms have one meaning throughout Studio:

- **Artifact Thread** identifies one logical Artifact within an authority scope.
  The current path-derived `threadId` is only catalog-local identity; it is not
  cross-session identity and does not survive a rename.
- **Artifact Revision** identifies exact source bytes by digest. A revision URL
  never serves different bytes after the source moves on.
- **Artifact Descriptor** is the browser-safe catalog projection of a revision,
  its selected adapter, renderer, capabilities, and revision-scoped references.
- **Artifact Data Snapshot** is an immutable, schema-versioned semantic
  projection produced from one revision.
- **Artifact Build Snapshot** is an immutable result of compiling one
  code-backed revision with one selected build runtime.
- **Artifact Surface** is the presentation boundary mounted by Artifact View:
  native React, Studio sandboxed web, external hosted web, or unavailable.
- **Artifact Trace Link** is future retained evidence connecting a Session
  event or tool call to an exact Artifact revision and optional semantic
  address. It is not inferred from the current worktree.

Packaging outputs, checkpoint evidence, report attachments, and Studio Artifact
revisions remain separate namespaces unless an explicit bridge records their
identity and provenance.

An **authority scope** is the namespace and retention owner that can prove an
Artifact identity: currently one live directory catalog, and later potentially
one retained `SessionArtifactManifest`. Catalog-local and Session-stable Thread
ids are distinct namespaces until an explicit provenance bridge relates them.

### Keep catalog authority on the server

The server owns discovery, format classification, revision hashing, plugin
selection, provider verification, and reference construction. Artifact bytes
may select a registered format through bounded inspection, but they never select
a module path, command, package permission, security profile, or provider root.

The browser follows the descriptor returned by the catalog. It does not infer a
renderer from an extension, MIME type, payload kind, or provider label. Unknown
renderer identities and capabilities fail closed into an accessible unavailable
state.

All browser-visible content, snapshot, build, resource, and hosted-view
references remain same-origin, revision-scoped Studio API paths. Absolute host
paths, provider roots, cache locations, and executable entry points remain
server-private.

The catalog revision covers more than file bytes. It also moves when the
selected adapter, build runtime, renderer surface, capability set, omission set,
or external provider fingerprint changes. A catalog identity therefore names
the complete presentation decision visible to a client.

### Separate plugin selection from surface mounting

Studio has two registries with deliberately different responsibilities:

1. The **server Artifact Plugin Registry** selects one immutable binding for an
   indexed revision.
2. The **browser Artifact Surface Registry** mounts the exact renderer identity
   and surface declared by that binding.

This ADR reserves **provider** for a third-party acquisition and trust boundary
such as Qoder or Walnut. A server **plugin** contributes format behavior. A
browser **surface mount** binds a renderer protocol to a React component. The
current `ArtifactRendererProvider` and `ArtifactViewProvider` type names are
legacy names to migrate; they do not create additional provider concepts.

The server registry owns ordered format and provider policy. The browser
registry is a composition table, not a second policy engine. A browser surface
mount may match an exact renderer id or a generic surface protocol such as the
Studio sandboxed preview, but it must not override a server decision by
inspecting the filename again.

The conceptual internal binding is:

```ts
interface ArtifactPluginBinding {
  backing: "data" | "code";
  adapter: ArtifactAdapterImplementation;
  buildRuntime?: ArtifactBuildRuntimeImplementation;
  surface: ArtifactSurfaceBinding;
  capabilities: readonly ArtifactCapability[];
  provider?: ArtifactProviderBinding;
}

interface ArtifactProviderBinding {
  providerId: string;
  contributionId: string;
  fingerprint: ArtifactDigest;
  contributionSupport: "reviewed" | "experimental-local";
}

type ArtifactSurfaceBinding =
  | { kind: "native"; rendererId: string }
  | { kind: "studio-sandbox"; rendererId: string; runtimeId: string }
  | {
      kind: "external-hosted";
      rendererId: string;
      runtimeId: string;
      securityProfileId: "opaque-web-v1";
    }
  | { kind: "unavailable"; reason: string };
```

The host-neutral descriptor, snapshot, source-entry, adapter, surface, and
external Provider shapes are a public package API under
`@qoder-ai/harness/artifacts`. Studio keeps compatibility re-exports while the
core subpath is their sole source owner. React views, catalog discovery and
classification, HTTP routes, activation storage, provider selection, compile
execution, CSP, and iframe hosting stay in `@qoder-ai/harness-studio`; they are
not SDK abstractions. The current V2 catalog continues to project the public
contract through `backing`, `build`, and `renderer`. A later wire-format
revision is justified only when a client needs information that cannot be
represented safely and additively.

The V2 compatibility projection is explicit:

| Current `renderer.type` | Internal surface kind | V2 rule |
| --- | --- | --- |
| `native` | `native` | Unchanged |
| `sandboxed-web` | `studio-sandbox` | Unchanged on the wire |
| `qoder-canvas` | `external-hosted` | Retained as a Qoder compatibility alias in V2 |
| `unavailable` | `unavailable` | Unchanged |

New Studio code normalizes that legacy wire value at the protocol edge and then
uses the generic surface mount. A Qoder provider migration removes
`qoderViewer` and the Canvas-typed plugin context from the generic internal
binding, but it continues to emit `renderer.type: "qoder-canvas"` and the
provider-owned `payload.kind: "qoder-canvas/v1"` discriminator to V2 clients.
For every migrated viewer it also preserves the current
