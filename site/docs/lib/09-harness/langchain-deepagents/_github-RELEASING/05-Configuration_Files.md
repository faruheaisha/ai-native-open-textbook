---
title: "LangChain DeepAgents"
sourceId: "09-harness/langchain-deepagents"
sourceTitle: "LangChain DeepAgents"
sourceKind: "产品仓库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://github.com/langchain-ai/deepagents"
entryUrl: "https://github.com/langchain-ai/deepagents/blob/d93ab3351bbf4c3687212f665094ccad100f2c08/.github/RELEASING.md"
sourceRel: ".github/RELEASING.md"
rawUrl: "/raw/09-harness/langchain-deepagents/.github/RELEASING.md"
sourceSha256: "c49b4d41b74096555af3aadaeee6fda996e8d0ea7d0bb75fe5371469cd90c0c4"
pageSha256: "4595e149a8a378fbd0fe51936e23d84cb5469d827d1a6a001a911fca6cecd15c"
contentMode: "local-full"
zh: ""
---

## Configuration Files

### `release-please-config.json`

Defines release-please behavior for each package.

### `.release-please-manifest.json`

Tracks the current version of each package. Automatically updated by release-please — **do not edit manually** except when adding a new release-please-managed package. Example (versions shown are illustrative; check the actual file for current values):

```json
{
  "libs/deepagents": "0.5.1",
  "libs/acp": "0.0.5",
  "libs/talon": "0.0.1",
  "libs/partners/daytona": "0.0.5",
  "libs/partners/modal": "0.0.3",
  "libs/partners/runloop": "0.0.4",
  "libs/partners/vercel": "0.0.1",
  "libs/partners/quickjs": "0.0.1"
}
```

### Adding a release-please-managed package

When adding a new managed package, add it to both `release-please-config.json` and `.release-please-manifest.json`. The manifest entry is the **latest released version baseline**, not the package's current source version.

User story: you are adding a first-party integration package, such as a new sandbox provider under `libs/partners/<provider>`, and the PR title is release-worthy (`feat(<scope>): ...`). The package source starts at `0.0.1`, and you want the first release PR for that package to publish `0.0.1`, not immediately bump to `0.0.2` before the package has ever shipped. In this case, set the new `.release-please-manifest.json` entry to `0.0.0` while keeping the package's own `pyproject.toml` and `_version.py` at `0.0.1`.

Do **not** add a new managed package to the manifest at `0.0.1` unless `0.0.1` has already been released outside release-please. If the new manifest baseline is `0.0.1`, release-please treats that as already released and opens the initial release PR for `0.0.2`. The `Release-please initial baseline check` workflow blocks PRs that add a new `0.0.1` managed package baseline.
