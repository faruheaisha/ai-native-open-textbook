---
title: "Skills System Reference"
sourceId: "09-harness/codex-cli-best-practice"
sourceTitle: "Codex CLI Best Practice"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "09-harness"
sourceUrl: "https://github.com/shanraisshan/codex-cli-best-practice"
entryUrl: "https://github.com/shanraisshan/codex-cli-best-practice/blob/b79f473a188632867354fc793894dfd368a18e48/README.md"
zh: "on"
---

# Skills System Reference

Skills are reusable instruction packages that extend Codex CLI with focused workflows and domain expertise. They follow the open `SKILL.md` standard and are the authoring format behind reusable Codex workflows.

<div class="tb-zh"><p>Skill 是可复用的指令包，用聚焦的工作流与领域专长扩展 Codex CLI。它们遵循开放的 SKILL.md 标准，也是编写可复用 Codex 工作流所用的格式。</p></div>

## Skill Structure

Skills live in `.agents/skills/<name>/` and must include `SKILL.md`. A skill directory can also include supporting material for progressive disclosure:

<div class="tb-zh"><p>Skill 放在 .agents/skills/&lt;名称&gt;/ 下，且必须包含 SKILL.md。一个 skill 目录还可以包含支撑材料，用于渐进式披露：</p></div>

```text
.agents/skills/
  my-skill/
    SKILL.md
    scripts/
    references/
    assets/
    agents/
      openai.yaml
```

- `SKILL.md`: Required instructions plus metadata
- `scripts/`: Optional executable helpers
- `references/`: Optional docs and examples
- `assets/`: Optional templates or static resources
- `agents/openai.yaml`: Optional UI, policy, and dependency metadata

<div class="tb-zh"><p>SKILL.md：必需的指令加元数据；scripts/：可选的可执行辅助脚本；references/：可选的文档与示例；assets/：可选的模板或静态资源；agents/openai.yaml：可选的 UI、策略与依赖元数据。</p></div>

## Minimal `SKILL.md`

Codex requires only `name` and `description` in YAML frontmatter:

<div class="tb-zh"><p>Codex 只要求 YAML frontmatter 里有 name 和 description 两个字段：</p></div>

```markdown
---
name: my-skill
description: Explain exactly when this skill should and should not trigger.
---

# My Skill

Instructions Codex should follow when this skill is activated.
```

The `description` is the trigger surface for implicit invocation, so write it as a precise "when should this fire?" statement.

<div class="tb-zh"><p>description 是隐式触发的触发面，所以要把它写成一句精确的「什么时候该启用我」的说明。</p></div>

## How Codex Uses Skills

Codex can activate a skill in two ways:

<div class="tb-zh"><p>Codex 可以用两种方式激活 skill：</p></div>

1. Explicit invocation: mention the skill directly in your prompt. In the CLI or IDE, use `/skills` or type `$` to insert a skill mention.
2. Implicit invocation: Codex chooses the skill when your task matches the skill `description`.

<div class="tb-zh"><p>1）显式调用：在提示词里直接提到该 skill。在 CLI 或 IDE 里用 /skills，或输入 $ 来插入一个 skill 引用。2）隐式调用：当你的任务与 skill 的 description 匹配时，由 Codex 自行选择该 skill。</p></div>

Codex uses progressive disclosure for skills. It starts with metadata such as `name`, `description`, path, and optional `agents/openai.yaml` data, then loads the full `SKILL.md` only when the skill is selected.

<div class="tb-zh"><p>Codex 对 skill 采用渐进式披露：先看 name、description、路径以及可选的 agents/openai.yaml 等元数据，只有在该 skill 被选中时才加载完整的 SKILL.md。</p></div>

## Built-in Skills

Codex bundles system skills that are available out of the box. Common examples include:

<div class="tb-zh"><p>Codex 内置了一批开箱可用的系统 skill，常见例子包括：</p></div>

- `$plan`
- `$skill-creator`
- `$skill-installer`

<div class="tb-zh"><p>$plan、$skill-creator、$skill-installer。</p></div>

Built-in skill inventory can evolve across releases, so prefer examples over hard-coded lists.

<div class="tb-zh"><p>内置 skill 清单会随版本变化，所以别写死列表，尽量举例子。</p></div>

## Discovery Paths

Codex discovers skills from these locations:

<div class="tb-zh"><p>Codex 从这些位置发现 skill：</p></div>

1. Repository skills from the current working directory up to the repository root: `.agents/skills/`
2. User skills: `~/.agents/skills/`
3. Admin skills: `/etc/codex/skills`
4. System skills bundled with Codex

<div class="tb-zh"><p>1）仓库级 skill：从当前工作目录向上直到仓库根目录的 .agents/skills/；2）用户级 skill：~/.agents/skills/；3）管理员级 skill：/etc/codex/skills；4）Codex 自带的系统 skill。</p></div>

Codex scans repository locations from the current working directory upward. If two skills share the same name, Codex does not merge them.

<div class="tb-zh"><p>Codex 会从当前工作目录向上扫描仓库内的位置。如果两个 skill 同名，Codex 不会把它们合并。</p></div>

## Distribute Skills with Plugins

Skills are the authoring format. Plugins are the installable distribution unit for reusable skills, apps, and MCP integrations.

<div class="tb-zh"><p>Skill 是编写格式；插件（plugin）则是可安装的分发单元，用来打包可复用的 skill、应用和 MCP 集成。</p></div>

Use direct skill folders for repo-local workflows and day-to-day authoring. Package skills as plugins when you want to distribute them, bundle them with apps or MCP config, or publish them through a marketplace.

<div class="tb-zh"><p>仓库内的工作流和日常编写，直接用 skill 目录就行；当你想要分发、想把它和 apps 或 MCP 配置打包在一起、或通过市场发布时，就把它打包成 plugin。</p></div>

## Enable or Disable Skills

Use `[[skills.config]]` entries in `~/.codex/config.toml` to disable a skill without deleting it:

<div class="tb-zh"><p>在 ~/.codex/config.toml 里用 [[skills.config]] 条目，可以在不删除 skill 的前提下把它禁用：</p></div>

```toml
[[skills.config]]
path = "/path/to/skill/SKILL.md"
enabled = false
```

Restart Codex after changing skill config.

<div class="tb-zh"><p>改完 skill 配置后要重启 Codex。</p></div>

## Optional Metadata with `agents/openai.yaml`

Use `agents/openai.yaml` for optional UI, policy, and dependency metadata instead of relying on undocumented frontmatter fields:

<div class="tb-zh"><p>可选的 UI、策略与依赖元数据请写进 agents/openai.yaml，不要依赖没有文档的 frontmatter 字段：</p></div>

```yaml
interface:
  display_name: "Docs Helper"
  short_description: "Verifies framework APIs before code changes"

policy:
  allow_implicit_invocation: false

dependencies:
  tools:
    - type: mcp
      value: openaiDeveloperDocs
      description: OpenAI Docs MCP server
      transport: streamable_http
      url: https://developers.openai.com/mcp
```

## Best Practices

- Keep each skill focused on one job.
- Prefer instructions over scripts unless you need deterministic behavior or external tooling.
- Write `description` fields as trigger conditions, not marketing copy.
- Use `references/` and `scripts/` to keep `SKILL.md` concise.
- Use plugins for reusable distribution outside a single repo.

<div class="tb-zh"><p>每个 skill 只专注一件事；除非需要确定性行为或外部工具，否则优先写指令而不是脚本；description 字段要写成触发条件，而不是营销文案；用 references/ 和 scripts/ 让 SKILL.md 保持简洁；跨仓库复用分发时使用 plugin。</p></div>
