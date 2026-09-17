---
title: "Installation"
sourceId: "09-harness/better-harness"
sourceTitle: "Better Harness（QoderAI）"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "09-harness"
sourceUrl: "https://github.com/QoderAI/better-harness"
entryUrl: "https://github.com/QoderAI/better-harness/blob/e1538c15a98856b3349f365d951f4fa0bcc33f24/docs/docs/installation.mdx"
sourceRel: "docs/docs/installation.mdx"
rawUrl: "/raw/09-harness/better-harness/docs/docs/installation.mdx"
sourceSha256: "9d00c4f2667ed2068c088b301ab81748fb21f194fd0bfa479b0b03cbb148caa8"
pageSha256: "9d00c4f2667ed2068c088b301ab81748fb21f194fd0bfa479b0b03cbb148caa8"
contentMode: "local-full"
zh: ""
---

# Installation

Installation differs by coding agent. Install Better Harness separately for
each host, except that Qoder CLI can use the version bundled with Qoder
Desktop. After installing or updating a plugin, start a new session or task so
the host reloads its plugin inventory.

## Prerequisites \{#prerequisites\}

To use Better Harness from a host, install one of the supported coding agents
below and make sure it can open the repository you want to analyze. The host's
own system requirements and runtime still apply; follow its tab without running
the repository's development setup unless the tab explicitly uses a source
checkout.

Node.js and npm are required only when you use the standalone CLI, run Better
Harness from a source checkout, or contribute to this repository. Those paths
support Windows, macOS, and Linux and require:

- Node.js `>=22.20.0 <25.0.0`
- npm `>=10.9.3 <12.0.0`

Check the active runtime before using the standalone or source CLI:

```bash
node --version
npm --version
```

## Inspect and plan lifecycle changes \{#lifecycle-cli\}

The standalone CLI exposes a read-only view of Better Harness installation
evidence. It does not contact a registry, modify host configuration, or execute
the steps in a lifecycle plan:

```bash
better-harness plugin status --host all
better-harness doctor --platform all
better-harness plugin plan install --host qwen --surface cli --scope user
better-harness plugin verify --host qwen --surface cli
```

Plans preserve host differences instead of inventing a common mutation path.
Qoder Desktop is bundled, Codex Desktop returns manual UI steps, Cursor remains
session-only while its native command contract is reconciled, Pi operations
without current native evidence are manual or unavailable, and WorkBuddy has no
managed plugin lifecycle surface. There is no `plugin apply` command.

Git can clone the Cursor manifest for inspection, but manifest presence alone
does not establish a supported installation route.

## DeepSeek Harness verified discovery (not Quickstart) \{#deepseek-harness-dsh\}

DeepSeek Harness (DSH) has a bounded **Verified install/discovery** route for
the qualified DSH `0.1.1-rc.2` contract. This is not a public Quickstart or a
complete report loop.

Start from a complete Better Harness source checkout or npm package directory.
Call its absolute directory `<BETTER_HARNESS_ROOT>` below. It must contain
`skills/better-harness/SKILL.md`, `scripts/better-harness.mjs`, `references/`,
`models/`, and `templates/`.

### Headless/base

In the active headless profile's `cordis.patch.yml`, configure the existing
global Skill filesystem row and insert the Better Harness DSH policy:

```yaml
- id: skill-filesystem
  config:
    customSkillDirs:
      - /absolute/path/to/better-harness/skills

- insert:
    - id: better-harness-explicit-only
      name: /absolute/path/to/better-harness/scripts/dsh-skill-discovery/index.mjs
      config:
        betterHarnessRoot: /absolute/path/to/better-harness
```

The profile file is normally
`$DSH_HOME/profiles/headless/cordis.patch.yml`. Replace every example with the
same real absolute root before starting a new session.

### Web `standard`, `code`, or `cordis`

The Web host owns Skill discovery inside the selected agent preset. In Web's
Agent Presets settings, copy `standard`, `code`, or `cordis` to a user preset.
Edit that copy's active `skill-filesystem` row in
