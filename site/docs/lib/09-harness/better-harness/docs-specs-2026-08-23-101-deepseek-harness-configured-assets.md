---
title: "DeepSeek Harness Configured Assets"
sourceId: "09-harness/better-harness"
sourceTitle: "Better Harness（QoderAI）"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "09-harness"
sourceUrl: "https://github.com/QoderAI/better-harness"
entryUrl: "https://github.com/QoderAI/better-harness/blob/e1538c15a98856b3349f365d951f4fa0bcc33f24/docs/specs/2026-08-23-101-deepseek-harness-configured-assets.md"
sourceRel: "docs/specs/2026-08-23-101-deepseek-harness-configured-assets.md"
rawUrl: "/raw/09-harness/better-harness/docs/specs/2026-08-23-101-deepseek-harness-configured-assets.md"
sourceSha256: "15fdbbcd4989280feed330af18f2558f081190f3ea50852c71f5bf78869034d1"
pageSha256: "15fdbbcd4989280feed330af18f2558f081190f3ea50852c71f5bf78869034d1"
contentMode: "local-full"
zh: ""
---

# DeepSeek Harness Configured Assets

## Traceability

- Spec ID: deepseek-harness-configured-assets
- Story: #101
- Status: Implemented
- Approved scope: [Issue #101](https://github.com/QoderAI/better-harness/issues/101)
- Qualified DSH release: `0.1.1-rc.2`
- Qualified DSH source: `b150a551b8d465e31e418e1b2eaf5e79bbb7d28e`

## Intent

Better Harness already has independent DeepSeek Harness (DSH) session-evidence
and verified Skill-discovery slices, but `agent-customize` cannot report which
filesystem Skills and cwd-sensitive Instructions a DSH environment is
configured to use. This Story adds one bounded DSH configured-assets provider.

The provider reports effective filesystem Skill winners in `manage.skills` and
applicable, byte-budget-represented Instruction sources in `manage.rules`.
Configured or applicable state is not proof that a Skill was invoked or an
Instruction influenced a session. Runtime/in-process Skill providers and the
active Cordis, Profile, and Preset composition remain unresolved.

The implementation is one PR and one provider at
`scripts/agent-customize/providers/dsh.mjs`. DSH gains only
`AGENT_CUSTOMIZE`; it does not gain `ASSET_PRACTICES`, report, output,
evidence-bundle, lifecycle, or Quickstart support.

### Native authority

The implementation is pinned to these DSH owners:

1. [Filesystem Skill provider](https://github.com/deepseek-ai/deepseek-harness/blob/b150a551b8d465e31e418e1b2eaf5e79bbb7d28e/packages/skill/skill-filesystem/src/index.ts)
2. [Skill registry](https://github.com/deepseek-ai/deepseek-harness/blob/b150a551b8d465e31e418e1b2eaf5e79bbb7d28e/packages/skill/skill/src/index.ts)
3. [Instruction configuration](https://github.com/deepseek-ai/deepseek-harness/blob/b150a551b8d465e31e418e1b2eaf5e79bbb7d28e/packages/context/agent-instructions/src/config.ts)
4. [Instruction discovery and loading](https://github.com/deepseek-ai/deepseek-harness/blob/b150a551b8d465e31e418e1b2eaf5e79bbb7d28e/packages/context/agent-instructions/src/files.ts)
5. [Instruction rendering and budgeting](https://github.com/deepseek-ai/deepseek-harness/blob/b150a551b8d465e31e418e1b2eaf5e79bbb7d28e/packages/context/agent-instructions/src/render.ts)

Later DSH versions are not implicitly qualified.

## Acceptance Scenarios

### AC-1: Provider and capability ownership

DSH is registered in the existing `agent-customize` provider map and advertises
exactly `SESSION_ANALYSIS` plus `AGENT_CUSTOMIZE`. It remains absent from
`ASSET_PRACTICES` and every report, rendering, evidence-bundle, and checkup
capability projection.

### AC-2: Standard inventory envelope

The provider returns the existing inventory envelope with `provider: "dsh"`,
`workspace`, `cwd`, `projectRoot`, standard tabs, `manage.skills`,
`manage.rules`, and empty Plugin, MCP, Subagent, Command, and Hook collections.
No new shared item schema is introduced.

### AC-3: Native filesystem Skill discovery

The provider discovers only native one-level Skill layouts:

- `<root>/<entry>/SKILL.md`
- `<root>/<entry>.md`

Entries in each root use native `localeCompare` order. Arbitrary nested Skill
files and unsupported entries are excluded. `.system` is skipped only in the
user DSH root. The validated frontmatter `name`, not the filename, is Skill
identity. Active results are sorted by DSH's code-point name ordering.

### AC-4: DSH-compatible Skill validation

Frontmatter begins with an exact `---` line, ends at an exact `---` line, and
parses to a YAML object. `name` and `description` must be non-empty strings;
names match `^[a-z0-9]+(?:-[a-z0-9]+)*$`. Unknown fields and object-valued
`metadata` are accepted but not emitted.

Canonical `disable-model-invocation` and `user-invocable` values accept native
booleans, `1`/`0`, and case-insensitive `true`, `false`, `yes`, `no`, `on`, and
`off`. Invalid canonical values and legacy `disableModelInvocation`,
`modelInvocable`, and `userInvocable` fields invalidate the candidate.

Implementation uses a direct production dependency on exact `yaml@2.9.0`.
The existing lossy Better Harness frontmatter helper is not DSH-compatible.
Skill bodies may be read only as needed to locate frontmatter boundaries and
are never retained in or serialized by the inventory.

### AC-5: Filesystem precedence and runtime qualification

Lower ranks win duplicate declared names within the qualified filesystem view:

| Rank | Source |
| ---: | --- |
| 100 | `<projectRoot>/.dsh/skills` |
| 200 | `<projectRoot>/.agents/skills` |
| 250 | runtime/in-process registry, unresolved and not inventoried |
| 300 | `customSkillDirs`, in declaration order |
| 400 | `<dshHome>/skills` |
| 500 | `<dshAgentsHome>/skills` |
| 600 | bundled Skill root |

Ties use provider registration order and then provider-local candidate order.
A malformed higher-priority candidate is absent and permits a valid lower
candidate to win. Only the filesystem winner appears in `manage.skills`;
shadowed candidates are diagnostics, never active Skills. The provider never
claims a complete runtime winner because rank-250 and scoped providers are
unresolved.

### AC-6: Workspace, cwd, and project authorization

`workspace` defaults to `process.cwd()`. `cwd` defaults to workspace and must
exist as a directory equal to or lexically inside workspace. Missing or
non-directory inputs and an outside cwd fail before asset scanning. No cwd is
derived from session evidence.

Workspace is the analysis-selection boundary and cwd-containment boundary, not
a universal filesystem sandbox. Starting at cwd, DSH walks upward to the
nearest existing `.git` file or directory. That directory is `projectRoot`; if
no marker exists, cwd is `projectRoot`. Selecting workspace/cwd authorizes the
fixed native DSH project sources at that root and the root-to-cwd Instruction
chain, including when `projectRoot` is above workspace. Discovery stops at the
nearest project root and does not crawl arbitrary siblings or ancestors above
it. The resolved `projectRoot` is returned at the inventory top level.

### AC-7: User-home and explicit-root authorization

`includeUserHome` defaults to `false`. Without opt-in, the provider performs no
`stat`, `readdir`, `readFile`, `createReadStream`, or `realpath` against:

- `<dshHome>/skills`
- `<dshAgentsHome>/skills`
- `<dshHome>/AGENTS.md`
- ambient `DSH_BUNDLED_SKILL_DIR`

Opt-in authorizes those ambient sources. Supplying `dshHome` or
`dshAgentsHome` alone does not authorize them. Programmatic `customSkillDirs`
and explicit `bundledSkillDir` authorize exactly their named lexical roots,
including off-tree roots, without authorizing siblings and without requiring
user-home opt-in.

Explicit-root scope is `project` inside workspace, `user` inside the operating
system home, and `other` otherwise. Relative custom/bundled/agents-home values
resolve from `process.cwd()` and do not expand literal `~`. DSH home alone uses
native `resolveDshHome` semantics: an explicit `dshHome`/`dsh-home`/`home`
value has precedence (including an explicit blank value); a blank or
whitespace-only ambient `DSH_HOME` is treated as unset and falls back to
