---
title: "View AI-generated artifacts inside Harness Studio"
sourceId: "09-harness/better-harness"
sourceTitle: "Better Harness（QoderAI）"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "09-harness"
sourceUrl: "https://github.com/QoderAI/better-harness"
entryUrl: "https://github.com/QoderAI/better-harness/blob/e1538c15a98856b3349f365d951f4fa0bcc33f24/docs/specs/2026-08-20-harness-studio-artifact-view.md"
sourceRel: "docs/specs/2026-08-20-harness-studio-artifact-view.md"
rawUrl: "/raw/09-harness/better-harness/docs/specs/2026-08-20-harness-studio-artifact-view.md"
sourceSha256: "21a9dd87c29968727f33fdd33060bdfbe3efdf6038775e1ac15f6952635edbba"
pageSha256: "21a9dd87c29968727f33fdd33060bdfbe3efdf6038775e1ac15f6952635edbba"
contentMode: "local-full"
zh: ""
---

# View AI-generated artifacts inside Harness Studio

## Traceability

- Spec ID: harness-studio-artifact-view
- Status: Implemented
- Acquisition: Superseded by `harness-studio-local-web-workspace`; Artifact View
  is session-scoped rather than the root directory-selection workflow.

## Intent

Harness Studio should render files produced by an AI run without asking the
reviewer to leave the evidence workbench. Code, patches, JSON, text, images, and
SVG use bounded Studio-owned renderers. Rich formats such as PPTX, XLSX, DOCX,
GLB, and Lottie reuse provisioned Qoder Canvas format viewers.

Artifact bytes are untrusted data. They are never promoted to executable React
modules merely because their extension is `.tsx` or `.jsx`. Executable viewer
code comes only from the operator-controlled Canvas viewer root.

The first implementation commit (`a8922dc`) inverted that boundary by executing
TSX artifacts while leaving the requested formats unrendered. This revision
replaces that proof-of-concept contract rather than extending it.

## Decisions

- **D-1: data and renderer ownership are separate.** The configured artifact
  directory owns files to inspect. The provisioned Canvas directory owns trusted
  renderer extensions.
- **D-2: direct renderers are independent.** Missing Canvas resources do not
  disable code, diff, JSON, text, image, or SVG previews.
- **D-3: viewer discovery follows the Qoder contract.** The default viewer root
  is `$QODER_HOME/canvas/canvases`, falling back to
  `~/.qoder/canvas/canvases`. Tests may override it explicitly.
- **D-4: viewer caches are not inputs.** Studio runs the selected viewer's
  `scripts/index.mjs` with a request-scoped data file; it never treats retained
  `index.target-*.canvas.data.json` files as current output.
- **D-5: Studio reuses the host contract, not Electron-only recovery.** Viewer
  TSX is transformed with esbuild-wasm while preserving ESM imports for the
  Canvas runtime import map. The Lingma Electron node shim and Sucrase fallback
  are not needed in the plain Node Studio server.
- **D-6: artifact acquisition is a Studio workflow.** `--artifacts` remains an
  optional preload for automation, but a reviewer can start with no inputs and
  choose files or a directory in the browser. Browser-selected bytes are copied
  into a bounded Studio-owned temporary session because browsers do not expose
  a portable server-readable absolute path.

## Renderer Resolution

For every indexed artifact, Studio resolves one presentation:

1. A Canvas viewer whose manifest sets `overrideBuiltIn` or
   `overridesBuiltIn` and matches the artifact.
2. A Studio direct renderer for code, diff, JSON, text, image, or SVG.
3. Any matching provisioned Canvas viewer.
4. An unavailable metadata state; unknown bytes are never executed.

Canvas viewer manifests are read from
