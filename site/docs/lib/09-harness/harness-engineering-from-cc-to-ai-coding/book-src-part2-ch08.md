---
title: "第8章：工具提示词作为微型驾驭器"
sourceId: "09-harness/harness-engineering-from-cc-to-ai-coding"
sourceTitle: "驾驭工程：从 Claude Code 源码到 AI 编码最佳实践"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "中文"
tier: 1
volume: "09-harness"
sourceUrl: "https://github.com/ZhangHanDong/harness-engineering-from-cc-to-ai-coding"
entryUrl: "https://github.com/ZhangHanDong/harness-engineering-from-cc-to-ai-coding/blob/e40e0feec02b90e308ccbfc7a8911d64118ccca0/book/src/part2/ch08.md"
sourceRel: "book/src/part2/ch08.md"
rawUrl: "/raw/09-harness/harness-engineering-from-cc-to-ai-coding/book/src/part2/ch08.md"
sourceSha256: "7b618c67de67e02d8386cb82687a8e1e0703355d6e807726c4cf145449722e70"
pageSha256: "7b618c67de67e02d8386cb82687a8e1e0703355d6e807726c4cf145449722e70"
contentMode: "local-full"
zh: ""
---

# 第8章：工具提示词作为微型驾驭器

> **定位**：本章逐一拆解 CC 六大核心工具的 `description` 提示词设计——BashTool、EditTool、GrepTool 等如何通过微型驾驭器塑造模型的工具使用行为。前置依赖：第2章（工具系统）、第5章（系统提示词架构）。适用场景：想理解 CC 如何为每个工具编写独立的行为提示词的读者。

> 第5章解剖了系统提示词的宏观架构 -- 段落注册、缓存分层、动态拼装。但系统提示词只是"顶层战略"。在每次工具调用的微观层面，还有一套平行的驾驭体系在运作：**工具提示词（tool description / tool prompt）**。它们作为 `description` 字段注入 API 请求的 `tools` 数组，直接塑造模型对每个工具的使用方式。本章将逐一拆解 Claude Code 六大核心工具的提示词设计，揭示其中的引导策略与可复用模式。

## 8.1 工具提示词的驾驭本质

工具的 `description` 字段在 Anthropic API 中的定位是"告诉模型这个工具做什么"。但 Claude Code 将这个字段从简单的功能描述，扩展为一套完整的**行为约束协议**。每个工具的提示词实际上是一个微型驾驭器（micro-harness），包含：

- **功能描述**：工具做什么
- **正面引导**：应该怎么用
- **负面禁令**：不能怎么用
- **条件分支**：在特定场景下该怎么做
- **格式模板**：输出应该长什么样

这种设计的核心洞察是：**模型对每个工具的行为质量，直接受该工具提示词质量制约**。系统提示词设定全局人格，工具提示词塑造局部行为。二者共同构成 Claude Code 的"双层驾驭架构"。

接下来我们按功能复杂度由高到低，逐一分析六个工具。

---

## 8.2 BashTool：最复杂的微型驾驭器

BashTool 是 Claude Code 中提示词最长、约束最密集的工具。它的提示词由 `getSimplePrompt()` 函数动态生成，最终可达数千字。

**源码位置：** `tools/BashTool/prompt.ts:275-369`

### 8.2.1 工具偏好矩阵：把流量导向专用工具

提示词的第一部分就建立了一个明确的**工具偏好矩阵**：

```
IMPORTANT: Avoid using this tool to run find, grep, cat, head, tail,
sed, awk, or echo commands, unless explicitly instructed or after you
have verified that a dedicated tool cannot accomplish your task.
```

紧接着是一张映射表（第281-291行）：

```typescript
const toolPreferenceItems = [
  `File search: Use ${GLOB_TOOL_NAME} (NOT find or ls)`,
  `Content search: Use ${GREP_TOOL_NAME} (NOT grep or rg)`,
  `Read files: Use ${FILE_READ_TOOL_NAME} (NOT cat/head/tail)`,
  `Edit files: Use ${FILE_EDIT_TOOL_NAME} (NOT sed/awk)`,
  `Write files: Use ${FILE_WRITE_TOOL_NAME} (NOT echo >/cat <<EOF)`,
  'Communication: Output text directly (NOT echo/printf)',
]
```

这个设计体现了一个重要的驾驭模式：**流量导向（traffic steering）**。Bash 是一个"万能工具" -- 理论上可以完成文件读写、搜索、编辑等所有操作。但让模型通过 Bash 完成这些操作会带来两个问题：

1. **用户体验差**：专用工具（如 FileEditTool）有结构化输入、可视化 diff、权限检查等能力，Bash 命令则是不透明的字符串。
2. **权限控制失效**：专用工具有细粒度权限校验，Bash 命令绕过了这些检查。

注意第276-278行的条件分支：当系统检测到嵌入式搜索工具（`hasEmbeddedSearchTools()`）时，`find` 和 `grep` 从禁用列表中移除。这是为 Anthropic 内部构建版本（ant-native builds）做的适配 -- 这些构建将 `find`/`grep` 别名为嵌入式 `bfs`/`ugrep`，同时移除了独立的 Glob/Grep 工具。

**可复用模式 -- "万能工具降级"：** 当你的工具集中存在一个功能覆盖面极广的工具时，在其提示词中显式列出"什么场景应该用什么替代工具"，避免模型过度依赖单一工具。

### 8.2.2 命令执行指南：从超时到并发

提示词的第二部分是一套详细的命令执行规范（第331-352行），涵盖：

- **目录验证**："If your command will create new directories or files, first use this tool to run `ls` to verify the parent directory exists"
- **路径引用**："Always quote file paths that contain spaces with double quotes"
- **工作目录保持**："Try to maintain your current working directory throughout the session by using absolute paths"
- **超时控制**：默认 120,000ms（2分钟），最大 600,000ms（10分钟）
- **后台执行**：`run_in_background` 参数，带明确的使用条件

其中最精巧的是**多命令并发指南**（第297-303行）：

```typescript
const multipleCommandsSubitems = [
  `If the commands are independent and can run in parallel, make multiple
   ${BASH_TOOL_NAME} tool calls in a single message.`,
  `If the commands depend on each other and must run sequentially, use
   a single ${BASH_TOOL_NAME} call with '&&' to chain them together.`,
  "Use ';' only when you need to run commands sequentially but don't
   care if earlier commands fail.",
  'DO NOT use newlines to separate commands.',
]
```

这不是简单的"最佳实践建议"，而是一套**并发决策树**：独立任务用并行工具调用 -> 有依赖用 `&&` -> 允许失败用 `;` -> 禁止用换行符。每条规则都对应一个具体的故障模式。

### 8.2.3 Git 安全协议：深度防御

Git 操作是 BashTool 提示词中最重要的安全领域。完整的 Git 安全协议定义在 `getCommitAndPRInstructions()` 函数中（第42-161行），其核心禁令列表（第88-95行）构成了一道**六层防线**：

```
Git Safety Protocol:
- NEVER update the git config
- NEVER run destructive git commands (push --force, reset --hard,
  checkout ., restore ., clean -f, branch -D) unless the user
  explicitly requests these actions
- NEVER skip hooks (--no-verify, --no-gpg-sign, etc) unless the
  user explicitly requests it
- NEVER run force push to main/master, warn the user if they request it
- CRITICAL: Always create NEW commits rather than amending
- When staging files, prefer adding specific files by name rather
  than using "git add -A" or "git add ."
- NEVER commit changes unless the user explicitly asks you to
```

每一条禁令都对应一个真实的数据丢失场景：

| 禁令 | 防御的故障场景 |
|------|---------------|
| NEVER update git config | 模型可能修改用户的全局 Git 配置 |
| NEVER push --force | 覆盖远程仓库的提交历史 |
| NEVER skip hooks | 绕过代码质量检查、签名验证 |
| NEVER force push to main | 破坏团队共享分支 |
| Always create NEW commits | pre-commit hook 失败后 amend 会修改上一个提交 |
| Prefer specific files | `git add .` 可能暴露 .env、credentials |
| NEVER commit unless asked | 避免 agent 过度自主 |

"CRITICAL" 标记被保留给最微妙的场景：pre-commit hook 失败后的 `--amend` 陷阱。这条规则需要理解 Git 的内部机制 -- hook 失败意味着 commit 没有发生，此时 `--amend` 会修改的是**上一个已存在的提交**，而不是"重试当前提交"。

提示词还包含完整的 commit 工作流模板（第96-125行），用编号步骤明确指定哪些操作可以并行、哪些必须串行，甚至提供了 HEREDOC 格式的 commit message 模板。这是一种**工作流脚手架（workflow scaffolding）**模式 -- 不是告诉模型"做什么"，而是告诉它"按什么顺序做"。

### 8.2.4 沙箱配置的 JSON 内联

当沙箱（sandbox）启用时，`getSimpleSandboxSection()` 函数（第172-273行）会将完整的沙箱配置以 JSON 格式内联到提示词中：

```typescript
const filesystemConfig = {
  read: {
    denyOnly: dedup(fsReadConfig.denyOnly),
    allowWithinDeny: dedup(fsReadConfig.allowWithinDeny),
  },
  write: {
    allowOnly: normalizeAllowOnly(fsWriteConfig.allowOnly),
    denyWithinAllow: dedup(fsWriteConfig.denyWithinAllow),
  },
}
```

**源码参考：** `tools/BashTool/prompt.ts:195-203`

这是一个值得深思的设计决策：**将机器可读的安全策略直接暴露给模型**。模型需要"理解"自己可以访问哪些路径、可以连接哪些网络主机，才能在生成命令时主动避免违规。JSON 格式保证了信息的精确性和无歧义性。

注意第167-170行的 `dedup` 函数和第188-191行的 `normalizeAllowOnly`：前者去除重复路径（因为 `SandboxManager` 合并多层配置时不去重），后者将用户特定的临时目录路径替换为 `$TMPDIR` 占位符。这两个优化分别节省了 ~150-200 token 和保证了跨用户的 prompt 缓存一致性。

**可复用模式 -- "策略透明化"：** 当安全策略需要模型配合执行时，将策略的完整规则集以结构化格式（JSON/YAML）内联到提示词中，让模型在生成阶段就能自检合规性。

### 8.2.5 sleep 反模式抑制

提示词专门用一个小节（第310-327行）来抑制 `sleep` 的滥用：

```typescript
const sleepSubitems = [
  'Do not sleep between commands that can run immediately — just run them.',
  'If your command is long running... use `run_in_background`.',
  'Do not retry failing commands in a sleep loop — diagnose the root cause.',
  'If waiting for a background task... do not poll.',
  'If you must sleep, keep the duration short (1-5 seconds)...',
]
```

这是一个典型的**反模式抑制（anti-pattern suppression）**策略。LLM 在代码生成场景中倾向于使用 `sleep` + 轮询来处理异步等待，因为这是训练数据中最常见的模式。提示词通过逐一列举替代方案（后台执行、事件通知、诊断根因）来"覆写"这个默认行为。

---

## 8.3 FileEditTool："编辑前必须先读取"的强制机制

FileEditTool 的提示词相比 BashTool 精简得多，但每一句都承载着关键的工程约束。

**源码位置：** `tools/FileEditTool/prompt.ts:1-28`

### 8.3.1 前置读取强制

提示词的第一条规则（第4-6行）：

```typescript
function getPreReadInstruction(): string {
  return `You must use your \`${FILE_READ_TOOL_NAME}\` tool at least once
  in the conversation before editing. This tool will error if you
  attempt an edit without reading the file.`
}
```

这不是一个"建议"，而是一个**硬性约束** -- 工具的运行时实现会检查对话历史中是否存在对该文件的 Read 调用，没有则直接返回错误。提示词中的说明是为了让模型**提前知道**这个约束，避免浪费一次工具调用。

这个设计解决了一个核心问题：**模型幻觉（hallucination）**。如果模型不先读取文件就尝试编辑，它对文件内容的假设可能完全错误。强制先读取保证了编辑操作基于真实的文件状态，而不是模型对文件内容的"记忆"或"猜测"。

**可复用模式 -- "前置条件强制"：** 当工具 B 的正确性依赖于工具 A 的先行调用时，在 B 的提示词中声明这个依赖关系，并在 B 的运行时中强制检查。双重保障 -- 提示词层防止浪费调用，运行时层兜底防止错误操作。

### 8.3.2 最小唯一 old_string

提示词对 `old_string` 参数的要求（第20-27行）体现了精妙的平衡：

```
- The edit will FAIL if `old_string` is not unique in the file. Either
  provide a larger string with more surrounding context to make it unique
  or use `replace_all` to change every instance of `old_string`.
```

对于 Anthropic 内部用户（`USER_TYPE === 'ant'`），还有一条额外的优化指引（第17-19行）：

```typescript
const minimalUniquenessHint =
  process.env.USER_TYPE === 'ant'
    ? `Use the smallest old_string that's clearly unique — usually 2-4
       adjacent lines is sufficient. Avoid including 10+ lines of context
       when less uniquely identifies the target.`
    : ''
```

这揭示了一个**token 经济学**问题：模型在使用 FileEditTool 时，需要在 `old_string` 参数中提供要替换的原文。如果模型习惯性地包含大段上下文来"确保唯一性"，每次编辑操作的 token 消耗就会急剧膨胀。"2-4 行"的指导让模型在唯一性和简洁性之间找到甜点。

### 8.3.3 缩进保持与行号前缀

提示词中最容易被忽视但最关键的技术细节（第13-16行，第23行）：

```typescript
const prefixFormat = isCompactLinePrefixEnabled()
  ? 'line number + tab'
  : 'spaces + line number + arrow'

// 在描述中：
`When editing text from Read tool output, ensure you preserve the exact
indentation (tabs/spaces) as it appears AFTER the line number prefix.
The line number prefix format is: ${prefixFormat}. Everything after that
is the actual file content to match. Never include any part of the line
number prefix in the old_string or new_string.`
```

Read 工具返回的内容带有行号前缀（如 `  42 → `），模型需要在编辑时**剥离这个前缀**，只提取实际的文件内容作为 `old_string`。这是 Read 工具与 Edit 工具之间的**接口契约** -- 提示词承担了"接口文档"的角色。

**可复用模式 -- "工具间接口声明"：** 当两个工具的输出/输入存在格式转换关系时，在下游工具的提示词中显式描述上游工具的输出格式，避免模型在格式转换中出错。

---

## 8.4 FileReadTool：资源感知的读取策略

FileReadTool 的提示词看似简单，实则包含了精心设计的资源管理策略。

**源码位置：** `tools/FileReadTool/prompt.ts:1-49`

### 8.4.1 2000 行默认限制

```typescript
export const MAX_LINES_TO_READ = 2000

// 在提示词模板中：
`By default, it reads up to ${MAX_LINES_TO_READ} lines starting from
the beginning of the file`
```

**源码参考：** `tools/FileReadTool/prompt.ts:10,37`

2000 行是一个经过权衡的数字。Anthropic 的模型有 200K token 的上下文窗口，但上下文越大，注意力分散越严重、推理成本越高。2000 行大约对应 8000-16000 个 token（取决于代码密度），占上下文窗口的 4-8%。这个预算足够覆盖绝大多数单文件场景，同时为多文件操作留出空间。

### 8.4.2 offset/limit 的渐进式引导

提示词对 offset/limit 参数提供了两种措辞模式（第17-21行）：

```typescript
export const OFFSET_INSTRUCTION_DEFAULT =
  "You can optionally specify a line offset and limit (especially handy
   for long files), but it's recommended to read the whole file by not
   providing these parameters"

export const OFFSET_INSTRUCTION_TARGETED =
  'When you already know which part of the file you need, only read
   that part. This can be important for larger files.'
```

两种模式服务于不同的使用阶段：

- **DEFAULT 模式**鼓励完整读取 -- 适用于模型首次接触文件时，需要全局理解。
- **TARGETED 模式**鼓励精准读取 -- 适用于模型已经知道目标位置时，节省 token 预算。

哪种模式被使用取决于运行时上下文（由 `FileReadTool` 调用方决定），但提示词预先定义了两种"引导语气"，让模型在不同场景下展现不同的读取行为。

### 8.4.3 多媒体能力声明

提示词用一系列声明式语句扩展了 Read 工具的能力边界（第40-48行）：

```
- This tool allows Claude Code to read images (eg PNG, JPG, etc).
  When reading an image file the contents are presented visually
  as Claude Code is a multimodal LLM.
- This tool can read PDF files (.pdf). For large PDFs (more than 10
  pages), you MUST provide the pages parameter to read specific page
  ranges. Maximum 20 pages per request.
- This tool can read Jupyter notebooks (.ipynb files) and returns all
  cells with their outputs.
```

PDF 的分页限制（"more than 10 pages...MUST provide the pages parameter"）是一个**渐进式资源限制**：小文件直接读取，大文件强制分页。这比"所有文件都必须分页"或"不限制分页"都更合理 -- 前者增加不必要的工具调用轮次，后者可能一次性注入过多内容。

注意 PDF 支持是条件性的（第41行）：`isPDFSupported()` 检查运行时环境是否支持 PDF 解析。不支持时，整个 PDF 说明段落从提示词中消失。这避免了"提示词承诺了运行时无法兑现的能力"这一常见陷阱。

**可复用模式 -- "能力声明与运行时对齐"：** 工具提示词中的能力描述应该由运行时能力动态决定。如果某个功能在特定环境下不可用，不要在提示词中提及它 -- 这会导致模型尝试使用不存在的功能，产生困惑和浪费。

---

## 8.5 GrepTool："始终用 Grep 不用 bash grep"

GrepTool 的提示词精简到极致，但每一行都是硬约束。

**源码位置：** `tools/GrepTool/prompt.ts:1-18`

### 8.5.1 排他性声明

提示词的第一条使用规则（第10行）：

```
ALWAYS use Grep for search tasks. NEVER invoke `grep` or `rg` as a
Bash command. The Grep tool has been optimized for correct permissions
and access.
```

这是与 BashTool 的工具偏好矩阵**双向配合**的设计：BashTool 说"不要用 bash 做搜索"，GrepTool 说"搜索必须用我"。两个方向的约束形成闭环，最大程度降低模型"走错路"的概率。

"has been optimized for correct permissions and access" 给出了理由，而非仅仅发出禁令。理由很重要 -- GrepTool 底层调用的是相同的 `ripgrep`，但包裹了权限检查（`checkReadPermissionForTool`，`GrepTool.ts:233-239`）、忽略模式应用（`getFileReadIgnorePatterns`，`GrepTool.ts:413-427`）和版本控制目录排除（`VCS_DIRECTORIES_TO_EXCLUDE`，`GrepTool.ts:95-102`）。通过 Bash 直接调用 `rg` 会绕过这些安全层。

### 8.5.2 ripgrep 语法提示

提示词提供了三条关键的语法差异说明（第11-16行）：

```
- Supports full regex syntax (e.g., "log.*Error", "function\s+\w+")
- Pattern syntax: Uses ripgrep (not grep) - literal braces need
  escaping (use `interface\{\}` to find `interface{}` in Go code)
- Multiline matching: By default patterns match within single lines only.
  For cross-line patterns like `struct \{[\s\S]*?field`, use
  `multiline: true`
```

第一条明确了语法家族（ripgrep 的 Rust regex），第二条给出了最常见的陷阱（大括号需要转义 -- 这与 GNU grep 不同），第三条解释了 multiline 参数的使用场景。

从代码实现看，`multiline: true` 对应的 ripgrep 参数是 `-U --multiline-dotall`（`GrepTool.ts:341-343`）。提示词选择用"使用场景 + 示例"来解释这个功能，而不是暴露底层参数细节 -- 模型不需要知道 `-U` 是什么，只需要知道什么时候设置 `multiline: true`。

### 8.5.3 输出模式与 head_limit

GrepTool 的输入 schema（`GrepTool.ts:33-89`）定义了丰富的参数，但提示词中只简要提及三种输出模式：

```
Output modes: "content" shows matching lines, "files_with_matches"
shows only file paths (default), "count" shows match counts
```

而 `head_limit` 参数的设计（`GrepTool.ts:81,107`）尤其值得关注：

```typescript
const DEFAULT_HEAD_LIMIT = 250

// 在 schema 描述中：
'Defaults to 250 when unspecified. Pass 0 for unlimited
(use sparingly — large result sets waste context).'
```

默认 250 条结果上限是一个**上下文保护机制** -- 注释中说明（第104-108行），不受限的 content 模式搜索可能填满 20KB 的工具结果持久化阈值。"use sparingly" 的措辞给模型一个温和的警告，而 `0` 作为"无限制"的逃生舱口保留了灵活性。

**可复用模式 -- "安全默认值 + 逃生舱口"：** 为可能产生大量输出的工具设置保守的默认限制，同时提供一个显式的方式来解除限制。在提示词中说明两者的存在和适用场景。

---

## 8.6 AgentTool：动态 agent 列表与 fork 指引

AgentTool 是六个工具中提示词生成逻辑最复杂的，因为它需要根据运行时状态（可用的 agent 定义、是否启用 fork、是否为 coordinator 模式、订阅类型）动态组合内容。

**源码位置：** `tools/AgentTool/prompt.ts:1-287`

### 8.6.1 内联 vs 附件：agent 列表的两种注入方式

提示词中的 agent 列表可以通过两种方式注入（第58-64行，第196-199行）：

```typescript
export function shouldInjectAgentListInMessages(): boolean {
  if (isEnvTruthy(process.env.CLAUDE_CODE_AGENT_LIST_IN_MESSAGES)) return true
  if (isEnvDefinedFalsy(process.env.CLAUDE_CODE_AGENT_LIST_IN_MESSAGES))
    return false
  return getFeatureValue_CACHED_MAY_BE_STALE('tengu_agent_list_attach', false)
}
```

**方式一（内联）：** agent 列表直接嵌入工具描述。

```typescript
`Available agent types and the tools they have access to:
${effectiveAgents.map(agent => formatAgentLine(agent)).join('\n')}`
```
