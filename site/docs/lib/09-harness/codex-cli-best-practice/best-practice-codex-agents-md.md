---
title: "Best Practice: AGENTS.md"
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

# Best Practice: AGENTS.md

The `AGENTS.md` file is the primary instructions file for Codex CLI — providing project-level context and behavioral directives.

<div class="tb-zh"><p>AGENTS.md 是 Codex CLI 的主要指令文件——提供项目级上下文和行为指令。</p></div>

## File Naming and Fallbacks

Codex CLI searches for instructions in this order:
1. `AGENTS.md` (preferred)
2. `CODEX.md` (alias)

<div class="tb-zh"><p>Codex CLI 按以下顺序查找指令：1）AGENTS.md（首选）；2）CODEX.md（别名）。</p></div>

Use `AGENTS.md` for new projects.

<div class="tb-zh"><p>新项目请使用 AGENTS.md。</p></div>

## Sizing: Keep It Under 150 Lines

The single most impactful best practice: **keep AGENTS.md concise**.

<div class="tb-zh"><p>最有价值的一条最佳实践：让 AGENTS.md 保持简洁。</p></div>

- Lines beyond ~150 are increasingly likely to be ignored or truncated
- Long files dilute important instructions with noise
- The model processes instructions better when they are focused

<div class="tb-zh"><p>超过约 150 行之后，多余的行越来越可能被忽略或被截断；过长的文件会用噪音稀释重要指令；指令聚焦时，模型处理得更好。</p></div>

**If you exceed 150 lines**, extract detailed content into:
- Skill files (`skills/<name>/SKILL.md`) for specialized procedures
- Separate docs files referenced by path
- Agent-preloaded skills for domain-specific knowledge

<div class="tb-zh"><p>如果超过 150 行，把细节内容抽出去：抽成 skill 文件（skills/&lt;名称&gt;/SKILL.md）用于专门流程；抽成按路径引用的独立文档；抽成 agent 预加载的 skills 用于领域知识。</p></div>

## Hierarchy and Override Mechanism

AGENTS.md files follow directory hierarchy:

<div class="tb-zh"><p>AGENTS.md 文件遵循目录层级：</p></div>

```
/repo/AGENTS.md              # Root-level instructions
/repo/packages/api/AGENTS.md # Package-specific overrides
/repo/packages/web/AGENTS.md # Package-specific overrides
```

**Loading behavior**:
- Codex walks up from the working directory, loading each AGENTS.md it finds
- More specific (deeper) files take precedence over general (higher) ones
- All files are concatenated into context, with deeper files appearing later

<div class="tb-zh"><p>加载行为：Codex 会从工作目录逐级向上查找，加载它发现的每一个 AGENTS.md；更具体（更深层）的文件优先于更笼统（更上层）的文件；所有文件会被拼接进上下文，更深层的文件排在后面。</p></div>

## Recommended Structure

```markdown
# AGENTS.md

## Repository Overview
One paragraph describing what this project is and does.

## Key Components
Brief descriptions of major subsystems, with file paths.

## Critical Patterns
Non-obvious conventions the model MUST follow.

## Workflow Rules
Build, test, lint commands. Deployment patterns.

## Do NOT
Explicit anti-patterns to avoid.
```

## Anti-Patterns

| Anti-Pattern | Why It Fails | Fix |
|---|---|---|
| Dumping entire API docs | Exceeds line limit; dilutes focus | Link to docs; use skills |
| Repeating obvious conventions | Wastes lines on things the model knows | Only document the non-obvious |
| Long code examples | Eats line budget fast | Keep examples under 10 lines |
| Vague instructions ("be careful") | Not actionable | Be specific: "Always run `npm test` before committing" |
| Contradictory rules | Model picks one arbitrarily | Audit for conflicts |

## Monorepo Strategy

For monorepos, use a layered approach:

<div class="tb-zh"><p>在 monorepo 里，采用分层做法：</p></div>

1. **Root `AGENTS.md`**: Shared conventions (git workflow, CI commands, coding standards)
2. **Package `AGENTS.md`**: Package-specific build commands, architecture decisions, testing patterns
3. **Skills**: Extract complex procedures (deployment, migration) into skills that any AGENTS.md can reference

<div class="tb-zh"><p>1）根目录的 AGENTS.md：共享约定（git 工作流、CI 命令、编码规范）；2）各包的 AGENTS.md：该包专属的构建命令、架构决策、测试模式；3）Skills：把复杂流程（部署、迁移）抽成任何 AGENTS.md 都能引用的 skill。</p></div>

This keeps each file short while maintaining comprehensive coverage.

<div class="tb-zh"><p>这样每个文件都不长，同时又能覆盖全面。</p></div>

## Truncation Behavior

When AGENTS.md exceeds the model's processing capacity:
- Content at the end of the file is most likely to be truncated
- Put the most critical instructions at the top
- Use clear section headers so the model can scan structure even if details are lost
- Test by asking the model to repeat instructions from different sections

<div class="tb-zh"><p>当 AGENTS.md 超出模型的处理能力时：文件末尾的内容最可能被截断；把最关键的指令放在最前面；使用清晰的小节标题，这样即使细节丢失，模型也能扫出结构；用「让模型复述不同小节的指令」来测试。</p></div>
